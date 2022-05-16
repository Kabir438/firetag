import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { Incidents } from "../../interfaces";
import Image from "next/image";
import Carousel from "../../components";
import getIncidentsBySlug from "../../utils/getIncidentBySlug";

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
  const res = await getIncidentsBySlug(String(context.query.slug))
  
  return {
    props: {
      data: res ?? {},
    },
  };
}

export default function View({
  data: { name, date, location, slug, description, email, phoneNumber, city },
}: {
  data: {
    name: string;
    date: string;
    location: string;
    slug: string;
    description: string;
    email: string;
    phoneNumber: string;
    city: string
  };
}) {
  return (
    <>
      <main className="bg-[#161c24] pt-28 w-screen min-h-screen p-16">
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
            <a target="_blank" rel="noreferrer" href={`http://www.google.com/maps/place/${JSON.parse(location)[0]},${JSON.parse(location)[1]}`}>
            <div className="inline-block text-2xl text-[#0686fd] cursor-pointer hover:text-[#0648fd] active:text-[#032480] transition-all">
                {`http://www.google.com/maps/place/${JSON.parse(location)[0]},${JSON.parse(location)[1]}`}
            </div>
            </a>
            <br />
            <br />
            <h3 className="text-2xl text-white inline-block">Phone Number: </h3>
            <div className="w-5 h-5 inline-block"></div>
            <a href={`tel:${phoneNumber}`}
            className="text-2xl text-[#0686fd] cursor-pointer hover:text-[#0648fd] active:text-[#032480] transition-all"
            >{phoneNumber}</a>
            <br /><br />
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
            <h3 className="text-2xl text-white">Description: </h3>
            <br />
            <p className="text-lg text-white">
            {description}
            </p>
            <br />
            <h3 className="text-2xl text-white">Media: </h3>
            <br />
        </div>
        <Carousel></Carousel>
      </main>
    </>
  );
}
