// import React, { Component } from 'react';
// import { Container, Content, Picker } from 'native-base';
// const Item = Picker.Item;
// const valueObj1 = {value: 'hai', id: '2', x: { y: '1'}};
// const valueObj2 = {value: 'ba', id: '3', x: { y: '2'}};
// const valueObj3 = {value: 'bon', id: '4', x: { y: '4'}};
// const valueObj4 = {value: 'nam', id: '5', x: { y: '5'}};
// const RenderItem = [
//     <Item key='1' label="Cats" value={JSON.stringify(valueObj1)} />,
//     <Item key='2' label="Dogs" value={JSON.stringify(valueObj2)} />,
//     <Item key='3' label="Birds" value={JSON.stringify(valueObj3)} />,
//     <Item key='4' label="Elephants" value={JSON.stringify(valueObj4)} />
// ];
// class PickerExample extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             selectedItem: undefined,
//             selected1: JSON.stringify(valueObj1),
//             results: {
//                 items: []
//             }
//         }
//     }
//     onValueChange (value) {
//         this.setState({
//             selected1 : JSON.parse(value)
//         });
//     }

//     render() {
//         return (
//             <Container>
//                 <Content>
//                     <Picker
//                         iosHeader="Select one"
//                         mode="dropdown"
//                         selectedValue={JSON.stringify(this.state.selected1)}
//                         onValueChange={this.onValueChange.bind(this)}>
//                         {RenderItem.map(item => {return item})}
//                    </Picker>
//                 </Content>
//             </Container>
//         );
//     }
// }

// export default  PickerExample;


// import React, { Component } from 'react';
// import { Container, Header, Content, DatePicker, Text } from 'native-base';
// import {Alert} from 'react-native';
// import moment from 'moment';
// moment.locale('vi');
// export default class DatePickerExample extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { chosenDate: new Date() };
//     this.setDate = this.setDate.bind(this);
//   }
//   setDate(newDate) {
//     this.setState({ chosenDate: newDate });
//   }
// //   componentWillMount(){
// //     alert(Date.now());
// //   }
//   render() {
//     return (
//       <Container>
//         <Header />
//         <Content>
//           <DatePicker
//             defaultDate={new Date(2018, 4, 4)}
//             minimumDate={new Date(2018, 1, 1)}
//             maximumDate={new Date(2018, 12, 31)}
//             locale={"vi"}
//             timeZoneOffsetInMinutes={undefined}
//             modalTransparent={false}
//             animationType={"fade"}
//             androidMode={"default"}
//             placeHolderText="Select date"
//             textStyle={{ color: "green" }}
//             placeHolderTextStyle={{ color: "#d3d3d3" }}
//             onDateChange={this.setDate}
//             />
//             <Text>
//               Date: {this.state.chosenDate.toString().substr(4, 12)}
//             </Text>
//         </Content>
//       </Container>
//     );
//   }
// }




import React, { Component } from 'react';
import { Container, Header, Content, DatePicker, Text, Button } from 'native-base';
import {Alert, AsyncStorage} from 'react-native';
import moment from 'moment';
import session from '../services/sessionStorage';
moment.locale('vi');
export default class DatePickerExample extends Component {
  constructor(props) {
    super(props);
   // this.setTest = this.setTest.bind(this);
  }
  setTest = async () => {
    try {
      await AsyncStorage.setItem('token', 'it is token !');
      console.log('SAVE !!!!!!');
    } catch (error) {
      // Error saving data
    }
  }

  getTest = async () => {
    try {
      const value = await AsyncStorage.getItem('varible');
      if (value !== null) {
        // We have data!!
        console.log('GET !!!!!!');
        console.log(value);
      }
     } catch (error) {
       // Error retrieving data
     }
  }
  componentWillMount(){
    session.setItem('varible', 'test 111111111111111');
    session.getItem('varible').then(function (result){
     console.log(result);
   });
   //console.log(x);
  }
  render() {
   
    return (
      <Container>
        <Header />
        <Content>
            <Button block style={{ margin: 15, marginTop: 30 }} onPress={() => this.setTest()}>
            <Text>SET</Text>
          </Button>
          <Button block style={{ margin: 15, marginTop: 30 }} onPress={() => this.getTest()}>
            <Text>GET</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}