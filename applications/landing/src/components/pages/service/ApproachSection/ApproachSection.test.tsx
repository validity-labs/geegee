import React from 'react';

import ApproachSection from './ApproachSection';
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

describe('<ApproachSection />', () => {
  it('has valid snapshot', () => {
    const { asFragment } = render(<ApproachSection />);
    expect(asFragment()).toMatchSnapshot();
  });
});
