/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
 */

import { useLatestCommit } from '../hooks';

export interface GitButtonProps {
    owner: string;
    repo: string;
    branch?: string;
    icon?: JSX.Element;
    newTab?: boolean;
    className?: string;
}

interface ButtonProps {
    href: string;
    icon?: JSX.Element;
    newTab?: boolean;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ href, icon, newTab, children, className }) => (
    <a
        href={href}
        target={newTab ? `_blank` : undefined}
        rel={newTab ? `noopener noreferrer` : undefined}
        className={className || 'btn btn-dark bg-ilefa-dark shine btn-icon mt-3 mb-sm-0 text-lowercase'}>
            <span className="btn-inner--icon">{icon || <i className="fab fa-github"></i>}</span>
            <span className="btn-inner--text font-weight-600">
                {children}
            </span>
    </a>
)

export const GitButton: React.FC<GitButtonProps> = ({ owner, repo, branch, icon, newTab, className }) => {
    const [commit, loading, error] = useLatestCommit(owner, repo, branch);
    return (
        <Button href={`https://github.com/${owner}/${repo}`} icon={icon} newTab={newTab} className={className}>
            @{owner}/{repo} ➔ {
                loading
                    ? <i className="fa fa-spinner fa-spin fa-fw"></i> 
                    : error
                        ? <span>no_git_id</span>
                        : <span>{commit!.shaShort}</span>
            }
        </Button>
    );
}