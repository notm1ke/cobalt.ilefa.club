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

import { useState } from 'react';

export interface CopyButton {
    contentToCopy: string;
    className?: string;
    href?: string;
    shine?: boolean;
    cooldown?: number;
    onCopied: () => void;
    onCopyRecharged: () => void;
}

export const CopyButton: React.FC<CopyButton> = ({ contentToCopy, className, href, shine, cooldown, onCopied, onCopyRecharged, children }) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(contentToCopy);
        setCopied(true);
        onCopied();
        setTimeout(() => {
            setCopied(false);
            onCopyRecharged();
        }, cooldown || 1000);
    }

    return (
        <a
            href={href}
            className={className ? `${className}${shine ? ' shine' : ''}` : shine ? 'shine' : ''} 
            onClick={() => !copied && copyToClipboard()}
        >
            {children}
        </a>
    );
}