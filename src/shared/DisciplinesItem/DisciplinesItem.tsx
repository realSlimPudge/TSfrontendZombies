import React from "react";
import styles from "./DisciplinesItem.module.scss";
import { Discipline } from "../slices/disciplinesSlice";

interface DisciplinesItem {
    info?: Discipline;
}

const DisciplinesItem: React.FC<DisciplinesItem> = ({ info }) => {
    if (!info) {
        return (
            <div className={styles.container__skeleton}>
                <div className={styles.content} style={{ height: 38 }}>
                    <div className={styles.title}></div>
                    <div className={styles.info}></div>
                </div>
            </div>
        );
    }

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
