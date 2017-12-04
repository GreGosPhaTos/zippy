import React from 'react';
import logo from '../public/logo.png';
import Dropzone from 'react-dropzone';
import FileList from './components/FileList';
import { connect } from 'react-redux';
import { addFile } from './actions/index';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize';

const onDrop = (dispatch, acceptedFiles, rejectedFiles) => {
  acceptedFiles.forEach(file => {
    dispatch(addFile(file));
  });
};

const App = ({ dispatch }) => (
  <main className="App container">
    <header className="App-header">
      <img height="80px" src={logo} className="App-logo" alt="logo" />
    </header>
    <div className="App-content">
      <Dropzone
        onDrop={onDrop.bind(null, dispatch)}
        className="App-dropZone z-depth-3"
      >
        <span className="flow-text">Drop a file, or click to upload.</span>
      </Dropzone>
      <FileList />
    </div>
  </main>
);

export default connect()(App);
