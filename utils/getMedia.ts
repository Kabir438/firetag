import { Get, Index, Lambda, Match, Paginate, Var, Map } from "faunadb";
import { faunaClient as client } from "./db";

export default async function getMedia(slug: string) {
    // const data: Data = JSON.parse(JSON.stringify(req.query));
    try {
        const res = await client.query(
            Paginate(Match(Index("getMedia"), slug))
        )
        return (res)
    } catch(e) {
        return ({
            false: JSON.stringify(e)
        })
    }
}