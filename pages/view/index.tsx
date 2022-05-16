import Link from "next/link"
import { Incidents } from "../../interfaces";
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip, BarChart, Bar, CartesianGrid, LineChart, Line, XAxis, YAxis } from "recharts";
import colors from "../../utils/colors";
import router from "next/router";
import getIncidentsByDate from "../../utils/getIncidentsByDate";
import getIncidentsByPlace from "../../utils/getIncidentsByPlace";
import getRecentIncidents from "../../utils/getRecentIncidents";
import { useRef, useState } from "react";

export async function getServerSideProps() {
    const [ byDate, byPlace, recentIncidents ] = await Promise.all([getIncidentsByDate(), getIncidentsByPlace(), getRecentIncidents()]);
    return {
        props: {
            byDate,
            byPlace,
            recentIncidents
        }
    }
}
interface Props {
    byDate: {
        [key: string]: number;
    };
    byPlace: {
        [key: string]: number;
    };
    recentIncidents: Incidents
}

export default function View({
    byDate,
    byPlace,
    recentIncidents
}: Props) {
    console.log(byDate, byPlace, recentIncidents)
    async function refresh() {
        const res = await fetch("http://localhost:3000/api/refresh")
        const data = await res.json();
        return(data) 
    }


    const [graphData, setGraphData] = useState(Object.keys(byPlace).map((key, index) => {
            return {
                value: Object.values(byPlace)[index],
                name: key
            }
    }))
    console.log(graphData)
    const [barGraphData, setBarGraphData] = useState(Object.keys(byDate).map((key, index) => {
        return {
            Incidents: Object.values(byDate)[index],
            date: key
        }
    }).reverse())

    const [data, setData] = useState(recentIncidents)
    return (
        <main className="w-full pt-28 p-4 pl-12 flex flex-col lg:flex-row xl:flex-row 2xl:flex-row md:flex-row md:items-start sm:items-center items-start min-h-screen justify-evenly bg-[#161c24]">
            <div id="main-table" className="w-[40%] flex justify-start items-center flex-col">
                <h2 className="w-[28rem] text-white text-center text-xl font-bold">Incidents/Reports</h2>
                <br />
                <div className="rounded-xl border-2 border-slate-500">
                    <table className="rounded-xl border-collapse overflow-hidden border-2 border-slate-500 text-white w-[28rem]">
                        <thead className="bg-[#6018e752]">
                            <tr>
                                <th className="border-2 border-slate-500 w-56 text-center" colSpan={2}>Time</th>
                                <th className="border-2 border-slate-500 w-28 h-[35px] text-center">Location</th>
                                <th className="border-2 border-slate-500 w-28 h-[35px] text-center">Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((row, index) => (
                                    <Link passHref key={`row-${index}`} href={`view/${row.slug}`}>
                                        <tr className="cursor-pointer transition-all hover:bg-[#02448677]">
                                            <td className="border-2 border-slate-500 w-56 text-center" colSpan={2}>{row.dateAndTime}</td>
                                            <td className="border-2 border-slate-500 w-28 h-[35px] text-center">{row.city}</td>
                                            <td className="border-2 border-slate-500 w-28 h-[35px] text-center">{row.name}</td>
                                        </tr>
                                    </Link>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <br />
                <div id="bottom-right">
                    <h2 className="w-full text-center text-xl text-white font-bold">Trends</h2>
                    <br />
                        <PieChart
                            width={600}
                            height={400}
                        >
                            <Tooltip content={(arg) => {
                                return <div className="bg-[#ffffff50] pt-2 pb-2 pl-3 pr-3 rounded-lg" style={{backdropFilter: "blue(10px)"}}>
                                    {arg.payload[0] ? `${Math.round((Number(arg.payload[0].value)/graphData.map((i) => i.value).reduce((i1, i2) => i1+i2))*100)}%` :  ""}
                                </div>
                            }}/>
                            <Pie data={graphData} dataKey="value" nameKey="name" label={({name}) => name} fill="#8884d8" labelLine>
                                {
                                    graphData.map((graph, index) => (
                                        <Cell 
                                            // onMouseOver={(e) => {console.log("mouse over"); e.target.style.filter = "saturate(10px)"}} 
                                            key={`cell-${index}`} 
                                            fill={colors[index]}
                                            className={`hover:saturate-150 transition-[filter] cursor-pointer`}
                                            onClick={() => router.push(`/location/${graph.name}`)}
                                        ></Cell>
                                    ))
                                }
                            </Pie>
                        </PieChart>
                </div>
            </div>
            <div id="right-table" className="w-[40%] flex justify-center items-center flex-col">
                <div id="top-right">
                    <h2 className="w-[28rem] text-center text-xl text-white font-bold">Trends</h2>
                    <br />
                    <div  className="rounded-xl border-2 border-slate-500">
                        <table className="rounded-xl border-collapse overflow-hidden border-2 text-white border-slate-500 w-[28rem]">
                            <thead className="bg-[#6018e752]">
                                <tr>
                                    <th className="border-2 border-slate-500 w-28 h-[35px] text-center">Location</th>
                                    <th className="border-2 border-slate-500 w-28 h-[35px] text-center">No. of reports</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    graphData.map((row, index) => (
                                        <Link key={`row-${index}`} href={`/location/${row.name}`} passHref>
                                            <tr className="hover:bg-[#02448677] transition-all cursor-pointer">
                                                <td className="border-2 border-slate-500 w-28 h-[35px] text-center">{row.name}</td>
                                                <td className="border-2 border-slate-500 w-28 h-[35px] text-center">{row.value}</td>
                                            </tr>
                                        </Link>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div id="bottom-right">
                    <br />
                    <h2 className="w-full text-center text-xl text-white font-bold">Uttarakhand Trends</h2>
                    <div id="bar-graph">
                            <LineChart width={600} height={400} data={barGraphData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip 
                                    content={(arg) => {
                                        return (
                                            <div className="h-[80px] rounded-2xl bg-[#3b83f67e] p-4 flex flex-col justify-around text-white">
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
                                        )
                                    }}
                                />
                                <Line data={barGraphData} type="linear" dataKey={`Incidents`}  stroke="#00e1ff">
                                    
                                </Line>
                            </LineChart>
                    </div>
                </div>
            </div>
        </main>
        // <h1></h1>
    )
}