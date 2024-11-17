import { fireEvent, render, screen } from "@testing-library/react";
import { ModuleBase, testExport } from "../ModuleBase";
// import * as baseHooks from './hooks/useBase';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { HortiViewService } from "../services/HortiView/HortiViewService";
import { useConfigurationStore } from "../stores/ConfigurationStore";
import { BaseProps } from "../types/BaseTypes";

const mockAddTranslation = jest.fn();

//mock response for fetch Response

describe("ModuleBase", () => {
  const queryClient = new QueryClient();
  const customProps: BaseProps = {
    token: "",
    moduleId: "",
    modulePermissionToken: "",
    addNotification: jest.fn(),
    basePath: "",
    sourcePath: "",
    organizationId: "",
    config: null,
    navigateTo: jest.fn(),
    addTranslation: mockAddTranslation,
    currentNavigationPath: "",
    currentLanguage: "",
  };
  test("renders module base", () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ModuleBase props={customProps} routes={{}} />
        </QueryClientProvider>
      </BrowserRouter>,
    );
    expect(mockAddTranslation).toHaveBeenCalledTimes(4);
  });
  test("do not render and throw error, when config is undefined", () => {
    expect(() =>
      render(
        <QueryClientProvider client={queryClient}>
          <ModuleBase
            props={{ ...customProps }}
            requiredProps={["basePath", "config"]}
            routes={{}}
          />
        </QueryClientProvider>,
      ),
    ).toThrow(Error);
  });
  test("render when requiredProps are given", () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ModuleBase
            props={{
              ...customProps,
              basePath: "/path",
              config: {
                id: "test",
                module: "test",
                path: "test",
                scope: "test",
                shortName: "test",
              },
            }}
            requiredProps={["basePath", "config"]}
            routes={{}}
          />
        </QueryClientProvider>
      </BrowserRouter>,
    );
  });
  test("render when standalone is true", async () => {
    const instance = HortiViewService.initializeInstance(true, "token");

    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ModuleBase
            props={{ ...customProps, standalone: true }}
            requiredProps={["basePath", "config"]}
            routes={{}}
          />
        </QueryClientProvider>
      </BrowserRouter>,
    );
    //mock configstore

    expect(instance).toBeDefined();
    useConfigurationStore.setState({
      config: {
        environment: "test",
        api: {
          prefix: "test",
          common: "test",
          module: "test",
        },
      },
    });

    expect(
      await screen.findByText(
        "Currently running locally with standalone mode enabled",
      ),
    ).toBeInTheDocument();
  });
  test("close banner when onClosing is called", async () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ModuleBase
            props={{ ...customProps, standalone: true }}
            requiredProps={["basePath", "config"]}
            routes={{}}
          />
        </QueryClientProvider>
      </BrowserRouter>,
    );
    //mock configstore
    useConfigurationStore.setState({
      config: {
        environment: "test",
        api: {
          prefix: "test",
          common: "test",
          module: "test",
        },
      },
    });

    expect(
      await screen.findByText(
        "Currently running locally with standalone mode enabled",
      ),
    ).toBeInTheDocument();
    const banner = screen.getByRole("banner");
    expect(banner.classList).toContain("mdc-banner--opening");
    //find button by tag name
    // eslint-disable-next-line testing-library/no-node-access
    const button = document.querySelector('button[type="button"]');
    expect(button).toBeInTheDocument();
    fireEvent.click(button as Element);
    expect(banner).toHaveClass("mdc-banner--closing");
  });
});

describe("testLoading", () => {
  const queryClient = new QueryClient();
  beforeEach(() => {
    useConfigurationStore.setState({
      config: {
        environment: "test",
        api: {
          prefix: "",
          common: "test",
          module: "test",
        },
      },
    });
  });
  const customProps: BaseProps = {
    token: "",
    moduleId: "",
    modulePermissionToken: "",
    addNotification: jest.fn(),
    basePath: "",
    sourcePath: "",
    organizationId: "",
    config: null,
    navigateTo: jest.fn(),
    addTranslation: mockAddTranslation,
    currentNavigationPath: "",
    currentLanguage: "",
  };
  test("render loading when config is undefined", async () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ModuleBase props={{ ...customProps }} routes={{}} />
        </QueryClientProvider>
      </BrowserRouter>,
    );
    expect(await screen.findByText("common.loadingModule")).toBeInTheDocument();
  });
});

describe("Internal functions", () => {
  const customProps: BaseProps = {
    moduleId: "",
    modulePermissionToken: "",
    addNotification: jest.fn(),
    token: "",
    basePath: "",
    sourcePath: "",
    organizationId: "",
    config: null,
    navigateTo: jest.fn(),
    addTranslation: mockAddTranslation,
    currentNavigationPath: "",
    currentLanguage: "",
  };
  test("checkPropsExist should throw error when required prop is missing", () => {
    expect(() =>
      testExport.checkIfPropExists("config", customProps),
    ).toThrowError();
  });

  test("checkPropsExist should not throw error when required prop is present", () => {
    expect(() =>
      testExport.checkIfPropExists("basePath", {
        ...customProps,
        basePath: "/path",
      }),
    ).not.toThrowError();
  });
});
