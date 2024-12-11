import React from 'react'
import styles from './CustomNode.module.scss'
import { Handle, Position } from 'reactflow'

interface CustomNodeProps {
	data: {
		label: string
		isFirst: boolean
		isLast: boolean
		topics: number
	}
}

const CustomNode: React.FC<CustomNodeProps> = ({
	data: { label, isFirst, isLast, topics },
}) => {
	return (
		<>
			{!isFirst && (
				<Handle type='target' position={Position.Top} id='top' />
			)}
			{topics === 0 ? (
				<></>
			) : topics > 1 ? (
				<>
					<Handle type='source' position={Position.Left} id='left' />
					<Handle
						type='source'
						position={Position.Right}
						id='right'
					/>
				</>
			) : (
				<>
					<Handle type='source' position={Position.Left} id='left' />
				</>
			)}
			<div className={styles.main}>
				<div> {label}</div>
			</div>
			{!isLast && (
				<Handle type='source' position={Position.Bottom} id='bottom' />
			)}
		</>
	)
}

export default CustomNode
