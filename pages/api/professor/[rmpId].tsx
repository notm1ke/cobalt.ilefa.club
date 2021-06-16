import { NextApiRequest, NextApiResponse } from 'next';
import { getRmpReport, RateMyProfessorReport } from '@ilefa/husky';

type RmpResponse = RateMyProfessorReport & {
    mostRelevent: string;
}

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
        let modified = results
            .map((ent, i) => ({
                ...ent,
                id: all[i]
            }))
            .filter(ent => !!ent)
            .filter(ent => !isNaN(ent.ratings));

        // TODO: weight the ratings/take again/difficulty based on total ratings of that entry
        // TODO: this is because if one person rates the prof at 5/5, and another entry has
        // TODO: 44 ratings at 1/5, it will definitely skew the results from the real value
        // TODO: and be misinforming on the professors section of the course inspection page
        
        let mostRelevent = modified.sort((a, b) => b.ratings - a.ratings)[0].id;
        let averageRating = sum(modified.map(result => result.average)) / modified.length;
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
            mostRelevent,
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
        mostRelevent: rmpId
    }

    return res
        .status(200)
        .json(complete);
}

const sum = (arr: number[]) => arr
    .filter(ent => !isNaN(ent))
    .reduce((prev, cur) => cur + prev, 0);

export const capitalizeFirst = (input: string) => input
    .split(' ')
    .map(str => str.charAt(0).toUpperCase() + str.slice(1))
    .join(' ');