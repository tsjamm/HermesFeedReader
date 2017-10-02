
import { combineReducers } from 'redux';
import SourcesReducer from './SourcesReducer';
import SelectionReducer from './SelectionReducer';

export default combineReducers({
    sources: SourcesReducer,
    selectedSource: SelectionReducer
});