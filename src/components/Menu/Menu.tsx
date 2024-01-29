import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";
import axiosInstance from "@/api/api";
import { ICategory, IProduct } from "@/types/langType";
import { useSetStore } from "@/redux/store";
import butter from "../../assets/icons/butter.png";
import burger from "../../assets/icons/burger.png";
import Card from "../Card/Card";
import Loading from "../Loading/Loading";

export default function Menu() {
  // const { cartProducts } = useProductStore();
  const [data, setData] = useState<IProduct[]>([]);
  const [category, setCategory] = useState<ICategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const { dictionary } = useSetStore();
  const { scrollY } = useScroll();

  const translateYMushroomBottom = useTransform(
    scrollY,
    [2500, 20],
    [100, -100]
  );
  const leafX = useTransform(scrollY, [800, 2800], [10, -500]);

  useEffect(() => {
    getData();
    handleAll();
  }, []);

  async function getData() {
    try {
      const categoryData = await axiosInstance.get("/get/category");
      if (categoryData.status === 200) {
        setCategory(categoryData.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleFilter = async (id: number) => {
    try {
      const productsByCategory = await axiosInstance.get(
        `get/product/category/${id}`
      );
      if (productsByCategory.status === 200) {
        setData(productsByCategory.data);
        setActiveCategory(id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAll = async () => {
    try {
      const allProducts = await axiosInstance.get("/get/all/product");
      if (allProducts.status === 200) {
        setData(allProducts.data);
        setActiveCategory(null); // Reset active category
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section id="menu" className="relative">
      <motion.div
        style={{
          y: leafX,
          transition: "transform 0.2s ",
        }}
        className="absolute top-[55%]"
      >
        <Image src={butter} width={150} height={150} alt="pic" />
      </motion.div>
      <motion.div
        style={{
          y: translateYMushroomBottom,
          transition: "transform 0.3s ",
        }}
        className="absolute hidden sm:block top-[20%] xl:top-[25%] right-0"
      >
        <Image src={burger} width={150} height={150} alt="pic" />
      </motion.div>
      <div className="container px-5 mx-auto mb-[100px]">
        <h2 className="text-center text-[40px] font-bold">
          {dictionary?.menu}
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-5 mt-[15px]">
          <button
            onClick={handleAll}
            className={`p-2 font-bold uppercase duration-300 rounded-md px-5 ${
              activeCategory === null
                ? "bg-mainColor text-white"
                : "hover:bg-mainColor hover:text-white bg-white"
            }`}
          >
            {dictionary?.allView}
          </button>
          {category?.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleFilter(cat.id)}
              className={`p-2 font-bold uppercase duration-300 rounded-md px-5 ${
                activeCategory === cat.id
                  ? "bg-mainColor text-white"
                  : "hover:bg-mainColor hover:text-white bg-white"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
        <div className="flex gap-5 mt-[30px] flex-wrap justify-center ">
          {data.length > 0 ? (
            data?.map((el) => {
              if (el.categoryId !== null) {
                return <Card key={el.id} data={el} />;
              }
            })
          ) : (
            <div className="mt-[-25px]">
              <Loading />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
