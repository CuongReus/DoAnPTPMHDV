import moment from 'moment';
import React from 'react';
import { Modal } from 'react-bootstrap';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import { LoadingScreen } from '../../components/commonWidgets';
import { RenderDateMultiPicker, RenderDatePicker, RenderDatePickerMinPrev, RenderNumberInput, RenderSelect, RenderTextArea } from '../../components/formInputs';
import agent from '../../services/agent';
import { SecurityUtils } from '../../utils/javascriptUtils';
import { LOAD_UPDATING_LEAVE_LETTER } from './action-types';
const validate = (values,props) => {
    const errors = {};
    var diffBetweenTwoDate = moment(values.endLeaveDate).diff(values.startLeaveDate, 'days');
    if(!values.startLeaveDate){
        errors.startLeaveDate = "Vui lòng chọn ngày bắt đầu nghỉ!"
    }
    if(!values.endLeaveDate){
        errors.endLeaveDate = "Vui lòng chọn ngày kết thúc nghỉ!"
    } else{
        if(new Date(values.endLeaveDate) <new Date(values.startLeaveDate)){
        errors.endLeaveDate="Ngày kết thúc nghỉ không được nhỏ hơn ngày bắt đầu!"
        }
        if(values.leaveType == "PN2" && parseFloat(diffBetweenTwoDate +0.5) >0.5){
        errors.endLeaveDate = "Tổng ngày nghỉ lớn hơn nữa ngày, vui lòng chọn loại nghỉ phép khác!"
        }
     
    }
    if(!values.leaveType){
            errors.leaveType = "Vui lòng chọn phân loại nghỉ phép!"
    }else {
       if(values.leaveType == "PN2" && parseFloat(values.totalLeaveDays) > 0.5){
        errors.totalLeaveDays = "Tổng ngày nghỉ lớn hơn nữa ngày, vui lòng chọn loại nghỉ phép khác!"
       }
    }
    if (!values.approvedById){
        errors.approvedById =  'Vui lòng chọn người duyệt đơn.' ;
    }
    if (!values.startWorkDate) {
        errors.startWorkDate = 'Vui lòng chọn ngày bắt đầu đi làm.';
    }
    if(!values.workPlace){
        errors.workPlace = "Vui lòng chọn nơi làm việc!"
    }
 
    return errors;
}
const selector = formValueSelector('ModalLeaveLetter');
const mapStateToProps = (state,props) => {
    var updateValue = {
        ...state.leaveLetterReducer.updatingLeaveLetter,
        userId:props.userDto ? props.userDto.id : null,
        startLeaveDate: state.leaveLetterReducer.updatingLeaveLetter && state.leaveLetterReducer.updatingLeaveLetter.startLeaveDate ? moment(state.leaveLetterReducer.updatingLeaveLetter.startLeaveDate) 
         : props.dayToAttendance ?  moment(props.dayToAttendance):null,
        endLeaveDate: state.leaveLetterReducer.updatingLeaveLetter && state.leaveLetterReducer.updatingLeaveLetter.endLeaveDate ? moment(state.leaveLetterReducer.updatingLeaveLetter.endLeaveDate) 
        : props.dayToAttendance ?  moment(props.dayToAttendance):null,
        startWorkDate: state.leaveLetterReducer.updatingLeaveLetter && state.leaveLetterReducer.updatingLeaveLetter.startWorkDate ? moment(state.leaveLetterReducer.updatingLeaveLetter.startWorkDate) : null,
        status: state.leaveLetterReducer.updatingLeaveLetter && state.leaveLetterReducer.updatingLeaveLetter.status ? state.leaveLetterReducer.updatingLeaveLetter.status : "DANG_CHO_DUYET",
        holiday:state.leaveLetterReducer.updatingLeaveLetter && state.leaveLetterReducer.updatingLeaveLetter.holiday ? state.leaveLetterReducer.updatingLeaveLetter.holiday : 0,
        // leaveType :state.leaveLetterReducer.updatingLeaveLetter && state.leaveLetterReducer.updatingLeaveLetter.leaveType ? state.leaveLetterReducer.updatingLeaveLetter.leaveType : "ANNUAL_HOLIDAY",
        holidayAndWeekendDay: state.leaveLetterReducer.updatingLeaveLetter && state.leaveLetterReducer.updatingLeaveLetter.holidayAndWeekendDay ? state.leaveLetterReducer.updatingLeaveLetter.holidayAndWeekendDay.split(",") : null
    };
    return {
        initialValues: updateValue,
        currentUser: state.common.currentUser,
        startLeaveDate:selector(state,"startLeaveDate"),
        endLeaveDate:selector(state,"endLeaveDate"),
        leaveDays:selector(state,"leaveDays"),
        leaveType:selector(state,"leaveType"),
        holiday:selector(state,"holiday"),
        status:selector(state,"status"),
        holidayAndWeekendDay:selector(state,"holidayAndWeekendDay")
    };
};
const mapDispatchToProps = dispatch => ({
    loadLeaveLetter: (payload) =>
        dispatch({ type: LOAD_UPDATING_LEAVE_LETTER, payload: payload }),
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalLeaveLetter", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        }),
});
class ModalLeaveLetter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllUsers: [],
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.handleDiffleaveDay = (leaveType,startLeaveDate, endLeaveDate) => {
            const { updateField } = this.props;

            var startLeaveDateString = startLeaveDate ? moment(startLeaveDate).format("YYYY-MM-DD")  : null;
            var endLeaveDateString = endLeaveDate ? moment(endLeaveDate).format("YYYY-MM-DD") : null;
            if (leaveType &&startLeaveDateString && endLeaveDateString) {
                
                var holidayAndWeekendDay = [];
                var loop = new Date(startLeaveDate);
                while(loop <= endLeaveDate){
                    var tempDate = new Date(loop);
                    // tempDate.setDate(tempDate.getDate() + 1);
                    tempDate.setDate(tempDate.getDate() );
                    var checkDay = moment(tempDate).format('dd');                   
                    if (checkDay === 'T7' || checkDay === 'CN') {
                        holidayAndWeekendDay.push(loop);
                    }
                    var newDate = loop.setDate(loop.getDate() + 1);
                    loop = new Date(newDate);
                }

                updateField("holidayAndWeekendDay", holidayAndWeekendDay);
                
                        var diffBetweenTwoDate = moment(endLeaveDateString).diff(startLeaveDateString, 'days',true);
                        // alert(parseInt(diffBetweenTwoDate +1));
                        if(parseInt(diffBetweenTwoDate +1) >= 1 &&  leaveType == "PN"){
                            updateField("leaveDays", parseInt(diffBetweenTwoDate) + 1);
                            this.handleCalcTotalLeaveDay(parseInt(diffBetweenTwoDate + 1),0);
                        }else if(parseInt(diffBetweenTwoDate+1) == 1 && leaveType == "PN2" ) {
                            updateField("leaveDays", parseFloat(diffBetweenTwoDate + 0.5));
                            this.handleCalcTotalLeaveDay(parseFloat(diffBetweenTwoDate + 0.5),0);
                        }
                }
        };

        this.handleCalcTotalLeaveDay = (leaveDays , holiday)=>{
            const {updateField} = this.props;
            var leaveDays = leaveDays ? leaveDays : 0;
            var holiday = holiday ? holiday : 0;
            if(leaveDays || holiday){
                updateField("totalLeaveDays",parseFloat(leaveDays - holiday) );
            }
        }
        this.handleUpdateFieldFromProps=(employeeAttendanceDto)=>{
            const  {updateField,leaveDays} = this.props;
            updateField("workPlace",employeeAttendanceDto.workPlace);
            updateField("leaveType",employeeAttendanceDto.attendanceType  == "PN" ? "PN": "PN2" );
            this.handleDiffleaveDay(employeeAttendanceDto.attendanceType  == "PN" ? "PN": "PN2",employeeAttendanceDto.dateToWork,employeeAttendanceDto.dateToWork);
            }
    }
    componentWillMount() {
        const { loadLeaveLetter,updateField, idUser, leaveType,employeeAttendanceDto} = this.props;
        var id = this.props.idLeaveLetter;
        if(id){
            const dataPromise = agent.LeaveLetterApi.getLeaveLetter(id)
            loadLeaveLetter(Promise.resolve(dataPromise));
        }
        updateField("userId",idUser);
       
        if(employeeAttendanceDto){ 
            this.handleUpdateFieldFromProps(employeeAttendanceDto);
        }
        return (
            this.getListUser()
        )

    }
    getListUser() {
        let setStateInRequest = (list) => { this.setState({ listAllUsers: list }) }
        return agent.asyncRequests.get("/user/listAll").then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
                toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }
    handleAdd(values) {
        var onHide = this.props.onHide;
        var id = this.props.idLeaveLetter;
        var url = '/leaveLetter/add';
        var bodyObject = {
            userId: values.userId,
            startLeaveDate: values.startLeaveDate,
            endLeaveDate: values.endLeaveDate,
            leaveDays: values.leaveDays,
            holiday: 0,
            startWorkDate: values.startWorkDate,
            approvedById: 1,
            holidayAndWeekendDay: "",
            totalLeaveDays: values.totalLeaveDays,
            status: "DANG_CHO_DUYET",
            leaveType: values.leaveType,
            workPlace: values.workPlace,
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
                    toast.info("Lưu Thành Công.", {autoClose: 8000});
                } else {
    
                    toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });
        
       
    }
    ///Hide and Clean Value
    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        onHide();
        destroy();
    }
    render() {
        const { handleSubmit, submitting, title, invalid, employeeAttendanceDto,userId, endLeaveDate, startLeaveDate,currentUser,status, holiday, leaveDays,leaveType } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"sm",  onHide: this.props.onHide, submitting: this.props.submitting };
        const dataPersonels = this.state.listAllUsers;
        var id = this.props.idLeaveLetter;
        if(!dataPersonels){
            return null;
        } 
        var optionLeaveTypes = [
        {label:"Nghỉ phép năm", value:"PN"},
        {label:"Nghỉ phép năm nữa ngày", value:"PN2"},
        ];

        var isEditDate = false;
        if(employeeAttendanceDto){
            isEditDate = true;
        }
        var optionApprovers = [];
        dataPersonels.map(item => {
            if(SecurityUtils.hasPermission(item, "admin.holiday.approvalLetter")){
            optionApprovers.push({ label: "Tên: " + item.fullName + " || " + item.email, value: item.id })
            }
        })
          var optionWorkplace = [
            { label: "Văn Phòng", value: "Văn Phòng" },
            { label: "Công Trường", value: "Công Trường" },
            { label: "Khác", value: "Khác" }
        ];
        var optionPersonels = [];
        dataPersonels.map(item => {
            optionPersonels.push({ label: "Tên:" + item.fullName, value: item.id })
        })
        var optionStatus = [{ label: "Đang Chờ Duyệt", value: "DANG_CHO_DUYET" },
        { label: "Không Được Duyệt", value: "KHONG_DUOC_DUYET" }, { label: "Đã Duyệt", value: "DA_DUYET" }];
        var newModal = null;
        newModal =
            <div style={{ width: '30%' }}>
                <Modal
                    {...modalConfig}
                    aria-labelledby="contained-modal-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-sm"><center>{title}</center> </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {submitting ? <LoadingScreen /> :
                            <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.handleAdd)}>
                                <fieldset disabled={!SecurityUtils.hasPermission(currentUser, "admin.holiday.approvalLetter") && id ? true: false}>
                                <Field disabled={true} name="userId" label="Tên Nhân Viên" placeholder="Chọn tên nhân viên" options={optionPersonels} component={RenderSelect}></Field>
                                <Field name="leaveType"  label="Phân Loại Nghỉ Phép (*)" options={optionLeaveTypes} onChangeAction={(value) => this.handleDiffleaveDay(value,startLeaveDate, endLeaveDate)} component={RenderSelect}></Field>
                                <Field name="workPlace" label="Nơi Làm Việc" placeholder="Nhập Nơi làm việc..."  options={optionWorkplace} component={RenderSelect}></Field>
                                <Field name="startLeaveDate" disabled={isEditDate} dateFormat="DD/MM/YYYY" label="Nghỉ Phép Từ(*)" onChangeAction={(value) => this.handleDiffleaveDay(leaveType,value, endLeaveDate)} component={RenderDatePicker}></Field>
                                <Field name="endLeaveDate" dateFormat="DD/MM/YYYY" label="Đến Hết Ngày(*)" onChangeAction={(value) => this.handleDiffleaveDay(leaveType,startLeaveDate, value)} component={RenderDatePicker}></Field>
                                <Field name="leaveDays" disabled={true} label="Số Ngày Nghỉ(*)"  component={RenderNumberInput}     onChangeAction={(value)=>this.handleCalcTotalLeaveDay(value,holiday)}></Field>
                                <Field name="totalLeaveDays" disabled={true}  label="Tổng Ngày Nghỉ" placeholder="Tổng ngày nghỉ..." component={RenderNumberInput}></Field>
                                <Field name="startWorkDate" dateFormat="DD/MM/YYYY" label="Ngày Bắt Đầu Đi Làm(*)"  component={RenderDatePickerMinPrev} numberDayAdd={leaveType == "ANNUAL_HOLIDAY_2"? 1 : 0} minDate={endLeaveDate}></Field>
                                <div className="text-right">
                                    <button type="button" className="btn btn-link" onClick={this.handleHideAndClear} >Hủy</button>
                                    <button type="submit" className="btn bg-orange" disabled={submitting || invalid}>Lưu</button>
                                </div>
                                </fieldset>
                            </form>
                            
                        }
                    </Modal.Body>
                </Modal>
            </div>





        return newModal;
    }
};


export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'ModalLeaveLetter',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalLeaveLetter)));
