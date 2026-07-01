import { render, screen } from "@testing-library/react";
import CreatePage from "./createPage";
import { useParams } from "react-router-dom";

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useParams: jest.fn(),
  };
});

jest.mock("./indicador/CreateIndicador.tsx", () => ({
  CreateIndicador: () => <div>indicador-form</div>,
}));

jest.mock("./referencias/CreateReferência.tsx", () => ({
  __esModule: true,
  default: () => <div>referencias-form</div>,
}));

jest.mock("./estudos_complementares/createEstudosComplementares.tsx", () => ({
  __esModule: true,
  default: () => <div>estudos-form</div>,
}));

jest.mock("./kml/CreateKml.tsx", () => ({
  __esModule: true,
  default: () => <div>kml-form</div>,
}));

describe("CreatePage", () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({
      dimensao: "saude",
      activeTab: "referencias",
      elementName: undefined,
    });
  });

  it("renders the references form for lowercase route tab values", () => {
    render(<CreatePage />);

    expect(screen.getByText("referencias-form")).toBeInTheDocument();
  });
});
