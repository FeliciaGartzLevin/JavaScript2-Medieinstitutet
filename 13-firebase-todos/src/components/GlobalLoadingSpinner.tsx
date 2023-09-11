import { PacmanLoader } from "react-spinners"
import useAuth from "../hooks/useAuth"

const GlobalLoadingSpinner = () => {
	const { isLoading } = useAuth()

	return isLoading ? (
		<div id="global-loading-spinner-wrapper">
			<PacmanLoader color="#007bff" size={20} speedMultiplier={1.5} />
		</div>
	) : null
}

export default GlobalLoadingSpinner
