import React, { useEffect, useState } from "react";
import styles from "./Chat.module.scss";

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
    const [currentResponseId, setCurrentResponseId] = useState<string | null>(
        null
    );

    const handleSendMessage = () => {
        if (inputText.trim() === "") return;

        // Generate unique IDs for the user message and AI response
        const userId = Date.now().toString();
        const responseId = (Date.now() + 1).toString();
        setCurrentResponseId(responseId);

        // Add user's message
        setMessages((prevMessages) => [
            ...prevMessages,
            { id: userId, text: inputText, isUser: true },
            { id: responseId, text: "", isUser: false, isLoading: true },
        ]);

        // Start fetching AI response
        const eventSource = new EventSource(
            `${server}/chat-stream/?message=${encodeURIComponent(inputText)}`
        );

        // Function to update AI response message
        const updateResponse = (data: string) => {
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

        eventSource.onerror = (error) => {
            console.error("Ошибка при получении данных:", error);
            eventSource.close();
        };

        eventSource.onclose = () => {
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
        };

        setInputText(""); // Clear input after sending message
    };

    useEffect(() => {
        // Приветственное сообщение
        const welcomeMessage: Message = {
            id: "welcome",
            //text: "Привет! Как я могу помочь?Привет! Как я могу помочь?Привет! Как я могу помочь?Привет! Как я могу помочь?Привет! Как я могу помочь?Привет! Как я могу помочь?Привет! Как я могу помочь?Привет! Как я могу помочь?Привет! Как я могу помочь?Привет! Как я могу помочь?Привет! Как я могу помочь?Привет! Как я могу помочь?Привет! Как я могу помочь?Привет! Как я могу помочь?Привет! Как я могу помочь?Привет! Как я могу помочь?Привет! Как я могу помочь?Привет! Как я могу помочь?Привет! Как я могу помочь?Привет! Как я могу помочь?Привет! Как я могу помочь?Привет! Как я могу помочь?Привет! Как я могу помочь?Привет! Как я могу помочь?Привет! Как я могу помочь?Привет! Как я могу помочь?Привет! Как я могу помочь?Привет! Как я могу помочь?Привет! Как я могу помочь?Привет! Как я могу помочь?Привет! Как я могу помочь?Привет! Как я могу помочь?Привет! Как я могу помочь?Привет! Как я могу помочь?Привет! Как я могу помочь?Привет! Как я могу помочь?Привет! Как я могу помочь?Привет! Как я могу помочь?",
            text: "Привет! Как я могу помочь?",
            isUser: false,
        };
        setMessages([welcomeMessage]);
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.messageContainer}>
                <div className={styles.messages}>
                    {messages.map((mes) => (
                        <div
                            key={mes.id}
                            className={` ${
                                mes.isUser ? styles.user : styles.ai
                            } ${mes.isLoading ? styles.loading : ""}`}
                        >
                            {mes.text || (mes.isLoading ? "Загрузка..." : "")}
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.inputContainer}>
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Напишите сообщение"
                />
                <button onClick={handleSendMessage}>Отправить</button>
            </div>
        </div>
    );
};

export default Chat;
