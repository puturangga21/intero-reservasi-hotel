'use client';

import { Menu } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6 flex justify-between items-center">
          {/* <h1 className="font-sprat text-2xl uppercase font-medium text-primary-foreground tracking-wider">
            Suites
          </h1> */}

          <Link href="/">
            <h1 className="font-sprat text-2xl uppercase font-medium text-primary-foreground tracking-wider">
              Suites
            </h1>
          </Link>

          <Button variant="default" size="icon-sm">
            <Menu />
          </Button>
        </div>
      </div>
    </nav>
  );
}
