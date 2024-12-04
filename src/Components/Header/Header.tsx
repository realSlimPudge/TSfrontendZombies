import React from 'react';
import {Link} from 'react-router-dom';
import { useState,useEffect } from 'react';
import styles from './Header.module.scss'
const Header: React.FC = () => {
    const [mounted, setMounted] = useState(false);


    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <header className = {styles.Header}>
            <nav className= {styles.Nav}>
                <Link to = '/' className={styles.Logo}>
                PlanEDU 
                </Link>
                <Link to = '/' className={styles.Logo}>
                Выйти
                </Link>
            </nav>
        </header>
    )
}

export default Header;
