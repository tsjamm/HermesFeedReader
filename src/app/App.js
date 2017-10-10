
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../actions';

import { BaseContainer } from '../components/pages';

class App extends Component {

    render() {
        return (
            <View style={styles.mainViewStyle}>
                <BaseContainer />
            </View>
        )
    }
}

const styles = {
    mainViewStyle: {
        flex: 1
    }
}

export default App;