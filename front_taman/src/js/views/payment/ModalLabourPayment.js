import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker, RenderCheckbox, RenderSelect, RenderNumberInput, RenderMoneyFormat, RenderMultiSelect, RenderDatePickerMinPrev } from '../../components/formInputs';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import isEmail from 'sane-email-validation';
import { StringUtils, FormatterUtils, SecurityUtils } from '../../utils/javascriptUtils';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_PAYMENT } from './action-types';
import { LOAD_PROJECT_COST_DTO } from '../projectCost/action-types';
import { FIRE_REDIRECT } from '../../constants/action-types';
import ListFile from '../../components/ListFile';
import { isNull } from 'util';
import moment from 'moment';
const validate = values => {
    const errors = {};
    if (!values.createdUserId) {
        errors.createdUserId = "";

    }
    if(!values.projectCostId){
        errors.projectCostId = '';
    }
    if (!values.lotNumber) {
        errors.lotNumber = '';
    } 
    if(!values.approvalById){
        errors.approvalById ="Vui lòng chọn người duyệt !";
    }
    if (values.status == "DA_DUYET_THANH_TOAN" && !values.paymentDate) {
        errors.paymentDate = "Vui lòng chọn ngày thanh toán";
    }
    if (!values.startWorkDate) {
        errors.startWorkDate = "Vui lòng chọn ngày bắt đầu !"
    }
    if (!values.endWorkDate) {
        errors.endWorkDate = "Vui lòng chọn ngày kết thúc !"
    }
    if (values.endWorkDate && moment(values.endWorkDate) < moment(values.startWorkDate)) {
        errors.endWorkDate = "ngày kết thúc không được nhỏ hơn ngày bắt đầu !"
    }

    return errors;
}

const selector = formValueSelector('ModalLabourPayment');

var today = moment(new Date, "DD/MM/YYYY");

const mapStateToProps = state => {
    var projectCostDto = state.projectCostReducer.projectCostDto;
    var updateValue = {
        ...state.paymentReducer.updatingPayment,
        projectCostId: projectCostDto? projectCostDto.id:null,
        approvalById: projectCostDto? projectCostDto.approvalBy.id:null,
        paymentDate: state.paymentReducer.updatingPayment && state.paymentReducer.updatingPayment.paymentDate ? moment(state.paymentReducer.updatingPayment.paymentDate) : null,
        createdDate: state.paymentReducer.updatingPayment && state.paymentReducer.updatingPayment.createdDate ? moment(state.paymentReducer.updatingPayment.createdDate) : today,
        notifyTo: null,
        notifyMessage: null,
        lastedUpdateDate: state.paymentReducer.updatingPayment && state.paymentReducer.updatingPayment.lastedUpdateDate ? moment(state.paymentReducer.updatingPayment.lastedUpdateDate) : null,
        createdUserId: state.paymentReducer.updatingPayment && state.paymentReducer.updatingPayment.createdUserId ? state.paymentReducer.updatingPayment.createdUserId : state.common.currentUser.id,
        status: state.paymentReducer.updatingPayment && state.paymentReducer.updatingPayment.status ? state.paymentReducer.updatingPayment.status : "CHUA_DUYET_THANH_TOAN",
        paymentDate: state.paymentReducer.updatingPayment && state.paymentReducer.updatingPayment.paymentDate ? moment(state.paymentReducer.updatingPayment.paymentDate) : null

    };
    return {
        initialValues: updateValue,
        lastedUpdateUserId: selector(state, "lastedUpdateUserId"),
        createdUserId: selector(state, "createdUserId"),
        lbSalaryPerDay: selector(state, "lbSalaryPerDay"),
        lbSalaryMidNight: selector(state, "lbSalaryMidNight"),
        lbNormalAttendance: selector(state, "lbNormalAttendance"),
        lbOvertimeAttendance: selector(state, "lbOvertimeAttendance"),
        lbMidnightAttendance: selector(state, "lbMidnightAttendance"),
        totalMidnightSalaryCalc: selector(state, "totalMidnightSalaryCalc"),
        totalNormalSalaryCalc: selector(state, "totalNormalSalaryCalc"),
        status: selector(state, "status"),
        currentUser: state.common.currentUser,
    };
};

