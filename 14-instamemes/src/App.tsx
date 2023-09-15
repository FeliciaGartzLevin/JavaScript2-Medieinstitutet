import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import RequireAuth from './components/RequireAuth'
import Navigation from './pages/partials/Navigation'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import NotFound from './pages/NotFound'
import SignupPage from './pages/SignupPage'
import UpdateProfile from './pages/UpdateProfile'
import './assets/scss/App.scss'

const App = () => {
	return (
		<div id="App">
			<Navigation />

			<Routes>
				{/* Guest Routes */}
				<Route path="*" element={<NotFound />} />
				<Route path="/forgot-password" element={<ForgotPasswordPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/logout" element={<LogoutPage />} />
				<Route path="/signup" element={<SignupPage />} />
				<Route path="/" element={<HomePage />} />

				{/* Protected Routes */}
				<Route path="/update-profile" element={
					<RequireAuth>
						<UpdateProfile />
					</RequireAuth>
				} />
			</Routes>

			<ToastContainer
				theme='colored'
			/>
		</div>
	)
}

export default App
