import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DownloadButton from './DownloadButton';
import File from './File';
import { clear } from '../actions/index';
import { Compressor } from '../utils';
import * as _ from 'lodash';

const { dialog } = window.require('electron').remote;
const fs = window.require('fs');

const getFiles = state => {
  return { files: state.files };
};

const isCompressedAction = files => {
  return files.length === 1 && files[0].isCompressed;
};

const onDownloaded = dispatch => {
  dispatch(clear());
};

const genFile = (files, done) => {
  return Compressor.zip(files).then(content => {
    done({
      mime: 'application/zip',
      filename: 'archive.zip',
      contents: content
    });
  });
};

const decompress = files => {
  return Compressor.unZip(files[0]).then(uncompressed => {
    dialog.showSaveDialog(folderName => {
      _.forEach(uncompressed.files, file => {
        fs.writeFile(`${folderName}/${file.name}`, err => {
          // => [Error: EISDIR: illegal operation on a directory, open <directory>]
          if (err) {
            alert('An error ocurred creating the file ' + err.message);
            console.log(folderName, err);
          }

          console.log(file);
          alert(file.name + ' has been succesfully saved');
        });
      });
    });
  });
};

const generateButton = (files, dispatch) => {
  if (files.length === 0) {
    return null;
  }

  if (isCompressedAction(files)) {
    return (
      <button
        onClick={decompress.bind(null, files)}
        className="btn-floating btn-large waves-effect waves-light lighten-2"
      >
        UNZIP
      </button>
    );
  }

  return (
    <DownloadButton
      className="btn-floating btn-large waves-effect waves-light lighten-2"
      generateTitle={'ZIP'}
      loadingTitle={'...'}
      downloadTitle={() => <i className="material-icons">file_download</i>}
      async={true}
      genFile={genFile.bind(null, files)}
      onDownloaded={onDownloaded.bind(null, dispatch)}
    />
  );
};

const FileList = ({ files, dispatch }) => (
  <form
    onSubmit={e => {
      e.preventDefault();
      return false;
    }}
  >
    {files.map(file => <File key={file.id} file={file} />)}
    {generateButton(files, dispatch)}
  </form>
);

FileList.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default connect(getFiles)(FileList);
