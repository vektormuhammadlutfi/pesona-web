import { Link } from "react-router-dom";
import { Smartphone, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Input } from "@/components/ui/input";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b">
      <div className="container">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-2 text-sm border-b">
          {/* <div className="flex items-center gap-4">
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              AI Sourcing Agent
            </Link>
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              Buyer Central
            </Link>
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              Help Center
            </Link>
          </div> */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>English - USD</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Ship to:</span>
              <span className="font-medium">ID</span>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex items-center gap-8 py-4">
          <Link to="/" className="flex items-center gap-2">
             <Smartphone  className="h-8 w-8 text-orange-500" />
            <span className="text-xl font-bold">PESONA</span>
          </Link>

          <div className="flex-1 flex items-center gap-2 max-w-2xl">
            <div className="relative flex-1">
              <Input 
                type="search"
                placeholder="iphones used wholesale"
                className="pr-10 h-10"
              />
            </div>
            <Button className="h-10 bg-orange-500 hover:bg-orange-600">
              Search
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              Sign in
            </Button>
            <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
              Create account
            </Button>
            <ThemeToggle />
          </div>
        </div>

        {/* Navigation */}
        {/* <nav className="flex items-center gap-6 py-2 text-sm">
          <Button variant="ghost" size="sm" className="gap-2">
            <Menu className="h-4 w-4" />
            All categories
          </Button>
          <Link to="/" className="text-muted-foreground hover:text-foreground">
            Featured selections
          </Link>
          <Link to="/" className="text-muted-foreground hover:text-foreground">
            Order protections
          </Link>
        </nav> */}
      </div>
    </header>
  );
}