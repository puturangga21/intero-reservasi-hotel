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
import { Delete01Icon, PencilEdit02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import axios from 'axios';
import Link from 'next/link';
import { EditData } from './edit-data';
import DeleteData from './delete-data';

export default async function DataTable() {
  let data = [];

  // try {
  //   const baseUrl = getBaseUrl();
  //   const response = await axios.get(`${baseUrl}/api/customer`);
  //   data = response.data.data;
  // } catch (error) {
  //   console.log(error?.response?.data);
  // }

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Customer Fullname</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone Number</TableHead>
          <TableHead>Identity</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.customer_id}>
            <TableCell>{item.fullname}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.phone_number}</TableCell>
            <TableCell>{item.img_identity}</TableCell>
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
