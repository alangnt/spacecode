"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

import { useState } from "react";

export default function Home() {
  return (
    <>
      <Wallpaper />
      <Header />
      <Main />
      <Footer />
    </>
  );
}

function Wallpaper() {
  return (
    <div className="w-full h-screen  absolute top-0 left-0 -z-50">
      <Image src="/space-wpp.jpg" alt="logo" width={3840} height={2160} className="w-full h-full object-cover" />
    </div>
  );
}

function Header() {
  return (
    <header className="flex">
      <h1 className="text-3xl font-bold">SpaceCode - Redefining the Future of Code in the Space Industry</h1>
    </header>
  );
}

function Main() {
  const [problem, setProblem] = useState<string>("");

  const handleProblem = () => {
    setProblem("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien. Nulla facilisi. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.");
  }

  return (
    <main className="flex-grow flex flex-col items-center max-w-3xl mx-auto my-12">
      <h2>Solve the problem of the day</h2>
      
      <div className="flex flex-col items-center gap-4">
        <Button className="w-min" onClick={handleProblem}><h3>Problem</h3></Button>
        <p className="text-center">{problem}</p>
      </div>
    </main>
  );
}

function Footer() {
  return (
    <footer className="flex justify-center items-center text-center">
      <p className="text-sm">
        @2024 SpaceCode. All rights reserved.
      </p>
    </footer>
  );
} 