import React from 'react';

import FieldError from './FieldError';
import { cleanup, render } from '@/testing/utils';

afterEach(cleanup);

describe('<FieldError />', () => {
  it('has valid snapshot', () => {
    const { asFragment } = render(<FieldError id="firstName" message="First name is required" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
