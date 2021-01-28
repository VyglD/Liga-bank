import React from "react";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import PrimeHeader from "./prime-header";

test(`renders learn react link`, () => {
  render(<PrimeHeader
    toast={() => {}}
  />);
  const linkElement = screen.getByText(/Конвертер валют/i);
  expect(linkElement).toBeInTheDocument();
});
