import { NextApiRequest, NextApiResponse } from "next";
import { Get, Index, Lambda, Match, Map, Paginate, Ref, Var } from "faunadb";
import { faunaClient as client } from "./db";

export default async function getIncidentsByPlace() {
    // const data: Data = JSON.parse(JSON.stringify(req.query));
    try {
        const data: any = await client.query(
            Map(
                Paginate(
                    Match(Index('all'))
                ),
                Lambda("X", Get(Var("X")))
            )
        )
        const dateStrings = data.data.map(i => i.data).map(i => i.city)
        const dateObject = {};
        dateStrings.forEach(element => {
            if(dateObject[element]) {
                dateObject[element] += 1;
            } else {
                dateObject[element] = 1;
            }
        });
        return dateObject
    } catch(e) {
        return({
            false: JSON.stringify(e)
        })
    }
}