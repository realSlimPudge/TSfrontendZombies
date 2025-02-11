import styles from "./LoaderDownload.module.scss";

const LoaderDownload: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.loader}></div>
        </div>
    );
};

export default LoaderDownload;
