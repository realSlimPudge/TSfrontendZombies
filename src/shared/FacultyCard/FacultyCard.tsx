import React, { useEffect, useState } from "react";
import styles from "./FacultyCard.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Faculty, setCurrentFaculty } from "../slices/facultiesSlice";
import { RootState } from "../store/store";

interface FacultyCardProps {
    title: string;
    info: Faculty;
}

const FacultyCard: React.FC<FacultyCardProps> = ({ title, info }) => {
    const [active, setActive] = useState<boolean>(false);
    const id = useSelector(
        (state: RootState) => state.faculties.currentFaculty?.id
    );

    useEffect(() => {
        if (id === info.id) {
            setActive(true);
        } else {
            setActive(false);
        }
    }, [id, info]);

    const dispatch = useDispatch();
    const selectFaculty = () => {
        dispatch(setCurrentFaculty(info.id));
    };
    return (
        <div
            className={`${styles.content} ${active ? styles.active : ""}`}
            onClick={selectFaculty}
        >
            <h2>{title}</h2>
        </div>
    );
};

export default FacultyCard;
