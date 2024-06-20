import { NextApiRequest, NextApiResponse } from "next";
import q, { Collection, Update, Ref, Create } from "faunadb";
import { faunaClient as client } from "../../utils/db";

interface Data {
    slug: string;
    images: string;
}

export default async function addMedia(req: NextApiRequest, res: NextApiResponse) {
    const data: Data = req.body;
    const slug = data.slug;
    // console.log(data);
    try {
        const ress = await client.query(
            Create(
                Ref(Collection("media"), new Date().getTime()),
                {
                    data: {
                        media: JSON.parse(data.images),
                        slug: slug,
                    }
                }
            )
        )
        res.json({true: true})
    } catch(e) {
        res.status(400).json({
            false: false
        })
    }
}