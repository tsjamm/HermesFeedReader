
import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { Header, FeedItemList } from './components';

class App extends Component {
    render() {
        return (
            <View style={styles.mainViewStyle}>
                <Header>
                    Feed
                </Header>
                <FeedItemList sourceURL={'https://news.google.com/news/feeds?pz=1&cf=all&ned=us&hl=en&q=nodejs&output=rss'} />
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

export default App;