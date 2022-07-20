import React from 'react';

import Header from './Header';
import nextUseRouterMock from '@/mocks/nextUseRouterMock';
import { cleanup, render } from '@/testing/utils';

jest.mock('@/context/AppContext', () => ({
  useApp: () => ({
    contactHref: '/',
    header: {},
  }),
}));

beforeAll(() => {
  nextUseRouterMock({
    route: '/',
    pathname: '/',
    query: '',
    asPath: '',
  });
});

afterEach(cleanup);

describe('<Header />', () => {
  it('has valid snapshot', () => {
    const { asFragment } = render(<Header />);
    expect(asFragment()).toMatchSnapshot();
  });
});
