import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { usePageTranslation } from '@/context/AppContext';

const Root = styled('div')(({ theme }) => ({
  margin: '0 auto',
  padding: theme.spacing(0, 9),
  '.LabCard-wrapper': {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: 370,
    padding: theme.spacing(10, 8),
    ...theme.mixins.border.active,
    ...theme.mixins.radius(4),
    '&:after': {
      content: '""',
      position: 'absolute',
      top: 27,
      right: 0,
      width: 38,
      height: 38,
      transform: 'translateX(50%)',
      borderRadius: '100%',
      backgroundColor: theme.palette.primary.main,
    },
  },
  h3: {
    marginBottom: theme.spacing(4.5),
  },
  [theme.breakpoints.up("md")]: {
    '.LabCard-wrapper': {
      minHeight: 280,
      padding: theme.spacing(14, 17, 11, 13),
      '&:after': {
        width: 77,
        height: 77,
      },
    },
  },
}));


interface Props {
  i18nKey: string;
  className?: string;
}
const Card = ({ i18nKey, className }: Props) => {
  const t = usePageTranslation({ keyPrefix: i18nKey });
  return (
    <Root className={className}>
      <div className="LabCard-wrapper">
        <Typography variant="h6" component="h3">{t('title')}</Typography>
        <Typography>{t('description')}</Typography>
      </div>
    </Root>
  );
};

export default Card;
