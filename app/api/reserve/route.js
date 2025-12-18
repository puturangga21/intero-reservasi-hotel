import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const reservations = await prisma.reservation.findMany({
      include: {
        customer: {
          select: {
            fullname: true,
            email: true,
          },
        },
        room: {
          select: {
            room_type: true,
            room_number: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Data reservasi berhasil diambil',
        data: reservations,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error fetching reservations:', error);

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
    const session = await auth();
    const formData = await request.formData();

    const customer_id = session?.user?.id;
    const room_id = formData.get('room_id');
    const check_in_date = formData.get('check_in_date');
    const check_out_date = formData.get('check_out_date');
    const total_price = formData.get('total_price');
    const total_nights = Number(formData.get('total_nights'));

    // console.log({
    //   customer_id,
    //   room_id,
    //   employee_id,
    //   check_in_date,
    //   check_out_date,
    //   total_price,
    //   total_nights,
    // });

    if (!customer_id || !room_id || !check_in_date || !check_out_date || !total_price) {
      return NextResponse.json(
        {
          success: false,
          message: 'Semua field wajib diisi',
        },
        { status: 400 }
      );
    }

    const newReservation = await prisma.reservation.create({
      data: {
        customer_id,
        room_id,
        check_in_date,
        check_out_date,
        total_price,
        total_nights,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Sukses melakukan reservasi',
        data: newReservation,
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
