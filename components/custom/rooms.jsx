import { formatRupiah } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

const rooms = [
  {
    id: 'clq2x6h3m000108l48r2n1x4y',
    name: 'Royal Garden Villa',
    price_per_night: 4200000, // Rp 4.200.000
    image:
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2070&auto=format&fit=crop',
    description:
      'Designed and manufactured by a team of experts, the hotel room is a new way of sleeping, environmentally friendly',
  },
  {
    id: 'clq2x7p8q000208l42j9m5b3c',
    name: 'Executive Business Suite',
    price_per_night: 1850000, // Rp 1.850.000
    image:
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop',
    description:
      'Designed and manufactured by a team of experts, the hotel room is a new way of sleeping, environmentally friendly',
  },
  {
    id: 'clq2x8w4v000308l46h7k2d9f',
    name: 'Family Horizon Room',
    price_per_night: 3100000, // Rp 3.100.000
    image:
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2070&auto=format&fit=crop',
    description:
      'Designed and manufactured by a team of experts, the hotel room is a new way of sleeping, environmentally friendly',
  },
  {
    id: 'clq2x9d2s000408l49p3n8v5x',
    name: 'Presidential Penthouse',
    price_per_night: 8500000, // Rp 8.500.000
    image:
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop',
    description:
      'Designed and manufactured by a team of experts, the hotel room is a new way of sleeping, environmentally friendly',
  },
];

export default function Rooms() {
  return (
    <div className="w-full bg-background">
      <div className="grid grid-cols-2 gap-8">
        {rooms.map((room) => (
          <div key={room.id} className="flex flex-col group gap-4">
            <div className="relative shrink-0 overflow-hidden w-full aspect-video grayscale group-hover:grayscale-0 transition-all duration-300">
              <Image
                src={room.image}
                alt={room.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm">{formatRupiah(room.price_per_night)}</p>
              <p className="font-sprat font-medium text-2xl uppercase">{room.name}</p>
              <p className="text-muted-foreground text-base">{room.description}</p>

              <Button
                className="w-full mt-4 bg-transparent h-13 uppercase"
                variant="outline"
                size="lg">
                Book Now
                <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
