import React from "react";
import styles from "./NavigationBtn.module.scss";
import { useNavigate } from "react-router-dom";

interface BtnProps {
    children: React.ReactNode;
    navigate?: string;
    url?: string;
    back?: boolean;
}

const NavigationBtn: React.FC<BtnProps> = ({
    back,
    children,
    navigate,
    url,
}) => {
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
        <button
            className={`${styles.button} ${back ? styles.backBtn : ""}`}
            onClick={handleClick}
        >
            {children}
        </button>
    );
};

export default NavigationBtn;
