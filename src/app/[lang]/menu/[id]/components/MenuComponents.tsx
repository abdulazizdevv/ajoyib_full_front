'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { useSetStore } from '@/redux/store';
import { getDictionary } from '@/lib/Dictionary';
import Image from 'next/image';
import axiosInstance, { baseURL } from '@/api/api';
import { IProduct } from '@/types/langType';
import Loading from '@/components/Loading/Loading';
import SEO from '@/components/SEO/SEO';
import { Locale } from '../../../../../../i18n.config';

export default function MenuComponent({
  params,
  id,
}: {
  params: Locale;
  id: string;
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
    const dictionary = await getDictionary(params);
    updateDictionary(dictionary.header);
    updateHeader(params);
  }, [params, updateDictionary, updateHeader]);

  useEffect(() => {
    const loadData = async () => {
      await fetchData();
      await getOneProduct();
    };

    loadData();
  }, [params, fetchData, getOneProduct]);

  return (
    <section>
      <SEO />
      {loading ? (
        <Loading />
      ) : (
        <div className='container px-5 mx-auto py-[70px]'>
          <div className='flex items-center justify-evenly flex-wrap'>
            <div className=''>
              <Image
                className='w-full mt-[-20px]'
                src={`${baseURL}/${data?.image}`}
                width={350}
                height={350}
                alt='pic'
              />
            </div>
            <div className=' max-w-[600px] flex flex-col gap-5 '>
              <h1 className='text-[45px] font-bold'>{data?.title}</h1>
              <span>⭐⭐⭐⭐⭐</span>
              <p>{data?.description}</p>
              <p className='text-mainColor font-bold text-[30px]'>
                {data?.price} so'm
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
