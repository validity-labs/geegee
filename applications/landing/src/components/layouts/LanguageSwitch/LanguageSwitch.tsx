import * as React from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { Box, Button, MenuItem, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiTooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';
import TrapFocus from '@mui/material/Unstable_TrapFocus';

// import ArrowDownSimpleIcon from '@/components/icons/ArrowDownSimpleIcon';
// import GlobeIcon from '@/components/icons/GlobeIcon';
import { useApp } from '@/context/AppContext';
import { useSnack } from '@/context/SnackbarContext';
import { SUPPORTED_LANGUAGES } from '@/libs/constants';
import { Language } from '@/typings/app';

const Toggle = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 3),
  minWidth: 0,
  ...theme.typography['body-lg'],
  fontSize: '0.875rem', // 14px
  color: theme.palette.primary.contrastText,
  '&[aria-expanded="true"]': {
    color: theme.palette.secondary.main,
  },
  '&.Mui-focusVisible': {
    outlineOffset: 1,
    outlineWidth: 1,
    outlineColor: 'rgb(16, 16, 16)',
    outlineStyle: 'auto',
  },
  '& .MuiButton-endIcon': {
    marginLeft: theme.spacing(4),
    svg: {
      fontSize: 10,
    },
  },
  '& .MuiButton-startIcon': {
    marginRight: theme.spacing(2),
    svg: {
      fontSize: 25,
    },
  },
}));

const Tooltip = styled(({ className, ...props }: TooltipProps) => (
  <MuiTooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  width: 'auto',
  [`& .${tooltipClasses.tooltip}`]: {
    width: 'auto',
    maxWidth: '100%',
    padding: 0,
    backgroundColor: 'initial',
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.background.dark,
    width: 26,
    height: 18,
    marginTop: '-18px !important',
  },
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.background.dark,
    '& .MuiMenu-list': {
      display: 'flex',
      flexDirection: 'column',
    },
    '& .MuiMenuItem-root': {
      padding: 0,
      color: theme.palette.primary.contrastText,
      '&:hover': {
        backgroundColor: 'initial',
        color: theme.palette.secondary.main,
      },
      '&.Mui-focusVisible': {
        color: theme.palette.secondary.main,
        outlineOffset: -1,
        outlineWidth: 1,
        outlineColor: 'rgb(16, 16, 16)',
        outlineStyle: 'auto',
        backgroundColor: 'transparent',
      },
    },
  },
}));

export default function CustomizedMenus() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const router = useRouter();
  const { translatedRoutes } = useApp();
  const showMessage = useSnack();

  const changeLanguage = (language: Language) => {
    handleClose();
    const translatedRoute = translatedRoutes.current?.[language];
    i18n.changeLanguage(language);
    const url = translatedRoute ? translatedRoute : router.asPath;
    if (translatedRoute && translatedRoute.startsWith('/')) {
      showMessage(t('common.no-translation'));
    }
    router.push(url, url, { locale: language });
  };

  return (
    <Tooltip
      id="languageSwitchMenu"
      open={open}
      onClose={handleClose}
      onOpen={handleOpen}
      disableFocusListener
      arrow
      title={
        <Paper elevation={0}>
          <TrapFocus open>
            <Box component="ul" className="MuiMenu-list" tabIndex={-1} aria-labelledby="languageSwitchButton">
              {SUPPORTED_LANGUAGES.filter((f) => f !== i18n.language).map((lang) => (
                <MenuItem key={lang} onClick={() => changeLanguage(lang)} disableGutters tabIndex={0}>
                  <Typography variant="body-lg" sx={{ py: 4, px: 8, width: '100%' }}>
                    {t(`language.${lang}`)}
                  </Typography>
                </MenuItem>
              ))}
            </Box>
          </TrapFocus>
        </Paper>
      }
    >
      <Toggle
        id="languageSwitchButton"
        aria-controls="languageSwitchMenu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        disableRipple
        onClick={handleOpen}
        variant="text"
        // startIcon={<GlobeIcon />}
        // endIcon={<ArrowDownSimpleIcon />}
      >
        {t(`language.${i18n.language}`)}
      </Toggle>
    </Tooltip>
  );
}
