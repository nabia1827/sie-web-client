import React from 'react';
import PropTypes from 'prop-types';

const SelectedArea = ({ left, width, schedulerData }) => {
  const { config } = schedulerData;

  const selectedAreaStyle = {
    left,
    width,
    top: 0,
    bottom: 0,
    backgroundColor: config.selectedAreaColor,
  };

  return <div className='selected-area' style={selectedAreaStyle}></div>;
};

SelectedArea.propTypes = {
  schedulerData: PropTypes.object.isRequired,
  left: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

export default SelectedArea;