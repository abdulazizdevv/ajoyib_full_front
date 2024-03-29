import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { i18n } from "../../../i18n.config";
import Layout from "@/layout/Layout";
import { Suspense } from "react";
import Loading from "@/components/Loading/Loading";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ajoyib Fast Food",
  description:
    "FAST FOOD AJOYIB YANGICHA TA'M, YANGICHA YONDASHUV. Bizning kompaniya 4-5 yillik tajriba ega fast food tayyorlash bo'yicha ilg'or hisoblanadi.",
};
export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: any };
}) {
  return (
    <html lang={params.lang}>
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#F4F1EA" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body className={inter.className}>
        <Suspense fallback={<Loading />}>
          <Layout>{children}</Layout>
        </Suspense>
      </body>
    </html>
  );
}
