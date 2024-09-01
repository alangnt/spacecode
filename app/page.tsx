"use client";

import Image from "next/image";

import { useRouter } from "next/navigation";

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
    <header className="flex justify-center items-center text-center py-4">
      <h1 className="sm:text-3xl text-2xl max-sm:p-2">SpaceCode - Redefining the Future of Code in the Space Industry</h1>
    </header>
  );
}

function Main() {
  const router = useRouter();

  const handleProblemClick = () => {
    router.push("/problems/0109");
  }

  return (
    <main className="flex flex-col items-center justify-center max-w-3xl mx-auto h-[50vh]">
      <div className="flex flex-col items-center">
        <button className="text-2xl hover:text-gray-400 sm:hover:scale-105 sm:transition-all sm:duration-300" onClick={handleProblemClick}>Solve problem of the day</button>
      </div>
    </main>
  );
}

function Footer() {
  return (
    <footer className="flex grow justify-center items-end text-center py-1">
      <p className="text-sm">
        @2024 SpaceCode. All rights reserved.
      </p>
    </footer>
  );
}