import Rooms from '@/components/custom/rooms';
import Hero from '@/components/home/hero';
import InfiniteGallery from '@/components/home/infinite-gallery';
import { Button, buttonVariants } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* section 1 */}
      <Hero />

      {/* section 2 */}
      <section className="pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* content */}
          <div className="flex flex-col gap-4 items-center justify-center">
            <h1 className="md:text-4xl lg:text-5xl text-center font-sprat uppercase font-medium tracking-wider leading-[1.2]">
              SETTLED ON THE SERENE SURFACE OF NORTH LAKE TAHOE, A PLEASANT ENCOUNTER
            </h1>
            <p className="text-center text-muted-foreground max-w-200 mx-auto">
              Experience the best service and accommodation in a relaxing, natural
              environment. Stay at Hotel to escape your daily routine! A wide variety of
              rooms for all budgets, with a range of luxury rooms to suit any budget,
              there is something for everyone at Hotel.
            </p>

            <InfiniteGallery />
          </div>
        </div>
      </section>

      {/* section 3 */}
      <section id="rooms" className="pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* content */}
          <div className="flex flex-col gap-14 items-center justify-center">
            <h1 className="md:text-4xl lg:text-5xl max-w-175 text-center font-sprat uppercase font-medium tracking-wider leading-[1.2]">
              EXQUISITE SPACES FOR YOUR Family
            </h1>

            <Rooms />

            <Link href="/#" className="flex uppercase text-sm items-center gap-2">
              See all rooms <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* section 4 */}
      <section id="rooms" className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          {/* content */}
          <div className="flex flex-col gap-2 items-center justify-center">
            <p className="text-sm uppercase text-secondary-foreground">
              EXPERIENCE WHAT YOU'VE ALWAYS WANTED
            </p>
            <h1 className="font-sprat uppercase text-5xl leading-[1.2] text-center max-w-200 mx-auto">
              Let's have you here and enjoy the fun
            </h1>

            <Link
              href="#rooms"
              className={buttonVariants({
                variant: 'default',
                size: 'lg',
                className: 'mt-6 uppercase text-xs',
              })}>
              Book a stay <ArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
