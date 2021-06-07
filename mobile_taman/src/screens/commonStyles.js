const React = require("react-native");
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;
import { Constants } from 'expo';

export default {
  container: {
    backgroundColor: "#CCC",
    // backgroundImage:drawerCover,
    flex: 1,
    width: null,
    height: null,
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },
  text: {
    alignSelf: "center",
    marginBottom: 7
  },
  mb: {
    marginBottom: 15
  },
  shadow: {
    shadowColor: 'grey',
    fontSize: 30, 
    color: 'green',
    shadowOpacity: 1,
    shadowRadius: 5,
    // iOS
    shadowOffset: {
        width: 0,            // These can't both be 0
        height: 1,           // i.e. the shadow has to be offset in some way
    },
    // Android
    shadowOffset: {
        width: 0,            // Same rules apply from above
        height: 1,           // Can't both be 0
    },
  }
};