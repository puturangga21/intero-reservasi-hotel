import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(request, { params }) {
  try {
    const { reservationId } = await params;
    const formData = await request.formData();

    const status = formData.get('status');

    const updatedCustomer = await prisma.reservation.update({
      where: { reservation_id: reservationId },
      data: { status },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Data reservasi berhasil diupdate',
        data: updatedCustomer,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Gagal update data',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
