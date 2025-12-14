import prisma from '@/lib/prisma';

export default async function Home() {
  const customer = await prisma.customer.findMany();

  return (
    <section className="max-w-4xl mx-auto p-4">
      {customer.length > 0 ? (
        <ul className="list-disc">
          {customer.map((customer) => (
            <li key={customer.customer_id}>{customer.fullname}</li>
          ))}
        </ul>
      ) : (
        <p>No customers found</p>
      )}
    </section>
  );
}
