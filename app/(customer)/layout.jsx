import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import React from 'react';

export default function CustomerLayout({ children }) {
  return (
    <main className="relative">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
