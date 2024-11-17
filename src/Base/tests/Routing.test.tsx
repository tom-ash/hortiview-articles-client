import { customRenderWithRouting, screen } from '../../testConfig';
import { Routing } from '../routing/Routing';
import { RouteConfig } from '../types/BaseTypes';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Routing', () => {
  test('Should render the routes with the basepath as prefix', async () => {
    const basePath = '/base';
    const routes: RouteConfig[] = [
      { path: '/path1', element: <div>Path1</div> },
      { path: '/path2', element: <div>Path2</div> },
    ];
    customRenderWithRouting(<Routing basePath={basePath} routes={routes} />, '/base/path1');
    expect(screen.getByText('Path1')).toBeInTheDocument();
    const path2 = screen.queryByText('Path2');
    expect(path2).not.toBeInTheDocument();
  });

  test('Should navigate to the correct path', async () => {
    const basePath = '/base';
    const routes: RouteConfig[] = [
      { path: '/path1', element: <div>Path1</div> },
      { path: '/path2', element: <div>Path2</div> },
    ];
    customRenderWithRouting(<Routing basePath={basePath} routes={routes} />, '/base/path2');
    expect(screen.getByText('Path2')).toBeInTheDocument();
    const path1 = screen.queryByText('Path1');
    expect(path1).not.toBeInTheDocument();
  });

  test('should not navigate to path3 because this route doesnt exist', async () => {
    const basePath = '/base';
    const routes: RouteConfig[] = [
      { path: '/path1', element: <div>Path1</div> },
      { path: '/path2', element: <div>Path2</div> },
      { path: '/otherpath', element: <div>Path3</div> },
    ];
    customRenderWithRouting(<Routing basePath={basePath} routes={routes} />, '/base/path3');
    const path3 = screen.queryByText('Path3');
    expect(path3).not.toBeInTheDocument();
  });
});
