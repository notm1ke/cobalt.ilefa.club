/*
 * Copyright (c) 2020-2022 ILEFA Labs
 * All Rights Reserved.
 * 
 * Cobalt in it's entirety is proprietary property owned and maintained by ILEFA Labs.
 * Under no circumstances should any should code, assets, resources, or other materials
 * herein be transmitted, replicated, or otherwise released, in part, or in whole, to any
 * persons or organizations without the full and explicit permission of ILEFA Labs.
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
    };

    return (
        <a
            href={href}
            className={className ? `${className}${shine ? ' shine' : ''}` : shine ? 'shine' : ''} 
            onClick={() => !copied && copyToClipboard()}
        >
            {children}
        </a>
    );
};