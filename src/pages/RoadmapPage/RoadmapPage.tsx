import React, { useEffect } from 'react'
import styles from './RoadmapPage.module.scss'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getRoadmap } from '../../shared/slices/roadmapSlice'
import { RootState } from '../../shared/store/store'
import RoadMap from '../../processes/RoadMap/RoadMap'

const Roadmap: React.FC = () => {
	const { discipline } = useParams<{ discipline: string }>()
	const { loading, error } = useSelector((state: RootState) => state.roadmap)
	const dispatch = useDispatch()
	useEffect(() => {
		if (discipline) {
			dispatch(getRoadmap(discipline))
		}
	}, [discipline, dispatch])

	if (loading) {
		return <div>loading...</div>
	}

	if (error) {
		return <div>error:{error}</div>
	}

	return (
		<div>
			{discipline}
			<div className={styles.container}>
				<RoadMap />
			</div>
		</div>
	)
}

export default Roadmap
