import { useState, useEffect } from "react"
import { fetchProducts } from "@/lib/api"
import { ProductGrid } from "@/components/product-grid"
import { FilterSidebar } from "@/components/filter-sidebar"
import type { ProductListParams, ProductListResponse } from "@/types"
import { useToast } from "@/hooks/use-toast"
import { Pagination } from "@/components/ui/pagination"
import { useSearchParams } from "react-router-dom"
import { Badge } from "@/components/ui/badge"

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState<ProductListResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState<Partial<ProductListParams>>({
    page: Number(searchParams.get("page")) || 1,
    limit: 12, // Increased for full-width layout
    search: searchParams.get("search") || "",
    minPrice: Number(searchParams.get("minPrice")) || 0,
    maxPrice: Number(searchParams.get("maxPrice")) || 2000,
  })
  const { toast } = useToast()

  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true)
      try {
        const data = await fetchProducts(filters)
        setProducts(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load products. Please try again later.",
          variant: "destructive",
        })
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProducts()
  }, [filters, toast])

  useEffect(() => {
    const newSearchParams = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        newSearchParams.set(key, String(value))
      }
    })
    setSearchParams(newSearchParams)
  }, [filters, setSearchParams])

  const handleFilterChange = (newFilters: Partial<ProductListParams>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }))
  }

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-800">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-4 md:py-8">
        {/* Hero Section */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-zinc-900 dark:text-white mb-4">
            Discover Amazing Products
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto">
            Find the best deals from verified suppliers worldwide
          </p>
        </div>

        <div className="flex flex-col space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 lg:gap-8">
            {/* Filter Sidebar */}
            <div className="xl:col-span-1">
              <FilterSidebar onFilterChange={handleFilterChange} currentFilters={filters} />
            </div>

            {/* Main Content */}
            <div className="xl:col-span-4">
              {/* Results Header */}
              {!isLoading && products && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                  <div className="flex items-center gap-3">
                    <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">
                      {products.pagination.total} Products Found
                    </h2>
                    {filters.search && (
                      <Badge
                        variant="secondary"
                        className="bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300"
                      >
                        "{filters.search}"
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Page {products.pagination.page} of {products.pagination.pages}
                  </div>
                </div>
              )}

              {/* Product Grid */}
              <ProductGrid products={products?.products || []} isLoading={isLoading} />

              {/* Pagination */}
              {!isLoading && products && products.pagination.pages > 1 && (
                <div className="mt-8 md:mt-12 space-y-6">
                  <Pagination
                    currentPage={products.pagination.page}
                    totalPages={products.pagination.pages}
                    onPageChange={handlePageChange}
                  />
                  <div className="text-center text-sm text-muted-foreground bg-white dark:bg-zinc-800 rounded-lg p-4 border">
                    Showing {(products.pagination.page - 1) * products.pagination.limit + 1} -{" "}
                    {Math.min(products.pagination.page * products.pagination.limit, products.pagination.total)} of{" "}
                    {products.pagination.total} products
                  </div>
                </div>
              )}

              {/* Empty State */}
              {!isLoading && products && products.products.length === 0 && (
                <div className="text-center py-12 md:py-16">
                  <div className="max-w-md mx-auto">
                    <div className="w-24 h-24 mx-auto mb-6 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center">
                      <span className="text-3xl">🔍</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No products found</h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your search criteria or filters to find what you're looking for.
                    </p>
                    <button
                      onClick={() => handleFilterChange({ search: "", minPrice: 0, maxPrice: 2000 })}
                      className="text-orange-600 hover:text-orange-700 font-medium"
                    >
                      Clear all filters
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
