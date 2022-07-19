import React from 'react';

import BookSection from './BookSection';
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

describe('<BookSection />', () => {
  it('has valid snapshot', () => {
    const { asFragment } = render(<BookSection />);
    expect(asFragment()).toMatchSnapshot();
  });
});
