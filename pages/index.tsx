import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import NotSupported from "../elements/modal";
import axios from "axios";
import generateSlug from "../utils/generateSlug";
import Details from "../elements/details";
import useMergeState from "../hooks/useMergeState";
import Head from "next/head";
import { useLoading } from "../hooks/useLoading";
import { useRecoilState } from "recoil";
import { coords } from "../state/coords";
import { autocomplete as autocompleteAtom } from "../state/autocomplete";
import { useRouter } from "next/router";

const libraries: any = ["places"];

// satellite on default

const containerStyle = (x: number) => ({
  width: "100vw",
  height: "calc(100vh - 6rem)",
  top: x < 750 ? "32px" : "0px",
  OverflowY: "visible !important",
  OverflowX: "hidden !important",
});

export default function Home() {
  const [loading, setLoading] = useLoading();
  const router = useRouter();
  const [map, setMap] = useState<any | null>();
  const [open, setOpen] = useState<boolean>(false);
  const [autocomplete, setAutocomplete] = useState<any>(null);
  const [getDetails, setGetDetails] = useState<boolean>(false);
  const [slug, setSlug] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(2);
  const [data, setData] = useMergeState<
    | null
    | {
        name: string;
        date: string;
        city: any;
        slug: string;
        phoneNumber: string;
        description: string;
        time: string;
        dateAndTime: string;
        email: string;
        location: string;
      }
    | {
        date: string;
        city: any;
        slug: string;
        time: string;
        dateAndTime: string;
        location: string;
      }
  >(null);
  const [dimensions, setDimensions] = useState({
    y: 0,
    x: 0,
  });

  useEffect(() => {
    if(router.pathname !== "/") {
      setGetDetails(false)
    }
  }, [router, router.pathname])

  useEffect(() => {
    if (!getDetails && data?.hasOwnProperty("name")) {
      console.log(getDetails, data, "sending request");
      axios
        .post(`${location.origin}/api/postIncident`, data)
        .then((i) => console.log(i));
    }
  }, [getDetails, data]);

  // const [value, setValue] = useState<any>("");
  const [[latitude, longitude], setCoords]: [
    [null | number, null | number],
    React.Dispatch<React.SetStateAction<[number, number] | [null, null]>>
  ] = useRecoilState(coords);
  const [center, setCenter]: [
    [null | number, null | number],
    React.Dispatch<React.SetStateAction<[number, number]>>
  ] = useState<[number, number] | [null, null]>([0, 0]);
  const onClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (i) => {
          setCoords([i.coords.latitude, i.coords.longitude]);
        },
        () => {
          setOpen(true);
        }
      );
    }
  };

  useEffect(() => {
    if (latitude && longitude) {
      setGetDetails(true);
    }
  }, [latitude, longitude]);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (longitude && latitude) {
      transitionZoom();
      const slug = generateSlug();
      let city = null;

      if (autocomplete?.getPlace()?.name) {
        city = autocomplete?.getPlace()?.name;
        setData({
          date: new Date().toLocaleDateString(),
          city: city,
          slug: slug,
          time: new Date().toLocaleTimeString(),
          dateAndTime: `${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}`,
          location: JSON.stringify([latitude, longitude]),
        });
        setSlug(slug);
      } else {
        var requestOptions = {
          method: "GET",
        };

        fetch(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=1318a3cb4a604b0ab740c44e7c45f782`,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            city = result.features[0].properties.city;

            setData({
              date: new Date().toLocaleDateString(),
              city: city,
              slug: slug,
              time: new Date().toLocaleTimeString(),
              dateAndTime: `${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}`,
              location: JSON.stringify([latitude, longitude]),
            });
            setSlug(slug);
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [longitude, latitude]);
  const transitionZoom = () => {
    setZoom(22);
    // setGetDetails(true)
  };
  // const switchLabelsOn = () => {
  //   setTimeout(() => {
  //     const labels: any = document.querySelector('#__next > main > div.mapContainer > div:nth-child(1) > div > div:nth-child(5) > div > div:nth-child(2) > ul > li')
  //     const button: any = document.getElementById('B906D274-922E-46AF-AF88-D44565363952')
  //     if(labels) {
  //       labels.click()
  //       // labels.blur()
  //     } else {
  //       console.log("button not found")
  //       switchLabelsOn()
  //     }
  //   }, 200)
  // }
  // useEffect(switchLabelsOn, [switchLabelsOn])

  if (typeof window !== undefined) {
    return (
      <>
        <main className="w-screen h-screen flex flex-col overflow-hidden">
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
            />
          </Head>
          <NotSupported open={open} setOpen={setOpen} />
          <Details
            open={getDetails}
            //  open={true}
            setOpen={setGetDetails}
            setData={setData}
            coordinates={{ x: latitude, y: longitude }}
            slug={slug}
            place={autocomplete?.getPlace()?.name ?? null}
          />
          <LoadScript
            libraries={libraries}
            googleMapsApiKey="AIzaSyB-eIfHtsnqsbc4oXdpYpjlheBiWWKjw4Q"
          >
            <GoogleMap
              mapContainerStyle={containerStyle(dimensions.x)}
              onLoad={(firstMap) => setMap(firstMap)}
              center={{
                lat: latitude ?? map?.getCenter()?.lat() ?? 0,
                lng: longitude ?? map?.getCenter()?.lng() ?? 0,
              }}
              zoom={zoom}
              mapTypeId="hybrid"
              mapContainerClassName="mapContainer"
              // options={{
              //   restriction: {
              //     latLngBounds: {
              //       north: 90, // Mumbai
              //       south: -90, // Pune
              //       west: -180,  // Mumbai
              //       east: 180,  // Pune
              //    },
              //    strictBounds: true,
              //   }
              // }}
              // extraMapTypes={["satellite"]}
            >
              {/* Child components, such as markers, info windows, etc. */}
              <div
                id="search"
                className={`w-screen h-max z-[9999999999]`}
                style={{ zIndex: 9999999999 }}
              >
                <Autocomplete
                  className="md:block sm:block lg:hidden xl:hidden xs:block w-auto h-auto"
                  onLoad={(i) => setAutocomplete(i)}
                  onPlaceChanged={() => {
                    console.log("auto complete", autocomplete);
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
                      className="placeholder:text-white transition-all bg-[#2f303894] focus:bg-[#2f3038b5] md:ml-[-25vw] sm:ml-[-25vw] lg:ml-[-50vw] xl:ml-[-50vw] xs:ml-[-50vw]"
                      style={{
                        boxSizing: `border-box`,
                        border: `1px solid transparent`,
                        width: `50vw`,
                        height: `50px`,
                        padding: `0 6px 0px 12px`,
                        borderRadius: `0px 0px 10px 10px`,
                        fontSize: `20px`,
                        outline: `none`,
                        textOverflow: `ellipses`,
                        position: "absolute",
                        left: "50%",
                        // marginLeft: "-25vw",
                        transform:
                          dimensions.x < 750 ? `translateY(-32px)` : "",
                        zIndex: "99",
                        color: "whitesmoke",
                        backdropFilter: "blur(15px)",
                      }}
                    />
                  </>
                </Autocomplete>
              </div>
              {longitude && latitude && (
                <Marker position={{ lat: latitude, lng: longitude }} />
              )}
              <button
                onClick={onClick}
                className="bg-[hsl(0,0%,15%)] xl:block lg:block md:block xs:hidden sm:hidden absolute pl-4 pr-4 pt-5 pb-5 hover:bg-[hsl(0,0%,25%)] rounded-[5px] transition-all text-white font-bold text-base font-openSans"
                style={{
                  left: "calc(50vw - 5.125rem)",
                  position: "absolute",
                  bottom: "16px"
                }}
              >
                Share my Location
              </button>
              <button
                onClick={onClick}
                className="bg-[hsl(0,0%,15%)] xl:hidden lg:hidden md:hidden xs:block sm:block absolute pl-4 pr-4 pt-3 pb-3 hover:bg-[hsl(0,0%,25%)] rounded-[5px] transition-all text-white font-bold text-base font-openSans"
                style={{
                  left: "calc(100vw - 2 * 5.125rem)",
                  position: "absolute",
                  top: "-32px"
                }}
              >
                Share my Location
              </button>
            </GoogleMap>
          </LoadScript>
        </main>
      </>
    );
  } else return <></>;
}

Home.title = `Firetag - Report an Incident`;
