import React from "react";
import styles from "./NotFound.module.scss";

const NotFound: React.FC = () => {
    return (
        <div className={styles.content}>
            <p>Страница не найдена</p>
        </div>
    );
};
export default NotFound;