const mapDispatchToProps = dispatch => ({
    loadPayment: (payload) =>
        dispatch({ type: LOAD_UPDATING_PAYMENT, payload: payload }),
    loadProjectCostDto: (projectCostDto) =>
        dispatch({ type: LOAD_PROJECT_COST_DTO, projectCostDto: projectCostDto }),
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalLabourPayment", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});




class ModalLabourPayment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllUsers: [],
            listAllLabour: []
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
    }

    getListLabour() {
        let setStateInRequest = (list) => { this.setState({ listAllLabour: list }) }
        return agent.asyncRequests.get("/labour/listAll").then(function (res) {
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
    componentWillMount() {
        const { loadPayment, loadProjectCostDto, projectCostDto } = this.props;
        var id = this.props.idPayment;
        if (projectCostDto) {
            loadProjectCostDto(projectCostDto);
        }
        const dataPromise = agent.PaymentApi.getPayment(id);
        loadPayment(Promise.resolve(dataPromise));
        return (
            this.getListUser(),
            this.getListLabour()
        )


    }


    handleAdd(values) {
        var onHide = this.props.onHide;
        const { projectCostDto, currentUser } = this.props;
        var id = this.props.idPayment;
        var url = '/payment/add';
        var today = moment(new Date, "DD/MM/YYYY");
        var bodyObject = {
            projectCostId: projectCostDto.id,
            lotNumber: values.lotNumber,
            paymentDate: values.paymentDate,
            labourId: values.labourId,
            lbSalaryPerDay: values.lbSalaryPerDay ? values.lbSalaryPerDay : 0,
            lbSalaryMidNight: values.lbSalaryMidNight ? values.lbSalaryMidNight : 0,
            percentPaid: values.percentPaid ? values.percentPaid : 0,
            moneyPaid: values.moneyPaid ? values.moneyPaid : 0,
            approvalById:values.approvalById,
            status: values.status,
            lbNormalAttendance: values.lbNormalAttendance ? values.lbNormalAttendance : 0,
            lbOvertimeAttendance: values.lbOvertimeAttendance ? values.lbOvertimeAttendance : 0,
            lbMidnightAttendance: values.lbMidnightAttendance ? values.lbMidnightAttendance : 0,
            notifyTo: values.notifyTo ? values.notifyTo.map(item => {
                return item.value
            }).join(',') : null,
            notifyMessage: values.notifyMessage,

            note: values.note,
            createdUserId:values.createdUserId,
            lastedUpdateUserId: id ?  currentUser.id : null,
            createdDate:id? values.createdDate: today,
            lastedUpdateDate: id ? moment(today) : null

        };
        if (id) {
            url = '/payment/update';
            bodyObject.id = id;
        }

        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                onHide();
                toast.info("Lưu Thành Công.", { autoClose: 8000 });
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
        // const { objectProject, listfile, title, onHide } = this.props;

        const { handleSubmit, submitting, projectCostDto, title, projectDetailDto, status, invalid, createdUserId, currentUser, lastedUpdateUserId, initialValues, dataProjectCostPayment,
            isApprovalScreen
        } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show, bsSize: "sm", onHide: this.props.onHide, submitting: this.props.submitting };
        // const dataProjectYear= this.state.listAllYears;
        var dataPersonels = this.state.listAllUsers;
        var dataLabour = this.state.listAllLabour;
        var optionProjectCost = [];
        if (!dataPersonels) {
            return <LoadingScreen></LoadingScreen>;
        }
        if (!dataLabour) {
            return <LoadingScreen></LoadingScreen>
        }
        var optionNotifyTo = [];
        var optionsApprovalBy = [];
        dataPersonels.map(item => {
            if(SecurityUtils.hasPermission(item, "admin.projectPaymentApproval.labourAllowApproval")){
                optionsApprovalBy.push({ label: "Tên: " + item.fullName + " || " + item.email, value: item.id })
            }
            optionNotifyTo.push({ label: "Tên: " + item.email, value: item.email })
            // }
        })

        var optionsStatus = [{ label: "Chưa Duyệt Thanh Toán", value: "CHUA_DUYET_THANH_TOAN" }, { label: "Đã Duyệt Thanh Toán", value: "DA_DUYET_THANH_TOAN" }];

        var optionLabour = [];
        dataLabour.map(item => {
            optionLabour.push({ label: item.fullName, value: item.id })
        })
        var id = this.props.idPayment;
        if (projectCostDto) {
            optionProjectCost.push({ label: projectCostDto.lotNumber, value: projectCostDto.id })
        }
        if (projectDetailDto) {
            startActualPrgressDate = moment(projectDetailDto.efficiency.startActualProgressDate).format("DD/MM/YYYY");
        }
        // Length - 1  is a way to get last element in a list
        var showCreatedUser = [];
        var showLastedUpdateUser = [];
        if (dataPersonels) {
            dataPersonels.map(item => {
                // StartMap
                // Push created user
                // alert(createdUserId);
                if (createdUserId && createdUserId == item.id) {
                    showCreatedUser =[{
                        label: item.fullName + " || " + item.email, value: item.id
                    }];
                } else if (!createdUserId) {
                    showCreatedUser =[{
                        label: currentUser.fullName + " || " + currentUser.email, value: currentUser.id
                    }];
                }
                // Push Updated User
                if (id && lastedUpdateUserId && lastedUpdateUserId == item.id) {
                    showLastedUpdateUser=[{
                        label: item.fullName + " || " + item.email,
                        value: item.id
                    }];
                } else if (id && !lastedUpdateUserId) {
                    showLastedUpdateUser=[{
                        label: currentUser.fullName + " || " + currentUser.email,
                        value: currentUser.id
                    }];
                }
                // EndMap
            });

        }

       

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
                                <Field disabled={true} name="projectCostId" label="Đợt Thanh Toán" placeholder="" options={optionProjectCost} component={RenderSelect}></Field>
                                <Field disabled={true} name="labourId" label="Nhân Công Thanh Toán" options={optionLabour} component={RenderSelect}></Field>
                                <Field disabled={true} name="lbSalaryPerDay" label="Lương Ngày Công" thousandSeparator={true} component={RenderMoneyFormat} ></Field>
                                <Field disabled={true} name="lbSalaryMidNight" label="Lương Ca Khuya" thousandSeparator={true} component={RenderMoneyFormat}  ></Field>
                                <Field disabled={true} name="lbNormalAttendance" label="Tổng Ngày Công Thường" component={RenderNumberInput}   ></Field>
                                <Field disabled={true} name="lbOvertimeAttendance" label="Tổng Ngày Công Thường" component={RenderNumberInput} ></Field>
                                <Field disabled={true} name="lbMidnightAttendance" label="Tổng Ngày Công Khuya" component={RenderNumberInput}  ></Field>
                                <Field disabled={true} name="moneyPaid" label="Tổng Tiền Cần Thanh Toán" placeholder="" thousandSeparator={true} component={RenderMoneyFormat} ></Field>
                                {/* <Field name="percentPaid" label="Phần Trăm Cần Thanh Toán" placeholder="Nhập phần trăm cần thanh toán..."  component={RenderNumberInput}></Field> */}
                                <Field name="approvalById" label="Duyệt Bởi" placeholder="Chọn người duyệt..." options={optionsApprovalBy} component={RenderSelect}></Field>
                                 <Field disabled={SecurityUtils.hasPermission(currentUser, "admin.projectPaymentApproval.labourAllowApproval")? false : true} name="status" label="Trạng Thái Thanh Toán" placeholder="Chọn Trạng Thái Thanh Toán"  options={optionsStatus} component={RenderSelect}></Field>
                                
                                {status == "DA_DUYET_THANH_TOAN" ? <Field name="paymentDate" label="Ngày Thanh Toán" dateFormat="DD/MM/YYYY" component={RenderDatePicker}></Field> : null}
                               
                                <Field name="note" label="Ghi Chú" placeholder="Nhập ghi chú..." rows={3} component={RenderTextArea}></Field>
                                <Field name="notifyTo" label="Thông Báo Đến" placeholder="Chọn người bạn muốn thông báo đến..." options={optionNotifyTo} component={RenderMultiSelect}></Field>
                                <Field name="notifyMessage" label="Nội Dung Thông Báo" placeholder="Nhập nội dung thông báo..." rows={3} component={RenderTextArea}></Field>

                                {/* <Field disabled={true} name="totalRevenue"  label="Tổng Doanh Thu" placeholder="Nhập tổng doanh thu..." thousandSeparator={true} component={RenderMoneyFormat}></Field> */}
                                <Field disabled={true} name="createdUserId" label="Người Tạo Bảng" options={showCreatedUser} component={RenderSelect}></Field>
                                {id ? <Field disabled={true} name="createdDate" label="Ngày Tạo Bảng" dateFormat="DD/MM/YYYY" component={RenderDatePicker}></Field> : null}
                                <div style={initialValues.lastedUpdateUserId ? { display: 'block' } : { display: 'none' }}>
                                    <Field disabled={true} name="lastedUpdateUserId" label="Người Chỉnh Sửa Gần Nhất" options={showLastedUpdateUser} component={RenderSelect}></Field>
                                    <Field disabled={true} name="lastedUpdateDate" label="Ngày Chỉnh Sửa Gần Nhất " dateFormat="DD/MM/YYYY" component={RenderDatePicker}></Field> </div>
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
            form: 'ModalLabourPayment',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalLabourPayment)));
