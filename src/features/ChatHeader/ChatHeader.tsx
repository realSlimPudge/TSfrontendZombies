import React from "react";
import styles from "./ChatHeader.module.scss";
import Radio from "../../shared/Radio/Radio";

const ChatHeader: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.options}>
                    <div className={styles.option}>
                        <span>Задания:</span>
                        <Radio
                            options={[
                                {
                                    id: "теоритические",
                                    title: "теоритические",
                                    label: "Теоритические",
                                },
                                {
                                    id: "практические",
                                    title: "практические",
                                    label: "Практические",
                                },
                            ]}
                            defaultOptionId="теоритические"
                        />
                    </div>

                    <div className={styles.option}>
                        <span>Учебные материалы:</span>
                        <Radio
                            options={[
                                {
                                    id: "видео",
                                    title: "видео",
                                    label: "Видео",
                                },
                                {
                                    id: "статьи",
                                    title: "статьи",
                                    label: "Статьи",
                                },
                            ]}
                            defaultOptionId="видео"
                        />
                    </div>
                    <div className={styles.btn}>
                        <button>Получить тест</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatHeader;
