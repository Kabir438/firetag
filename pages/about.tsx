/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

export default function About() {
  return (
    <>
      <main className="pt-[93px] min-h-screen w-screen flex-wrap flex items-center justify-center">
        <Section1></Section1>
      </main>
      <div className="pt-[93px] mb-4 min-h-screen w-screen flex flex-col items-center justify-center">
        <h1
          style={{
            margin: 0,
            fontFamily: "Barlow,sans-serif",
            fontWeight: 700,
            lineHeight: 1.3333333333333333,
            fontSize: "2.5rem",
            color: "white",
            textAlign: "center",
          }}
        >
          A Small But Great Team
        </h1>
        <div className="flex-wrap flex mt-6 justify-center items-center gap-[20px]">
          {/* kabir */}
          <div className="w-[300px] xl:hidden 2xl:hidden lg:hidden xs:flex sm:flex md:flex h-[400px] flex-col justidy-center items-start hover:scale-95 transition-all ease-in-out">
            <Image
              className="rounded-xl"
              width={733 / 1.5}
              height={1008 / 1.5}
              src="/kabir.jpeg"
              alt="kabir"
            ></Image>
            <div
              className="w-[300px] h-[400px] opacity-0 hover:opacity-100 rounded-xl absolute pb-8 bg-[black] flex flex-col items-center justify-end"
              style={{
                background:
                  "linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 95%)",
                transition: "opacity 250ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
              }}
            >
              <h1 className="w-full text-center text-[antiquewhite] text-2xl">
                Kabir
              </h1>
              <h2 className="w-full text-center text-[whitesmoke] text-xl">
                Lead Programmer
              </h2>
            </div>
          </div>
          {/* amrit */}
          <div className="w-[300px] h-[400px] flex flex-col justidy-center items-start hover:scale-95 transition-all ease-in-out">
            <Image
              className="rounded-xl"
              width={576 / 1.5}
              height={754 / 1.5}
              src="/amrit.jpeg"
              alt="amrit"
            ></Image>
            <div
              className="w-[300px] h-[400px] opacity-0 hover:opacity-100 rounded-xl absolute pb-8 bg-[black] flex flex-col items-center justify-end"
              style={{
                background:
                  "linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 95%)",
                transition: "opacity 250ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
              }}
            >
              <h1 className="w-full text-center text-[antiquewhite] text-2xl">
                Amrit
              </h1>
              <h2 className="w-full text-center text-[whitesmoke] text-xl">
                Co Founder
              </h2>
            </div>
          </div>
          {/* kabir */}
          <div className="w-[300px] scale-105 xl:flex 2xl:flex lg:flex xs:hidden sm:hidden md:hidden h-[400px] flex-col justidy-center items-start hover:scale-100 transition-all ease-in-out">
            <Image
              className="rounded-xl"
              width={733 / 1.5}
              height={1008 / 1.5}
              src="/kabir.jpeg"
              alt="kabir"
            ></Image>
            <div
              className="w-[300px] h-[400px] opacity-0 hover:opacity-100 rounded-xl absolute pb-8 bg-[black] flex flex-col items-center justify-end"
              style={{
                background:
                  "linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 95%)",
                transition: "opacity 250ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
              }}
            >
              <h1 className="w-full text-center text-[antiquewhite] text-2xl">
                Kabir
              </h1>
              <h2 className="w-full text-center text-[whitesmoke] text-xl">
                Lead Programmer
              </h2>
            </div>
          </div>
          {/* tejas */}
          <div className="w-[300px] h-[400px] flex flex-col justidy-center items-start hover:scale-95 transition-all ease-in-out">
            <Image
              className="rounded-xl"
              width={591 / 1.5}
              height={796 / 1.5}
              src="/tejas.jpeg"
              alt="tejas"
            ></Image>
            <div
              className="w-[300px] h-[400px] opacity-0 hover:opacity-100 rounded-xl absolute pb-8 bg-[black] flex flex-col items-center justify-end"
              style={{
                background:
                  "linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 95%)",
                transition: "opacity 250ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
              }}
            >
              <h1 className="w-full text-center text-[antiquewhite] text-2xl">
                Tejas
              </h1>
              <h2 className="w-full text-center text-[whitesmoke] text-xl">
                Co Founder
              </h2>
            </div>
          </div>
        </div>
        <div className="flex-wrap flex mt-8 justify-center items-center gap-[20px]">
            <Image src="/arnav.jpeg" alt="arnav" style={{borderRadius: "10px"}} width={305/4} height={480/4} />
            <h2 className="text-white text-2xl font-openSans">Technical Manager: Arnav Malhotra</h2>
        </div>
      </div>
    </>
  );
}

