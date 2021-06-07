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
import { LOAD_UPDATING_APPROVAL } from './action-types';
import { FIRE_REDIRECT } from '../../constants/action-types';
import ListFile from '../../components/ListFile';
import { isNull } from 'util';
import moment from 'moment';
import SecuredComponent from '../../components/SecuredComponent';
import { LOAD_PROJECT_DETAIL_DTO } from '../projectDetail/action-types';
const validate = values => {
    // const {projectDetailDto} = props;
    const errors = {};
    if (!values.createdUserId) {
        errors.createdUserId = "";

    }
    if (!values.approvalDate) {
        errors.approvalDate = 'Vui lòng nhập Ngày Duyệt';
    }
    if(moment(values.quotationSendDate) > moment(values.approvalDate)){
        errors.approvalDate="Ngày được duyệt không được nhỏ hơn ngày báo giá " + moment(values.quotationSendDate).format("DD/MM/YYYY");
    }
    if (!values.approvalValue) {
        errors.approvalValue = 'Vui lòng nhập Số Tiền Duyệt!';
    }
    if (!values.approvalStatus) {
        errors.approvalStatus = 'Vui lòng nhập Trạng Thái Duyệt';
    }
    return errors;
}
var today = moment(new Date,"DD/MM/YYYY");
const selector = formValueSelector('ModalApproval');
const mapStateToProps = state => {
    
    var projectDetailDto = state.projectDetailReducer.projectDetailDto;
    var updateValue = {
        ...state.approvalReducer.updatingApproval,

        projectLink: projectDetailDto && projectDetailDto.project ? projectDetailDto.project.name : "N/A ",
        projectDetailId: projectDetailDto ? projectDetailDto.id : null,
        quotationSendDate :projectDetailDto && projectDetailDto.quotation ? moment(projectDetailDto.quotation.sendDate):null,
        quotationNumberLink :projectDetailDto && projectDetailDto.quotation ? projectDetailDto.quotation.quotationNumber:"N/A",
        quotationValueLink :projectDetailDto && projectDetailDto.quotation ? projectDetailDto.quotation.total:0,
        workContentLink :projectDetailDto && projectDetailDto.quotation ? projectDetailDto.quotation.workContent:"N/A",
        
        approvalDate: state.approvalReducer.updatingApproval && state.approvalReducer.updatingApproval.approvalDate ? moment(state.approvalReducer.updatingApproval.approvalDate) : null,
        createdDate:state.approvalReducer.updatingApproval && state.approvalReducer.updatingApproval.createdDate ? moment(state.approvalReducer.updatingApproval.createdDate) : (today),
        lastedUpdateDate:state.approvalReducer.updatingApproval && state.approvalReducer.updatingApproval.lastedUpdateDate ? moment(state.approvalReducer.updatingApproval.lastedUpdateDate) : null,
        createdUserId:state.approvalReducer.updatingApproval && state.approvalReducer.updatingApproval.createdUserId ?  state.approvalReducer.updatingApproval.createdUserId: state.common.currentUser.id
        

    };
    return {
        initialValues: updateValue,
        currentUser: state.common.currentUser,
        lastedUpdateUserId: selector(state,"lastedUpdateUserId"),
        createdUserId: selector(state, "createdUserId"),
    };
};


