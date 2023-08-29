import { useIsFetching } from "@tanstack/react-query"
import { PacmanLoader } from "react-spinners"

const GlobalLoadingSpinner = () => {
	const isFetching = useIsFetching()

	return isFetching ? (
		<div id="global-loading-spinner-wrapper">
			<PacmanLoader color="#007bff" size={20} speedMultiplier={1.5} />
		</div>
	) : null
}

export default GlobalLoadingSpinner
