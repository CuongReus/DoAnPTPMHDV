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
import { LOAD_UPDATING_INCURRED } from './action-types';
import { FIRE_REDIRECT } from '../../constants/action-types';
import ListFile from '../../components/ListFile';
import { isNull } from 'util';
import moment from 'moment';
import SecuredComponent from '../../components/SecuredComponent';
import { LOAD_PROJECT_DETAIL_DTO } from '../projectDetail/action-types';

const validate = values => {
    const errors = {};
    // if (!values.teamLeaderName) {
    //     errors.teamLeaderName = 'Vui lòng nhập tên đội trưởng !.';
    // }
    if (!values.createdUserId) {
        errors.createdUserId = "";

    }
    if (moment(values.acceptanceDatelink) > moment(values.endProgressDate)) {
        errors.endProgressDate = "Ngày kết thúc tiến độ thực hiện ( phát sinh) không được nhỏ hơn ngày nghiệm thu! " + moment(values.acceptanceDatelink).format("DD/MM/YYYY");
    }
    if (!values.workContentIncurred) {
        errors.workContentIncurred = "Vui lòng nhập nội dung công việc phát sinh!";
    }
    if (!values.approvalStatus) {
        errors.approvalStatus = "Vui lòng chọn trạng thái được duyệt phát sính!";
    }
    return errors;
}
const selector = formValueSelector('ModalIncurred');
var today = moment(new Date, "DD/MM/YYYY");

const mapStateToProps = state => {

    var projectDetailDto = state.projectDetailReducer.projectDetailDto;
    var updateValue = {
        ...state.incurredReducer.updatingIncurred,

        projectLink: projectDetailDto && projectDetailDto.project ? projectDetailDto.project.name : "N/A ",
        projectDetailId: projectDetailDto ? projectDetailDto.id : null,
        workContentLink: projectDetailDto && projectDetailDto.quotation ? projectDetailDto.quotation.workContent : "N/A",
        contractNumberLink: projectDetailDto && projectDetailDto.contract ? projectDetailDto.contract.contractNumber : "N/A",
        acceptanceDatelink: projectDetailDto && projectDetailDto.acceptance ? moment(projectDetailDto.acceptance.acceptanceDate) : null,
        createdUserId: state.incurredReducer.updatingIncurred && state.incurredReducer.updatingIncurred.createdUserId ? state.incurredReducer.updatingIncurred.createdUserId : state.common.currentUser.id,
        sendAppendixDate: state.incurredReducer.updatingIncurred && state.incurredReducer.updatingIncurred.sendAppendixDate ? moment(state.incurredReducer.updatingIncurred.sendAppendixDate) : null,
        sendInvoiceDate: state.incurredReducer.updatingIncurred && state.incurredReducer.updatingIncurred.sendInvoiceDate ? moment(state.incurredReducer.updatingIncurred.sendInvoiceDate) : null,
        startProgressDate: state.incurredReducer.updatingIncurred && state.incurredReducer.updatingIncurred.startProgressDate ? moment(state.incurredReducer.updatingIncurred.startProgressDate) : null,
        endProgressDate: state.incurredReducer.updatingIncurred && state.incurredReducer.updatingIncurred.endProgressDate ? moment(state.incurredReducer.updatingIncurred.endProgressDate) : null,
        lastedUpdateDate: state.incurredReducer.updatingIncurred && state.incurredReducer.updatingIncurred.lastedUpdateDate ? moment(state.incurredReducer.updatingIncurred.lastedUpdateDate) : null,
        startProgressDate: state.incurredReducer.updatingIncurred && state.incurredReducer.updatingIncurred.startProgressDate ? moment(state.incurredReducer.updatingIncurred.startProgressDate) : null,
        endProgressDate: state.incurredReducer.updatingIncurred && state.incurredReducer.updatingIncurred.endProgressDate ? moment(state.incurredReducer.updatingIncurred.endProgressDate) : null,
        createdDate: state.incurredReducer.updatingIncurred && state.incurredReducer.updatingIncurred.createdDate ? moment(state.incurredReducer.updatingIncurred.createdDate) : today
        
    };
    return {
        currentUser: state.common.currentUser,
        initialValues: updateValue,
        lastedUpdateUserId: selector(state,"lastedUpdateUserId"),
        createdUserId: selector(state, "createdUserId")

    };
};

