import { signOut } from '@/auth';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    await signOut({ redirect: false });

    return NextResponse.json(
      { success: true, message: 'Berhasil logout' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Gagal logout' },
      { status: 500 }
    );
  }
}
