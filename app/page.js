import prisma from '@/lib/prisma';

export default async function Home() {
  const customer = await prisma.customer.findMany();

  console.log(customer);

  return (
    <section>
      <h1>Home</h1>
    </section>
  );
}
