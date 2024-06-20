import { Autocomplete, LoadScript } from "@react-google-maps/api";
import Image from "next/image";
import Link from "next/link";
import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { coords } from "../state/coords";
import empty from "../utils/empty";
import Hamburger from "./hamburger";
import Nav from "./nav";

const libraries: any = ["places"];

export default function Header({
  transparent,
  blur,
}: {
  transparent: boolean;
  blur: number | null;
}) {
  const router = useRouter();
  const [dimensions, setDimensions] = useState({
    y: 0,
    x: 0,
  });
  const [[latitude, longitude], setCoords]: [
    [null | number, null | number],
    React.Dispatch<React.SetStateAction<[number, number] | [null, null]>>
  ] = useRecoilState(coords);
  const [
    autocomplete,
    setAutocomplete,
  ] = useState<any>(null)
  useEffect(function () {
    setDimensions({
      y: window.innerHeight,
      x: window.innerWidth,
    });
    window.addEventListener("resize", () => {
      setDimensions({
        y: window.innerHeight,
        x: window.innerWidth,
      });
    });
    if (transparent) {
      document.addEventListener("scroll", (e) => {
        empty();
        const scroll = window.scrollY;
        if (scroll !== 0) {
          document.querySelector("header").classList.add("moreBackdropFilter");
        } else if (scroll === 0) {
          document
            .querySelector("header")
            .classList.remove("moreBackdropFilter");
        }
      });
    } else {
      document.querySelector("header").classList.add("backdropFilter");
      document.addEventListener("scroll", (e) => {
        const scroll = window.scrollY;
        if (scroll !== 0) {
          document.querySelector("header").style.backgroundColor = "#00366600";
        } else if (scroll === 0) {
          document.querySelector("header").style.backgroundColor =
            "#000000";
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(blur, "blur");
  return (
    <>
      <header
        style={{ zIndex: 999, backdropFilter: `blur(${blur || 10}px)` }}
        className={`bg-[hsl(0,0%,8%)] h-24 transition-all z-[99999] w-full ${
          transparent ? "bg-transparent" : "bg-[#161c24]"
        } border-b-[3px] ${""} fixed flex items-center justify-between`}
      >
        <button
          id="logo-button"
          className={`ml-3 rounded-lg z-[100001] w-[158.4px] h-[80px] ${
            dimensions.x < 730 ? "image-container" : ""
          }`}
        >
          <Image
            style={JSON.parse(
              JSON.stringify({
                WebkitUserDrag: "none",
              })
            )}
            src="/logo.png"
            alt="logo"
            width="158.4"
            height="80"
            className={`w-[288px] rounded-lg bg-[whitesmoke] h-full flex items-center ml-2 cursor-pointer`}
          />
        </button>
        {dimensions.x < 750 ? (
          <>
            {/* <button
              className="bg-[#00a3ac] mr-4 rounded-[8px] hover:bg-[#035f7b] cursor-pointer transition-all text-white font-bold text-base"
              onClick={() => router.replace("/login")}
            >
              <div
                className={`w-full cursor-pointer h-full pt-2 pb-2 pr-5 pl-5 rounded-[8px]`}
                data-animation="ripple"
              >
                Login
              </div>
            </button> */}
            <Hamburger />
          </>
        ) : (
          <>
            <Nav slug={router.asPath.toLocaleLowerCase()}></Nav>

            <div className="right h-full w-auto flex justify-end items-center">
              {router.route === "/" && 
              <div
                id="search"
                className={`h-fit mr-4`}
                style={{ zIndex: "100001" }}
              >
                <LoadScript
                  libraries={libraries}
                  googleMapsApiKey="AIzaSyB-eIfHtsnqsbc4oXdpYpjlheBiWWKjw4Q"
                >
                  <Autocomplete
                  className="md:hidden sm:hidden lg:block xl:block xs:block"
                  onLoad={(i) => setAutocomplete(i)}
                  onPlaceChanged={() => {
                    if (autocomplete) {
                      console.log(autocomplete.getPlace());
                      const coordinates: [number, number] = [
                        autocomplete.getPlace().geometry?.location.lat(),
                        autocomplete.getPlace().geometry?.location.lng(),
                      ];
                      setCoords(coordinates);
                    }
                  }}
                  >
                    <>
                      <input
                        type="text"
                        placeholder="Search"
                        className="placeholder:text-white font-bold text-base font-openSans pt-2 pb-2 pr-3 pl-3 transition-all bg-[#303030] focus:bg-[#454545]"
                        style={{
                          boxSizing: `border-box`,
                          border: `1px solid transparent`,
                          // width: `50vw`,
                          height: `auto`,
                          borderRadius: `5px`,
                          fontSize: `17.5px`,
                          outline: `none`,
                          textOverflow: `ellipses`,
                          // position: "absolute",
                          // left: "50%",
                          // marginLeft: "-25vw",
                          // transform:
                          //   dimensions.x < 750 ? `translateY(-32px)` : "",
                          zIndex: "100001",
                          color: "whitesmoke",
                          backdropFilter: "blur(15px)",
                        }}
                      />

                    </>
                  </Autocomplete>
                </LoadScript>
              </div>}
              {/* <button
                className="bg-[#303030] hover:bg-[#454545] rounded-[5px] z-[100001] mr-4 cursor-pointer h-min transition-all text-white font-bold text-base font-openSans"
                onClick={() => router.replace("/login")}
              >
                <div
                  className={`w-full h-min pt-2 pb-2 pr-5 pl-5 rounded-[5px]`}
                  data-animation="ripple"
                >
                  Login
                </div>
              </button> */}
            </div>
          </>
        )}
      </header>
    </>
  );
}
