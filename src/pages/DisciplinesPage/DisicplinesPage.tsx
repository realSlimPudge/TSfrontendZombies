import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Discipline,
    getDisciplines,
} from "../../shared/slices/disciplinesSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../shared/store/store";
import Disciplines from "../../widgets/Disciplines/Disciplines";
import DisciplinesItem from "../../shared/DisciplinesItem/DisciplinesItem";
import styles from "./Disciplines.module.scss";

const DisciplinesPage: React.FC = () => {
    const { faculty, direction } = useParams<{
        faculty: string;
        direction: string;
    }>();
    const dispatch = useDispatch();
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // Локальное состояние сортировки
    const [api, setApi] = useState<string>("");
    const {
        data: disciplines,
        loading,
        error,
    } = useSelector((state: RootState) => state.disciplines);

    //Создание api
    useEffect(() => {
        if (direction) {
            setApi(direction.toUpperCase());
        }
    }, [direction]);

    useEffect(() => {
        if (api) {
            dispatch(getDisciplines(api));
        }
    }, [api, dispatch]);

    // Функции сортировки
    const handleAsc = () => {
        setSortOrder("asc");
    };

    const handleDesc = () => {
        setSortOrder("desc");
    };

    // Сортировка дисциплин в реальном времени
    const sortedDisciplines =
        disciplines?.slice().sort((a, b) => {
            const courseA = parseInt(a.course);
            const courseB = parseInt(b.course);
            return sortOrder === "asc" ? courseA - courseB : courseB - courseA;
        }) || [];

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>{faculty}</h1>
            <h2>{direction}</h2>
            <div className={styles.list}>
                <div className={styles.sorting}>
                    <div className={styles.content}>
                        {sortOrder === "desc" ? (
                            <button onClick={handleAsc}>
                                Курс: от большего к меньшему
                            </button>
                        ) : (
                            <button onClick={handleDesc}>
                                Курс: от меньшего к большему
                            </button>
                        )}
                    </div>
                </div>
                <Disciplines>
                    {sortedDisciplines.map((el: Discipline, i: number) => (
                        <DisciplinesItem key={i} info={el} />
                    ))}
                </Disciplines>
            </div>
        </div>
    );
};

export default DisciplinesPage;
