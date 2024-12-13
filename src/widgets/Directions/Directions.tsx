import React from "react";
import styles from "../Faculties/Faculties.module.scss";

interface DirectionsProps {
    children: React.ReactNode;
}

const Directions: React.FC<DirectionsProps> = ({ children }) => {
    return (
        <div className={styles.content}>
            <h2 className={styles.title}>Выберите направления:</h2>
            <div className={styles.grid}>{children}</div>
        </div>
    );
};

export default Directions;
