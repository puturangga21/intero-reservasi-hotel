import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const customers = await prisma.employee.findMany({
      select: {
        employee_id: true,
        fullname: true,
        email: true,
        role: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Data employee berhasil diambil',
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
    const formData = await request.formData();

    const fullname = formData.get('fullname');
    const email = formData.get('email');
    const password = formData.get('password');
    const role = formData.get('role');

    if (!fullname || !email || !password || !role) {
      return NextResponse.json(
        {
          success: false,
          message: 'Semua field wajib diisi',
        },
        { status: 400 }
      );
    }

    const existingUser = await prisma.employee.findUnique({
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

    const newEmployee = await prisma.employee.create({
      data: {
        fullname,
        email,
        password,
        role,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Sukses melakukan registrasi employee',
        data: newEmployee,
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
