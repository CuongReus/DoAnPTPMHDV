import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker, RenderDatePickerMinPrev, RenderSelect, RenderNumberInput } from '../../components/formInputs';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import isEmail from 'sane-email-validation';
import { StringUtils, SecurityUtils } from '../../utils/javascriptUtils';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_LEAVE_LETTER } from './action-types';
import { FIRE_REDIRECT } from '../../constants/action-types';
import ListFile from '../../components/ListFile';
import { isNull } from 'util';
import moment from 'moment';
import UserAvatar from '../../components/UserAvatar';
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
const selector = formValueSelector('ModalLeaveLetter');
const mapStateToProps = state => {
    var updateValue = {
        ...state.leaveLetterReducer.updatingLeaveLetter,
        startLeaveDate: state.leaveLetterReducer.updatingLeaveLetter && state.leaveLetterReducer.updatingLeaveLetter.startLeaveDate ? moment(state.leaveLetterReducer.updatingLeaveLetter.startLeaveDate) : null,
        endLeaveDate: state.leaveLetterReducer.updatingLeaveLetter && state.leaveLetterReducer.updatingLeaveLetter.endLeaveDate ? moment(state.leaveLetterReducer.updatingLeaveLetter.endLeaveDate) : null,
        startWorkDate: state.leaveLetterReducer.updatingLeaveLetter && state.leaveLetterReducer.updatingLeaveLetter.startWorkDate ? moment(state.leaveLetterReducer.updatingLeaveLetter.startWorkDate) : null,
        status: state.leaveLetterReducer.updatingLeaveLetter && state.leaveLetterReducer.updatingLeaveLetter.status ? state.leaveLetterReducer.updatingLeaveLetter.status : "DANG_CHO_DUYET",
        holiday:state.leaveLetterReducer.updatingLeaveLetter && state.leaveLetterReducer.updatingLeaveLetter.holiday ? state.leaveLetterReducer.updatingLeaveLetter.holiday : 0
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
        this.handleDiffleaveDay = (startLeaveDate, endLeaveDate) => {
            const { updateField } = this.props;
            if (startLeaveDate && endLeaveDate) {
                var diffBetweenTwoDate = moment(endLeaveDate).diff(startLeaveDate, 'days');
                updateField("leaveDays", parseInt(diffBetweenTwoDate) + 1);
            }
        };
    }

    componentWillMount() {
        const { loadLeaveLetter,updateField, userId, idUserFromLeaveDayList } = this.props;
        var id = this.props.idLeaveLetter;
        const dataPromise = agent.LeaveLetterApi.getLeaveLetter(id)
        loadLeaveLetter(Promise.resolve(dataPromise));
        if (userId) {
            setTimeout(() => {
            updateField("user.id", userId);
              }, 200);   
        } else {
            setTimeout(() => {
            updateField("user.id", idUserFromLeaveDayList);
        }, 200);   
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
            user: values.user,
            startLeaveDate: values.startLeaveDate,
            endLeaveDate: values.endLeaveDate,
            leaveDays: values.leaveDays,
            holiday: values.holiday,
            startWorkDate: values.startWorkDate,
            approvedBy: values.approvedBy,
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

                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });

    }

    ///Hide and Clean Value
    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        // event.preventDefault();
        onHide();
        destroy();
    }
    render() {
        // const { objectUser, listfile, title, onHide } = this.props;

        const { handleSubmit, submitting, title, invalid, userId, endLeaveDate, startLeaveDate,currentUser } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"sm",  onHide: this.props.onHide, submitting: this.props.submitting };
        const dataPersonels = this.state.listAllUsers;
        if(!dataPersonels){
            return null;
        } 
      
        var optionLeaveTypes = [
            {label:"Nghỉ phép", value:"ANNUAL_HOLIDAY"},
            {label:"Nghỉ bù", value:"ALTERNATIVE_LEAVE"},
            {label:"Nghỉ Bệnh(Có bảo hiểm)", value:"SICK_LEAVE"},
            {label:"Nghỉ thai sản", value:"MATERNITY_LEAVE"},
            {label:"Nghỉ cưới", value:"MARRIAGE_LEAVE"},
            {label:"Nghỉ có tang", value:"MOURNING_LEAVE"},
        ];
        //Load Id On Form 
       
        //End Load Id On Form 
        var optionApprovers = [];
        dataPersonels.map(item => {
            if(SecurityUtils.hasPermission(item, "admin.holiday.approvalLetter")){
            optionApprovers.push({ label: "Tên: " + item.fullName + " || " + item.email, value: item.id })
            }
        })

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

                                <Field
                                    disabled={true}
                                    name="user.id" label="Tên Nhân Viên" placeholder="Chọn tên nhân viên" options={optionPersonels} component={RenderSelect}></Field>
                                <Field name="leaveType"  label="Phân loại nghỉ phép (*)" options={optionLeaveTypes} component={RenderSelect}></Field>
                                <Field  name="reason" label="Lý do nghỉ" placeholder="Nhập lý xin nghỉ..."  row={2}  component={RenderTextArea}></Field>
                                <Field  name="workPlace" label="Nơi Làm Việc" placeholder="Nhập Nơi làm việc..."  row={2}  component={RenderTextArea}></Field>
                                <Field name="startLeaveDate" dateFormat="DD/MM/YYYY" label="Nghỉ Phép Từ(*)" onChangeAction={(value) => this.handleDiffleaveDay(value, endLeaveDate)} component={RenderDatePicker}></Field>
                                <Field  name="endLeaveDate" dateFormat="DD/MM/YYYY" label="Đến Hết Ngày(*)" onChangeAction={(value) => this.handleDiffleaveDay(startLeaveDate, value)} component={RenderDatePicker}></Field>
                                <Field name="leaveDays" disabled={true} label="Số Ngày Nghỉ(*)"  component={RenderNumberInput}></Field>
                                <Field name="holiday" label="Ngày Lễ / Cuối Tuần" placeholder="Nhập số ngày lễ, ngày cuối tuần..." component={RenderNumberInput}></Field>
                                <Field name="startWorkDate" dateFormat="DD/MM/YYYY" label="Ngày Bắt Đầu Đi Làm(*)" component={RenderDatePickerMinPrev} minDate={endLeaveDate}></Field>
                                {/* TODO filter Selectbox follow by role, for example: just load data have role is  Admin or director  */}
                                <Field disabled={userId?true:false} name="approvedBy.id" label="Người Duyệt(*)" options={optionApprovers} component={RenderSelect} ></Field>
                                <Field name="note" label="Ghi Chú" placeholder="Nhập ghi chú..." component={RenderTextArea}></Field>
                                {/* TODO just user have right permission can see this checkbox */}
                                <Field disabled={true} name="status" label="Trạng Thái Duyệt" options={optionStatus} component={RenderSelect}></Field>
                                <div className="text-right">
                                    <button type="button" className="btn btn-link" onClick={this.handleHideAndClear} >Hủy</button>
                                    <button type="submit" className="btn bg-orange" disabled={submitting || invalid}>Lưu</button>
                                </div>
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
