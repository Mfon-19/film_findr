import Link from "next/link";
import Logo from "../logo";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { NavLink } from "./nav-link";
import { SearchComponent, SearchComponentProps } from "./search-component";
import { NAVIGATION_ITEMS } from "./constants";

const styles = {
  pill: "rounded-full backdrop-blur-md ring-1 ring-white/10",
} as const;

export interface DesktopHeaderProps {
  searchProps: SearchComponentProps;
}

export function DesktopHeader({ searchProps }: DesktopHeaderProps) {
  return (
    <header className="hidden lg:flex items-center justify-between px-8 py-4 pointer-events-none">
      {/* Logo */}
      <div className="pointer-events-auto px-4 py-1">
        <Logo />
      </div>

      {/* Navigation */}
      <nav
        className={`pointer-events-auto flex items-center gap-10 px-12 py-3 ${styles.pill}`}>
        {NAVIGATION_ITEMS.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
          />
        ))}
      </nav>

      {/* Search and Profile */}
      <div className="pointer-events-auto flex items-center gap-6">
        <SearchComponent {...searchProps} />
        <Link
          href="/profile"
          className={`flex h-12 w-12 items-center justify-center ${styles.pill} hover:bg-white/10 transition-colors`}
          aria-label="User profile">
          <UserCircleIcon className="h-8 w-8 text-gray-200" />
        </Link>
      </div>
    </header>
  );
}
