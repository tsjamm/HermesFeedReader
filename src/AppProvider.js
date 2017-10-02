
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './components/App';
import reducers from './reducers';

class AppProvider extends Component {
    render() {
        return (
            <Provider store={createStore(reducers)} >
                <App />
            </Provider>
        ) 
    }
}

export default AppProvider;