import React from 'react';

import { Formik } from 'formik';

import FieldInput from './FieldInput';
import { cleanup, render } from '@/testing/utils';

afterEach(cleanup);

describe('<FieldInput />', () => {
  it('has valid snapshot', () => {
    const { asFragment } = render(
      <Formik initialValues={{ test: '' }} onSubmit={() => {}}>
        <FieldInput name="test" required label="Input Label" />
      </Formik>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
