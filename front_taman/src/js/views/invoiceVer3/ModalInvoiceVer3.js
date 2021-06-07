import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker, RenderCheckbox, RenderSelect, RenderNumberInput, RenderMoneyFormat } from '../../components/formInputs';
import { Field, reduxForm,formValueSelector } from 'redux-form';
import isEmail from 'sane-email-validation';
import { StringUtils, SecurityUtils } from '../../utils/javascriptUtils';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_INVOICE_VER3 } from './action-types';
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
    var invoiceMoneyVer1 = values.invoiceVer1Link? values.invoiceVer1Link: 0
    var invoiceMoneyVer2 = values.invoiceVer2Link? values.invoiceVer2Link: 0
    var invoiceMoneyVer3 = values.invoiceMoney ? values.invoiceMoney :0
    // var total3ver =invoiceMoneyVer1 + invoiceMoneyVer2+ invoiceMoneyVer3;
        if((parseInt(invoiceMoneyVer1)+
        parseInt(invoiceMoneyVer2)+
        parseInt(invoiceMoneyVer3))>parseInt(values.approvalValueLink)){
                
            errors.invoiceMoney="Tổng tiền các hóa đơn không được lớn hơn giá trị được duyệt! ";
        }
    if (!values.teamLeaderName) {
        errors.teamLeaderName = 'Vui lòng nhập tên đội trưởng !.';
    }
    if(moment(values.acceptanceDatelink) > moment(values.sendDate)){
        errors.sendDate = "Ngày gửi hoá đơn lần 3 không được nhỏ hơn ngày nghiệm thu! " + moment(values.acceptanceDatelink).format("DD/MM/YYYY");
    }
    if(moment(values.invoiceVer2SenđDateLink) > moment(values.sendDate)){
        errors.sendDate = "Ngày gửi hoá đơn lần 3 không được nhỏ hơn ngày gửi hoá đơn lần 2! " + moment(values.invoiceVer2SenđDateLink).format("DD/MM/YYYY");
    }
    if(moment(values.completeDateLink) > moment(values.sendDate)){
        errors.sendDate = "Ngày gửi hoá đơn lần 3 không được nhỏ hơn ngày hoàn thành! " + moment(values.completeDateLink).format("DD/MM/YYYY");
    }
    return errors;
}
const selector = formValueSelector('ModalInvoiceVer3');

var today = moment(new Date,"DD/MM/YYYY");

const mapStateToProps = state => {

    var projectDetailDto = state.projectDetailReducer.projectDetailDto;
    var updateValue = {
        ...state.invoiceVer3Reducer.updatingInvoiceVer3,

        projectLink: projectDetailDto && projectDetailDto.project ? projectDetailDto.project.name : "N/A ",
        projectDetailId: projectDetailDto ? projectDetailDto.id : null,
        workContentLink : projectDetailDto && projectDetailDto.quotation ? projectDetailDto.quotation.workContent : "N/A",
        contractNumberLink : projectDetailDto && projectDetailDto.contract ? projectDetailDto.contract.contractNumber : "N/A",
        invoiceVer1Link : projectDetailDto && projectDetailDto.invoiceVer1 ? projectDetailDto.invoiceVer1.invoiceMoney : 0,
        invoiceVer2Link : projectDetailDto && projectDetailDto.invoiceVer2 ? projectDetailDto.invoiceVer2.invoiceMoney : 0,
        invoiceVer2SenđDateLink : projectDetailDto && projectDetailDto.invoiceVer2 ? moment(projectDetailDto.invoiceVer2.sendDate) : null,
        completeDateLink : projectDetailDto && projectDetailDto.complete ? moment(projectDetailDto.complete.completedDate) : null,
        approvalValueLink: projectDetailDto && projectDetailDto.approval ? projectDetailDto.approval.approvalValue : 0,
        acceptanceDatelink : projectDetailDto && projectDetailDto.acceptance ? moment(projectDetailDto.acceptance.acceptanceDate) : null,

        status: state.invoiceVer3Reducer.updatingInvoiceVer3 && state.invoiceVer3Reducer.updatingInvoiceVer3.status ? state.invoiceVer3Reducer.updatingInvoiceVer3.status: "CHUA_THANH_TOAN",
        sendDate: state.invoiceVer3Reducer.updatingInvoiceVer3 && state.invoiceVer3Reducer.updatingInvoiceVer3.sendDate ? moment(state.invoiceVer3Reducer.updatingInvoiceVer3.sendDate) : null,
        lastedUpdateDate: state.invoiceVer3Reducer.updatingInvoiceVer3 && state.invoiceVer3Reducer.updatingInvoiceVer3.lastedUpdateDate ? moment(state.invoiceVer3Reducer.updatingInvoiceVer3.lastedUpdateDate) : null,
        startProgressDate: state.invoiceVer3Reducer.updatingInvoiceVer3 && state.invoiceVer3Reducer.updatingInvoiceVer3.startProgressDate ? moment(state.invoiceVer3Reducer.updatingInvoiceVer3.startProgressDate) : null,
        endProgressDate: state.invoiceVer3Reducer.updatingInvoiceVer3 && state.invoiceVer3Reducer.updatingInvoiceVer3.endProgressDate ? moment(state.invoiceVer3Reducer.updatingInvoiceVer3.endProgressDate) : null,
        createdUserId:state.invoiceVer3Reducer.updatingInvoiceVer3 && state.invoiceVer3Reducer.updatingInvoiceVer3.createdUserId ?  state.invoiceVer3Reducer.updatingInvoiceVer3.createdUserId: state.common.currentUser.id,
        createdDate: state.invoiceVer3Reducer.updatingInvoiceVer3 && state.invoiceVer3Reducer.updatingInvoiceVer3.createdDate ? moment(state.invoiceVer3Reducer.updatingInvoiceVer3.createdDate) : today
        
    };
    return {
        initialValues: updateValue,
        currentUser: state.common.currentUser,
        sendDate: selector(state, "sendDate"),
        status: selector(state, "status"),
        lastedUpdateUserId: selector(state,"lastedUpdateUserId"),
        createdUserId: selector(state, "createdUserId")
    };
};

