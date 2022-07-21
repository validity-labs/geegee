import { Fragment } from 'react';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Accordion, AccordionDetails, AccordionSummary, Container, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import Header from '@/components/general/Header/Header';
import Section, { SectionProps } from '@/components/layouts/Section/Section';
import { usePageTranslation } from '@/context/AppContext';
import { FAQGroup } from '@/typings/app';

const Root = styled(Section)(({ theme }) => ({
  '.MuiAccordionSummary-root': {
    '& .MuiAccordionSummary-expandIconWrapper': {
      borderRadius: '100%',
      transform: 'rotate(90deg)',
      transitionTimingFunction: 'ease-in-out',
      background: theme.palette.background.light,
      svg: {
        fontSize: '52px',
        color: theme.palette.common.white,
      },
      '&.Mui-expanded': {
        transform: 'rotate(0deg)',
        svg: {
          path: {
            // import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
            d: 'path("M18 13H6c-.55 0-1-.45-1-1s.45-1 1-1h12c.55 0 1 .45 1 1s-.45 1-1 1z")',
          },
        },
      },
    },
  },
  '.LabFAQSection-groupTitle': {
    padding: theme.spacing(7, 0, 0, 7),
    color: theme.palette.text.contrast,
    textTransform: 'uppercase',
    textAlign: 'start',
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

  return (
    <Root {...restOfProps}>
      <Container maxWidth="lg">
        {header && <Header title={t('faq-section.title')} />}
        <Grid container rowSpacing={{ xs: 10, md: 30 }} columnSpacing={10}>
          {groups.map(({ key, count }, groupIndex) => (
            <Fragment key={key}>
              <Grid item xs={12} md={2}>
                <Typography variant="body-sm" component="h2" className="LabFAQSection-groupTitle">
                  {t(`faq-section.${key}.title`)}
                </Typography>
              </Grid>
              <Grid item xs={12} md={10}>
                {new Array(count).fill(null).map((_id, index) => (
                  /* @ts-ignore - for some reason component prop is not defined */
                  <Accordion key={index} component="article" defaultExpanded={groupIndex === 0 && index === 0}>
                    <AccordionSummary
                      aria-controls={`panel-content-${groupIndex + 1}-${index + 1}`}
                      id={`panel-header-${groupIndex + 1}-${index + 1}`}
                      expandIcon={<AddRoundedIcon />}
                    >
                      {t(`faq-section.${key}.items.${index}.title`)}
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body-sm">{t(`faq-section.${key}.items.${index}.content`)}</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Grid>
            </Fragment>
          ))}
        </Grid>
      </Container>
    </Root>
  );
}
