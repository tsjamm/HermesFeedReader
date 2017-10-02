
import React, { Component } from 'react';
import { ListView, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const mapStateToProps = (state, ownProps) => {
    return {
        sources: state.sources
    }
}

class FeedSourceList extends Component {

    componentWillMount() {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(this.props.sources);
    }

    renderRow(source) {
        return (
            <TouchableOpacity 
                onPress={() => this.props.selectSource(source)} 
            >
                <View style={styles.summaryStyle} >
                    <Text style={styles.textStyle}>
                        {source.title}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <ListView
                dataSource={this.dataSource}
                renderRow={this.renderRow.bind(this)}
             />
        );
    }
}

const styles = {
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

export default connect(mapStateToProps, actions)(FeedSourceList);