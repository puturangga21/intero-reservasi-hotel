import { auth } from '@/auth';
import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function CustomerLayout({ children }) {
  const session = await auth();

  if (session && session.user.role !== 'customer') {
    redirect('/customer');
  }

  return (
    <main className="relative">
      <Navbar session={session} />
      {children}
      <Footer />
    </main>
  );
}