const mapDispatchToProps = dispatch => ({
    loadApproval: (payload) =>
        dispatch({ type: LOAD_UPDATING_APPROVAL, payload: payload }),
    loadProjectDetailDto: (projectDetailDto) =>
        dispatch({ type: LOAD_PROJECT_DETAIL_DTO, projectDetailDto: projectDetailDto }),
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalApproval", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});

class ModalApproval extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // listAllYears: [],
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
        const { loadApproval,projectDetailDto,currentUser, loadProjectDetailDto } = this.props;
        var id = this.props.idApproval;
        const dataPromise = agent.ApprovalApi.getApproval(id);
        loadApproval(Promise.resolve(dataPromise));
        if(projectDetailDto){
            loadProjectDetailDto(projectDetailDto);
        } 
        return(this.getListUser());
    }

    handleAdd(values) {
        const {currentUser,onAfterSave} = this.props;
        var onHide = this.props.onHide;
        var id = this.props.idApproval;
        var url = '/approval/add';
        var today = new Date();
        var bodyObject = {
            projectDetailId: values.projectDetailId,
            approvalValue: values.approvalValue ?values.approvalValue:0,
            approvalUpload: values.approvalUpload,
            approvalDate: values.approvalDate,
            approvalStatus: values.approvalStatus,
            note: values.note,
            approvalUploadFile: values.approvalUploadFile,
            createdUserId:values.createdUserId,
            lastedUpdateUserId: id ?  currentUser.id : null,
            createdDate:id? values.createdDate: today,
            lastedUpdateDate: id ? moment(today) : null
            

        };
        if (id) {
            url = '/approval/update';
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
        const { destroy, onHide  } = this.props;
        // event.preventDefault();
        onHide();
        destroy();
    }
    render() {
        // const { objectApproval, listfile, title, onHide } = this.props;

        const { handleSubmit, submitting, title, invalid,projectDetailDto,currentUser,initialValues,createdUserId,lastedUpdateUserId } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"sm", onHide: this.props.onHide, submitting: this.props.submitting };
        var optionProjectDetail = [];
        var id = this.props.idApproval;

        var disableDataManipulation = this.state.disableDataManipulation;
        if(SecurityUtils.hasPermission(currentUser, "admin.projectProgress.approvalC&U")){
            disableDataManipulation  = false
        }
        if(projectDetailDto){
            optionProjectDetail.push({label:projectDetailDto.name,value:projectDetailDto.id })
        }
        var optionApprovalStatus= [
        {label:"Đã Duyệt",value:"DA_DUYET"},
        {label:"Chưa Duyệt",value:"CHUA_DUYET"}]; 
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
                                {/* <Field name="QuotationSendDate" style={{display:"none"}} dateFormat="DD/MM/YYYY" label="Ngày Duyệt (*)"  component={RenderDatePicker}></Field> */}
                                <Field disabled={true} name="projectLink" label="Tên Dự Án" placeholder="" component={RenderInputWithDiv}></Field>
                                <Field disabled={true} name="projectDetailId" label="Công Việc Dự Án" placeholder="" options={optionProjectDetail} component={RenderSelect}></Field>
                                <Field disabled={true} name="quotationNumberLink" label="Báo Giá Số"  component={RenderInputWithDiv}></Field>
                                <Field disabled={true} name="quotationValueLink" label="Giá Trị Báo Giá"  thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                <Field disabled={true} name="workContentLink" label="Nội Dung Công Việc"  rows={2} component={RenderTextArea}></Field>
                                <Field name="approvalValue" label="Giá Trị Được Duyệt(*)" placeholder="Nhập giá trị được duyệt" thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                {disableDataManipulation ? null : <Field name="approvalUploadFile" label="File Duyệt" component={ListFile} modalUrl="/uploadApprovalFile"></Field>}
                                <Field name="approvalDate"  dateFormat="DD/MM/YYYY" label="Ngày Duyệt (*)"  component={RenderDatePicker}></Field>
                                
                                    <Field name="approvalStatus" label="Trạng Thái Duyệt (*)" options={optionApprovalStatus} component={RenderSelect}></Field>

                                <Field name="note" label="Ghi Chú" placeholder="Nhập ghi chú..." rows={3} component={RenderTextArea}></Field>
                                <Field disabled={true} name="createdUserId" label="Người Tạo Bảng"  options={showCreatedUser} component={RenderSelect}></Field>
                                <Field disabled={true} name="createdDate" label="Ngày Tạo Bảng"  dateFormat="DD/MM/YYYY" component={RenderDatePicker}></Field>
                                <div style={initialValues.lastedUpdateUserId?{display:'block'}:{display:'none'}}>
                                <Field disabled={true} name="lastedUpdateUserId" label="Người Chỉnh Sửa Gần Nhất" options={showLastedUpdateUser} component={RenderSelect}></Field>
                                <Field disabled={true} name="lastedUpdateDate"  label="Ngày Chỉnh Sửa Gần Nhất " dateFormat="DD/MM/YYYY" component={RenderDatePicker}></Field> </div>
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
            form: 'ModalApproval',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalApproval)));
