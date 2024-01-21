import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { BiBasket } from "react-icons/bi";
import { IProduct } from "@/types/langType";
import { baseURL } from "@/api/api";
import { useRouter } from "next/navigation";
import useProductStore from "@/app/[lang]/cart/store";
import { useSetStore } from "@/redux/store";

type Props = {
  data: IProduct;
};

export default function Card({ data }: Props) {
  const { addToCart, cartItems } = useProductStore();
  const { header } = useSetStore();
  const router = useRouter();

  useEffect(() => {
    const storedProductIds = JSON.parse(localStorage.getItem("cartId") || "[]");
    addToCart(storedProductIds);
  }, [addToCart]);

  const handleProductClick = () => {
    const productId = data?.id;
    if (cartItems.includes(productId)) {
      const updatedProductIds = cartItems.filter((id) => id !== productId);
      addToCart(updatedProductIds);
      localStorage.setItem("cartId", JSON.stringify(updatedProductIds));
    } else {
      const updatedProductIds = [...cartItems, productId];
      addToCart(updatedProductIds);
      localStorage.setItem("cartId", JSON.stringify(updatedProductIds));
    }
  };

  let cut: number = 50;
  const truncatedDescription =
    data?.description.length > cut
      ? data?.description.substring(0, cut) + "..."
      : data?.description;

  return (
    <div className="flex bg-white p-5 cursor-pointer flex-col hover:shadow-2xl rounded-2xl duration-300 ease-in-out justify-center max-w-[280px]">
      <div>
        <div
          onClick={() => router.push(`${header}/menu/${data?.id}`)}
          className="flex items-center justify-center"
        >
          <div style={{ position: "relative", width: "100%", height: "250px" }}>
            <Image
              style={{ objectFit: "cover", borderRadius: "8px" }}
              src={`${baseURL}/${data.image}`}
              width={250}
              height={250}
              alt="pic"
            />
          </div>
        </div>
      </div>
      <div className=" ">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-bold uppercase text-[20px]">{data?.title}</h4>
          {/* <div>
            <div className="text-mainColor">
              {likedItems.includes(data?.id) ? (
                <IoMdHeart size={24} onClick={handleProductLikeClick} />
              ) : (
                <IoMdHeartEmpty size={24} onClick={handleProductLikeClick} />
              )}
            </div>
          </div> */}
        </div>
        <span>⭐⭐⭐⭐⭐</span>
        <p className="text-[#464646] max-w-[280px] mt-3 h-[45px]">
          {truncatedDescription}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between my-3">
          <p className="font-bold text-mainColor text-[20px]">
            {data?.price} so'm
          </p>
        </div>
      </div>
      <button
        onClick={handleProductClick}
        className={`border flex items-center justify-center gap-3  border-[green] p-2 rounded-lg
            ${cartItems.includes(data?.id) ? "bg-[green] text-white" : ""}  `}
      >
        Add to cart <BiBasket size={24} />
      </button>
    </div>
  );
}
