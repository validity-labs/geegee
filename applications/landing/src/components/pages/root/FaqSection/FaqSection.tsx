import { Fragment, useState } from 'react';

import { Accordion, AccordionDetails, AccordionSummary, Container, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import Arrow from './Arrow';
import Header from '@/components/general/Header/Header';
import Section, { SectionProps } from '@/components/layouts/Section/Section';
import { usePageTranslation } from '@/context/AppContext';
import { FAQGroup } from '@/typings/app';

const Root = styled(Section)(({ theme }) => ({
  '.MuiAccordion-root': {
    background: 'transparent',
  },
  '.MuiAccordionSummary-content': {
    margin: 'auto',
    paddingLeft: 30,
    fontSize: 20,
  },
  '.MuiAccordionDetails-root': {
    padding: '30px 45px 65px 45px',
  },
  '.MuiAccordionSummary-root': {
    background: 'transparent',
    color: theme.palette.common.white,
    borderRadius: 22,
    border: `1px solid ${theme.palette.common.white}`,
    height: 90,
    '& .MuiAccordionSummary-expandIconWrapper': {
      width: 25,
      transform: 'rotate(180deg)',
      transitionTimingFunction: 'ease-in-out',
      margin: 20,
      '&.Mui-expanded': {
        transform: 'rotate(0deg)',
      },
    },
  },
  '.LabFAQSection-title': {
    color: theme.palette.common.white,
  },
  '.LabFAQSection-content': {
    color: theme.palette.common.white,
  },
  '.LabFAQSection-faqCategories': {
    color: theme.palette.common.white,
    fontFamily: 'Audiowide, cursive',
    fontSize: 14,
  },
  '.LabFAQSection-groupTitle': {
    padding: theme.spacing(7, 0, 0, 7),
    color: theme.palette.common.white,
    textTransform: 'uppercase',
    textAlign: 'start',
    cursor: 'pointer',
  },
  [theme.breakpoints.up('md')]: {
    '.LabFAQSection-groupTitle': {
      padding: theme.spacing(7, 0, 0, 0),
      textAlign: 'end',
    },
  },
}));

interface Props extends SectionProps {
  has?: {
    header?: boolean;
  };
  groups: FAQGroup[];
}

export default function FAQSection({ has: { header = true } = {}, groups, ...restOfProps }: Props) {
  const t = usePageTranslation({ keyPrefix: 'faq-section' });
  const [category, setCategory] = useState('platform');

  return (
    <Root {...restOfProps}>
      <Container maxWidth="lg">
        {header && <Header title={t('title')} className="LabFAQSection-title" />}
        <Grid container rowSpacing={{ xs: 10, md: 30 }} columnSpacing={10}>

          <Grid item xs={12} md={2}>
            <Typography variant="body" className="LabFAQSection-faqCategories">
              {t(`categories`)}
            </Typography>

            {groups.map(({ key }) => (
              <Typography key={key} onClick={() => setCategory(key)} variant="body-sm" component="h2" className="LabFAQSection-groupTitle">
                {t(`${key}.title`)}
              </Typography>
            ))}
          </Grid>

          <Grid item xs={12} md={10}>
            {groups.map(({ key, count }, groupIndex) => (
              <Fragment key={key}>
                {new Array(count).fill(null).map((_id, index) => (
                  /* @ts-ignore - for some reason component prop is not defined */
                  <Accordion key={index} component="article" defaultExpanded={groupIndex === 0 && index === 0} style={key === category ? { display: 'inherit' } : { display: 'none' }}>
                    <AccordionSummary
                      aria-controls={`panel-content-${groupIndex + 1}-${index + 1}`}
                      id={`panel-header-${groupIndex + 1}-${index + 1}`}
                      expandIcon={<Arrow />}
                    >
                      {t(`${key}.items.${index}.title`)}
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className="LabFAQSection-content" variant="body-sm">{t(`${key}.items.${index}.content`)}</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Fragment>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Root>
  );
}
