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
    Accordion,
    Card,
    CardItem,
    View
} from "native-base";
import styles from "../commonStyles";
import agent from '../../services/agent';
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
class LeaveDayList extends React.Component {

    state = {
        listLeaveDay: [],
        // isLeaveDayModalShown: false,
        // objectLeaveLetter: null,
        // isPDFModalShown: false,
        userDto: null
    };
    loadUserDto = this.loadUserDto.bind(this);
    // this.hanldShowPdfModal = this.hanldShowPdfModal.bind(this);
    // this.hanldHidePdfModal = this.hanldHidePdfModal.bind(this);
    // this.handleHidemodal = () => {
    //     this.setState({ isLeaveDayModalShown: false,isPDFModalShown:false });
    //     this.updateListLeaveDay();
    // }





    // updateListLeaveDay() {
    //     var search = qs.parse(this.props.location.search).search;
    //     var page = qs.parse(this.props.location.search).page;
    //     var userId = this.props.match.params.id;
    //     let setStateInRequest = (list) => { this.setState({ listLeaveDay: list }) }
    //     return agent.asyncRequests.getPage(`/leaveLetter/listLeaveLetterByUserId?userId=${userId}`,page
    //     ).then(function (res) {
    //         var result = res.body.resultData;
    //         if (result) {

    //             setStateInRequest(result);

    //         }
    //         else {
    //             toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
    //         }
    //     }, function (err) {
    //         toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
    //     })
    // }

