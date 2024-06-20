import { Map, Match, Paginate, Index, Lambda, Get, Var } from "faunadb";
import moment from "moment";
import { faunaClient as client } from "./db";


export default async function getIncidentsByDate() {
    try {
        const data: any = {};
        const today: any = client.query(
            Map(
                Paginate(
                    Match(Index('date'), moment().format("DD/MM/YYYY")), 
                    {size: 9999999999}
                ),
                Lambda("X", Get(Var("X")))
            )
        )
        const yesterday: any = client.query(
            Map(
                Paginate(
                    Match(Index('date'), moment().subtract(1, "days").format("DD/MM/YYYY")), {size: 9999999999}
                ),
              Lambda("X", Get(Var("X")))
            )
        )
        const yesterday2: any = client.query(
            Map(
                Paginate(
                    Match(Index('date'), moment().subtract(2, "days").format("DD/MM/YYYY")), {size: 9999999999}
                ),
              Lambda("X", Get(Var("X")))
            )
        )
        const yesterday3: any = client.query(
            Map(
                Paginate(
                    Match(Index('date'), moment().subtract(3, "days").format("DD/MM/YYYY")), {size: 9999999999}
                ),
              Lambda("X", Get(Var("X")))
            )
        )
        const yesterday4: any = client.query(
            Map(
                Paginate(
                    Match(Index('date'), moment().subtract(4, "days").format("DD/MM/YYYY")), {size: 9999999999}
                ),
              Lambda("X", Get(Var("X")))
            )
        )
        const vals = await Promise.all([today, yesterday, yesterday2, yesterday3, yesterday4]);
        [data[moment().format("DD/MM/YYYY")], data[moment().subtract(1, "days").format("DD/MM/YYYY")], data[moment().subtract(2, "days").format("DD/MM/YYYY")], data[moment().subtract(3, "days").format("DD/MM/YYYY")], data[moment().subtract(4, "days").format("DD/MM/YYYY")]] = vals.map(i => i.data);
        Object.keys(data).forEach((key) => {
            data[key] = data[key].map(i => i.data).length
        })
        return data
    } catch(e) {
        return({
            false: JSON.stringify(e)
        })
    }
}