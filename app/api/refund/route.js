import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();

    const reservation_id = formData.get('reservation_id');
    const employee_id = formData.get('employee_id');
    const amount = formData.get('amount');
    const reason = formData.get('reason');

    if (!reservation_id || !amount || !reason || !employee_id) {
      return NextResponse.json(
        {
          success: false,
          message: 'Semua field wajib diisi',
        },
        { status: 400 }
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      const refund = await tx.refund.create({
        data: {
          reservation_id,
          amount: parseFloat(amount),
          reason: reason || 'Manual Refund',
          employee_id,
        },
      });

      await tx.reservation.update({
        where: { reservation_id },
        data: { status: 'REFUNDED' },
      });

      await tx.transaction.updateMany({
        where: { reservation_id },
        data: { status: 'REFUNDED' },
      });

      return refund;
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Proses refund berhasil',
        data: result,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating customer:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Gagal proses refund',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
