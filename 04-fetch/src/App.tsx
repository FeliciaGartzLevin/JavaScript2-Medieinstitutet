import { useState, useEffect } from 'react'
import './assets/scss/App.scss'
import { getResource } from './services/API'
import ResourceList from './components/ResourceList'

interface IResource {
	id: number
	title: string
}

function App() {
	const [resource, setResource] = useState('')
	const [data, setData] = useState<IResource[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')


	useEffect(() => {
		if (!resource) {
			return
		}

		// empty data & error before fetching new
		// and set loading
		setError('')
		setData([])
		setLoading(true)

		const fetchData = async () => {
			// useEffect kan inte använda async / await, så då kan man göra som här:

			try {
				const payload = await getResource(resource)

				// update data state with resource payload
				setData(payload)
				// setLoading(false)

			} catch (e: any) {
				// setLoading(false)
				setError(e.toString())
				console.log("NOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
			} finally {
				setLoading(false) //skriver det en gng här istället för två gånger ovan (utkommenterade rader)
			}
		}

		// call function
		fetchData()

	}, [resource]) // useEffect kallas på varje gång resource ändras (dvs varje gng vi klickar på någon av knapparna)

	return (
		<div className="container">
			<h1 className="mb-3">Fetch</h1>

			<div className="d-flex justify-content-between mb-3">
				<button onClick={() => setResource('albums')} className="btn btn-primary">Albums</button>
				<button onClick={() => setResource('photos')} className="btn btn-success">Photos</button>
				<button onClick={() => setResource('posts')} className="btn btn-warning">Posts</button>
				<button onClick={() => setResource('todos')} className="btn btn-danger">Todos</button>
				<button onClick={() => setResource('memes')} className="btn btn-info">Memes 😂</button>
			</div>

			<ResourceList
				error={error}
				loading={loading}
				resource={resource}
				data={data}
			/>
		</div>
	)
}

export default App
