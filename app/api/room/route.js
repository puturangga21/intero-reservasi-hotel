import cloudinary from '@/lib/cloudinary';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const room = await prisma.room.findMany({
      select: {
        room_id: true,
        room_number: true,
        type: true,
        price_per_night: true,
        status: true,
        description: true,
        image: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Data room berhasil diambil',
        data: room,
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

    const type = formData.get('type');
    const price_per_night = formData.get('price_per_night');
    const status = formData.get('status');
    const description = formData.get('description');
    const image = formData.getAll('image');
    let image_url = [];

    if (!type || !price_per_night || !status || !description) {
      return NextResponse.json(
        {
          success: false,
          message: 'Semua field wajib diisi',
        },
        { status: 400 }
      );
    }

    if (image.length > 0) {
      const uploadPromises = image.map(async (file) => {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: 'interoperabilitas/room',
            },
            (error, result) => {
              if (error) return reject(error);
              if (result?.secure_url) {
                resolve(result.secure_url);
              } else {
                reject(new Error('Failed to upload image'));
              }
            }
          );

          uploadStream.end(buffer);
        });
      });

      image_url = await Promise.all(uploadPromises);
    }

    const newRoom = await prisma.room.create({
      data: {
        type,
        price_per_night: parseFloat(price_per_night),
        status,
        description,
        image: image_url,
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
