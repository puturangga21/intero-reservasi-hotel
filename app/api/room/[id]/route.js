import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const formData = await request.formData();

    const room_type = formData.get('room_type');
    const price_per_night = formData.get('price_per_night');
    const status = formData.get('status');
    const description = formData.get('description');

    const data = {
      room_type,
      price_per_night,
      status,
      description,
    };

    const updatedRoom = await prisma.room.update({
      where: { room_id: id },
      data,
      select: {
        room_id: true,
        room_type: true,
        price_per_night: true,
        status: true,
        description: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Data room berhasil diupdate',
        data: updatedRoom,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        {
          success: false,
          message: 'Type room sudah digunakan oleh user lain',
        },
        { status: 409 }
      );
    }

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
