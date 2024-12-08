import React from "react";
import styles from "./DisciplinesItem.module.scss";
import { Discipline } from "../slices/disciplinesSlice";

interface DisciplinesItem {
    info: Discipline;
}

const DisciplinesItem: React.FC<DisciplinesItem> = ({ info }) => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.title}>
                    <p>{info.name}</p>
                </div>
                <div className={styles.info}>
                    <span>Курс: {info.course}</span>
                    <span>Семестр: {info.semester}</span>
                </div>
            </div>
        </div>
    );
};

export default DisciplinesItem;
