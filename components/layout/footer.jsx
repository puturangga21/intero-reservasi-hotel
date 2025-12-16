import Link from 'next/link';

const navLinks = [
  {
    name: 'Rooms',
    href: '#rooms',
  },
  {
    name: 'Experience',
    href: '#',
  },
  {
    name: 'Restaurant',
    href: '#',
  },
  {
    name: 'Event',
    href: '#',
  },
  {
    name: 'Contact',
    href: '#',
  },
];

const resource = [
  {
    name: 'Customer Stories',
    href: '#',
  },
  {
    name: 'Gallery',
    href: '#',
  },
];

export default function Footer() {
  return (
    <footer className="pt-20 pb-10 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-24">
          <div className="grid grid-cols-1 gap-12 md:gap-0 md:grid-cols-4">
            <div className="col-span-2 max-w-100 ">
              <div className="flex flex-col justify-between h-full">
                <h1 className="text-2xl font-medium font-sprat text-primary-foreground">
                  Jalan Goa Gong, Gang Jepun Nomor 7A, Bukit Jimbaran
                </h1>
              </div>
            </div>

            <div className="col-span-1 flex flex-col gap-1.5">
              <p className="text-sm uppercase text-primary-foreground">resort</p>

              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-base text-primary-foreground">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-1 flex flex-col gap-1.5">
              <p className="text-sm uppercase text-primary-foreground">resource</p>

              <ul className="flex flex-col gap-1">
                {resource.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-base text-primary-foreground">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex justify-center">
            <p className="uppercase text-xs text-muted">
              © Interoperabilitas 2025. Kelompok 1.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
