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
import { LOAD_UPDATING_INVOICE_VER2 } from './action-types';
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
    var invoiceMoneyVer2 = values.invoiceMoney? values.invoiceMoney: 0
    var invoiceMoneyVer3 = values.invoiceMoneyVer3Link ? values.invoiceMoneyVer3Link :0
    // var total3ver =invoiceMoneyVer1 + invoiceMoneyVer2+ invoiceMoneyVer3;
        if((parseInt(invoiceMoneyVer1)+
        parseInt(invoiceMoneyVer2)+
        parseInt(invoiceMoneyVer3))>parseInt(values.approvalValueLink)){
                
            errors.invoiceMoney="Tổng tiền các hóa đơn không được lớn hơn giá trị được duyệt! ";
        }
    if(moment(values.invoiceVer1SendDate)>moment(values.sendDate)){
        errors.sendDate="Ngày gửi hóa đơn lần 2 không được nhỏ hơn ngày gửi hóa đơn lần 1 " + moment(values.invoiceVer1SendDate).format("DD/MM/YYYY");
    }
    if(moment(values.efficientStartActualProgressDate)>moment(values.sendDate)){
        errors.sendDate="Ngày gửi hóa đơn 2 không được nhỏ hơn ngày thực hiện " + moment(values.efficientStartActualProgressDate).format("DD/MM/YYYY");
    }
    return errors;
}
const selector = formValueSelector('ModalInvoiceVer2');

var today = moment(new Date,"DD/MM/YYYY");

const mapStateToProps = state => {

    var projectDetailDto = state.projectDetailReducer.projectDetailDto;
    var updateValue = {
        ...state.invoiceVer2Reducer.updatingInvoiceVer2,
        
        projectLink: projectDetailDto && projectDetailDto.project ? projectDetailDto.project.name : "N/A ",
        projectDetailId: projectDetailDto ? projectDetailDto.id : null,
        invoiceVer1SendDate : projectDetailDto && projectDetailDto.invoiceVer1 ? moment(projectDetailDto.invoiceVer1.sendDate) : null,
        efficientStartActualProgressDate : projectDetailDto && projectDetailDto.efficiency ? moment(projectDetailDto.efficiency.startActualProgressDate) : null,
        contractNumberLink : projectDetailDto && projectDetailDto.contract ? projectDetailDto.contract.contractNumber: "N/A",
        workContentLink : projectDetailDto && projectDetailDto.quotation ? projectDetailDto.quotation.workContent: "N/A",
        approvalValueLink : projectDetailDto && projectDetailDto.approval ? projectDetailDto.approval.approvalValue : 0,
        invoiceVer1Link : projectDetailDto && projectDetailDto.invoiceVer1 ? projectDetailDto.invoiceVer1.invoiceMoney:0,
        invoiceMoneyVer3Link:projectDetailDto && projectDetailDto.invoiceVer3 ?projectDetailDto.invoiceVer3.invoiceMoney: 0,
        
        status: state.invoiceVer2Reducer.updatingInvoiceVer2 && state.invoiceVer2Reducer.updatingInvoiceVer2.status ?state.invoiceVer2Reducer.updatingInvoiceVer2.status : "CHUA_THANH_TOAN",
        sendDate: state.invoiceVer2Reducer.updatingInvoiceVer2 && state.invoiceVer2Reducer.updatingInvoiceVer2.sendDate ? moment(state.invoiceVer2Reducer.updatingInvoiceVer2.sendDate) : null,
        lastedUpdateDate: state.invoiceVer2Reducer.updatingInvoiceVer2 && state.invoiceVer2Reducer.updatingInvoiceVer2.lastedUpdateDate ? moment(state.invoiceVer2Reducer.updatingInvoiceVer2.lastedUpdateDate) : null,
        startProgressDate: state.invoiceVer2Reducer.updatingInvoiceVer2 && state.invoiceVer2Reducer.updatingInvoiceVer2.startProgressDate ? moment(state.invoiceVer2Reducer.updatingInvoiceVer2.startProgressDate) : null,
        endProgressDate: state.invoiceVer2Reducer.updatingInvoiceVer2 && state.invoiceVer2Reducer.updatingInvoiceVer2.endProgressDate ? moment(state.invoiceVer2Reducer.updatingInvoiceVer2.endProgressDate) : null,
        createdUserId:state.invoiceVer2Reducer.updatingInvoiceVer2 && state.invoiceVer2Reducer.updatingInvoiceVer2.createdUserId ?  state.invoiceVer2Reducer.updatingInvoiceVer2.createdUserId: state.common.currentUser.id,
        createdDate: state.invoiceVer2Reducer.updatingInvoiceVer2 && state.invoiceVer2Reducer.updatingInvoiceVer2.createdDate ? moment(state.invoiceVer2Reducer.updatingInvoiceVer2.createdDate) : today
        
    };
    return {
        initialValues: updateValue,
        currentUser: state.common.currentUser,
        sendDate:selector(state,"sendDate"),
        status:selector(state,"status"),
        lastedUpdateUserId: selector(state,"lastedUpdateUserId"),
        createdUserId: selector(state, "createdUserId")

    };
};

