import moment from 'moment';

export const getRandomNumber = (max) => Math.floor(Math.random() * max);

export const getNextRoundRobin = (total, current) => {
  if (total === current + 1) return 0;
  return current + 1;
};
export const getDateFormatted = (createdAt) => moment(createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a');
export const toUpperCase = (value) => value.toUpperCase();
