import { useContext } from 'react'
import { StoreContext } from '../contexts/StoreContextProvider'

const useStore = () => {
	const storeContext = useContext(StoreContext)

	if (!storeContext) {
		throw new Error("Trying to use StoreContext outside of StoreContextProvider")
	}

	return storeContext
}

export default useStore
