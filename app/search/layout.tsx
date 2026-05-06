import { CategorySidebar } from "@/components/category-sidebar";
import { SortingControls } from "@/components/sorting-controls";
import { prisma } from "@/lib/prisma";
import { Suspense } from "react";
import { unstable_cache } from "next/cache";

async function CategorySidebarServerWrapper() {
  const categories = await unstable_cache(
    () => {
      return prisma.category.findMany({
        select: {
          name: true,
          slug: true,
        },
        orderBy: {
          name: "asc",
        },
      });
    },
    ["categories"],
    {
      tags: ["categories"],
      revalidate: 3600,
    },
  )();
  return <CategorySidebar categories={categories} />;
}

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container mx-auto py-4">
      <div className="flex gap-8">
        <div className="w-31.25 flex-none">
          <Suspense fallback={<div className="w-[125px]">Loading...</div>}>
            <CategorySidebarServerWrapper />
          </Suspense>
        </div>
        <div className="flex-1">{children}</div>
        <div className="w-31.25 flex-none">
          {" "}
          <SortingControls />
        </div>
      </div>
    </main>
  );
}
