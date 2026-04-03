import { ProductCard } from "./ProductCart";
import { prisma } from "@/lib/prisma";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function HomePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const Params = await searchParams;

  const page = Number(Params.page) || 1;
  const pageSize = 3;
  const skip = (page - 1) * pageSize;

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      skip,
      take: pageSize,
    }),
    prisma.product.count(),
  ]);

  const totalPages = Math.ceil(total / pageSize);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Home</h1>

      <p>Showing {products.length} products</p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

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

          {/* <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem> */}

          <PaginationItem>
            <PaginationNext href={`?page=${Math.min(totalPages, page + 1)}`} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  );
}
