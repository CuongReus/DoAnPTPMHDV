import React, { Component } from "react";
import { Alert, KeyboardAvoidingView, ScrollView, StatusBar, FlatList } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Text,
  Left,
  Right,
  Body,
  Item,
  Input,
  Form,
  Textarea,
  Footer,
  FooterTab,
  ListItem,
  Thumbnail,
  Card,
  CardItem
} from "native-base";
import styles from "../commonStyles";
import agent from '../../services/agent';
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FooterComponent from "../footer/FooterComponent";
const API_HOST = 'http://192.168.0.113:8080';

class UserLeaveDayList extends Component {
  state = {
    listLeaveLetter: []
  };

  componentWillMount() {
    const { navigation } = this.props;
    const id = navigation.getParam('id', 'NO-ID');
    let setStateInRequest = (list) => { this.setState({ listLeaveLetter: list }) }
    return agent.asyncRequests.getPage('/leaveLetter/listLeaveDay?fullName=', 0).then(function (res) {
      var result = res.body.resultData;
      if (result) {
        setStateInRequest(result);
      }
      else {
        alert('Error in resultData. ' + result.errorMessage);
      }
    }, function (err) {
      alert('Error to connect server !')
    })
  }
  onScrollEnd(e) {
    let contentOffset = e.nativeEvent.contentOffset;
    let viewSize = e.nativeEvent.layoutMeasurement;

    // Divide the horizontal offset by the width of the view to see which page is visible
    let pageNum = Math.floor(contentOffset.x / viewSize.width);
    console.log('scrolled to page ', pageNum);
  }

  render() {
    var data = this.state.listLeaveLetter;
    if(!data){
      return null;
    }
    return (
      <Container style={styles.container}>
        
        <StatusBar barStyle="light-content" />
        <Header searchBar rounded>
          <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
            <Icon name="apps" />
          </Button>
          <Item>
            <Icon name="ios-search" />
            <Input name="search" placeholder="Search" />
            <Icon name="ios-people" />
            </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <Content>
          <FlatList
            data={data.content}
            extraData={this.state}
            keyExtractor={(item, index) => String(index)}
            renderItem={({ item, index }) => {
              return (
            <ListItem style ={{backgroundColor:"white",borderRadius:10,margin:10}} thumbnail onPress={() => this.props.navigation.navigate("LeaveDayList", {id: item.id})}>
            {/* <Card >
            <CardItem body> */}
                  <Left >
                  <Thumbnail style={{margin:10}} source={{uri: 'http://2.gravatar.com/avatar/b7ecb9c610f978aa2e9ec77e3f64511c?s=96&d=mm&r=g'}}/>
                  </Left>
                  <Body>
                       <Text>{item.fullName}</Text>
                         <Text  numberOfLines={1} note>
                         Email: {item.email}
                         </Text>
                         <Text numberOfLines={1} note>
                         Số Điện Thoại:{item.phone}
                         </Text>
                         <Text numberOfLines={1} note>
                         Công Ty: {item.companyName}
                         </Text>
                         <Text numberOfLines={1} note>
                         Ngày Phép Năm:{item.leaveDayYear > 0 ? item.leaveDayYear : 0  }
                         </Text>
                         <Text numberOfLines={1} note>
                         Tổng Ngày Đã Nghỉ:{item.totalLeaveDays > 0 ? item.totalLeaveDays : 0}
                         </Text>
                  </Body>
                  <Right>
                    <Button transparent onPress={() => this.props.navigation.navigate("UserLeaveDayList", {id: item.id})}>
                      <Text>Xem ></Text>
                    </Button>
                  </Right>
                  {/* </CardItem>
                  </Card> */}
              </ListItem>
              
              );
            }}
          />
        </Content>
       <FooterComponent {...this.props}></FooterComponent>
      </Container>
    );
  }
}

export default UserLeaveDayList;
