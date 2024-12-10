import React, { useState, useEffect } from 'react';
import ReactFlow, { Controls, Background, useNodesState, useEdgesState, Position } from 'reactflow';
import 'reactflow/dist/style.css';
import dagre from 'dagre';
import roadmapData from '../../data/roadmap.json';

// Настройка dagre для вертикального расположения
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 200;
const nodeHeight = 50;

const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };
  });

  return { nodes, edges };
};

const Roadmap = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const parseDataToFlow = (data) => {
      const nodes = [];
      const edges = [];

      data.categories.forEach((category, categoryIndex) => {
        const categoryNodeId = `category-${categoryIndex}`;
        nodes.push({
          id: categoryNodeId,
          type: 'input',
          data: { label: category.name },
          position: { x: 0, y: 0 },
        });

        category.topics.forEach((topic, topicIndex) => {
          const topicNodeId = `topic-${categoryIndex}-${topicIndex}`;
          nodes.push({
            id: topicNodeId,
            type: 'default',
            data: { label: topic },
            position: { x: 0, y: 0 },
          });

          edges.push({
            id: `edge-${categoryIndex}-${topicIndex}`,
            source: categoryNodeId,
            target: topicNodeId,
            animated: true,
          });
        });
      });

      const layouted = getLayoutedElements(nodes, edges);
      setNodes(layouted.nodes);
      setEdges(layouted.edges);
    };

    parseDataToFlow(roadmapData.data);
  }, []);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        fitViewOptions={{ padding: 0.1 }}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Roadmap;
