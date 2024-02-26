"use client";
import About from "@/components/About/About";
import Service from "@/components/Service/Service";
import Image from "next/image";
import { Locale } from "../../../i18n.config";
import { use, useEffect, useState } from "react";
import { getDictionary } from "@/lib/Dictionary";
import { useSetStore } from "@/redux/store";
import { Translations } from "@/types/langType";
import Layout from "@/layout/Layout";
import Hero from "@/components/Hero/Hero";
import Menu from "@/components/Menu/Menu";
import Loading from "@/components/Loading/Loading";
import SEO from "@/components/SEO/SEO";

export default function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { updateDictionary, updateHeader } = useSetStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const dictionary = await getDictionary(lang);
      updateDictionary(dictionary.header);
      updateHeader(lang);
      setLoading(false);
    };

    fetchData();
  }, [lang, updateDictionary, updateHeader]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <SEO />
          <Hero />
          <About />
          <Menu />
          <Service />
        </>
      )}
    </>
  );
}
