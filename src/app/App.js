
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../actions';

import SourcesContainer from '../components/pages/Sources';
import FeedContainer from '../components/pages/Feed';

class App extends Component {

    renderPage() {
        var { selectedSource } = this.props;
        if(selectedSource) {
            return (
                <FeedContainer />
            )
        }
        return <SourcesContainer />
    }

    render() {
        return (
            <View style={styles.mainViewStyle}>
                {this.renderPage()}
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