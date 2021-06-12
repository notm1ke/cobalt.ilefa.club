import Link from 'next/link';
import styles from './styling/footer.module.css';

import {
    Col,
    Container,
    Nav,
    NavItem,
    NavLink,
    Row,
} from 'reactstrap';

export interface FooterProps {
    white?: boolean;
    noBackground?: boolean;
}

export const Footer = ({ white, noBackground } : FooterProps) => {
    return (
        <footer className={`footer${white ? noBackground ? '' : ' ' : ''}`}>
            <Container className="container-lg">
                <Row className="align-items-center justify-content-md-between">
                    <Col md="6" sm="6">
                        <div className={`copyright ${styles.footerBrand} ${white ? " text-white" : ""}`}>  
                            <Link href="/">
                                <a className={`${white ? "text-white" : ""} shine`}>
                                    <b>ILEFA Labs</b>
                                </a>
                            </Link> © 2020-{new Date().getFullYear()}{" "}
                        </div>
                    </Col>
                    <Col md="6" sm="6">
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
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}