const mapDispatchToProps = dispatch => ({
    loadInvoiceVer3: (payload) =>
        dispatch({ type: LOAD_UPDATING_INVOICE_VER3, payload: payload }),
    loadProjectDetailDto: (projectDetailDto) =>
        dispatch({ type: LOAD_PROJECT_DETAIL_DTO, projectDetailDto: projectDetailDto }),
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalInvoiceVer3", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});


class ModalInvoiceVer3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectDetailDto: null,
            disableDataManipulation: true,
            checkInvoiceSendDate: null,
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
        const { loadInvoiceVer3, projectDetailDto, loadProjectDetailDto } = this.props;
        var id = this.props.idInvoiceVer3;
        var today = new Date();
        const dataPromise = agent.InvoiceVer3Api.getInvoiceVer3(id);
        loadInvoiceVer3(Promise.resolve(dataPromise));
        if(projectDetailDto){
            loadProjectDetailDto(projectDetailDto);
        }
        return(this.getListUser());
    }


    handleAdd(values) {
        const { currentUser, onAfterSave } = this.props;
        var onHide = this.props.onHide;
        var id = this.props.idInvoiceVer3;
        var today = new Date();
        var url = '/invoiceVer3/add';
        var bodyObject = {
            projectDetailId: values.projectDetailId,
            isVerifyReport: values.isVerifyReport,
            verifyUpload: values.verifyUpload,
            invoiceUpload: values.invoiceUpload,
            invoiceMoney: values.invoiceMoney? values.invoiceMoney: 0,
            paymentUpload: values.paymentUpload,
            invoiceNumber: values.invoiceNumber,
            paymentRequestStatus: values.paymentRequestStatus,
            sendDate: values.sendDate,
            status: values.status,
            inputInvoice: values.inputInvoice ? values.inputInvoice :0 ,
            inputUpload: values.inputUpload,
            note: values.note,
            inputUploadFile: values.inputUploadFile,
            invoiceUploadFile: values.invoiceUploadFile,
            createdUserId:values.createdUserId,
            lastedUpdateUserId: id ?  currentUser.id : null,
            createdDate:id? values.createdDate: today,
            lastedUpdateDate: id ? moment(today) : null,
            invoiceName : values.invoiceName
            
        };
        if (id) {
            url = '/invoiceVer3/update';
            bodyObject.id = id;
        }

        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                onAfterSave();
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
        // event.preventDefault();
        onHide();
        destroy();
    }
    render() {
        // const { objectInvoiceVer3, listfile, title, onHide } = this.props;
        const { handleSubmit, submitting, title, invalid, projectDetailDto, currentUser, initialValues, sendDate, status, createdUserId,lastedUpdateUserId } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show, bsSize: "sm", onHide: this.props.onHide, submitting: this.props.submitting };
        var checkInvoiceSendDate = this.state.checkInvoiceSendDate;
        var today = moment();
        var id = this.props.idInvoiceVer3;
        if (moment(sendDate).add(8, 'days') < moment(today) && status == "CHUA_THANH_TOAN") {
            checkInvoiceSendDate = "Ngày gửi hóa đơn đã vượt quá 7 ngày nhưng chưa được thanh toán. Vui lòng kiểm tra lại !"
        }else{ 
            checkInvoiceSendDate = null;
        }
        var optionInvoiceAllVers = [
            { label: "Chưa Thanh Toán", value: "CHUA_THANH_TOAN" },
            { label: "Đã Thanh Toán", value: "DA_THANH_TOAN" },
            {label:"Không Cần Thanh Toán", value:"KHONG_CAN_THANH_TOAN"},
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

        var optionApprovalStatus = [
            { label: "Đã Duyệt", value: "DA_DUYET" },
            { label: "Chưa Duyệt", value: "CHUA_DUYET" }];

     
        var newModal = null;
        var disableDataManipulation = this.state.disableDataManipulation;
        if (SecurityUtils.hasPermission(currentUser, "admin.projectProgress.invoiceVer3C&U")) {
            disableDataManipulation = false
        }

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
                                <fieldset disabled={disableDataManipulation}>
                                    {/* Just Load Id To save DATABASE */}
                                    <Field disabled={true} name="projectLink" label="Tên Dự Án" placeholder="" component={RenderInputWithDiv}></Field>
                                    <Field name="invoiceName" label="Định Danh Hóa Đơn" placeholder="Nhập Định Danh Hóa Đơn..." component={RenderInputWithDiv}></Field>
                                    <Field disabled={true} name="projectDetailId" label="Công Việc Dự Án" placeholder="" options={optionProjectDetail} component={RenderSelect}></Field>
                                    {  /* Just Show Infomation */}
                                    <Field disabled={true} name="contractNumberLink" label="Hợp Đồng Số" placeholder="" component={RenderInputWithDiv}></Field>
                                    <Field disabled={true} name="workContentLink" label="Nội Dung Công Việc" placeholder="" rows={2}  component={RenderTextArea}></Field>
                                    <Field disabled={true} name="approvalValueLink" label="Giá Trị Được Duyệt" placeholder="" thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                    <Field disabled={true} name="invoiceVer1Link" label="Hoá Đơn Lần 1" placeholder="" thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                    <Field disabled={true} name="invoiceVer2Link" label="Hoá Đơn Lần 2" placeholder="" thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                    <Field name="paymentRequestStatus" label="Yêu Cầu Thanh Toán" options={optionPaymentRequest} component={RenderSelect}></Field>
                                    <Field name="invoiceNumber"  label="Số Hóa Đơn Lần 3" component={RenderInputWithDiv}></Field>
                                    <Field name="invoiceMoney" label="Tiền Hoá Đơn Lần 3" placeholder="Nhập số tiền..." thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                    {disableDataManipulation ? null : <Field name="invoiceUploadFile" label="File Hoá Đơn 3" component={ListFile} modalUrl="/uploadInvoiceVer3File" ></Field>}
                                    <Field name="sendDate" dateFormat="DD/MM/YYYY" label="Ngày Gửi" component={RenderDatePicker}></Field>
                                    <Field name="status" label="Trạng Thái Thanh Toán" options={optionInvoiceAllVers} component={RenderSelect}></Field>
                                    {checkInvoiceSendDate ? <label style={{ color: 'orange' }}>{checkInvoiceSendDate}</label> : null}
                                    <Field name="inputInvoice" label="Hoá Đơn Đầu Vào" thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                    {disableDataManipulation ? null : <Field name="inputUploadFile" label="File Hoá Đơn Đầu Vào" component={ListFile} modalUrl="/uploadInvoiceVer3File"></Field>}
                                    <Field name="note" label="Ghi Chú" placeholder="Nhập Ghi Chú..." rows={3} component={RenderTextArea}></Field>
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
            form: 'ModalInvoiceVer3',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalInvoiceVer3)));
