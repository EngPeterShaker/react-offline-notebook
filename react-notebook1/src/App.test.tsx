import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
	render(<App />);

	const EditorComponent = document.querySelector('[data-testid="editor-form"]');
	expect(EditorComponent).toBeInTheDocument();
});
