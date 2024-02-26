"use client";
import React, { FormEvent, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { FaRegTrashAlt } from "react-icons/fa";
import useProductStore from "./store";
import { IProduct } from "@/types/langType";
import { baseURL } from "@/api/api";
import { Locale } from "../../../../i18n.config";
import { getDictionary } from "@/lib/Dictionary";
import { useSetStore } from "@/redux/store";
import Link from "next/link";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { Modal } from "@/components/Modal/Modal";
import "./form.css";
import { sendTelegramMessage } from "@/api/message";
import { ToastContainer, toast } from "react-toastify";
import SEO from "@/components/SEO/SEO";

export default function Cart({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { cartItems, addToCart } = useProductStore();
  const { updateDictionary, updateHeader, dictionary } = useSetStore();

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [price, setPrice] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [data, setData] = useState<IProduct[]>();
  const [counts, setCounts] = useState<{ [key: string]: number }>({});

  const [order, setOrder] = useState({
    name: "",
    phone: "",
    location: "",
  });

  const increment = (productId: number) => {
    setCounts(
      (prevCounts) => (
        console.log(prevCounts),
        {
          ...prevCounts,
          [productId]: prevCounts[productId] ? prevCounts[productId] + 1 : 1,
        }
      )
    );
  };

  const decrement = (productId: number) => {
    setCounts((prevCounts) => {
      return {
        ...prevCounts,
        [productId]:
          prevCounts[productId] - 1 > 0 ? prevCounts[productId] - 1 : 0,
      };
    });
  };

  const fetchData = useCallback(async () => {
    const fetchPromises = cartItems.map((i: any) =>
      fetch(`${baseURL}/get/product/${i}`)
        .then((res) => res.json())
        .then((json) => json)
        .catch((err) => console.log(err))
    );

    try {
      let totalPrice = 0;
      const results = await Promise.all(fetchPromises);
      results.map((el: any) => (totalPrice += el.price));
      results.forEach((el: any) => {
        const count = (counts[el.id] || 1) * el.price;
        totalPrice += el.price * count;
      });

      setPrice(totalPrice);
      setData(results);
    } catch (err) {
      console.log(err);
    }
  }, [cartItems, counts]);

  useEffect(() => {
    const fetchDataAndDictionary = async () => {
      await fetchData();

      const dictionary = await getDictionary(lang);
      updateDictionary(dictionary.header);
      updateHeader(lang);

      setLoading(false);
    };

    fetchDataAndDictionary();
  }, [lang, fetchData, updateDictionary, updateHeader]);

  useEffect(() => {
    let totalPrice = 0;
    let allCount = 0;

    data?.forEach((product: any) => {
      const count = counts[product.id] || 1;
      const price = product.price;
      const productPrice = count * price;
      totalPrice += productPrice;
      allCount += count;
    });

    setCount(allCount);
    setPrice(totalPrice);
  }, [data, counts]);

  const deleteCart = (id: number) => {
    const updatedCards = cartItems.filter((cartId: number) => cartId !== id);
    localStorage.setItem("cartId", JSON.stringify(updatedCards));
    addToCart(updatedCards);
  };

  const deleteAllItems = () => {
    localStorage.removeItem("cartId");
    addToCart([]);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const botToken = "6938344599:AAEmO30auw7K_wtCTlmb-02jKyG1jqPWvj4";
    const chatId = "-1002024780566";
    let totalPrice = 0;
    let message = ``;
    console.log(order);

    if (!order.name || !order.phone || !order.location) {
      return toast.error("Iltimos formani to'ldiring");
    }

    message += ` Ismi: ${order.name}\nTelefon raqami: ${order.phone}\nManzili: ${order.location}\n\n`;

    data?.forEach((product: any) => {
      const count = counts[product.id] || 1;
      const productPrice = count * product.price;
      totalPrice += productPrice;
      message += `Mahsulot: ${product.title} ${count} ta \nNarxi: ${productPrice} so'm\n\n`;
    });

    message += `Umumiy narxi: ${totalPrice} so'm`;

    sendTelegramMessage({ botToken, chatId, message })
      .then((success) => {
        if (success) {
          toast.success(dictionary?.successSend);
          setOrder((prevOrder) => ({
            ...prevOrder,
            name: "",
            phone: "",
            location: "",
          }));
          setModal(false);
        } else {
          toast.error("Empty");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <SEO />
      <section className="py-[20px] md:py-[85px]">
        <ToastContainer />
        <div>
          {cartItems.length <= 0 ? (
            <div className="flex flex-col items-center justify-center">
              <svg
                width="260"
                height="260"
                viewBox="0 0 252 260"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.6864 113.676C26.6864 113.676 70.996 111.902 80.5713 39.0665C89.0745 -25.6185 163.792 3.82378 185.39 29.6087C213.369 63.011 198.454 120.47 234.648 127.729C270.841 134.987 247.206 215.691 192.267 207.967C123.923 198.357 140.459 238.293 119.942 255.197C105.218 267.328 44.8445 255.65 42.8323 211.612C41.139 174.554 25.5073 174.671 14.4275 170.47C-1.55218 164.409 -11.6211 120.52 26.6864 113.676Z"
                  fill="#ffae00"
                  fillOpacity="0.1"
                ></path>
                <path
                  d="M177.314 194.565L133.781 151.549L125.161 160.272L168.694 203.289L177.314 194.565Z"
                  fill="#98061f"
                ></path>
                <path
                  d="M193.944 206.123L160.075 172.656C159.887 172.47 159.583 172.472 159.396 172.661L146.577 185.634C146.391 185.822 146.393 186.126 146.581 186.312L180.45 219.779C180.639 219.965 180.942 219.964 181.129 219.775L193.948 206.802C194.134 206.614 194.132 206.31 193.944 206.123Z"
                  fill="#c00a27"
                ></path>
                <path
                  d="M95.198 173.183C125.147 173.183 149.426 148.904 149.426 118.955C149.426 89.0053 125.147 64.7266 95.198 64.7266C65.2487 64.7266 40.97 89.0053 40.97 118.955C40.97 148.904 65.2487 173.183 95.198 173.183Z"
                  fill="#c00a27"
                ></path>
                <path
                  d="M95.198 164.335C120.261 164.335 140.578 144.017 140.578 118.955C140.578 93.8924 120.261 73.5752 95.198 73.5752C70.1355 73.5752 49.8184 93.8924 49.8184 118.955C49.8184 144.017 70.1355 164.335 95.198 164.335Z"
                  fill="#D4E5FF"
                ></path>
              </svg>
              <p className="font-bold text-[25px] my-5">
                {dictionary?.freeCartH1}
              </p>
              <p className="text-center text-[20px] px-5 max-w-[500px]">
                {dictionary?.freeCartP}
              </p>
              <Link
                className="bg-mainColor p-2 text-white rounded-md mt-5 px-5"
                href={"/"}
              >
                {dictionary?.home}
              </Link>
            </div>
          ) : (
            <>
              <div className="container px-5 mx-auto">
                <h1 className="font-bold text-[35px] mb-8 text-center text-mainColor">
                  {dictionary?.basket}
                </h1>
                <div className="flex gap-8 flex-wrap lg:flex-nowrap items-start">
                  <div className="w-full">
                    <>
                      <div className="flex flex-col gap-[50px]">
                        {data?.map((el) => {
                          return (
                            <>
                              <div
                                key={el.id}
                                className="flex items-center flex-wrap xl:flex-nowrap gap-[50px] "
                              >
                                <Image
                                  src={`${baseURL}/${el.image}`}
                                  width={250}
                                  height={250}
                                  alt="pic"
                                />
                                <div className="w-full">
                                  <h1 className="font-bold mb-3 text-[35px]">
                                    {el.title}
                                  </h1>
                                  <span>⭐⭐⭐⭐⭐</span>
                                  <p className="max-w-[500px]">
                                    {el.description}
                                  </p>
                                  <div className="flex justify-between mt-5">
                                    <p className="font-bold text-mainColor text-[25px]">
                                      {(counts[el.id] || 1) * el.price} so'm
                                    </p>
                                    <div className="border border-mainColor w-[35%] text-center flex justify-around rounded-md">
                                      <button
                                        onClick={() => decrement(el.id)}
                                        className="text-[25px] font-bold"
                                      >
                                        -
                                      </button>
                                      <button className="text-[25px] font-bold">
                                        {counts[el.id] || 1}
                                      </button>
                                      <button
                                        onClick={() => increment(el.id)}
                                        className="text-[25px] font-bold"
                                      >
                                        +
                                      </button>
                                    </div>
                                    <button
                                      onClick={() => deleteCart(el.id)}
                                      className="text-mainColor hover:-translate-y-3.5	duration-300"
                                    >
                                      <FaRegTrashAlt size={30} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="w-full h-[1px] bg-[gray]" />
                            </>
                          );
                        })}
                      </div>
                    </>
                  </div>
                  <div className="w-full lg:w-[80%]">
                    <div className="border border-mainColor flex flex-col gap-3 rounded-md p-5">
                      <h3 className="font-bold text-[35px]">
                        {dictionary?.cartH}
                      </h3>
                      <p className="text-[25px] font-semibold">
                        {dictionary?.cartCount}: {count}
                      </p>
                      <p className="text-[30px] font-bold">
                        {dictionary?.allPrice}: {price} so'm
                      </p>
                      <div className="flex gap-3 lg:flex-nowrap flex-wrap">
                        <button
                          onClick={() => setModal(true)}
                          className="text-white w-full bg-[green] text-center font-bold text-[20px] p-3 rounded-md items-center flex  gap-3 "
                        >
                          <MdOutlineBookmarkBorder size={24} />{" "}
                          {dictionary?.order}
                        </button>
                        <button
                          onClick={deleteAllItems}
                          className="text-white w-full bg-mainColor text-center font-bold text-[20px] p-3 rounded-md items-center flex  gap-3 "
                        >
                          <MdClose size={25} /> {dictionary?.allDelete}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          <Modal setModal={setModal} modal={modal} title={dictionary?.order}>
            <div className="container">
              <div className=" all">
                <div className="login_form">
                  <form onSubmit={handleSubmit} className="form mt-5">
                    <div className="form_div  ">
                      <input
                        type="text "
                        className="form_input "
                        placeholder=" "
                        onChange={(e) => {
                          setOrder((prevOrder) => ({
                            ...prevOrder,
                            name: e.target.value,
                          }));
                        }}
                        value={order.name}
                      />
                      <label htmlFor="" className="form_label">
                        {dictionary?.name}
                      </label>
                    </div>

                    <div className="form_div">
                      <input
                        type="tel"
                        className="form_input"
                        placeholder=" "
                        maxLength={13}
                        onChange={(e) => {
                          const input = e.target.value;
                          const phoneNumber = input.replace(/[^\d+]/g, ""); // Remove non-numeric characters except '+'
                          setOrder((prevOrder) => ({
                            ...prevOrder,
                            phone: phoneNumber,
                          }));
                        }}
                        value={order.phone}
                      />
                      <label htmlFor="" className="form_label">
                        +998 xx xxx xx xx
                      </label>
                    </div>
                    <div className="form_div">
                      {/* <input type="tex"  placeholder=" "> */}
                      <textarea
                        name="text"
                        className="form_textarea"
                        id="text"
                        rows={4}
                        cols={50}
                        placeholder=" "
                        onChange={(e) => {
                          setOrder((prevOrder) => ({
                            ...prevOrder,
                            location: e.target.value,
                          }));
                        }}
                        value={order.location}
                      />
                      <span className="form_label">
                        {dictionary?.location}{" "}
                      </span>
                    </div>
                    <div className="text-end">
                      <button
                        type="submit"
                        className="bg-mainColor text-white p-2 px-5 mt-8 rounded-md  "
                      >
                        Send
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </section>
    </>
  );
}
