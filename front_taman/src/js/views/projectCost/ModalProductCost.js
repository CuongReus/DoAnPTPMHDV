import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker, RenderCheckbox, RenderSelect, RenderNumberInput, RenderMoneyFormat, RenderMultiSelect } from '../../components/formInputs';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import isEmail from 'sane-email-validation';
import { StringUtils, SecurityUtils } from '../../utils/javascriptUtils';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_PROJECT_COST } from './action-types';
import { FIRE_REDIRECT } from '../../constants/action-types';
import ListFile from '../../components/ListFile';
import { LOAD_PROJECT_DETAIL_DTO } from '../projectDetail/action-types';
import { isNull } from 'util';
import moment from 'moment';

const validate = values => {
    const errors = {};
    if (!values.createdUserId) {
        errors.createdUserId = "";

    }
    if (!values.lotNumber) {
        errors.lotNumber = '';
    }
    if (!values.approvalById) {
        errors.approvalById =  'Vui lòng chọn người duyệt' ;
    }
    if (values.status == "DA_THANH_TOAN_DU" && !values.closeDate) {
        errors.closeDate = 'Vui lòng chọn ngày đóng thanh toán';
    }
    return errors;
}

const selector = formValueSelector('ModalProductCost');

var today = moment(new Date, "DD/MM/YYYY");

const mapStateToProps = state => {
    var projectDetailDto = state.projectDetailReducer.projectDetailDto;
    var updateValue = {
        ...state.projectCostReducer.updatingProjectCost,
        projectLink: projectDetailDto && projectDetailDto.project ? projectDetailDto.project.name: "N/A ", 
        projectDetailId:projectDetailDto ? projectDetailDto.id:null,
        notifyTo: null,
        notifyMessage: null,
        createdDate: state.projectCostReducer.updatingProjectCost && state.projectCostReducer.updatingProjectCost.createdDate ? moment(state.projectCostReducer.updatingProjectCost.createdDate) : today,
        status: state.projectCostReducer.updatingProjectCost && state.projectCostReducer.updatingProjectCost.status ? state.projectCostReducer.updatingProjectCost.status : "CHUA_THANH_TOAN_DU",
        lastedUpdateDate: state.projectCostReducer.updatingProjectCost && state.projectCostReducer.updatingProjectCost.lastedUpdateDate ? moment(state.projectCostReducer.updatingProjectCost.lastedUpdateDate) : null,
        createdUserId: state.projectCostReducer.updatingProjectCost && state.projectCostReducer.updatingProjectCost.createdUserId ? state.projectCostReducer.updatingProjectCost.createdUserId : state.common.currentUser.id,
        closeDate: state.projectCostReducer.updatingProjectCost && state.projectCostReducer.updatingProjectCost.closeDate ? moment(state.projectCostReducer.updatingProjectCost.closeDate) : null,

    };
    return {
        initialValues: updateValue,
        lastedUpdateUserId: selector(state, "lastedUpdateUserId"),
        createdUserId: selector(state, "createdUserId"),
        status: selector(state, "status"),
        currentUser: state.common.currentUser,
    };
};

