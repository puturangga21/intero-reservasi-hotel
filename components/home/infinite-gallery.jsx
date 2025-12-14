import Image from 'next/image';
import { cn } from '@/lib/utils';

// Dummy data gambar - Ganti src dengan gambar hotel Anda
const images = [
  {
    src: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=800&auto=format&fit=crop',
    alt: 'Pool',
  },
  {
    src: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=800&auto=format&fit=crop',
    alt: 'Room',
  },
  {
    src: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800&auto=format&fit=crop',
    alt: 'Lobby',
  },
  {
    src: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800&auto=format&fit=crop',
    alt: 'Dining',
  },
  {
    src: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800&auto=format&fit=crop',
    alt: 'Bedroom',
  },
  {
    src: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=800&auto=format&fit=crop',
    alt: 'Bathroom',
  },
];

export default function InfiniteGallery() {
  const duplicatedImages = [...images, ...images];

  return (
    <div className="w-full relative overflow-hidden mt-10 bg-background">
      <div className="absolute top-0 left-0 z-10 h-full w-20 md:w-32 bg-linear-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 z-10 h-full w-20 md:w-32 bg-linear-to-l from-background to-transparent pointer-events-none" />

      <div className="flex w-max animate-scroll gap-6">
        {duplicatedImages.map((img, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={index}
              className={cn(
                'relative shrink-0 overflow-hidden rounded-md transition-all duration-300 hover:opacity-90 grayscale hover:grayscale-0', // Efek hover (opsional)
                isEven
                  ? 'w-50 h-50 md:w-75' // Ukuran Portrait
                  : 'w-50 h-75 md:w-75' // Ukuran Landscape
              )}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
