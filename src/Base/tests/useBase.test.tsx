import { render, renderHook } from "../../testConfig";
import { useNavigate } from "react-router-dom";
import { useRoute } from "../hooks/useBase";
import { ModuleBase } from "../ModuleBase";
import { BaseProps } from "../types/BaseTypes";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useLocation: () => {
    return {
      pathname: "/farm/dashboard",
    };
  },
}));
const mockAddTranslation = jest.fn();
const mockNavigateTo = jest.fn();

describe("useBase", () => {
  const customProps: BaseProps = {
    token: "",
    moduleId: "",
    modulePermissionToken: "",
    addNotification: jest.fn(),
    basePath: "",
    sourcePath: "",
    organizationId: "",
    config: null,
    navigateTo: mockNavigateTo,
    addTranslation: mockAddTranslation,
    currentNavigationPath: "/somePath",
    currentLanguage: "",
    standalone: true,
  };
  test("useRouting standalone", () => {
    render(<ModuleBase props={customProps} routes={{}} />);
    const navigate = renderHook(() => useNavigate());
    navigate.result.current("/path");
    expect(mockNavigate).toHaveBeenCalledWith("/path");
  });

  test("useRouting not standalone", () => {
    render(
      <ModuleBase props={{ ...customProps, standalone: false }} routes={{}} />,
    );
    const navigate = renderHook(() => useNavigate());
    navigate.result.current("/path");
    expect(mockNavigate).toHaveBeenCalledWith("/somePath");
    expect(mockNavigateTo).toHaveBeenCalledWith("/path");
  });

  test("useRouting not standalone with currentNavigationPath", () => {
    render(
      <ModuleBase
        props={
          {
            ...customProps,
            standalone: false,
            currentNavigationPath: undefined,
          } as unknown as BaseProps
        }
        routes={{}}
      />,
    );
    const navigate = renderHook(() => useNavigate());
    navigate.result.current("/path");
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(mockNavigateTo).toHaveBeenCalledWith("/path");
  });

  //useRoute
  test("useRoute", () => {
    render(<ModuleBase props={customProps} routes={{}} />);
    const { result } = renderHook(() => useRoute("/path"));
    expect(result.current).toBe("/path");
  });
});
