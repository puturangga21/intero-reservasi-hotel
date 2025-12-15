import { Button, buttonVariants } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowDown02Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons';

export default function Hero() {
  return (
    <section className="relative h-screen lg:h-screen w-full flex items-end justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.jpg"
          alt="Hotel Hero Background"
          fill
          className="object-cover object-center brightness-[0.7]"
          priority
        />
      </div>

      <div className="relative z-10 max-w-200 mb-16 mx-auto px-4 text-center text-white">
        <p className="text-xs text-muted">PRIVATE ISLAND RESORT IN BALI</p>
        <h1 className="text-5xl md:text-6xl leading-[1.2] font-medium uppercase font-sprat tracking-wider">
          The most exclusive private hotel
        </h1>

        <Link
          href="#rooms"
          className={buttonVariants({
            variant: 'default',
            size: 'lg',
            className: 'mt-6 uppercase text-xs',
          })}>
          Book a stay <HugeiconsIcon icon={ArrowRight01Icon} />
        </Link>

        <div className="mt-12 flex flex-col items-center justify-center gap-4">
          <HugeiconsIcon icon={ArrowDown02Icon} />
          <p className="text-xs text-muted uppercase">Scroll down</p>
        </div>
      </div>
    </section>
  );
}
