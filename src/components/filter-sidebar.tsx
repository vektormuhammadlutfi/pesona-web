import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { ProductListParams } from "@/types";
import { PriceFormatter } from "@/components/ui/price-formatter";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Star, ShieldCheck } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface FilterSidebarProps {
  onFilterChange: (filters: Partial<ProductListParams>) => void;
  currentFilters: Partial<ProductListParams>;
  minPriceLimit?: number;
  maxPriceLimit?: number;
}

export function FilterSidebar({
  onFilterChange,
  currentFilters,
  minPriceLimit = 0,
  maxPriceLimit = 2000,
}: FilterSidebarProps) {
  const [searchTerm, setSearchTerm] = useState(currentFilters.search || "");
  const [priceRange, setPriceRange] = useState<[number, number]>([
    currentFilters.minPrice || minPriceLimit,
    currentFilters.maxPrice || maxPriceLimit,
  ]);

  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({
      search: searchTerm,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    });
  };

  const handleReset = () => {
    setSearchTerm("");
    setPriceRange([minPriceLimit, maxPriceLimit]);
    onFilterChange({
      search: "",
      minPrice: minPriceLimit,
      maxPrice: maxPriceLimit,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 sticky top-8">
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium">Filters</h3>
          
          <div className="space-y-2">
            <Label htmlFor="search">Search by Name or Slug</Label>
            <Input
              id="search"
              placeholder="e.g., iphone-12-pro or iPhone 12 Pro"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* <Separator />

        <div className="space-y-4">
          <h3 className="font-medium">Supplier Features</h3>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Checkbox id="verified" />
              <Label htmlFor="verified" className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-blue-500" />
                Verified Supplier
              </Label>
            </div>
          </div>
        </div> */}

        <Separator />

        {/* <div className="space-y-4">
          <h3 className="font-medium">Product Features</h3>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Checkbox id="trade-assurance" />
              <Label htmlFor="trade-assurance">Trade Assurance</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="ready-to-ship" />
              <Label htmlFor="ready-to-ship">Ready to Ship</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="paid-samples" />
              <Label htmlFor="paid-samples">Paid Samples</Label>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-medium">Store Reviews</h3>
          
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-2">
                <Checkbox id={`rating-${rating}`} />
                <Label htmlFor={`rating-${rating}`} className="flex items-center gap-1">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span>& Up</span>
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator /> */}

        <div className="space-y-4">
          <h3 className="font-medium">Price Range</h3>
          
          <div className="px-2">
            <Slider
              value={priceRange}
              min={minPriceLimit}
              max={maxPriceLimit}
              step={10}
              onValueChange={handlePriceChange}
              className="py-4"
            />
          </div>
          <div className="flex items-center justify-between">
            <PriceFormatter price={priceRange[0]} size="sm" />
            <PriceFormatter price={priceRange[1]} size="sm" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
          Apply Filters
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
        >
          Reset Filters
        </Button>
      </div>
    </form>
  );
}