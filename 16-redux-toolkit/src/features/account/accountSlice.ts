import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Account } from "../../types/Account.types"

const initialState: Account = {
	balance: 42,
}

export const accountSlice = createSlice({
	name: "account",
	initialState,
	reducers: {
		deposit: (state, action: PayloadAction<number>) => {
			state.balance += action.payload
		},

		withdraw: (state, action: PayloadAction<number>) => {
			if (state.balance - action.payload < 0) {
				return
			}

			state.balance -= action.payload
		}
	}
})

// Action creators are generated for each reducer function
export const { deposit, withdraw } = accountSlice.actions

// Export the reducer
export default accountSlice.reducer
