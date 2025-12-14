import localFont from 'next/font/local';

export const sprat = localFont({
  variable: '--font-sprat',
  display: 'swap',
  src: [
    {
      path: '../lib/typeface/Sprat-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../lib/typeface/Sprat-Medium.otf',
      weight: '500',
      style: 'normal',
    },
  ],
});
