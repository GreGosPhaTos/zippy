import { Config } from '../../config';

const JSZip = require('jszip');
const zip = new JSZip();

exports.zip = files => {
  debugger;
  const archive = zip.folder(Config.compression.zip.defaultFolderName);
  files.forEach(file => {
    archive.file(file.name, file);
  });
  return zip.generateAsync({
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
      // do whatever you want with the file content
      zip.loadAsync(fileAsBinaryString).then(zip => {
        resolve(zip);
      });
    };

    reader.onabort = () => reject(new Error('file reading was aborted'));
    reader.onerror = () => reject(new Error('file reading was failed'));
    reader.readAsBinaryString(compressedFile);
  });
};
