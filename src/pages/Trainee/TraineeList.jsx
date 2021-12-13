/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { StickyHeadTable } from '../../components';
import { AddDialog, EditDialog, RemoveDialog } from './components';
import { getDateFormatted, toUpperCase } from '../../lib/utils/math';
import { trainees } from './data';

const tableData = [

  {
    field: 'name',
    label: 'Name',
    align: 'left',
  },
  {
    field: 'email',
    label: 'Eamil Address',
    format: toUpperCase,
    align: 'left',
  },

  {
    field: 'createdAt',
    label: 'Date',
    align: 'right',
    format: getDateFormatted,
  },
];

const TraineeList = () => {
  // Trainee Data
  const [values, setValues] = useState({
    _id: '',
    originalId: '',
    name: '',
    email: '',
  });

  const timer = useRef();

  useEffect(() => () => {
    clearTimeout(timer.current);
  }, []);

  // Sort
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');

  const handleSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Add Dialog Edit Dialog remove Dialog
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);

  const handleAddDialogOpen = () => {
    setOpenAddDialog(true);
    setValues({
      _id: '',
      originalId: '',
      name: '',
      email: '',
      createdAt: '',
    });
  };

  const handleAddDialogClose = () => {
    setOpenAddDialog(false);
    setValues({
      _id: '',
      originalId: '',
      name: '',
      email: '',
      createdAt: '',
    });
  };

  const handleEditDialogOpen = (item) => {
    setOpenEditDialog(true);
    setValues({
      _id: item._id,
      originalId: item.originalId,
      name: item.name,
      email: item.email,
      createdAt: item.createdAt,
    });
  };
  const handleOnEditClose = () => {
    setOpenEditDialog(false);
    setValues({
      _id: '',
      originalId: '',
      name: '',
      email: '',
      createdAt: '',
    });
  };

  const handleRemoveDialogOpen = (item) => {
    setOpenRemoveDialog(true);
    setValues({
      _id: item._id,
      name: item.name,
      email: item.email,
      createdAt: item.createdAt,
    });
  };

  const handleOnRemoveClose = () => {
    setOpenRemoveDialog(false);
    setValues({
      _id: '',
      name: '',
      email: '',
      createdAt: '',
    });
  };

  // Actions
  const tableActions = [
    {
      icon: <EditIcon fontSize="small" />,
      handler: handleEditDialogOpen,
    },
    {
      icon: <DeleteIcon fontSize="small" />,
      handler: handleRemoveDialogOpen,
    },
  ];

  return (
    <div>
      <Button
        style={{
          display: 'flex',
          marginLeft: 'auto',
        }}
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={handleAddDialogOpen}
      >
        ADD TRAINEE LIST
      </Button>
      {openAddDialog && (
        <AddDialog
          open={openAddDialog}
          onClose={handleAddDialogClose}
          errorMessage={values.err}
          successMessage={values.success}
        />
      )}
      <StickyHeadTable
        id="table1"
        data={trainees}
        columns={tableData}
        actions={tableActions}
        orderBy={orderBy}
        order={order}
        onSort={handleSort}
        compPath="/trainee"
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        count={trainees.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {openEditDialog && (
        <EditDialog
          idValue={values.originalId}
          nameValue={values.name}
          emailValue={values.email}
          open={openEditDialog}
          onClose={handleOnEditClose}
          // onSubmit={(e) => handleOnEditSubmit(e, values)}
        />
      )}
      {openRemoveDialog && (
        <RemoveDialog
          dateValue={values.createdAt}
          open={openRemoveDialog}
          onClose={handleOnRemoveClose}
          // onSubmit={() => handleOnRemoveSubmit(values)}
        />
      )}
    </div>
  );
};

export default TraineeList;
