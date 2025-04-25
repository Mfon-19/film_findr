"use client";

import React from "react";

interface EntityGridProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  className?: string;
}

const EntityGrid = ({
  items,
  renderItem,
  className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-8",
}: EntityGridProps<T>) => {
  return <div className={className}>{items.map(renderItem)}</div>;
};

export default EntityGrid;
