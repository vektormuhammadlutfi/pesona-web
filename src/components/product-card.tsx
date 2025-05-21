import { Product } from "@/types";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PriceFormatter } from "@/components/ui/price-formatter";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, ShieldCheck } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const isVerified = Math.random() > 0.5; // Simulating verified status
  const rating = Math.floor(Math.random() * 2) + 4; // Random rating between 4-5
  const reviews = Math.floor(Math.random() * 100) + 20; // Random review count

  return (
    <Link to={`/product/${product.slug}`}>
      <motion.div 
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
        className="h-full"
      >
        <Card className="overflow-hidden h-full transition-all duration-200 hover:shadow-md flex flex-col">
          <div className="relative">
            <AspectRatio ratio={4/3} className="bg-muted">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="object-cover h-full w-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
                }}
              />
            </AspectRatio>
            {product.stockQuantity <= 5 && (
              <Badge variant="destructive" className="absolute top-2 right-2">
                Only {product.stockQuantity} left
              </Badge>
            )}
          </div>
          
          <CardContent className="pt-4 flex-grow">
            <div className="space-y-2">
              <PriceFormatter price={product.price} size="lg" className="text-orange-600 font-bold" />
              
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <span>Min. order: {Math.max(1, Math.floor(Math.random() * 10))} pieces</span>
              </div>

              <h3 className="font-medium text-base line-clamp-2">{product.name}</h3>

              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-muted-foreground">({reviews})</span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="pt-0 pb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {isVerified && (
                <div className="flex items-center gap-1 text-blue-600">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Verified</span>
                </div>
              )}
              <span>•</span>
              <span>CN</span>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </Link>
  );
}