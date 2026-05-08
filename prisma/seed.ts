import { Product, User } from "@/generated/prisma/client";
import { prisma } from "../lib/prisma";
import { hashPassword } from "@/lib/auth";
async function main() {
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const electronics = await prisma.category.create({
    data: {
      name: "Electronics",
      slug: "electronics",
    },
  });

  const clothing = await prisma.category.create({
    data: {
      name: "Clothing",
      slug: "clothing",
    },
  });

  const home = await prisma.category.create({
    data: {
      name: "Home",
      slug: "home",
    },
  });

  const products: Product[] = [
    {
      id: "1",
      name: "Wireless Headphones",
      description: "Premium noise-cancelling wireless headphones",
      price: 1500,
      image:
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      categoryId: electronics.id,
      slug: "wireless-headphones",
      inventory: 15,
    },
    {
      id: "2",
      name: "Smart Watch",
      description:
        "Fitness tracker with heart rate monitoring and sleep analysis.",
      price: 3000,
      image:
        "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      categoryId: electronics.id,
      slug: "smart-watch",
      inventory: 10,
    },
    {
      id: "3",
      name: "Running Shoes",
      description: "Lightweight running shoes with responsive cushioning.",
      price: 5500,
      image:
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      categoryId: clothing.id,
      slug: "running-shoes",
      inventory: 3,
    },
    {
      id: "4",
      name: "Ceramic Mug",
      description: "Handcrafted ceramic mug with minimalist design.",
      price: 4900,
      image:
        "https://images.unsplash.com/photo-1495100497150-fe209c585f50?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      categoryId: home.id,
      slug: "ceramic-mug",
      inventory: 0,
    },
    {
      id: "5",
      name: "Leather Backpack",
      description: "Durable leather backpack with multiple compartments.",
      price: 3500,
      image:
        "https://images.unsplash.com/photo-1577733966973-d680bffd2e80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      categoryId: clothing.id,
      slug: "leather-backpack",
      inventory: 1,
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }
  const users: User[] = [
    {
      id: "1",
      email: "admin@example.com",
      password: "password123",
      name: "Admin User",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      email: "user@example.com",
      password: "password456",
      name: "Regular User",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  for (const user of users) {
    const hashedPassword = await hashPassword(user.password);
    await prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });
  }
  console.log("Users created");
}
main()
  .then(async () => {
    console.log("Seeding complete!");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
