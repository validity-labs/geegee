import { useMemo, useState } from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { Button, Container, MenuItem, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiTooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';
import TrapFocus from '@mui/material/Unstable_TrapFocus';

import Link from '@/components/general/Link/Link';

const Toggle = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isDark' && prop !== 'isActive',
})<{ isDark: boolean; isActive: boolean }>(({ theme, isDark, isActive }) => ({
  '&': {
    padding: theme.spacing(2, 4),
    minWidth: 0,
    color: isActive ? theme.palette.text.active : isDark ? theme.palette.text.primary : theme.palette.text.contrast,
    ...theme.typography.body,
    fontSize: '1rem',
    fontWeight: 400,
    transition: 'none',
    '&:hover, &[aria-expanded="true"]': {
      color: theme.palette.text.active,
      background: 'initial',
    },
    '&.Mui-focusVisible': {
      outlineOffset: 1,
      outlineWidth: 1,
      outlineColor: 'rgb(16, 16, 16)',
      outlineStyle: 'auto',
    },
  },
}));

const Tooltip = styled(({ className, ...props }: TooltipProps) => (
  <MuiTooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  width: '100%',
  maxWidth: '100%',
  [`& .${tooltipClasses.tooltip}`]: {
    width: '100%',
    maxWidth: '100%',
    borderRadius: 0,
    padding: 0,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.secondary.main,
  },
  '& .MuiPaper-root': {
    left: 0,
    width: '100%',
    maxWidth: '100%',
    borderTop: `5px solid ${theme.palette.secondary.main}`,
    '& .MuiMenu-list': {
      outline: 'none !important  ',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      flexWrap: 'wrap',
    },
    '& .MuiMenuItem-root': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      minWidth: 290,
      padding: 0,
      // marginRight: theme.spacing(4),
      whiteSpace: 'normal',
      '&:hover': {
        backgroundColor: 'rgba(0, 0,0, 0.05)',
      },
      '&.Mui-focusVisible': {
        backgroundColor: 'initial',
        a: {
          color: theme.palette.secondary.main,
        },
      },
      '& .MuiLink-root': {
        width: '100%',
        height: '100%',
        padding: theme.spacing(7.5, 5, 6),
        ...theme.typography.body,
        color: theme.palette.primary.main,
        '&:hover': {
          color: theme.palette.primary.main,
          backgroundColor: 'initial',
        },
      },
      '& .MuiListItem-title': {
        paddingBottom: theme.spacing(2),
        fontWeight: 600,
        color: 'inherit',
      },
      '& .MuiListItem-description': {
        maxWidth: 320,
        fontSize: '1rem',
        color: theme.palette.text.secondary,
      },
    },
  },
}));

interface Props {
  parentKey: string;
  items: {
    key: string;
    url: string;
  }[];
  isDark: boolean;
}
export default function Menu({ parentKey, items, isDark }: Props) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { pathname } = useRouter();

  const isActive = useMemo(() => {
    return !!items.find((f) => f.url === pathname);
  }, [pathname, items]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Tooltip
      id={`${parentKey}SwitchMenu`}
      open={open}
      onClose={handleClose}
      onOpen={handleOpen}
      disableFocusListener
      arrow
      title={
        <Paper square elevation={0}>
          <TrapFocus open>
            <Container
              component="ul"
              className="MuiMenu-list"
              tabIndex={-1}
              aria-labelledby={`${parentKey}SwitchButton`}
            >
              {items.map(({ key, url }) => (
                <MenuItem key={key} disableGutters tabIndex={-1} onClick={handleClose}>
                  <Link href={url}>
                    <Typography variant="body-lg" className="MuiListItem-title">
                      {t(`menu.${parentKey}.${key}.title`)}
                    </Typography>
                    <Typography className="MuiListItem-description">
                      {t(`menu.${parentKey}.${key}.description`)}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Container>
          </TrapFocus>
        </Paper>
      }
    >
      <Toggle
        id={`${parentKey}SwitchButton`}
        aria-controls={`${parentKey}SwitchMenu`}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        disableRipple
        onClick={handleOpen}
        variant="text"
        isDark={isDark}
        isActive={isActive}
      >
        {t(`menu.${parentKey}.title`)}
      </Toggle>
    </Tooltip>
  );
}
