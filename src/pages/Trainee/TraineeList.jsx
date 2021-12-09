import React, { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { StickyHeadTable } from '../../components';
import { AddDialog } from './components';
import { trainees } from './data';
import { toUpperCase, getDateFormatted } from '../../lib/utils/math';

const tableData = [
  {
    field: 'name',
    label: 'Name',
    align: 'center',
  },
  {
    field: 'email',
    label: 'Eamil Address',
    format: toUpperCase,
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
  const [traineesData, setTraineesData] = useState({
    loading: false,
    traineeArr: [],
    dataLength: 0,
  });
  const [values, setValues] = useState({
    _id: '',
    name: '',
    email: '',
  });

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');

  const handleSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const [loader, setLoader] = useState(false);

  const timer = useRef();

  useEffect(() => () => {
    clearTimeout(timer.current);
  }, []);

  const fetchData = async () => {
    setTraineesData({ loading: false, traineeArr: trainees, dataLength: trainees.length });
  };

  useEffect(() => {
    try {
      (async () => {
        await fetchData();
      })();
    } catch (error) {
      return error.response.data.message
        && setValues({ ...values, err: error.response.data.message, success: '' });
    }
    return () => {};
  }, []);

  // Add Dialog
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const handleAddDialogOpen = () => {
    setOpenAddDialog(true);
    setValues({
      name: '',
      email: '',
    });
  };

  const handleAddDialogClose = () => {
    setOpenAddDialog(false);
    setValues({
      name: '',
      email: '',
    });
  };

  const handleOnAddSubmit = async () => {
    try {
      setLoader(true);
      setTraineesData({ loading: false, traineeArr: trainees, dataLength: trainees.length });
      handleAddDialogClose();
    } catch (error) {
      return error.response.data.message
      && setValues({ ...values, err: error.response.data.message, success: '' });
    } finally {
      timer.current = setTimeout(() => {
        setLoader(false);
      }, 1000);
    }
    return false;
  };

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
          loader={loader}
          open={openAddDialog}
          onClose={handleAddDialogClose}
          onSubmit={(e) => handleOnAddSubmit(e, values)}
          errorMessage={values.err}
          successMessage={values.success}
        />
      )}
      <StickyHeadTable
        id="table1"
        data={traineesData.traineeArr}
        columns={tableData}
        order={order}
        orderBy={orderBy}
        onSort={handleSort}
        compPath="/trainee"
      />
    </div>
  );
};

export default TraineeList;
