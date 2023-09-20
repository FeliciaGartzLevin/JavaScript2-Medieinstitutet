import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import StoreContextProvider from "./contexts/StoreContextProvider.tsx"
import App from "./App.tsx"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<StoreContextProvider>
				<App />
			</StoreContextProvider>
		</BrowserRouter>
	</React.StrictMode>
)
