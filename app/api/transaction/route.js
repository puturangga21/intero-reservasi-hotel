import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const room = await prisma.transaction.findMany({
      select: {
        amount: true,
        payment_method: true,
        payment_date: true,
        status: true,
        code: true,
        invoice_url: true,
        reservation: {
          select: {
            customer: true,
            room: true,
          },
        },
      },
    });

    const galleries = await prisma.roomGallery.findMany();

    const roomsWithImages = room.map((room) => {
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
