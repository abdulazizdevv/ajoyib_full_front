"use client";
import React from "react";
import Image from "next/image";
import burger from "../../assets/images/burgers.webp";
import bgImage from "../../assets/images/main_bg.jpg";
import mushroom from "../../assets/images/mushroom.png";
import pizza from "../../assets/images/lavash.png";
import leafBlur from "../../assets/images/one_leaf_blur.png";
import allLeaf from "../../assets/images/allLeaf.png";
import scroll from "../../assets/video/scroll4.gif";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSetStore } from "@/redux/store";

export default function Hero() {
  const { dictionary } = useSetStore();

  const { scrollY } = useScroll();

  const translateY = useTransform(scrollY, [0, 200], [0, -200]);
  const translateYMushroom = useTransform(scrollY, [200, 400], [0, -100]);
  const translateYMushroomBottom = useTransform(scrollY, [50, 10], [50, -10]);
  const leafX = useTransform(scrollY, [600, 200], [0, -100]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  const scale = useTransform(scrollY, [0, 700], [1, 0.8]);
  const translateX = useTransform(scrollY, [0, 50], [0, -50]);

  return (
    <section
      className="pt-[105px]"
      style={{
        backgroundImage: `url(${bgImage.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        //   zIndex: 1,
      }}
    >
      <motion.div
        style={{
          opacity,
          y: translateY,
        }}
        className="hidden lg:block ms-[200px] md:ms-[250px] top-[8%] md:top-[20%] right-[35%] absolute "
      >
        <Image
          src={leafBlur}
          className=" w-[100px] h-auto md:w-[150px]"
          width={0}
          height={0}
          alt="leaf"
        />
      </motion.div>
      <div className="hidden md:block">
        <motion.div
          style={{
            y: translateYMushroom,
            transition: "transform 0.2s ", // Add transition property
          }}
          className="absolute top-[450px] xl:top-[370px]  left-[350px] hidden lg:block"
        >
          <Image
            className="w-[70px] h-auto"
            src={mushroom}
            width={0}
            height={0}
            alt="pic"
          />
        </motion.div>
        <motion.div
          style={{
            // scale,
            y: translateYMushroomBottom,
            transition: "transform 0.2s ",
            rotate: -60, // Add transition property
          }}
          className="absolute top-[500px] 
        left-[500px]"
        >
          <Image
            className="w-[50px] h-auto"
            src={mushroom}
            width={0}
            height={0}
            alt="pic"
          />
        </motion.div>
      </div>
      <div className="container mx-auto px-5 ">
        <h1
          className="text-[35px] md:text-[55px] text-white font-bold max-w-[1000px] text-center mx-auto my-[50px] md:my-[80px] uppercase"
          style={{ zIndex: 9999 }}
        >
          {dictionary?.hero}
        </h1>
        <div className="flex justify-center items-center mt-[200px]">
          <Image
            className="w-[250px] h-auto hidden  md:block"
            src={scroll}
            width={0}
            height={0}
            alt="pic"
          />
        </div>
      </div>
      <div className="flex mt-[-100px] md:mt-[-350px] items-center justify-between">
        <motion.div style={{ scale, y: translateX }}>
          <Image
            className="w-[400px] h-auto "
            src={pizza}
            width={0}
            height={0}
            alt="pic"
          />
        </motion.div>
        <div>
          <motion.div
            style={{
              x: leafX,
              transition: "transform 0.2s ",
            }}
            className="absolute top-[55%] md:top-[650px] right-[15px] md:right-[350px] z-[1]"
          >
            <Image
              className="w-[170px] h-auto"
              src={allLeaf}
              width={0}
              height={0}
              alt="pic"
            />
          </motion.div>
          <motion.div style={{ scale, y: translateX }}>
            <Image
              className="w-[500px] h-auto rounded-full"
              src={burger}
              width={0}
              height={0}
              alt="pic"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
