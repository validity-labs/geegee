import * as React from 'react';

import { useTranslation } from 'next-i18next';

import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

const Root = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  // flexShrink: 0,
  marginLeft: theme.spacing(2.5),
  '.MuiIconButton-root': {
    color: theme.palette.text.active,
    '&.Mui-disabled': {
      color: theme.palette.text.secondary,
    },
    '.MuiSvgIcon-root': {
      fontSize: '20px',
      color: 'inherit',
    },
  },
  '.LabTablePaginationActions-box': {
    display: 'flex',
    alignItems: 'center',
    // padding: theme.spacing(0.5),
    margin: theme.spacing(0, 1),
    borderRadius: 3,
    backgroundColor: theme.palette.background.transparent,
    '.MuiIconButton-root': {
      padding: theme.spacing(0.5),
    },
  },
  '.LabTablePaginationActions-text': {
    fontSize: '0.75rem', // 12px
  },
  '.LabTablePaginationActions-outerButton': {
    padding: theme.spacing(0.5),
    borderRadius: 3,
    backgroundColor: theme.palette.background.transparent,
  },
}));

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  // eslint-disable-next-line no-unused-vars
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

export default function TablePaginationActions(props: TablePaginationActionsProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  const pageCount = Math.ceil(count / rowsPerPage);
  return (
    <Root>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        title={t('table.first-page')}
        aria-label={t('table.first-page')}
        className="LabTablePaginationActions-outerButton"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <div className="LabTablePaginationActions-box">
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          title={t('table.previous-page')}
          aria-label={t('table.previous-page')}
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon />}
        </IconButton>
        <Typography className="LabTablePaginationActions-text">
          {t('table.rows-out-of', { from: page + 1, count: pageCount })}
        </Typography>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= pageCount - 1}
          title={t('table.next-page')}
          aria-label={t('table.next-page')}
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
        </IconButton>
      </div>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= pageCount - 1}
        title={t('table.last-page')}
        aria-label={t('table.last-page')}
        className="LabTablePaginationActions-outerButton"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Root>
  );
}
