
import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import axios from 'axios';
import { parseString } from 'xml2js';
import HTMLView from 'react-native-htmlview';

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

    getFieldValue(property="", style={}) {
        if(this.state.feedItem) {
            var outerObj = this.state.feedItem.feed || this.state.feedItem.channel || null;
            return this.getXMLReactTag(outerObj, property, style);
        }
    }

    getXMLReactTag(outerObj=null, property="", style={}, htmlStyle={}) {
        if(outerObj && outerObj[property] && outerObj[property].length > 0 ) {
            var valueWithAttrs = outerObj[property][0]["_"]
            if(valueWithAttrs) {
                var attribs = outerObj[property][0]['$'];
                if(attribs && attribs['type'] == 'text') {
                    return (
                        <Text style={style}>
                            {outerObj[property][0]["_"]}
                        </Text>
                    );
                }
                if(attribs && attribs['type'] == 'html') {
                    return (
                        <HTMLView style={style}
                            value={outerObj[property][0]["_"]}
                            stylesheet={htmlStyle}
                        />
                    );
                }
            } else {
                <Text style={style}>
                    {outerObj[property][0]}
                </Text>
            }
        }
        return (
            <Text style={style}>
                Property Unavailable: {property}
            </Text>
        )
    }

    getFeedEntries() {
        if(this.state.feedItem) {
            var outerObj = this.state.feedItem.feed || this.state.feedItem.channel || null;

            if(outerObj.entry) {
                return outerObj.entry.map((innerObj) => {
                    return (
                        <View key={innerObj["id"][0]} style={styles.summaryStyle}>
                            {this.getXMLReactTag(innerObj, "title")}
                            {this.getXMLReactTag(innerObj, "summary")}
                        </View>
                    )
                });
            }
            if(outerObj.index) {
                return outerObj.entry.map((innerObj) => {
                    return (
                        <View key={innerObj["id"][0]} style={styles.summaryStyle}>
                            {this.getXMLReactTag(innerObj, "title")}
                            {this.getXMLReactTag(innerObj, "description")}
                        </View>
                    )
                });
            }
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
                    {this.getFieldValue("title", styles.titleStyle)}
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
    },
    summaryStyle: {
        margin:10,
        padding:10,
        borderWidth: 1,
        borderColor: '#d6d7da',
        borderRadius: 4
    },
    titleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        margin:10,
        justifyContent: 'center'
    },
}

export { FeedItemList };