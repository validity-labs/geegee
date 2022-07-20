import React from 'react';

import Layout from './Layout';
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

describe('<Layout />', () => {
  it('has valid snapshot', () => {
    const { asFragment } = render(
      <Layout>
        <></>
      </Layout>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
