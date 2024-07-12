import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef, //if using TypeScript (optional, but recommended)
} from 'material-react-table';
import { data } from './model';
import { StyledAviosTable } from './styles';
import { RetailerDm } from '@ba-estore/shapes';

export function AviosTable() {
  const columns = useMemo<MRT_ColumnDef<RetailerDm>[]>(
    () => [
      {
        accessorKey: 'name', //simple recommended way to define a column
        header: 'Name',
        enableHiding: false, //disable a feature for this column
      },
      {
        accessorKey: 'rate', //simple recommended way to define a column
        header: 'Rate',
        enableHiding: false, //disable a feature for this column
      },
      {
        accessorKey: 'maxAviosPerPound', //simple recommended way to define a column
        header: 'Max Avios',
        enableHiding: false, //disable a feature for this column
      },
    ],
    []
  );

  //pass table options to useMaterialReactTable
  const table = useMaterialReactTable({
    columns,
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableRowSelection: false, //enable some features
    enableColumnOrdering: true, //enable a feature for all columns
    enableGlobalFilter: false, //turn off a feature
    enableRowVirtualization: true,
    enablePagination: false,
    enableRowNumbers: true
  });

  //note: you can also pass table options as props directly to <MaterialReactTable /> instead of using useMaterialReactTable
  //but the useMaterialReactTable hook will be the most recommended way to define table options
  return (
    <StyledAviosTable>
      <MaterialReactTable table={table} />
    </StyledAviosTable>
  );
}
