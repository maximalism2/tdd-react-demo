import React from "react"
import { render, screen } from "@testing-library/react"
import App from "./App"

describe("App", () => {
  function renderApp() {
    return render(<App />)
  }

  it("renders page title", () => {
    renderApp()

    const pageTitle = screen.getByText("TDD in React is awesome!!!")

    expect(pageTitle).toBeInTheDocument()
  })

  it("renders posts", () => {})
})
