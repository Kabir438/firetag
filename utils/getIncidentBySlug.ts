import { Get, Index, Match } from "faunadb";
import { faunaClient as client } from "./db";

export default async function getIncidentsBySlug(slug: string) {
    try {
        const data: any = await client.query(
            Get(
                Match(
                    Index('slug'), 
                    slug
                )
            )
        )
        return data.data
    } catch(e) {
        return({
            false: JSON.stringify(e)
        })
    }
}