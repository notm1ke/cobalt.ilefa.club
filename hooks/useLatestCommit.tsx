import useSWR from 'swr';
import * as Logger from '../util/logger';

export type LatestCommitPayload = {
    commitSha: string;
    commitId: string;
    message: string;
    author: {
        name: string;
        email: string;
        date: string;
    }
}

export type LatestCommitResponse = {
    data: LatestCommitPayload | null;
    isLoading: boolean;
    isError: boolean;
}

export const useLatestCommit = (owner: string, repo: string, branch = 'master'): LatestCommitResponse => {

    const start = Date.now();
    const fetcher = (url: string) => fetch(url).then(r => r.json());
    const { data, error } = useSWR(`https://api.github.com/repos/${owner}/${repo}/commits/${branch}`, fetcher);

    if (!data && !error) {
        return {
            data: null,
            isLoading: true,
            isError: false
        }
    }

    if (error) {
        Logger.timings('useLatestCommit', 'Fetch', start, Logger.LogLevelColor.ERROR, 'failed in');
        Logger.debug('useLatestCommit', `The server responded with an unknown error.`, Logger.LogLevelColor.ERROR);
        
        return {
            data: null,
            isLoading: false,
            isError: true
        }
    }

    if (data && data.message) {
        Logger.timings('useLatestCommit', 'Fetch', start, Logger.LogLevelColor.ERROR, 'failed in');
        Logger.debug('useLatestCommit', `The server responded with: ${data?.message}`, Logger.LogLevelColor.ERROR);
        return {
            data: null,
            isLoading: false,
            isError: true
        }
    }

    Logger.timings('useLatestCommit', 'Fetch', start);
    Logger.debug('useLatestCommit', 'Server response:', undefined, undefined, data);

    return {
        data: {
            commitSha: data.sha,
            commitId: data.sha.substring(0, 7),
            message: data.commit.message,
            author: {
                name: data.commit.author.name,
                email: data.commit.author.email,
                date: data.commit.author.date
            }
        },
        isLoading: false,
        isError: false
    }

}