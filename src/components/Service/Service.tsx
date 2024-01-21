"use client"
import React from "react";
import Image from "next/image";

import bgImage from "../../assets/images/ng_service.jpg";
import courier from "../../assets/images/curier.png";

import { MdOutlineDeliveryDining } from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";
import { useScroll, useTransform, motion } from "framer-motion";
import { SlLocationPin } from "react-icons/sl";
import { useSetStore } from "@/redux/store";

export default function Service() {
  const { dictionary } = useSetStore();
  const { scrollY } = useScroll();

  const leafX = useTransform(scrollY, [2500, 10], [0, -500]);
  return (
    <section
      id="service"
      className="py-[50px]"
      style={{
        backgroundImage: `url(${bgImage.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="container px-5 mx-auto">
        <div className="pt-[50px] flex flex-wrap justify-center items-start">
          <motion.div
            style={{
              x: leafX,
              transition: "transform 0.2s ",
            }}
            className=""
          >
            <Image src={courier} width={615} height={500} alt="courier" />
          </motion.div>
          <div className="w-full xl:w-1/2 ">
            <h2 className="text-[30px] md:text-[50px] font-bold uppercase text-white w-full md:max-w-[600px]">
              {dictionary?.serviceTxt}
            </h2>
            <p className="text-white max-w-[600px] mt-[25px]">
              {dictionary?.serviceP}
            </p>
            <div className="mt-[25px] flex flex-wrap md:flex-nowrap  gap-3">
              <div className="w-full md:w-1/3 flex flex-col  items-start border-dashed border-[3px] rounded-xl p-[12px]">
                <div className="text-white">
                  <MdOutlineDeliveryDining size={50} />
                </div>
                <p className="text-white text-[18px] font-bold uppercase mt-2">
                  {dictionary?.service1}
                </p>
              </div>
              <div className="w-full md:w-1/3 flex flex-col  items-start border-dashed border-[3px] rounded-xl p-[12px]">
                <div className="text-white">
                  <IoFastFoodOutline size={50} />
                </div>
                <p className="text-white text-[18px] font-bold uppercase mt-2">
                  {dictionary?.service2}
                </p>
              </div>
              <div className="w-full md:w-1/3 flex flex-col  items-start border-dashed border-[3px] rounded-xl p-[12px]">
                <div className="text-white">
                  <SlLocationPin size={47} />
                </div>
                <p className="text-white text-[18px] font-bold uppercase mt-2">
                  {dictionary?.service3}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
