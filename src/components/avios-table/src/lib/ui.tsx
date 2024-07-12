import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef, //if using TypeScript (optional, but recommended)
} from 'material-react-table';
import { data } from './model';
import { StyledAviosTable } from './styles';
import { RetailerDm } from '@ba-estore/shapes';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import {
  Divider,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';
import InfoIcon from '@mui/icons-material/Info';

export function AviosTable() {
  const columns = useMemo<MRT_ColumnDef<RetailerDm>[]>(
    () => [
      {
        accessorKey: 'name', 
        header: 'Name',
        enableHiding: false, 
        Cell: ({ cell, row }) => (
          <Box component="span">
            <Link
              href={row.original.destinationUrl}
              target="_blank"
              rel="noreferrer"
            >
              {cell.getValue<string>()}
            </Link>
          </Box>
        ),
      },
      {
        accessorKey: 'maxAviosPerPound',
        header: 'Max Avios',
        filterFn: 'between',
        enableHiding: false, 
      },
      {
        accessorKey: 'rate', 
        header: 'Rate',
      },
      {
        accessorKey: 'description', 
        header: 'Description',
        visibleInShowHideMenu: false,
        enableHiding: false,
      },
      {
        header: 'Speedy Awarding',
        Cell: ({ cell }) => (cell.getValue() === 'true' ? 'Yes' : 'No'),
        accessorFn: (originalRow) => (originalRow.isSpeedyAwarding ? 'true' : 'false'),
        filterVariant: 'checkbox',
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
    enableGlobalFilter: true,
    enableGlobalFilterModes: true, //enable the user to choose between multiple search filter modes
    globalFilterModeOptions: ['fuzzy', 'contains'], //only allow the user to choose between fuzzy and startsWith filter modes
    enableRowVirtualization: true,
    enablePagination: false,
    enableRowNumbers: true,
    columnFilterDisplayMode: 'popover',
    initialState: {
      showGlobalFilter: true,
      columnVisibility: {
        description: false,
      },
    },
    muiSearchTextFieldProps: {
      placeholder: `Search ${data.length} rows`,
      sx: { minWidth: '300px' },
      variant: 'outlined',
    },
    renderDetailPanel: ({ row }) => (
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-around',
          left: '30px',
          position: 'sticky',
          width: '100%',
        }}
      >
        <img
          alt="avatar"
          height={200}
          src={row.original.logo}
          loading="lazy"
          style={{ borderRadius: '50%' }}
        />
        <Box
          sx={{ textAlign: 'center', display: 'flex', alignItems: 'center' }}
        >
          <Typography variant="subtitle1">
            {row.original.description}
          </Typography>
          <Divider orientation="vertical" />
          <List
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-around',
              left: '30px',
              position: 'sticky',
              width: '100%',
            }}
          >
            {row.original.bonuses.map((bonus, idx) => (
              <ListItem key={idx}>
                <ListItemAvatar>
                  <Avatar>
                    <InfoIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={bonus.value}
                  secondary={bonus.condition}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    ),
  });

  //note: you can also pass table options as props directly to <MaterialReactTable /> instead of using useMaterialReactTable
  //but the useMaterialReactTable hook will be the most recommended way to define table options
  return (
    <StyledAviosTable>
      <MaterialReactTable table={table} />
    </StyledAviosTable>
  );
}
