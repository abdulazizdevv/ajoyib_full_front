"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useSetStore } from "@/redux/store";
import { getDictionary } from "@/lib/Dictionary";
import { BiBasket } from "react-icons/bi";

import burger from "@/assets/images/burger.png";
import Image from "next/image";
import { Locale } from "../../../../../i18n.config";
import axiosInstance, { baseURL } from "@/api/api";
import { IProduct } from "@/types/langType";
import Loading from "@/components/Loading/Loading";

export default function Menu({
  params: { lang, id },
}: {
  params: { lang: Locale; id: string };
}) {
  const { updateDictionary, updateHeader } = useSetStore();
  const [data, setData] = useState<IProduct>();
  const [loading, setLoading] = useState<boolean>(true);

  const getOneProduct = useCallback(async () => {
    try {
      const res = await axiosInstance.get(`/get/product/${id}`);
      if (res.status === 200) {
        setLoading(false);
        setData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const fetchData = useCallback(async () => {
    const dictionary = await getDictionary(lang);
    updateDictionary(dictionary.header);
    updateHeader(lang);
  }, [lang, updateDictionary, updateHeader]);

  useEffect(() => {
    const loadData = async () => {
      await fetchData();
      await getOneProduct();
    };

    loadData();
  }, [lang, fetchData, getOneProduct]);

  return (
    <section>
      {loading ? (
        <Loading />
      ) : (
        <div className="container px-5 mx-auto py-[70px]">
          <div className="flex items-center justify-evenly flex-wrap">
            <div className="">
              <Image
                className="w-full mt-[-20px]"
                src={`${baseURL}/${data?.image}`}
                width={350}
                height={350}
                alt="pic"
              />
            </div>
            <div className=" max-w-[600px] flex flex-col gap-5 ">
              <h1 className="text-[45px] font-bold">{data?.title}</h1>
              <span>⭐⭐⭐⭐⭐</span>
              <p>{data?.description}</p>
              <p className="text-mainColor font-bold text-[30px]">
                {data?.price} so'm
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
