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
import { formatRupiah, getBaseUrl } from '@/lib/utils';
import { CodeFolderIcon, Link04Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import axios from 'axios';
import DeleteData from './delete-data';
import { EditData } from './edit-data';
import Link from 'next/link';

export default async function DataTable() {
  let data = [];

  try {
    const baseUrl = getBaseUrl();
    const response = await axios.get(`${baseUrl}/api/room`);
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
          <TableHead>Type</TableHead>
          <TableHead>Room Number</TableHead>
          <TableHead>Price Per Night</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Images</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.room_id}>
            <TableCell>{item.type}</TableCell>
            <TableCell>{item.room_number.toString().padStart(3, '0')}</TableCell>
            <TableCell>{formatRupiah(item.price_per_night)}</TableCell>
            <TableCell>
              <Badge variant={item.status === 'AVAILABLE' ? 'default' : 'destructive'}>
                {item.status}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="line-clamp-4 max-w-100 text-pretty whitespace-normal">
                {item.description}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col gap-1">
                {item.image.map((img, idx) => (
                  <div
                    key={img}
                    className="flex items-center gap-1 underline underline-offset-4 hover:text-primary">
                    <HugeiconsIcon icon={Link04Icon} size={16} />
                    <Link href={img} target="_blank">
                      Link {idx + 1}
                    </Link>
                  </div>
                ))}
              </div>
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
