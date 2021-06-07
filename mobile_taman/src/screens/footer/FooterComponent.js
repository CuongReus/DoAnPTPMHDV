import React, { Component } from "react";
import {
  Container,
  Button,
  Icon,
  Text,

  Footer,
  FooterTab,

} from "native-base";
import styles from "../commonStyles";

class FooterComponent extends Component {
  // state = {
  // };

  // componentWillMount() {
    
  // }
  

  render() {
 
    return (
        <Footer>
          <FooterTab>
            <Button transparent onPress={() => this.props.navigation.navigate('Dashboard')}>
              <Icon active name="home" />
              <Text>Home</Text>
            </Button>
            <Button vertical onPress={() => this.props.navigation.navigate('Dashboard')}>
              <Icon active name="person" />
              <Text>Thông Tin Cá Nhân</Text>
            </Button>
          </FooterTab>
        </Footer>
    );
  }
}

export default FooterComponent;
