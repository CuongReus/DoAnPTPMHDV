import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Item,
  Label,
  Input,
  Body,
  Left,
  Icon,
  Form,
  Text,
  Thumbnail,
  Card,
  CardItem
} from "native-base";
import { View, Keyboard, StatusBar,Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
// import isEmail from 'sane-email-validation';
import styles from "../commonStyles";
import agent from '../../services/agent';
import session from '../../services/sessionStorage';
import {Field, reduxForm, formValueSelector} from 'redux-form';
import { LOGIN, FIRE_REDIRECT, LOGIN_PAGE_UNLOADED, RESEND_MAIL_ACTIVATION, ASYNC_CHECK_MATCH_AGENCY_USER, APP_LOAD } from "../../constants/action-types";
import { RenderTextInput, RenderPasswordInput } from "../../components/formInputs";
// import {LOGIN, FIRE_REDIRECT, LOGIN_PAGE_UNLOADED, RESEND_MAIL_ACTIVATION, ASYNC_CHECK_MATCH_AGENCY_USER } from '../constants/action-types';
const drawerCover = require("../../../assets/Logo_TamAn.png");
const validate = values => {
  const errors = {};
  if (!values.email ) {
      errors.email = 'Vui lòng nhập email';
  } else if (!values.email) {
      errors.email = 'Email không hợp lệ';
  }
  if (!values.password) {
      errors.password = 'Vui lòng nhập mật khẩu';
  }

  return errors;
}

const mapStateToProps = state => ({ ...state.auth
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
  dispatch({ type: APP_LOAD, payload: payload, token: token, skipTracking: true }),
});

class Login extends Component {
  constructor() {
    super()
    this.state = {
      username: 'admin@tamaninterior.com',
      password: 'Tam010689'
    }
    this.submitLogin = this.submitLogin.bind(this);
  }
  componentWillMount(){
  }

  submitLogin() {
    alert("Login in");
    const direct = (screens) => this.props.navigation.navigate(screens);
    var _this= this;

    return agent.AuthService.login(this.state.username, this.state.password).then(function (result) {
      if (result.access_token) {
        // hidden vitual keyboard
        Keyboard.dismiss();
        // render màn hình drawer menu và UserList
        session.setItem('token', result.access_token);
        agent.setToken(result.access_token);
         _this.props.onLoad(agent.AuthService.current(), result.access_token);
        // session.setItem('currentUser', email);
        direct("Drawer");
        direct("Dashboard");
        
      }
      else {
        alert('Sai thông tin đăng nhập !');
      }
    }, function (err) {
      alert('Lỗi kết nối khi đăng nhập !');
    })
  }
render() {
  const {
    email,
    handleSubmit,
    loginTo,
    submitting,
    invalid,
    pristine,
    errors } = this.props;
  return (
    <Container style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Header>
        <Left>
          <Button transparent onPress={() => this.props.navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Đăng Nhập</Title>
        </Body>
      </Header>

      <Content >
        <View style={{borderRadius:10,margin:50,marginTop:30}}>
        <Card style={{alignItems:'center'}}>
          <CardItem >
            <Body style={{alignItems:'center'}}>
          <Text style={{textAlign:'center',fontSize:30}}>{'\n'}Đang Nhập Hệ Thống </Text>
          <Form style={{width:"100%"}} >
            <Thumbnail square  source={drawerCover} style={{margin:10,alignItems:'center',height:"20%",width:"90%"}}/>
            <Item floatingLabel>
              <Label>Tài Khoản</Label>
              <Field  component={RenderTextInput}></Field>
            </Item>
            <Item floatingLabel>
              <Label>Mật Khẩu</Label>
              <Field    component={RenderPasswordInput}></Field>
            </Item>
            {/* <Button block style={{ margin: 15, marginTop: 30 }} onPress={handleSubmit(this.submitLogin)}> */}
            <Button block style={{ margin: 15, marginTop: 30 }} onPress={() => this.submitLogin()}>
              <Text>Đăng Nhập</Text>
            </Button>
            <TouchableOpacity onPress={() => this.submitLogin()}>
                <Text style={{color: 'white'}}>Log in</Text>
            </TouchableOpacity>
          </Form>
          </Body>
          </CardItem> 
        </Card>
    
        </View>
      </Content>
      
    </Container>
  );
}
}


export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
      form: 'Login',
      destroyOnUnmount: false,
      validate,
      asyncBlurFields: ["email"]
  })(Login))
