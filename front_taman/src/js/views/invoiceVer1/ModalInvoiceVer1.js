import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker, RenderCheckbox, RenderSelect, RenderNumberInput, RenderMoneyFormat } from '../../components/formInputs';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import isEmail from 'sane-email-validation';
import { StringUtils, SecurityUtils } from '../../utils/javascriptUtils';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_INVOICE_VER1 } from './action-types';
import { FIRE_REDIRECT } from '../../constants/action-types';
import ListFile from '../../components/ListFile';
import { isNull } from 'util';
import moment from 'moment';
import SecuredComponent from '../../components/SecuredComponent';
import { LOAD_PROJECT_DETAIL_DTO } from '../projectDetail/action-types';

const validate = values => {
    const errors = {};
    if (!values.createdUserId) {
        errors.createdUserId = "";

    }
    if (!values.name) {
        errors.name = 'Vui lòng nhập tên dư án.';
    }
    var invoiceMoneyVer1 = values.invoiceMoney ? values.invoiceMoney : 0
    var invoiceMoneyVer2 = values.invoiceMoneyVer2Link ? values.invoiceMoneyVer2Link : 0
    var invoiceMoneyVer3 = values.invoiceMoneyVer3Link ? values.invoiceMoneyVer3Link : 0
    // var total3ver =invoiceMoneyVer1 + invoiceMoneyVer2+ invoiceMoneyVer3;
    if ((parseInt(invoiceMoneyVer1) +
        parseInt(invoiceMoneyVer2) +
        parseInt(invoiceMoneyVer3)) > parseInt(values.approvalValueLink)) {

        errors.invoiceMoney = "Tổng tiền các hóa đơn không được lớn hơn giá trị được duyệt! ";
    }

    if (moment(values.contractSendDateLink) > moment(values.sendDate)) {
        errors.sendDate = "Ngày gửi hóa đơn 1 không được nhỏ hơn ngày gửi hợp đồng " + moment(values.contractSendDateLink).format("DD/MM/YYYY");
    }
    return errors;
}

const selector = formValueSelector('ModalInvoiceVer1');

var today = moment(new Date, "DD/MM/YYYY");

const mapStateToProps = state => {
    var projectDetailDto = state.projectDetailReducer.projectDetailDto;
    var updateValue = {
        ...state.invoiceVer1Reducer.updatingInvoiceVer1,

        projectLink: projectDetailDto && projectDetailDto.project ? projectDetailDto.project.name : "N/A ",
        projectDetailId: projectDetailDto ? projectDetailDto.id : null,
        contractNumberLink: projectDetailDto && projectDetailDto.contract ? projectDetailDto.contract.contractNumber : "N/A",
        workContentLink: projectDetailDto && projectDetailDto.quotation ? projectDetailDto.quotation.workContent : "N/A",
        approvalValueLink: projectDetailDto && projectDetailDto.approval ? projectDetailDto.approval.approvalValue : 0,
        contractSendDateLink: projectDetailDto && projectDetailDto.contract ? projectDetailDto.contract.sendDate : "N/A",
        invoiceMoneyVer2Link: projectDetailDto && projectDetailDto.invoiceVer2 ? projectDetailDto.invoiceVer2.invoiceMoney : 0,
        invoiceMoneyVer3Link: projectDetailDto && projectDetailDto.invoiceVer3 ? projectDetailDto.invoiceVer3.invoiceMoney : 0,


        status: state.invoiceVer1Reducer.updatingInvoiceVer1 && state.invoiceVer1Reducer.updatingInvoiceVer1.status ? state.invoiceVer1Reducer.updatingInvoiceVer1.status : "CHUA_THANH_TOAN",
        sendDate: state.invoiceVer1Reducer.updatingInvoiceVer1 && state.invoiceVer1Reducer.updatingInvoiceVer1.sendDate ? moment(state.invoiceVer1Reducer.updatingInvoiceVer1.sendDate) : null,
        invoiceMoney: state.invoiceVer1Reducer.updatingInvoiceVer1 && state.invoiceVer1Reducer.updatingInvoiceVer1.invoiceMoney ? state.invoiceVer1Reducer.updatingInvoiceVer1.invoiceMoney : null,
        lastedUpdateDate: state.invoiceVer1Reducer.updatingInvoiceVer1 && state.invoiceVer1Reducer.updatingInvoiceVer1.lastedUpdateDate ? moment(state.invoiceVer1Reducer.updatingInvoiceVer1.lastedUpdateDate) : null,
        startProgressDate: state.invoiceVer1Reducer.updatingInvoiceVer1 && state.invoiceVer1Reducer.updatingInvoiceVer1.startProgressDate ? moment(state.invoiceVer1Reducer.updatingInvoiceVer1.startProgressDate) : null,
        endProgressDate: state.invoiceVer1Reducer.updatingInvoiceVer1 && state.invoiceVer1Reducer.updatingInvoiceVer1.endProgressDate ? moment(state.invoiceVer1Reducer.updatingInvoiceVer1.endProgressDate) : null,
        createdUserId: state.invoiceVer1Reducer.updatingContract && state.invoiceVer1Reducer.updatingInvoiceVer1.createdUserId ? state.invoiceVer1Reducer.updatingInvoiceVer1.createdUserId : state.common.currentUser.id,
        createdDate: state.invoiceVer1Reducer.updatingContract && state.invoiceVer1Reducer.updatingInvoiceVer1.createdDate ? moment(state.invoiceVer1Reducer.updatingInvoiceVer1.createdDate) : today

    };
    return {
        initialValues: updateValue,
        currentUser: state.common.currentUser,
        sendDate: selector(state, "sendDate"),
        status: selector(state, "status"),
        lastedUpdateUserId: selector(state, "lastedUpdateUserId"),
        createdUserId: selector(state, "createdUserId"),
    };
};

