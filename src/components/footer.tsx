import { Link } from "react-router-dom";
import { Smartphone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-10">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
          <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
            <Smartphone className="h-5 w-5" />
            <span>PESONA</span>
          </Link>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} PESONA. All rights reserved.
          </p>
        </div>
        <div className="flex gap-6">
          <Link className="text-sm text-muted-foreground underline underline-offset-4" to="/">
            Privacy Policy
          </Link>
          <Link className="text-sm text-muted-foreground underline underline-offset-4" to="/">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}