import React, { Component, useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
  useLoadScript,
} from "@react-google-maps/api";
import NotSupported from "../elements/modal";
import axios from "axios";
import generateSlug from "../utils/generateSlug";

// satellite on default

const containerStyle = {
  width: "100vw",
  height: "calc(100vh - 6rem)",
};

export default function Home() {
  const [open, setOpen] = useState<boolean>(false);
  // const [value, setValue] = useState<any>("");
  const [[latitude, longitude], setCoords]: [
    [null | number, null | number],
    React.Dispatch<React.SetStateAction<[number, number] | [null, null]>>
  ] = useState<[number, number] | [null, null]>([null, null]);
  const onClick = () => {
    console.log("click");
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
  // const handleSelect: (address: string, placeID: string) => void = (e) => {
  //   // get
  // }
  interface Data {
    name: string;
    date: string;
    city: string;
    slug: string;
    phoneNumber: string;
    description?: string;
    time: string;
    email: string;
    location: {
      lat: number;
      lng: number;
    };
  }
  useEffect(() => {
    if (longitude && latitude) {
      axios
        .get(
          `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=4f6fc656674d7a9052acc9f5d254b392`
        )
        .then((i) => {
          console.log(i.data[0].name);
          axios.post(`http://localhost:3000/api/postIncident`, {
            name: "Kabir Chawla",
            date: new Date().toLocaleDateString(),
            city: i.data[0].name,
            slug: generateSlug(),
            phoneNumber: `1234567890`,
            description: "Lorem ipsum dolor sit amet, consectetur",
            time: new Date().toLocaleTimeString(),
            dateAndTime: `${new Date().toLocaleTimeString()}, ${new Date().toLocaleDateString()}`,
            email: "kabieeeer@gmail.com",
            location: JSON.stringify([latitude, longitude]),
            // name=Kabir%20Chawla&date=${new Date().toLocaleDateString()}&city=Dehradun&slug=asdfghjkl&phoneNumber=1234567890&description=Lorem%20ipsum%20dolor%20sit%20amet&time=20:30:11&email=kabieeeer@gmail.com&location=${JSON.stringify([latitude, longitude])}
          });
        });
    }
  }, [longitude, latitude]);
  if (typeof window !== undefined) {
    return (
      <main className="w-screen h-screen flex flex-col">
        <NotSupported open={open} setOpen={setOpen} />
        <LoadScript
          libraries={["places"]}
          googleMapsApiKey="AIzaSyBqLfqHgU-hMDHhorIB_t7xPleMpT9scqo"
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{
              lat: latitude ? latitude : 1,
              lng: longitude ? longitude : 1,
            }}
            zoom={longitude && latitude ? 24 : 2}
          >
            {/* Child components, such as markers, info windows, etc. */}
            <div id="search" className="w-screen h-8 z-[9999999999]">
              <Autocomplete
                onLoad={(i) => console.log(i, i.getPlace())}
                onPlaceChanged={() => {
                  console.log();
                }}
              >
                <input
                  type="text"
                  placeholder="Search"
                  style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `50vw`,
                    height: `32px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    outline: `none`,
                    textOverflow: `ellipses`,
                    position: "absolute",
                    left: "50%",
                    marginLeft: "-25vw"
                  }}
                />
              </Autocomplete>
            </div>
            {longitude && latitude && (
              <Marker position={{ lat: latitude, lng: longitude }} />
            )}
            <button
              onClick={onClick}
              className="bg-[#00a3ac] absolute pl-2 pr-2 pt-3 pb-3 bottom-6 hover:bg-[#035f7b] rounded-[8px] transition-all text-white font-bold text-base" style={{left: "calc(50vw - 5.125rem)"}}
            >
              Share my Location
            </button>
          </GoogleMap>
        </LoadScript>
      </main>
    );
  } else return <></>;
}
