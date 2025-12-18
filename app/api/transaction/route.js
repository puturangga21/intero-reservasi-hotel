import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const transaction = await prisma.transaction.findMany({
      select: {
        transaction_id: true,
        amount: true,
        payment_method: true,
        payment_date: true,
        status: true,
        code: true,
        invoice_url: true,
        reservation: {
          select: {
            reservation_id: true,
            customer: true,
            room: true,
            refund: {
              select: {
                refund_date: true,
                employee: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Data room berhasil diambil',
        data: transaction,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error fetching room:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Terjadi kesalahan pada server',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
