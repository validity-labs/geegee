import React from 'react';

import CardsSection from './CardsSection';
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

describe('<CardsSection />', () => {
  it('has valid snapshot', () => {
    const { asFragment } = render(<CardsSection />);
    expect(asFragment()).toMatchSnapshot();
  });
});
