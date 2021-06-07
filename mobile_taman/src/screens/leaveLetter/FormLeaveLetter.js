import React, { Component } from "react";
import { Alert, KeyboardAvoidingView, ScrollView, StatusBar, FlatList } from "react-native";
import { reduxForm, Field,formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
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
    CardItem,
    Picker,
    View,
    Label
} from "native-base";
import styles from "../commonStyles";
import agent from '../../services/agent';
import moment from 'moment';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RenderPicker, RenderTextArea, RenderDatePicker, RenderTextInput,RenderNumberInput, RenderSelect } from "../../components/formInputs";
import { LOAD_UPDATING_LEAVE_LETTER } from './action-types';

const validate = values => {
    const errors = {};
    // if (!values.leaveDays) {
    //     errors.leaveDays = 'Vui lòng nhập số ngày nghỉ.';
    // }
    // if (!values.holiday) {
    //     errors.holiday = 'Vui lòng nhập số ngày lễ / cuối tuần .';
    // }
    if(!values.startLeaveDate){
        errors.startLeaveDate = "Vui lòng chọn ngày bắt đầu nghỉ!"
    }
    if(!values.endLeaveDate){
        errors.endLeaveDate = "Vui lòng chọn ngày kết thúc nghỉ!"
    }else{
        if(moment(values.endLeaveDate)<moment(values.startLeaveDate)){
            errors.endLeaveDate="Ngày kết thúc nghỉ không được nhỏ hơn ngày bắt đầu!"
        }
    }
   

    if (!values.approvedBy || !values.approvedBy.id) {
        errors.approvedBy = { id: 'Vui lòng chọn người duyệt đơn.' };
    }
    if (!values.startWorkDate) {
        errors.startWorkDate = 'Vui lòng chọn ngày bắt đầu đi làm.';
    }
    return errors;
}
  const selector = formValueSelector("FormLeaveLetter");

  const mapStateToProps = state => {
    var updateValue = {
        ...state.leaveLetterReducer.updatingLeaveLetter,
        startLeaveDate: state.leaveLetterReducer.updatingLeaveLetter && state.leaveLetterReducer.updatingLeaveLetter.startLeaveDate ? moment(state.leaveLetterReducer.updatingLeaveLetter.startLeaveDate) : null,
        endLeaveDate: state.leaveLetterReducer.updatingLeaveLetter && state.leaveLetterReducer.updatingLeaveLetter.endLeaveDate ? moment(state.leaveLetterReducer.updatingLeaveLetter.endLeaveDate) : null,
        startWorkDate: state.leaveLetterReducer.updatingLeaveLetter && state.leaveLetterReducer.updatingLeaveLetter.startWorkDate ? moment(state.leaveLetterReducer.updatingLeaveLetter.startWorkDate) : null,
        status: state.leaveLetterReducer.updatingLeaveLetter && state.leaveLetterReducer.updatingLeaveLetter.status ? state.leaveLetterReducer.updatingLeaveLetter.status : "DANG_CHO_DUYET",
    };
    return {
        initialValues: updateValue,
        currentUser: state.common.currentUser,
        startLeaveDate:selector(state,"startLeaveDate"),
        endLeaveDate:selector(state,"endLeaveDate")
    };
};
const mapDispatchToProps = dispatch => ({
    loadLeaveLetter: (payload) =>
        dispatch({ type: LOAD_UPDATING_LEAVE_LETTER, payload: payload }),
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "FormLeaveLetter", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        }),
});


class FormLeaveLetter extends Component {
    constructor() {
        super()
        this.state = {
            listAllUsers: []
        //   username: 'admin@tamaninterior.com',
        //   password: 'Tam010689'
        }
    this.handleSubmit = this.handleSubmit.bind(this)
    // this.submitLogin = this.submitLogin.bind(this);
    this.handleDiffleaveDay = (startLeaveDate, endLeaveDate) => {
        const { updateField } = this.props;
        // Can't diff day
        var startLeaveDate = startLeaveDate ? moment(startLeaveDate):null;
        var endLeaveDate = endLeaveDate ? moment(endLeaveDate):null;
        if (startLeaveDate && endLeaveDate) {
            var diffBetweenTwoDate = moment(endLeaveDate).diff(startLeaveDate, 'days',true);
            setTimeout(() => {
            updateField("leaveDays", parseInt(diffBetweenTwoDate)+1);
        }, 100);
        }
    };
      }

