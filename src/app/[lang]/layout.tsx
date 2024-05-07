import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { i18n } from '../../../i18n.config';
import Layout from '@/layout/Layout';
import { Suspense } from 'react';
import Loading from '@/components/Loading/Loading';
import ImgSeo from '@/assets/icons/fullLogo.png';
import 'react-toastify/dist/ReactToastify.css';
const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
export const metadata: Metadata = {
  title: 'Ajoyib Fast Food',
  description:
    "FAST FOOD AJOYIB YANGICHA TA'M, YANGICHA YONDASHUV. Bizning kompaniya 4-5 yillik tajriba ega fast food tayyorlash bo'yicha ilg'or hisoblanadi.",
  keywords:
    "fast food, ajoyib, yangicha ta'm, tez va oson, xonobod, andijon, mazzali ta'm",
  robots: { index: false, follow: false },
  other: {
    image:
      'https://ajoyib-fastfood.uz/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FfullLogo.3ac2987b.png&w=3840&q=75',
    url: 'https://ajoyib-fastfood.uz/',
  },
  viewport: { width: 'device-width', initialScale: 1 },
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: any };
}) {
  return (
    <html lang={params.lang}>
      <body className={inter.className}>
        <Suspense fallback={<Loading />}>
          <Layout>{children}</Layout>
        </Suspense>
      </body>
    </html>
  );
}
