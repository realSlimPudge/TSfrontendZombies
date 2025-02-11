import React, { useEffect, useState } from "react";
import styles from "../CustomNode/CustomNode.module.scss";
import { Handle, Position } from "reactflow";
import { useDispatch } from "react-redux";
import {
    addQuestions,
    clearAllQuestions,
    removeQuestions,
} from "../slices/currentQuestionsSlice";

interface CustomNodeTopicProps {
    data: {
        label: string;
        isRight: boolean;
        isLeft: boolean;
    };
}

const CustomNodeTopic: React.FC<CustomNodeTopicProps> = ({
    data: { label, isLeft, isRight },
}) => {
    const [selected, setSelected] = useState<boolean>(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearAllQuestions());
    }, []);

    useEffect(() => {
        if (selected) {
            dispatch(addQuestions(label));
        } else {
            dispatch(removeQuestions(label));
        }
    }, [selected, label, dispatch]);
    return (
        <>
            {!isLeft && <Handle type="target" position={Position.Right} />}
            <div
                className={`${styles.topic} ${selected ? styles.selected : ""}`}
                onClick={() => {
                    setSelected(!selected);
                }}
            >
                <p>{label}</p>
            </div>
            {!isRight && <Handle type="target" position={Position.Left} />}
        </>
    );
};

export default CustomNodeTopic;