    componentWillMount() {
        const { navigation,updateField,loadLeaveLetter } = this.props;
        const id = navigation.getParam('idLeaveLetter', 'NO-ID');
        const UserId = navigation.getParam('UserId', 'NO-ID');
        const dataPromise = agent.LeaveLetterApi.getLeaveLetter(id);
        loadLeaveLetter(Promise.resolve(dataPromise));
        updateField("userId",UserId);
        this.getListUser();
    }
    onScrollEnd(e) {
        let contentOffset = e.nativeEvent.contentOffset;
        let viewSize = e.nativeEvent.layoutMeasurement;
        // Divide the horizontal offset by the width of the view to see which page is visible
        let pageNum = Math.floor(contentOffset.x / viewSize.width);
        console.log('scrolled to page ', pageNum);
    }
    getListUser() {
        let setStateInRequest = (list) => { this.setState({ listAllUsers: list }) }
        return agent.asyncRequests.get("/user/listAll").then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                alert("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage);
            }
        }, function (err) {
            alert("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.");
        });
    }
    handleSubmit(values) {
        // var onHide = this.props.onHide;
        // var id = this.props.idLeaveLetter;
        const { navigation } = this.props;
        const id = navigation.getParam('idLeaveLetter');
        if(id){
            alert(id);
        }
        var url = '/leaveLetter/add';
        var bodyObject = {
            userId: values.userId,
            startLeaveDate: values.startLeaveDate,
            endLeaveDate: values.endLeaveDate,
            leaveDays: values.leaveDays,
            holiday: values.holiday,
            startWorkDate: values.startWorkDate,
            approvedById: values.approvedById,
            note: values.note,
            totalLeaveDays: values.totalLeaveDays,
            year: values.year,
            month: values.month,
            status: values.status,
            reason: values.reason,
            leaveType: values.leaveType,
            workPlace: values.workPlace

        };
        if (id) {
            url = '/leaveLetter/update';
            bodyObject.id = id;
        }

        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                onHide();
            } else {

                alert("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage);
            }
        }, function (err) {
            alert("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.");
        });

    }
    render() {
        const { handleSubmit, submitting, title, invalid} = this.props;
        const {endLeaveDate,startLeaveDate,navigation,currentUser} = this.props;
        const dataPersonels = this.state.listAllUsers;
        if(!dataPersonels){
            return null;
        } 
        const id = navigation.getParam('id', 'NO-ID');
        var optionLeaveTypes = 
            [{ name: "Nghỉ phép", id: "ANNUAL_HOLIDAY" },
            { name: "Nghỉ bù", id: "ALTERNATIVE_LEAVE" },
            { name: "Nghỉ Bệnh(Có bảo hiểm)", id: "SICK_LEAVE" },
            { name: "Nghỉ thai sản", id: "MATERNITY_LEAVE" },
            { name: "Nghỉ cưới", id: "MARRIAGE_LEAVE" },
            { name: "Nghỉ có tang", id: "MOURNING_LEAVE" }]
        //Load Id On Form
       
        //End Load Id On Form 
        var optionApprovers = [];
        dataPersonels.map(item => {
            // if(SecurityUtils.hasPermission(item, "admin.holiday.approvalLetter")){
            optionApprovers.push({name:item.fullName+" - " +item.email, id:item.id} )
            // }
        })

        var optionPersonels = [];
        dataPersonels.map(item => {
            optionPersonels.push({name:item.fullName,id:item.id,disabled:true })
        })

        var optionStatus = [
        {name: "Đang Chờ Duyệt"     ,id: "DANG_CHO_DUYET"  },
        {name: "Không Được Duyệt"   ,id: "KHONG_DUOC_DUYET"},
        {name: "Đã Duyệt"           ,id: "DA_DUYET"        } ];

     

  
        return (
            <Container style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Header>
                    <Button transparent onPress={() => this.props.navigation.goBack()}>
                    <Icon name="arrow-back" />
                    </Button>
                    <Body>
                        <Title>Tạo Đơn Xin Nghỉ</Title>
                    </Body>
                </Header>
                <Content style={{backgroundColor:'white',margin:'2%',border: 10, borderWidth: 1,borderRadius:10, borderColor: '#bdc3c7'}} >
                <Form style={{marginLeft:10,fontSize:20}}>
                <Field disabled={true} name="userId" label="Tên Nhân Viên" placeholder="Chọn tên nhân viên..." options={optionPersonels} component={RenderSelect}></Field> 
                <Field name="leaveType" label="Loại Nghỉ Phép" placeholder="Chọn loại nghỉ phép..." options={optionLeaveTypes} component={RenderSelect}></Field> 
                <Field name="reason" label="Lý Do" placeholder="Nhập lý do..."  component={RenderTextInput}></Field> 
                <Field name="workPlace" label="Nơi Làm Việc" placeholder="Nhập nơi làm việc..."  component={RenderTextInput}></Field> 
                <Field name="startLeaveDate" label="Ngày Bắt Đầu Nghỉ" placeholder="Chọn ngày bắt đầu nghỉ..."  onChangeAction={(value) => this.handleDiffleaveDay(value, endLeaveDate)} component={RenderDatePicker}></Field> 
                <Field name="endLeaveDate" label="Ngày Kết Thúc Nghỉ" placeholder="Chọn ngày kết thúc nghỉ..." onChangeAction={(value) => this.handleDiffleaveDay(startLeaveDate, value)}  component={RenderDatePicker}></Field> 
                <Field name="leaveDays" label="Số Ngày Nghỉ" editable={false} placeholder="Tổng Ngày Nghỉ..."  component={RenderNumberInput}></Field>
                <Field name="holiday" label="Ngày Lễ Cuối Tuần" placeholder="Nhập số ngày lễ, ngày cuối tuần..." component={RenderNumberInput}></Field>
                <Field name="startWorkDate" label="Ngày Đi Làm Lại"  placeholder="Chọn ngày bắt đầu làm việc..."  component={RenderDatePicker} ></Field>
                <Field disabled={id?true:false} label="Người Duyệt" name="approvedById" placeholder="Chọn người duyệt đơn..." options={optionApprovers} component={RenderSelect} ></Field>
                <Field name="note" label="Ghi Chú" placeholder="Nhập ghi chú..." component={RenderTextArea}></Field>
                                {/* TODO just user have right permission can see this checkbox */}
                <Field disabled={true} name="status" label="Trạng Thái Duyệt"  options={optionStatus} component={RenderSelect}></Field>    
                </Form>
                <Item style={{left: 200 }}>
                        <Button disabled={submitting || invalid}  style={{ margin: 15, marginTop: 30 }} onPress={handleSubmit(this.handleSubmit)}>
                            <Text>Lưu</Text>
                        </Button>
                          <Button block style={{ margin: 15, marginTop: 30 }} onPress={null}>
                            <Text>Hủy</Text>
                        </Button>
                     </Item>
                </Content>

            </Container>
        );
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'FormLeaveLetter',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(FormLeaveLetter));
// export default FormLeaveLetter;

