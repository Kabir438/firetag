import Link from "next/link";
import { Incidents } from "../../interfaces";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
  LineChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";
import colors from "../../utils/colors";
import router from "next/router";
import getIncidentsByDate from "../../utils/getIncidentsByDate";
import getIncidentsByPlace from "../../utils/getIncidentsByPlace";
import getRecentIncidents from "../../utils/getRecentIncidents";
import { useEffect, useRef, useState } from "react";
import reduceData from "../../utils/reduceData";

const modelGraphData = (d: { [key: string]: number }) => {
  return Object.keys(d)
    .map((key, index) => {
      return {
        value: Object.values(d)[index],
        name: key,
      };
    })
    .reverse();
};

export async function getServerSideProps() {
  const [byDate, byPlace, recentIncidents]: any[] = await Promise.all([
    getIncidentsByDate(),
    getIncidentsByPlace(),
    getRecentIncidents(),
  ]);
  const reducedData = reduceData(byPlace);
  console.log({
    byDate,
    byPlace,
    recentIncidents,
    reducedData,
  });
  return {
    props: {
      byDate,
      byPlace,
      recentIncidents,
      reducedData,
    },
  };
}
interface Props {
  byDate: {
    [key: string]: number;
  };
  byPlace: {
    [key: string]: number;
  };
  reducedData: {
    [key: string]: number;
  };
  recentIncidents: Incidents;
}

