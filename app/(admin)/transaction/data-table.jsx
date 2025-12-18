import { Badge } from '@/components/ui/badge';
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
import { RefundForm } from './refund-form';

export default async function DataTable() {
  let data = [];

  try {
    const baseUrl = getBaseUrl();
    const response = await axios.get(`${baseUrl}/api/transaction`);
    data = response.data.data;
  } catch (error) {
    console.log(error?.response?.data);
  }

  console.log(data);

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
          <TableHead>Customer Email</TableHead>
          <TableHead>Room Type</TableHead>
          <TableHead>Total Transaction</TableHead>
          <TableHead>Payment Method</TableHead>
          <TableHead>Payment Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Refund Request</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.transaction_id}>
            <TableCell>{item.reservation.customer.email}</TableCell>
            <TableCell>{item.reservation.room.room_type}</TableCell>
            <TableCell>{formatRupiah(item.amount)}</TableCell>
            <TableCell>{item.payment_method || 'NOT PAYED'}</TableCell>
            <TableCell>{formatWaktu(item.payment_date)}</TableCell>
            <TableCell>
              <Badge variant={item.status === 'SUCCESS' ? 'default' : 'destructive'}>
                {item.status}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <RefundForm />
                {/* <EditData />


                <DeleteData /> */}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
