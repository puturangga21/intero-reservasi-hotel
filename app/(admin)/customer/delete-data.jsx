'use client';

import { getBaseUrl } from '@/lib/utils';
import { Delete01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

export default function DeleteData({ id }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const baseUrl = getBaseUrl();

      const response = await axios.delete(`${baseUrl}/api/customer/${id}`);

      if (response.data.success) {
        toast.success('Data berhasil dihapus');
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast.error('Gagal menghapus data');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      onClick={handleDelete}
      className={`cursor-pointer hover:text-destructive ${
        loading ? 'text-destructive' : ''
      }`}>
      <HugeiconsIcon icon={Delete01Icon} size={20} />
    </div>
  );
}
