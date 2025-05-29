import type { Product } from "@/types"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PriceFormatter } from "@/components/ui/price-formatter"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Star, ShieldCheck, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const isVerified = Math.random() > 0.5
  const rating = Math.floor(Math.random() * 2) + 4
  const reviews = Math.floor(Math.random() * 100) + 20

  return (
    <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3, ease: "easeOut" }} className="h-full group">
      <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10 flex flex-col border-0 bg-white dark:bg-zinc-900 shadow-md">
        <div className="relative overflow-hidden">
          <AspectRatio
            ratio={4 / 3}
            className="bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700"
          >
            <img
              src={product.imageUrl || "/placeholder.svg"}
              alt={product.name}
              className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                ;(e.target as HTMLImageElement).src =
                  "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              }}
            />
          </AspectRatio>

          {/* Overlay with actions */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <Button
              variant="secondary"
              size="sm"
              className="bg-white/90 hover:bg-white text-zinc-900 shadow-lg"
              asChild
            >
              <Link to={`/product/${product.slug}`}>View Details</Link>
            </Button>
          </div>

          {/* Top badges */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
            {product.stockQuantity <= 5 && (
              <Badge variant="destructive" className="text-xs font-medium shadow-lg">
                Only {product.stockQuantity} left
              </Badge>
            )}
            <Button
              variant="ghost"
              className="ml-auto bg-transparent hover:bg-transparent shadow-none border-0"
              onClick={(e) => {
              e.preventDefault()
              setIsLiked(!isLiked)
              }}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
          </div>
        </div>

        <CardContent className="p-4 md:p-6 flex-grow space-y-3">
          {/* Price */}
          <div className="flex items-center justify-between">
            <PriceFormatter
              price={product.price}
              size="lg"
              className="text-orange-600 dark:text-orange-400 font-bold text-xl md:text-2xl"
            />
            {isVerified && (
              <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                <ShieldCheck className="h-4 w-4" />
                <span className="text-xs font-medium">Verified</span>
              </div>
            )}
          </div>

          {/* Min order */}
          <div className="text-sm text-muted-foreground">
            Min. order: {Math.max(1, Math.floor(Math.random() * 10))} pieces
          </div>

          {/* Product name */}
          <Link to={`/product/${product.slug}`}>
            <h3 className="font-semibold text-base md:text-lg line-clamp-2 hover:text-orange-600 dark:hover:text-orange-400 transition-colors leading-tight">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {Array.from({ length: rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({reviews})</span>
          </div>
        </CardContent>

        <CardFooter className="p-4 md:p-6 pt-0">
          <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>CN</span>
              <span>•</span>
              <span className="text-green-600 dark:text-green-400 font-medium">Fast shipping</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
