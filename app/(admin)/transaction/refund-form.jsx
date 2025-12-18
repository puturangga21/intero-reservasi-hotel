'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getBaseUrl } from '@/lib/utils';
import { MoneyExchange02FreeIcons } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export function RefundForm({ data, adminSession }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const baseUrl = getBaseUrl();

    try {
      const response = await axios.post(`${baseUrl}/api/refund`, formData);

      if (response.data.success) {
        toast.success(response?.data?.message);
      }

      setOpen(false);
      router.refresh();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  console.log(adminSession);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <HugeiconsIcon icon={MoneyExchange02FreeIcons} size={20} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Refund</DialogTitle>
          <DialogDescription>Click save when you&apos;re done.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="hidden"
            name="reservation_id"
            value={data.reservation.reservation_id}
          />

          <input type="hidden" name="employee_id" value={adminSession?.user?.id} />

          <div className="grid gap-2">
            <Label htmlFor="amount">Refund Amount</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              defaultValue={data.amount}
              placeholder="e.g. 500000"
              required
              disabled={loading}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="reason">Reason for Refund</Label>
            <Textarea
              id="reason"
              name="reason"
              placeholder="Customer cancelled within 24 hours..."
              required
              disabled={loading}
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={loading} variant="destructive">
              {loading ? 'Processing...' : 'Confirm Refund'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
