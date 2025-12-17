import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

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

    const newMaintenance = await prisma.maintenance.create({
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

    return NextResponse.json(
      {
        success: true,
        message: 'Sukses membuat maintenance',
        data: newMaintenance,
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
