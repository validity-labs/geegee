import React from 'react';

import LoadingText from './LoadingText';
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

describe('<LoadingText />', () => {
  it('has valid snapshot', () => {
    const { asFragment } = render(<LoadingText loading={true} text="Lorem"></LoadingText>);
    expect(asFragment()).toMatchSnapshot();
  });
});
