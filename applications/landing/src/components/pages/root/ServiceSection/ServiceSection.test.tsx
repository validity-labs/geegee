import React from 'react';

import ServiceSection from './ServiceSection';
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

describe('<ServiceSection />', () => {
  it('has valid snapshot', () => {
    const { asFragment } = render(<ServiceSection />);
    expect(asFragment()).toMatchSnapshot();
  });
});
