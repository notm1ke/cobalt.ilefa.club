import axios from 'axios';

import {
    NextApiRequest,
    NextApiResponse
} from 'next';

import {
    Dorm,
    DormHallRmdIds,
    DormHallType,
    DormRatings,
    DormsByType,
    getEnumKeyByEnumValue,
    RATE_MY_DORMS_ID
} from '../../util';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method && req.method !== 'GET')
        return res
            .status(405)
            .json({ message: 'Method not allowed' });

    let dorms = await axios
        .get(process.env.DORMS_TARGET!)
        .then(res => res.data)
        .then(res => res as Dorm[])
        .catch(_ => null);

    if (!dorms) return res
        .status(502)
        .json({ message: 'Bad Gateway' });

    dorms = dorms.map(dorm => ({
        ...dorm,
        type: Object
            .keys(DormsByType)
            .filter(hall => (DormsByType[hall] as DormHallType[])
                .some(hall => dorm.hall === getEnumKeyByEnumValue(DormHallType, hall)))[0] as keyof typeof DormsByType
    }));

    if (req.query.type) {
        let { type } = req.query;
        if (type instanceof Array)
            return res
                .status(400)
                .json({ message: 'Invalid target type' });

        let validated = type as string;
        let rmdKey = DormHallRmdIds[validated.toUpperCase()];
        if (!rmdKey)
            return res
                .status(200)
                .json({ ...dorms.find(data => data.hall.toLowerCase() === validated.toLowerCase()) });
        
        let ratings = await axios
            .get(`https://us-central1-rate-my-dorm.cloudfunctions.net/api/getDormInfo?dormID=${rmdKey}&schoolID=${RATE_MY_DORMS_ID}`)
            .then(res => res.data)
            .then(res => res as DormRatings)
            .catch(_ => null);

        // since east is stupid and dumb and has multiple entries on RMD we need to make multiple requests >_<
        // grab all data for east (EAST_CAMPUS_N) and then concat + avg it with the ratings var
        // if (validated === 'EAST_CAMPUS')

        if (!ratings)
            return res
                .status(200)
                .json({ ...dorms.find(data => data.hall.toLowerCase() === validated.toLowerCase()) });

        return res
            .status(200)
            .json({
                ...dorms.find(data => data.hall.toLowerCase() === validated.toLowerCase()),
                ratings,
            });
    }

    return res
        .status(200)
        .json({
            halls: Object.keys(DormHallType),
            dorms
        });
}