function Section1() {
  return (
    <>
      <section className="md:w-[40vw] lg:w-[40vw] xl:w-[40vw] sm:w-screen xs:w-screen md:h-[calc(100vh-93px)] lg:h-[calc(100vh-93px)] xl:h-[calc(100vh-93px)] sm:h-max xs:h-max xs:!p-8 sm:!p-8 grid place-items-center pl-32 pt-">
        <Image
          src="/about.svg"
          width="400"
          height="400"
          alt="Illustration"
        ></Image>
      </section>
      <section className="md:w-[60vw] lg:md:w-[60vw] xl:md:w-[60vw] sm:w-[80vw] xs-[80vs] h-[calc(100vh-93px)] grid place-items-center">
        <div className="container w-[70%] flex flex-col items-center justify-center">
          <h1
            className="text-5xl text-white w-full font-[Barlow,sans-serif]"
            style={{
              fontWeight: 700,
              lineHeight: 1.3333333333333333,
            }}
          >
            Our Aim
          </h1>
          <p className="mb-[40px] mt-[24px] leading-[1.75] text-[1rem] font-[400] font-poppins text-[rgb(145,158,171)]">
            The aim and focus of this project lies in establishing a rigid
            structure to draw out an explicit connection between the populace,
            the government and response teams. We intend to create an
            environment with a special focus on the public and cater to their
            request, since no such robust system exists which provides such ease
            to the populous in terms of ease of user interface and accessibility
            to the emergency services
          </p>
        </div>
      </section>
    </>
  );
}

// export default function About() {
//     return (
//         <main className="pt-[0px] max-h-screen">
//             <div id="container">
//                 <First/>
//                 <Second/>
//                 <Third/>
//             </div>
//         </main>
//     )
// }

About.title = `Firetag - Support Us`;

function First() {
  return (
    <div
      id="first"
      style={{
        backgroundImage: `url("/river.jpg")`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
      className="h-screen"
    >
      <div
        className="view w-full pt-[93px] bg-[#04c6d096] flex flex-col items-center justify-center"
        style={{
          height: "100vh",
        }}
      >
        <Image src="/logo.png" alt="logo" width="158.4" height="80" />
        <h1
          style={{ fontFamily: "'Poppins'" }}
          className="text-[3.5rem] text-center mt-4"
        >
          A Company that saves the planet and lives
        </h1>
        <p className="px-24 mt-20 text-justify text-white text-xl">
          {" "}
          Our project establishes a connection between the fire reporters and
          the firemen directly through our service of an application. This
          allows us to curb the fires and restrict the damage caused in the open
          forest with our efficient reporting method and technique. Looking at
          the rising levels of forest fires, we believe that this is the best
          time for such a project to be launched.
        </p>
      </div>
    </div>
  );
}

function Second() {
  return (
    <div
      id="second"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "fixed",
      }}
      className="view w-full min-h-screen bg-[#1d025c] py-[93px] flex flex-col items-center justify-center"
    >
      <h1
        style={{ fontFamily: "'Poppins'" }}
        className="text-[3.5rem] text-[antiquewhite] text-center mt-14 mb-12"
      >
        There&apos;s just the three of us...
      </h1>
      <div
        id="avatar-container"
        className="flex items-center justify-evenly h-[30rem] w-screen px-10"
      >
        <div className="anAvatar w-[20rem] h-full flex flex-col items-center justify-evenly">
          <img
            className="rounded-full"
            src="/amrit.jpeg"
            alt={`amrit`}
            width={576 * 0.4}
            height={754 * 0.4}
          />
          <h3 className="text-5xl font-kdam text-orange-400">Amrit</h3>
          <h4 className="font-dancing text-4xl text-orange-600">
            Lorem, ipsum dolor.
          </h4>
          <h4 className="font-dancing text-4xl text-orange-600">
            Lorem, ipsum.
          </h4>
          <h4 className="font-dancing text-4xl text-orange-600">
            Lorem, ipsum.
          </h4>
        </div>
        <div className="anAvatar w-[20rem] h-full flex flex-col items-center justify-evenly">
          <img
            className="rounded-full"
            src="/kabir.jpeg"
            alt={`tejas`}
            width={770 * 0.35}
            height={1024 * 0.35}
          />
          <h3 className="text-5xl font-kdam text-orange-400">Kabir</h3>
          <h4 className="font-dancing text-4xl text-orange-600">
            Lead Programmer
          </h4>
        </div>
        <div className="anAvatar w-[20rem] h-full flex flex-col items-center justify-evenly">
          <img
            className="rounded-full"
            src="/tejas.jpeg"
            alt={`tejas`}
            width={360 * 0.6}
            height={393 * 0.6}
          />
          <h3 className="text-5xl font-kdam text-orange-400">Tejas</h3>
 
        </div>
        <div className="anAvatar w-[20rem] h-full flex flex-col items-center justify-evenly">
          <img
            className="rounded-full"
            src="/arnav.jpeg"
            alt={`arnav`}
            width={360 * 0.6}
            height={393 * 0.6}
          />
          <h3 className="text-5xl font-kdam text-orange-400">Arnav</h3>

        </div>
      </div>
    </div>
  );
}

