import styles from '@/styles/components/Navbar.module.css'
import { useState, useEffect } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link'

export default function Header() {

    const { user, error, isLoading } = useUser();
    console.log(user)

    // SCRIPTS
    const [navOpen, setNavOpen] = useState(false);
    const [pageSize, setPageSize] = useState(0);
    
    const toggleNav = () => {
        setNavOpen(!navOpen)
    }

    useEffect(() => {
        // Open close or ignore nav
        let navClass = document.querySelector(`.${styles.navListContainer}`)
        if(navOpen && window.innerWidth < 768) {
            // navClass.style.height = 'auto'
            navClass.classList.add(`${styles.navListContainerOpen}`);
            console.log('nav opened')
        } else if(!navOpen && window.innerWidth < 768) {
            // document.querySelector(`.navListContainer`).style.height = '0'
            navClass.classList.remove(`${styles.navListContainerOpen}`);
            console.log('nav closed')
        } else {
            // document.querySelector(`.navListContainer`).style.height = 'auto'
            navClass.classList.remove(`${styles.navListContainerOpen}`);
        }

        // Manage page resize state
        window.addEventListener('resize', handleResize)
        function handleResize() {
            setPageSize(window.innerWidth);
        }
        console.log(pageSize);
    }, [navOpen, pageSize]);

    return (
        <header className={`${styles.header}`}>
            <nav className={`${styles.nav} container`}>
                <div>
                    {/* LOGO */}
                    <Link className={styles.logoLink} href='../'>
                        <img className={styles.logo} src="/brand/wordmark.svg" alt="Post301 Logo Icon"/>
                    </Link>
                </div>
                <div className={styles.navToggleContainer}>
                    {/* NAV TOGGLE */}
                    <button className={styles.navToggle} onClick={toggleNav}>&#9776;</button>
                </div>
                <div className={`${styles.navListContainer} navListContainer`}>
                    {/* NAVIGATION */}
                    <ul className={styles.navList}>
                        <li className={styles.navItem}>
                            <Link className={styles.navLink} href="/">HOME</Link>
                        </li>
                        {user ? (
                            <>
                                <li className={styles.navItem}>
                                    <Link className={styles.navLink} href="/dashboard">DASHBOARD</Link>
                                </li>
                                <li className={styles.navItem}>
                                    <Link className={styles.navLink} href="/shop">SHOP</Link>
                                </li>
                                <li className={styles.navItem}>
                                    <Link className={styles.navLink} href="/api/auth/logout">LOGOUT</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className={styles.navItem}>
                                    <Link className={styles.navButton} href="/api/auth/login">LOGIN/SIGNUP</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
        </header>
    )
}