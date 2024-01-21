"use client";
import React, { ReactNode } from "react";
import Footer from "@/layout/Footer/Footer";
import Header from "@/layout/Header/Header";
import Hero from "@/components/Hero/Hero";

import bgImage from "../assets/images/main_bg.jpg";

interface TemplateProps {
  children: ReactNode;
}

export default function Layout({ children }: TemplateProps) {
  return (
    <div className="bg-bgColor min-h-screen">
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
}
