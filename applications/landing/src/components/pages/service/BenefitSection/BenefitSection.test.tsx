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
    const benefitItems = ['benefit1.svg', 'benefit2.svg', 'benefit3.svg', 'benefit4.svg'];

    const { asFragment } = render(<BenefitSection items={benefitItems} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
