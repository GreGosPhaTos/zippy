import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
const JSZip = require('jszip');
import DownloadButton from './DownloadButton';

const getFiles = state => {
  return { files: state.files };
};

const isCompressedAction = files => {
  return files.length === 1 && files[0].isCompressed;
};

const loading = (
  <span>
    Crunching hard numbers
    <i className="fa fa-circle-o-notch fa-spin right" />
  </span>
);

const genFile = (files, done) => {
  // if (isCompressedAction(files)) {
  //   return Promise.reject();
  // }

  console.log(files);
  const zip = new JSZip();
  const archive = zip.folder('example');
  files.forEach(file => {
    archive.file(file.name, file);
  });
  zip
    .generateAsync({
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: {
        level: 6
      }
    })
    .then(content => {
      done({
        mime: 'application/zip',
        filename: 'example.zip',
        contents: content
      });
    });
};

const FileList = ({ files, dispatch }) => (
  <div>
    <div>
      {files.map(file => (
        <span className="card-panel grey darken-4 white-text">{file.name}</span>
      ))}
    </div>
    {/*<ul className="collection">*/}
    {/*{files.map(file => (*/}
    {/*<li className="collection-item" key={file.id}>*/}
    {/*<div>{file.name}<a href="#!" className="secondary-content"><i className="material-icons">send</i></a>*/}
    {/*</div>*/}
    {/*</li>*/}
    {/*))}*/}
    {/*</ul>*/}
    <DownloadButton
      className="btn-floating btn-large waves-effect waves-light lighten-2"
      generateTitle={isCompressedAction(files) ? 'ZIP' : 'unZIP'}
      loadingTitle={'loading'}
      downloadTitle={<i className="material-icons">file_download</i>}
      async={true}
      genFile={genFile.bind(null, files)}
    />
  </div>
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
