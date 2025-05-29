import { Link } from "react-router-dom"
import { Smartphone, Globe, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-zinc-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-900/60 border-b dark:border-zinc-800">
      <div className="container">
        {/* Top Bar - Hidden on mobile */}
        <div className="hidden md:flex items-center justify-between py-2 text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
              <span className="text-zinc-700 dark:text-zinc-300">English - USD</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-zinc-700 dark:text-zinc-300">Ship to:</span>
              <span className="font-medium text-zinc-900 dark:text-white">ID</span>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex items-center gap-2 md:gap-8 py-3 md:py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <Smartphone className="h-6 w-6 md:h-8 md:w-8 text-orange-500" />
            <span className="text-lg md:text-xl font-bold text-zinc-900 dark:text-white">PESONA</span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 items-center gap-2 max-w-2xl">
            <div className="relative flex-1">
              <Input
                type="search"
                placeholder="Search for products..."
                className="pr-10 h-10 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 border-zinc-300 dark:border-zinc-700"
              />
            </div>
            <Button className="h-10 bg-orange-500 hover:bg-orange-600 text-white px-6">Search</Button>
          </div>


          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-muted-foreground dark:text-zinc-300">
              Sign in
            </Button>
            <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
              Create account
            </Button>
            <ThemeToggle />
          </div>

          {/* Mobile Menu */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button className="bg-white text-zinc-300 dark:text-zinc-700">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col gap-6 mt-6">

                  {/* Mobile Navigation */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Globe className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
                      <span className="text-zinc-700 dark:text-zinc-300">English - USD</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-zinc-700 dark:text-zinc-300">Ship to:</span>
                      <span className="font-medium text-zinc-900 dark:text-white">ID</span>
                    </div>
                  </div>

                  {/* Mobile Actions */}
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full h-12">
                      Sign in
                    </Button>
                    <Button className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white">Create account</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
