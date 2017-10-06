
import React, { Component } from 'react';
import { View } from 'react-native';

import { Header } from '../../common';
import SourceItemList from  './SourceItemList';

class Sources extends Component {

    render() {
        const { sources, selectSource} = this.props;
        return (
            <View style={styles.containerViewStyle} >
                <Header>
                    Sources
                </Header>
                <SourceItemList sources={sources} selectSource={selectSource.bind(this)} />
            </View>
        )
    }
}

const styles = {
    containerViewStyle: {

    }
}

export default Sources;