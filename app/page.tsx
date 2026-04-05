import { ProductCard } from "./ProductCart";
import { prisma } from "@/lib/prisma";
import { Suspense } from "react";
import ProductsSkeleton from "./ProductsSkeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductListServerWrapper } from "@/components/ProductListServerWrapper";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
const pageSize = 3;

export default async function HomePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const Params = await searchParams;
  const page = Number(Params.page) || 1;
  const total = await prisma.product.count();
  const totalPages = Math.ceil(total / pageSize);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <main className="container mx-auto py-4">
      <Breadcrumbs items={[{ label: "Products", href: "/", active: true }]} />

      <Suspense key={page} fallback={<ProductsSkeleton />}>
        <ProductListServerWrapper params={{ pageSize, page }} />
      </Suspense>
      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href={`?page=${Math.max(1, page - 1)}`} />
          </PaginationItem>

          {pages.map((p) => (
            <PaginationItem key={p}>
              <PaginationLink href={`?page=${p}`} isActive={p === page}>
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext href={`?page=${Math.min(totalPages, page + 1)}`} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  );
}
