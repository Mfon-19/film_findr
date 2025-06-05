"use client";

import Logo from "../logo";
import { DesktopHeader } from "./desktop-header";
import { MobileNavigation } from "./mobile-navigation";
import { useSearch } from "./use-search";

export default function Header() {
  const searchProps = useSearch();

  return (
    <>
      <DesktopHeader searchProps={searchProps} />

      <div className="hidden pt-4 text-center">
        <Logo />
      </div>

      <MobileNavigation />
    </>
  );
}

export { Header };
