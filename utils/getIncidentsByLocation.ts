import { Get, Index, Match, Map, Paginate, Var, Lambda } from "faunadb";
import { faunaClient as client } from "./db";
import moment from "moment"
import getUniqueElements from "./getUniqueElements";

const DAY_IN_MS = 24 * 60 * 60 * 1000
const dateRange = (startDate: Date, numOfDays: number) => {
    const startDateInMs = startDate.getTime()
    return Array.from(Array(numOfDays).keys()).map(i => new Date(startDateInMs + i * DAY_IN_MS).toISOString().slice(0,10))
}

export default async function getIncidentsByLocation(location: string): Promise<[[string, number][], string]> {
    try {
        const data: any = await client.query(
            Map(
                Paginate(
                    Match(Index('city'), location)
                ),
                Lambda("X", Get(Var("X")))
            )
        )
        console.log(data)
        const dates = data.data.map(i => i.data).map(i => (i.date));

        const formatedDates = {};

        dates.map(i => {
            if(formatedDates[i]) {
                formatedDates[i] += 1;
            } else {
                formatedDates[i] = 1;
            }
        })

        const realFormattedDates: [Date, number][] = Object.keys(formatedDates).map(i => {
            const temp: number = formatedDates[i];
            const date = moment(i, "DD/MM/YYYY").toDate();
            return([date, temp])
        })
        
        if(realFormattedDates.length === 1) {
            return [realFormattedDates.map(i => [i[0].toLocaleDateString().replaceAll("/2022", ""), i[1]]), location]
        }
        // const s: [[string, number][], string] = [[realFormattedDates[0], [realFormattedDates[1]]], location]

        const firstDate = realFormattedDates[1][0];

        const numberOfDates = realFormattedDates.at(-1)[0].getUTCDate() - realFormattedDates[1][0].getUTCDate() + 2;

        const allDates = dateRange(firstDate, numberOfDates)

        const realValuedDates = realFormattedDates.map(i => i[0]);

        const uniqueValues: [Date, number][] = getUniqueElements(allDates, realValuedDates.map(i => moment(i).format("YYYY-MM-DD"))).map(i => [i, 0]);

        // console.log(realFormattedDates, "realFormattedDates");

        // console.log(uniqueValues.map(i => [moment(i[0], "YYYY-MM-DD").toDate(), i[1]]), "uniqueValues");

        const stringUniqueValues: [Date, number][] = uniqueValues.map(i => ([moment(i[0], "YYYY-MM-DD").toDate(), i[1]]))

        const res: [string, number][] = (stringUniqueValues).concat(realFormattedDates).map(i => [i[0].toLocaleDateString(), i[1]]);

        // console.log("return", res)
        return ([res, location])
    } catch(e) {
        console.error(e)
        return ([[["", 0]], ""])
    }
}