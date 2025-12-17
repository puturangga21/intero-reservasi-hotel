import { auth } from '@/auth';
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
import { getBaseUrl } from '@/lib/utils';
import { CodeFolderIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import axios from 'axios';
import DeleteData from './delete-data';
import { EditData } from './edit-data';

export default async function DataTable() {
  let data = [];
  const session = await auth();

  try {
    const baseUrl = getBaseUrl();
    const response = await axios.get(`${baseUrl}/api/maintenance`);
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
          <TableHead>Room Number</TableHead>
          <TableHead>Room Type</TableHead>
          <TableHead>Issue Description</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.maintenance_id}>
            <TableCell>{item.room.room_number}</TableCell>
            <TableCell>{item.room.room_type}</TableCell>
            <TableCell>
              <div className="line-clamp-4 max-w-100 text-pretty whitespace-normal">
                {item.issue_description}
              </div>
            </TableCell>
            <TableCell>
              <Badge variant={item.priority === 'LOW' ? 'secondary' : 'destructive'}>
                {item.priority}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge variant={item.status === 'COMPLETED' ? 'default' : 'destructive'}>
                {item.status}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <EditData
                  maintenanceId={item.maintenance_id}
                  data={item}
                  session={session}
                />
                <DeleteData />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
