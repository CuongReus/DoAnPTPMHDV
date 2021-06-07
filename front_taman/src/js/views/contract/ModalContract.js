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
import { LOAD_UPDATING_CONTRACT } from './action-types';
import { FIRE_REDIRECT } from '../../constants/action-types';
import ListFile from '../../components/ListFile';
import { isNull } from 'util';
import moment from 'moment';
import SecuredComponent from '../../components/SecuredComponent';
import { LOAD_PROJECT_DETAIL_DTO } from '../projectDetail/action-types';

const validate = values => {
    const errors = {};
    // if (!values.approvalValueLink) {
    //     errors.approvalValueLink = 'Vui lòng Số Tiền';
    // }
    if (!values.createdUserId) {
        errors.createdUserId = "";

    }
    if (moment(values.approvalDateLink) > moment(values.sendDate)) {
        errors.sendDate = "Ngày gửi hợp đồng không được nhỏ hơn ngày được duyệt " + moment(values.approvalDateLink).format("DD/MM/YYYY");

    }
    if (moment(values.approvalDateLink) > moment(values.startProgressDate)) {
        errors.startProgressDate = "Ngày bắt đầu công việc không được nhỏ hơn ngày được duyệt " + moment(values.approvalDateLink).format("DD/MM/YYYY");
    }
    if (moment(values.approvalDateLink) > moment(values.endProgressDate)) {
        errors.endProgressDate = "Ngày kết thúc công việc không được nhỏ hơn ngày được duyệt " + moment(values.approvalDateLink).format("DD/MM/YYYY");
    }
    return errors;
}
const selector = formValueSelector('ModalContract');

var today = moment(new Date, "DD/MM/YYYY");

const mapStateToProps = state => {

    var projectDetailDto = state.projectDetailReducer.projectDetailDto;
    var updateValue = {
        ...state.contractReducer.updatingContract,

        projectLink: projectDetailDto && projectDetailDto.project ? projectDetailDto.project.name : "N/A ",
        projectDetailId: projectDetailDto ? projectDetailDto.id : null,
        quotationNumberLink: projectDetailDto && projectDetailDto.quotation ? projectDetailDto.quotation.quotationNumber : "N/A",
        workContentLink: projectDetailDto && projectDetailDto.quotation ? projectDetailDto.quotation.workContent : "N/A",
        approvalValueLink: projectDetailDto && projectDetailDto.approval ? projectDetailDto.approval.approvalValue : "N/A",
        approvalDateLink: projectDetailDto && projectDetailDto.approval ? moment(projectDetailDto.approval.approvalDate) : null,

        sendDate: state.contractReducer.updatingContract && state.contractReducer.updatingContract.sendDate ? moment(state.contractReducer.updatingContract.sendDate) : null,
        lastedUpdateDate: state.contractReducer.updatingContract && state.contractReducer.updatingContract.lastedUpdateDate ? moment(state.contractReducer.updatingContract.lastedUpdateDate) : null,
        startProgressDate: state.contractReducer.updatingContract && state.contractReducer.updatingContract.startProgressDate ? moment(state.contractReducer.updatingContract.startProgressDate) : null,
        endProgressDate: state.contractReducer.updatingContract && state.contractReducer.updatingContract.endProgressDate ? moment(state.contractReducer.updatingContract.endProgressDate) : null,
        createdUserId: state.contractReducer.updatingContract && state.contractReducer.updatingContract.createdUserId ? state.contractReducer.updatingContract.createdUserId : state.common.currentUser.id,
        createdDate: state.contractReducer.updatingContract && state.contractReducer.updatingContract.createdDate ? moment(state.contractReducer.updatingContract.createdDate) : today

    };
    return {
        initialValues: updateValue,
        currentUser: state.common.currentUser,
        lastedUpdateUserId: selector(state, "lastedUpdateUserId"),
        createdUserId: selector(state, "createdUserId"),
        startProgressDate: selector(state, "startProgressDate"),
        endProgressDate: selector(state, "endProgressDate"),
    };
};

