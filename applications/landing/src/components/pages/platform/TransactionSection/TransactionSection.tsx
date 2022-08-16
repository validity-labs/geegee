import { useEffect, useMemo, useState } from 'react';

import { Box, Typography, useMediaQuery } from '@mui/material';
import { styled, useTheme } from "@mui/material/styles";
import { GridRowsProp /* , GridSortModel */ } from '@mui/x-data-grid';

import getColumns from './columns';
import fetchData from './fetchData';
import DataGrid from '@/components/general/DataGrid/DataGrid';
import GridPagination from '@/components/general/GridPagination/GridPagination';
import Section from '@/components/layouts/Section/Section';
import { usePageTranslation } from '@/context/AppContext';
import { TABLE_ROWS_PER_PAGE, TABLE_ROWS_PER_PAGE_OPTIONS } from '@/libs/constants';
import { RowsState } from '@/typings/app';


const Root = styled(Section)(({ theme }) => ({
  paddingTop: theme.spacing(22.5),
  paddingBottom: theme.spacing(22.5),
  '.LabTransactionSection-title': {
    marginBottom: theme.spacing(9),
    fontSize: '0.8125rem', // 13px
    lineHeight: 1.66,
  },
  '.table-container': {
    // height: 888 /* 66 * 10 + 12 * 10 - 12 */,
    width: '100%',
  },
  [theme.breakpoints.up("md")]: {},
}));

const TransactionSection = () => {
  const t = usePageTranslation({ keyPrefix: 'transaction-section' });
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up('sm'));
  const columns = useMemo(() => {
    return getColumns(t);
  }, [t]);

  // const [sortModel, setSortModel] = useState<GridSortModel>([
  //   /* { field: 'asset', sort: 'asc' } */
  // ]);
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [rowCount, setRowCount] = useState<number | undefined>(undefined);
  // Some api client return undefine while loading
  // Following lines are here to prevent `rowCountState` from being undefined during the loading
  const [rowCountState, setRowCountState] = useState(rowCount || 0);
  useEffect(() => {
    setRowCountState((prevRowCountState) => (rowCount !== undefined ? rowCount : prevRowCountState));
  }, [rowCount, setRowCountState]);

  const [rowsState, setRowsState] = useState<RowsState>({
    page: 0,
    pageSize: TABLE_ROWS_PER_PAGE,
  });

  const [loading, setLoading] = useState<boolean>(false);

  // const handleSortModelChange = (newModel: GridSortModel) => {
  //   setSortModel(newModel);
  // };

  useEffect(() => {
    let active = true;
    setLoading(true);
    setRowCount(undefined);
    (async () => {
      // if (!connected) {
      //   return;
      // }
      const { total, records } = await fetchData(
        //   page: rowsState.page,
        //   pageSize: rowsState.pageSize,
        //   sort: sortModel,
      );
      if (!active) {
        return;
      }
      setRows(records);
      setRowCount(total);
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [/* sortModel, */ rowsState /* data */]);

  const tableHeight = useMemo(() => {
    const { page, pageSize } = rowsState;
    const ln = rows.length;
    const bottomLine = page * pageSize;
    const m = Math.min(ln - bottomLine, pageSize);

    // INFO when page size changed and page is not longer valid, m is negative until
    // page is auto corrected
    // 84 row height; 56 header height; 60 | 80 footer height; 10 scroll height
    return Math.max(1, m) * 84 + 56 + (isLarge ? 60 : 80) + 10;
  }, [rows, rowsState, isLarge]);

  return (
    <Root>
      <Typography variant="h1" className="LabTransactionSection-title">{t('title')}</Typography>
      <Box className="table-container" sx={{ height: tableHeight }}>
        <DataGrid
          loading={loading}
          columns={columns}
          disableColumnMenu
          disableColumnFilter
          disableSelectionOnClick
          disableColumnSelector
          rowHeight={84}
          rowsPerPageOptions={TABLE_ROWS_PER_PAGE_OPTIONS}
          // rows
          rows={rows}
          rowCount={rowCountState}
          // sorting

          // sortingMode="client"
          // sortModel={sortModel}
          // onSortModelChange={handleSortModelChange}
          // pagination
          paginationMode="client"
          {...rowsState}
          onPageChange={(page) => setRowsState((prev) => ({ ...prev, page }))}
          onPageSizeChange={(pageSize) => setRowsState((prev) => ({ ...prev, pageSize }))}
          components={{
            Pagination: GridPagination,
          }}
          localeText={{
            // columnHeaderSortIconLabel: t('table.sort', { ns: 'common' }),
            footerTotalVisibleRows: (visibleCount, totalCount) =>
              t('table.rows-out-of', {
                visibleCount: visibleCount.toLocaleString(),
                totalCount: totalCount.toLocaleString() + '1',
              }),
          }}
        />
      </Box>
    </Root>
  );
};

export default TransactionSection;
