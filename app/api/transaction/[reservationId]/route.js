import prisma from '@/lib/prisma';
import { generateRandomString } from '@/lib/utils';
import xenditClient from '@/lib/xendit';
import { NextResponse } from 'next/server';

export async function POST(request, { params }) {
  const { reservationId } = await params;

  try {
    const reservationData = await prisma.reservation.findUnique({
      where: {
        reservation_id: reservationId,
      },
      include: {
        transaction: true,
      },
    });

    if (!reservationData) {
      return NextResponse.json({ message: 'Reservasi tidak ditemukan' }, { status: 404 });
    }

    // CEK: Apakah sudah ada transaksi yang statusnya PENDING?
    const pendingTransaction = reservationData.transaction.find(
      (t) => t.status === 'PENDING' && t.invoice_url
    );

    // Jika ada, kembalikan invoiceUrl yang lama (Jangan buat baru)
    if (pendingTransaction) {
      return NextResponse.json({
        success: true,
        message: 'Melanjutkan pembayaran sebelumnya',
        data: { invoiceUrl: pendingTransaction.invoice_url },
      });
    }

    const transactionCode = 'RM-' + generateRandomString(15);

    const newTransaction = await prisma.transaction.create({
      data: {
        reservation_id: reservationId,
        amount: reservationData.total_price,
        status: 'PENDING',
        code: transactionCode,
      },
    });

    const data = {
      amount: reservationData.total_price,
      invoiceDuration: 86400,
      externalId: transactionCode,
      currency: 'IDR',
      successRedirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/my-reserve/${reservationData.customer_id}`,
    };

    const response = await xenditClient.Invoice.createInvoice({ data });

    await prisma.transaction.update({
      where: {
        transaction_id: newTransaction.transaction_id,
      },
      data: {
        invoice_url: response.invoiceUrl,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Sukses menambahkan data',
        data: response,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating customer:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Gagal menambahkan data',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
