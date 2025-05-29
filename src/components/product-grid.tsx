import type { Product } from "@/types"
import { ProductCard } from "@/components/product-card"
import { Skeleton } from "@/components/ui/skeleton"

interface ProductGridProps {
  products: Product[]
  isLoading?: boolean
}

export function ProductGrid({ products, isLoading = false }: ProductGridProps) {
  const skeletonCount = 12

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4 md:gap-6">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <div key={index} className="h-full">
            <div className="overflow-hidden h-full rounded-xl border shadow-sm bg-white dark:bg-zinc-900">
              {/* Image skeleton */}
              <div className="relative">
                <Skeleton className="h-48 md:h-56 w-full rounded-t-xl" />
                {/* Top badges skeleton */}
                <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </div>

              {/* Content skeleton */}
              <div className="p-4 md:p-6 space-y-3">
                {/* Price and verification */}
                <div className="flex justify-between items-start">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>

                {/* Min order */}
                <Skeleton className="h-4 w-24" />

                {/* Product name */}
                <div className="space-y-2">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-3/4" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton key={i} className="h-4 w-4 rounded-sm" />
                    ))}
                  </div>
                  <Skeleton className="h-4 w-8" />
                </div>
              </div>

              {/* Footer skeleton */}
              <div className="p-4 md:p-6 pt-0">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return null // Empty state is handled in the parent component
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
