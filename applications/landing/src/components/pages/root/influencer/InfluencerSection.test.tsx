import React from 'react';

import InfluencerSection from './InfluencerSection';
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

describe('<InfluencerSection />', () => {
  it('has valid snapshot', () => {
    const { asFragment } = render(<InfluencerSection />);
    expect(asFragment()).toMatchSnapshot();
  });
});
