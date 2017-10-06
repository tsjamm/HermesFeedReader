
import React, { Component } from 'react';
import { View } from 'react-native';

import { Header } from '../../common';
import FeedItemList from  './FeedItemList';

class Feed extends Component {

    resetSource() {
        this.props.clearSource();
    }

    render() {
        var { selectedSource } = this.props;

        return (
            <View style={styles.containerViewStyle} >
                <Header 
                    backButtonText="<" 
                    onBackButtonTap={this.resetSource.bind(this)}
                >
                    {selectedSource.title}
                </Header>
                <FeedItemList sourceURL={selectedSource.url} />
            </View>
        )
    }
}

const styles = {
    containerViewStyle: {

    }
}

export default Feed;