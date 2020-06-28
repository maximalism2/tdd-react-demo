import React from "react"
import { render, screen } from "@testing-library/react"
import App from "./App"
import { mockServer, server } from "./mocks/server"

describe("App", () => {
  mockServer(server)

  function renderApp() {
    return render(<App />)
  }

  it("renders page title", () => {
    renderApp()

    const pageTitle = screen.getByText("TDD in React is awesome!!!")

    expect(pageTitle).toBeInTheDocument()
  })

  it("renders posts", async () => {
    renderApp()

    const postContent = await screen.findByText("First post content")

    expect(postContent).toBeInTheDocument()
  })
})
