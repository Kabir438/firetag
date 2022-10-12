import moment from "moment";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import getIncidentsByLocation from "../../utils/getIncidentsByLocation";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const city =
    String(context.query.slug)?.charAt(0).toUpperCase() +
    String(context.query.slug)?.slice(1);

  const [res, location] = await getIncidentsByLocation(city);
  console.log([res, location]);
  // console.log("res", res)
  return {
    props: {
      data: res,
      location: location,
    },
  };
}

export default function Location({
  data,
  location,
}: {
  data: [string, number][];
  location: string;
}) {
  const sortedData = data
    .sort((a, b) => {
      return (
        moment(a[0], "DD/MM/YYYY").toDate().getDate() -
        moment(b[0], "DD/MM/YYYY").toDate().getDate()
      );
    })
    .map((i) => ({
      date: i[0].replace("/2022", ""),
      incidents: i[1],
    }));

  // console.log(sortedData)

  const [dimensions, setDimensions] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    setDimensions({
      x: window.innerWidth,
      y: window.innerHeight,
    });
    window.addEventListener("resize", () => {
      setDimensions({
        x: window.innerWidth,
        y: window.innerHeight,
      });
    });
  }, []);
  console.log(sortedData);

  return (
    <>
    <Head>
      <title>{location} Statistics</title>
    </Head>
      <main className="w-screen h-screen flex-col overflow-hidden bg-[#161c24] flex items-center justify-center">
        <h2 className="text-white text-3xl mb-4">{`${location} Statistics`}</h2>
        {
          sortedData.length === 1
          ?
          <h2 className="text-white text-3xl mb-4">{`${sortedData[0].incidents} incident${sortedData[0].incidents === 1 ? "" : "s"} occured on ${sortedData[0].date}/22`}</h2>
          :
          <LineChart
            width={dimensions.x * 0.95}
            height={dimensions.y * 0.75}
            data={sortedData}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
              content={(arg) => {
                return (
                  <div className="h-[80px] rounded-2xl bg-[#61718b6f] p-4 flex flex-col justify-around text-white">
                    <div>
                      <span>Date:</span>
                      <div className="inline-block h-2 w-2"></div>
                      <span>{arg.payload[0]?.payload.date}/2022</span>
                    </div>
                    <div>
                      <span>Incidents:</span>
                      <div className="inline-block h-2 w-2"></div>
                      <span>{arg.payload[0]?.payload.incidents}</span>
                    </div>
                  </div>
                );
              }}
            />
            <Line
              type="monotone"
              data={sortedData}
              dataKey={`incidents`}
              stroke="rgb(229, 331, 235)"
            ></Line>
          </LineChart>
        }
      </main>
    </>
  );
}
