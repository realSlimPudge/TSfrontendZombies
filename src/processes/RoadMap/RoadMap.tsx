import React from 'react'
import styles from './RoadMap.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from '../../shared/store/store'

const RoadMap: React.FC = () => {
	const { data: category } = useSelector((state: RootState) => state.roadmap)

	if (!category) {
		return <div>no roadmap data</div>
	} else {
	}

	return (
		<div>
			{category.map((el, i) => (
				<div key={i} style={{ marginTop: 30 }}>
					{el.name}
					{el.topics.map((el2, i2) => (
						<div key={i2} style={{ marginTop: 10 }}>
							{el2}
						</div>
					))}
				</div>
			))}
		</div>
	)
}

export default RoadMap
