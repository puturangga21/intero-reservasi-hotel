import cloudinary from '@/lib/cloudinary';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const room = await prisma.roomGallery.findMany({
      select: {
        gallery_id: true,
        room_type: true,
        image: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Data room gallery berhasil diambil',
        data: room,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error fetching room gallery:', error);

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
    const image = formData.getAll('image');
    let image_url = [];

    if (!room_type || !image) {
      return NextResponse.json(
        {
          success: false,
          message: 'Semua field wajib diisi',
        },
        { status: 400 }
      );
    }

    const validImages = image.filter((file) => file.size > 0);

    if (validImages.length > 0) {
      const uploadPromises = validImages.map(async (file) => {
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

    const newRoom = await prisma.roomGallery.create({
      data: {
        room_type,
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
