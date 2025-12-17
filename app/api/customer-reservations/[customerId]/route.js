import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { customerId } = await params;

  try {
    if (!customerId) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const reservations = await prisma.reservation.findMany({
      where: {
        customer_id: customerId,
      },
      include: {
        room: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    const roomTypes = [...new Set(reservations.map((item) => item.room.room_type))];

    const galleries = await prisma.roomGallery.findMany({
      where: {
        room_type: {
          in: roomTypes,
        },
      },
    });

    const galleryMap = galleries.reduce((acc, curr) => {
      acc[curr.room_type] = curr.image[0];
      return acc;
    }, {});

    const enrichedReservations = reservations.map((item) => ({
      ...item,
      roomImage: galleryMap[item.room.room_type] || '/hero.jpg',
    }));

    return NextResponse.json(
      {
        success: true,
        message: 'History reservasi berhasil diambil',
        data: enrichedReservations,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal Server Error',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
