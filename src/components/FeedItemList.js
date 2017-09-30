
import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import axios from 'axios';
import { parseString } from 'xml2js';

class FeedItemList extends Component {
    state = { feedItem: {}, isLoading: true };

    componentWillMount() {
        axios.get(this.props.sourceURL)
            .then(response => {
                parseString(response.data, (err, result) => {
                    this.setState({ feedItem: result, isLoading: false });
                });
            })
    }

    getFeedTitle() {
        if(this.state.feedItem && this.state.feedItem.feed && this.state.feedItem.feed.title && this.state.feedItem.feed.title.length > 0 ) {
            return this.state.feedItem.feed.title[0]["_"];
        }
        return "Title Unavailable";
    }

    getFeedSubTitle() {
        if(this.state.feedItem && this.state.feedItem.feed && this.state.feedItem.feed.subtitle && this.state.feedItem.feed.subtitle.length > 0 ) {
            return this.state.feedItem.feed.subtitle[0]["_"];
        }
        return "Subtitle Unavailable";
    }

    getFeedEntries() {
        if(this.state.feedItem && this.state.feedItem.feed && this.state.feedItem.feed.entry) {
            return this.state.feedItem.feed.entry.map((entryObj) => {
                return (
                    <View key={entryObj["id"][0]}>
                        <Text>{entryObj["title"][0]["_"]}</Text>
                        <Text>{entryObj["author"][0]["name"][0]}</Text>
                        <Text>{entryObj["summary"][0]["_"]}</Text>
                    </View>
                )
            });
        }
    }

    render() {
        if(this.state.isLoading) {
            return (
                <View style={styles.viewStyle}>
                    <Text style={styles.textStyle}>
                        Loading...
                    </Text>
                </View>
            );
        }
        return (
            <ScrollView>
                <View>
                    <Text style={styles.textStyle}>
                        {this.getFeedTitle()}
                    </Text>
                    <Text>
                        {this.getFeedSubTitle()}
                    </Text>
                </View>
                {this.getFeedEntries()}
            </ScrollView>
        );
    }
}

const styles = {
    viewStyle: {
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        paddingTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative'
    },
    textStyle: {
        fontSize: 20
    }
}

export { FeedItemList };