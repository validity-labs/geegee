import React from 'react';

import Modal from './Modal';
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

describe('<Modal />', () => {
  it('has valid snapshot', () => {
    const { asFragment } = render(
      <Modal id="test" title="Test" open={true} close={() => { }}>
        Test
      </Modal>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