export default function Portal({
  byDate,
  byPlace,
  recentIncidents,
  reducedData,
}: Props) {
  console.log(byPlace);
  // console.log(byDate, byPlace, recentIncidents);
  const [dimensions, setDimensions] = useState({
    y: 0,
    x: 0,
  });

  console.log(recentIncidents);

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

  async function refresh() {
    const res = await fetch(`${location.origin}/api/refresh`);
    const data = await res.json();
    return data;
  }

  const graphData = Object.keys(byPlace)
    .map((key, index) => {
      return {
        value: Object.values(byPlace)[index],
        name: key,
      };
    })
    .sort((a, b) => {
      return a.value - b.value;
    });

  const reducedGraphData =
    typeof Object !== "undefined"
      ? Object.keys(reducedData)
          .map((key, index) => {
            return {
              value: Object.values(reducedData)[index],
              name: key,
            };
          })
          .sort((a, b) => {
            return b.value - a.value;
          })
      : null;

  // const reducedData = reduceData(byPlace)
  // const reducedGraphData = Object.keys(reducedData).map((key, index) => {
  //     return {
  //         value: Object.values(reducedData)[index],
  //         name: key
  //     }
  // })
  // console.log(graphData)
  const [barGraphData, setBarGraphData] = useState(
    Object.keys(byDate)
      .map((key, index) => {
        return {
          Incidents: Object.values(byDate)[index],
          date: key,
        };
      })
      .reverse()
  );
  console.log(graphData);
  console.log("byDate", byDate);
  const [data, setData] = useState(recentIncidents);
  return (
    <>
      <button
        onClick={() => router.push("/portal/map")}
        className="bg-[#c3c3c3] font-openSans text-xl hover:bg-[#9e9e9e] text-black w-full p-4 pt-2 pb-2 mt-[6rem] rounded-b-[5px] transition-all font-bold"
        // className="bg-[#c3c3c3] font-openSans text-xl hover:bg-[#9e9e9e] text-black w-1/2 p-4 pt-2 pb-2 rounded-[5px] transition-all font-bold" style={{width: "100%"}}
      >
        View Map{" "}
      </button>
      <main
        className={`w-full p-4 overflow-x-hidden overflow-y-scroll pl-4 flex items-start min-h-screen justify-evenly bg-[hsl(0,0%,8%)] ${
          dimensions.x < 1150 ? "flex-col items-center" : "flex-row"
        } ${dimensions.x < 600 ? "pt-[500px] relative h-[1100px]" : ""}`}
      >
        <div
          id="main-table"
          className={`w-[40%] flex justify-start items-center flex-col ${
            dimensions.x < 600 ? "scale-[0.7] relative -top-[110px]" : ""
          }`}
        >
          <h2 className="w-[28rem] text-white text-center text-xl font-bold">
            Incidents/Reports
          </h2>
          <br />
          <div className="rounded-xl border-2 border-slate-500 h-max overflow-y-scroll">
            <table className="rounded-xl border-collapse border-slate-500 text-white w-[28rem]">
              <thead className="sticky -top-[2px] bg-[#161c24]">
                <tr className="bg-[#a5a5a552]">
                  <th
                    className="border-2 border-l-0 border-t-0 border-slate-500 w-56 text-center"
                    colSpan={2}
                  >
                    Time
                  </th>
                  <th className="border-2 border-t-0 border-slate-500 w-28 h-[35px] text-center">
                    Location
                  </th>
                  <th className="border-2 border-r-0 border-t-0 border-slate-500 w-28 h-[35px] text-center">
                    Name
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map &&
                  data.map((row, index) => (
                    <Link
                      passHref
                      key={`row-${index}`}
                      href={`portal/${row.slug}`}
                    >
                      <tr className="cursor-pointer transition-all hover:bg-[#90bdee32]">
                        <td
                          className={`border-2 border-l-0 border-slate-500 w-56 text-center ${
                            data.length - 1 === index ? "border-b-0" : ""
                          }`}
                          colSpan={2}
                        >
                          {row.dateAndTime}
                        </td>
                        <td
                          className={`border-2 border-slate-500 w-28 h-[35px] text-center ${
                            data.length - 1 === index ? "border-b-0" : ""
                          }`}
                        >
                          {row.city}
                        </td>
                        <td
                          className={`border-2 border-r-0 border-slate-500 w-28 h-[35px] text-center ${
                            data.length - 1 === index ? "border-b-0" : ""
                          }`}
                        >
                          {row.name}
                        </td>
                      </tr>
                    </Link>
                  ))}
              </tbody>
            </table>
          </div>
          <br />
          <div id="bottom-right">
            <h2 className="w-full text-center text-xl text-white font-bold">
              Trends
            </h2>
            <br />
            {reducedGraphData && (
              <PieChart width={600} height={400} style={{
                overflowX: "hidden"
              }}>
                <Tooltip
                  content={(arg) => {
                    return (
                      <div
                        className="bg-[#ffffff50] pt-2 pb-2 pl-3 pr-3 rounded-lg"
                        style={{ backdropFilter: "blue(10px)" }}
                      >
                        {arg.payload[0]
                          ? `${Math.round(
                              (Number(arg.payload[0].value) /
                                graphData
                                  .map((i) => i.value)
                                  .reduce((i1, i2) => i1 + i2)) *
                                100
                            )}%`
                          : ""}
                      </div>
                    );
                  }}
                />
                <Pie
                  data={reducedGraphData}
                  dataKey="value"
                  nameKey="name"
                  label={({ name }) => name}
                  fill="#8884d8"
                  labelLine
                >
                  {reducedGraphData.map((graph, index) => (
                    <Cell
                      // onMouseOver={(e) => {console.log("mouse over"); e.target.style.filter = "saturate(10px)"}}
                      key={`cell-${index}`}
                      fill={colors[index]}
                      className={`hover:saturate-150 transition-all opacity-[0.75] cursor-pointer`}
                      onClick={() => router.push(`/location/${graph.name}`)}
                    ></Cell>
                  ))}
                </Pie>
              </PieChart>
            )}
          </div>
        </div>
        <div
          id="right-table"
          className={`min-w-[40%] max-w-[100vw] w-[600px] flex justify-center items-center flex-col ${
            dimensions.x < 600 ? "scale-[0.7] relative -top-[290px]" : ""
          }`}
        >
          <div id="top-right">
            <h2 className="w-[28rem] text-center text-xl text-white font-bold">
              Trends
            </h2>
            <br />
            <div className="rounded-xl border-2 border-slate-500 h-[280px] overflow-y-scroll">
              <table className="rounded-xl border-collapse text-white border-slate-500 w-[28rem] overflow-visible">
                <thead className="w-[28rem] sticky -top-[2px] bg-[#161c24]">
                  <tr className="h-[35px] w-[28rem] bg-[#a5a5a552]">
                    <th className="border-2 border-l-0 border-t-0 border-slate-500 w-[14rem] h-[35px] text-center">
                      Location
                    </th>
                    <th className="border-2 border-r-0 border-t-0 border-slate-500 w-[14rem] h-[35px] text-center">
                      No. of reports
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reducedGraphData.map((row, index) => (
                    <Link
                      key={`row-${index}`}
                      href={`/location/${row.name}`}
                      passHref
                    >
                      <tr className="hover:bg-[#90bdee32] transition-all cursor-pointer">
                        <td
                          className={`border-2 border-l-0 border-slate-500 capitalize w-28 h-[35px] text-center ${
                            reducedGraphData.length - 1 === index
                              ? "border-b-0"
                              : ""
                          }`}
                        >
                          {row.name}
                        </td>
                        <td
                          className={`border-2 border-r-0 border-slate-500 w-28 h-[35px] text-center ${
                            reducedGraphData.length - 1 === index
                              ? "border-b-0"
                              : ""
                          }`}
                        >
                          {row.value}
                        </td>
                      </tr>
                    </Link>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div id="bottom-right">
            <br />
            <h2 className="w-full text-center text-xl text-white font-bold">
              Uttarakhand Trends
            </h2>
            <div
              id="bar-graph"
              className={`${dimensions.x < 700 ? "scale-95" : ""} ${
                dimensions.x < 615 ? "scale-90" : ""
              }  ${dimensions.x < 510 ? "scale-[0.85]" : ""}   ${
                dimensions.x < 475 ? "scale-[0.8]" : ""
              } relative right-8`}
            >
              <LineChart width={600} height={400} data={barGraphData}>
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
                          <span>{arg.payload[0]?.payload.date}</span>
                        </div>
                        <div>
                          <span>Incidents:</span>
                          <div className="inline-block h-2 w-2"></div>
                          <span>{arg.payload[0]?.payload.Incidents}</span>
                        </div>
                      </div>
                    );
                  }}
                />
                <Line
                  data={barGraphData}
                  type="monotoneX"
                  dataKey={`Incidents`}
                  stroke="rgb(229, 331, 235)"
                ></Line>
              </LineChart>
            </div>
          </div>
        </div>
      </main>
    </>
    // <h1></h1>
  );
}

Portal.title = `Firetag - View statistics`;
