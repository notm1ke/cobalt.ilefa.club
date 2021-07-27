import { NextApiRequest, NextApiResponse } from 'next';
import { getRmpReport, RateMyProfessorReport } from '@ilefa/husky';
import { capitalizeFirst, sum, TimedRequest } from '../../../util';

type RmpResponse = RateMyProfessorReport & TimedRequest & {
    mostRelevant: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method && req.method !== 'GET')
        return res
            .status(405)
            .json({ message: 'Method not allowed' });

    let start = Date.now();
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
        let modified = results
            .map((ent, i) => ({
                ...ent,
                id: all[i]
            }))
            .filter(ent => !!ent)
            .filter(ent => !isNaN(ent.ratings));

        let mostRelevant = modified.sort((a, b) => b.ratings - a.ratings)[0].id;
        let averageRating = getWeightedAverage(modified);
        let averageTakeAgain = sum(modified.map(result => result.takeAgain)) / modified.length;
        let averageDifficulty = sum(modified.map(result => result.difficulty)) / modified.length;
        let totalRatings = sum(modified.map(result => result.ratings));
        let tags = ([] as string[]).concat.apply([], modified.map(result => result.tags));

        let master: RmpResponse = {
            name: modified[0].name,
            average: averageRating,
            ratings: totalRatings,
            takeAgain: averageTakeAgain,
            difficulty: averageDifficulty,
            tags: [...new Set(tags.map(tag => capitalizeFirst(tag.toLowerCase())))],
            mostRelevant: mostRelevant,
            timings: Date.now() - start
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

    let complete: RmpResponse = {
        ...result,
        mostRelevant: rmpId,
        timings: Date.now() - start
    }

    return res
        .status(200)
        .json(complete);
}

const getWeightedAverage = (reports: RateMyProfessorReport[]) => {
    let mapped = reports.map(report => ({ average: report.average, ratings: report.ratings }));
    let total = mapped.reduce((prev, cur) => prev + cur.ratings, 0);
    let average = mapped.reduce((prev, cur) => prev + cur.average * cur.ratings, 0) / total;
    return average;
}