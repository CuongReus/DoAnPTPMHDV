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
import { LOAD_UPDATING_QUOTATION } from './action-types';
import { FIRE_REDIRECT } from '../../constants/action-types';
import ListFile from '../../components/ListFile';
import { isNull } from 'util';
import moment from 'moment';
import { LOAD_PROJECT_DETAIL_DTO } from '../projectDetail/action-types';
import SecuredComponent from '../../components/SecuredComponent';

const validate = values => {
    const errors = {};
    if (!values.createdUserId) {
        errors.createdUserId = "";

    }
    if (!values.quotationNumber) {
        errors.quotationNumber = 'Vui lòng nhập báo giá số!';
    } 
    if (!values.total) {
        errors.total = 'Vui lòng nhập tổng tiền!';
    } 
    if (!values.sendDate) {
        errors.sendDate = 'Vui lòng chọn ngày gửi!';
    } 
    if(values.approvalDateLink){
    if(moment(values.sendDate) > (values.approvalDateLink) ){
        errors.sendDate= "Không được chỉnh sửa ngày báo giá lớn hơn ngày duyệt!"
        }
    }
    return errors;
}
var today = moment(new Date,"DD/MM/YYYY");

const selector = formValueSelector('ModalQuotation');
const mapStateToProps = state => {
    var projectDetailDto = state.projectDetailReducer.projectDetailDto;

    var updateValue = {
        ...state.quotationReducer.updatingQuotation,
        
        projectLink: projectDetailDto && projectDetailDto.project ? projectDetailDto.project.name: "N/A ", 
        projectDetailId:projectDetailDto ? projectDetailDto.id:null,
        approvalDateLink :projectDetailDto && projectDetailDto.approval ? moment(projectDetailDto.approval.approvalDate):null,

        sendDate: state.quotationReducer.updatingQuotation && state.quotationReducer.updatingQuotation.sendDate ? moment(state.quotationReducer.updatingQuotation.sendDate) : null,
        createdDate:state.quotationReducer.updatingQuotation && state.quotationReducer.updatingQuotation.createdDate ? moment(state.quotationReducer.updatingQuotation.createdDate) : today,
        lastedUpdateDate:state.quotationReducer.updatingQuotation && state.quotationReducer.updatingQuotation.lastedUpdateDate ? moment(state.quotationReducer.updatingQuotation.lastedUpdateDate) : null,
        createdUserId:state.quotationReducer.updatingQuotation && state.quotationReducer.updatingQuotation.createdUserId ?  state.quotationReducer.updatingQuotation.createdUserId: state.common.currentUser.id 
        
    };

    return {
        initialValues: updateValue,
        currentUser: state.common.currentUser,
        lastedUpdateUserId: selector(state,"lastedUpdateUserId"),
        createdUserId: selector(state, "createdUserId"),
    };
};

const mapDispatchToProps = dispatch => ({
    loadQuotation: (payload) =>
        dispatch({ type: LOAD_UPDATING_QUOTATION, payload: payload }),
    loadProjectDetailDto: (projectDetailDto) =>
        dispatch({ type: LOAD_PROJECT_DETAIL_DTO, projectDetailDto: projectDetailDto }),
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalQuotation", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
        
});

class ModalQuotation extends React.Component {
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
        const { loadQuotation,loadProjectDetailDto,projectDetailDto } = this.props;
        var id = this.props.idQuotation;
        const dataPromise = agent.QuotationApi.getQuotation(id);
        loadQuotation(Promise.resolve(dataPromise));
        if(projectDetailDto){
            loadProjectDetailDto(projectDetailDto)
        }
        return(this.getListUser());
    }


    handleAdd(values) {
        const {currentUser,onAfterSave} = this.props;
        var onHide = this.props.onHide;
        var id = this.props.idQuotation;
        var today = new Date();
        var url = '/quotation/add';
        var bodyObject = {
            projectDetailId : values.projectDetailId,
            quotationNumber: values.quotationNumber,
            quotationUpload: values.quotationUpload,
            total: values.total ?  values.total: 0,
            sendDate: values.sendDate,
            workContent: values.workContent,
            note: values.note,
            quotationUploadFile: values.quotationUploadFile,
            createdUserId:values.createdUserId,
            lastedUpdateUserId: id ?  currentUser.id : null,
            createdDate:id? values.createdDate: today,
            lastedUpdateDate: id ? moment(today) : null
        };
        if (id) {
            url = '/quotation/update';
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
        destroy();
        onHide();
    }
    render() {
        // const { objectQuotation, listfile, title, onHide } = this.props;

        const { handleSubmit, submitting, title, invalid,projectDetailDto,currentUser,initialValues,createdUserId,lastedUpdateUserId } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"sm", onHide: this.props.onHide, submitting: this.props.submitting };
        var id = this.props.idQuotation;
        var optionProjectDetail = [];
        var disableDataManipulation = this.state.disableDataManipulation;
        if(SecurityUtils.hasPermission(currentUser, "admin.projectProgress.quotationC&U")){
            disableDataManipulation  = false
        }
        if(projectDetailDto){
            optionProjectDetail.push({label:projectDetailDto.name,value:projectDetailDto.id })
        }
        var dataUser =this.state.listAllUsers;
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
                                {/* Check Authorize */}
                                <Field name="quotationNumber" label="Báo Giá Số(*)"  placeholder="Nhập báo giá số..." component={RenderInputWithDiv}></Field>
                                {disableDataManipulation ? null :<Field name="quotationUploadFile" label="Báo Giá File"  component={ListFile} modalUrl="/uploadQuotationFile" ></Field>}
                                <Field name="total" label="Tổng Tiền (*)" placeholder="Nhập tổng tiền" thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                <Field name="sendDate" dateFormat="DD/MM/YYYY" label="Ngày Gửi(*)" component={RenderDatePicker}></Field>
                                <Field name="workContent" label="Nội Dung Công Việc"  placeholder="Nhập nội dung công việc" rows={2} component={RenderTextArea}></Field>
                                <Field name="note" label="Ghi Chú" placeholder="Nhập ghi chú..." rows={3} component={RenderTextArea}></Field>
                                <Field disabled={true} name="createdUserId" label="Người Tạo Bảng"  options={showCreatedUser} component={RenderSelect}></Field>
                                {id ?<Field disabled={true} name="createdDate" label="Ngày Tạo Bảng"  dateFormat="DD/MM/YYYY" component={RenderDatePicker}></Field> : null }
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
            form: 'ModalQuotation',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalQuotation)));
