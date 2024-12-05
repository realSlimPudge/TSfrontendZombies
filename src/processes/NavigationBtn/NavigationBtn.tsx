import React from "react";
import styles from "./NavigationBtn.module.scss";
import { useNavigate } from "react-router-dom";

interface BtnProps {
    children: React.ReactNode;
    navigate?: string;
    url?: string;
}

const NavigationBtn: React.FC<BtnProps> = ({ children, navigate, url }) => {
    const navigation = useNavigate();
    const handleClick = () => {
        if (navigate) {
            navigation(navigate);
        }
        if (url) {
            window.location.href = url;
        }
    };

    return (
        <button className={styles.button} onClick={handleClick}>
            {children}
        </button>
    );
};

export default NavigationBtn;
