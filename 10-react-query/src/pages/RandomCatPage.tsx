import Image from "react-bootstrap/Image"
import Alert from "react-bootstrap/Alert"
import Button from "react-bootstrap/Button"
import { useQuery } from '@tanstack/react-query'
import { getRandomCat } from "../services/TheCatAPI"
import { useState } from "react"

const RandomCatPage = () => {
	const [breed, setBreed] = useState<string>('')

	const randomCatImg = useQuery({
		queryKey: ["random-cat", breed],
		queryFn: () => getRandomCat(breed),
		keepPreviousData: true,
		// ngt med enable/disable??
	})

	const fetchRandomImg = () => {
		setBreed('')
		if (!randomCatImg.data) {
			return
		} else if (randomCatImg.data) {
			randomCatImg.refetch()
		}
	}


	const fetchCatBreedImg = async (breedId: string) => {
		setBreed(breedId)

		if (!randomCatImg.data) {
			return
		} else if (randomCatImg.data) {
			randomCatImg.refetch()
		}
	}

	if (randomCatImg.isError) {
		return <Alert variant="error">Oops! The dog chased away the cat 🐕</Alert>
	}

	return (
		<>
			<h1>I ❤️ Random Cats</h1>
			<p>A cats behaviour is random so here's a random cat for you! Such random, very catlike, much hairball</p>

			{randomCatImg.data && console.log(randomCatImg.data)}


			<div className="d-flex justify-content-center mb-3">
				<Button
					variant="primary"
					disabled={randomCatImg.isFetching}
					onClick={fetchRandomImg}
				>
					MOAR PURR!
				</Button>
			</div>

			<div className="d-flex justify-content-center flex-wrap flex-column">
				<p>Random pic of a cat breed below:</p>
				<div className="btn-group" role="group" aria-label="Basic example">

					<Button
						type="button"
						variant="secondary"
						disabled={randomCatImg.isFetching}
						onClick={() => fetchCatBreedImg('aege')}
					>
						Aegean
					</Button>

					<Button
						type="button"
						variant="secondary"
						disabled={randomCatImg.isFetching}
						onClick={() => fetchCatBreedImg('amau')}
					>
						Arabian Mau
					</Button>

					<Button
						type="button"
						variant="secondary"
						disabled={randomCatImg.isFetching}
						onClick={() => fetchCatBreedImg('kora')}
					>
						Korat
					</Button>

					<Button
						type="button"
						variant="secondary"
						disabled={randomCatImg.isFetching}
						onClick={() => fetchCatBreedImg('awir')}
					>
						American Wirehair
					</Button>


				</div>

				<div className="d-flex justify-content-center my-3">

					{randomCatImg.isFetched && randomCatImg.data && randomCatImg.data.map(cat => (
						<Image height="5rem" width="auto" fluid key={cat.id} src={cat.url} ></Image>
					))
					}

				</div>

			</div>


		</>
	)
}

export default RandomCatPage
