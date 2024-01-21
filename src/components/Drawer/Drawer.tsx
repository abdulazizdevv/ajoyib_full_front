import React, { useEffect, useRef, useState } from "react";
// import { GrClose } from "react-icons/gr";
import { MdClose } from "react-icons/md";
import "./Drawer.css";
import Image from "next/image";
import Link from "next/link";
import { useSetStore } from "@/redux/store";
import logo from "../../assets/icons/fullLogo.png";

interface ModalProps {
  children: any;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Offcanvas: React.FC<ModalProps> = ({
  children,
  modal,
  setModal,
}) => {
  const { header } = useSetStore();

  const overlayRef = useRef<HTMLDivElement>(null);
  const handleOverlay = (evt: React.MouseEvent<HTMLDivElement>) => {
    if (evt.target === overlayRef?.current) {
      setModal(false);
    }
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlay}
      className={`overlay bg-black duration-300 bg-opacity-40 ${
        modal ? "open" : ""
      }`}
      style={{ zIndex: 9999999 }}
    >
      <div
        className={`absolute w-[60%] xl:w-[31%]  right-0  modal_wrapperCanvas bg-bgColor p-5  z-[9999]`}
      >
        <div className={`flex items-center justify-between mb-5 mt-2`}>
          <Link
            href={`/${header}`}
            className="text-mainColor font-bold text-[35px]"
          >
            <Image
              className="w-[120px] h-auto"
              src={logo}
              width={0}
              height={0}
              alt="logo"
            />
          </Link>
          <button onClick={() => setModal(false)}>
            <MdClose size={24} color={"#808088"} />
          </button>
        </div>
        <div className={`modal-content`}>{children}</div>
      </div>
    </div>
  );
};
