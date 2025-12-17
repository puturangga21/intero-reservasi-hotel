'use client';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useGSAP } from '@gsap/react';
import { Menu01Icon, MultiplicationSignIcon, UserIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import gsap from 'gsap';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { Separator } from '../ui/separator';
import FormLogout from '../custom/logout';

const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'Our Suites', href: '#rooms' },
  { label: 'Dining', href: '/dining' },
  { label: 'Experience', href: '/experience' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar({ session }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef(null);
  const tl = useRef(null);

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true })
        .to('.menu-overlay', {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 1.4,
          ease: 'power4.inOut',
        })
        .fromTo(
          '.menu-link-item',
          {
            y: 100,
          },
          {
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power4.out',
          },
          '-=0.4'
        );
    },
    { scope: containerRef }
  );

  const toggleMenu = () => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
      tl.current?.play();
    } else {
      setIsMenuOpen(false);
      tl.current?.reverse();
    }
  };

  return (
    <nav ref={containerRef} className="fixed top-0 left-0 right-0 z-50">
      <div className="relative z-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6 flex justify-between items-center mix-blend-difference">
          <Link href="/">
            <h1
              className={`font-sprat text-2xl uppercase font-medium tracking-wider transition-colors text-primary`}>
              Suites
            </h1>
          </Link>

          <div className="flex items-center gap-4">
            {session && (
              <Popover>
                <PopoverTrigger asChild>
                  <HugeiconsIcon
                    icon={UserIcon}
                    className={`size-6 text-primary-foreground ${
                      isMenuOpen ? 'text-primary' : 'text-primary-foreground'
                    }`}
                  />
                </PopoverTrigger>
                <PopoverContent align="end" className="w-fit ">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-semibold">{session?.user?.email}</p>

                    <Link href={`/my-reserve/${session?.user?.id}`}>
                      <p className="text-sm font-semibold">My Reservations</p>
                    </Link>

                    <Separator className="" />

                    <FormLogout />
                  </div>
                </PopoverContent>
              </Popover>
            )}
            <Button
              variant="default"
              size="icon"
              onClick={toggleMenu}
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 z-50"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}>
              {isMenuOpen ? (
                <HugeiconsIcon icon={MultiplicationSignIcon} className="size-4" />
              ) : (
                <HugeiconsIcon icon={Menu01Icon} className="size-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <div
        className="menu-overlay fixed inset-0 w-screen h-screen bg-secondary text-secondary-foreground z-40 flex flex-col pt-28 items-center"
        style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }}>
        <div className="container mx-auto px-4 flex flex-col items-center justify-center space-y-10">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="overflow-hidden hover:text-primary hover:scale-110 transition-all">
              <Link
                href={item.href}
                className="menu-link-item block text-5xl md:text-7xl font-medium uppercase font-sprat"
                onClick={toggleMenu}>
                {item.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
