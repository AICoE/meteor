import React from 'react';
import PropTypes from 'prop-types';

const MS_IN_SEC = 1000;
const MS_IN_MIN = MS_IN_SEC * 60;
const MS_IN_HOUR = MS_IN_MIN * 60;
const MS_IN_DAY = MS_IN_HOUR * 24;

const Time = ({ date }) => {
  const difference = +date - +Date.now();

  if (difference <= 0) {
    return 'Now';
  }
  if (isNaN(difference)) {
    return 'Unknown';
  }

  const days = Math.floor(difference / MS_IN_DAY);
  const hours = Math.floor((difference / MS_IN_HOUR) % 24);
  const minutes = Math.floor((difference / MS_IN_MIN) % 60);
  const seconds = Math.floor((difference / MS_IN_SEC) % 60);

  return <React.Fragment>{days ? `${days} days` : hours ? `${hours} hours` : `${minutes}:${seconds}`}</React.Fragment>;
};

Time.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
};
export default Time;
