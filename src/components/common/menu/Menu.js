
import React, { Component } from 'react';
import { Drawer } from 'native-base';
import SideBar from '../sidebar';

export default class Menu extends Component {

  componentDidMount() {
    if(this.props.menuOpen) {
      this.openDrawer();
    } else {
      this.closeDrawer();
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.menuOpen) {
      this.openDrawer();
    } else {
      this.closeDrawer();
    }
  }

  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };

  render() {
    
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar navigator={this.navigator} />}
        onClose={this.props.closeMenu.bind(this)} >
        {this.props.children}
      </Drawer>
    );
  }
}