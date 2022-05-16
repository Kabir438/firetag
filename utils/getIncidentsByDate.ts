import { Map, Match, Paginate, Index, Lambda, Get, Var } from "faunadb";
import { faunaClient as client } from "./db";


export default async function getIncidentsByDate() {
    try {
        const data: any = {};
        const today: any = client.query(
            Map(
                Paginate(
                    Match(Index('date'), (new Date()).toLocaleDateString())
                ),
                Lambda("X", Get(Var("X")))
            )
        )
        const yesterday: any = client.query(
            Map(
                Paginate(
                Match(Index('date'), (new Date((new Date()).valueOf() - 1000*60*60*24)).toLocaleDateString())
              ),
              Lambda("X", Get(Var("X")))
            )
        )
        const yesterday2: any = client.query(
            Map(
                Paginate(
                Match(Index('date'), (new Date((new Date()).valueOf() - 2000*60*60*24)).toLocaleDateString())
              ),
              Lambda("X", Get(Var("X")))
            )
        )
        const yesterday3: any = client.query(
            Map(
                Paginate(
                Match(Index('date'), (new Date((new Date()).valueOf() - 3000*60*60*24)).toLocaleDateString())
              ),
              Lambda("X", Get(Var("X")))
            )
        )
        const yesterday4: any = client.query(
            Map(
                Paginate(
                Match(Index('date'), (new Date((new Date()).valueOf() - 4000*60*60*24)).toLocaleDateString())
              ),
              Lambda("X", Get(Var("X")))
            )
        )
        const vals = await Promise.all([today, yesterday, yesterday2, yesterday3, yesterday4]);
        [data[(new Date()).toLocaleDateString()], data[(new Date((new Date()).valueOf() - 1000*60*60*24)).toLocaleDateString()], data[(new Date((new Date()).valueOf() - 2000*60*60*24)).toLocaleDateString()], data[(new Date((new Date()).valueOf() - 3000*60*60*24)).toLocaleDateString()], data[(new Date((new Date()).valueOf() - 4000*60*60*24)).toLocaleDateString()]] = vals.map(i => i.data);
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