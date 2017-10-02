
import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

class Header extends Component {

    renderBackButton() {
        if(this.props.backButtonText) {
            return (
                <TouchableOpacity 
                    onPress={() => this.props.onBackButtonTap()} 
                    style={styles.backButtonStyle}
                >
                    <Text>
                        {this.props.backButtonText}
                    </Text>
                </TouchableOpacity>
            );
        }
    }

    render() {
        const { textStyle, viewStyle } = styles;
        return (
            <View style={viewStyle}>
                {this.renderBackButton()}
                <Text style={textStyle}>
                    {this.props.children}
                </Text>
            </View>
        )
    }
}

const styles = {
    viewStyle: {
        backgroundColor: '#F8F8F8',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        paddingTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative',
        flexDirection: 'row'
    },
    textStyle: {
        fontSize: 20,
        textAlign: 'center',
        flex: 1
    },
    backButtonStyle: {
        paddingLeft: 10,
        paddingRight: 20
    }
}

export { Header };