
import React, { Component } from 'react';
import { View, ScrollView, Text, ListView } from 'react-native';
import axios from 'axios';
import { parseString } from 'xml2js';
import HTMLView from 'react-native-htmlview';

class FeedItemList extends Component {
    state = { feedItem: {}, isLoading: true, dataSource: []};

    componentWillMount() {

        axios.get(this.props.sourceURL)
            .then(response => {
                parseString(response.data, (err, result) => {
                    this.setFeedListDataSource(result);
                });
            })
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.state.dataSource != nextState.dataSource) {
            const ds = new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            });

            this.dataSource = ds.cloneWithRows(nextState.dataSource);
        }
    }

    getFieldValue(property="", style={}) {
        if(this.state.feedItem) {

            var outerObj = null;
            if(this.state.feedItem.feed) {
                outerObj = this.state.feedItem.feed
            }
            if(this.state.feedItem.rss && this.state.feedItem.rss.channel && this.state.feedItem.rss.channel.length > 0) {
                outerObj = this.state.feedItem.rss.channel[0];
            }
            return this.getXMLReactTag(outerObj, property, style);
        }
    }

    getXMLReactTag(outerObj=null, property="", style={}, htmlStyle) {
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
                            value={outerObj[property][0]["_"].replace(/\<img\s/g,'<image ')}
                            stylesheet={htmlStyle?htmlStyle:{}}
                        />
                    );
                }
            } else {
                if(htmlStyle) {
                    return (
                        <HTMLView style={style}
                            value={outerObj[property][0].replace(/\<img\s/g,'<image ')}
                            stylesheet={htmlStyle}
                        />
                    );
                }
                return (
                    <Text style={style}>
                        {outerObj[property][0]}
                    </Text>
                )
            }
        }
        return false
    }

    setFeedListDataSource(xml2jsonResult) {
        var newDataSource = {}
        if(xml2jsonResult) {
            var outerObj = null;
            if(xml2jsonResult.feed) {
                outerObj = xml2jsonResult.feed
            }
            if(xml2jsonResult.rss && xml2jsonResult.rss.channel && xml2jsonResult.rss.channel.length > 0) {
                outerObj = xml2jsonResult.rss.channel[0];
            }

            if(outerObj && outerObj.entry) {
                newDataSource = outerObj.entry;
                //this.setState({ dataSource: outerObj.entry, feedItem: result, isLoading: false  });
                //this.dataSource = ds.cloneWithRows(outerObj.entry);
            }
            if(outerObj && outerObj.item) {
                newDataSource = outerObj.item;
                //this.setState({ dataSource: outerObj.item, feedItem: result, isLoading: false  });
                //this.dataSource = ds.cloneWithRows(outerObj.item);
            }
        }
        
        this.setState({ 
            feedItem: xml2jsonResult, 
            isLoading: false,
            dataSource: newDataSource
        });
    }

    renderRow(source) {
        var title = this.getXMLReactTag(source, "title", styles.textStyle)
        var content = this.getXMLReactTag(source, "content");
        var summary = this.getXMLReactTag(source, "summary");
        var description = this.getXMLReactTag(source, "description", {}, {})
        return (
            <View style={styles.summaryStyle}>
                {title}
                {content?content:(summary?summary:(description?description:"Content/Summary/Description Not Available"))}
            </View>
        )
    }

    render() {
        if(this.state.isLoading) {
            return (
                <View style={styles.loadingViewStyle}>
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
                <ListView
                    dataSource={this.dataSource}
                    renderRow={this.renderRow.bind(this)}
                />
            </ScrollView>
        );
    }
}

const styles = {
    loadingViewStyle: {
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

export default FeedItemList;