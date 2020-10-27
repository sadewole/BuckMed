import React from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  makeStyles,
  TablePagination,
  Typography,
  Tooltip,
  IconButton,
  Paper,
  TableContainer,
} from '@material-ui/core';
import Checkbox from './Checkbox';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import DeleteIcon from '@iconify/icons-fa-solid/trash-alt';

const CustomTable = ({
  children,
  header,
  checkbox,
  selectedData,
  data,
  onSelect,
  border,
  tableHeaderColor = 'secondary',
  handlePageChange,
  handleLimitChange,
  paginate,
  minWidth,
}) => {
  const classes = useStyles();

  const matchAll = () => {
    let selectAllData = false;
    if (data.length > 0 && data.length === selectedData.length) {
      selectAllData = true;
    }
    return selectAllData;
  };

  const matchSome = () => {
    let selectSome = false;
    if (selectedData.length > 0 && selectedData.length < data.length) {
      selectSome = true;
    }
    return selectSome;
  };

  return (
    <Paper className='mt-2 p-4'>
      <TableContainer>
        <Table
          className={
            classes.table + ' ' + (border ? 'table-border' : undefined)
          }
          style={{ minWidth: minWidth }}
        >
          <TableHead className={classes[tableHeaderColor + 'TableHeader']}>
            <TableRow className={classes.tableHeadRow}>
              {checkbox ? (
                <TableCell padding='checkbox' className={classes.tableCell}>
                  <Checkbox
                    checked={matchAll()}
                    indeterminate={matchSome()}
                    onChange={(e) => onSelect(e)}
                    disabled={data.length < 1}
                  />
                </TableCell>
              ) : null}
              {header.map((head, index) => {
                return (
                  <TableCell
                    key={index}
                    className={classes.tableCell + ' ' + classes.tableHeadCell}
                  >
                    {head}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          {selectedData.length > 0 ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan='100%'>
                  <div className='d-flex align-items-center'>
                    <Typography>
                      {selectedData.length} of {data.length} selected
                    </Typography>
                    <Typography className='mx-2 text-danger'>
                      -- Delete selected
                      <Tooltip title='Delete'>
                        <IconButton className={classes.deleteBtn}>
                          <Icon icon={DeleteIcon} />
                        </IconButton>
                      </Tooltip>
                    </Typography>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : null}
          <TableBody className={classes.tableBody}>{children}</TableBody>
        </Table>
      </TableContainer>
      {data.length > 0 && (
        <div className='d-flex align-items-center justify-content-around'>
          <TablePagination
            component='div'
            count={data.length}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleLimitChange}
            page={paginate.page}
            rowsPerPage={paginate.rowsPerPage}
            rowsPerPageOptions={paginate.rowsPerPageOptions}
          />
        </div>
      )}
    </Paper>
  );
};

CustomTable.propTypes = {
  header: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node,
  data: PropTypes.array,
  selectedData: PropTypes.array,
  onSelect: PropTypes.func,
  border: PropTypes.bool,
  checkbox: PropTypes.bool,
  handlePageChange: PropTypes.func,
  handleLimitChange: PropTypes.func,
  paginate: PropTypes.object,
  minWidth: PropTypes.string,
};

CustomTable.defaultProps = {
  data: [],
  selectedData: [],
};

const useStyles = makeStyles((theme) => ({
  table: {
    marginBottom: '0',
    width: '100%',
    maxWidth: '100%',
    backgroundColor: 'transparent',
    borderSpacing: '0',
    borderCollapse: 'collapse',

    '&.table-border': {
      border: '1px solid #dee2e6',
    },
  },
  tableHeadRow: {
    height: '56px',
    color: 'inherit',
    display: 'table-row',
    outline: 'none',
    verticalAlign: 'middle',
  },
  warningTableHeader: {
    background: '#ff9800',
  },
  primaryTableHeader: {
    background: '#17a2b8',
  },
  secondaryTableHeader: {
    background: '#e7e7e7',
  },
  dangerTableHeader: {
    background: '#dc3545',
  },
  successTableHeader: {
    background: '#4caf50',
  },
  infoTableHeader: {
    background: '#00acc1',
  },
  roseTableHeader: {
    background: '#e91e63',
  },
  grayDarkTableHeader: {
    background: '#343a40',
    color: '#fff',
  },
  tableHeadCell: {
    color: 'inherit',
    '&, &$tableCell': {
      fontSize: '1em',
      textTransform: 'uppercase',
      fontWeight: 'bold',
    },
  },
  tableCell: {
    lineHeight: '1.42857143',
    padding: '12px 8px',
    verticalAlign: 'middle',
    fontSize: '1rem',
  },
  tableBody: {
    '& .MuiTableRow-root': {
      height: '48px',
      color: 'inherit',
      display: 'table-row',
      outline: 'none',
      verticalAlign: 'middle',

      '&.Mui-selected, &.Mui-selected:hover': {
        background: 'rgba(93, 177, 255, 0.208)',
      },

      '&:last-child .MuiTableCell-root': {
        borderBottom: 'none',
      },

      '& .MuiTableCell-root': {
        lineHeight: '1.42857143',
        padding: '12px 8px',
        verticalAlign: 'middle',
        fontSize: '1rem',
      },
    },
  },
  deleteBtn: {
    color: 'inherit',
    fontSize: '12px',
    border: 'none',

    '&:focus': {
      borderStyle: 'transparent',
    },
  },
  paginate: {
    display: 'flex',
    listStyle: 'none',
  },
}));

export default CustomTable;
