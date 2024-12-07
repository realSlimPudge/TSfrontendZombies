import React from "react";
import { useParams } from "react-router-dom";

const DisciplinesPage: React.FC = () => {
    const { faculty, direction } = useParams<{
        faculty: string;
        direction: string;
    }>();
    return (
        <div>
            <h1>{faculty}</h1>
            <h2>{direction}</h2>
        </div>
    );
};

export default DisciplinesPage;
