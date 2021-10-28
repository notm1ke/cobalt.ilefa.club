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
            onClick={() => copied && copyToClipboard()}
        >
            {children}
        </a>
    );
};