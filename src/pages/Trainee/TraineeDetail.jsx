import * as React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { grey } from '@mui/material/colors';
import { trainees } from './data';
// import { PageNotFound } from '..';

const TraineeDetail = (props) => {
  const { match: { id } } = props;

  const getDateFormatted = (createdAt) => moment(createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a');

  const history = useHistory();

  const ColorButton = styled(Button)(({ theme }) => ({
    marginTop: 26,
    color: theme.palette.getContrastText(grey[300]),
    backgroundColor: grey[300],
    '&:hover': {
      backgroundColor: grey[400],
    },
  }));

  return (
    <>
      <Card sx={{ display: 'flex' }}>
        <CardMedia
          // component="img"
          // image="/static/images/cards/live-from-space.jpg"
          // alt="Live from space album cover"
          sx={{
            width: 173,
            bgcolor: 'rgba(46, 49, 49, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'auto',
          }}
        >
          <Typography
            variant="subtitle2"
            color="common.white"
            component="div"
          >
            Thumbnail
          </Typography>
        </CardMedia>
        <Box sx={{ display: 'flex', flexDirection: 'column', mb: 3 }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            {trainees.map((item) => (
              (item.id === id)
                ? (
                  <>
                    <Typography variant="h4" component="div">
                      {item.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                      {getDateFormatted(item.createdAt)}
                    </Typography>
                    <Typography variant="subtitle1" component="div">
                      {item.email}
                    </Typography>
                  </>
                )
                : null
            ))}
          </CardContent>
        </Box>
      </Card>
      <Stack justifyContent="center" direction="row">
        <ColorButton onClick={() => history.goBack()} variant="contained">Back</ColorButton>
      </Stack>
    </>
  );
};

TraineeDetail.propTypes = {
  match: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default TraineeDetail;
