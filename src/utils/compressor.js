import { Config } from '../../config';
import { hasExtension } from './file-utils';

const JSZip = require('jszip');
const jsZip = new JSZip();

exports.zip = files => {
  debugger;
  // const archive = jsZip.folder(Config.compression.zip.defaultFolderName);
  files.forEach(file => {
    jsZip.file(file.name, file);
  });
  return jsZip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: Config.compression.zip.compressionOptions
  });
};

exports.unZip = compressedFile => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const fileAsBinaryString = reader.result;
      jsZip.loadAsync(fileAsBinaryString).then(zip => {
        const promises = [];
        Object.keys(zip.files)
          .filter(filename => hasExtension(filename))
          .forEach(filename => {
            promises.push(
              jsZip
                .file(filename)
                .async('uint8array')
                .then(content => ({ content, name: filename }))
            );
          });

        Promise.all(promises).then(values => resolve(values));
      });
    };

    reader.onabort = () => reject(new Error('file reading was aborted'));
    reader.onerror = () => reject(new Error('file reading was failed'));
    reader.readAsBinaryString(compressedFile);
  });
};
