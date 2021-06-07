import React, { Component } from "react";
import { Alert, KeyboardAvoidingView, ScrollView } from "react-native";
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
  Picker,
  DatePicker
} from "native-base";
import styles from "./styles";
import agent from '../../services/agent';
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const status = ['NEW', 'VERIFIED', 'PROPOSED', 'WIN'];
const ItemPicker = Picker.Item;
class OpportunityEdit extends Component {
  constructor() {
    super()
    this.state = {
      updatingOpportunity: null,
      OpportunityName: '',
      status: 'NEW',
      sale: null,
      contact: null,
      amount: '',
      createdDate: null,
      disableEdit: true,
      description: ''
    }
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentWillMount() {
    const { navigation } = this.props;
    const id = navigation.getParam('id', 'NO-ID');
    if (id == 'new') {
      this.setState({
        disableEdit: false
      });
      return;
    }
    let setStateInRequest = (Opportunity) => {
      this.setState({
        updatingOpportunity: Opportunity,
        OpportunityName: Opportunity.title,
        description: Opportunity.description,
        amount: Opportunity.amount ? Opportunity.amount : 0,
        status: Opportunity.status ? Opportunity.status : 'NEW',
        createdDate: new Date(Opportunity.createdDate),
        oldCreatedDate: moment(Opportunity.createdDate).format('DD-MM-YYYY')
      })
    }
    agent.OpportunityApi.getOpportunity(id).then(function (res) {
      var result = res.resultData;
      if (result) {
        setStateInRequest(result);
      }
      else {
        alert("error data !");
      }
    }, function (err) {
      alert("error !");
    })
  }

  onValueChangeStatus(value) {
    this.setState({
      status: JSON.parse(value)
    });
  }

  setDate(newDate) {
    this.setState({ createdDate: newDate });
  }

  handleEdit() {
    this.setState({
      disableEdit: false
    })
  }

  handleSave() {
    const { navigation } = this.props;
    const id = navigation.getParam('id', 'NO-ID');
    var url = '/opportunity/add';
    var bodyObject = {
      title: this.state.OpportunityName,
      status: this.state.status,
      createdDate: this.state.createdDate.getTime(),
      amount: this.state.amount ? parseInt(this.state.amount) : 0,
      description: this.state.description,
      sale: { id: 1 },
      contact: { id: 1 }
    }
    if (id != 'new') {
      url = '/opportunity/update'
      bodyObject.id = id.toString()
    }
    console.log(bodyObject);
    return agent.asyncRequests.post(url, bodyObject
    ).then(function (res) {
      var result = JSON.parse(res._bodyInit)['resultData'];
      if (result && result.id) {
        navigation.navigate("ListOpportunity");
      } else {
        alert("Có lỗi khi lưu trữ !")
      }
    }, function (err) {
      alert("Lỗi ! Quý khách vui lòng kiểm tra kết nối internet và thử lại");
    });
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header searchBar rounded>
          <Left>
            <Button transparent onPress={() => this.props.navigation.navigate("ListOpportunity")}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Chi Tiết</Title>
          </Body>
          <Right>
            {this.state.disableEdit ? null :
              <Button onPress={this.handleSave.bind(this)}>
                <Text>Lưu</Text>
              </Button>
            }
            <Button onPress={this.handleEdit}>
              <Text>Sửa</Text>
            </Button>
          </Right>
        </Header>

        <Content padder>
          <ScrollView style={{ flex: 1, backgroundColor: 'white' }} ref='scroll'>
            <KeyboardAvoidingView>
              <Form>
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Tên Cơ Hội</Text>
                <Item >
                  <Input disabled={this.state.disableEdit} onChangeText={(value) => this.setState({ OpportunityName: value })} value={this.state.OpportunityName} />
                </Item>
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Nhân Viên Tạo</Text>
                <Item>
                  <Input disabled={this.state.disableEdit} value="Nguyễn Văn An" />
                </Item>
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Ngày Tạo</Text>
                <Item>
                  {
                    this.state.disableEdit ?
                      <Input disabled value={this.state.oldCreatedDate} />
                      :
                      <DatePicker
                        minimumDate={new Date(2000, 1, 1)}
                        maximumDate={new Date(2999, 12, 31)}
                        timeZoneOffsetInMinutes={undefined}
                        modalTransparent={false}
                        animationType={"fade"}
                        androidMode={"default"}
                        placeHolderText={this.state.oldCreatedDate}
                        textStyle={{ color: "green" }}
                        placeHolderTextStyle={{ color: "#000000" }}
                        onDateChange={this.setDate.bind(this)}
                      />
                  }
                </Item>
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Amount</Text>
                <Item>
                  <Input disabled={this.state.disableEdit} onChangeText={(value) => this.setState({ amount: value })} value={this.state.amount.toString()} />
                </Item>
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Trạng Thái</Text>
                <Item>
                  {
                    this.state.disableEdit ?
                      <Input disabled value={this.state.status} />
                      :
                      <Picker
                        disabled={this.state.disableEdit}
                        iosHeader="Select one"
                        mode="dropdown"
                        selectedValue={JSON.stringify(this.state.status)}
                        onValueChange={this.onValueChangeStatus.bind(this)}>
                        {status.map((item, index) => { return <ItemPicker key={index} value={JSON.stringify(item)} label={item} /> })}
                      </Picker>
                  }

                </Item>
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Mô Tả</Text>
                <Item >
                  <Textarea disabled={this.state.disableEdit} style={{ width: '100%' }} rowSpan={4} onChangeText={(value) => this.setState({ description: value })} value={this.state.description} />
                </Item>
              </Form>
            </KeyboardAvoidingView>
            <Text style={{ height: 250 }}>
            </Text>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

export default OpportunityEdit;
