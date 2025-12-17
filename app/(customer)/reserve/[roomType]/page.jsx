import { formatRupiah, getBaseUrl } from '@/lib/utils';
import axios from 'axios';
import Image from 'next/image';
import React from 'react';

import CheckoutForm from './checkout-form';
import { auth } from '@/auth';

const amenites = [
  'Free WiFi',
  'Breakfast Included',
  'Shower',
  'Gym Service',
  'Air Conditioning',
];

export default async function Page({ params }) {
  const session = await auth();
  const { roomType } = await params;

  let data = [];

  try {
    const baseUrl = getBaseUrl();
    const response = await axios.get(`${baseUrl}/api/room-types/${roomType}`);
    data = response.data.data;
  } catch (error) {
    console.log(error?.response?.data);
  }

  return (
    <section className="pt-21 pb-25">
      <div className="max-w-7xl mt-25 mx-auto px-4 sm:px-6 lg:px-8">
        {/* title */}
        <h1 className="text-[110px] font-medium font-sprat text-center text-secondary-foreground">
          {data.room_type}
        </h1>

        {/* image */}
        <div className="flex flex-col gap-2 mt-10">
          <div className="bg-primary aspect-video max-h-150 w-full relative shrink-0 overflow-hidden">
            <Image
              src={data.image[0]}
              alt="Room Image"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-primary aspect-4/3 max-h-100 w-full relative shrink-0">
              <Image
                src={data.image[1]}
                alt="Room Image"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="bg-primary aspect-4/3 max-h-100 w-full relative shrink-0">
              <Image
                src={data.image[2]}
                alt="Room Image"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-10 gap-8 mt-10">
          <div className="col-span-7 flex flex-col gap-10">
            <div className="flex flex-col items-start gap-2.5">
              <h2 className="font-sprat uppercase font-medium text-2xl text-secondary-foreground">
                Room Description
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-150">
                {data.description}
              </p>
            </div>

            <div className="flex flex-col items-start gap-2.5">
              <h2 className="font-sprat uppercase font-medium text-2xl text-secondary-foreground">
                Amenities
              </h2>

              <div className="grid grid-cols-2  w-full max-w-187.5 gap-2">
                {amenites.map((amenity) => (
                  <div key={amenity} className="border p-4 flex items-center gap-4">
                    <div className="size-3 bg-primary rounded-full" />
                    <p className="text-muted-foreground">{amenity}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-3">
            <CheckoutForm
              data={data}
              session={session}
              availableRooms={data.availableRooms}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
