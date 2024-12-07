import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./DisciplineBtn.module.scss";

interface DisciplineBtnProps {
    children: React.ReactNode;
    api: string;
}

const DisciplineBtn: React.FC<DisciplineBtnProps> = ({ children, api }) => {
    const navigate = useNavigate();
    const redirect = () => {
        if (api) {
            navigate(api);
        }
    };
    return (
        <button onClick={redirect} className={styles.btn}>
            {children}
        </button>
    );
};

export default DisciplineBtn;
