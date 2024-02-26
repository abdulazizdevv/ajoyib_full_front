import React from "react";
import Head from "next/head";

export default function SEO() {
  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=5"
      />
      <title>Ajoyib</title>
      <meta
        name="description"
        content={`FAST FOOD AJOYIB YANGICHA TA'M, YANGICHA YONDASHUV. Bizning kompaniya 4-5 yillik tajriba ega fast food tayyorlash bo'yicha ilg'or hisoblanadi.`}
      />
      <meta
        name="keywords"
        content="FAST FOOD AJOYIB YANGICHA TA'M, YANGICHA YONDASHUV. Bizning kompaniya 4-5 yillik tajriba ega fast food tayyorlash bo'yicha ilg'or hisoblanadi."
      />
      <meta name="theme-color" content="#F4F1EA" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={"Ajoyib Fast-food"} key="ogtitle" />
      <meta
        property="og:description"
        content={`Ajoyib Fast-food`}
        key="ogdesc"
      />
      <meta
        property="og:site_name"
        content={"Ajoyib Fast-food"}
        key="ogsitename"
      />
    </Head>
  );
}
