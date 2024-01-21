"use client";
import Image from "next/image";
import React from "react";
import set from "../../assets/images/setFree.png";
import allTomato from "../../assets/images/all-tomato.png";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSetStore } from "@/redux/store";

export default function About() {
  const { dictionary } = useSetStore();
  const { scrollY } = useScroll();

  const translateYMushroomBottom = useTransform(
    scrollY,
    [700, 20],
    [250, -100]
  );
  const leafX = useTransform(scrollY, [10, 950], [10, -200]);

  return (
    <section id="about">
      <motion.div
        style={{
          // scale,
          y: translateYMushroomBottom,
          transition: "transform 0.2s ",
        }}
        className="absolute right-0 mt-[-140px] hidden md:block"
      >
        <Image
          className="w-[200px] "
          src={allTomato}
          width={1000}
          height={1000}
          alt="pic"
        />
      </motion.div>
      <motion.div
        style={{
          y: leafX,
          transition: "transform 0.3s ",
        }}
        className="absolute hidden md:block mt-[100px]"
      >
        <Image src={set} width={220} height={300} alt="set" />
      </motion.div>
      <div className="container px-5 mx-auto relative my-[100px]">
        <p className=" text-[20px] uppercase text-center  font-bold text-mainColor">
          {dictionary?.about}
        </p>
        <h2 className=" text-[35px] max-w-[500px] mx-auto font-sans uppercase text-center  font-bold text-black">
          {dictionary?.aboutSection}
        </h2>
        <p className="max-w-[625px] text-[18px] mx-auto text-center mt-[20px]">
          {dictionary?.mainAbout}
        </p>
        <p className="text-center mt-[10px] text-[18px] font-bold">
          {dictionary?.bottomAbout}
        </p>
      </div>
    </section>
  );
}
