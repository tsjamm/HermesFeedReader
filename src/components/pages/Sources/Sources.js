
import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Header, Content, Title, Body, Left, Right, Button, Icon, Text } from 'native-base';

// import { Header } from '../../common';
import SourceItemList from  './SourceItemList';

class Sources extends Component {

    render() {
        const { sources, selectSource } = this.props;
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={this.props.toggleMenu.bind(this)}>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Sources</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <SourceItemList sources={sources} selectSource={selectSource.bind(this)} />
                </Content>
            </Container>
        )
    }
}

export default Sources;