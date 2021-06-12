import Link from 'next/link';
import Image from 'next/image';
import styles from './styling/nav.module.css';

const elements = [
    {
        name: 'home',
        icon: 'fa fa-home',
        href: '/',
        key: 'home'
    },
    {
        name: 'projects',
        icon: 'fa fa-layer-group',
        href: '/projects',
        key: 'projects'
    }
];

export const Nav = () => {
    return (
        <header className="header-global">
            <nav id="navbar-main" className="navbar-main navbar-transparent navbar-light navbar navbar-expand-lg">
                <div className="container">
                    <Link href="/">
                        <a className={`mr-lg-1 navbar-brand ${styles.navBrandText}`}>
                            <Image
                                src="/logo.png"
                                alt="ILEFA Labs"
                                width={400}
                                height={400}
                                className={`img img-fluid ${styles.navBrandImg}`}
                            />
                        </a>
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar_global" aria-controls="navbar_global" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse" id="navbar_global">
                        <div className="navbar-collapse-header">
                            <div className="row">
                                <div className="col-6 collapse-brand">
                                    <a href="/" className="navbar-collapse-title text-success">
                                        ILEFA Labs
                                    </a>
                                </div>
                                <div className="col-6 collapse-close">
                                    <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbar_global" aria-controls="navbar_global" aria-expanded="false" aria-label="Toggle navigation">
                                        <span></span>
                                        <span></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <ul className="navbar-nav align-items-lg-center ml-lg-auto navbar-nav">
                            {
                                elements.map(element => 
                                    <li className="nav-item" key={element.key}>
                                        <Link href={element.href}>
                                            <a className={`nav-link ${styles.navLink}`}>
                                                <i className={`${element.icon} fa-fw`}></i>
                                            </a>
                                        </Link>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}