import { ProductListParams, ProductListResponse, ProductResponse } from "@/types";

const API_URL = "https://pesona-api.onrender.com/trpc";

export async function fetchProducts(params: Partial<ProductListParams> = {}): Promise<ProductListResponse> {
  const defaultParams: ProductListParams = {
    page: 1,
    limit: 3,
    search: "",
    minPrice: 0,
    maxPrice: 2000,
  };

  const queryParams = { ...defaultParams, ...params };
  // const queryString = new URLSearchParams(
  //   Object.entries(queryParams).map(([key, value]) => [key, String(value)])
  // ).toString();

  try {
    const response = await fetch(`${API_URL}/product.list?input=${encodeURIComponent(JSON.stringify(queryParams))}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    const data = await response.json();
    return data.result.data.json;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function fetchProductBySlug(slug: string): Promise<ProductResponse> {
  try {
    const response = await fetch(`${API_URL}/product.getBySlug?input=${encodeURIComponent(JSON.stringify({ slug }))}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.status}`);
    }

    const data = await response.json();
    // Adjusted to match the actual API response structure
    return { product: data.result.data.json };
  } catch (error) {
    console.error(`Error fetching product with slug ${slug}:`, error);
    throw error;
  }
}
