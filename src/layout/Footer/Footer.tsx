import React from "react";
import bgImage from "@/assets/images/main_bg.jpg";
import Link from "next/link";
import { LuPhone } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { useSetStore } from "@/redux/store";
import { LiaTelegramPlane } from "react-icons/lia";
import { FaInstagram } from "react-icons/fa";
import Image from "next/image";

import logo from "@/assets/icons/fullLogo.png";

export default function Footer() {
  const { dictionary, header } = useSetStore();
  return (
    <footer
      id="contact"
      style={{
        backgroundImage: `url(${bgImage.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="mt-auto "
    >
      <div className="container mx-auto px-5">
        <div className="py-[70px] flex flex-wrap gap-5 md:gap-0 items-start justify-between">
          <div>
            <Image
              className="w-[150px] h-auto mb-[15px]"
              src={logo}
              width={0}
              height={0}
              alt="logo"
            />

            <div className="flex items-center gap-3 mb-3">
              <IoLocationOutline size={24} color={"white"} />
              <p className="text-white font-bold">
                Manzil: Uzbekiston Andijon, Xonobod
              </p>
            </div>
            <Link
              className="text-white flex items-center gap-3 mb-3 font-bold"
              href={"tel:+998994364383"}
            >
              <LuPhone size={24} color={"white"} />
              +99897-232-50-20
            </Link>
            <Link
              className="text-white flex items-center gap-3 mb-3 font-bold"
              href={"tel:+998994364383"}
            >
              <LuPhone size={24} color={"white"} />
              +99899-436-43-83
            </Link>
          </div>
          <div>
            <h3 className="text-white font-bold mb-5 uppercase text-[20px]">
              {dictionary?.links}
            </h3>
            <div className="flex flex-col gap-2">
              <Link
                href={`/${header}`}
                className="text-white hover:text-mainColor font-bold"
              >
                {dictionary?.home}
              </Link>
              <Link
                href={"#about"}
                className="text-white hover:text-mainColor font-bold"
              >
                {dictionary?.about}
              </Link>
              <Link
                href={"#menu"}
                className="text-white hover:text-mainColor font-bold"
              >
                {dictionary?.menu}
              </Link>
              <Link
                href={"#service"}
                className="text-white hover:text-mainColor font-bold"
              >
                {dictionary?.service}
              </Link>
              <Link
                href={"#contact"}
                className="text-white hover:text-mainColor font-bold"
              >
                {dictionary?.contact}
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-white font-bold mb-5 uppercase text-[20px]">
              {dictionary?.socialMedia}
            </h3>
            <div className="flex gap-3">
              <Link
                href={"https://t.me/ajoyib_fastfood"}
                target="_blank"
                className="border hover:text-mainColor hover:border-mainColor duration-300 text-white cursor-pointer border-[white] rounded-full p-2"
              >
                <LiaTelegramPlane size={24} />
              </Link>
              <Link
                target="_blank"
                href={"https://www.instagram.com/ajoyib_kafe/"}
                className="border hover:text-mainColor hover:border-mainColor duration-300 text-white cursor-pointer border-[white] rounded-full p-2"
              >
                <FaInstagram size={24} />
              </Link>
            </div>
          </div>
          <div className="hidden md:block h-[200px] w-[0.5px] bg-[#777676]" />
          <div>
            <h3 className="text-white font-bold mb-5 uppercase text-[20px]">
              {dictionary?.workTime}
            </h3>
            <div>
              <p className="text-white font-bold">
                {dictionary?.monday} - {dictionary?.sunday}:
                <span className="text-[#3e9f3e] ms-1">10:00 - 22:00</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
