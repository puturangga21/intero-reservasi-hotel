'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { getBaseUrl } from '@/lib/utils';
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function FormPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const baseUrl = getBaseUrl();

    try {
      const response = await axios.post(`${baseUrl}/api/customer`, formData);

      if (response.data.success) {
        toast.success(response?.data?.message);
        router.push('/login');
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
          <Label htmlFor="fullname">Fullname</Label>
          <Input
            id="fullname"
            name="fullname"
            type="text"
            placeholder="Rangga Sutha"
            required
            className="h-11"
            disabled={loading}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="puturangga21@gmail.com"
            required
            className="h-11"
            disabled={loading}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder=""
            required
            className="h-11"
            disabled={loading}
          />
        </div>

        <Button type="submit" className="w-full h-11 text-base mt-2" disabled={loading}>
          {loading ? 'Loading...' : 'Register'}
        </Button>
      </div>
    </form>
  );
}
