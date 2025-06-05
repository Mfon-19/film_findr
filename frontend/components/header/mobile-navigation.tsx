import { MobileNavLink } from "./nav-link";
import { MOBILE_NAVIGATION_ITEMS } from "./constants";

export function MobileNavigation() {
  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center h-16 bg-white/50 shadow-[0_-2px_10px_0_rgb(0_0_0_/_0.05)] backdrop-blur-sm lg:hidden"
      aria-label="Mobile navigation"
    >
      {MOBILE_NAVIGATION_ITEMS.map((item) => (
        <MobileNavLink
          key={item.href}
          href={item.href}
          icon={item.icon}
          label={item.label}
        />
      ))}
    </nav>
  );
}