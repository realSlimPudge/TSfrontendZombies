import React, { useEffect, useRef, useState } from "react";
import styles from "./HomePage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getFaculties } from "../../../shared/slices/facultiesSlice";
import { AppDispatch, RootState } from "../../../shared/store/store";
import FacultyCard from "../../../shared/FacultyCard/FacultyCard";
import Faculties from "../../../widgets/Faculties/Faculties";
import Directions from "../../../widgets/Directions/Directions";
import { Faculty } from "../../../shared/slices/facultiesSlice";
import { Direction } from "../../../shared/slices/facultiesSlice";
import DirectionCard from "../../../shared/DirectionCard/DirectionCard";
import DisciplineBtn from "../../../processes/DisciplineBtn/DisciplineBtn";

const HomePage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const faculties = useSelector((state: RootState) => state.faculties.data);
    const currentFaculty = useSelector(
        (state: RootState) => state.faculties.currentFaculty
    );
    const currentDirection = useSelector(
        (state: RootState) => state.faculties.currentDirection
    );

    useEffect(() => {
        if (!faculties) {
            dispatch(getFaculties());
        }
    }, [dispatch, faculties]);

    console.log(faculties);

    //Пропс на api

    const [api, setApi] = useState<string>("");
    useEffect(() => {
        if (currentDirection && currentFaculty) {
            const facultyTitle = currentFaculty?.title
                .toLowerCase()
                .replace(/\s+/g, "+");
            const directionName = currentDirection.name
                .toLowerCase()
                .replace(/\s+/g, "+");
            setApi(`${facultyTitle}/${directionName}`);
        }
    }, [currentFaculty, currentDirection]);

    //Стилизация

    const [offset, setOffset] = useState<number>(0);
    const btnRef = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    useEffect(() => {
        if (currentDirection) {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 300);
            return () => clearTimeout(timer);
        } else {
            setIsVisible(false);
            setOffset(0);
        }
    }, [currentDirection]);

    useEffect(() => {
        if (isVisible && btnRef.current) {
            const btnHeight = btnRef.current.offsetHeight || 0;
            setOffset(btnHeight / 2);
        }
    }, [isVisible]);

    const [showDirections, setShowDirections] = useState<boolean>(false);

    useEffect(() => {
        if (currentFaculty) {
            setShowDirections(true);
        } else {
            setShowDirections(false);
        }
    }, [currentFaculty]);

    return (
        <div className={styles.container}>
            <div
                className={styles.content}
                style={{ transform: `translateY(-${offset}px)` }}
            >
                <div className={styles.flex}>
                    <Faculties>
                        {faculties &&
                            faculties.map((el: Faculty, i: number) => (
                                <FacultyCard
                                    key={i}
                                    title={el.title}
                                    info={el}
                                />
                            ))}
                    </Faculties>

                    {/* <div
                        className={`${styles.direction} ${
                            showDirections ? styles.directionVisible : ""
                        }`}
                    > */}
                    {currentFaculty && (
                        <Directions>
                            {currentFaculty.directions.map(
                                (el: Direction, i: number) => (
                                    <DirectionCard key={i} title={el.name} />
                                )
                            )}
                        </Directions>
                    )}
                    {/* </div> */}
                </div>
                <div
                    className={`${styles.btn} ${
                        isVisible ? styles.visible : ""
                    }`}
                    ref={btnRef}
                >
                    {isVisible && currentDirection && (
                        <DisciplineBtn api={api}>
                            <span className={styles.span}>
                                Перейти к дисциплинам:{" "}
                            </span>
                            <span>{currentDirection.name}</span>
                        </DisciplineBtn>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
