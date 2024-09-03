"use client"

import Link from "next/link"
import { useState } from "react"

import { House, Waypoints, LogIn, Orbit } from "lucide-react"

export default function Home() { 
    return (
        <div className="bg-gradient-to-tl from-black to-gray-900 flex text-white h-screen w-screen">
            <Header />
            <div className="h-full bg-white border-l border-gray-700 w-[1px]" />
        </div>
    )
}

function Header() {
    const [signIn, setSignIn] = useState(false)

    return (
        <header className="w-[200px] flex flex-col items-center">
            <div className="flex items-center p-4 gap-2">
                <Orbit size={24} />
                <h1 className="text-xl font-bold">SpaceCode</h1>
            </div>

            <div className="w-[95%] border-b border-gray-700 mb-4" />

            <nav className="flex flex-col w-full px-4">
                <Link className="flex items-center justify-start gap-2 hover:bg-gray-800 py-1 px-2 rounded-sm" href="/">
                    <House size={16}/>
                    <Link href="/">Home</Link>
                </Link>
                <Link className="flex items-center justify-start gap-2 hover:bg-gray-800 py-1 px-2 rounded-sm" href="/problems">
                    <Waypoints size={16} />
                    <Link href="/problems">Problems</Link>
                </Link>
            </nav>

            <div className="w-[95%] border-b border-gray-700 my-4" />

            <div className="flex flex-col px-4 gap-2">
                <p className="text-sm">Sign in to save your progress</p>
                <button className="flex items-center gap-2 bg-blue-900/30 hover:bg-blue-900/50 py-1 px-2 rounded-sm" onClick={() => setSignIn(true)}>
                    <LogIn size={16} />
                    Sign in
                </button>
            </div>

            {signIn && (
                <section className="absolute w-screen h-screen top-0 left-0 flex items-center justify-center bg-gray-900/50">
                    <div className="bg-black/10 backdrop-blur-sm text-white w-[300px] h-[300px] rounded-md">
                        <h1>Sign in</h1>
                    </div>
                </section>
            )}

            <div className="w-[95%] border-b border-gray-700 my-4" />
        </header>
    )
}