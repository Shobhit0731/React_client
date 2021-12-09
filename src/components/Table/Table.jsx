import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@mui/material/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Button from '@mui/material/Button';
import TableSortLabel from '@mui/material/TableSortLabel';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginTop: 18,
  },
  container: {
    maxHeight: 440,
  },
});

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:hover': {
      backgroundColor: 'rgb(223,223,223)',
      cursor: 'pointer',
    },
  },
}))(TableRow);

const StyledTableCell = withStyles(() => ({
  root: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}))(TableCell);

const ButtonLink = (props) => {
  const { link, icon } = props;
  return (
    <Button
      to={link}
      type="button"
      startIcon={icon}
    />
  );
};

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => (order === 'desc'
  ? (a, b) => descendingComparator(a, b, orderBy)
  : (a, b) => -descendingComparator(a, b, orderBy));

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const StickyHeadTable = (props) => {
  const {
    id,
    data,
    columns,
    order,
    orderBy,
    onSort,
    compPath,
  } = props;
  const classes = useStyles();
  const createSortHandler = (property) => (event) => {
    onSort(event, property);
  };

  return (
    <Paper elevation={4} className={classes.root}>
      <TableContainer className={classes.container}>
        <Table id={id} stickyHeader aria-label="sticky table">
          <TableHead onSort={onSort}>
            <StyledTableRow>
              {columns.map((header, index) => {
                const { idx } = index;
                return (
                  <StyledTableCell
                    align={header.align}
                    style={
                      {
                        fontSize: 13,
                        color: 'rgb(153, 153, 153)',
                      }
                    }
                    key={idx}
                    sortDirection={orderBy === header.field ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === header.field}
                      direction={orderBy === header.field ? order : 'asc'}
                      onClick={createSortHandler(header.field)}
                    >
                      {header.label || 'field'}
                      {orderBy === header.field ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </StyledTableCell>
                );
              })}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {stableSort(data, getComparator(order, orderBy))
              .map((item) => (
                <StyledTableRow
                  key={item.id}
                  component={Link}
                  style={{ textDecoration: 'none' }}
                  to={`${compPath}/${item.id}`}
                >
                  {columns.map((body) => {
                    const value = item[body.field];
                    return (
                      <StyledTableCell
                        align={body.align}
                        key={body}
                      >
                        {body.format && typeof value === 'string'
                          ? body.format(value)
                          : value || 'No Data Found'}
                      </StyledTableCell>
                    );
                  })}
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

ButtonLink.propTypes = {
  link: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

StickyHeadTable.defaultProps = {
  order: 'asc',
  orderBy: '',
};

StickyHeadTable.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  })).isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    field: PropTypes.string.isRequired,
    label: PropTypes.string,
    align: PropTypes.string,
    format: PropTypes.func,
  })).isRequired,
  order: PropTypes.oneOf(['asc', 'desc']),
  orderBy: PropTypes.string,
  onSort: PropTypes.func.isRequired,
  compPath: PropTypes.string.isRequired,
};

export default StickyHeadTable;
