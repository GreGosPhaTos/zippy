exports.extractExtension = filename => {
  return filename.match(/(\w*)\.(\w{1,20})$/i)[2] || null;
};

exports.isCompressedFile = filename => {
  return ['zip'].indexOf(exports.extractExtension(filename).toLowerCase()) >= 0;
};
