import Image from "next/image";
import React from "react";
import bg from "@/assets/icons/loader.svg";

export default function Loading() {
  return (
    <div className="h-screen">
      <Image
        style={{
          position: "absolute",
          top: "10px",
          bottom: "0px",
          right: "0px",
          left: "0px",
          margin: "auto",
          width: "250px",
          height: "250px",
        }}
        src={bg}
        width={0}
        height={0}
        alt="loading"
      />
    </div>
  );
}
