import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import HomePage from './HomePage'

describe("HomePage", () => {
	it("Welcomes the user on the root pager", () => {
		// Render
		render(<HomePage />)

		// Find
		const headingElement = screen.getByText('Welcome!')

		// Assert
		expect(headingElement).toBeInTheDocument()
	})
})
