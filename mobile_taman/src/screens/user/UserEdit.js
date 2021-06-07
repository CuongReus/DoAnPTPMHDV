// import React, { Component } from "react";
// import { Alert, KeyboardAvoidingView, ScrollView, StatusBar } from "react-native";
// import {
//   Container,
//   Header,
//   Title,
//   Content,
//   Button,
//   Icon,
//   Text,
//   Left,
//   Right,
//   Body,
//   Item,
//   Input,
//   Form,
//   Textarea,
// } from "native-base";
// import styles from "../commonStyles";
// import agent from '../../services/agent';
// import moment from 'moment';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// class UserEdit extends Component {
//   constructor() {
//     super()
//     this.state = {
//       updatingUser: null,
//       fullName: '',
//       birthday: null,
//       company: {},
//       disableEdit: true
//     }
//   }

//   componentWillMount() {
//     const { navigation } = this.props;
//     const id = navigation.getParam('id', 'NO-ID');
//     let setStateInRequest = (user) => {
//       this.setState({
//         updatingUser: user,
//         fullName: user.fullName,
//         company: user.company,
//         birthday: moment(user.birthday).format('DD-MM-YYYY')
//       });
//     }
//     agent.asyncRequests.get('/user/' + id).then(function (res) {
//       var result = res.resultData;
//       if (result) {
//         setStateInRequest(result);
//       }
//       else {
//         alert("Error loading data. " + JSON.stringify(res));
//       }
//     }, function (err) {
//       alert("Error connect to server!");
//     })
//   }

//   render() {
//     return (
//       <Container style={styles.container}>
//         <StatusBar barStyle="light-content" />
//         <Header searchBar rounded>
//           <Left>
//             <Button transparent onPress={() => this.props.navigation.navigate("UserList")}>
//               <Icon name="arrow-back" />
//             </Button>
//           </Left>
//           <Body>
//             <Title>Chi Tiết Nhân Viên</Title>
//           </Body>
//         </Header>

//         <Content padder>
//           <ScrollView style={{ flex: 1, backgroundColor: 'white' }} ref='scroll'>
//             <KeyboardAvoidingView>
//               <Form>
//                 <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Tên Nhân Viên</Text>
//                 <Item >
//                   <Input disabled={this.state.disableEdit} value={this.state.fullName} />
//                 </Item>
//                 <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Ngày Sinh</Text>
//                 <Item>
//                   <Input disabled={this.state.disableEdit} value={this.state.birthday} />
//                 </Item>
//                 <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Công ty</Text>
//                 <Item>
//                       <Input disabled value={this.state.company.name} />
//                 </Item>
//               </Form>
//             </KeyboardAvoidingView>
//             <Text style={{ height: 250 }}>
//             </Text>
//           </ScrollView>
//         </Content>
//       </Container>
//     );
//   }
// }

// export default UserEdit;
