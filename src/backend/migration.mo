import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Storage "blob-storage/Storage";
import Principal "mo:core/Principal";

module {
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

  public type ContactFormSubmission = {
    id : Nat;
    name : Text;
    email : Text;
    message : Text;
    timestamp : Int;
  };

  public type OldActor = {
    userProfiles : Map.Map<Principal, UserProfile>;
    products : Map.Map<Nat, Product>;
    submissions : Map.Map<Nat, ContactFormSubmission>;
    next_product_id : Nat;
    next_submission_id : Nat;
    business_card_image : ?Storage.ExternalBlob;
  };

  public type NewActor = {
    userProfiles : Map.Map<Principal, UserProfile>;
    products : Map.Map<Nat, Product>;
    submissions : Map.Map<Nat, ContactFormSubmission>;
    next_product_id : Nat;
    next_submission_id : Nat;
    business_card_image : ?Storage.ExternalBlob;
    pdf_document : ?Storage.ExternalBlob;
  };

  public func run(old : OldActor) : NewActor {
    { old with pdf_document = null };
  };
};
