import React from 'react';

import QuoteSection from './QuoteSection';
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

describe('<QuoteSection />', () => {
  it('has valid snapshot', () => {
    const { asFragment } = render(<QuoteSection items={['/image.jpg']} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
