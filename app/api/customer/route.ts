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
