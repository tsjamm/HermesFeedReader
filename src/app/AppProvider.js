
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import AppContainer from './AppContainer';
import reducers from '../reducers';

class AppProvider extends Component {
    render() {
        return (
            <Provider store={createStore(reducers)} >
                <AppContainer />
            </Provider>
        ) 
    }
}

export default AppProvider;