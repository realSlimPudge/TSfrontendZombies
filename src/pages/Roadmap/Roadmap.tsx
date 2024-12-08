import React, { useMemo } from "react";
import ReactFlow, { Background, Controls } from "react-flow-renderer";
import dagre from "dagre";


const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes, edges, direction = "TB") => {
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 200, height: 50 }); 
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const LayoutData:React.FC = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.position = {
      x: nodeWithPosition.x - 100, 
      y: nodeWithPosition.y,
    };
    return node;
  });

  return { nodes: LayoutData, edges };
};

const Data = [
  {
    id: 'math-basics',
    type: 'input',
    data: { label: 'Основы математики' },
    position: { x: 0, y: 0 },  
    connectable: false,
    style: { backgroundColor: 'yellow', padding: '10px' },
  },
  {
    id: 'algebra',
    data: { label: 'Алгебра' },
    position: { x: 0, y: 0 },
    connectable: false,
    style: { backgroundColor: 'white', padding: '10px' },
  },
  {
    id: 'linear-equations',
    data: { label: 'Линейные уравнения' },
    position: { x: 0, y: 0 },
    connectable: false,
    style: { backgroundColor: 'lightblue', padding: '10px' },
  },
  {
    id: 'linear-systems',
    data: { label: 'Системы линейных уравнений' },
    position: { x: 0, y: 0 },
    connectable: false,
    style: { backgroundColor: 'white', padding: '10px' },
  },
  {
    id: 'solving-methods',
    data: { label: 'Методы решения' },
    position: { x: 0, y: 0 },
    connectable: false,
    style: { backgroundColor: 'white', padding: '10px' },
  },
  {
    id: 'quadratic-equations',
    data: { label: 'Квадратные уравнения' },
    position: { x: 0, y: 0 },
    connectable: false,
    style: { backgroundColor: 'lightblue', padding: '10px' },
  },
  {
    id: 'discriminant',
    data: { label: 'Дискриминант' },
    position: { x: 0, y: 0 },
    connectable: false,
    style: { backgroundColor: 'white', padding: '10px' },
  },
  {
    id: 'vieta',
    data: { label: 'Теорема Виета' },
    position: { x: 0, y: 0 },
    connectable: false,
    style: { backgroundColor: 'white', padding: '10px' },
  },
  {
    id: 'geometry',
    data: { label: 'Геометрия' },
    position: { x: 0, y: 0 },
    connectable: false,
    style: { backgroundColor: 'lightgoldenrodyellow', padding: '10px' },
  },
  {
    id: 'planimetry',
    data: { label: 'Планиметрия' },
    position: { x: 0, y: 0 },
    connectable: false,
    style: { backgroundColor: 'lightblue', padding: '10px' },
  },
  {
    id: 'triangles',
    data: { label: 'Треугольники' },
    position: { x: 0, y: 0 },
    connectable: false,
    style: { backgroundColor: 'white', padding: '10px' },
  },
  {
    id: 'circles',
    data: { label: 'Окружности' },
    position: { x: 0, y: 0 },
    connectable: false,
    style: { backgroundColor: 'white', padding: '10px' },
  },
];

const initialEdges = [
  { id: 'e-math-algebra', source: 'math-basics', target: 'algebra', type: 'bezier'},
  { id: 'e-math-geometry', source: 'math-basics', target: 'geometry', type: 'bezir'},
  { id: 'e-algebra-linear', source: 'algebra', target: 'linear-equations', type: 'smoothstep' },
  { id: 'e-algebra-quadratic', source: 'algebra', target: 'quadratic-equations', type: 'smoothstep' },
  { id: 'e-linear-systems', source: 'linear-equations', target: 'linear-systems', type: 'smoothstep' },
  { id: 'e-linear-solving', source: 'linear-equations', target: 'solving-methods', type: 'smoothstep' },
  { id: 'e-quadratic-discriminant', source: 'quadratic-equations', target: 'discriminant', type: 'smoothstep' },
  { id: 'e-quadratic-vieta', source: 'quadratic-equations', target: 'vieta', type: 'smoothstep' },
  { id: 'e-geometry-planimetry', source: 'geometry', target: 'planimetry', type: 'smoothstep' },
  { id: 'e-planimetry-triangles', source: 'planimetry', target: 'triangles', type: 'smoothstep' },
  { id: 'e-planimetry-circles', source: 'planimetry', target: 'circles', type: 'smoothstep' },
];

const RoadMap: React.FC = () => {
  const { nodes, edges } = useMemo(() => getLayoutedElements(Data, initialEdges), []);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <ReactFlow 
      nodes={nodes} 
        edges={edges} 
        nodesDraggable={false} 
        nodesConnectable={false} 
        elementsSelectable={false}
        panOnDrag={false} 
        zoomOnScroll={false} 
        zoomOnPinch={false} 
        zoomOnDoubleClick={false}>
          <Controls />
          <Background />
      </ReactFlow>
    </div>
  );
};

export default RoadMap;
