import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { fetchProductBySlug } from "@/lib/api"
import type { Product } from "@/types"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PriceFormatter } from "@/components/ui/price-formatter"
import { Separator } from "@/components/ui/separator"
import { ChevronLeft, ShoppingCart, Package, Star, ShieldCheck, MessageCircle, Heart, Share } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Skeleton } from "@/components/ui/skeleton"

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLiked, setIsLiked] = useState(false)
  const { toast } = useToast()
  const rating = Math.floor(Math.random() * 2) + 4
  const reviews = Math.floor(Math.random() * 100) + 20
  const isVerified = Math.random() > 0.5

  useEffect(() => {
    async function loadProduct() {
      if (!slug) return

      setIsLoading(true)
      try {
        const { product } = await fetchProductBySlug(slug)
        setProduct(product)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load product details. Please try again later.",
          variant: "destructive",
        })
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProduct()
  }, [slug, toast])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-800">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-4 md:py-8">
          {/* Breadcrumb skeleton */}
          <div className="flex items-center mb-6">
            <Skeleton className="h-10 w-32 rounded-lg" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-12">
            {/* Image skeleton - Takes more space on larger screens */}
            <div className="xl:col-span-2 space-y-4">
              <div className="overflow-hidden rounded-2xl border shadow-xl bg-white dark:bg-zinc-900">
                <Skeleton className="aspect-[16/10] w-full" />
              </div>

              {/* Mobile actions skeleton */}
              <div className="flex xl:hidden gap-3">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <Skeleton className="h-10 w-10 rounded-lg" />
              </div>
            </div>

            {/* Details skeleton */}
            <div className="space-y-6">
              {/* Header skeleton */}
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-3/4" />
                  </div>
                  <div className="hidden xl:flex gap-2">
                    <Skeleton className="h-10 w-10 rounded-lg" />
                    <Skeleton className="h-10 w-10 rounded-lg" />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-4 w-4 rounded-sm" />
                      ))}
                    </div>
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>
              </div>

              {/* Price card skeleton */}
              <div className="rounded-xl border p-6 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
                <div className="space-y-4">
                  <Skeleton className="h-12 w-32" />
                  <div className="flex flex-wrap gap-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-2" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              </div>

              {/* Description skeleton */}
              <div className="space-y-3">
                <Skeleton className="h-6 w-40" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </div>

              {/* Specifications skeleton */}
              <div className="space-y-3">
                <Skeleton className="h-6 w-32" />
                <div className="rounded-xl border p-6 bg-white dark:bg-zinc-900">
                  <div className="space-y-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="flex justify-between items-center py-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Skeleton className="h-px w-full" />

              {/* Stock status skeleton */}
              <div className="flex items-center gap-3">
                <Skeleton className="h-5 w-5 rounded-sm" />
                <Skeleton className="h-5 w-32" />
              </div>

              {/* Action buttons skeleton */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Skeleton className="flex-1 h-12 rounded-lg" />
                <Skeleton className="flex-1 h-12 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-800 flex items-center justify-center">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-10">
          <div className="text-center space-y-6 max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center">
              <span className="text-3xl">😕</span>
            </div>
            <h2 className="text-2xl font-bold">Product Not Found</h2>
            <p className="text-muted-foreground">The product you're looking for doesn't exist or has been removed.</p>
            <Link to="/">
              <Button className="bg-orange-500 hover:bg-orange-600">Return to Homepage</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-800">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-4 md:py-8">
        {/* Breadcrumb */}
        <div className="flex items-center mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2 hover:bg-white dark:hover:bg-zinc-800">
              <ChevronLeft className="h-4 w-4" />
              Back to Products
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-12">
          {/* Product Image - Takes more space on larger screens */}
          <div className="xl:col-span-2 space-y-4">
            <Card className="overflow-hidden border-0 shadow-xl">
              <AspectRatio
                ratio={16 / 10}
                className="bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700"
              >
                <img
                  src={product.imageUrl || "/placeholder.svg"}
                  alt={product.name}
                  className="object-cover h-full w-full"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).src =
                      "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  }}
                />
              </AspectRatio>
            </Card>

            {/* Mobile Actions */}
            <div className="flex xl:hidden gap-3">
              <Button variant="outline" size="icon" onClick={() => setIsLiked(!isLiked)} className="flex-shrink-0">
                <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
              <Button variant="outline" size="icon" className="flex-shrink-0">
                <Share className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">{product.name}</h1>
                <div className="hidden xl:flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => setIsLiked(!isLiked)}>
                    <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {Array.from({ length: rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">({reviews} reviews)</span>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300"
                >
                  {product.category.name}
                </Badge>
                {isVerified && (
                  <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                    <ShieldCheck className="h-4 w-4" />
                    <span className="text-sm font-medium">Verified Supplier</span>
                  </div>
                )}
              </div>
            </div>

            {/* Price Card */}
            <Card className="border-orange-200 dark:border-orange-700 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
              <CardContent className="p-6 space-y-4">
                <PriceFormatter
                  price={product.price}
                  size="lg"
                  className="text-orange-600 dark:text-orange-400 text-3xl md:text-4xl font-bold"
                />
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span>Min. order: {Math.max(1, Math.floor(Math.random() * 10))} pieces</span>
                  <span>•</span>
                  <span className="text-green-600 dark:text-green-400 font-medium">Free shipping available</span>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Product Description</h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{product.description}</p>
            </div>

            {/* Specifications */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Specifications</h3>
              <Card>
                <CardContent className="p-6">
                  <dl className="grid grid-cols-1 gap-4">
                    {product.variants.map((variant) => (
                      <div
                        key={variant.id}
                        className="flex justify-between items-center py-2 border-b border-zinc-100 dark:border-zinc-800 last:border-0"
                      >
                        <dt className="font-medium text-muted-foreground">{variant.name}</dt>
                        <dd className="font-semibold">{variant.value}</dd>
                      </div>
                    ))}
                  </dl>
                </CardContent>
              </Card>
            </div>

            <Separator />

            {/* Stock Status */}
            <div className="flex items-center gap-3">
              <Package className="h-5 w-5 text-muted-foreground" />
              <span
                className={`font-medium ${product.stockQuantity > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
              >
                {product.stockQuantity > 0 ? `${product.stockQuantity} units in stock` : "Out of stock"}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button variant="outline" className="flex-1 h-12 text-base font-medium">
                <MessageCircle className="mr-2 h-5 w-5" />
                Contact Supplier
              </Button>
              <Button
                className="flex-1 h-12 text-base font-medium bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700"
                disabled={product.stockQuantity <= 0}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Start Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
