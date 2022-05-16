import { NextApiRequest, NextApiResponse } from "next";
import q, { Collection, Create, Ref } from "faunadb";
import { faunaClient as client } from "../../utils/db";

interface Data {
    name: string;
    date: string;
    city: string;
    slug: string;
    phoneNumber: string;
    description?: string;
    time: string;
    email: string;
    location: {
        lat: number;
        lng: number;
    }
}

export default async function postIncident(req: NextApiRequest, res: NextApiResponse) {
    const data: Data = JSON.parse(JSON.stringify(req.body));
    console.log(data);
    try {
        await client.query(
            Create(
                Ref(Collection("co-ordinates"), (new Date()).getTime()),
                { 
                    data: {
                        ...data,
                        dateAndTime: `${data.date}, ${data.time}`
                    }
                }
            )
        )
        res.json({true: true})
    } catch {
        res.json({
            false: false
        })
    }
}