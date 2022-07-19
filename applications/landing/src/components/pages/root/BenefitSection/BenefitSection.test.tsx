import React from 'react';

import BenefitSection from './BenefitSection';
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

describe('<BenefitSection />', () => {
  it('has valid snapshot', () => {
    const { asFragment } = render(<BenefitSection />);
    expect(asFragment()).toMatchSnapshot();
  });
});
