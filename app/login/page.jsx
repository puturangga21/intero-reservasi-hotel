import { buttonVariants } from '@/components/ui/button';
import { ArrowLeft01FreeIcons } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import Image from 'next/image';
import Link from 'next/link';
import FormPage from './form-page';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    return redirect('/');
  }

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      {/* Kolom Kiri - Gambar Hero */}
      <div className="hidden bg-muted lg:block relative h-full overflow-hidden">
        <Image
          src="/hero.jpg"
          alt="Hotel Interior"
          fill
          priority
          className="object-cover opacity-90 transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />

        <div className="absolute bottom-10 left-10 text-white p-6">
          <blockquote className="space-y-2">
            <p className={`text-lg`}>
              Experience luxury like never before. Interoperabilitas.
            </p>
          </blockquote>
        </div>
      </div>

      {/* Kolom Kanan - Form Login */}
      <div className="flex items-center justify-center py-12 px-6 lg:px-8 bg-background">
        <div className="mx-auto grid w-full max-w-100 gap-8">
          <Link
            href="/"
            className={buttonVariants({
              variant: 'ghost',
              size: 'sm',
              className: 'w-fit',
            })}>
            <HugeiconsIcon icon={ArrowLeft01FreeIcons} className="mr-1 -mt-0.5" /> Back to
            home
          </Link>

          {/* Header Form */}
          <div className="grid gap-2 text-left">
            <h1 className={`text-4xl font-medium tracking-tight font-sprat`}>
              Welcome Back
            </h1>
            <p className="text-muted-foreground text-sm">
              Log in using your email and password to proceed with the reservation.
            </p>
          </div>

          {/* Form */}
          <FormPage />

          {/* Footer Register */}
          <div className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
              className="font-medium text-primary underline underline-offset-4 hover:text-primary/80">
              Register now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