const mapDispatchToProps = dispatch => ({
    loadInvoiceVer1: (payload) =>
        dispatch({ type: LOAD_UPDATING_INVOICE_VER1, payload: payload }),
    loadProjectDetailDto: (projectDetailDto) =>
        dispatch({ type: LOAD_PROJECT_DETAIL_DTO, projectDetailDto: projectDetailDto }),
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalInvoiceVer1", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});

class ModalInvoiceVer1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkInvoiceSendDate: null,
            disableDataManipulation: true,
            listAllUsers: [],
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
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
        const { loadInvoiceVer1, projectDetailDto, loadProjectDetailDto } = this.props;
        var id = this.props.idInvoiceVer1;
        if (projectDetailDto) {
            loadProjectDetailDto(projectDetailDto);
        }
        const dataPromise = agent.InvoiceVer1Api.getInvoiceVer1(id);
        loadInvoiceVer1(Promise.resolve(dataPromise));
        return (this.getListUser());
    }

    handleAdd(values) {
        const { currentUser, onAfterSave } = this.props;
        var onHide = this.props.onHide;
        var id = this.props.idInvoiceVer1;
        var url = '/invoiceVer1/add';
        var today = new Date();
        var bodyObject = {
            projectDetailId: values.projectDetailId,
            paymentUpload: values.paymentUpload,
            paymentRequestStatus: values.paymentRequestStatus,
            invoiceMoney: values.invoiceMoney ? values.invoiceMoney : 0,
            invoiceNumber: values.invoiceNumber,
            invoiceUpload: values.invoiceUpload,
            sendDate: values.sendDate,
            status: values.status,
            inputInvoice: values.inputInvoice ? values.inputInvoice : 0,
            inputUpload: values.inputUpload,
            note: values.note,
            paymentUploadFile: values.paymentUploadFile,
            invoiceUploadFile: values.invoiceUploadFile,
            inputUploadFile: values.inputUploadFile,
            createdUserId: values.createdUserId,
            lastedUpdateUserId: id ? currentUser.id : null,
            createdDate: id ? values.createdDate : today,
            lastedUpdateDate: id ? moment(today) : null,
            invoiceName : values.invoiceName
        };
        if (id) {
            url = '/invoiceVer1/update';
            bodyObject.id = id;
        }

        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                onAfterSave();
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
        // const { objectInvoiceVer1, listfile, title, onHide } = this.props;

        const { handleSubmit, submitting, title, invalid, projectDetailDto, currentUser, initialValues, sendDate, status, createdUserId, lastedUpdateUserId } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show, bsSize: "sm", onHide: this.props.onHide, submitting: this.props.submitting };
        var checkInvoiceSendDate = this.state.checkInvoiceSendDate;
        var today = moment();
        var id = this.props.idInvoiceVer1;
        if (moment(sendDate, "DD/MM/YYYY").add(8, 'days') < moment(today, "DD/MM/YYYY") && status == "CHUA_THANH_TOAN") {
            checkInvoiceSendDate = "Ngày gửi hóa đơn đã vượt quá 7 ngày nhưng chưa được thanh toán. Vui lòng kiểm tra lại !"
        } else {
            checkInvoiceSendDate = null;
        }
        var optionInvoiceAllVers = [
            { label: "Chưa Thanh Toán", value: "CHUA_THANH_TOAN" },
            { label: "Đã Thanh Toán", value: "DA_THANH_TOAN" },
            { label: "Không Cần Thanh Toán", value: "KHONG_CAN_THANH_TOAN" },
        ];
        var optionProjectDetail = [];
        if (projectDetailDto) {
            optionProjectDetail.push({ label: projectDetailDto.name, value: projectDetailDto.id })
        }
        var optionPaymentRequest = [
            { label: "Không Cần Gửi", value: "KHONG_CAN_GUI" },
            { label: "Đã Gửi", value: "DA_GUI" },
            { label: "Chưa Gửi", value: "CHUA_GUI" }];
        var dataUser = this.state.listAllUsers;
        var showCreatedUser = [];
        var showLastedUpdateUser = [];
        if (dataUser) {
            dataUser.map(item => {
                // StartMap
                // Push created user
                // alert(createdUserId);
                if (createdUserId && createdUserId == item.id) {
                    showCreatedUser = [{
                        label: item.fullName + " || " + item.email, value: item.id
                    }];
                } else if (!createdUserId) {
                    showCreatedUser = [{
                        label: currentUser.fullName + " || " + currentUser.email, value: currentUser.id
                    }];
                }
                // Push Updated User
                if (id && lastedUpdateUserId && lastedUpdateUserId == item.id) {
                    showLastedUpdateUser = [{
                        label: item.fullName + " || " + item.email,
                        value: item.id
                    }];
                } else if (id && !lastedUpdateUserId) {
                    showLastedUpdateUser = [{
                        label: currentUser.fullName + " || " + currentUser.email,
                        value: currentUser.id
                    }];
                }
                // EndMap
            });

        }
        var optionApprovalStatus = [
            { label: "Đã Duyệt", value: "DA_DUYET" },
            { label: "Chưa Duyệt", value: "CHUA_DUYET" }];

        var newModal = null;
        var disableDataManipulation = this.state.disableDataManipulation;
        if (SecurityUtils.hasPermission(currentUser, "admin.projectProgress.invoiceVer1C&U")) {
            disableDataManipulation = false
        }
        newModal =
            <div style={{ width: '30%' }}>
                <Modal
                    {...modalConfig}
                    aria-labelledby="contained-modal-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-sm"><center>{title}</center>  </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {submitting ? <LoadingScreen /> :
                            <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.handleAdd)}>
                                <fieldset disabled={disableDataManipulation}>
                                    {/* Just Show Project Name */}
                                    <Field disabled={true} name="projectLink" label="Tên Dự Án" placeholder="" component={RenderInputWithDiv}></Field>
                                    <Field name="invoiceName" label="Định Danh Hóa Đơn" placeholder="Nhập Định Danh Hóa Đơn..." component={RenderInputWithDiv}></Field>
                                    <Field disabled={true} name="projectDetailId" label="Công Việc Dự Án" placeholder="" options={optionProjectDetail} component={RenderSelect}></Field>
                                    <Field disabled={true} name="contractNumberLink" label="Hợp Đồng Số" component={RenderInputWithDiv}></Field>
                                    <Field disabled={true} name="workContentLink" label="Nội Dung Công Việc" rows={2} component={RenderTextArea}></Field>
                                    <Field disabled={true} name="approvalValueLink" label="Giá Trị Được Duyệt" thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                    <Field name="paymentRequestStatus" label="Yêu Cầu Thanh Toán" options={optionPaymentRequest} component={RenderSelect}></Field>
                                    {disableDataManipulation ? null : <Field name="paymentUploadFile" label="File Thanh Toán" component={ListFile} modalUrl="/uploadInvoiceVer1File"></Field>}
                                    <Field name="invoiceNumber" label="Số Hóa Đơn Lần 1" component={RenderInputWithDiv}></Field>
                                    <Field name="invoiceMoney" label="Tiền Hoá Đơn Lần 1" thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                    {disableDataManipulation ? null : <Field name="invoiceUploadFile" label="File Hoá Đơn" component={ListFile} modalUrl="/uploadInvoiceVer1File"></Field>}
                                    <Field name="sendDate" dateFormat="DD/MM/YYYY" label="Ngày Gửi" component={RenderDatePicker}></Field>
                                    <Field name="status" label="Trạng Thái Thanh Toán" options={optionInvoiceAllVers} component={RenderSelect}></Field>
                                    {checkInvoiceSendDate ? <label style={{ color: 'orange' }}>{checkInvoiceSendDate}</label> : null}
                                    <Field name="note" label="Ghi Chú" placeholder="Nhập ghi chú..." rows={3} component={RenderTextArea}></Field>
                                    <Field name="inputInvoice" label="Hoá Đơn Đầu Vào" placeholder="Nhập số tiền ..." thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                    {disableDataManipulation ? null : <Field name="inputUploadFile" label="File Hoá Đơn ĐV" component={ListFile} modalUrl="/uploadInvoiceVer1File"></Field>}
                                    <Field disabled={true} name="createdUserId" label="Người Tạo Bảng" options={showCreatedUser} component={RenderSelect}></Field>
                                    <Field disabled={true} name="createdDate" label="Ngày Tạo Bảng" dateFormat="DD/MM/YYYY" component={RenderDatePicker}></Field>
                                    <div style={initialValues.lastedUpdateUserId ? { display: 'block' } : { display: 'none' }}>
                                        <Field disabled={true} name="lastedUpdateUserId" label="Người Chỉnh Sửa Gần Nhất" options={showLastedUpdateUser} component={RenderSelect}></Field>
                                        <Field disabled={true} name="lastedUpdateDate" label="Ngày Chỉnh Sửa Gần Nhất " dateFormat="DD/MM/YYYY" component={RenderDatePicker}></Field> </div>
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
            form: 'ModalInvoiceVer1',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalInvoiceVer1)));
