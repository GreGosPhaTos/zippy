import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick, title, className }) => (
  <button onClick={onClick} className={className}>
    {title}
  </button>
);

Button.propTypes = {
  onCLick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired
};

export default Button;
