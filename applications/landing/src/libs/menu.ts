// import InstagramIcon from '@mui/icons-material/Instagram';
import { MenuItemType } from '@/typings/app';

export const headerLinks: MenuItemType[] = [
  // {
  //   type: 'group',
  //   key: 'products',
  //   items: [
  //     { type: 'internal', key: 'kyc-and-aml', url: '/products/kyc-and-aml' },
  //     { type: 'internal', key: 'liquidation', url: '/products/liquidation' },
  //     { type: 'internal', key: 'non-custodian-wallet', url: '/products/non-custodian-wallet' },
  //   ],
  // },
  // {
  //   type: 'group',
  //   key: 'services',
  //   items: [
  //     { type: 'internal', key: 'training-courses', url: '/trainings' },
  //     { type: 'internal', key: 'platform-development', url: '/services/platform-development' },
  //     { type: 'internal', key: 'smart-contract-development', url: '/services/smart-contract-development' },
  //     { type: 'internal', key: 'nft-events', url: '/services/nft-events' },
  //     { type: 'internal', key: 'forensic-services', url: '/services/forensic-services' },
  //   ],
  // },
  // {
  //   type: 'group',
  //   key: 'company',
  //   items: [
  //     { type: 'internal', key: 'about-us', url: '/about' },
  //     { type: 'internal', key: 'careers', url: '/careers' },
  //     // { type: 'internal', key: 'ecosystem', url: '/ecosystem' },
  //     { type: 'internal', key: 'ventures', url: '/ventures' },
  //   ],
  // },
  {
    type: 'internal',
    key: 'platform',
    url: '#platform',
  },
  {
    type: 'internal',
    key: 'faqs',
    url: '#faqs',
  },
  {
    type: 'internal',
    key: 'contact',
    url: '#contact',
  },
  {
    type: 'internal',
    key: 'onboarding',
    url: '/account/onboarding',
  },
];

export const footerLinks = {
  // community: [
  //   {
  //     key: 'facebook',
  //     url: 'https://www.facebook.com/validitylabs',
  //     Icon: FacebookIcon,
  //   },
  //   {
  //     key: 'twitter',
  //     url: 'https://twitter.com/validitylabs',
  //     Icon: TwitterIcon,
  //   },
  //   {
  //     key: 'linkedin',
  //     url: 'https://www.linkedin.com/company/10630245',
  //     Icon: LinkedInIcon,
  //   },
  //   {
  //     key: 'youtube',
  //     url: 'https://www.youtube.com/channel/UCe5eOj2phcY4MJ9V5WrL2lA',
  //     Icon: YouTubeIcon,
  //   },
  //   // {
  //   //   key: 'instagram',
  //   //   url: 'https://www.instagram.com/validitylabs/',
  //   //   Icon: InstagramIcon,
  //   // },
  // ],
  general: [
    {
      key: 'privacy',
      url: '/downloads/privacy-policy.pdf',
    },
    {
      key: 'terms',
      url: '/downloads/terms-of-conditions.pdf',
    },
  ],
  // rest: [
  //   // {
  //   //   key: 'products',
  //   //   items: [
  //   //     { key: 'kyc-and-aml', url: '/products/kyc-and-aml' },
  //   //     { key: 'liquidation', url: '/products/liquidation' },
  //   //     { key: 'non-custodian-wallet', url: '/products/non-custodian-wallet' },
  //   //   ],
  //   // },
  //   {
  //     key: 'services-and-trainings',
  //     items: [
  //       { key: 'platform-development', url: '/services/platform-development' },
  //       { key: 'smart-contract-development', url: '/services/smart-contract-development' },
  //       { key: 'nft-events', url: '/services/nft-events' },
  //       { key: 'forensic-services', url: '/services/forensic-services' },
  //       // { key: 'training-courses', url: '/trainings' },
  //     ],
  //   },
  //   {
  //     key: 'company',
  //     items: [
  //       { key: 'about-us', url: '/about' },
  //       { key: 'careers', url: '/careers' },
  //       { key: 'ventures', url: '/ventrues' },
  //       { key: 'blog', url: '/blog' },
  //     ],
  //   },
  //   // {
  //   //   key: 'contact',
  //   //   items: [
  //   //     { key: 'talk-to-expert', url: '/talk-to-expert' },
  //   //     { key: 'book-demo', url: '/book-demo' },
  //   //     { key: 'press', url: '/press' },
  //   //     { key: 'partnership', url: '/partnership' },
  //   //     { key: 'investor', url: '/investor' },
  //   //   ],
  //   // },
  // ],
};
