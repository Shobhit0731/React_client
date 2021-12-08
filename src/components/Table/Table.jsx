import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@mui/material/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Button from '@mui/material/Button';

const useStyles = makeStyles({
  root: {
    width: '100%',
    marginTop: 18,
  },
  container: {
    maxHeight: 440,
  },
});

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

const StickyHeadTable = (props) => {
  const {
    id,
    data,
    columns,
  } = props;
  const classes = useStyles();

  return (
    <Paper elevation={4} className={classes.root}>
      <TableContainer className={classes.container}>
        <Table id={id} stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((header, index) => {
                const { idx } = index;
                return (
                  <TableCell
                    align={header.align}
                    style={
                      {
                        fontSize: 13,
                        color: 'rgb(153, 153, 153)',
                      }
                    }
                    key={idx}
                  />
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .map((item) => (
                <TableRow
                  key={item.id}
                  component={Link}
                  style={{ textDecoration: 'none' }}
                >
                  {columns.map((body) => {
                    const value = item[body.field];
                    return (
                      <TableCell
                        align={body.align}
                        key={body}
                      >
                        {typeof value === 'string'
                          ? value || 'No Data Found'
                          : ''}
                      </TableCell>
                    );
                  })}
                </TableRow>
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
};

export default StickyHeadTable;
