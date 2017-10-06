
import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Header, Content, Title, Body, Left, Right, Button, Icon, Text } from 'native-base';

//import { Header } from '../../common';
import FeedItemList from  './FeedItemList';

class Feed extends Component {

    resetSource() {
        this.props.clearSource();
    }

    render() {
        var { selectedSource } = this.props;

        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent
                            onPress={() => this.resetSource()}
                        >
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{selectedSource.title}</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <FeedItemList sourceURL={selectedSource.url} />
                </Content>
            </Container>
        )
    }
}

const styles = {
    containerViewStyle: {

    }
}

export default Feed;