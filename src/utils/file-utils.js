exports.extractExtension = filename => {
  const regex = filename.match(/(\w*)\.(\w{1,20})$/i);
  return regex !== null ? regex[2] : null;
};

exports.isCompressedFile = filename => {
  return ['zip'].indexOf(exports.extractExtension(filename).toLowerCase()) >= 0;
};

exports.hasExtension = filename => {
  return !!exports.extractExtension(filename);
};
