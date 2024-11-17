import { render, screen } from "../../../testConfig";
import { SignalRProvider } from "./SignalRProvider";

jest.mock("react-signalr", () => ({
  ...jest.requireActual("react-signalr"),
  createSignalRContext: () => ({
    ...jest.requireActual("react-signalr").createSignalRContext(),
    useSignalREffect: jest.fn(),
  }),
}));

describe("SignalRProvider Test", () => {
  test("renders SignalRProvider with children", () => {
    const mockChildren = <div>Mock Children</div>;
    render(<SignalRProvider>{mockChildren}</SignalRProvider>);

    expect(screen.getByText("Mock Children")).toBeInTheDocument();
  });

  test("renders SignalRProvider without children", () => {
    const { container } = render(<SignalRProvider />);
    expect(container.firstChild).toBeNull();
  });
});
