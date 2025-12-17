import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatRupiah, formatWaktu, getBaseUrl } from '@/lib/utils';
import { CodeFolderIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import axios from 'axios';
import DeleteData from './delete-data';
import { EditData } from './edit-data';
import { Badge } from '@/components/ui/badge';

const getBadgeVariant = (status) => {
  switch (status) {
    case 'CONFIRMED':
    case 'CHECKED_IN':
    case 'CHECKED_OUT':
      return 'default';

    case 'REFUNDED':
      return 'secondary';

    case 'PENDING':
      return 'destructive';

    case 'CANCELLED':
    case 'NO_SHOW':
      return 'destructive';

    default:
      return 'outline';
  }
};

export default async function DataTable() {
  let data = [];

  try {
    const baseUrl = getBaseUrl();
    const response = await axios.get(`${baseUrl}/api/reserve`);
    data = response.data.data;
  } catch (error) {
    console.log(error?.response?.data);
  }

  if (data.length === 0) {
    return (
      <Empty className="border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <HugeiconsIcon icon={CodeFolderIcon} />
          </EmptyMedia>
          <EmptyTitle>No data Yet</EmptyTitle>
          <EmptyDescription>
            You haven&apos;t created any projects yet. Get started by creating your first
            project.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent />
      </Empty>
    );
  }

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Customer Fullname</TableHead>
          <TableHead>Room Type</TableHead>
          <TableHead>Room Number</TableHead>
          <TableHead>Check In Date</TableHead>
          <TableHead>Check Out Date</TableHead>
          <TableHead>Total Nights</TableHead>
          <TableHead>Total Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.reservation_id}>
            <TableCell>{item.customer.fullname}</TableCell>
            <TableCell>{item.room.room_type}</TableCell>
            <TableCell>{item.room.room_number.toString().padStart(3, '0')}</TableCell>
            <TableCell>{formatWaktu(item.check_in_date)}</TableCell>
            <TableCell>{formatWaktu(item.check_out_date)}</TableCell>
            <TableCell>{item.total_nights}</TableCell>
            <TableCell>{formatRupiah(item.total_price)}</TableCell>
            <TableCell>
              <Badge variant={getBadgeVariant(item.status)}>{item.status}</Badge>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <EditData />

                <DeleteData />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
