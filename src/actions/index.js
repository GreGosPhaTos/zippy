let nextFileId = 0;

export const addFile = file => {
  return {
    type: 'ADD_FILE',
    file,
    id: nextFileId++
  };
};

export const compressFiles = files => {
  return {
    type: 'COMPRESS_FILES',
    files
  };
};

export const unCompressFiles = files => {
  return {
    type: 'UNCOMPRESS_FILES',
    files
  };
};

export const removeFile = filter => {
  return {
    type: 'REMOVE_FILE'
  };
};
