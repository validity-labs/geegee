import React from 'react';

import Drawer from './Drawer';
import nextUseRouterMock from '@/mocks/nextUseRouterMock';
import { cleanup, render } from '@/testing/utils';

beforeAll(() => {
  nextUseRouterMock({
    route: '/',
    pathname: '/',
    query: '',
    asPath: '',
  });
});

afterEach(cleanup);

describe('<Drawer />', () => {
  it('has valid snapshot', async () => {
    const { baseElement, findByText } = render(<Drawer open={true} toggle={() => {}} />);
    await findByText('menu.service.title');
    expect(baseElement).toMatchSnapshot();
  });
});
