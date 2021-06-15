import { getRmpReport, RateMyProfessorReport } from '@ilefa/husky';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method && req.method !== 'GET')
        return res
            .status(405)
            .json({ message: 'Method not allowed' });

    let { rmpId } = req.query;
    if (rmpId instanceof Array)
        return res
            .status(400)
            .json({ message: 'Invalid professor payload' });

    if (!rmpId || !/[\d+,]/.test(rmpId))
        return res
            .status(400)
            .json({ message: 'Invalid professor ID' });

    let all = rmpId.split(',');
    if (all.length > 0) {
        let results = await Promise.all(all.map(id => getRmpReport(id)));

        // filter out null entries
        results = results.filter(ent => !!ent);

        let averageRating = sum(results.map(result => result.average));
        let averageTakeAgain = sum(results.map(result => result.takeAgain));
        let averageDifficulty = sum(results.map(result => result.difficulty));
        let totalRatings = sum(results.map(result => result.ratings));
        let tags = ([] as string[]).concat.apply([], results.map(result => result.tags));
        let master: RateMyProfessorReport = {
            name: results[0].name,
            average: averageRating,
            ratings: totalRatings,
            takeAgain: averageTakeAgain,
            difficulty: averageDifficulty,
            tags
        }

        return res
            .status(200)
            .json(master);
    }


    let result = await getRmpReport(rmpId);
    if (!result)
        return res
            .status(404)
            .json({ message: 'Professor not found' });

    return res
        .status(200)
        .json(result);
}

const sum = (arr: number[]) => arr
    .filter(ent => !isNaN(ent))
    .reduce((prev, cur) => cur + prev, 0)