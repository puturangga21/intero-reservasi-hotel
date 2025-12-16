'use client';

import { getBaseUrl } from '@/lib/utils';
import { Logout01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import axios from 'axios';
import { toast } from 'sonner';
import { Button } from '../ui/button';

export default function LogoutAdmin() {
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
    <Button variant="destructive" size="lg" className="w-full" onClick={handleLogout}>
      Logout <HugeiconsIcon icon={Logout01Icon} />
    </Button>
  );
}
