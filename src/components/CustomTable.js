import React from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  makeStyles,
} from '@material-ui/core';
import Checkbox from './Checkbox';
import PropTypes from 'prop-types';

const CustomTable = ({
  children,
  header,
  checkbox,
  selectedData,
  data,
  onSelect,
  border,
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
    <div className='mt-2 p-4'>
      <Table
        className={classes.table + ' ' + (border ? 'table-border' : undefined)}
      >
        <TableHead>
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
        <TableBody className={classes.tableBody}>{children}</TableBody>
      </Table>
    </div>
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
}));

export default CustomTable;
