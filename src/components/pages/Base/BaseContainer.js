
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Base from './Base';
import * as actions from '../../../actions';

const mapStateToProps = (state, ownProps) => {
    /// TODO: Need to figure out logic to display source list or feed list
    return state;
}

const mapDispatchToProps = (dispatch) => {
    /// TODO: Need to write mappings to dispatch
    return actions;
}

export default connect(mapStateToProps, actions)(Base);