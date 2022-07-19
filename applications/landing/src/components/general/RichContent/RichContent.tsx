import { Box, BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';

type HTML = string;

interface Props extends BoxProps {
  dangerousHtml: HTML;
}
const RichContent = styled(({ dangerousHtml, ...props }: Props) => (
  <Box dangerouslySetInnerHTML={{ __html: dangerousHtml }} data-testid="RichContent" {...props} />
))(({ theme }) => ({
  maxWidth: 920,
  ...theme.typography.body,
  color: theme.palette.text.primary,
  'h2, h3, h4, h5, h6': {
    marginBottom: theme.spacing(8),
  },
  h2: {
    ...theme.typography.h2,
  },
  h3: {
    ...theme.typography.h3,
  },
  h4: {
    ...theme.typography.h4,
  },
  h5: {
    ...theme.typography.h5,
  },
  h6: {
    ...theme.typography.h6,
  },
  figcaption: {
    ...theme.typography.body,
    fontSize: '0.75rem', // 12px
    fontStyle: 'italic',
    textAlign: 'end',
    color: theme.palette.text.disabled,
  },
  ul: {
    listStyle: 'disc',
  },
  ol: {
    listStyle: 'decimal',
  },
  'ul, ol': {
    listStylePosition: 'inside',
  },
  li: {
    margin: theme.spacing(0, 0, 2),
    '&::marker': {
      color: theme.palette.text.active,
    },
  },
  'p, ul, ol, figure, blockquote': {
    margin: theme.spacing(0, 0, 10),
    ...theme.typography.body,
    color: theme.palette.text.secondary,
  },
  figure: {
    maxWidth: '100%',
    overflow: 'auto',
  },
  'table, th, td': {
    borderCollapse: 'collapse',
    border: `1px solid ${theme.palette.divider}`,
  },
  th: {
    fontWeight: 500,
    textAlign: 'start',
  },
  'td, th': {
    padding: theme.spacing(2, 4),
  },
  blockquote: {
    padding: theme.spacing(2, 4),
    borderLeft: `10px solid ${theme.palette.divider}`,
    background: theme.palette.background.light,
    p: {
      display: 'inline',
      margin: 0,
    },
  },
  img: {
    maxWidth: '100%',
  },
}));

export default RichContent;
