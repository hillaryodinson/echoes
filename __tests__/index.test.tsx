import Home from "@/app/page";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

it("should show homepage", () => {
	//Arrange
	render(<Home />);

	//Act
	const myElem = screen.getByText(/Get started by editing/i);

	//Assert
	expect(myElem).toBeInTheDocument();
});
