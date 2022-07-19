import React from 'react';

import Seo from './Seo';
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

describe('<Seo />', () => {
  it('has valid snapshot', () => {
    const { asFragment } = render(<Seo />);
    expect(asFragment()).toMatchSnapshot();
  });
});
