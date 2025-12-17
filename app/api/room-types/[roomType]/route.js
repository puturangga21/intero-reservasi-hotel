import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { roomType } = await params;

    const roomTypeData = await prisma.room.findFirst({
      where: {
        room_type: roomType,
      },
      select: {
        room_type: true,
        price_per_night: true,
        description: true,
      },
    });

    if (!roomTypeData) {
      return NextResponse.json(
        {
          success: false,
          message: 'Tipe kamar tidak ditemukan',
        },
        { status: 404 }
      );
    }

    const rooms = await prisma.room.findMany({
      where: {
        room_type: roomType,
      },
      include: {
        reservation: {
          where: {
            status: {
              in: ['CONFIRMED'],
            },
            check_out_date: {
              gte: new Date(),
            },
          },
          select: {
            check_in_date: true,
            check_out_date: true,
          },
        },
      },
    });

    // 2. Ambil Galeri Gambar
    const gallery = await prisma.roomGallery.findFirst({
      where: {
        room_type: roomType,
      },
    });

    const images = gallery?.image || ['/hero.jpg'];

    const availableRooms = rooms.map((room) => ({
      room_id: room.room_id,
      room_number: room.room_number,
      status: room.status, // AVAILABLE or MAINTENANCE
      booked_dates: room.reservation.map((res) => ({
        start: res.check_in_date,
        end: res.check_out_date,
      })),
    }));

    const responseData = {
      ...roomTypeData,
      image: images,
      availableRooms: availableRooms,
    };

    return NextResponse.json(
      {
        success: true,
        message: 'Detail room ditemukan',
        data: responseData,
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
