// import React, { Component } from "react";
// import { FlatList, Alert, AsyncStorage, StatusBar } from "react-native";
// import agent from '../../services/agent';
// import {
//   Container,
//   Header,
//   Title,
//   Content,
//   Button,
//   Icon,
//   ListItem,
//   Text,
//   Left,
//   Right,
//   Body,    
//   Footer,
//   FooterTab,
//   Thumbnail
// } from "native-base";
// import styles from "../commonStyles";
// const API_HOST = 'http://192.168.0.113:8080';

// class UserList extends Component {
//   state = {
//     listUser: []
//   };
// componentWillMount(){ 
//   let setStateInRequest = (list) => {this.setState({listUser: list})}
//   return agent.asyncRequests.getPage("/leaveLetter/listLeaveDay?fullName=", 0).then(function (res){
//    var result = res.resultData;
//     if(result){
//       setStateInRequest(result.content);
//     }
//     else{
//       alert('Error in resultData. ' + JSON.stringify(res));
//     }
//   }, function(err){
//     alert('Error to connect server !')
//   })
//   }
//   onScrollEnd(e) {
//     let contentOffset = e.nativeEvent.contentOffset;
//     let viewSize = e.nativeEvent.layoutMeasurement;

//     // Divide the horizontal offset by the width of the view to see which page is visible
//     let pageNum = Math.floor(contentOffset.x / viewSize.width);
//     console.log('scrolled to page ', pageNum);
//   }
//   render() {
//     return ( 
//       <Container style={styles.container}>
//         <StatusBar barStyle="light-content" />
//         <Header>
//         <Button transparent  onPress={() => this.props.navigation.navigate("DrawerOpen")}>
//             <Icon name="apps" />
//         </Button>
//           <Body>
//             <Title>Danh Sách Người Dùng</Title>
//           </Body>
//         </Header>
//         <Content>
//           <FlatList
//             data={this.state.listUser}
//             extraData={this.state}
//             keyExtractor={(item, index) => String(index)}
//             renderItem={({ item, index }) => {
//               return (
//                 <ListItem thumbnail onPress={() => this.props.navigation.navigate("UserLeaveDayList", {id: item.id})}>
//                   <Left>
//                     <Thumbnail square source={{uri: API_HOST + item.image}} />
//                   </Left>
//                   <Body>
//                     <Text>
//                       {item.fullName}
//                     </Text>
//                     <Text numberOfLines={1} note>
//                       {item.email}
//                     </Text>
//                     <Text numberOfLines={1} note>
//                       {item.phone}
//                     </Text>
//                   </Body>
//                   <Right>
//                     <Button transparent onPress={() => this.props.navigation.navigate("UserLeaveDayList", {id: item.id})}>
//                       <Text>Xem ></Text>
//                     </Button>
//                   </Right>
//               </ListItem>
                
//               );
//             }}
//           />
//         </Content>
//         <Footer>
//             <FooterTab>
//                 <Button vertical onPress={() => this.props.navigation.navigate('UserList')}>
//                     <Icon active name="apps" />
//                     <Text>Home</Text>
//                 </Button>
//                 <Button vertical onPress={() => this.props.navigation.navigate('UserLeaveDayList')}>
//                     <Icon name="person" />
//                     <Text>Nhân Viên</Text>
//                 </Button>
//             </FooterTab>
//         </Footer>
//       </Container>
//     );
//   }
// }

// export default UserList;
