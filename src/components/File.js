import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeFile } from '../actions/index';

const onDelete = (dispatch, id) => {
  dispatch(removeFile(id));
};

const File = ({ file, dispatch }) => (
  <div className="row">
    <div className="input-field col s2" />
    <div className="input-field col s6">
      <input
        disabled
        value={file.name}
        id="disabled"
        type="text"
        className="validate"
      />
    </div>
    <div className="input-field col s2">
      <a
        className="btn-floating red"
        onClick={onDelete.bind(null, dispatch, file.id)}
      >
        <i className="material-icons">remove</i>
      </a>
    </div>
    <div className="input-field col s2" />
  </div>
);

File.propTypes = {
  file: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
};

export default connect()(File);
