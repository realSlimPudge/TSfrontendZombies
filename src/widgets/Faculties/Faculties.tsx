import React from "react";
import FacultyCard from "../../shared/FacultyCard/FacultyCard";
import styles from "./Faculties.module.scss";

interface FacultiesProps {
    children: React.ReactNode;
}

const Faculties: React.FC<FacultiesProps> = ({ children }) => {
    return (
        <div className={styles.content}>
            <h2 className={styles.title}>Выберите факультет:</h2>
            <div className={styles.grid}>{children}</div>
        </div>
    );
};

export default Faculties;