const mapDispatchToProps = dispatch => ({
    loadProjectCost: (payload) =>
        dispatch({ type: LOAD_UPDATING_PROJECT_COST, payload: payload }),
    loadProjectDetailDto: (projectDetailDto) =>
        dispatch({ type: LOAD_PROJECT_DETAIL_DTO, projectDetailDto: projectDetailDto }),
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalProductCost", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});



class ModalProductCost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllUsers: [],
            listInvoiceRelationByProjectDetail : null
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

    getListInvoiceRelationByProjectDetail() {
        const {projectDetailDto} = this.props;
        let setStateInRequest = (list) => { this.setState({ listInvoiceRelationByProjectDetail: list }) }
        return agent.asyncRequests.get("/invoiceRelation/listByprojectDetail?projectDetailId=" +projectDetailDto.id).then(function (res) {
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
        const { loadProjectCost, loadProjectDetailDto, projectDetailDto, updateField, lotNumber ,currentUser} = this.props;
        var id = this.props.idProjectCost;
        if (projectDetailDto) {
            loadProjectDetailDto(projectDetailDto);
        }
        if (!id) {
            setTimeout(() => {
                updateField("lotNumber", lotNumber);
                updateField("approvalById", currentUser.id);
            }, 50);
        }

            const dataPromise = agent.ProjectCostApi.getProjectCost(id);
            loadProjectCost(Promise.resolve(dataPromise));
        
        return (
            this.getListUser(),
            this.getListInvoiceRelationByProjectDetail()
        )
    }

    handleAdd(values) {
        var onHide = this.props.onHide;
        const { currentUser } = this.props;
        var today = moment(new Date, "DD/MM/YYYY");
        var id = this.props.idProjectCost;
        var url = '/projectCost/add';
        var bodyObject = {
            projectDetailId: values.projectDetailId,
            lotNumber: values.lotNumber,
            projectCostFile: values.projectCostFile,
            title: values.title,
            unitPrice: values.unitPrice ? values.unitPrice : 0,
            totalMoney: values.totalMoney ? values.totalMoney : 0,
            totalPaid: values.totalPaid ? values.totalPaid : 0,
            status: values.status,
            notifyTo:values.notifyTo ? values.notifyTo.map(item =>{
                return item.value
            }).join(','): null,
            notifyMessage:values.notifyMessage,
            paymentType: "VAT_TU",
            approvalById: values.approvalById,
            closeDate: values.closeDate,
            note: values.note,
            createdUserId:values.createdUserId,
            lastedUpdateUserId: id ?  currentUser.id : null,
            createdDate:id? values.createdDate: today,
            lastedUpdateDate: id ? moment(today) : null,
            invoiceRelationId : values.invoiceRelationId

        };
        if (id) {
            url = '/projectCost/update';
            bodyObject.id = id;
        }

        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                toast.info("Lưu Thành Công.", { autoClose: 8000 });
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
        // const { objectProject, listfile, title, onHide } = this.props;

        const { handleSubmit, status, submitting, title, invalid, createdUserId, lastedUpdateUserId, currentUser, initialValues, projectDetailDto } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show, bsSize: "sm", onHide: this.props.onHide, submitting: this.props.submitting };
        // const dataProjectYear= this.state.listAllYears;
        const dataPersonels = this.state.listAllUsers;
        const dataInvoice = this.state.listInvoiceRelationByProjectDetail;
        let optionInvoice = []
        if(dataInvoice){
            dataInvoice.map(item =>{
                if(item.invoiceVer1 != null){
                    optionInvoice.push({ label: item.invoiceVer1.invoiceName ? item.invoiceVer1.invoiceName : "", value: item.id })
                }else if(item.invoiceVer2 != null){
                    optionInvoice.push({ label: item.invoiceVer2.invoiceName ? item.invoiceVer2.invoiceName : "", value: item.id })
                }else if(item.invoiceVer3 != null){
                    optionInvoice.push({ label: item.invoiceVer3.invoiceName ? item.invoiceVer3.invoiceName : "", value: item.id })
                }
            })
        }
        var id = this.props.idProjectCost;
        if (!dataPersonels) {
            return null;
        }
        
        var optionsApprovalBy = [];
        var optionsNotifyTo = [];
        dataPersonels.map(item => {
            if(SecurityUtils.hasPermission(item, "admin.projectCostApproval.productAllowApproval")){
            optionsApprovalBy.push({ label: "Tên: " + item.fullName + " || " + item.email, value: item.id })
            }
            optionsNotifyTo.push({ label: "Tên: " + item.email, value: item.email })
            // }
        })
        if (projectDetailDto) {
            var optionProjectDetail = [{ label: projectDetailDto.name, value: projectDetailDto.id }];
        }
        var optionsStatus = [{label:"Chưa Thanh Toán Đủ", value:"CHUA_THANH_TOAN_DU"},
        {label:"Đã Thanh Toán Đủ" ,value: "DA_THANH_TOAN_DU"}
    ];


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
                                <Field disabled={true} name="projectDetailId" label="Tên Công Việc" placeholder="" options={optionProjectDetail} component={RenderSelect}></Field>
                                <Field name="invoiceRelationId" label="Chọn Hóa Đơn Đầu Vào" options={optionInvoice} component={RenderSelect}></Field>
                                <Field disabled={true} name="lotNumber" label="Đợt" placeholder="" component={RenderNumberInput}></Field>
                                <Field name="title" label="Chủng loại Sản Phẩm" placeholder="Nhập nội dung hoặc chủng loại sản phẩm.." component={RenderInputWithDiv}></Field>
                                <Field name="unitPrice" label="Đơn Giá(Đã Gồm VAT)" placeholder="Nhập đơn giá..." thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                <Field name="totalMoney" label="Tổng Tiền" placeholder="Nhập nhập tổng tiền..." thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                <Field name="totalPaid" label="Tổng Tiền Đã Trả" placeholder="" thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                <Field name="projectCostFile" label="File Thanh Toán Vật Tư" component={ListFile} modalUrl="/uploadProjectCostFile" ></Field>
                                <Field name="approvalById" label="Duyệt Bởi" placeholder="Chọn người duyệt..." options={optionsApprovalBy} component={RenderSelect}></Field>
                                <Field disabled={SecurityUtils.hasPermission(currentUser, "admin.projectCostApproval.productAllowApproval")? false:true} name="status" label="Trạng Thái" placeholder="Chọn trạng thái..." options={optionsStatus} component={RenderSelect}></Field>
                                
                                {status == "DA_THANH_TOAN_DU" ? [
                              <Field name="closeDate" label="Ngày Đóng Thanh Toán"  dateFormat="DD/MM/YYYY" component={RenderDatePicker}></Field>]: null}
                                <Field name="note" label="Ghi Chú" placeholder="Nhập ghi chú..." rows={3} component={RenderTextArea}></Field>
                                {/* <Field disabled={true} name="totalRevenue"  label="Tổng Doanh Thu" placeholder="Nhập tổng doanh thu..." thousandSeparator={true} component={RenderMoneyFormat}></Field> */}
                                
                                <Field name="notifyTo" label="Thông Báo Đến" placeholder="Chọn người bạn muốn thông báo đến..."options={optionsNotifyTo} component={RenderMultiSelect}></Field>
                                <Field name="notifyMessage" label="Nội Dung Thông Báo" placeholder="Nhập nội dung thông báo..." rows={3} component={RenderTextArea}></Field>
                                
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
            form: 'ModalProductCost',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalProductCost)));
