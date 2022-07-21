import React from 'react';

import InfoSection from './InfoSection';
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

describe('<InfoSection />', () => {
  it('has valid snapshot', () => {
    const { asFragment } = render(<InfoSection />);
    expect(asFragment()).toMatchSnapshot();
  });
});
