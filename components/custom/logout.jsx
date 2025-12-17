'use client';

import axios from 'axios';
import { Button } from '../ui/button';
import { getBaseUrl } from '@/lib/utils';
import { toast } from 'sonner';
import { HugeiconsIcon } from '@hugeicons/react';
import { Logout01Icon } from '@hugeicons/core-free-icons';

export default function FormLogout() {
  const handleLogout = async () => {
    const baseUrl = getBaseUrl();
    try {
      const response = await axios.post(`${baseUrl}/api/logout`);

      if (response.data.success) {
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Gagal melakukan logout');
    }
  };

  return (
    <Button
      variant="destructive"
      className="w-full text-sm cursor-pointer"
      onClick={handleLogout}>
      Logout <HugeiconsIcon icon={Logout01Icon} />
    </Button>
  );
}
