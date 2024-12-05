import React from "react";
import styles from "./HomePage.module.scss";

const HomePage: React.FC = () => {
    return (
        <div className={styles.content}>
            <div className={styles.title}>
                <p>Выберите факультет</p>
            </div>
        </div>
    );
};

export default HomePage;
