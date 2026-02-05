import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Product {
    id: bigint;
    specifications: ProductSpecification;
    name: string;
    description: string;
    image: ExternalBlob;
    price: bigint;
}
export interface ContactFormSubmission {
    id: bigint;
    name: string;
    email: string;
    message: string;
    timestamp: Time;
}
export type Time = bigint;
export interface ProductSpecification {
    color: string;
    size: string;
    material: string;
}
export interface UserProfile {
    name: string;
    email?: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProduct(name: string, description: string, price: bigint, specifications: ProductSpecification, image: ExternalBlob): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteProduct(product_id: bigint): Promise<void>;
    getAllProducts(): Promise<Array<Product>>;
    getAllSubmissions(): Promise<Array<ContactFormSubmission>>;
    getBusinessCardImage(): Promise<ExternalBlob | null>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCompanyInfo(): Promise<{
        name: string;
        slogan: string;
        address: string;
        phone_numbers: Array<string>;
    }>;
    getPdfDocument(): Promise<ExternalBlob | null>;
    getProduct(product_id: bigint): Promise<Product | null>;
    getProductsByPrice(): Promise<Array<Product>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitContactForm(name: string, email: string, message: string): Promise<void>;
    updateProduct(product_id: bigint, name: string, description: string, price: bigint, specifications: ProductSpecification, image: ExternalBlob): Promise<void>;
    uploadBusinessCardImage(image: ExternalBlob): Promise<void>;
    uploadPdfDocument(pdf: ExternalBlob): Promise<void>;
}
