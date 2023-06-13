import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContextProvider"

const useThemeContext = () => {
	return useContext(ThemeContext)
}

export default useThemeContext
