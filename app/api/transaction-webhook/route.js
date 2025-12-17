import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const body = await request.json();

  try {
    const code = body.external_id;
    const xenditStatus = body.status;
    const statusDb = xenditStatus === 'PAID' ? 'SUCCESS' : 'FAILED';

    if (code.startsWith('RM-')) {
      await prisma.transaction.update({
        where: {
          code: code,
        },
        data: {
          status: statusDb,
          payment_method: body.payment_channel,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json({ success: true });
}
