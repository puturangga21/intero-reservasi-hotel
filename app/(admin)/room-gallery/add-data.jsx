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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getBaseUrl } from '@/lib/utils';
import { AddCircleHalfDotIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export function AddData() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const baseUrl = getBaseUrl();

    try {
      const response = await axios.post(`${baseUrl}/api/room-gallery`, formData);

      if (response.data.success) {
        toast.success(response?.data?.message);
      }

      setOpen(false);
      router.refresh();
    } catch (error) {
      console.log(error.response.data);
      toast.error(error?.response?.data?.message || 'Terjadi kesalahan pada server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          Create Room Gallery{' '}
          <HugeiconsIcon icon={AddCircleHalfDotIcon} className="size-4 -mt-0.5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Add Room Gallery</DialogTitle>
          <DialogDescription>Click save when you&apos;re done.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="room_type">Room Type</Label>
              <Select name="room_type" required>
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
              <Label htmlFor="image">Image (3 Image of room)</Label>
              <Input id="image" name="image" type="file" accept="image/*" multiple />
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
