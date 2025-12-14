import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
      select: {
        customer_id: true,
        fullname: true,
        email: true,
        phone_number: true,
        img_identity: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Data customer berhasil diambil',
        data: customers,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error fetching customers:', error);

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
    const body = await request.json();

    const { fullname, email, password, phone_number, img_identity } = body;

    if (!fullname || !email || !password || !phone_number || !img_identity) {
      return NextResponse.json(
        {
          success: false,
          message: 'Semua field wajib diisi',
        },
        { status: 400 }
      );
    }

    const existingUser = await prisma.customer.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email sudah digunakan',
        },
        { status: 409 }
      );
    }

    const newCustomer = await prisma.customer.create({
      data: {
        fullname,
        email,
        password,
        phone_number,
        img_identity,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Customer berhasil ditambahkan',
        data: newCustomer,
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
