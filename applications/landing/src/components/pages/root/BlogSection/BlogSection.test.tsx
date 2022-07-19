import React from 'react';

import BlogSection from './BlogSection';
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

describe('<BlogSection />', () => {
  it('has valid snapshot', () => {
    const blogItems = [
      {
        url: '/blog1',
        poster: '/images/pages/landing/blog/poster1.jpg',
      },
      {
        url: '/blog2',
        poster: '/images/pages/landing/blog/poster2.jpg',
      },
      {
        url: '/blog3',
        poster: '/images/pages/landing/blog/poster3.jpg',
      },
    ];
    const { asFragment } = render(<BlogSection items={blogItems} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
