import { combineReducers } from 'redux';
import { titleReducer } from './title';

const rootReducer = combineReducers({
  titleReducer,
});

export default rootReducer;
