import React, { useEffect } from "react";
import styles from "./RoadmapPage.module.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRoadmap } from "../../shared/slices/roadmapSlice";
import { RootState } from "../../shared/store/store";
import RoadMap from "../../processes/RoadMap/RoadMap";
import Chat from "../../widgets/Chat/Chat";

const Roadmap: React.FC = () => {
    const { discipline, linkId } = useParams<{
        discipline: string;
        linkId: string;
    }>();
    const { loading, error } = useSelector((state: RootState) => state.roadmap);
    const dispatch = useDispatch();
    useEffect(() => {
        if (discipline && linkId) {
            const api: string = `${discipline}/${linkId}`;
            dispatch(getRoadmap(api));
        }
    }, [discipline, dispatch]);

    if (loading) {
        return <div>loading...</div>;
    }

    if (error) {
        return <div>error:{error}</div>;
    }

    return (
        <div className={styles.pageContainer}>
            {discipline}
            <div className={styles.container}>
                <div className={styles.roadmap}>
                    <RoadMap />
                </div>
                <div className={styles.chat}>
                    <Chat />
                </div>
            </div>
        </div>
    );
};

export default Roadmap;
