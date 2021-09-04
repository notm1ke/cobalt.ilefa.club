import styles from './styling/info.module.css';

export interface InlineLinkProps {
    display: string | JSX.Element;
    href: string;
    classes?: string;
    newTab?: boolean;
}

export const InlineLink: React.FC<InlineLinkProps> = ({ display, href, classes, newTab }) =>
    <a
        href={href}
        className={`text-light ${styles.infoLink} shine ${classes}`}
        target={newTab ? '_blank' : undefined}
        rel={newTab ? 'noopener noreferrer' : undefined}>
            {display}
    </a>;