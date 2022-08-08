import React from 'react';

import { Formik } from 'formik';

import FieldDatePicker from './FieldDatePicker';
import { cleanup, render } from '@/testing/utils';

afterEach(cleanup);

describe('<FieldDatePicker />', () => {
  it('has valid snapshot', () => {
    const { asFragment } = render(
      <Formik initialValues={{ date: '' }} onSubmit={() => {}}>
        <FieldDatePicker name="date" />
      </Formik>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