    loadUserDto(id) {
        let setStateInRequest = (list) => { this.setState({ userDto: list }) }
        agent.asyncRequests.get("/user/" + id
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            }
            else {
                alert('Error in resultData. ' + JSON.stringify(res));
            }
        }, function (err) {
            alert('Error to connect server !')
        })
    }
    componentWillMount() {
        const { navigation } = this.props;
        // var userId = this.props.match.params.id;
        const userId = navigation.getParam('id', 'NO-ID');
        this.loadUserDto(userId);
        let setStateInRequest = (list) => { this.setState({ listLeaveDay: list }) }
        return agent.asyncRequests.getPage(`/leaveLetter/listLeaveLetterByUserId?userId=${userId}`,  0
        ).then(function (res) {
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

    };

    onScrollEnd(e) {
        let contentOffset = e.nativeEvent.contentOffset;
        let viewSize = e.nativeEvent.layoutMeasurement;

        // Divide the horizontal offset by the width of the view to see which page is visible
        let pageNum = Math.floor(contentOffset.x / viewSize.width);
        console.log('scrolled to page ', pageNum);
    }
    //Delete LeaveDay Function
    // deleteLeaveDay(id) {

    //     if (confirm("Bạn có chắc sẽ xoá!")) {
    //         var url = `/leaveLetter/${id}`;
    //         return agent.asyncRequests.del(url
    //         ).then(function (res) {
    //             var result = res.body.resultData;
    //             if (result && !result.error) {
    //                 toast.info("Xoá Thành Công!", { autoClose: 15000 });
    //                 window.location.reload(true);
    //             } else {
    //                 toast.error("Có lỗi khi xóa dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
    //             }
    //         }, function (err) {
    //             toast.error("Không thể xóa dữ liệu đang được sử dụng từ màn hình khác! ", { autoClose: 15000 });
    //         });


    //     } else {
    //     }
    // }


    render() {
        const dataListLeaveDay = this.state.listLeaveDay;
        const userDto = this.state.userDto;
        var listLeaveDaysByUser = []
        if(!dataListLeaveDay.content){
            return null;
        }
        
        dataListLeaveDay.content.map(item=>{
            listLeaveDaysByUser.push(
        {title:<Text key={"title_"+item.id}>{"Từ Ngày: "+moment(item.startLeaveDate).format("DD/MM/YYYY")}{"\n"}
        {"Đến Ngày: "+moment(item.endLeaveDate).format("DD/MM/YYYY")}
        {"\n"}
        {"Tổng Ngày Nghỉ: " + (item.leaveDays - item.holiday)}</Text>, 
        // Content
        content:
        <Text onPress={() => this.props.navigation.navigate("FormLeaveLetter", {idLeaveLetter: item.id})} key={"content_"+item.id}>{"Ngày Lễ/Cuối Tuần: "+item.holiday}{"\n"}
        {"Ngày Bắt Đầu Công Việc: "+moment(item.startWorkDate).format("DD/MM/YYYY")}{"\n"}
        {"Duyệt Bởi: "+item.approvedBy.fullName}{"\n"}
        {"Loại Nghỉ Phép: "+item.leaveType}{"\n"}
        {"Lý Do: "+item.reason}
        </Text>
       
        
                  
         }
            )
        });
        if(!userDto){
            return null ;
        }
        // <Right>
        //             <Button transparent onPress={() => this.props.navigation.navigate("FormLeaveLetter", {idLeaveLetter: item.id})}>
        //               <Text>Chỉnh Sửa ></Text>
        //             </Button>
        //           </Right>
        return (
            <Container  style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Header>
                    <Button transparent onPress={() => this.props.navigation.goBack()}>
                        <Icon name="arrow-back" />
                    </Button>
                    <Body>
                        <Title>Danh Sách Đơn Nghỉ Phép</Title>
                    </Body>
                </Header>
                <Content>
               
                      <Card style={{alignItems: 'center',borderRadius:20,alignContent:'center' }}>
                                <CardItem stye header>
                               
                                <Thumbnail  source={{uri: 'http://2.gravatar.com/avatar/b7ecb9c610f978aa2e9ec77e3f64511c?s=96&d=mm&r=g'}}/>
                                </CardItem>
                                <CardItem header>
                                    <Text style={{textAlign:'center'}}>{userDto?  userDto.fullName:null} {'\n'} {userDto?  userDto.email:null}</Text>
                                </CardItem>
                                <CardItem body>
                                    <Body style={{alignItems:'center'}}>
                                        <Text>
                                            Mã Nhân Viên:  {userDto.code} 
                                        </Text>
                                        <Text>
                                         Ngày Phép Năm:{userDto.leaveDayYear > 0 ? userDto.leaveDayYear : 0  }
                                        </Text>
                                        <Text>
                                             Tổng Ngày Đã Nghỉ:{userDto.totalLeaveDays > 0 ? userDto.totalLeaveDays : 0}
                                        </Text>
                                        <Text>
                                        {parseInt(userDto.leaveDayYear > 0 ? userDto.leaveDayYear : 0 )-parseInt(userDto.totalLeaveDays > 0 ? userDto.totalLeaveDays : 0)}
                                        </Text>
                                        <Right>
                                            <Button style={{marginTop:10,height:30,borderRadius:20}} thumbnail onPress={() => this.props.navigation.navigate("FormLeaveLetter", { UserId: userDto.id })}>
                                                <Text>Tạo Đơn</Text>
                                            </Button>
                                        </Right>
                                    </Body>
                                </CardItem>
                            </Card>
                            <Card style={{borderRadius:20,alignItems:'center'}}>
                                    <Text style={{color:'#00796B'}}>Danh Sách Đơn Xin Nghỉ</Text>
                            </Card>
                            <Card style={{borderRadius:20,alignItems:'center'}}>
                                <Accordion style={{width:"100%",borderRadius:20}}  dataArray={listLeaveDaysByUser} headerStyle={{borderStyle:'solid',borderBottomWidth:1,borderColor:'lightgrey' ,textAlign:'center'}} contentStyle={{textAlign:'justify',backgroundColor:'lightgrey'}} expanded={0}/>
                            </Card>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button vertical onPress={() => this.props.navigation.navigate('UserLeaveDayList')}>
                            <Icon active name="apps" />
                            <Text>Home</Text>
                        </Button>
                        <Button vertical onPress={() => this.props.navigation.navigate('UserLeaveDayList')}>
                            <Icon name="person" />
                            <Text>Nhân Viên</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );



    }

}

export default LeaveDayList