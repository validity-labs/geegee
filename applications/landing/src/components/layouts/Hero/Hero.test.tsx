import React from 'react';

import Hero from './Hero';
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

describe('<Hero />', () => {
  it('has valid snapshot', () => {
    const { asFragment } = render(
      <Hero>
        <></>
      </Hero>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
