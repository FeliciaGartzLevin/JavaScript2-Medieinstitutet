import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { renderWithUserInteraction } from "../../../tests/helpers"
import TodoForm from "../TodoForm"

const fakeOnSave = async () => {
	return
}
const todoTitle = "This is my todo title"

describe("Todo Form", () => {
	it("Renders input field initially empty", () => {
		// Render
		render(<TodoForm onSave={fakeOnSave} />)

		// Find
		const inputElement = screen.getByRole("textbox")
		// const inputElement = screen.getByLabelText("What do you need to do?")

		// Assert
		expect(inputElement).toHaveValue("")
	})

	it("Can type into input field", async () => {
		// Render (with user interaction)
		const { user } = renderWithUserInteraction(<TodoForm onSave={fakeOnSave} />)

		// Find
		const inputElement: HTMLInputElement = screen.getByRole("textbox")

		// Interact
		// inputElement.value = "lalala"
		await user.type(inputElement, todoTitle)

		// Assert
		expect(inputElement).toHaveValue(todoTitle)
	})

	it("Empties input field after clicking on the 'Save' button", async () => {
		// Render (with user interaction)
		const { user } = renderWithUserInteraction(<TodoForm onSave={fakeOnSave} />)

		// Find
		const inputElement: HTMLInputElement = screen.getByRole("textbox")
		const btnSaveElement = screen.getByRole("button", { name: /save/i })

		// Interact
		await user.type(inputElement, todoTitle)
		await user.click(btnSaveElement)

		// Assert
		expect(inputElement).toHaveValue("")
	})

	it("Empties input field after pressing <Enter>", async () => {
		// Render (with user interaction)
		const { user } = renderWithUserInteraction(<TodoForm onSave={fakeOnSave} />)

		// Find
		const inputElement: HTMLInputElement = screen.getByRole("textbox")

		// Interact
		await user.type(inputElement, todoTitle)
		await user.type(inputElement, "{Enter}")

		// Assert
		expect(inputElement).toHaveValue("")
	})
})

describe("Todo Form validation", () => {
	it("Shows validation error if input is empty", async () => {
		// Render (with user interaction)
		const { user } = renderWithUserInteraction(<TodoForm onSave={fakeOnSave} />)

		// Find
		const inputElement = screen.getByRole("textbox")

		// Interact
		await user.type(inputElement, "{Enter}")
		const validationErrorElement = screen.getByText(/You have to write something/i)

		// Assert
		expect(validationErrorElement).toBeInTheDocument()
	})

	it("Shows validation error if input is too short", async () => {
		// Render (with user interaction)
		const { user } = renderWithUserInteraction(<TodoForm onSave={fakeOnSave} />)

		// Find
		const inputElement = screen.getByRole("textbox")

		// Interact
		await user.type(inputElement, "LOL")
		await user.type(inputElement, "{Enter}")
		const validationErrorElement = screen.getByText(/too short/i)

		// Assert
		expect(validationErrorElement).toBeInTheDocument()
	})

	it("Does not show validation error if input is valid", async () => {
		// Render (with user interaction)
		const { user } = renderWithUserInteraction(<TodoForm onSave={fakeOnSave} />)

		// Find
		const inputElement = screen.getByRole("textbox")

		// Interact
		await user.type(inputElement, "{Enter}")
		const validationErrorElement = screen.queryByText(/too short/i)

		// Assert
		expect(validationErrorElement).not.toBeInTheDocument()
	})
})
