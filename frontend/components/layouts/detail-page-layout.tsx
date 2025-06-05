import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

interface DetailPageLayoutProps {
  children: ReactNode;
  backdropPath: string;
  title: string;
  heroSection: ReactNode;
  detailsSection: ReactNode;
  backHref?: string;
}

export default function DetailPageLayout({
  children,
  backdropPath,
  title,
  heroSection,
  detailsSection,
  backHref = "/",
}: DetailPageLayoutProps) {
  return (
    <main className="min-h-screen relative bg-[#00050d]">
      {/* Top fade gradient */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#00050d] to-transparent z-10" />

      {/* Hero section */}
      <div className="relative h-[70vh] w-full">
        <Image
          src={backdropPath}
          alt={title}
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#00050d] to-transparent" />
        {heroSection}
      </div>

      {/* Details section */}
      <div className="container mx-auto px-8 py-12 space-y-10">
        {detailsSection}
        {children}
      </div>

      {/* Back button */}
      <div className="container mx-auto px-8 pb-16">
        <Link
          href={backHref}
          className="inline-block text-gray-400 hover:text-white transition-colors">
          &larr; Back to Home
        </Link>
      </div>
    </main>
  );
}
