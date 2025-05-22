import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductBySlug } from "@/lib/api";
import { Product } from "@/types";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PriceFormatter } from "@/components/ui/price-formatter";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ShoppingCart, Package, Star, ShieldCheck, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const rating = Math.floor(Math.random() * 2) + 4; // Random rating between 4-5
  const reviews = Math.floor(Math.random() * 100) + 20; // Random review count
  const isVerified = Math.random() > 0.5; // Simulating verified status

  useEffect(() => {
    async function loadProduct() {
      if (!slug) return;
      
      setIsLoading(true);
      try {
        const { product } = await fetchProductBySlug(slug);
        setProduct(product);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load product details. Please try again later.",
          variant: "destructive",
        });
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    loadProduct();
  }, [slug, toast]);

  if (isLoading) {
    return (
      <div className="container py-6 md:py-10">
        <div className="flex items-center mb-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-1">
              <ChevronLeft className="h-4 w-4" />
              <Skeleton className="h-4 w-16" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="aspect-square w-full rounded-lg" />
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
            </div>
            
            <Skeleton className="h-12 w-1/3" />
            
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-10">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Product Not Found</h2>
          <p className="text-muted-foreground">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/">
            <Button>Return to Homepage</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-6 md:py-10">
      <div className="flex items-center mb-4">
        <Link to="/">
          <Button variant="ghost" size="sm" className="gap-1">
            <ChevronLeft className="h-4 w-4" />
            Back to Products
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="overflow-hidden border-0 md:border">
          <AspectRatio ratio={1/1} className="bg-muted">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="object-cover h-full w-full"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
              }}
            />
          </AspectRatio>
        </Card>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between mb-2">
              <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
              {isVerified && (
                <div className="flex items-center gap-1 text-blue-600">
                  <ShieldCheck className="h-5 w-5" />
                  <span>Verified</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <div className="flex">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-muted-foreground">({reviews} reviews)</span>
              </div>
              <Badge variant="secondary">{product.category.name}</Badge>
            </div>
          </div>
          
          <Card className="border-orange-200">
            <CardContent className="p-4 space-y-4">
              <PriceFormatter price={product.price} size="lg" className="text-orange-600" />
              
              <div className="text-sm text-muted-foreground">
                <span>Min. order: {Math.max(1, Math.floor(Math.random() * 10))} pieces</span>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-2">
            <h3 className="font-medium">Product Description</h3>
            <p className="text-muted-foreground whitespace-pre-line">
              {product.description}
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Specifications</h3>
            <Card>
              <CardContent className="p-4">
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                  {product.variants.map((variant) => (
                    <div key={variant.id} className="flex justify-between py-1">
                      <dt className="font-medium text-muted-foreground">{variant.name}:</dt>
                      <dd>{variant.value}</dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          </div>
          
          <Separator />
          
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Package className="h-4 w-4 text-muted-foreground" />
              <span className={product.stockQuantity > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                {product.stockQuantity > 0 
                  ? `${product.stockQuantity} in stock` 
                  : "Out of stock"}
              </span>
            </div>
            
            <div className="flex gap-2 ml-auto w-full sm:w-auto">
              <Button variant="outline" className="flex-1 sm:flex-none">
                <MessageCircle className="mr-2 h-4 w-4" />
                Contact Supplier
              </Button>
              <Button className="flex-1 sm:flex-none bg-orange-500 hover:bg-orange-600" disabled={product.stockQuantity <= 0}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Start Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}