import Autocomplete from "@/components/Autocomplete";
import NavLinks from "@/components/NavLinks";
import { getMenuLinks } from "@/lib/posts";
import Link from "next/link";


const Header = async () => {
   const navLinks = await getMenuLinks()
  return (
    <header className="bg-card border-b fixed top-0 left-0 w-full z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-headline font-semibold text-foreground">
              Story Weaver
            </span>
                  </Link>
                  <Autocomplete/>
            <NavLinks navLinks={navLinks} />
        </div>
      </div>
    </header>
  );
}
export default Header;