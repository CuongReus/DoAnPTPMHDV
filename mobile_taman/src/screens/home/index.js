import React, { Component } from "react";
import { ImageBackground, View, StatusBar } from "react-native";
import {reduxForm} from 'redux-form';
import { Container, Button, H3, Text } from "native-base";
import { connect } from 'react-redux';
import styles from "./styles";
import sessionStorage from "../../services/sessionStorage";
import agent from "../../services/agent";
import { APP_LOAD } from "../../constants/action-types";

const launchscreenBg = require("../../../assets/launchscreen-bg.jpg");


const validate = values => {
  const errors = {};
 
  return errors;
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
  dispatch({ type: APP_LOAD, payload: payload, token: token, skipTracking: true }),
});


class Home extends Component {
  componentWillMount() {
    var _this= this;
    sessionStorage.getItem("token").then((value) => {
      if (value) { // already login, go directly to Dashboard
        agent.setToken(value);
        _this.props.onLoad(agent.AuthService.current(), value);
        _this.props.navigation.navigate("Dashboard");
      }
    })
  }

  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" />
        <ImageBackground source={launchscreenBg} style={styles.imageContainer}>
          <View style={styles.logoContainer}>
            {/* <ImageBackground source={launchscreenLogo} style={styles.logo} /> */}
          </View>
          <View
            style={{
              alignItems: "center",
              marginBottom: 50,
              backgroundColor: "transparent"
            }}
          >
            <H3 style={styles.text}>Tâm An CRM</H3>
            <View style={{ marginTop: 8 }} />
            <H3 style={styles.text}> Trang Trí Nội Thất Tâm An</H3>
            <View style={{ marginTop: 8 }} />
          </View>
          <View style={{ marginBottom: 80 }}>
            <Button
              style={{ backgroundColor: "#6FAF98", alignSelf: "center" }}
              onPress={() => this.props.navigation.navigate("Login")}
            >
              <Text>START</Text>
            </Button>
          </View>
        </ImageBackground>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
      form: 'Home',
      destroyOnUnmount: false,
      validate
  })(Home))

