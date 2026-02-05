import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Migration "migration";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

(with migration = Migration.run)
actor {
  include MixinStorage();

  // Constants
  let COMPANY_NAME = "Shree Nakoda Tiles";
  let SLOGAN = "Sabse Sasta Sabse Accha";
  let PHONE_NUMBERS = ["7778855034", "9687964998"];
  let ADDRESS = "Devli Piplone Road, Agar-Malwa";

  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Type
  public type UserProfile = {
    name : Text;
    email : ?Text;
  };

  public type ProductSpecification = {
    size : Text;
    color : Text;
    material : Text;
  };

  public type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    specifications : ProductSpecification;
    image : Storage.ExternalBlob;
  };

  module Product {
    public func compare(p1 : Product, p2 : Product) : Order.Order {
      Nat.compare(p1.id, p2.id);
    };

    public func compareByPrice(p1 : Product, p2 : Product) : Order.Order {
      Nat.compare(p1.price, p2.price);
    };
  };

  public type ContactFormSubmission = {
    id : Nat;
    name : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  // User profiles
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Products
  var next_product_id = 1;
  let products = Map.empty<Nat, Product>();

  // Contact form submissions
  var next_submission_id = 1;
  let submissions = Map.empty<Nat, ContactFormSubmission>();

  // Business card image
  var business_card_image : ?Storage.ExternalBlob = null;

  // PDF document (e.g. brochure/catalog)
  var pdf_document : ?Storage.ExternalBlob = null;

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Product Management
  public shared ({ caller }) func addProduct(
    name : Text,
    description : Text,
    price : Nat,
    specifications : ProductSpecification,
    image : Storage.ExternalBlob,
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };

    let product_id = next_product_id;
    next_product_id += 1;

    let product : Product = {
      id = product_id;
      name;
      description;
      price;
      specifications;
      image;
    };

    products.add(product_id, product);
    product_id;
  };

  public shared ({ caller }) func updateProduct(
    product_id : Nat,
    name : Text,
    description : Text,
    price : Nat,
    specifications : ProductSpecification,
    image : Storage.ExternalBlob,
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };

    switch (products.get(product_id)) {
      case (null) {
        Runtime.trap("Product not found");
      };
      case (?_) {
        let updated_product : Product = {
          id = product_id;
          name;
          description;
          price;
          specifications;
          image;
        };
        products.add(product_id, updated_product);
      };
    };
  };

  public shared ({ caller }) func deleteProduct(product_id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };

    if (not products.containsKey(product_id)) {
      Runtime.trap("Product not found");
    };

    products.remove(product_id);
  };

  public query func getProduct(product_id : Nat) : async ?Product {
    products.get(product_id);
  };

  public query func getAllProducts() : async [Product] {
    products.values().toArray().sort();
  };

  public query func getProductsByPrice() : async [Product] {
    products.values().toArray().sort(Product.compareByPrice);
  };

  // Contact Form Management
  public shared ({ caller }) func submitContactForm(name : Text, email : Text, message : Text) : async () {
    let submission : ContactFormSubmission = {
      id = next_submission_id;
      name;
      email;
      message;
      timestamp = Time.now();
    };

    submissions.add(next_submission_id, submission);
    next_submission_id += 1;
  };

  public query ({ caller }) func getAllSubmissions() : async [ContactFormSubmission] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view submissions");
    };
    submissions.values().toArray();
  };

  // Business Card Management
  public shared ({ caller }) func uploadBusinessCardImage(image : Storage.ExternalBlob) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can upload business card image");
    };
    business_card_image := ?image;
  };

  public query func getBusinessCardImage() : async ?Storage.ExternalBlob {
    business_card_image;
  };

  // PDF Document Management
  public shared ({ caller }) func uploadPdfDocument(pdf : Storage.ExternalBlob) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can upload PDF document");
    };
    pdf_document := ?pdf;
  };

  public query func getPdfDocument() : async ?Storage.ExternalBlob {
    pdf_document;
  };

  // Company Information
  public query func getCompanyInfo() : async {
    name : Text;
    slogan : Text;
    phone_numbers : [Text];
    address : Text;
  } {
    {
      name = COMPANY_NAME;
      slogan = SLOGAN;
      phone_numbers = PHONE_NUMBERS;
      address = ADDRESS;
    };
  };
};
