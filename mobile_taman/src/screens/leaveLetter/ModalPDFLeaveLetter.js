import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker, RenderCheckbox, RenderSelect, RenderNumberInput } from '../../components/formInputs';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import isEmail from 'sane-email-validation';
import { StringUtils } from '../../utils/javascriptUtils';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_LEAVE_LETTER } from './action-types';
import { FIRE_REDIRECT } from '../../constants/action-types';
import ListFile from '../../components/ListFile';
import { isNull } from 'util';
import moment from 'moment';
import UserAvatar from '../../components/UserAvatar';
import Pdf from 'react-to-pdf';
const ref = React.createRef();
const validate = values => {
    const errors = {};
    if (!values.leaveDays) {
        errors.leaveDays = 'Vui lòng nhập số ngày nghỉ.';
    }
    if (!values.holiday) {
        errors.holiday = 'Vui lòng nhập số ngày lễ / cuối tuần .';
    }

    if (!values.approvedBy || !values.approvedBy.id) {
        errors.approvedBy = { id: 'Vui lòng chọn người duyệt đơn.' };
    }
    if (!values.startWorkDate) {
        errors.startWorkDate = 'Vui lòng chọn ngày bắt đầu đi làm.';
    }
    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
        ...state.leaveLetterReducer.updatingLeaveLetter,
        startLeaveDate: state.leaveLetterReducer.updatingLeaveLetter && state.leaveLetterReducer.updatingLeaveLetter.startLeaveDate ? moment(state.leaveLetterReducer.updatingLeaveLetter.startLeaveDate) : null,
        endLeaveDate: state.leaveLetterReducer.updatingLeaveLetter && state.leaveLetterReducer.updatingLeaveLetter.endLeaveDate ? moment(state.leaveLetterReducer.updatingLeaveLetter.endLeaveDate) : null,
        startWorkDate: state.leaveLetterReducer.updatingLeaveLetter && state.leaveLetterReducer.updatingLeaveLetter.startWorkDate ? moment(state.leaveLetterReducer.updatingLeaveLetter.startWorkDate) : null,
        status: state.leaveLetterReducer.updatingLeaveLetter && state.leaveLetterReducer.updatingLeaveLetter.status ? state.leaveLetterReducer.updatingLeaveLetter.status : "DANG_CHO_DUYET"

    };
    return {
        initialValues: updateValue
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
            objLeaveLetter: null,
            listAllUsers: [],
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
    }

    componentWillMount() {
        const { loadLeaveLetter } = this.props;
        var id = this.props.idLeaveLetter;
        const dataPromise = agent.LeaveLetterApi.getLeaveLetter(id)
        loadLeaveLetter(Promise.resolve(dataPromise));
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
            status: values.status

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

        const { handleSubmit, submitting, title, invalid, updateField, userId, idUserFromLeaveDayList, leaveLetter } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"large",  onHide: this.props.onHide, submitting: this.props.submitting };
        var dataPersonels = this.state.listAllUsers;
        //Load Id On Form 
        if (userId) {
            updateField("user.id", userId);
        } else {
            updateField("user.id", idUserFromLeaveDayList);
        }
        //End Load Id On Form 
        var optionApprovers = [];
        dataPersonels.map(item => {
            optionApprovers.push({ label: "Tên: " + item.fullName + " || " + item.email, value: item.id })
        })

        var optionPersonels = [];
        dataPersonels.map(item => {
            optionPersonels.push({ label: "Tên:" + item.fullName, value: item.id })
        })

        var optionStatus = [{ label: "Đang Chờ Duyệt", value: "DANG_CHO_DUYET" },
        { label: "Không Được Duyệt", value: "KHONG_DUOC_DUYET" }, { label: "Đã Duyệt", value: "DA_DUYET" }];


        var newModal = null;

        var optionLeaveTypes = [
            {label:"Nghỉ phép", value:"ANNUAL_HOLIDAY"},
            {label:"Nghỉ bù", value:"ALTERNATIVE_LEAVE"},
            {label:"Nghỉ Bệnh(Có bảo hiểm)", value:"SICK_LEAVE"},
            {label:"Nghỉ thai sản", value:"MATERNITY_LEAVE"},
            {label:"Nghỉ cưới", value:"MARRIAGE_LEAVE"},
            {label:"Nghỉ có tang", value:"MOURNING_LEAVE"},
        ];


        newModal =


            <Modal

                {...modalConfig}
                aria-labelledby="example-custom-modal-styling-title"

            >
                <Modal.Header closeButton>


                </Modal.Header>
                <Modal.Body dialogClassName="modal-90w">
                <center>
                    <Pdf targetRef={ref} filename="đơn-xin-nghỉ-phép.pdf">
                        {({ toPdf }) => <button onClick={toPdf}>In PDF</button>}</Pdf>
                    
                    <div style={{width:'92%', height:'100%'}} className="panel panel-flat"  ref={ref}>
                        <center>
                          
                        <br />
                     
                            <div><img src="/assets/images/backgrounds/Logo_TamAn.png" style={{ width: "auto", height: "30px" }}></img></div>
                      
                            <div><h1>Đơn Xin Nghỉ Phép</h1></div>
                       
                        <table className="table table-bordered table-framed">
                            <thead>
                                <tr>
                                    <th style={{fontSize:'15px'}} colSpan="2" >Họ Tên Nhân Viên</th>
                                    <th style={{fontSize:'15px'}} colSpan="5">Bộ phận</th>
                                    <th style={{fontSize:'15px'}}>Nơi làm việc</th>
                                </tr>
                            </thead>
                            <tbody>
                                     <tr>
                                    <td colSpan="2" >{leaveLetter.user ? leaveLetter.user.fullName : null}</td>
                                    <td colSpan="5" >{leaveLetter.user ? leaveLetter.user.department: null}</td>
                                    <td >{leaveLetter.workPlace}</td>
                                </tr>
                                <tr>
                                    <td style={{fontSize:'15px'}} colSpan="2" rowSpan="2">Phân loại nghỉ phép</td>
                                    <td style={{fontSize:'15px'}} colSpan="5" >Thời Gian Xin Phép</td>
                                    <td style={{fontSize:'15px'}} rowSpan="2">Lý Do</td>
                                </tr>
                                <tr>
                                  
                                    <td>Từ</td>
                                    <td>Đến</td>
                                    <td>Số Ngày</td>
                                    <td>Ngày Lễ / Cuối Tuần</td>
                                    <td>Tổng Ngày Nghỉ</td>
                                    
                                </tr>
                                <tr>
                                    <td colSpan="2">{leaveLetter.leaveType}</td>
                                    <td> {leaveLetter.startLeaveDate}</td>
                                    <td>{leaveLetter.endLeaveDate}</td>
                                    <td>{leaveLetter.holiday}</td>
                                    <td>{leaveLetter.leaveDays}</td>
                                    <td>{leaveLetter.leaveDays-leaveLetter.holiday}</td>
                                    <td>{leaveLetter.reason}</td>
                                </tr>
                                <tr>
                                    <td style={{fontSize:'15px'}} colSpan="2" >Phép Còn Lại</td>
                                    <td style={{fontSize:'15px'}} rowSpan="2" colSpan="5">Người Theo Dõi</td>
                                    <td style={{fontSize:'15px'}} rowSpan="2">Người Nộp Đơn</td>
                                </tr>
                                <tr>
                                    <td >Phép Năm</td>
                                    <td >Phép Ngoài Giờ (Trong Tháng)</td>
                                    
                                    {/* <td rowSpan="2">Người Nộp Đơn</td> */}
                                </tr>
                                <tr>
                                <td >{leaveLetter.user ? leaveLetter.user.leaveDayYear -(leaveLetter.leaveDays-leaveLetter.holiday): null}</td>
                                <td ></td>
                                    <td colSpan="5" >{leaveLetter.approvedBy ? leaveLetter.approvedBy.fullName:null}</td>
                                    <td>{leaveLetter.user?leaveLetter.user.fullName:null}</td>
                                </tr>
                                <tr>
                                <td colSpan="7" style={{fontSize:'15px'}} >Ghi Chú</td>
                                    <td style={{fontSize:'15px'}}>Giám Đốc</td>
                                </tr>
                                <tr>
                                <td colSpan="7">
                                {leaveLetter.note}
                                </td>
                                    <td>
                                <br style={{lineHeight:'100px'}}/>

                                        
                                    </td>
                                </tr>
                                

                            </tbody>
                            <tfoot></tfoot>
                        </table>
                        </center>
                        
                        {/* <div style={{ marginLeft: 100 }}>
                            <justify>
                                <div>Tên Nhân Viên: {leaveLetter.user.email}</div>
                                <div>Nghỉ Từ: {moment(leaveLetter.startLeaveDate).format("DD/MM/YYYY")}</div>
                                <div>Đến Hết Ngày: {moment(leaveLetter.endLeaveDate).format("DD/MM/YYYY")}</div>
                                <div>Tổng Số Ngày Nghỉ: {leaveLetter.leaveDays}</div>
                                <div>Tổng Số Ngày Lễ: {leaveLetter.holiday}</div>
                                <div>Ngày Bắt Đầu Đi Làm: {moment(leaveLetter.startWorkDate).format("DD/MM/YYYY")}</div>
                                <div>Người Duyệt: {leaveLetter.approvedBy.fullName}</div>
                                <div>Ghi Chú: {leaveLetter.note}</div>
                                <div>Trạng Thái Đơn: {leaveLetter.status}</div>

                            </justify>
                        </div> */}

                        {/* <div style={{ marginLeft: 400, marginTop: 50 }}>Chữ Ký</div> */}

                    </div>
                    </center>

                </Modal.Body>
            </Modal>






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
