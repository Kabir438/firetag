/* eslint-disable @next/next/no-img-element */
import Image from "next/image"

export default function About() {
    return (
        <main className="pt-[0px] max-h-screen">
            <div id="container">
                <First/>
                <Second/>
                <Third/>
            </div>
        </main>
    )
}

About.title = `Firetag - About Us`

function First() {
    return (
        <div id="first" style={{
            backgroundImage: `url("/river.jpg")`,
            backgroundSize: "cover",
            backgroundAttachment: "fixed"
        }}
        className="h-screen"
        >
            <div
            className="view w-full pt-[93px] bg-[#04c6d096] flex flex-col items-center justify-center" 
            style={{
                height: "100vh"
            }}>
                <Image 
                src="/logo.png"
                alt="logo"
                width={140*2}
                height={80*2} />
                <h1 style={{fontFamily: "'Poppins'"}} className="text-[3.5rem] text-center mt-4">A Company that saves the planet and lives</h1>
                <p className="px-24 mt-20 text-justify text-white text-xl"> Our project establishes a connection between the fire reporters and the firemen directly through our service of an application. This allows us to curb the fires and restrict the damage caused in the open forest with our efficient reporting method and technique.  Looking at the rising levels of forest fires, we believe that this is the best time for such a project to be launched.</p>
            </div>
        </div>
    )
}

function Second() {
    return (
        <div id="second" style={{
            backgroundSize: "cover",
            backgroundPosition: "fixed",
        }}
        className="view w-full min-h-screen bg-[#1d025c] py-[93px] flex flex-col items-center justify-center" 
        > 
            <h1 style={{fontFamily: "'Poppins'"}} className="text-[3.5rem] text-[antiquewhite] text-center mt-14 mb-12">There&apos;s just the three of us...</h1>
            <div id="avatar-container" className="flex items-center justify-evenly h-[30rem] w-screen px-10">
                <div className="anAvatar w-[20rem] h-full flex flex-col items-center justify-evenly">
                    <img className="rounded-full" src="/amrit.jpeg" alt={`amrit`} width={576*0.4} height={754*0.4}/>
                    <h3 className="text-5xl font-kdam text-orange-400">Amrit</h3>
                    <h4 className="font-dancing text-4xl text-orange-600">Lorem, ipsum dolor.</h4>
                    <h4 className="font-dancing text-4xl text-orange-600">Lorem, ipsum.</h4>
                    <h4 className="font-dancing text-4xl text-orange-600">Lorem, ipsum.</h4>
                </div>
                <div className="anAvatar w-[20rem] h-full flex flex-col items-center justify-evenly">
                    <img className="rounded-full" src="/kabir.jpeg" alt={`tejas`} width={770*0.35} height={1024*0.35}/>
                    <h3 className="text-5xl font-kdam text-orange-400">Kabir</h3>
                    <h4 className="font-dancing text-4xl text-orange-600">Lorem, ipsum dolor.</h4>
                    <h4 className="font-dancing text-4xl text-orange-600">Lorem, ipsum.</h4>
                    <h4 className="font-dancing text-4xl text-orange-600">Lorem, ipsum.</h4>
                </div>
                <div className="anAvatar w-[20rem] h-full flex flex-col items-center justify-evenly">
                    <img className="rounded-full" src="/tejas.jpeg" alt={`tejas`} width={360*0.6} height={393*0.6}/>
                    <h3 className="text-5xl font-kdam text-orange-400">Tejas</h3>
                    <h4 className="font-dancing text-4xl text-orange-600">Lorem, ipsum dolor.</h4>
                    <h4 className="font-dancing text-4xl text-orange-600">Lorem, ipsum.</h4>
                    <h4 className="font-dancing text-4xl text-orange-600">Lorem, ipsum.</h4>
                </div>
                <div className="anAvatar w-[20rem] h-full flex flex-col items-center justify-evenly">
                    <img className="rounded-full" src="/arnav.jpeg" alt={`arnav`} width={360*0.6} height={393*0.6}/>
                    <h3 className="text-5xl font-kdam text-orange-400">Arnav</h3>
                    <h4 className="font-dancing text-4xl text-orange-600">Lorem, ipsum dolor.</h4>
                    <h4 className="font-dancing text-4xl text-orange-600">Lorem, ipsum.</h4>
                    <h4 className="font-dancing text-4xl text-orange-600">Lorem, ipsum.</h4>
                </div>
            </div>
        </div>
    )
}

function Third() {
    return (
        <div id="second" style={{
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            backgroundImage: "url('/gradient.jpg')"
        }}
        className="view w-full h-screen py-[93px] flex flex-col items-center justify-center" 
        >
            <h1 style={{fontFamily: "'Poppins'"}} className="text-[3.5rem]  text-[#2e1a03] text-center mt-14 mb-12">But we collaborate with others</h1>
            <div id="avatar-container" className="flex items-center justify-evenly h-[30rem] w-screen px-10">
                <div className="anAvatar w-[20rem] h-full flex flex-col items-center justify-evenly">
                    <Image src="/logo.png" alt={`${""} avatar`} width={360*0.55} height={393*0.55} layout={`intrinsic`}/>
                    <h3 className="text-5xl font-kdam text-blue-400 mt-3">Name</h3>
                    <h4 className="font-dancing text-4xl bg-[#5d007782] p-2 m-1 rounded-lg text-[antiquewhite]">Lorem, ipsum dolor.</h4>
                    <h4 className="font-dancing text-4xl bg-[#5d007782] p-2 m-1 rounded-lg text-[antiquewhite]">Lorem, ipsum.</h4>
                    <h4 className="font-dancing text-4xl bg-[#5d007782] p-2 m-1 rounded-lg text-[antiquewhite]">Lorem, ipsum.</h4>
                </div>
                <div className="anAvatar w-[20rem] h-full flex flex-col items-center justify-evenly">
                    <Image src="/logo.png" alt={`${""} avatar`} width={360*0.55} height={393*0.55} layout={`intrinsic`}/>
                    <h3 className="text-5xl font-kdam text-blue-400 mt-3">Name</h3>
                    <h4 className="font-dancing text-4xl bg-[#5d007782] p-2 m-1 rounded-lg text-[antiquewhite]">Lorem, ipsum dolor.</h4>
                    <h4 className="font-dancing text-4xl bg-[#5d007782] p-2 m-1 rounded-lg text-[antiquewhite]">Lorem, ipsum.</h4>
                    <h4 className="font-dancing text-4xl bg-[#5d007782] p-2 m-1 rounded-lg text-[antiquewhite]">Lorem, ipsum.</h4>
                </div>
            </div>
        </div>
    )
}

About.transparent = true