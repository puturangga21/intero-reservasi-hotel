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
import { auth } from '@/auth';

export default async function DataTable() {
  let data = [];
  const adminSession = await auth();

  try {
    const baseUrl = getBaseUrl();
    const response = await axios.get(`${baseUrl}/api/transaction`);
    data = response.data.data;
  } catch (error) {
    console.log(error?.response?.data);
  }

  // console.log(data[0].reservation.refund.employee.fullname);

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
          <TableHead>Process By</TableHead>
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
              <Badge
                variant={
                  item.status === 'SUCCESS'
                    ? 'default'
                    : item.status === 'REFUNDED'
                    ? 'outline'
                    : 'destructive'
                }>
                {item.status}
              </Badge>
            </TableCell>
            <TableCell>
              {item.status === 'REFUNDED' ? (
                <div className="flex flex-col">
                  <span className="font-medium text-sm">
                    {item.reservation?.refund?.employee?.fullname || 'System'}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {formatWaktu(item.reservation?.refund?.refund_date)}
                  </span>
                </div>
              ) : (
                <span className="text-muted-foreground text-xs">-</span>
              )}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                {item.status === 'SUCCESS' && (
                  <RefundForm data={item} adminSession={adminSession} />
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
