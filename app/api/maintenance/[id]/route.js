import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const formData = await request.formData();

    const issue_description = formData.get('issue_description');
    const priority = formData.get('priority');
    const status = formData.get('status');
    const start_date = formData.get('start_date');
    const end_date = formData.get('end_date');

    const updatedMaintenance = await prisma.$transaction(async (tx) => {
      const maintenance = await tx.maintenance.update({
        where: { maintenance_id: id },
        data: {
          issue_description,
          priority,
          status,
          start_date,
          end_date,
        },
      });

     if (status === 'COMPLETED') {
      const activeMaintenance = await tx.maintenance.findFirst({
        where: {
          room_id: maintenance.room_id,
          maintenance_id: { not: maintenance.maintenance_id },
          status: { in: ['PENDING', 'IN_PROGRESS'] },
          AND: [
            { start_date: { lte: new Date() } },
            { end_date: { gte: new Date() } },
          ],
        },
      });

      if (!activeMaintenance) {
        await tx.room.update({
          where: { room_id: maintenance.room_id },
          data: { status: 'AVAILABLE' },
        });
      }
    }

      return maintenance;
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Data maintenance berhasil diupdate',
        data: updatedMaintenance,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update data', error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const existingRoom = await prisma.room.findUnique({
      where: { room_id: id },
    });

    if (!existingRoom) {
      return NextResponse.json(
        {
          success: false,
          message: 'Room tidak ditemukan',
        },
        { status: 404 }
      );
    }

    await prisma.room.delete({
      where: { room_id: id },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Room berhasil dihapus',
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Gagal menghapus data',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
