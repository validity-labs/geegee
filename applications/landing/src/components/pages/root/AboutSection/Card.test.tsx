import React from 'react';

import Card from './Card';
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

describe('<Card />', () => {
  it('has valid snapshot', () => {
    const { asFragment } = render(<Card i18nKey="about-section" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
