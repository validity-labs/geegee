import React from 'react';

import { Formik } from 'formik';

import FieldCheckbox from './FieldCheckbox';
import { cleanup, render } from '@/testing/utils';

afterEach(cleanup);

describe('<FieldCheckbox />', () => {
  it('has valid snapshot', () => {
    const { asFragment } = render(
      <Formik initialValues={{ test: '' }} onSubmit={() => {}}>
        <FieldCheckbox name="test" required label="Checkbox Label" />
      </Formik>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
