import React, { useMemo } from "react";
import ReactFlow, {
    Background,
    Controls,
    useEdgesState,
    useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { useSelector } from "react-redux";
import { RootState } from "../../shared/store/store";
import CustomNode from "../../shared/CustomNode/CustomNode";
import CustomNodeTopic from "../../shared/CustomNodeTopic/CustomNodeTopic";

const RoadMap: React.FC = () => {
    const { data: category } = useSelector((state: RootState) => state.roadmap);

    if (!category) {
        return <div>no roadmap data</div>;
    }

    const { nodes, edges } = useMemo(() => {
        const nodes = [];
        const edges = [];

        category.forEach((cat, catIndex) => {
            const categoryId: string = `category-${catIndex}`;

            const topics: number = cat.topics.length;

            const isFirst = catIndex === 0;
            const isLast = catIndex === category.length - 1;
            const x: number = 200;
            const y: number = catIndex * 300;

            nodes.push({
                id: categoryId,
                position: {
                    x: x,
                    y: y,
                },
                data: { label: cat.name, isFirst, isLast, topics },
                dragHandle: false,
                draggable: false,
                type: "main",
            });

            cat.topics.forEach((topic, topicIndex) => {
                const topicId = `topic-${catIndex}-${topicIndex}`;

                const xPos = topicIndex % 2 === 0 ? -100 : 480;
                const yPos = y + Math.floor(topicIndex / 2) * 100;

                const isRight = topicIndex % 2 === 0;
                const isLeft = topicIndex % 2 !== 0;

                const edgeDirection = () => {
                    if (isRight) {
                        return "left";
                    } else {
                        return "right";
                    }
                };

                nodes.push({
                    id: topicId,
                    position: { x: xPos, y: yPos },
                    data: { label: topic, isRight, isLeft },
                    dragHandle: false,
                    draggable: false,
                    type: "topic",
                });

                edges.push({
                    id: `edge-${categoryId}-${topicId}`,
                    source: categoryId,
                    target: topicId,
                    sourceHandle: edgeDirection(),
                    type: "default",
                });
            });

            if (catIndex < category.length - 1) {
                const nextCategoryId: string = `category-${catIndex + 1}`;
                edges.push({
                    id: `edge-${categoryId}-${nextCategoryId}`,
                    source: categoryId,
                    target: nextCategoryId,
                    type: "default",
                    sourceHandle: "bottom",
                });
            }
        });

        return { nodes, edges };
    }, [category]);

    const [nodesState, setNodes, onNodesChange] = useNodesState(nodes);
    const [edgesState, setEdges, onEdgesChange] = useEdgesState(edges);

    const nodeTypes: NodeTypes = useMemo(
        () => ({ main: CustomNode, topic: CustomNodeTopic }),
        []
    );

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <ReactFlow
                nodes={nodesState}
                edges={edgesState}
                onNodesChange={() => {}}
                onEdgesChange={onEdgesChange}
                fitView
                nodeTypes={nodeTypes}
            >
                <Controls />
                <Background />
            </ReactFlow>
        </div>
    );
};

export default RoadMap;
