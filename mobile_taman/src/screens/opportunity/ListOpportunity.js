import React, { Component } from "react";
import { FlatList, Alert, AsyncStorage } from "react-native";
import agent from '../../services/agent';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  ListItem,
  Text,
  Left,
  Right,
  Body
} from "native-base";
import styles from "./stylesListOpportunity";

class ListOpportunity extends Component {
  state = {
    listOpportunity: []
  };
componentWillMount(){ 
  let setStateInRequest = (list) => {this.setState({listOpportunity: list})}
  return agent.OpportunityApi.getAllOpportunity().then(function (res){
   var result = res.resultData.content;
    if(result){
    let list = result.map(Opportunity =>{
      return {id: Opportunity.id, name: Opportunity.title}
    })
      setStateInRequest(list);
    }
    else{
      alert('error in resultData');
    }
  }, function(err){
    alert('error !')
  })
}
  render() {
    return ( 
      <Container style={styles.container}>
        <Header>
        <Button transparent  onPress={() => this.props.navigation.navigate("DrawerOpen")}>
            <Icon name="apps" />
        </Button>
          <Body>
            <Title>Danh Sách Cơ Hội</Title>
          </Body>
            <Button onPress={() => this.props.navigation.navigate("OpportunityEdit", {id: 'new'})}>
              <Icon name="add" />
            </Button>
        </Header>
        <Content>
          <FlatList
            data={this.state.listOpportunity}
            extraData={this.state}
            keyExtractor={(item, index) => String(index)}
            renderItem={({ item, index }) => {
              return (
                <ListItem
                  onPress={() => this.props.navigation.navigate("OpportunityEdit", {id: item.id})}
                >
                  <Left>
                    <Text>
                      {item.name}
                    </Text>
                  </Left>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}

export default ListOpportunity;
