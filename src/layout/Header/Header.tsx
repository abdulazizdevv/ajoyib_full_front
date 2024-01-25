import Link from "next/link";
import React, { useEffect, useState } from "react";

import bgImage from "../../assets/images/main_bg.jpg";
import tomato from "../../assets/images/tomato.png";
import logo from "../../assets/icons/fullLogo.png";
import Image from "next/image";

import { useSetStore } from "@/redux/store";
import LocaleSwitcher from "@/components/Local-switcher/Local-switcher";
import { Offcanvas } from "@/components/Drawer/Drawer";
import { RiMenu3Fill } from "react-icons/ri";
import { usePathname, useRouter } from "next/navigation";
import { BiBasket, BiSolidBasket } from "react-icons/bi";
import { LiaAngleUpSolid } from "react-icons/lia";
import useProductStore from "@/app/[lang]/cart/store";

export default function Header() {
  const [modal, setModal] = useState<boolean>(false);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const { cartItems } = useProductStore();
  const { dictionary, header } = useSetStore();
  const router = useRouter();
  const path = usePathname();
  const hashIndex = path.indexOf("#");
  const section = hashIndex !== -1 ? path.slice(hashIndex + 1) : null;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 150;

      if (scrollY > threshold) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="sticky top-0 z-10 ">
      {showBackToTop && (
        <div className="fixed bottom-[30px] border border-mainColor bg-bgColor p-3 rounded-full right-[30px] z-[9999]">
          <Link href="/" >
            <LiaAngleUpSolid size={24} color="#a93535" />
          </Link>
        </div>
      )}
      <div
        style={{
          backgroundImage: `url(${bgImage.src})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="container px-5 py-5 mx-auto">
          <nav className="flex items-center justify-between ">
            <div className="me-5 z-[9]">
              <Link href={`/`} className="text-mainColor font-bold text-[35px]">
                <Image
                  className="w-[150px] h-auto"
                  src={logo}
                  width={0}
                  height={0}
                  alt="logo"
                />
              </Link>
            </div>
            <div className="absolute right-[30%] sm:right-[30%]">
              <Image
                className="w-[100px] h-auto md:w-[150px]"
                src={tomato}
                width={0}
                height={0}
                alt="tomato"
              />
            </div>
            <div className="hidden md:flex items-center gap-3 lg:gap-5 z-10 me-3">
              <div>
                <Link
                  href={`/${header}`}
                  className={`text-white text-[20px] font-semibold hover:text-[#a93535] ${
                    section === header ? "text-mainColor" : ""
                  }`}
                >
                  {dictionary?.home}
                </Link>
              </div>
              <div>
                <Link
                  href={"#about"}
                  className={`text-white text-[20px] font-semibold hover:text-[#a93535] ${
                    section === "about" ? "text-mainColor" : ""
                  }`}
                >
                  {dictionary?.about}
                </Link>
              </div>
              <div>
                <Link
                  href={`#menu`}
                  className={`text-[20px] font-semibold hover:text-[#a93535] ${
                    section === "menu" ? "text-mainColor" : "text-white"
                  }`}
                >
                  {dictionary?.menu}
                </Link>
              </div>
              <div>
                <Link
                  href={"#service"}
                  className={`text-white text-[20px] font-semibold hover:text-[#a93535] ${
                    section === "service" ? "text-mainColor" : ""
                  }`}
                >
                  {dictionary?.service}
                </Link>
              </div>
              <div>
                <Link
                  href={"#contact"}
                  className={`text-white text-[20px] font-semibold hover:text-[#a93535] ${
                    section === "contact" ? "text-mainColor" : ""
                  }`}
                >
                  {dictionary?.contact}
                </Link>
              </div>
            </div>
            {/* toggle */}
            <div className="flex items-center gap-3">
              <div className="z-[1]">
                <LocaleSwitcher />
              </div>
              <button className="relative" onClick={() => router.push(`/cart`)}>
                <div>
                  <BiBasket size={35} color={"white"} />
                </div>
                <p className="bg-mainColor text-white absolute top-[-8px] right-[-9px] w-[25px] h-[25px]  rounded-full">
                  {cartItems.length}
                </p>
              </button>
            </div>
            <div className="z-50 block md:hidden">
              {/* <OffCanvas /> */}
              <button className="mt-2 ms-2" onClick={() => setModal(true)}>
                <RiMenu3Fill size={35} color={"white"} />
              </button>

              <Offcanvas setModal={setModal} modal={modal}>
                <div className="flex flex-col">
                  <Link
                    href={`/${header}`}
                    className={`text-black p-2 hover:bg-white rounded-md text-[20px] font-semibold hover:text-[#a93535] ${
                      section === header ? "text-mainColor" : ""
                    }`}
                  >
                    {dictionary?.home}
                  </Link>
                  <Link
                    href={"#about"}
                    className={`text-black p-2 hover:bg-white rounded-md text-[20px] font-semibold hover:text-[#a93535] ${
                      section === "about" ? "text-mainColor" : ""
                    }`}
                  >
                    {dictionary?.about}
                  </Link>
                  <Link
                    href={`#menu`}
                    className={`text-black p-2 hover:bg-white rounded-md text-[20px] font-semibold hover:text-[#a93535] ${
                      section === "menu" ? "text-mainColor" : ""
                    }`}
                  >
                    {dictionary?.menu}
                  </Link>
                  <Link
                    href={"#service"}
                    className={`text-black p-2 hover:bg-white rounded-md text-[20px] font-semibold hover:text-[#a93535] ${
                      section === "service" ? "text-mainColor" : ""
                    }`}
                  >
                    {dictionary?.service}
                  </Link>
                  <Link
                    href={"#contact"}
                    className={`text-black p-2 hover:bg-white rounded-md text-[20px] font-semibold hover:text-[#a93535] ${
                      section === "contact" ? "text-mainColor" : ""
                    }`}
                  >
                    {dictionary?.contact}
                  </Link>
                </div>
              </Offcanvas>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
