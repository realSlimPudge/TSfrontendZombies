import React, { useState } from "react";
import styles from "../CustomNode/CustomNode.module.scss";
import { Handle, Position } from "reactflow";

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
    return (
        <>
            {!isLeft && <Handle type="target" position={Position.Right} />}
            <div
                className={`${styles.topic} ${selected ? styles.selected : ""}`}
                onClick={() => {
                    setSelected(!selected);
                }}
            >
                <div>{label}</div>
            </div>
            {!isRight && <Handle type="target" position={Position.Left} />}
        </>
    );
};

export default CustomNodeTopic;
