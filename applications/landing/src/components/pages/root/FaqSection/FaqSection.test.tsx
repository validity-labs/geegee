import React from 'react';

import FaqSection from './FaqSection';
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

describe('<FaqSection />', () => {
  it('has valid snapshot', () => {
    const { asFragment } = render(<FaqSection />);
    expect(asFragment()).toMatchSnapshot();
  });
});
