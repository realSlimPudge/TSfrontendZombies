import React, { useState, useEffect } from "react";
import styles from "./ThemesSwitcher.module.scss";

const ThemesSwitcher: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            setIsDarkMode(true);
            document.body.classList.add("dark-theme");
        } else if (savedTheme === "light") {
            setIsDarkMode(false);
            document.body.classList.add("light-theme");
        }
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        if (isDarkMode) {
            document.body.classList.remove("dark-theme");
            document.body.classList.add("light-theme");
            localStorage.setItem("theme", "light");
        } else {
            document.body.classList.remove("light-theme");
            document.body.classList.add("dark-theme");
            localStorage.setItem("theme", "dark");
        }
    };

    return (
        <button onClick={toggleTheme} className={styles.content}>
            {isDarkMode ? "Light theme" : "Dark Theme"}
        </button>
    );
};

export default ThemesSwitcher;
