import React from 'react';

import GallerySection from './GallerySection';
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

describe('<GallerySection />', () => {
  it('has valid snapshot', () => {
    const teamGalleryItems = [
      {
        url: '/images/pages/about/gallery/test1.jpg',
      },
      {
        url: '/images/pages/about/gallery/test2.jpg',
      },
      {
        url: '/images/pages/about/gallery/test3.jpg',
      },
      {
        url: '/images/pages/about/gallery/test4.jpg',
      },
    ];
    const { asFragment } = render(<GallerySection items={teamGalleryItems} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
