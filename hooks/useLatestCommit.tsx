import { ApiResponseType, createRemoteHook, UnshapedApiResponse } from '../util';

export type LatestCommitPayload = UnshapedApiResponse & {
    sha: string;
    shaShort: string;
    commit: {
        message: string;
        author: {
            name: string;
            email: string;
            date: string;
        }
    }
}

export type LatestCommitResponse = [
    LatestCommitPayload | null,
    boolean,
    boolean,
]

export const useLatestCommit = (owner: string, repo: string, branch = 'master'): LatestCommitResponse =>
    createRemoteHook<LatestCommitPayload, LatestCommitResponse>('LatestCommit', `https://api.github.com/repos/${owner}/${repo}/commits/${branch}`,
        (type, data, _err, _url) => {
            switch (type) {
                case ApiResponseType.ERROR:
                    return [null, false, true];
                case ApiResponseType.LOADING:
                    return [null, true, false];
                case ApiResponseType.SUCCESS: {
                    let res = data!;
                    let response: LatestCommitPayload = {
                        sha: res.sha,
                        shaShort: res.sha.substring(0, 7),
                        commit: {
                            message: res.commit.message,
                            author: {
                                name: res.commit.author.name,
                                email: res.commit.author.email,
                                date: res.commit.author.date
                            }
                        }
                    }

                    return [response, false, false];
                }
            }
        });