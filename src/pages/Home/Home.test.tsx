import { render, screen } from "@testing-library/react"
import Home from "./home"

describe("Test Home Page", () => {
  it("should render home page", () => {
    render(<Home />)
    expect(screen.getByText(/welcome/i)).toBeInTheDocument()
  })
})
