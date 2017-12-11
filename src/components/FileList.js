import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import File from './File';
import DownloadButton from './DownloadButton';
import Button from './Button';
import { clear } from '../actions/index';
import { Compressor } from '../utils';
import { extractExtension } from '../utils/file-utils';

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

const decompress = (files, dispatch) => {
  return Compressor.unZip(files[0]).then(uncompressed => {
    uncompressed.forEach(file => {
      dialog.showSaveDialog({ defaultPath: file.name }, newFileName => {
        fs.writeFileSync(newFileName, file.content);
      });
    });

    dispatch(clear());
  });
};

const generateButton = (files, dispatch) => {
  if (files.length === 0) {
    return null;
  }

  if (isCompressedAction(files)) {
    return (
      <Button
        className="btn-floating btn-large waves-effect waves-light lighten-2"
        onClick={decompress.bind(null, files, dispatch)}
        title="UNZIP"
      />
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
