import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Product, ProductSpecification, ContactFormSubmission } from '../backend';
import { ExternalBlob } from '../backend';
import { toast } from 'sonner';

// Company Info
export function useGetCompanyInfo() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['companyInfo'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCompanyInfo();
    },
    enabled: !!actor && !isFetching,
  });
}

// Business Card Image
export function useGetBusinessCardImage() {
  const { actor, isFetching } = useActor();

  return useQuery<ExternalBlob | null>({
    queryKey: ['businessCardImage'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getBusinessCardImage();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUploadBusinessCardImage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (image: ExternalBlob) => {
      if (!actor) throw new Error('Actor not available');
      return actor.uploadBusinessCardImage(image);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['businessCardImage'] });
      toast.success('Business card image uploaded successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to upload business card image');
    },
  });
}

// PDF Document
export function useGetPdfDocument() {
  const { actor, isFetching } = useActor();

  return useQuery<ExternalBlob | null>({
    queryKey: ['pdfDocument'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getPdfDocument();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUploadPdfDocument() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (pdf: ExternalBlob) => {
      if (!actor) throw new Error('Actor not available');
      return actor.uploadPdfDocument(pdf);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pdfDocument'] });
      toast.success('PDF document uploaded successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to upload PDF document');
    },
  });
}

// Products
export function useGetAllProducts() {
  const { actor, isFetching } = useActor();

  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetProduct(productId: bigint | null) {
  const { actor, isFetching } = useActor();

  return useQuery<Product | null>({
    queryKey: ['product', productId?.toString()],
    queryFn: async () => {
      if (!actor || !productId) return null;
      return actor.getProduct(productId);
    },
    enabled: !!actor && !isFetching && productId !== null,
  });
}

export function useAddProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      description,
      price,
      specifications,
      image,
    }: {
      name: string;
      description: string;
      price: bigint;
      specifications: ProductSpecification;
      image: ExternalBlob;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addProduct(name, description, price, specifications, image);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product added successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to add product');
    },
  });
}

export function useUpdateProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      productId,
      name,
      description,
      price,
      specifications,
      image,
    }: {
      productId: bigint;
      name: string;
      description: string;
      price: bigint;
      specifications: ProductSpecification;
      image: ExternalBlob;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateProduct(productId, name, description, price, specifications, image);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update product');
    },
  });
}

export function useDeleteProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteProduct(productId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete product');
    },
  });
}

// Contact Form
export function useSubmitContactForm() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({
      name,
      email,
      message,
    }: {
      name: string;
      email: string;
      message: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitContactForm(name, email, message);
    },
    onSuccess: () => {
      toast.success('Message sent successfully! We will get back to you soon.');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to send message');
    },
  });
}

export function useGetAllSubmissions() {
  const { actor, isFetching } = useActor();

  return useQuery<ContactFormSubmission[]>({
    queryKey: ['submissions'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSubmissions();
    },
    enabled: !!actor && !isFetching,
  });
}

// Authorization
export function useGetIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}
