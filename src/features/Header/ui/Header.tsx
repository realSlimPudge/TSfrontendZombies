import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import ThemesSwitcher from "../../../processes/ThemeSwitcher/ThemesSwitcher";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../shared/store/store";

const Header: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const currentFaculty = useSelector(
        (state: RootState) => state.faculties.currentFaculty?.title
    );

    const currentDirection = useSelector(
        (state: RootState) => state.faculties.currentDirection?.name
    );

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
                {currentFaculty ? (
                    <div>
                        {currentDirection ? (
                            <>
                                {currentFaculty}
                                <span> | </span>
                                {currentDirection}
                            </>
                        ) : (
                            currentFaculty
                        )}
                    </div>
                ) : (
                    "Выберите направление"
                )}
                {/* {currentFaculty ? currentFaculty : "Выберите факультет"}
                {currentDirection ? currentDirection : "Выберите направление"} */}
                <div className={styles.buttons}>
                    <ThemesSwitcher />
                    <div>Выйти</div>
                </div>
            </div>
        </header>
    );
};

export default Header;
