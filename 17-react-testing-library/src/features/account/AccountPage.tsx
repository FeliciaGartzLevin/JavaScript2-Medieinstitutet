import Container from "react-bootstrap/Container"
import AccountButtons from "./AccountButtons"
import { useAppSelector } from "../../app/hooks"

const AccountPage = () => {
	const accountState = useAppSelector(state => state.account)

	return (
		<Container className="py-3">
			<h1>Account</h1>

			<div className="text-center my-5">
				<p className="h3">Balance</p>
				<code className="display-4">$ {accountState.balance}</code>
			</div>

			<div className="d-flex justify-content-around">
				<div className="text-center">
					<p>AccountButtons 1</p>
					<AccountButtons />
				</div>

				<div className="text-center">
					<p>AccountButtons 2</p>
					<AccountButtons />
				</div>
			</div>
		</Container>
	)
}

export default AccountPage
