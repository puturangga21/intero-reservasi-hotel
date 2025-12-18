import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const customer = await prisma.customer.findUnique({
      where: { customer_id: id },
      select: {
        customer_id: true,
        fullname: true,
        email: true,
        phone_number: true,
        img_identity: true,
        created_at: true,
      },
    });

    if (!customer) {
      return NextResponse.json(
        {
          success: false,
          message: 'Customer tidak ditemukan',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Detail customer ditemukan',
        data: customer,
      },
      { status: 200 }
    );
  } catch (error) {
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

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const formData = await request.formData();

    const fullname = formData.get('fullname');
    const email = formData.get('email');
    const password = formData.get('password');

    const existingCustomer = await prisma.employee.findUnique({
      where: { employee_id: id },
    });

    if (!existingCustomer) {
      return NextResponse.json(
        {
          success: false,
          message: 'Employee tidak ditemukan',
        },
        { status: 404 }
      );
    }

    const data = {
      fullname,
      email,
    };

    if (password && password.trim() !== '') {
      data.password = password;
    }

    const updatedCustomer = await prisma.employee.update({
      where: { employee_id: id },
      data,
      select: {
        employee_id: true,
        fullname: true,
        email: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Data employee berhasil diupdate',
        data: updatedCustomer,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        {
          success: false,
          message: 'Email sudah digunakan oleh user lain',
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Gagal update data',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const existingCustomer = await prisma.employee.findUnique({
      where: { employee_id: id },
    });

    if (!existingCustomer) {
      return NextResponse.json(
        {
          success: false,
          message: 'Customer tidak ditemukan',
        },
        { status: 404 }
      );
    }

    await prisma.employee.delete({
      where: { employee_id: id },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Employee berhasil dihapus',
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Gagal menghapus data',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
