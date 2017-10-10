
import React, { Component } from 'react';

import { MenuContainer } from '../../common';

import { FeedContainer, SourcesContainer } from '../';

class Base extends Component {

    renderPage() {
        var { selectedSource } = this.props;
        if(selectedSource) {
            return (
                <FeedContainer />
            )
        }
        return <SourcesContainer />
    }

    render() {
        return (
            <MenuContainer>
                {this.renderPage()}
            </MenuContainer>
        )
    }
}

export default Base;