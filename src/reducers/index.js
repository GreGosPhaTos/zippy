import { combineReducers } from 'redux';
import { isCompressedFile } from '../utils/file-utils';

const files = (state = [], action) => {
  switch (action.type) {
    case 'ADD_FILE':
      return [
        ...state,
        Object.assign(action.file, {
          id: action.id,
          isCompressed: isCompressedFile(action.file.name)
        })
      ];
    case 'REMOVE_FILE':
      return state.filter(({ id }) => id !== action.id);
    default:
      return state;
  }
};

export default combineReducers({
  files
});
