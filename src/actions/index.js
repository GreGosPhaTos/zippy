let nextFileId = 0;

export const addFile = file => {
  return {
    type: 'ADD_FILE',
    file,
    id: nextFileId++
  };
};

export const clear = () => {
  return {
    type: 'CLEAR_FILES'
  };
};

export const removeFile = id => {
  return {
    type: 'REMOVE_FILE',
    id
  };
};
