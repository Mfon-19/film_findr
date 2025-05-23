"use client";

import Link from "next/link";
import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  start: number;
  end: number;
  total: number;
  homeHref?: string;
  showBreadcrumb?: boolean;
  hideMobileCounter?: boolean;
  className?: string;
}

export default function PageHeader({
  title,
  subtitle,
  start,
  end,
  total,
  homeHref = "/discover",
  showBreadcrumb = true,
  hideMobileCounter = false,
  className = "",
}: PageHeaderProps) {
  const range = `${start}-${end}`;
  const totalFormatted = total.toLocaleString();

  return (
    <header className={className}>
      {showBreadcrumb && (
        <div className="flex items-center justify-between">
          <nav className="flex items-center gap-2 text-sm text-white">
            <Link href={homeHref} className="hover:underline">
              Home
            </Link>
            <span className="select-none">›</span>
            <span className="text-white">{title}</span>
          </nav>

          {/* large‐screen counter */}
          {!hideMobileCounter && (
            <span className="hidden text-sm text-white sm:block">
              Showing{" "}
              <span className="font-medium text-white">{range}</span> of{" "}
              <span className="font-medium text-white">
                {totalFormatted}
              </span>{" "}
              {title.toLowerCase()}
            </span>
          )}
        </div>
      )}

      {/* Title + optional subtitle */}
      <div className={subtitle ? "mt-4" : "mt-2"}>
        <h1
          className="text-4xl font-extrabold text-white"
        >
          {title}
        </h1>
        {subtitle && <p className="text-lg text-white">{subtitle}</p>}
      </div>

      {/* small‐screen counter */}
      {!hideMobileCounter && (
        <div className="mt-2 sm:hidden text-sm text-white">
          Showing{" "}
          <span className="font-medium text-white">{range}</span> of{" "}
          <span className="font-medium text-white">{totalFormatted}</span>{" "}
          {title.toLowerCase()}
        </div>
      )}
    </header>
  );
}