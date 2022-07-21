// import React from 'react';

// import FAQSection from './FaqSection';
// import faqGroupInfo from '@/fixtures/common';
// import nextUseRouterMock from '@/mocks/nextUseRouterMock';
// import { cleanup, render } from '@/testing/utils';

// beforeAll(() => {
//   nextUseRouterMock({
//     route: '/faq',
//     pathname: '/',
//     query: '',
//     asPath: '',
//   });
// });

// afterEach(cleanup);

// describe('<FAQSection />', () => {
//   it('has valid snapshot', () => {
//     const { asFragment } = render(<FAQSection groups={faqGroupInfo} />, {}, 'faq');
//     expect(asFragment()).toMatchSnapshot();
//   });
// });
