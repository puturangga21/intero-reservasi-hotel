'use client'; // Wajib karena menggunakan onClick dan hooks

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner'; // Asumsi Anda pakai Sonner (jika pakai library lain sesuaikan)
import axios from 'axios';

export default function CheckoutButton({ reservationId, status }) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      // 1. Panggil API internal kita untuk buat Invoice Xendit
      const response = await axios.post(`/api/transaction/${reservationId}`);

      if (response.data && response.data.data.invoiceUrl) {
        // 2. Redirect user ke halaman pembayaran Xendit
        window.location.href = response.data.data.invoiceUrl;
      } else {
        toast.error('Gagal mendapatkan link pembayaran.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Terjadi kesalahan saat memproses pembayaran.');
    } finally {
      setIsLoading(false);
    }
  };

  // Jika status bukan pending, jangan tampilkan tombol (atau disable)
  if (status !== 'PENDING') return null;

  return (
    <Button size="lg" onClick={handlePayment} disabled={isLoading}>
      {isLoading ? 'Processing...' : 'Pay Now'}
    </Button>
  );
}
