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
    });
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
      successRedirectUrl: 'http://localhost:3000',
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
