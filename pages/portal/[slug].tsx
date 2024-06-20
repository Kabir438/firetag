import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { Incidents } from "../../interfaces";
import Image from "next/image";
import Carousel from "../../components";
import getIncidentsBySlug from "../../utils/getIncidentBySlug";
import getMedia from "../../utils/getMedia";
import Head from "next/head";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// const data: Incidents = [
//   {
//     name: "Kabir Chawla",
//     date: new Date().toLocaleString(),
//     dateAndTime: new Date().toLocaleString(),
//     location: "Dehradun",
//     slug: "/hbgiedsvkd",
//     description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus blanditiis, officiis rem rerum illo dolor omnis quos? Quis nostrum corrupti alias saepe? Praesentium optio ratione, dolorem voluptas facere nobis, non ipsum, magni sapiente quibusdam doloremque minima libero repellendus placeat. Placeat, illum omnis nesciunt ullam mollitia molestiae corrupti odio. Sed, laboriosam?",
//     phoneNumber: "+91 7814463368",
//     email: "kabieeeer@gmail.com",
//     city: "Dehradun",
//     time: new Date().toLocaleTimeString()
//   },
//   {
//     name: "Mridul Jain",
//     date: new Date().toLocaleString(),
//     dateAndTime: new Date().toLocaleString(),
//     location: "Yamunotri",
//     slug: "/hbgiejervkd",
//     description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus blanditiis, officiis rem rerum illo dolor omnis quos? Quis nostrum corrupti alias saepe? Praesentium optio ratione, dolorem voluptas facere nobis, non ipsum, magni sapiente quibusdam doloremque minima libero repellendus placeat. Placeat, illum omnis nesciunt ullam mollitia molestiae corrupti odio. Sed, laboriosam?",
//     phoneNumber: "+91 7814463368",
//     email: "kabieeeer@gmail.com",
//     city: "Dehradun",
//     time: new Date().toLocaleTimeString()
//   },
//   {
//     name: "Sambvit Singh",
//     date: new Date().toLocaleString(),
//     dateAndTime: new Date().toLocaleString(),
//     location: "Kanatal",
//     slug: "/hbgiejvfkd",
//     description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus blanditiis, officiis rem rerum illo dolor omnis quos? Quis nostrum corrupti alias saepe? Praesentium optio ratione, dolorem voluptas facere nobis, non ipsum, magni sapiente quibusdam doloremque minima libero repellendus placeat. Placeat, illum omnis nesciunt ullam mollitia molestiae corrupti odio. Sed, laboriosam?",
//     phoneNumber: "+91 7814463368",
//     email: "kabieeeer@gmail.com",
//     city: "Dehradun",
//     time: new Date().toLocaleTimeString()
//   },
//   {
//     name: "Vidit Agarwall",
//     date: new Date().toLocaleString(),
//     dateAndTime: new Date().toLocaleString(),
//     location: "Sahastradhara",
//     slug: "/hbgiejkokd",
//     description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus blanditiis, officiis rem rerum illo dolor omnis quos? Quis nostrum corrupti alias saepe? Praesentium optio ratione, dolorem voluptas facere nobis, non ipsum, magni sapiente quibusdam doloremque minima libero repellendus placeat. Placeat, illum omnis nesciunt ullam mollitia molestiae corrupti odio. Sed, laboriosam?",
//     phoneNumber: "+91 7814463368",
//     email: "kabieeeer@gmail.com",
//     city: "Dehradun",
//     time: new Date().toLocaleTimeString()
//   },
// ];

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res = await getIncidentsBySlug(String(context.query.slug));
  const media: any = await getMedia(String(context.query.slug));
  console.log(media);
  return {
    props: {
      data: res ?? {},
      media: media.data.length ? media.data : null,
    },
  };
}

export default function Slug({
  data: { name, date, location, slug, description, email, phoneNumber, city },
  media,
}: {
  data: {
    name: string;
    date: string;
    location: string;
    slug: string;
    description: string;
    email: string;
    phoneNumber: string;
    city: string;
  };
  media: null | string[];
}) {
  return (
    <>
      <Head>
        <title>
          Report in {city} by {name}
        </title>
      </Head>
      <main className="bg-[#181819] pt-28 w-screen min-h-screen p-16">
        <div className="pl-12 pr-12">
          <h2 className="text-5xl text-center text-white">Incident Report</h2>
          <br />
          <h3 className="text-2xl text-white">Time of Report: {date}</h3>
          <br />
          <h3 className="text-2xl text-white inline-block">Name: {name}</h3>
          <br />
          <br />
          <h3 className="text-2xl text-white inline-block">City: </h3>
          {/* space */}
          <div className="h-3 w-3 inline-block"></div>
          <Link passHref href={`/location/${location}`}>
            <div className="inline-block text-2xl text-[#0686fd] cursor-pointer hover:text-[#0648fd] active:text-[#032480] transition-all">
              {city}
            </div>
          </Link>
          <br />
          <br />
          <h3 className="text-2xl text-white inline-block">Location: </h3>
          {/* space */}
          <div className="h-3 w-3 inline-block"></div>
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.google.com/maps/place/${
              JSON.parse(location)[0]
            },${JSON.parse(location)[1]}`}
          >
            <div
              className="inline-block text-2xl text-[#0686fd] cursor-pointer hover:text-[#0648fd] active:text-[#032480] transition-all max-w-full"
              style={{ wordWrap: "break-word" }}
            >
              {`https://www.google.com/maps/place/${JSON.parse(location)[0]},${
                JSON.parse(location)[1]
              }`}
            </div>
          </a>
          <br />
          <br />
          <h3 className="text-2xl text-white inline-block">Phone Number: </h3>
          <div className="w-5 h-5 inline-block"></div>
          <a
            href={`tel:${phoneNumber}`}
            className="text-2xl text-[#0686fd] cursor-pointer hover:text-[#0648fd] active:text-[#032480] transition-all"
          >
            {phoneNumber}
          </a>
          <br />
          <br />
          <h3 className="text-2xl text-white inline-block">Email ID: </h3>
          <div className="h-3 w-3 inline-block"></div>
          <a
            href={`mailto:${email}`}
            className="text-2xl text-[#0686fd] hover:text-[#0648fd] active:text-[#032480] transition-all inline-block"
          >
            {email}
          </a>
          <br />
          <br />
          <h3 className="text-2xl text-white text-left">Description: </h3>
          <br />
          <br />
          <p className="text-lg text-white">{description}</p>
          <br />
          <LoadScript
            googleMapsApiKey={`AIzaSyB-eIfHtsnqsbc4oXdpYpjlheBiWWKjw4Q`}
          >
            <GoogleMap
              mapContainerStyle={{
                width: "70%",
                height: "calc(80vh - 94px)",
                margin: "0px 15%",
                borderRadius: "15px",
              }}
              center={{
                lat: JSON.parse(location)[0],
                lng: JSON.parse(location)[1],
              }}
              zoom={19}
              mapTypeId="hybrid"
            >
              <Marker
                position={{
                  lat: JSON.parse(location)[0],
                  lng: JSON.parse(location)[1],
                }}
              />
            </GoogleMap>
          </LoadScript>
          {media && (
            <>
              <h3 className="text-2xl text-white">Media: </h3>
              <br />
            </>
          )}
        </div>
        {media && <Carousel images={media}></Carousel>}
      </main>
    </>
  );
}
