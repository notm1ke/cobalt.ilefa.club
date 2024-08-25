/*
 * Copyright (c) 2024 ILEFA Labs
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
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