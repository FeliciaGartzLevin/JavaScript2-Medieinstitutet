import Image from "react-bootstrap/Image"
import Alert from "react-bootstrap/Alert"
import Button from "react-bootstrap/Button"
import { useQuery } from '@tanstack/react-query'
import { getRandomCat } from "../services/TheCatAPI"

const RandomCatPage = () => {
	const {
		data,
		isError,
		isFetching,
		isLoading,
		// isStale,
		// isSuccess,
		refetch,
		// status,
	} = useQuery(["random-cat"], getRandomCat)

	if (isError) {
		return <Alert variant="error">Oops! The dog chased away the cat 🐕</Alert>
	}

	if (isFetching) {
		return (
			<div className="d-flex justify-content-center my-3">

				<Image height="400px" src="https://media.tenor.com/VgBizIcrg-oAAAAC/cat-vinyl.gif"></Image>
			</div>
		)
	}

	return (
		<>
			<h1>I ❤️ Random Cats</h1>
			<p>A cats behaviour is random so here's a random cat for you! Such random, very catlike, much hairball</p>

			{data && console.log(data)}

			<div className="d-flex justify-content-center my-3">
				{data && data.map(cat => (
					<Image height="5rem" width="auto" fluid key={cat.id} src={cat.url} ></Image>
				))
				}
			</div>

			<div className="d-flex justify-content-center">
				<Button
					variant="primary"
					disabled={isFetching}
					onClick={() => refetch()}
				>
					MOAR PURR!
				</Button>
			</div>


		</>
	)
}

export default RandomCatPage
