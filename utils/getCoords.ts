import { NextApiRequest, NextApiResponse } from "next";
import { Get, Index, Lambda, Match, Map, Paginate, Ref, Var } from "faunadb";
import { faunaClient as client } from "./db";

export default async function getCoords() {
    // const data: Data = JSON.parse(JSON.stringify(req.query));
    try {
        const data: any = await client.query(
            Paginate(
                Match(
                    Index('coords')
                ),
                {
                    size: 9999999999
                }
            )
        )
        console.log(data)
        return data
    } catch(e) {
        return({
            false: JSON.stringify(e)
        })
    }
}