import React from 'react';

import QuoteCard from './QuoteCard';
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

describe('<QuoteCard />', () => {
  it('has valid snapshot', () => {
    const { asFragment } = render(<QuoteCard item={'/image.jpg'} index={1} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
