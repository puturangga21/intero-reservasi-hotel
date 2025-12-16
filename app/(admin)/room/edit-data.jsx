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
import { PencilEdit02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getBaseUrl } from '@/lib/utils';
import axios from 'axios';
import { toast } from 'sonner';

export function EditData({ data }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const baseUrl = getBaseUrl();

    try {
      const response = await axios.patch(`${baseUrl}/api/room/${data.room_id}`, formData);

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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <HugeiconsIcon icon={PencilEdit02Icon} size={20} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Edit room</DialogTitle>
          <DialogDescription>Click save when you&apos;re done.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="room_type">Room Type</Label>
              <Select
                name="room_type"
                required
                defaultValue={data.room_type}
                disabled={loading}>
                <SelectTrigger className="w-full" id="room_type">
                  <SelectValue placeholder="Select a room type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Room Type</SelectLabel>
                    <SelectItem value="ROYAL">ROYAL</SelectItem>
                    <SelectItem value="EXECUTIVE">EXECUTIVE</SelectItem>
                    <SelectItem value="FAMILY">FAMILY</SelectItem>
                    <SelectItem value="PRESEDENTIAL">PRESEDENTIAL</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="price_per_night">Price per Night</Label>
              <Input
                id="price_per_night"
                name="price_per_night"
                placeholder="100000"
                required
                disabled={loading}
                defaultValue={data.price_per_night}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="status">Status</Label>
              <Select
                name="status"
                required
                defaultValue={data.status}
                disabled={loading}>
                <SelectTrigger className="w-full" id="status">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="AVAILABLE">AVAILABLE</SelectItem>
                    <SelectItem value="MAINTENANCE">MAINTENANCE</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                name="description"
                id="description"
                required
                disabled={loading}
                defaultValue={data.description}
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
