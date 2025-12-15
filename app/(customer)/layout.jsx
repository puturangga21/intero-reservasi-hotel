import { auth } from '@/auth';
import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import React from 'react';

export default async function CustomerLayout({ children }) {
  const session = await auth();

  return (
    <main className="relative">
      <Navbar session={session} />
      {children}
      <Footer />
    </main>
  );
}
