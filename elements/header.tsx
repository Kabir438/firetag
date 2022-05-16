import Image from "next/image"
import Link from "next/link"
import router from "next/router"
import { useEffect } from "react"

export default function Header() {
    useEffect(function () {
        document.addEventListener("scroll", (e) => {
            const scroll = window.scrollY;
            if(scroll > 5) {
                document.querySelector("header").style.backgroundColor = "#00366600"
            } else if(scroll < 5) {
                document.querySelector("header").style.backgroundColor = "rgb(22 28 36 / var(--tw-bg-opacity))"
            }
        })
    }, [])
    return (
        <>
            <header className="h-24 z-[99999] w-full bg-[#161c24] border-b-2 border-[#00a3ac] fixed flex items-center justify-between">
                <button
                    onClick={() => router.push("/")}
                    data-animation="ripple"
                    className="z-[100001]"
                >
                    <Image style={JSON.parse(JSON.stringify({
                        WebkitUserDrag: "none"
                    }))} src="/logo.png" alt="logo" width="140" height="80" className="w-[288px] h-full flex items-center ml-2 cursor-pointer"/>
                </button>
                <h1 className="text-white z-[100000] text-6xl fixed w-screen text-center">Firetag</h1>
                <div id="right" className="flex items-center justify-evenly w-72 z-[100002]">
                    <button 
                        onClick={() => router.push("/login")}
                        className="bg-[#00a3ac] hover:bg-[#035f7b] rounded-[8px] transition-all text-white font-bold text-base"
                    >
                        <div
                            className="w-full h-full pt-2 pb-2 pr-5 pl-5 rounded-[8px]"
                            data-animation="ripple" 
                        >Login</div>
                    </button>
                    <h4 className="text-white mr-5">Cont - 9909099099</h4>
                </div>
            </header>
        </>
    )
}