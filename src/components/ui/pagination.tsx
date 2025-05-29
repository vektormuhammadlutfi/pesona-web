import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const maxVisiblePages = 5
  const maxMobilePages = 3

  let visiblePages = pages
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768
  const maxPages = isMobile ? maxMobilePages : maxVisiblePages

  if (totalPages > maxPages) {
    const start = Math.max(Math.min(currentPage - Math.floor(maxPages / 2), totalPages - maxPages + 1), 1)
    visiblePages = pages.slice(start - 1, start - 1 + maxPages)
  }

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center space-x-1 md:space-x-2 bg-white dark:bg-zinc-900 rounded-lg border shadow-sm p-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-8 w-8 md:h-10 md:w-10"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {visiblePages[0] > 1 && (
          <>
            <Button
              variant={currentPage === 1 ? "default" : "ghost"}
              size="icon"
              onClick={() => onPageChange(1)}
              className="h-8 w-8 md:h-10 md:w-10 text-sm"
            >
              1
            </Button>
            {visiblePages[0] > 2 && <span className="px-1 md:px-2 text-muted-foreground text-sm">...</span>}
          </>
        )}

        {visiblePages.map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "ghost"}
            size="icon"
            onClick={() => onPageChange(page)}
            className={`h-8 w-8 md:h-10 md:w-10 text-sm ${
              currentPage === page
                ? "bg-orange-500 hover:bg-orange-600 text-white"
                : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            {page}
          </Button>
        ))}

        {visiblePages[visiblePages.length - 1] < totalPages && (
          <>
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <span className="px-1 md:px-2 text-muted-foreground text-sm">...</span>
            )}
            <Button
              variant={currentPage === totalPages ? "default" : "ghost"}
              size="icon"
              onClick={() => onPageChange(totalPages)}
              className="h-8 w-8 md:h-10 md:w-10 text-sm"
            >
              {totalPages}
            </Button>
          </>
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-8 w-8 md:h-10 md:w-10"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
