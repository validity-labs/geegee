import React from 'react';

import AboutSection from './AboutSection';
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

describe('<AboutSection />', () => {
  it('has valid snapshot', () => {
    const { asFragment } = render(<AboutSection />);
    expect(asFragment()).toMatchSnapshot();
  });
});
