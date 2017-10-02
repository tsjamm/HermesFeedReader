
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { Header, FeedItemList } from './common';
import FeedSourceList from './common/FeedSourceList';
import * as actions from '../actions';

const mapStateToProps = (state, ownProps) => {
    ///Need to figure out logic to display source list or feed list
    return state
}

class App extends Component {

    renderList() {
        var { selectedSource } = this.props;
        if(selectedSource) {
            return <FeedItemList sourceURL={selectedSource.url}  />
        }
        return <FeedSourceList />
    }

    renderHeader() {
        var { selectedSource } = this.props;
        console.log(selectedSource);
        if(selectedSource) {
            return (
                <Header 
                    backButtonText="<" 
                    onBackButtonTap={this.resetSource.bind(this)}
                >
                    {selectedSource.title}
                </Header>
            )
        }
        return (
            <Header>
                Sources
            </Header>
        )
    }

    resetSource() {
        console.log(this.props);
        this.props.clearSource();
    }

    render() {
        return (
            <View style={styles.mainViewStyle}>
                {this.renderHeader()}
                {this.renderList()}
                {/*<FeedItemList sourceURL={'https://news.google.com/news/feeds?pz=1&cf=all&ned=us&hl=en&q=nodejs&output=atom'} />*/}
                {/*<FeedItemList sourceURL={'https://stackoverflow.com/feeds/question/10943544'} />*/}
                {/*<FeedItemList sourceURL={'http://www1.cbn.com/app_feeds/rss/news/rss.php?section=world'} />*/}
            </View>
        )
    }
}

const styles = {
    mainViewStyle: {
        flex: 1
    }
}

export default connect(mapStateToProps, actions)(App);