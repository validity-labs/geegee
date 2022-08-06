// import { useCallback } from 'react';

import { useRouter } from 'next/router';

//
// import { useMatomo } from '@datapunt/matomo-tracker-react';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { /* Button, */ Box, Container, Typography } from '@mui/material';
import { styled/* , useTheme */ } from '@mui/material/styles';

// import CardsSection from './cards/CardsSection';
// import InfluencerSection from './influencer/InfluencerSection';
// import Hero from '@/components/layouts/Hero/Hero';
import Section from '@/components/layouts/Section/Section';
import { usePageTranslation } from '@/context/AppContext';
// import coverImage from '@/public/images/account/onboarding/cover.svg';

const Root = styled(Section)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(40.5, 0, 30),
  '.LabProfileSection-panel': {
    backgroundColor: theme.palette.background.main,
    borderRadius: +theme.shape.borderRadius * 4,
    boxShadow: '0px 3px 6px #FD00FD',
    padding: theme.spacing(18.5, 17, 11),
  },
  '.LabProfileSection-pretitle': {
    marginBottom: theme.spacing(10),
    textTransform: 'uppercase',
  },
  '.LabProfileSection-title': {
    marginBottom: theme.spacing(10),
  },
  '.LabProfileSection-cta': {
    borderWidth: 2,
    maxWidth: 388,
    width: '100%',
    '&:hover': {
      borderWidth: 2,
    },
  },
}));

const ProfileSection = () => {
  // const theme = useTheme();
  const { query: { state } } = useRouter();
  const t = usePageTranslation({ keyPrefix: 'hero-section' });
  // const { trackEvent } = useMatomo();

  // const handleCTAClick = useCallback(() => {
  //   console.log('TODO open contact form');
  //   trackEvent({ category: 'hero', action: 'contact' });
  // }, [trackEvent]);

  return (
    <Root background='transparent'>
      <Container maxWidth="sm">
        <div className="LabProfileSection-panel">
          {/* <Root coverImage={coverImage}> */}
          <Typography variant="h4" component="h1" color="primary" className="LabProfileSection-pretitle">
            {t('pretitle')}
          </Typography>
          <Box sx={{ height: 500 }} />
          <Typography variant="h1">
            Onboarding
          </Typography>
          <form action={`https://dev-2bbamj2u.us.auth0.com/continue?state=${state}`} method="post">
            <div >
              <label>
                Choose interest
                <select name="interests" multiple>
                  <option value="">Select one or multiple categories</option>
                  <option label="Shooter" value="shooter" />
                  <option label="Action Adventure" value="action-adventure" />
                  <option label="Survival" value="survival" />
                  <option label="RP" value="rp" />
                  <option label="Simulation" value="simulation" />
                  <option label="IRL" value="irl" />
                  <option label="Sport" value="sport" />
                  <option label="MOBA" value="moba" />
                </select>

              </label>
            </div>
            <input type="hidden" name="form" value="onboarding" />
            <input type="submit" className="btn btn-lg btn-success" value="Submit" />
          </form>
          {/* <Typography variant="h1" component="h2" className="LabProfileSection-title">
        {t('title')}
      </Typography>
      <Button
        size="small"
        className="LabProfileSection-cta"
        endIcon={<ArrowForwardIcon style={{ color: theme.palette.primary.main }} />}
        onClick={handleCTAClick}
      >
        {t('cta')}
      </Button> */}
          {/* </Root> */}
        </div>
      </Container>
    </Root>
  );
};

export default ProfileSection;
