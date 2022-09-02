import { TFunction } from 'next-i18next';

import { GridColDef, GridRenderCellParams, GridValueFormatterParams } from '@mui/x-data-grid';

import Address from '@/components/general/Address/Address';
import { formatDateTimePretty, formatNumber } from '@/libs/formatters';


const chfFormatter = ({ value }: Pick<GridValueFormatterParams, 'value'>) => `CHF ${formatNumber(value)}`;

const getColumns = (t: TFunction): GridColDef[] => {
  return [
    {
      field: 'direction',
      renderCell: ({ value }: GridRenderCellParams) => (
        /* eslint-disable-next-line @next/next/no-img-element  */
        < img src={`/images/icons/direction-${value}.svg`
        } alt="" width="30" height="30" />
      ),
      minWidth: 60,
    },
    {
      field: 'date',
      flex: 4,
      valueFormatter: ({ value }: Pick<GridValueFormatterParams, 'value'>) => formatDateTimePretty(value),
    },
    {
      field: 'asset',
      renderCell: ({ value }: GridRenderCellParams) => (
        <div className="MuiDataGrid-cellContent MuiDataGrid-cellContentAsset">
          {/* eslint-disable-next-line @next/next/no-img-element  */}
          <img src={`/images/assets/${value.toLowerCase()}.svg`
          } alt="" />
          <span>{value}</span>
        </div>
      ),
      minWidth: 60,
    },
    {
      field: 'from-to',
      flex: 5,
      renderCell: (params: GridRenderCellParams) => (
        <div className="MuiDataGrid-cellContent MuiDataGrid-cellContentFromTo">
          <div className="Lab-row">
            {`${t('from-to.from')}:`}&nbsp;
            <Address address={params.row.from} copy={false} />
          </div>
          <div className="Lab-row">
            {`${t('from-to.to')}: `}&nbsp;
            <Address address={params.row.to} copy={false} />
          </div>
        </div>
      ),
      minWidth: 300,
    },
    {
      field: 'in-out',
      flex: 2,
      renderCell: (params: GridRenderCellParams) => {
        const isNegative = params.row.diff < 0;
        const n = Math.abs(params.row.diff);
        return (
          <span className="MuiDataGrid-cellContent">
            {`${isNegative ? '-' : '+'} ${n} GE`}
          </span>
        )
      },
      minWidth: 120,
    },
    {
      field: 'value',
      flex: 2,
      valueFormatter: chfFormatter,
      minWidth: 120,
    },
    {
      field: 'fee',
      flex: 2,
      valueFormatter: chfFormatter,
      minWidth: 120,
    },
    {
      field: 'operation',
      flex: 2,
      renderCell: (params: GridRenderCellParams) => (
        <span className="MuiDataGrid-cellContent">{t(`operation.${params.row.direction}`)}</span>
      ),
      minWidth: 120,
    },
  ].map(({ /* i18nKey, */ ...restOfFields }) => ({
    flex: 1,
    sortable: false,
    headerName: t(`column.${/* i18nKey || */ restOfFields.field}`, ''),
    minWidth: 240,
    ...restOfFields,
  })) as GridColDef[];
};

export default getColumns;
