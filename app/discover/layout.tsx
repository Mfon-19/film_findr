import Header from "@/components/header";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-lvh">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