const mapDispatchToProps = dispatch => ({
    loadContract: (payload) =>
        dispatch({ type: LOAD_UPDATING_CONTRACT, payload: payload }),
    loadProjectDetailDto: (projectDetailDto) =>
        dispatch({ type: LOAD_PROJECT_DETAIL_DTO, projectDetailDto: projectDetailDto }),
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalContract", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});

class ModalContract extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // listAllYears: [],
            disableDataManipulation: true,
                listAllUsers:[],
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.handleDiffDate = (startProgressDate, endProgressDate) => {
            const { updateField } = this.props;
            if (startProgressDate && endProgressDate) {
                var diffBetweenTwoDate = moment(endProgressDate).diff(startProgressDate, 'days');
                updateField("progressDays", diffBetweenTwoDate)
            }
        }
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
        const { loadContract, projectDetailDto, updateField, currentUser, loadProjectDetailDto } = this.props;
        var id = this.props.idContract;
        var today = new Date();
        const dataPromise = agent.ContractApi.getContract(id);
        loadContract(Promise.resolve(dataPromise));
        if (projectDetailDto) {
            loadProjectDetailDto(projectDetailDto);
        }
        return(this.getListUser());
    }

    handleAdd(values) {
        const { currentUser, onAfterSave } = this.props;
        var onHide = this.props.onHide;
        var id = this.props.idContract;
        var url = '/contract/add';
        var today = new Date();
        var bodyObject = {
            projectDetailId: values.projectDetailId,
            draftContractStatus: values.draftContractStatus,
            draftUpload: values.draftUpload,
            officialContractStatus: values.officialContractStatus,
            officialUpload: values.officialUpload,
            sendDate: values.sendDate,
            contractNumber: values.contractNumber,
            startProgressDate: values.startProgressDate,
            endProgressDate: values.endProgressDate,
            progressDays: values.progressDays,
            note: values.note,
            draftUploadFile: values.draftUploadFile,
            officialUploadFile: values.officialUploadFile,
            createdUserId: values.createdUserId,
            lastedUpdateUserId: id ? currentUser.id : null,
            createdDate: values.createdDate,
            lastedUpdateDate: id ? moment(today) : null

        };
        if (id) {
            url = '/contract/update';
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
        // const { objectContract, listfile, title, onHide } = this.props;
        const { handleSubmit, submitting, title, invalid, projectDetailDto, startProgressDate, endProgressDate, currentUser, initialValues, createdUserId, lastedUpdateUserId } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show, bsSize: "sm", onHide: this.props.onHide, submitting: this.props.submitting };
        var optionProjectDetail = [];
        var id = this.props.idContract;
        if (projectDetailDto) {
            optionProjectDetail.push({ label: projectDetailDto.name, value: projectDetailDto.id })
        }
        var disableDataManipulation = this.state.disableDataManipulation;
        if (SecurityUtils.hasPermission(currentUser, "admin.projectProgress.contractC&U")) {
            disableDataManipulation = false
        }
        var optionsDraftContractStatus = [{ label: "Không Cần Gửi", value: "KHONG_CAN_GUI" }, { label: "Chưa Gửi", value: "CHUA_GUI" },
        { label: "Đang Chờ Duyệt", value: "DANG_CHO_DUYET" },
        { label: "Đã Duyệt", value: "DA_DUYET" }, { label: "Đã Gửi", value: "DA_GUI" }];
        var optionsOfficialContractStatus = [{ label: "Không Cần Gửi", value: "KHONG_CAN_GUI" }, { label: "Chưa Gửi", value: "CHUA_GUI" },
        { label: "Đã Gửi", value: "DA_GUI" }];
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
                                    <Field disabled={true} name="projectDetailId" label="Công Việc Dự Án" placeholder="" options={optionProjectDetail} component={RenderSelect}></Field>
                                    <Field disabled={true} name="quotationNumberLink" label="Báo Giá Số" component={RenderInputWithDiv}></Field>
                                    <Field disabled={true} name="workContentLink" label="Nội Dung Công Việc" rows={2} component={RenderTextArea}></Field>
                                    <Field disabled={true} name="approvalValueLink" label="Giá Trị Được Duyệt" thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                    <Field name="draftContractStatus" label="Hợp Đồng Nháp" options={optionsDraftContractStatus} component={RenderSelect}></Field>
                                    {disableDataManipulation ? null : <Field name="draftUploadFile" label="File Hợp Đồng Nháp" component={ListFile} modalUrl="/uploadContractFile"></Field>}
                                    <Field name="officialContractStatus" label="Hợp Đồng Chính Thức" options={optionsOfficialContractStatus} component={RenderSelect}></Field>
                                    {disableDataManipulation ? null : <Field name="officialUploadFile" label="File Hợp Đồng Chính Thức" component={ListFile} modalUrl="/uploadContractFile" ></Field>}
                                    <Field name="sendDate" dateFormat="DD/MM/YYYY" label="Ngày Gửi" component={RenderDatePicker}></Field>
                                    <Field name="contractNumber" label="Hợp Đồng Số" placeholder="Nhập số hợp đồng..." component={RenderInputWithDiv}></Field>
                                    <Field name="startProgressDate" dateFormat="DD/MM/YYYY" label="Ngày Bắt Đầu Tiến Độ" onChangeAction={(value) => this.handleDiffDate(value, endProgressDate)} component={RenderDatePicker}></Field>
                                    <Field name="endProgressDate" dateFormat="DD/MM/YYYY" label="Ngày Kết Thúc Tiến Độ" onChangeAction={(value) => this.handleDiffDate(startProgressDate, value)} component={RenderDatePicker}></Field>
                                    <Field disabled={true} name="progressDays" label="Tổng Tiến Độ / Ngày" component={RenderInputWithDiv}></Field>
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
            form: 'ModalContract',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalContract)));
