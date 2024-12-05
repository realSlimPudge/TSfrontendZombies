import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import ThemesSwitcher from "../../../processes/ThemeSwitcher/ThemesSwitcher";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const headerVisible = () => {
        setTimeout(() => {
            setIsVisible(true);
        }, 0);
    };

    useEffect(() => {
        headerVisible();
    }, []);

    return (
        <header
            className={`${styles.container} ${isVisible ? styles.visible : ""}`}
        >
            <div className={styles.content}>
                <Link to="/" className={styles.logo}>
                    PlanEdu
                </Link>
                <div className={styles.buttons}>
                    <ThemesSwitcher />
                    <div>Выйти</div>
                </div>
            </div>
        </header>
    );
};

export default Header;
