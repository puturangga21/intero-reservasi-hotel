import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { roomType } = await params;

    // 1. Ambil data informasi kamar (Harga, Deskripsi) berdasarkan Tipe
    const roomData = await prisma.room.findFirst({
      where: {
        room_type: roomType,
      },
    });

    if (!roomData) {
      return NextResponse.json(
        {
          success: false,
          message: 'Tipe kamar tidak ditemukan',
        },
        { status: 404 }
      );
    }

    // 2. Ambil Galeri Gambar
    const gallery = await prisma.roomGallery.findFirst({
      where: {
        room_type: roomType,
      },
    });

    const images = gallery?.image || ['/hero.jpg'];

    // 3. Ambil List Nomor Kamar yang statusnya AVAILABLE (Untuk Dropdown)
    const availableRooms = await prisma.room.findMany({
      where: {
        room_type: roomType,
        status: 'AVAILABLE',
      },
      select: {
        room_id: true,
        room_number: true,
      },
      orderBy: {
        room_number: 'asc',
      },
    });

    // 4. Gabungkan semua data
    const responseData = {
      ...roomData,
      image: images,
      availableRooms: availableRooms, // Sertakan ini di response
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
