import Link from "next/link";

const styles = {
  iconSize: "h-6 w-6",
  hoverEffect: `absolute inset-0 -z-10 rounded-full opacity-0 group-hover:opacity-100
    group-hover:scale-150 transition duration-300 ease-out
    bg-white/10 ring-1 ring-white/20`,
  navItem: "flex flex-col items-center gap-1 text-sm font-medium",
} as const;

export interface NavLinkProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  className?: string;
}

export function NavLink({
  href,
  icon: Icon,
  label,
  className = "",
}: NavLinkProps) {
  return (
    <div className="relative group">
      <Link
        href={href}
        className={`flex items-center gap-2 text-sm font-medium text-gray-200 hover:text-white ${className}`}>
        <Icon className={styles.iconSize} />
        {label}
      </Link>
      <span className={styles.hoverEffect} />
    </div>
  );
}

export function MobileNavLink({
  href,
  icon: Icon,
  label,
}: Omit<NavLinkProps, "className">) {
  return (
    <Link href={href} className={`${styles.navItem} text-slate-700`}>
      <Icon className={styles.iconSize} />
      {label}
    </Link>
  );
}