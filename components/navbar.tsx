import Link from "next/link";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { MobileNav } from "./mobile-nav";
import { SearchInput } from "./search-input";

export const categories = [
  { id: 1, name: "Electronics", href: "/category/electronics" },
  { id: 2, name: "Fashion", href: "/category/fashion" },
  { id: 3, name: "Home", href: "/category/home" },
];

export function Navbar() {
  return (
    <div className="border-b border-dashed">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div>
          <div className="flex items-center gap-6">
            <Link className="text-2xl hidden md:block  font-bold" href="/">
              Store
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  href={category.href}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
            <MobileNav />
          </div>
        </div>
        <div className="block w-full mx-4 md:mx-8">
          <SearchInput />
        </div>
        <div className="flex items-center gap-0">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
            </Link>
          </Button>

          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
