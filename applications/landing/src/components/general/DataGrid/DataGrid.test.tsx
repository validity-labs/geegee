import React from 'react';

import GridPagination from '../GridPagination/GridPagination';
import DataGrid from './DataGrid';
import getColumns from '@/components/pages/platform/TransactionSection/columns';
import fetchData from '@/components/pages/platform/TransactionSection/fetchData';
import nextUseRouterMock from '@/mocks/nextUseRouterMock';
import { cleanup, render } from '@/testing/utils';

beforeAll(() => {
  nextUseRouterMock({
    route: '/',
    pathname: '/',
    query: '',
    asPath: '',
  });
});

afterEach(cleanup);

describe('<DataGrid />', () => {
  it('has valid snapshot', async () => {
    const { total, records } = await fetchData();
    const { asFragment } = render(
      <DataGrid
        columns={getColumns((k: string) => k)}
        rows={records}
        rowCount={total}
        components={{ Pagination: GridPagination }}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
