import { useState, useEffect } from "react";
import { fetchProducts } from "@/lib/api";
import { ProductGrid } from "@/components/product-grid";
import { FilterSidebar } from "@/components/filter-sidebar";
import { ProductListParams, ProductListResponse } from "@/types";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Pagination } from "@/components/ui/pagination";
import { useSearchParams } from "react-router-dom";

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<ProductListResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<Partial<ProductListParams>>({
    page: Number(searchParams.get("page")) || 1,
    limit: 8, // Changed limit to 8
    search: searchParams.get("search") || "",
    minPrice: Number(searchParams.get("minPrice")) || 0,
    maxPrice: Number(searchParams.get("maxPrice")) || 2000,
  });
  const { toast } = useToast();

  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true);
      try {
        const data = await fetchProducts(filters);
        setProducts(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load products. Please try again later.",
          variant: "destructive",
        });
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, [filters, toast]);

  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) { // Check for undefined values
        newSearchParams.set(key, String(value));
      }
    });
    setSearchParams(newSearchParams);
  }, [filters, setSearchParams]);

  const handleFilterChange = (newFilters: Partial<ProductListParams>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  return (
    <div className="container py-6 md:py-10">
      <div className="flex flex-col space-y-6">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1 order-2 md:order-1">
            <FilterSidebar
              onFilterChange={handleFilterChange}
              currentFilters={filters}
            />
          </div>
          <div className="md:col-span-3 order-1 md:order-2">
            <ProductGrid
              products={products?.products || []}
              isLoading={isLoading}
            />

            {!isLoading && products && (
              <div className="mt-8 space-y-4">
                <Pagination
                  currentPage={products.pagination.page}
                  totalPages={products.pagination.pages}
                  onPageChange={handlePageChange}
                />
                <div className="text-center text-sm text-muted-foreground">
                  Showing {products.products.length} of {products.pagination.total}{' '}
                  products
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
