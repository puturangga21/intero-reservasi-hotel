'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getBaseUrl } from '@/lib/utils';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function FormPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const baseUrl = getBaseUrl();

    try {
      const response = await axios.post(`${baseUrl}/api/login`, formData);

      if (response.data.success) {
        toast.success(response?.data?.message);
        router.push('/');
      }
    } catch (error) {
      console.log(error.response.data);
      toast.error(error?.response?.data?.message || 'Terjadi kesalahan pada server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="grid gap-6" onSubmit={handleSubmit}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="puturangga21@gmail.com"
            required
            name="email"
            className="h-11"
            disabled={loading}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder=""
            required
            name="password"
            className="h-11"
            disabled={loading}
          />
        </div>

        <Button type="submit" className="w-full h-11 text-base mt-2" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </Button>
      </div>
    </form>
  );
}
