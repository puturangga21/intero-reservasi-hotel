import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const distinctRooms = await prisma.room.findMany({
      distinct: ['room_type'],
      select: {
        room_id: true,
        room_type: true,
        price_per_night: true,
        description: true,
      },
      orderBy: {
        price_per_night: 'asc',
      },
    });

    const galleries = await prisma.roomGallery.findMany();

    const roomsWithImages = distinctRooms.map((room) => {
      const galleryEntry = galleries.find((g) => g.room_type === room.room_type);
      const images = galleryEntry ? galleryEntry.image : [];

      return {
        ...room,
        image: images,
      };
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Data tipe kamar berhasil diambil',
        data: roomsWithImages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching room types:', error);
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
