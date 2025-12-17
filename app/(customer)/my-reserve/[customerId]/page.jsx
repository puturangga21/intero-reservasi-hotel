import { auth } from '@/auth';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatRupiah, formatWaktu, getBaseUrl } from '@/lib/utils';
import {
  Calendar03Icon,
  Invoice03Icon,
  Location01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';

// Fungsi helper untuk badge status
const getBadgeVariant = (status) => {
  switch (status) {
    case 'CONFIRMED':
    case 'CHECKED_IN':
    case 'CHECKED_OUT':
      return 'default';
    case 'REFUNDED':
      return 'secondary';
    case 'PENDING':
    case 'CANCELLED':
    case 'NO_SHOW':
      return 'destructive';
    default:
      return 'outline';
  }
};

export default async function Page() {
  let data = [];
  const session = await auth();

  try {
    const baseUrl = getBaseUrl();
    const response = await axios.get(
      `${baseUrl}/api/customer-reservations/${session?.user?.id}`
    );
    if (response?.data?.success) {
      data = response.data.data;
    }
  } catch (error) {
    console.log(error?.response?.data);
  }

  return (
    <section className="pt-21 pb-25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 mb-8 text-center md:text-left">
          <h1 className="text-4xl font-medium font-sprat uppercase">My Reservations</h1>
          <p className="text-muted-foreground">
            History of your stays and upcoming trips.
          </p>
        </div>

        {data.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-background border-dashed">
            <div className="p-4 rounded-full bg-secondary mb-4">
              <HugeiconsIcon
                icon={Invoice03Icon}
                className="size-8 text-muted-foreground"
              />
            </div>
            <h3 className="text-lg font-medium">No reservations yet</h3>
            <p className="text-muted-foreground max-w-sm mt-2 mb-6">
              You haven&apos;t made any reservations yet. Explore our rooms and book your
              next stay!
            </p>
            <Link href="/">
              <Button>Browse Rooms</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {data.map((item) => {
              return (
                <Card
                  key={item.reservation_id}
                  className="overflow-hidden group p-0 border-none shadow-md">
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="relative md:w-2/5 min-h-75 md:min-h-0">
                      <Image
                        src={item.roomImage}
                        alt={item.room.room_type}
                        fill
                        sizes="(max-width: 768px) 100vw, 40vw"
                        className="object-cover brightness-75 group-hover:brightness-100 transition-all duration-300"
                      />

                      {/* Overlay Content */}
                      <div className="absolute inset-0 p-6 flex flex-col justify-between text-white z-10 bg-linear-to-t from-black/60 to-transparent">
                        <div className="flex items-start justify-between">
                          <Badge variant={getBadgeVariant(item.status)}>
                            {item.status}
                          </Badge>
                        </div>

                        <div>
                          <h3 className="text-3xl font-sprat uppercase text-white drop-shadow-md">
                            {item.room.room_type}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-200 mt-2">
                            <HugeiconsIcon icon={Location01Icon} className="size-4" />
                            <span>Intero Hotel Bali, Room #{item.room.room_number}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 md:p-8 flex-1 flex flex-col justify-between gap-6 bg-card">
                      <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                        <div className="flex flex-col gap-1.5">
                          <span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                            Check-in
                          </span>
                          <div className="flex items-center gap-2 font-medium">
                            <HugeiconsIcon
                              icon={Calendar03Icon}
                              className="size-5 text-primary"
                            />
                            {formatWaktu(item.check_in_date)}
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                            Check-out
                          </span>
                          <div className="flex items-center gap-2 font-medium">
                            <HugeiconsIcon
                              icon={Calendar03Icon}
                              className="size-5 text-primary"
                            />
                            {formatWaktu(item.check_out_date)}
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                            Total Price
                          </span>
                          <p className="font-semibold text-xl text-primary">
                            {formatRupiah(item.total_price)}
                          </p>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">
                            Duration
                          </span>
                          <p className="font-medium">{item.total_nights} Nights</p>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex justify-end gap-3 mt-auto">
                        {item.status === 'PENDING' && <Button size="lg">Pay Now</Button>}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
