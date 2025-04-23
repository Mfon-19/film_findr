import Header from "@/components/header";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-lvh bg-[#00050d]">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
