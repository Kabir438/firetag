import { NextApiRequest, NextApiResponse } from "next";
import getIncidentsByDate from "../../utils/getIncidentsByDate";
import getIncidentsByPlace from "../../utils/getIncidentsByPlace";
import getRecentIncidents from "../../utils/getRecentIncidents"

export default async function Refresh(req: NextApiRequest, res: NextApiResponse) {
    try {
        const all = await Promise.all([getIncidentsByDate(), getIncidentsByPlace(), getRecentIncidents()]);
        res.json(all);
    } catch {
        res.json({
            false: false
        })
    }
}