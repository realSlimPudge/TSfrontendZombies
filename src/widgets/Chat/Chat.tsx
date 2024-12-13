import React, { useEffect, useState } from "react";
import styles from "./Chat.module.scss";
import axios from "axios";

interface Message {
    id: string;
    text: string;
    isUser: boolean;
    isLoading?: boolean;
}

const Chat: React.FC = () => {
    const server = import.meta.env.VITE_SERVER;
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState<string>("");
    const [searchActive, setSearchActive] = useState<boolean>(false);
    const [activeBtn, setActiveBtn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handlePress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage();
        } else if (event.key === "Enter" && event.shiftKey) {
            event.preventDefault();
            setInputText((prevText) => prevText + "\n");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputText(e.target.value);

        const textarea = e.target;
        textarea.style.height = "auto";
        const newHeight = textarea.scrollHeight;
        textarea.style.height = `${Math.min(newHeight, 200)}px`;
    };

    const handleSearch = () => {
        setSearchActive(!searchActive);
    };

    const handleStopMessage = () => {
        axios.post(`${server}/api/stop_generation`);
    };

    const handleSendMessage = () => {
        if (inputText.trim() === "") return;
        setLoading(true);
        const userId = Date.now().toString();
        const responseId = (Date.now() + 1).toString();

        setMessages((prevMessages) => [
            ...prevMessages,
            { id: userId, text: inputText, isUser: true },
            { id: responseId, text: "", isUser: false, isLoading: true },
        ]);

        const eventSource = new EventSource(
            `${server}/${
                searchActive ? "agent-stream" : "chat-stream"
            }/?message=${encodeURIComponent(inputText)}`
        );

        const updateResponse = (data: string) => {
            console.log("Данные", JSON.stringify(data));
            setMessages((prevMessages) => {
                const newMessages = [...prevMessages];
                const responseIndex = newMessages.findIndex(
                    (msg) => msg.id === responseId
                );
                if (responseIndex !== -1) {
                    newMessages[responseIndex] = {
                        ...newMessages[responseIndex],
                        text: newMessages[responseIndex].text + data,
                    };
                }
                return newMessages;
            });
        };

        eventSource.onmessage = (event) => {
            updateResponse(event.data);
        };

        eventSource.onerror = (error: EventSourceEvent) => {
            console.error("Ошибка при получении данных:", error);

            if (eventSource.readyState === EventSource.CLOSED) {
                console.log("Соединение закрыто.");
            } else if (eventSource.readyState === EventSource.CONNECTING) {
                console.log("Попытка переподключения...");
            }

            if (error.target) {
                console.log("Цель EventSource:", error.target);
            }
            eventSource.close();
            setLoading(false);
        };

        eventSource.addEventListener("close", () => {
            setMessages((prevMessages) => {
                const newMessages = [...prevMessages];
                const responseIndex = newMessages.findIndex(
                    (msg) => msg.id === responseId
                );
                if (responseIndex !== -1) {
                    newMessages[responseIndex] = {
                        ...newMessages[responseIndex],
                        isLoading: false,
                    };
                }
                return newMessages;
            });
            setLoading(false);
            eventSource.close();
        });

        setInputText("");
    };

    useEffect(() => {
        const welcomeMessage: Message = {
            id: "welcome",
            text: "Привет! Как я могу помочь?",
            isUser: false,
        };
        setMessages([welcomeMessage]);
    }, []);

    useEffect(() => {
        if (inputText.trim() === "") {
            setActiveBtn(false);
        } else {
            setActiveBtn(true);
        }
    }, [inputText]);

    const formatText = (text: string) => {
        if (text) {
            return text.split("/n").map((line, index) => (
                <p key={index} className={styles.messageParagraph}>
                    {line}
                </p>
            ));
        } else {
            return <p>Загрузка</p>;
        }
    };
    return (
        <div className={styles.container}>
            <div className={styles.layout}></div>
            <div className={styles.messageContainer}>
                <div className={styles.messages}>
                    {messages.map((mes) => (
                        <div
                            key={mes.id}
                            className={` ${
                                mes.isUser ? styles.user : styles.ai
                            }`}
                        >
                            {formatText(mes.text) || "Загрузка..."}
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.inputContainer}>
                <div className={styles.inputContent}>
                    <textarea
                        className={styles.textarea}
                        value={inputText}
                        onChange={handleInputChange}
                        placeholder="Напишите сообщение"
                        rows={1}
                        onKeyDown={handlePress}
                    ></textarea>
                    {loading ? (
                        <>
                            <button
                                onClick={handleStopMessage}
                                className={styles.stopBtn}
                            >
                                <div className={styles.stopBtnContent}>
                                    <svg
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M4 18a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12z"
                                        />
                                    </svg>
                                </div>
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleSendMessage}
                                className={`${styles.sendBtn} ${
                                    activeBtn
                                        ? styles.sendBtn
                                        : styles.disableBtn
                                }`}
                            >
                                <div className={styles.btnContent}>
                                    <svg
                                        version="1.1"
                                        id="Layer_1"
                                        viewBox="0 0 330 330"
                                    >
                                        <path
                                            id="XMLID_27_"
                                            d="M15,180h263.787l-49.394,49.394c-5.858,5.857-5.858,15.355,0,21.213C232.322,253.535,236.161,255,240,255
        s7.678-1.465,10.606-4.394l75-75c5.858-5.857,5.858-15.355,0-21.213l-75-75c-5.857-5.857-15.355-5.857-21.213,0
        c-5.858,5.857-5.858,15.355,0,21.213L278.787,150H15c-8.284,0-15,6.716-15,15S6.716,180,15,180z"
                                        />
                                    </svg>
                                </div>
                            </button>
                        </>
                    )}
                </div>
                <div className={styles.searchBtnContainer}>
                    <button
                        className={`${styles.searchBtn} ${
                            searchActive ? styles.searchActive : ""
                        }`}
                        onClick={handleSearch}
                    >
                        <div>
                            <svg
                                version="1.1"
                                id="Layer_1"
                                viewBox="0 0 512 512"
                            >
                                <g>
                                    <g>
                                        <path
                                            d="M256,0C114.62,0,0,114.62,0,256s114.62,256,256,256s256-114.62,256-256S397.38,0,256,0z M172.211,41.609
			c-24.934,27.119-44.68,66.125-56.755,111.992H49.749C75.179,102.741,118.869,62.524,172.211,41.609z M25.6,256
			c0-26.999,5.077-52.727,13.662-76.8h70.494c-4.608,24.294-7.356,49.963-7.356,76.8s2.748,52.506,7.347,76.8H39.262
			C30.677,308.727,25.6,283,25.6,256z M49.749,358.4h65.707c12.083,45.867,31.821,84.872,56.755,111.991
			C118.869,449.476,75.179,409.259,49.749,358.4z M243.2,485.188c-43.81-8.252-81.877-58.24-101.359-126.788H243.2V485.188z
			 M243.2,332.8H135.74c-4.924-24.166-7.74-49.997-7.74-76.8s2.816-52.634,7.74-76.8H243.2V332.8z M243.2,153.6H141.841
			C161.323,85.052,199.39,35.063,243.2,26.812V153.6z M462.251,153.6h-65.707c-12.083-45.867-31.821-84.873-56.755-111.992
			C393.131,62.524,436.821,102.741,462.251,153.6z M268.8,26.812c43.81,8.252,81.877,58.24,101.359,126.788H268.8V26.812z
			 M268.8,179.2h107.46c4.924,24.166,7.74,49.997,7.74,76.8s-2.816,52.634-7.74,76.8H268.8V179.2z M268.8,485.188V358.4h101.359
			C350.677,426.948,312.61,476.937,268.8,485.188z M339.789,470.391c24.934-27.127,44.672-66.125,56.755-111.991h65.707
			C436.821,409.259,393.131,449.476,339.789,470.391z M402.244,332.8c4.608-24.294,7.356-49.963,7.356-76.8
			s-2.748-52.506-7.347-76.8h70.494c8.576,24.073,13.653,49.801,13.653,76.8c0,27-5.077,52.727-13.662,76.8H402.244z"
                                        />
                                    </g>
                                </g>
                            </svg>
                        </div>
                        Найти учебные материалы
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
