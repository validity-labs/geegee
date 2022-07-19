import React from 'react';

import ValueSection from './ValueSection';
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

describe('<ValueSection />', () => {
  it('has valid snapshot', () => {
    const { asFragment } = render(<ValueSection items={[1, 2, 3, 4]} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
