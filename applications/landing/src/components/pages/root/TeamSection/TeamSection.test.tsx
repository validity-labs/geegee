import React from 'react';

import TeamSection from './TeamSection';
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

describe('<TeamSection />', () => {
  it('has valid snapshot', () => {
    const { asFragment } = render(<TeamSection />);
    expect(asFragment()).toMatchSnapshot();
  });
});
