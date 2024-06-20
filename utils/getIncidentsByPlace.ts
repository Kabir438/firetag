import { NextApiRequest, NextApiResponse } from "next";
import { Get, Index, Lambda, Match, Map, Paginate, Ref, Var } from "faunadb";
import { faunaClient as client } from "./db";

export default async function getIncidentsByPlace() {
    // const data: Data = JSON.parse(JSON.stringify(req.query));
    try {
        const data: any = await client.query(
            Paginate(
                Match(Index('place')), { size: 9999999999 }
            )
        )
        const dateStrings = data.data
        const dateObject = {};
        // console.log(data.data, 19)
        dateStrings.forEach(element => {
            if(dateObject[element]) {
                dateObject[element] += 1;
            } else {
                dateObject[element] = 1;
            }
        });
        console.log(dateObject, 26)
        return dateObject
    } catch(e) {
        return({
            false: JSON.stringify(e)
        })
    }
}