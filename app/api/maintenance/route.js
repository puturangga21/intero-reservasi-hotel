import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const maintenance = await prisma.maintenance.findMany({
      select: {
        maintenance_id: true,
        room_id: true,
        employee_id: true,
        issue_description: true,
        priority: true,
        status: true,
        start_date: true,
        end_date: true,
        room: {
          select: {
            room_id: true,
            room_type: true,
            room_number: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Data maintenance berhasil diambil',
        data: maintenance,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error fetching maintenance:', error);

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

    const room_id = formData.get('room_id');
    const employee_id = formData.get('employee_id');
    const issue_description = formData.get('issue_description');
    const priority = formData.get('priority');
    const status = formData.get('status');
    const start_date = formData.get('start_date');
    const end_date = formData.get('end_date');

    if (
      !room_id ||
      !employee_id ||
      !issue_description ||
      !priority ||
      !status ||
      !start_date ||
      !end_date
    ) {
      return NextResponse.json(
        {
          success: false,
          message: 'Semua field wajib diisi',
        },
        { status: 400 }
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      const maintenance = await tx.maintenance.create({
        data: {
          room_id,
          employee_id,
          issue_description,
          priority,
          status,
          start_date,
          end_date,
        },
      });

      await tx.room.update({
        where: { room_id: room_id },
        data: { status: 'MAINTENANCE' },
      });

      return maintenance;
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Sukses membuat maintenance',
        data: result,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating maintenance:', error);
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
