'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { formatRupiah, getBaseUrl } from '@/lib/utils';
import { ArrowRight01Icon, Calendar03Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import axios from 'axios';
import { differenceInCalendarDays, format } from 'date-fns';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function CheckoutForm({ data, session, availableRooms }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [dateStart, setDateStart] = useState();
  const [dateEnd, setDateEnd] = useState();
  const [selectedRoomId, setSelectedRoomId] = useState('');

  const nights =
    dateStart && dateEnd && dateEnd > dateStart
      ? differenceInCalendarDays(dateEnd, dateStart)
      : 0;

  const totalPrice = nights * data.price_per_night;

  const filteredRooms = useMemo(() => {
    if (!dateStart || !dateEnd) return [];

    return availableRooms.filter((room) => {
      if (room.status === 'MAINTENANCE') return false;

      const isBooked = room.booked_dates.some((booking) => {
        const bookingStart = new Date(booking.start);
        const bookingEnd = new Date(booking.end);

        return dateStart < bookingEnd && dateEnd > bookingStart;
      });

      return !isBooked;
    });
  }, [availableRooms, dateStart, dateEnd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedRoomId) {
      toast.error('Please select a room number');
      return;
    }

    const formData = new FormData(e.currentTarget);
    const baseUrl = getBaseUrl();
    setLoading(true);

    try {
      const response = await axios.post(`${baseUrl}/api/reserve`, formData);

      if (response.data.success) {
        toast.success(response?.data?.message);
        setDateStart(null);
        setDateEnd(null);
        setSelectedRoomId('');

        router.refresh();
        router.push(`/my-reserve/${session?.user?.id}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Terjadi kesalahan pada server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex flex-col gap-1 pb-4">
            <h2 className="text-2xl font-medium font-sprat">{data.room_type}</h2>
            <p className="text-muted-foreground">
              {formatRupiah(data.price_per_night)} per night
            </p>
          </div>

          <Separator />
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="room_id" value={selectedRoomId} />
        <input type="hidden" name="total_price" value={totalPrice} />
        <input type="hidden" name="total_nights" value={nights} />
        <input
          type="hidden"
          name="check_in_date"
          value={dateStart?.toISOString() ?? ''}
        />
        <input type="hidden" name="check_out_date" value={dateEnd?.toISOString() ?? ''} />

        <CardContent>
          <div className="grid gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  disabled={!session || loading}
                  variant="outline"
                  data-empty={!dateStart}
                  className="data-[empty=true]:text-muted-foreground h-10 w-full items-center justify-start gap-6 rounded-full">
                  <HugeiconsIcon icon={Calendar03Icon} />
                  {dateStart ? (
                    format(dateStart, 'd MMM yyyy')
                  ) : (
                    <span>Pick a start date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateStart}
                  onSelect={(date) => {
                    setDateStart(date);
                    setSelectedRoomId('');
                  }}
                  disabled={(date) => date < new Date().setHours(0, 0, 0, 0)}
                />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  disabled={!session || loading || !dateStart}
                  data-empty={!dateEnd}
                  className="data-[empty=true]:text-muted-foreground h-10 w-full items-center justify-start gap-6 rounded-full">
                  <HugeiconsIcon icon={Calendar03Icon} />
                  {dateEnd ? (
                    format(dateEnd, 'd MMM yyyy')
                  ) : (
                    <span>Pick an end date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateEnd}
                  onSelect={(date) => {
                    setDateEnd(date);
                    setSelectedRoomId('');
                  }}
                  disabled={(date) => (dateStart ? date <= dateStart : date < new Date())}
                />
              </PopoverContent>
            </Popover>

            <Select
              onValueChange={setSelectedRoomId}
              value={selectedRoomId}
              disabled={!session || loading || !dateStart || !dateEnd}>
              <SelectTrigger className="w-full h-10!">
                <SelectValue
                  placeholder={
                    !dateStart || !dateEnd
                      ? 'Select dates first'
                      : filteredRooms.length > 0
                      ? 'Select available room'
                      : 'No rooms available'
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {filteredRooms.length > 0 ? (
                  filteredRooms.map((room) => (
                    <SelectItem key={room.room_id} value={room.room_id}>
                      Room {room.room_number}
                    </SelectItem>
                  ))
                ) : (
                  <div className="p-2 text-sm text-center text-muted-foreground">
                    {!dateStart || !dateEnd
                      ? 'Please pick check-in & check-out dates first.'
                      : 'All rooms are fully booked or unavailable for these dates.'}
                  </div>
                )}
              </SelectContent>
            </Select>

            {nights > 0 && (
              <>
                <div className="flex flex-col gap-2 mt-4">
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-muted-foreground underline">
                      {formatRupiah(data.price_per_night ?? 0)} x {nights} nights
                    </span>
                    <span>{formatRupiah(totalPrice)}</span>
                  </div>

                  <hr />

                  <div className="mt-2 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatRupiah(totalPrice)}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col gap-4 w-full">
            <Button
              className="w-full h-11 uppercase text-sm mt-4"
              disabled={loading || !session}>
              Book a stay{' '}
              <HugeiconsIcon icon={ArrowRight01Icon} className="size-5 -mt-0.5" />
            </Button>

            {!session && (
              <p className="text-destructive text-xs uppercase text-center">
                Please{' '}
                <Link href="/login" className="font-semibold">
                  login
                </Link>{' '}
                to book this room.
              </p>
            )}
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
