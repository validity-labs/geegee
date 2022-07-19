import React from 'react';

import TeamSection from './TeamSection';
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

describe('<TeamSection />', () => {
  it('has valid snapshot', () => {
    const teamItems = [{ url: '/images/pages/about/team/member1.jpg' }];
    const { asFragment } = render(<TeamSection items={teamItems} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
