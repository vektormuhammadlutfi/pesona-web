import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import type { ProductListParams } from "@/types"
import { PriceFormatter } from "@/components/ui/price-formatter"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface FilterSidebarProps {
  onFilterChange: (filters: Partial<ProductListParams>) => void
  currentFilters: Partial<ProductListParams>
  minPriceLimit?: number
  maxPriceLimit?: number
}

export function FilterSidebar({
  onFilterChange,
  currentFilters,
  minPriceLimit = 0,
  maxPriceLimit = 2000,
}: FilterSidebarProps) {
  const [searchTerm, setSearchTerm] = useState(currentFilters.search || "")
  const [priceRange, setPriceRange] = useState<[number, number]>([
    currentFilters.minPrice || minPriceLimit,
    currentFilters.maxPrice || maxPriceLimit,
  ])
  const [isOpen, setIsOpen] = useState(false)

  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onFilterChange({
      search: searchTerm,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    })
    setIsOpen(false)
  }

  const handleReset = () => {
    setSearchTerm("")
    setPriceRange([minPriceLimit, maxPriceLimit])
    onFilterChange({
      search: "",
      minPrice: minPriceLimit,
      maxPrice: maxPriceLimit,
    })
    setIsOpen(false)
  }

  const hasActiveFilters = searchTerm || priceRange[0] !== minPriceLimit || priceRange[1] !== maxPriceLimit

  const FilterContent = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">Filters</h3>
            {hasActiveFilters && (
              <Badge
                variant="secondary"
                className="bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300"
              >
                Active
              </Badge>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="search" className="text-sm font-medium">
              Search Products
            </Label>
            <Input
              id="search"
              placeholder="e.g., iPhone 12 Pro"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-11"
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-semibold">Price Range</h3>

          <div className="px-2 py-4">
            <Slider
              value={priceRange}
              min={minPriceLimit}
              max={maxPriceLimit}
              step={10}
              onValueChange={handlePriceChange}
              className="py-4"
            />
          </div>
          <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-800 rounded-lg p-3">
            <div className="text-center">
              <div className="text-xs text-muted-foreground mb-1">Min</div>
              <PriceFormatter price={priceRange[0]} size="sm" className="font-semibold" />
            </div>
            <div className="text-muted-foreground">—</div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground mb-1">Max</div>
              <PriceFormatter price={priceRange[1]} size="sm" className="font-semibold" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-4">
        <Button type="submit" className="bg-orange-500 hover:bg-orange-600 h-11 font-medium">
          Apply Filters
        </Button>
        <Button type="button" variant="outline" onClick={handleReset} className="h-11">
          Reset All
        </Button>
      </div>
    </form>
  )

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="md:hidden mb-6">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full h-12 justify-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <Badge
                  variant="secondary"
                  className="ml-2 bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300"
                >
                  Active
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle>Filter Products</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block sticky top-8">
        <div className="bg-white dark:bg-zinc-900 rounded-xl border shadow-sm p-6">
          <FilterContent />
        </div>
      </div>
    </>
  )
}
