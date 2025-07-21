'use client'

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface INavLink {
  href: string;
  label: string;
}
const NavLinks = ({ navLinks }: { navLinks: INavLink[] }) => {
     const pathname = usePathname();
    return (
        <nav className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
                <Button
                    key={link.href}
                    variant="ghost"
                    asChild
                    className={cn(
                        "font-medium",
                        pathname === link.href
                            ? "text-primary hover:text-primary"
                            : "text-muted-foreground"
                    )}
                >
                    <Link href={link.href}>{link.label}</Link>
                </Button>
            ))}
        </nav>
    );
}

export default NavLinks;