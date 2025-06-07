"use client";

import React from "react";

interface EntityGridProps {
  children: React.ReactNode;
  className?: string;
}

const EntityGrid = ({
  children,
  className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-8",
}: EntityGridProps) => {
  return <div className={className}>{children}</div>;
};

export default EntityGrid;
