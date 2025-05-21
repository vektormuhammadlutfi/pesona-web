// Product types
export interface Product {
  id: string;
  sku: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stockQuantity: number;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
  variants: Variant[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Variant {
  id: string;
  name: string;
  value: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
}

// Pagination
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginationResponse {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface ProductListParams extends PaginationParams {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface ProductListResponse {
  products: Product[];
  pagination: PaginationResponse;
}

export interface ProductResponse {
  product: Product;
}