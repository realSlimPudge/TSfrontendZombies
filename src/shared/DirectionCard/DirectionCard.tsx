import React, { useEffect, useState } from "react";
import styles from "../FacultyCard/FacultyCard.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentDirection } from "../slices/facultiesSlice";
import { RootState } from "../store/store";

interface DirectionCardProps {
    title: string;
}

const DirectionCard: React.FC<DirectionCardProps> = ({ title }) => {
    const dispatch = useDispatch();
    const [active, setActive] = useState<boolean>(false);
    const name = useSelector(
        (state: RootState) => state.faculties.currentDirection?.name
    );
    const selectDirection = () => {
        dispatch(setCurrentDirection(title));
    };

    useEffect(() => {
        if (title === name) {
            setActive(true);
        } else {
            setActive(false);
        }
    }, [name]);

    return (
        <div
            className={`${styles.content} ${active ? styles.active : ""}`}
            onClick={selectDirection}
        >
            <h2>{title}</h2>
        </div>
    );
};

export default DirectionCard;
