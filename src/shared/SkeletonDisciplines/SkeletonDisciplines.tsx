import React from "react";
import styles from "./SkeletonDisciplines.module.scss";
import DisciplinesItem from "../DisciplinesItem/DisciplinesItem";

const SkeletonDisciplines: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.sorting}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className={styles.disciplines}>
                    <DisciplinesItem />
                    <DisciplinesItem />
                    <DisciplinesItem />
                    <DisciplinesItem />
                    <DisciplinesItem />
                    <DisciplinesItem />
                </div>
            </div>
        </div>
    );
};

export default SkeletonDisciplines;
