import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatRupiah, getBaseUrl } from '@/lib/utils';
import {
  Delete01Icon,
  PencilEdit02Icon,
  CodeFolderIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import axios from 'axios';
import Link from 'next/link';
import { Empty } from '@/components/ui/empty';
import {
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Badge } from '@/components/ui/badge';

export default async function DataTable() {
  let data = [];

  try {
    const baseUrl = getBaseUrl();
    const response = await axios.get(`${baseUrl}/api/transaction`);
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
          <TableHead>Customer Email</TableHead>
          <TableHead>Room Type</TableHead>
          <TableHead>Total Transaction</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.transaction_id}>
            <TableCell>{item.reservation.customer.email}</TableCell>
            <TableCell>{item.reservation.room.room_type}</TableCell>
            <TableCell>{formatRupiah(item.amount)}</TableCell>
            <TableCell>
              <Badge variant={item.status === 'SUCCESS' ? 'default' : 'destructive'}>
                {item.status}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
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
