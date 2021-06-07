import * as Expo from "expo";
import * as Font from 'expo-font';
import FontAwesome from '../../node_modules/@expo/vector-icons/FontAwesome.js';
import { Ionicons } from '@expo/vector-icons';
import React, { Component } from "react";
import { StyleProvider } from "native-base";

import App from "../App";
import getTheme from "../theme/components";
import variables from "../theme/variables/commonColor";

export default class Setup extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }
  componentWillMount() {
    this.loadFonts();
  }
  async loadFonts() {
    try {
      await Font.loadAsync({
        FontAwesome
      });
      this.setState({ fontLoaded: true });
    } catch (error) {
      console.log('error loading icon fonts', error);
    }
    this.setState({ isReady: true });
  }
  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return (
      <StyleProvider style={getTheme(variables)}>
        <App />
      </StyleProvider>
    );
  }
}