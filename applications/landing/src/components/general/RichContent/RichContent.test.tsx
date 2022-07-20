import React from 'react';

import RichContent from './RichContent';
import contentWithHtml from '@/fixtures/common';
import { cleanup, render } from '@/testing/utils';

afterEach(cleanup);

describe('<RichContent />', () => {
  it('has valid snapshot', () => {
    const { asFragment } = render(<RichContent dangerousHtml={contentWithHtml('RichContent')} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
