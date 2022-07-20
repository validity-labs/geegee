import React from 'react';

import LanguageSwitch from './LanguageSwitch';
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

describe('<LanguageSwitch />', () => {
  it('has valid snapshot', () => {
    const { asFragment } = render(<LanguageSwitch />);
    expect(asFragment()).toMatchSnapshot();
  });
});
