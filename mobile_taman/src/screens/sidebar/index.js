import React, { Component } from "react";
import { Image } from "react-native";
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge,
  View,
  Thumbnail
} from "native-base";
import styles from "./style";
import { connect } from 'react-redux';
import {reduxForm} from 'redux-form';
import sessionStorage from "../../services/sessionStorage";
import commonStyles from "../commonStyles";
const drawerCover = require("../../../assets/drawer-cover.png");
// danh sách menu và màn hình liên kết tương ứng
const datas = [
  {
    name: "Màn Hình Chính",
    route: "Dashboard",
    icon: "menu",
    bg: "#48525D"
  },
  {
    name: "Quản Lý Nhân viên",
    route: "UserLeaveDayList",
    icon: "menu",
    bg: "#48525D"
  },
  // {
  //   name: "Tạo Đơn Nghỉ Phép",
  //   route: "UserLeaveDayList",
  //   icon: "menu",
  //   bg: "#48525D"
  // },
  // {
  //   name: "Quản Lý Cơ Hội",
  //   route: "ListOpportunity",
  //   icon: "paper",
  //   bg: "#48525D"
  // },
  {
    name: "Logout",
    route: "Login",
    icon: "menu",
    bg: "#48525D"
  }
];

const validate = values => {
  const errors = {};

  return errors;
}

const mapStateToProps = state => {
  var updateValue = {

  };
  return {

      currentUser: state.common.currentUser,

  };
};
const mapDispatchToProps = dispatch => ({

});
class SideBar extends Component {
 
  render() {
    // alert(navigation);
    const {currentUser} = this.props;
    if(!currentUser){
      return null;
    }
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
        >
         <View style={{backgroundColor: '#1E90FF', flex: 1, flexDirection: 'column', alignItems: 'center'}}>
            <View style={{marginBottom: 10, marginTop: 50}}>
              <Thumbnail source={{uri: 'http://2.gravatar.com/avatar/b7ecb9c610f978aa2e9ec77e3f64511c?s=96&d=mm&r=g'}}/>
            </View>
            <View>
              <Text>{currentUser ? currentUser.fullName : null}</Text>
            </View>
          </View>
          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem
                button
                noBorder
                onPress={() => {
                  if (data.name == "Logout") {
                    sessionStorage.removeItem("token");
                    sessionStorage.removeItem("currentUser");
                  }
                  this.props.navigation.navigate(data.route);
                }}
              >
                <Left>
                  <Icon
                    active
                    name={data.icon}
                    style={{ color: "#777", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>
                    {data.name}
                  </Text>
                </Left>
                {data.types &&
                  <Right style={{ flex: 1 }}>
                    <Badge
                      style={{
                        borderRadius: 3,
                        height: 25,
                        width: 72,
                        backgroundColor: data.bg
                      }}
                    >
                      <Text
                        style={styles.badgeText}
                      >{`${data.types} Types`}</Text>
                    </Badge>
                  </Right>}
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps)(
      reduxForm({
          form: 'SideBar',
          destroyOnUnmount: true,
          enableReinitialize: true,
          validate
      })(SideBar));
