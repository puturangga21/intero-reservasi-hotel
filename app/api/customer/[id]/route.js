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
    const body = await request.json();
    const { fullname, phone_number, img_identity, email } = body;

    const existingCustomer = await prisma.customer.findUnique({
      where: { customer_id: id },
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

    const updatedCustomer = await prisma.customer.update({
      where: { customer_id: id },
      data: {
        fullname,
        phone_number,
        img_identity,
        email,
      },
      select: {
        customer_id: true,
        fullname: true,
        email: true,
        phone_number: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Data customer berhasil diupdate',
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

    const existingCustomer = await prisma.customer.findUnique({
      where: { customer_id: id },
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

    await prisma.customer.delete({
      where: { customer_id: id },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Customer berhasil dihapus',
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
