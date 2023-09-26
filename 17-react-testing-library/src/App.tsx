import { Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import AccountPage from "./features/account/AccountPage"
import TodosPage from "./features/todos/TodosPage"
import Navigation from "./pages/partials/Navigation"
import HomePage from "./pages/HomePage"
import PageNotFound from "./pages/PageNotFound"
import "./assets/scss/App.scss"

const App = () => {
	return (
		<div id="App">
			<Navigation />

			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/account" element={<AccountPage />} />
				<Route path="/todos" element={<TodosPage />} />
				<Route path="*" element={<PageNotFound />} />
			</Routes>

			<ToastContainer
				autoClose={1500}
				pauseOnFocusLoss={false}
				theme="colored"
			/>
		</div>
	)
}

export default App