const mapDispatchToProps = dispatch => ({
    loadInvoiceVer2: (payload) =>
        dispatch({ type: LOAD_UPDATING_INVOICE_VER2, payload: payload }),
    loadProjectDetailDto: (projectDetailDto) =>
        dispatch({ type: LOAD_PROJECT_DETAIL_DTO, projectDetailDto: projectDetailDto }),
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalInvoiceVer2", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});




class ModalInvoiceVer2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // listAllYears: [],
            checkInvoiceSendDate: null,
            disableDataManipulation:true,
            listAllUsers:[],
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
        const { loadInvoiceVer2,projectDetailDto,loadProjectDetailDto } = this.props;
        var id = this.props.idInvoiceVer2;
        const dataPromise = agent.InvoiceVer2Api.getInvoiceVer2(id);
        loadInvoiceVer2(Promise.resolve(dataPromise));
        if(projectDetailDto){
            loadProjectDetailDto(projectDetailDto);
        }
        return(this.getListUser());
    }


    handleAdd(values) {
        const {currentUser,onAfterSave} = this.props;
        var onHide = this.props.onHide;
        var id = this.props.idInvoiceVer2;
        var url = '/invoiceVer2/add';
        var today = new Date();
        var bodyObject = {
            projectDetailId: values.projectDetailId,
            verifyReportStatus: values.verifyReportStatus ,
            verifyUpload: values.verifyUpload ,
            invoiceUpload: values.invoiceUpload ,
            invoiceMoney: values.invoiceMoney ? values.invoiceMoney: 0 ,
            paymentUpload: values.paymentUpload ,
            paymentRequestStatus: values.paymentRequestStatus ,
            invoiceNumber: values.invoiceNumber,
            sendDate: values.sendDate ,
            status: values.status ,
            inputInvoice: values.inputInvoice ,
            inputUpload: values.inputUpload ?values.inputUpload: 0 ,
            note: values.note ,
            invoiceUploadFile: values.invoiceUploadFile ,
            verifyUploadFile: values.verifyUploadFile ,
            inputUploadFile: values.inputUploadFile ,
            paymentUploadFile: values.paymentUploadFile,
            createdUserId:values.createdUserId,
            lastedUpdateUserId: id ?  currentUser.id : null,
            createdDate:id? values.createdDate: today,
            lastedUpdateDate: id ? moment(today) : null,
            invoiceName : values.invoiceName
            
        };
        if (id) {
            url = '/invoiceVer2/update';
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
        // const { objectInvoiceVer2, listfile, title, onHide } = this.props;

        const { handleSubmit, submitting, title, invalid,projectDetailDto, currentUser, initialValues,sendDate, status, createdUserId,lastedUpdateUserId } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"sm",  onHide: this.props.onHide, submitting: this.props.submitting };
        var checkInvoiceSendDate = this.state.checkInvoiceSendDate;
        var today = moment();
        var id = this.props.idInvoiceVer2;
        if (moment(sendDate,"DD/MM/YYYY").add(8, 'days') < moment(today,"DD/MM/YYYY") && status == "CHUA_THANH_TOAN") {
            checkInvoiceSendDate = "Ngày gửi hóa đơn đã vượt quá 7 ngày nhưng chưa được thanh toán. Vui lòng kiểm tra lại !"
        }else{ 
            checkInvoiceSendDate = null;
        }
        
        var optionInvoiceAllVers = [
            {label:"Chưa Thanh Toán", value:"CHUA_THANH_TOAN"},
            {label:"Đã Thanh Toán", value:"DA_THANH_TOAN"},
            {label:"Không Cần Thanh Toán", value:"KHONG_CAN_THANH_TOAN"},

        ];
        var optionProjectDetail = [];
        if(projectDetailDto){
            optionProjectDetail.push({label:projectDetailDto.name,value:projectDetailDto.id })
        }
        var optionPaymentRequest= [
            {label:"Không Cần Gửi", value:"KHONG_CAN_GUI"},
            {label:"Đã Gửi", value:"DA_GUI"},
        {label:"Chưa Gửi", value:"CHUA_GUI"}];

        var optionVerifyStatus = [{label:"Đã Xác Nhận", value:"DA_XAC_NHAN"},
        {label:"Chưa Xác Nhận", value:"CHUA_XAC_NHAN"}];
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
        var optionApprovalStatus= [
            {label:"Đã Duyệt",value:"DA_DUYET"},
            {label:"Chưa Duyệt",value:"CHUA_DUYET"}]; 

       
        var newModal = null;
        var disableDataManipulation = this.state.disableDataManipulation;
        if(SecurityUtils.hasPermission(currentUser, "admin.projectProgress.invoiceVer2C&U")){
            disableDataManipulation  = false
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
                                {/* Just Show Project Name */}
                                <Field disabled={true} name="projectLink" label="Tên Dự Án" placeholder="" component={RenderInputWithDiv}></Field>
                                <Field name="invoiceName" label="Định Danh Hóa Đơn" placeholder="Nhập Định Danh Hóa Đơn..." component={RenderInputWithDiv}></Field>
                                <Field disabled={true} name="projectDetailId" label="Công Việc Dự Án" placeholder="" options={optionProjectDetail} component={RenderSelect}></Field>
                                <Field disabled={true} name="contractNumberLink" label="Hợp Đồng Số" component={RenderInputWithDiv}></Field>
                                <Field disabled={true} name="workContentLink" label="Nội Dung Công Việc"  rows={2} component={RenderTextArea}></Field>
                                <Field disabled={true} name="approvalValueLink" label="Giá Trị Được Duyệt"  thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                <Field disabled={true} name="invoiceVer1Link" label="Hoá Đơn Lần 1"  thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                <Field name="verifyReportStatus" label="Biên Bản Xác Nhận KL" options={optionVerifyStatus} component={RenderSelect}></Field>
                                {disableDataManipulation ? null :  <Field name="verifyUploadFile" label="File Biên Bản Xác Nhận" component={ListFile} modalUrl="/uploadInvoiceVer2File"></Field>}
                               <Field name="invoiceNumber"  label="Số Hóa Đơn Lần 2" component={RenderInputWithDiv}></Field>
                                <Field name="invoiceMoney" label="Tiền Hoá Đơn Lần 2" placeholder="Nhập số tiền..." thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                <Field name="paymentRequestStatus" label="Yêu Cầu Thanh Toán" options={optionPaymentRequest} component={RenderSelect}></Field>
                                {disableDataManipulation ? null : <Field name="paymentUploadFile" label="File YC Thanh Toán" component={ListFile} modalUrl="/uploadInvoiceVer2File"></Field>}
                                <Field name="sendDate" dateFormat="DD/MM/YYYY" label="Ngày Gửi" component={RenderDatePicker}></Field>
                                <Field name="status" label="Trạng Thái Thanh Toán"  options={optionInvoiceAllVers}  component={RenderSelect}></Field>
                                {checkInvoiceSendDate?<label style={{color:'orange'}}>{checkInvoiceSendDate}</label>:null}
                                <Field name="inputInvoice" label="Hoá Đơn Đầu Vô" placeholder="Nhập số tiền..." thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                {disableDataManipulation ? null : <Field name="inputUploadFile"  label="File Hoá Đơn Đầu Vô" component={ListFile} modalUrl="/uploadInvoiceVer2File"></Field>}
                                <Field name="note" label="Ghi Chú" placeholder="Nhập ghi chú..." rows={3} component={RenderTextArea}></Field>
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
            form: 'ModalInvoiceVer2',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalInvoiceVer2)));
