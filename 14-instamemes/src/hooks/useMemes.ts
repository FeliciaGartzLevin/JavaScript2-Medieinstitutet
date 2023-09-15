import { orderBy } from "firebase/firestore"
import { memesCol } from "../services/firebase"
import { Meme } from "../types/Meme.types"
import useStreamCollection from "./useStreamCollection"

const useMemes = () => {
	return useStreamCollection<Meme>(memesCol, orderBy("created"))
}

export default useMemes
