import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const body = await request.json();

  try {
    const code = body.external_id;
    const xenditStatus = body.status;

    const statusDb = xenditStatus === 'PAID' ? 'SUCCESS' : 'FAILED';

    if (code.startsWith('RM-')) {
      const updatedTransaction = await prisma.transaction.update({
        where: {
          code: code,
        },
        data: {
          status: statusDb,
          payment_method: body.payment_channel,
          payment_date: new Date(),
        },
      });

      if (statusDb === 'SUCCESS') {
        await prisma.reservation.update({
          where: {
            reservation_id: updatedTransaction.reservation_id,
          },
          data: {
            status: 'CONFIRMED',
          },
        });
      } else if (statusDb === 'FAILED') {
        await prisma.reservation.update({
          where: {
            reservation_id: updatedTransaction.reservation_id,
          },
          data: {
            status: 'CANCELLED',
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json({ success: true });
}
