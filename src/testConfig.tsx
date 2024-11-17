import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RenderHookResult, render, renderHook } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

// re-export everything
export * from '@testing-library/react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

// render wrapper with providers
const TestSuite = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
};

// render wrapper with with providers and initial routing
const TestSuiteWithRouting = ({ children, path }: PropsWithChildren<{ path: string }>) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[path]}>{children}</MemoryRouter>
    </QueryClientProvider>
  );
};

// override render method
const customRender = (ui: React.ReactElement, options?: Record<string, unknown>) =>
  render(ui, { wrapper: TestSuite, ...options });

// override render hook method
const customRenderHook = <T, P>(
  hook: () => T,
  options?: Record<string, unknown>
): RenderHookResult<T, P> => renderHook(hook, { wrapper: TestSuite, ...options });

const customRenderWithRouting = (
  ui: React.ReactElement,
  path: string,
  options?: Record<string, unknown>
) =>
  render(ui, {
    wrapper: () => <TestSuiteWithRouting path={path}>{ui}</TestSuiteWithRouting>,
    ...options,
  });

export { customRenderWithRouting, customRender as render, customRenderHook as renderHook };
