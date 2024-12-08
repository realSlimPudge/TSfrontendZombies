import React from "react";
import styles from "./Disciplines.module.scss";

interface DisciplinesProps {
    children: React.ReactNode;
}

const Disciplines: React.FC<DisciplinesProps> = ({ children }) => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>{children}</div>
        </div>
    );
};

export default Disciplines;
