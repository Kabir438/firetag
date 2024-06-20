import { Get, Index, Lambda, Match, Paginate, Var, Map } from "faunadb";
import { faunaClient as client } from "./db";

export default async function postIncident() {
    // const data: Data = JSON.parse(JSON.stringify(req.query));
    try {
        const toSend: any = await client.query(
            Map(Paginate(Match(Index("all")), {size: 9999999999}), Lambda("X", Get(Var("X"))))
        )
        // console.log(toSend.data);
        return (toSend.data.reverse().filter((_, i) => i < 6 ? true : false).map(i => i.data))
    } catch(e) {
        return ({
            false: JSON.stringify(e)
        })
    }
}