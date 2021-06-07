import React from "react";
import { StatusBar } from "react-native";
import { Root } from "native-base";
import {Provider} from 'react-redux';
import { store } from './store/index';
import { StackNavigator, DrawerNavigator } from "react-navigation";
import Home from "./screens/home/";
// import UserList from "./screens/user/UserList";
// import UserEdit from "./screens/user/UserEdit";
import UserLeaveDayList from "./screens/user/UserLeaveDayList";
import ListOpportunity from './screens/opportunity/ListOpportunity';
import OpportunityEdit from './screens/opportunity/OpportnityEdit';
import Login from "./screens/login/login";
import SideBar from "./screens/sidebar";
import Test from "./screens/Test";
import LeaveDayList from "./screens/leaveLetter/LeaveDayList";
import FormLeaveLetter from "./screens/leaveLetter/FormLeaveLetter";
import Dashboard from "./screens/home/Dashboard";
import FooterComponent from "./screens/footer/FooterComponent";

// danh sách các màn hình có thể thao tác với drawer menu
const Drawer = DrawerNavigator(
  {
    // UserList: { screen: UserList },
    // UserEdit: { screen: UserEdit },
    Dashboard: {screen: Dashboard},
    UserLeaveDayList:{screen:UserLeaveDayList},
    FormLeaveLetter:{screen:FormLeaveLetter},
    LeaveDayList: {screen:LeaveDayList},
    ListOpportunity: { screen: ListOpportunity},
    OpportunityEdit: { screen: OpportunityEdit}
  },
  {
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    // danh sách menu trong drawer lấy từ componet SideBar
    contentComponent: props => <SideBar {...props} />,
    footerComponent: props =>  <FooterComponent {...props}/>

  }
);
// khai báo các màn hình để chuyển trang
const AppNavigator = StackNavigator(
  {
    Test: Test,
    Home: {screen: Home},
    Login: {screen: Login},
    // UserList: {screen: UserList},
    // UserEdit: {screen: UserEdit},
    Drawer: { screen: Drawer },
    FormLeaveLetter:{screen:FormLeaveLetter},
    Dashboard: {screen: Dashboard},
    UserLeaveDayList: {screen: UserLeaveDayList},
    LeaveDayList: {screen:LeaveDayList},
    ListOpportunity: { screen: ListOpportunity},
    OpportunityEdit: { screen: OpportunityEdit}
  },
  // chỉ định màn hình khi khởi động app
  {
    initialRouteName: "Home",
    headerMode: "none"
  }
);

export default () =>
<Provider store={store}>
  <Root>
    <StatusBar barStyle="light-content" />
    <AppNavigator />
  </Root>
  </Provider>;
