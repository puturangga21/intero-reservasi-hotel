'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
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
import { getBaseUrl } from '@/lib/utils';
import { Calendar03Icon, ToolsIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import axios from 'axios';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export function MaintenanceForm({ idRoom, session }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dateStart, setDateStart] = useState();
  const [dateEnd, setDateEnd] = useState();
  const [maintenanceRanges, setMaintenanceRanges] = useState([]);

  useEffect(() => {
    if (!open) return;

    axios
      .get(`${getBaseUrl()}/api/maintenance?room_id=${idRoom}`)
      .then((res) => setMaintenanceRanges(res.data.data))
      .catch(() => setMaintenanceRanges([]));
  }, [open, idRoom]);

  const isDateInMaintenanceRange = (date) => {
    return maintenanceRanges.some((m) => {
      if (!['PENDING', 'IN_PROGRESS'].includes(m.status)) return false;
      const start = new Date(m.start_date);
      const end = new Date(m.end_date);

      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);

      return date >= start && date <= end;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const baseUrl = getBaseUrl();

    try {
      const response = await axios.post(`${baseUrl}/api/maintenance`, formData);

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
        <HugeiconsIcon icon={ToolsIcon} size={20} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Maintenance room</DialogTitle>
          <DialogDescription>Click save when you&apos;re done.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="room_id" value={idRoom} />
          <input type="hidden" name="employee_id" value={session?.user?.id} />
          <input type="hidden" name="start_date" value={dateStart?.toISOString() ?? ''} />
          <input type="hidden" name="end_date" value={dateEnd?.toISOString() ?? ''} />

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="issue_description">Issue Description</Label>
              <Textarea
                id="issue_description"
                name="issue_description"
                placeholder="Describe the issue"
                required
                disabled={loading}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="priority">Priority</Label>
              <Select name="priority" required disabled={loading}>
                <SelectTrigger className="w-full" id="priority">
                  <SelectValue placeholder="Select a priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Priority</SelectLabel>
                    <SelectItem value="LOW">LOW</SelectItem>
                    <SelectItem value="HIGH">HIGH</SelectItem>
                    <SelectItem value="EMERGENCY">EMERGENCY</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="status">Status</Label>
              <Select name="status" required disabled={loading}>
                <SelectTrigger className="w-full" id="status">
                  <SelectValue placeholder="Select a Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="PENDING">PENDING</SelectItem>
                    <SelectItem value="IN_PROGRESS">IN_PROGRESS</SelectItem>
                    <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="maintenance_start_date">Maintenance Start Date</Label>
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
                    onSelect={(date) => setDateStart(date)}
                    disabled={(date) =>
                      date < new Date().setHours(0, 0, 0, 0) ||
                      isDateInMaintenanceRange(date)
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="maintenance_end_date">Maintenance End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    disabled={!session || loading}
                    variant="outline"
                    data-empty={!dateEnd}
                    className="data-[empty=true]:text-muted-foreground h-10 w-full items-center justify-start gap-6 rounded-full">
                    <HugeiconsIcon icon={Calendar03Icon} />
                    {dateEnd ? (
                      format(dateEnd, 'd MMM yyyy')
                    ) : (
                      <span>Pick a start date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateEnd}
                    onSelect={(date) => setDateEnd(date)}
                    disabled={(date) =>
                      !dateStart ||
                      date <= dateStart ||
                      isDateInMaintenanceRange(date)
                    }
                  />
                </PopoverContent>
              </Popover>
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