function Third() {
  return (
    <div
      id="second"
      style={{
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundImage: "url('/gradient.jpg')",
      }}
      className="view w-full h-screen py-[93px] flex flex-col items-center justify-center"
    >
      <h1
        style={{ fontFamily: "'Poppins'" }}
        className="text-[3.5rem]  text-[#2e1a03] text-center mt-14 mb-12"
      >
        But we collaborate with others
      </h1>
      <div
        id="avatar-container"
        className="flex items-center justify-evenly h-[30rem] w-screen px-10"
      >
        <div className="anAvatar w-[20rem] h-full flex flex-col items-center justify-evenly">
          <Image
            src="/logo.png"
            alt={`${""} avatar`}
            width={360 * 0.55}
            height={393 * 0.55}
            layout={`intrinsic`}
          />
          <h3 className="text-5xl font-kdam text-blue-400 mt-3">Name</h3>
          <h4 className="font-dancing text-4xl bg-[#5d007782] p-2 m-1 rounded-lg text-[antiquewhite]">
            Lorem, ipsum dolor.
          </h4>
          <h4 className="font-dancing text-4xl bg-[#5d007782] p-2 m-1 rounded-lg text-[antiquewhite]">
            Lorem, ipsum.
          </h4>
          <h4 className="font-dancing text-4xl bg-[#5d007782] p-2 m-1 rounded-lg text-[antiquewhite]">
            Lorem, ipsum.
          </h4>
        </div>
        <div className="anAvatar w-[20rem] h-full flex flex-col items-center justify-evenly">
          <Image
            src="/logo.png"
            alt={`${""} avatar`}
            width={360 * 0.55}
            height={393 * 0.55}
            layout={`intrinsic`}
          />
          <h3 className="text-5xl font-kdam text-blue-400 mt-3">Name</h3>
          <h4 className="font-dancing text-4xl bg-[#5d007782] p-2 m-1 rounded-lg text-[antiquewhite]">
            Lorem, ipsum dolor.
          </h4>
          <h4 className="font-dancing text-4xl bg-[#5d007782] p-2 m-1 rounded-lg text-[antiquewhite]">
            Lorem, ipsum.
          </h4>
          <h4 className="font-dancing text-4xl bg-[#5d007782] p-2 m-1 rounded-lg text-[antiquewhite]">
            Lorem, ipsum.
          </h4>
        </div>
      </div>
    </div>
  );
}

About.transparent = true;
