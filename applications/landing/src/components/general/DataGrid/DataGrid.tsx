import { styled } from '@mui/material/styles';
import { DataGrid as MuiDataGrid } from '@mui/x-data-grid';

const DataGrid = styled(MuiDataGrid)(({ theme }) => ({
  '&.MuiDataGrid-root': {
    border: 0,
  },
  '.MuiDataGrid-overlay': {
    backgroundColor: 'transparent',
  },
  '.MuiDataGrid-columnHeaders': {
    // alignItems: 'flex-start',
    borderBottom: 0,
  },
  '.MuiDataGrid-columnHeader': {
    padding: theme.spacing(0, 5, 0, 0),
    outline: 'none !important',
  },
  '.MuiDataGrid-columnHeaderTitle': {
    ...theme.typography['body-xs'],
    fontSize: '0.75rem', // 12px
    fontWeight: 600,
    color: theme.palette.text.primary,
  },
  '.MuiDataGrid-columnHeaderTitleContainer': {
    // alignItems: 'flex-start',
  },
  '.MuiDataGrid-columnHeaderTitleContainerContent': {},
  '.MuiDataGrid-columnSeparator': {
    display: 'none',
  },
  '.MuiDataGrid-iconButtonContainer': {
    marginLeft: theme.spacing(3),
    visibility: 'visible',
  },
  '.MuiDataGrid-sortIcon': {
    color: theme.palette.text.secondary,
    opacity: '1 !important',
  },
  '.MuiDataGrid-row': {
    // borderRadius: +theme.shape.borderRadius * 5,
    backgroundColor: 'transparent', //theme.palette.background.transparent,
    ...theme.mixins.divider,
    // '&:not(:last-child)': {
    //   margin: theme.spacing(0, 0, 3, 0),
    // },
    '&.Mui-selected, &:hover, &.Mui-selected:hover': {
      // backgroundColor: theme.palette.background.transparent,
    },
  },
  '.MuiDataGrid-cell': {
    border: 0,
    // padding: theme.spacing(4.5, 5, 4),
    padding: theme.spacing(0, 5, 0, 0),
    '&:focus-within': {
      outline: 'none',
    },
  },
  '.MuiDataGrid-cellContent': {
    ...theme.typography['body-xs'],
    fontWeight: 600,
    color: theme.palette.text.secondary,
  },
  '.MuiDataGrid-cellContentAsset': {
    display: 'flex',
    alignItems: 'center',
    textTransform: 'uppercase',
    img: {
      width: 14,
      height: 14,
      marginRight: theme.spacing(2),
    },
  },
  '.MuiDataGrid-cellContentFromTo': {
    '.Awi-row': {
      whiteSpace: 'nowrap',
    },
    '.LabAddress-address': {
      maxWidth: 214,
      ...theme.typography['body-xs'],
      fontWeight: 600,
      color: theme.palette.text.secondary,
      overflow: 'hidden',
    },
  },
  '&.MuiDataGrid-cellContent--withApr': {
    display: 'flex',
    flexDirection: 'column',
  },
  '.MuiDataGrid-cellText': {
    ...theme.typography.body,
    fontWeight: 500,
    color: theme.palette.text.primary,
  },
  '.MuiDataGrid-footerContainer': {
    border: 0,
    justifyContent: 'flex-start',
  },
  '.MuiTablePagination-root': {
    display: 'flex',
    width: '100%',
  },
  '.MuiTablePagination-spacer, .MuiTablePagination-displayedRows': {
    display: 'none',
  },
  '.MuiTablePagination-toolbar': {
    flexWrap: 'wrap',
    gap: theme.spacing(6),
    width: '100%',
  },

}));

export default DataGrid;