const mapDispatchToProps = dispatch => ({
    loadIncurred: (payload) =>
        dispatch({ type: LOAD_UPDATING_INCURRED, payload: payload }),
    loadProjectDetailDto: (projectDetailDto) =>
        dispatch({ type: LOAD_PROJECT_DETAIL_DTO, projectDetailDto: projectDetailDto }),
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalIncurred", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});


class ModalIncurred extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disableDataManipulation: true,
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
        const { loadIncurred, projectDetailDto, loadProjectDetailDto } = this.props;
        var id = this.props.idIncurred;
        if (projectDetailDto) {
            loadProjectDetailDto(projectDetailDto);
        }
        const dataPromise = agent.IncurredApi.getIncurred(id);
        loadIncurred(Promise.resolve(dataPromise));
        return(this.getListUser());
    }


    handleAdd(values) {
        const { currentUser, onAfterSave } = this.props;
        var onHide = this.props.onHide;
        var id = this.props.idIncurred;
        var url = '/incurred/add';
        var today = new Date();
        var bodyObject = {
            projectDetailId: values.projectDetailId,
            workContentIncurred: values.workContentIncurred,
            incurredQuotation: values.incurredQuotation ? values.incurredQuotation : 0,
            quotationUpload: values.quotationUpload,
            workUpload: values.workUpload,
            approvalStatus: values.approvalStatus,
            approvalValue: values.approvalValue ? values.approvalValue : 0,
            approvalUpload: values.approvalUpload,
            appendixContractNumber: values.appendixContractNumber,
            sendAppendixDate: values.sendAppendixDate,
            invoiceIncurred: values.invoiceIncurred,
            invoiceIncurredUpload: values.invoiceIncurredUpload,
            sendInvoiceDate: values.sendInvoiceDate,
            startProgressDate: values.startProgressDate,
            endProgressDate: values.endProgressDate,
            workStatus: values.workStatus,
            defectStatus: values.defectStatus,
            defectUpload: values.defectUpload,
            paymentStatus: values.paymentStatus,
            inputInvoice: values.inputInvoice ? values.inputInvoice : 0,
            inputUpload: values.inputUpload,
            note: values.note,
            quotationUploadFile: values.quotationUploadFile,
            approvalUploadFile: values.approvalUploadFile,
            invoiceIncurredUploadFile: values.invoiceIncurredUploadFile,
            defectUploadFile: values.defectUploadFile,
            inputUploadFile: values.inputUploadFile,
            workUploadFile: values.workUploadFile,
            handoverWorkUploadFile: values.handoverWorkUploadFile,
            createdUserId:values.createdUserId,
            lastedUpdateUserId: id ?  currentUser.id : null,
            createdDate:id? values.createdDate: today,
            lastedUpdateDate: id ? moment(today) : null,
            appendixUploadFile: values.appendixUploadFile




        };
        if (id) {
            url = '/incurred/update';
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
        // const { objectIncurred, listfile, title, onHide } = this.props;

        const { handleSubmit, submitting, title, invalid, projectDetailDto, currentUser, initialValues, createdUserId,lastedUpdateUserId } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show, bsSize: "sm", onHide: this.props.onHide, submitting: this.props.submitting };
        var id = this.props.idIncurred;
        var optionIncurredWorkStatus = [{ label: "Đang Làm", value: "DANG_LAM" },
        { label: "Hoàn Thành", value: "HOAN_THANH" },
        { label: "Đã Nghiệm Thu", value: "DA_NGHIEM_THU" }];
        var optionProjectDetail = [];
        if (projectDetailDto) {
            optionProjectDetail.push({ label: projectDetailDto.name, value: projectDetailDto.id })
        }
        var optionDefectStatus = [{ label: "Đang Làm", value: "DANG_LAM" },
        { label: "Đã Hoàn Thành", value: "DA_HOAN_THANH" }];
        var optionApprovalStatus = [
            { label: "Đã Duyệt", value: "DA_DUYET" },
            { label: "Chưa Duyệt", value: "CHUA_DUYET" }];
        var optionIncurredPaymentStatus = [{ label: "Đã Thanh Toán", value: "DA_THANH_TOAN" },
        { label: "Chưa Thanh Toán", value: "CHUA_THANH_TOAN" }];

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
        var newModal = null;

        var disableDataManipulation = this.state.disableDataManipulation;
        if (SecurityUtils.hasPermission(currentUser, "admin.projectProgress.incurredC&U")) {
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
                                    <Field disabled={true} name="projectLink" label="Tên Dự Án" component={RenderInputWithDiv}></Field>
                                    <Field disabled={true} name="projectDetailId" label="Công Việc Dự Án" options={optionProjectDetail} component={RenderSelect}></Field>
                                    {  /* Just Show Infomation */}
                                    <Field disabled={true} name="contractNumberLink" label="Hợp Đồng Số" component={RenderInputWithDiv}></Field>
                                    <Field disabled={true} name="workContentLink" label="Nội Dung Công Việc" rows={2} component={RenderTextArea}></Field>
                                    <Field name="workContentIncurred" label="Nội Dung Công Việc Phát Sinh" placeholder="Nhập công việc phát sinh..." component={RenderInputWithDiv}></Field>
                                    <Field name="incurredQuotation" label="Báo Giá Phát Sinh" placeholder="Nhập số tiền..." thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                    {disableDataManipulation ? null : <Field name="quotationUploadFile" label="File Báo Giá" component={ListFile} modalUrl="/uploadIncurredFile" ></Field>}
                                    <Field name="approvalValue" label="Giá Trị Được Duyệt Phát Sinh" placeholder="Nhập số tiền..." thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                    {/* security  */}
                                    <Field name="approvalStatus" label="Trạng Thái Duyệt Phát Sinh (*)" options={optionApprovalStatus} component={RenderSelect}></Field>
                                    {disableDataManipulation ? null : <Field name="approvalUploadFile" label="File Giá Trị Duyệt" component={ListFile} modalUrl="/uploadIncurredFile"></Field>}
                                    <Field name="appendixContractNumber" label="Phụ Lục Hợp Đồng Số" placeholder="Nhập phụ lục hợp đồng số..." component={RenderInputWithDiv}></Field>
                                    {disableDataManipulation ? null : <Field name="appendixUploadFile" label="File Phụ Lục HĐ" component={ListFile} modalUrl="/uploadIncurredFile"></Field>}
                                    <Field name="sendAppendixDate" dataFormat="DD/MM/YYYY" label="Ngày Gửi Phụ Lục" component={RenderDatePicker}></Field>
                                    <Field name="startProgressDate" dataFormat="DD/MM/YYYY" label="Bắt Đầu Tiến Độ Thực Hiện" component={RenderDatePicker}></Field>
                                    <Field name="endProgressDate" dataFormat="DD/MM/YYYY" label="Kết Thúc Tiến Độ Thực Hiện" component={RenderDatePicker}></Field>
                                    <Field name="workStatus" label="Trạng Thái Thực Hiện" placeholder="Chọn trạng thái thực hiện..." options={optionIncurredWorkStatus} component={RenderSelect}></Field>
                                    {disableDataManipulation ? null : <Field name="workUploadFile" label="File Trạng Thái Thực Hiện" component={ListFile} modalUrl="/uploadIncurredFile"></Field>}
                                    <Field name="defectStatus" label="Trạng Thái Sai Sót" placeholder="Chọn trạng thái sai sót..." options={optionDefectStatus} component={RenderSelect}></Field>
                                    {disableDataManipulation ? null : <Field name="defectUploadFile" label="File Trạng Thái Sai Sót" component={ListFile} modalUrl="/uploadIncurredFile"></Field>}
                                    <Field name="paymentStatus" label="Trạng Thái Thanh Toán" options={optionIncurredPaymentStatus} component={RenderSelect}></Field>
                                    <Field name="inputInvoice" label="Hoá Đơn Đầu Vào" placeholder="Nhập số tiền..." thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                    {disableDataManipulation ? null : <Field name="inputUploadFile" label="File Hoá Đơn Đầu Vào" component={ListFile} modalUrl="/uploadIncurredFile"></Field>}
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
            form: 'ModalIncurred',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalIncurred)));
