import { Link } from "react-router-dom";
import { Smartphone, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Input } from "@/components/ui/input";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-zinc-900 border-b dark:border-zinc-800">
      <div className="container">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-2 text-sm border-b dark:border-zinc-800">
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
        <div className="flex items-center gap-8 py-4">
          <Link to="/" className="flex items-center gap-2">
            <Smartphone className="h-8 w-8 text-orange-500" />
            <span className="text-xl font-bold text-zinc-900 dark:text-white">PESONA</span>
          </Link>

          <div className="flex-1 flex items-center gap-2 max-w-2xl">
            <div className="relative flex-1">
              <Input
                type="search"
                placeholder="iphones used wholesale"
                className="pr-10 h-10 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 border-zinc-300 dark:border-zinc-700"
              />
            </div>
            <Button className="h-10 bg-orange-500 hover:bg-orange-600 text-white">
              Search
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-muted-foreground dark:text-zinc-300">
              Sign in
            </Button>
            <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
              Create account
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
