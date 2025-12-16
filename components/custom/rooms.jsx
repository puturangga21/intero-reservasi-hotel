import { formatRupiah, getBaseUrl } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';
import { ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import axios from 'axios';

export default async function Rooms() {
  let rooms = [];

  try {
    const baseUrl = getBaseUrl();
    const response = await axios.get(`${baseUrl}/api/room`);
    rooms = response.data.data;
  } catch (error) {
    console.log(error?.response?.data);
  }

  return (
    <div className="w-full bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {rooms.map((room) => (
          <div key={room.room_id} className="flex flex-col group gap-4">
            <div className="relative shrink-0 overflow-hidden w-full aspect-video grayscale group-hover:grayscale-0 transition-all duration-300">
              <Image
                src={room.image[0]}
                alt={room.room_type}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-sm">{formatRupiah(room.price_per_night)}</p>
              <p className="font-sprat font-medium text-2xl uppercase">
                {room.room_type}
              </p>
              <p className="text-muted-foreground text-base line-clamp-2">
                {room.description}
              </p>

              <Button
                className="w-full mt-4 bg-transparent h-13 uppercase"
                variant="outline"
                size="lg">
                Book Now
                <HugeiconsIcon icon={ArrowRight01Icon} className="size-5 -mt-0.5 ml-1" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
