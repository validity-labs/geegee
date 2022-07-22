import React, { ReactElement } from 'react';

import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import { Container, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import Link from '@/components/general/Link/Link';
import ScrollUp from '@/components/layouts/ScrollUp/ScrollUp';
import { footerLinks } from '@/libs/menu';
import iconDiscord from '@/public/images/discord.svg';
import iconGithub from '@/public/images/github.svg';
import iconTwitter from '@/public/images/twitter.svg';

const Root = styled('footer')(({ theme }) => ({
  '.LabFooter-wrapper': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: theme.spacing(14),
    padding: theme.spacing(15, 0, 15),
    color: '#c4c4c4',
  },
  '.LabFooter-left': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: theme.spacing(14),
    p: {
      ...theme.typography.h6,
      fontSize: '0.875rem', // 14px
    },
    // transition: 'color 0.4s',
    // 'a:hover': {
    //   color: theme.palette.text.active,
    //   transition: 'color 0.4s ease-out',
    // },
  },
  '.LabFooter-social': {
    display: 'flex',
    alignItems: 'center',
    a: {
      padding: theme.spacing(2),
    },
  },
  [theme.breakpoints.up('md')]: {
    '.LabFooter-wrapper': {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  },
}));

const RowList = styled('ul')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: theme.spacing(6),
  '& > li': {
    display: 'inline-block',
    // margin: theme.spacing(6, 0, 0, 12),
  },
  '& a, & p': {
    display: 'block',
    ...theme.typography.h6,
    fontSize: '0.875rem', // 14px
    padding: theme.spacing(3),
  },
}));

export default function Footer(): ReactElement {
  const { t } = useTranslation();
  const copyright = t('footer.copyright', { year: new Date().getFullYear() });

  return (
    <Root>
      <Container id="contact">
        <div className="LabFooter-wrapper">
          <ScrollUp />
          <div className="LabFooter-left">
            <Typography variant="body-sm" color="inherit">
              {copyright}
            </Typography>
            <div className="LabFooter-social" >
              <IconButton href="/" target="_blank" component={Link}>
                <Image src={iconDiscord} alt="Discord" />
              </IconButton>
              <IconButton href="/" target="_blank" component={Link}>
                <Image src={iconGithub} alt="Github" />
              </IconButton>
              <IconButton href="/" target="_blank" component={Link}>
                <Image src={iconTwitter} alt="Twitter" />
              </IconButton>
            </div>
          </div>
          <RowList>
            {footerLinks.general.map(({ key, url }) => (
              <li key={key}>
                <Typography component={Link} href={url} download target="_blank" variant="body-sm" color="inherit">
                  {t(`footer.common.${key}`)}
                </Typography>
              </li>
            ))}
          </RowList>
        </div>
      </Container>
    </Root>
  );
}
