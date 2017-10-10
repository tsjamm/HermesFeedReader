
import { combineReducers } from 'redux';
import SourcesReducer from './SourcesReducer';
import SelectionReducer from './SelectionReducer';
import MenuReducer from './MenuReducer';

export default combineReducers({
    sources: SourcesReducer,
    selectedSource: SelectionReducer,
    menuOpen: MenuReducer
});