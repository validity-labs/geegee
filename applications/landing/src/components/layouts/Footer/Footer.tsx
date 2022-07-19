import React, { ReactElement } from 'react';

import Image from 'next/image';
import { useTranslation } from 'next-i18next';

// import { useMatomo } from '@datapunt/matomo-tracker-react';
import { Box, Container, /* IconButton, Link as MuiLink, */ Typography /* TypographyProps */ } from '@mui/material';
import { styled } from '@mui/material/styles';

import Link from '@/components/general/Link/Link';
import ScrollUp from '@/components/layouts/ScrollUp/ScrollUp';
import { footerLinks } from '@/libs/menu';
import logoImage from '@/public/images/logo-small.svg';

// const TopSection = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'row',
//   alignItems: 'center',
//   color: theme.palette.text.contrast,
//   backgroundColor: theme.palette.background.darker,

// }));

const BottomSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  minHeight: 70,
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.darker,
  padding: theme.spacing(0, 0, 6),
}));

// const DIV = styled('div');
const UL = styled('ul');

// const Wrapper = DIV(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   position: 'relative',
//   padding: theme.spacing(24, 0, 19),
//   [theme.breakpoints.up('md')]: {
//     flexDirection: 'row',
//   },
// }));

// const WrapperChildLeft = DIV({
//   flex: 4,
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'flex-start',
// });

// const WrapperChildRight = DIV({
//   flex: 8,
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'flex-end',
// });

// const Columns = DIV({
//   display: 'flex',
//   flexDirection: 'row',
//   justifyContent: 'flex-start',
//   alignItems: 'flex-start',
//   flexWrap: 'wrap',
// });

// const ColumnList = UL(({ theme }) => ({
//   padding: theme.spacing(0, 16, 10, 0),
//   '& > li': {
//     padding: theme.spacing(0, 0, 6),
//     '& a, & p': { display: 'block' },
//   },
//   '& > li:last-of-type': {
//     padding: theme.spacing(0, 0, 0),
//   },
// }));

const RowList = UL(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  alignItems: 'center',
  '& > li': {
    display: 'inline-block',
    margin: theme.spacing(6, 0, 0, 12),
  },
  '& a, & p': {
    display: 'block',
  },
}));

// interface CaptionProps extends Omit<TypographyProps, 'children'> {
//   text: React.ReactNode;
// }
// const Caption = ({ text: children, ...props }: CaptionProps) => (
//   <li>
//     <Typography variant="body-xs" color="inherit" sx={{ fontWeight: 700 }} {...props}>
//       {children}
//     </Typography>
//   </li>
// );
export default function Footer(): ReactElement {
  const { t } = useTranslation();
  // const { trackEvent } = useMatomo();
  const copyright = t('footer.copyright', { year: new Date().getFullYear() });

  return (
    <footer>
      {/* <TopSection>
        <Container>
          <Box sx={{ position: 'relative' }}>
            <ScrollUp />
            <Wrapper>
              <WrapperChildLeft>
                <ColumnList sx={{ mr: 10 }}>
                  <Caption text={t('footer.info.title')} />
                  <li>
                    <Typography
                      component={MuiLink}
                      href={t('footer.info.address-url')}
                      rel="noopener noreferrer"
                      variant="body-xs"
                      color="inherit"
                      sx={{ lineHeight: 2, whiteSpace: 'pre-line' }}
                    >
                      {t('footer.info.address')}
                    </Typography>
                  </li>
                  <li>
                    <Typography
                      component={MuiLink}
                      href={`tel:${t('footer.info.phone')}`}
                      rel="noopener noreferrer"
                      variant="body-xs"
                      color="inherit"
                    >
                      <strong>{t('footer.info.phone-prefix')}</strong>
                      {t('footer.info.phone')}
                    </Typography>
                  </li>
                </ColumnList>
              </WrapperChildLeft>
              <WrapperChildRight>
                <Columns>
                  {footerLinks.rest.map(({ key, items }) => (
                    <ColumnList key={key}>
                      <Caption text={t(`footer.${key}.title`)} />
                      {items.map(({ key: itemKey, url: itemUrl }) => (
                        <li key={itemKey}>
                          <Typography component={Link} href={itemUrl} variant="body-xs" color="inherit">
                            {t(`footer.${key}.${itemKey}`)}
                          </Typography>
                        </li>
                      ))}
                    </ColumnList>
                  ))}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    {footerLinks.community.map(({ key, url, Icon }) => (
                      <Box key={key}>
                        <IconButton
                          component={Link}
                          onClick={() => trackEvent({ category: 'footer', action: t(`footer.community.${key}`) })}
                          href={url}
                          color="inherit"
                          title={t(`footer.community.${key}`)}
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid currentColor',
                            width: 38,
                            height: 38,
                            mr: 2,
                            svg: {
                              fontSize: '22px',
                            },
                          }}
                        >
                          <Icon />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
                </Columns>
              </WrapperChildRight>
            </Wrapper>
          </Box>
        </Container>
      </TopSection> */}
      <BottomSection>
        <Container
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: ['column', 'column', 'row'],
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <ScrollUp />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mt: 6,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', width: 25, mr: 4 }}>
              <Image src={logoImage} alt="" placeholder="empty" />
            </Box>
            <Typography variant="body-xs" color="inherit">
              {copyright}
            </Typography>
          </Box>
          <RowList>
            {footerLinks.general.map(({ key, url }) => (
              <li key={key}>
                <Typography component={Link} href={url} download target="_blank" variant="body-xs" color="inherit">
                  {t(`footer.common.${key}`)}
                </Typography>
              </li>
            ))}
          </RowList>
        </Container>
      </BottomSection>
    </footer>
  );
}
