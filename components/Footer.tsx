import Link from 'next/link';
import styles from './styling/footer.module.css';

import { capitalizeFirst } from '../util';
import { COMMIT_HASH } from '../util/build';
import { DevElement, PreviewElement, ProdElement } from '.';

import {
    Container,
    Nav,
    NavItem,
    NavLink,
    Row,
} from 'reactstrap';

export interface FooterProps {
    white?: boolean;
    noBackground?: boolean;
    className?: string;
}

export const Footer: React.FC<FooterProps> = ({ white, noBackground, className }) => (
    <footer className={`footer ${className ?? ''} ${white ? noBackground ? '' : ' ' : ''}`}>
        <Container className="container-lg">
            <Row className="align-items-center justify-content-md-between">
                <div className="col-8">
                    <div className={`copyright ${styles.footerBrand} ${white ? " text-white" : ""}`}>  
                        <a href="https://www.ilefa.club" className={`${white ? "text-white" : ""} shine`}>
                            <b>ILEFA Labs</b>
                        </a>
                        {" "} © 2020-{new Date().getFullYear()}{" "}
                        <DevElement>
                            <br />
                            <Link href="/internal">
                                <a className={`text-primary-light ${styles.envWarning} shine`}>Cobalt {capitalizeFirst(process.env.NEXT_PUBLIC_VERCEL_ENV || '')} {COMMIT_HASH?.substring(0, 7) || 'no_git_id'} - internal use only.</a>
                            </Link>
                        </DevElement>
                        
                        <PreviewElement>
                            <br />
                            <Link href="/preview">
                                <a className={`text-primary-light ${styles.envWarning} shine`}>Cobalt Preview {COMMIT_HASH?.substring(0, 7) || 'no_git_id'} <i className="fa fa-hands-helping fa-fw"></i></a>
                            </Link>
                        </PreviewElement>

                        <ProdElement>
                            <br />
                            <Link href="/">
                                <a className={`text-primary-light ${styles.envWarning} shine`}><b>The Cobalt Project</b> (4.0, {COMMIT_HASH?.substring(0, 7) ?? 'no_git_id'}, stable)</a>
                            </Link>
                        </ProdElement>
                    </div>
                </div>
                <div className="col-4 ml--2">
                    <Nav className="nav-footer justify-content-end">
                        <NavItem>
                            <NavLink
                                className="nav-link-icon footer-icon"
                                href='https://github.com/ilefa'
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className={"fab fa-github fa-fw" + (white ? " text-white" : "")} />
                            </NavLink>
                        </NavItem>
                    </Nav>
                </div>
            </Row>
        </Container>
    </footer>
);