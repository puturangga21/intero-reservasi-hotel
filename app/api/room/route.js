import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const now = new Date();

    const room = await prisma.room.findMany({
      select: {
        room_id: true,
        room_number: true,
        room_type: true,
        price_per_night: true,
        status: true,
        description: true,
      },
      orderBy: {
        room_number: 'asc',
      },
    });

    const galleries = await prisma.roomGallery.findMany();

    const activeMaintenances = await prisma.maintenance.findMany({
      where: {
        status: { in: ['PENDING', 'IN_PROGRESS'] },
        start_date: { lte: now },
        end_date: { gte: now },
      },
      select: {
        room_id: true,
      },
    });

    const maintenanceRoomIds = new Set(
      activeMaintenances.map((m) => m.room_id)
    );

    const roomsWithImages = room.map((room) => {
      const galleryEntry = galleries.find((g) => g.room_type === room.room_type);
      const images = galleryEntry ? galleryEntry.image : [];
      const isUnderMaintenance = maintenanceRoomIds.has(room.room_id);

      return {
        ...room,
        status: isUnderMaintenance ? 'MAINTENANCE' : 'AVAILABLE',
        image: images,
      };
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Data room berhasil diambil',
        data: roomsWithImages,
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

export async function POST(request) {
  try {
    const formData = await request.formData();

    const room_type = formData.get('room_type');
    const price_per_night = formData.get('price_per_night');
    const status = formData.get('status');
    const description = formData.get('description');

    if (!room_type || !price_per_night || !status || !description) {
      return NextResponse.json(
        {
          success: false,
          message: 'Semua field wajib diisi',
        },
        { status: 400 }
      );
    }

    const newRoom = await prisma.room.create({
      data: {
        room_type,
        price_per_night: parseFloat(price_per_night),
        status,
        description,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Sukses menambahkan data',
        data: newRoom,
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
