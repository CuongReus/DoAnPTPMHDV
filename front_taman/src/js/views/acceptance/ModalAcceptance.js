import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker,RenderCheckbox, RenderSelect, RenderNumberInput, RenderMoneyFormat } from '../../components/formInputs';
import { Field, reduxForm,formValueSelector } from 'redux-form';
import isEmail from 'sane-email-validation';
import { StringUtils, SecurityUtils } from '../../utils/javascriptUtils';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import {LOAD_UPDATING_ACCEPTANCE} from './action-types';
import {FIRE_REDIRECT } from '../../constants/action-types';
import ListFile from '../../components/ListFile';
import { isNull } from 'util';
import moment from 'moment';
import SecuredComponent from '../../components/SecuredComponent';
import { LOAD_PROJECT_DETAIL_DTO } from '../projectDetail/action-types';

const validate = values => {
    const errors = {};
    if (!values.teamLeaderName) {
        errors.teamLeaderName = 'Vui lòng nhập tên đội trưởng !.';
    }
    if(moment(values.completedDateLink) > moment(values.acceptanceDate)){
        errors.acceptanceDate = "Ngày nghiệm thu không được nhỏ hơn ngày hoàn thành! " + moment(values.completedDateLink).format("DD/MM/YYYY");
    }
    return errors;
}
const selector = formValueSelector('ModalAcceptance');
var today = moment(new Date,"DD/MM/YYYY");

const mapStateToProps = state => {

    var projectDetailDto = state.projectDetailReducer.projectDetailDto;
    var updateValue = {
        ...state.acceptanceReducer.updatingAcceptance, 

        projectLink: projectDetailDto && projectDetailDto.project ? projectDetailDto.project.name: "N/A ", 
        projectDetailId:projectDetailDto ? projectDetailDto.id:null,
        workContentLink : projectDetailDto && projectDetailDto.quotation ? projectDetailDto.quotation.workContent : "N/A",
        contractNumberLink : projectDetailDto && projectDetailDto.contract ? projectDetailDto.contract.contractNumber : "N/A",
        startWorkLink :projectDetailDto && projectDetailDto.efficiency ? moment(projectDetailDto.efficiency.startActualProgressDate) : null,
        curatorLink : projectDetailDto && projectDetailDto.efficiency && projectDetailDto.efficiency.curator ? projectDetailDto.efficiency.curator.fullName : "N/A",
        completedDateLink : projectDetailDto && projectDetailDto.complete ? moment(projectDetailDto.complete.completedDate) : null,

        acceptanceDate:state.acceptanceReducer.updatingAcceptance && state.acceptanceReducer.updatingAcceptance.acceptanceDate ? moment(state.acceptanceReducer.updatingAcceptance.acceptanceDate) : null,
        lastedUpdateDate: state.acceptanceReducer.updatingAcceptance && state.acceptanceReducer.updatingAcceptance.lastedUpdateDate ? moment(state.acceptanceReducer.updatingAcceptance.lastedUpdateDate) : null,
        startProgressDate: state.acceptanceReducer.updatingAcceptance && state.acceptanceReducer.updatingAcceptance.startProgressDate ? moment(state.acceptanceReducer.updatingAcceptance.startProgressDate) : null,
        endProgressDate: state.acceptanceReducer.updatingAcceptance && state.acceptanceReducer.updatingAcceptance.endProgressDate ? moment(state.acceptanceReducer.updatingAcceptance.endProgressDate) : null,
        createdUserId:state.acceptanceReducer.updatingAcceptance && state.acceptanceReducer.updatingAcceptance.createdUserId ?  state.acceptanceReducer.updatingAcceptance.createdUserId: state.common.currentUser.id,
        createdDate: state.acceptanceReducer.updatingAcceptance && state.acceptanceReducer.updatingAcceptance.createdDate ? moment(state.acceptanceReducer.updatingAcceptance.createdDate) : today
        
    };
    return {
        initialValues: updateValue,
        currentUser: state.common.currentUser,
        createdUserId: selector(state,"createdUserId"),
        lastedUpdateUserId: selector(state,"lastedUpdateUserId"),
    };
};

const mapDispatchToProps = dispatch => ({
        loadAcceptance: (payload) => 
            dispatch({ type: LOAD_UPDATING_ACCEPTANCE, payload: payload }),
        loadProjectDetailDto: (projectDetailDto) =>
            dispatch({ type: LOAD_PROJECT_DETAIL_DTO, projectDetailDto: projectDetailDto }),
        updateField: (fieldName, value) =>
            dispatch({
                meta: { form: "ModalAcceptance", field: fieldName },
                payload: value,
                type: "@@redux-form/CHANGE"
        })
});


class ModalAcceptance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectDetailDto: null,
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
        const { loadAcceptance,projectDetailDto,loadProjectDetailDto } = this.props;
        var id = this.props.idAcceptance;
        var today = new Date();
            const dataPromise = agent.AcceptanceApi.getAcceptance(id);
            loadAcceptance(Promise.resolve(dataPromise));
            if(projectDetailDto){
                loadProjectDetailDto(projectDetailDto);
            }
             return(this.getListUser());
    }

    handleAdd(values) {
        const {currentUser,onAfterSave} = this.props;
        var today = new Date();
        var onHide = this.props.onHide;
        var id = this.props.idAcceptance;
        var url = '/acceptance/add';
        var bodyObject = {
            projectDetailId : values.projectDetailId,
            acceptanceStatus : values.acceptanceStatus,
            acceptanceUpload: values.acceptanceUpload,
            defectUpload: values.defectUpload,
            overcomeUploadFile: values.overcomeUploadFile,
            acceptanceDate: values.acceptanceDate,
            defectRemainingWorkStatus: values.defectRemainingWorkStatus,
            overcomeStatus: values.overcomeStatus,
            overcomeDate: values.overcomeDate,
            note:values.note,
            acceptanceUploadFile: values.acceptanceUploadFile,
            defectUploadFile: values.defectUploadFile,
            createdUserId:values.createdUserId,
            lastedUpdateUserId: id ?  currentUser.id : null,
            createdDate:id? values.createdDate: today,
            lastedUpdateDate: id ? moment(today) : null

         
        };
        if (id) {
            url = '/acceptance/update';
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
    handleHideAndClear(){
       const{destroy,onHide} = this.props;
        // event.preventDefault();
        onHide();
        destroy();
    }
    render() {
       // const { objectAcceptance, listfile, title, onHide } = this.props;
        
       const {handleSubmit,submitting, title,invalid,projectDetailDto,currentUser, initialValues, createdUserId,lastedUpdateUserId } = this.props;
        const modalConfig = { backdrop: 'static',show: this.props.show,bsSize:"sm",  onHide:this.props.onHide,submitting: this.props.submitting};
        var id = this.props.idAcceptance;
        var acceptanceStatus = [
           {label:"Đạt", value: "DAT"},
           {label:"Chưa Đạt", value: "CHUA_DAT"},
           {label:"Đạt Có Điều Kiện", value: "DAT_CO_DIEU_KIEN"}];

        var optionProjectDetail = [];
           if(projectDetailDto){
            optionProjectDetail.push({label:projectDetailDto.name,value:projectDetailDto.id })
           }
        var optionDefectRemainStatus=[{label:"Có", value: "CO"},
           {label:"Không", value: "KHONG"}];
        var overcomeStatus=[{label:"Có", value: "CO"},
           {label:"Không", value: "KHONG"}];
           
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

           var optionApprovalStatus= [
            {label:"Đã Duyệt",value:"DA_DUYET"},
            {label:"Chưa Duyệt",value:"CHUA_DUYET"}]; 

        var newModal = null;
        var disableDataManipulation = this.state.disableDataManipulation;
        if(SecurityUtils.hasPermission(currentUser, "admin.projectProgress.acceptanceC&U")){
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
                                {/* Just Load Id To save DATABASE */}
                                    <Field disabled={true} name="projectLink" label="Tên Dự Án" placeholder="" component={RenderInputWithDiv}></Field>
                                    <Field disabled={true} name="projectDetailId" label="Công Việc Dự Án" placeholder="" options={optionProjectDetail} component={RenderSelect}></Field>
                                {  /* Just Show Infomation */}
                                    <Field disabled={true} name="contractNumberLink" label="Hợp Đồng Số" placeholder="" component={RenderInputWithDiv}></Field>
                                    <Field disabled={true} name="workContentLink" label="Nội Dung Công Việc" placeholder="" rows={2}  component={RenderTextArea}></Field>
                                    <Field disabled={true} name="startWorkLink" dateFormat="DD/MM/YYYY" label="Ngày Bắt Đầu" placeholder="" component={RenderDatePicker}></Field>
                                    <Field disabled={true} name="curatorLink"  label="Người Phụ Trách" placeholder="" component={RenderInputWithDiv}></Field>
                                    <Field disabled={true} name="completedDateLink" dateFormat="DD/MM/YYYY" label="Ngày Hoàn Thành" placeholder="" component={RenderDatePicker}></Field>
                                    <Field  name="acceptanceStatus" label="Trạng Thái Nghiệm Thu" placeholder="Chọn trạng thái nghiệm thu..." options={acceptanceStatus}  component={RenderSelect}></Field>
                                    {disableDataManipulation ? null : <Field name="acceptanceUploadFile"  label="File Nghiệm Thu"  component={ListFile} modalUrl="/uploadAcceptanceFile" ></Field>}
                                    <Field name="acceptanceDate" dateFormat="DD/MM/YYYY" label="Ngày Nghiệm Thu" placeholder="Chọn Ngày Nghiệm Thu" component={RenderDatePicker}></Field>
                                    <Field name="defectRemainingWorkStatus" label="Sai Sót/Tồn Động"  options={optionDefectRemainStatus} component={RenderSelect}></Field>
                                    <Field name="overcomeStatus" label="Khắc Phục" checkLabel="Đã Khác Phục" options={overcomeStatus} component={RenderSelect}></Field>
                                    {disableDataManipulation ? null :  <Field name="overcomeUploadFile" label="Khắc Phục File Upload" component={ListFile} modalUrl="/uploadAcceptanceFile"></Field>}
                                    <Field name="note"  label="Ghi Chú" placeholder="Nhập Ghi Chú..." rows={3} component={RenderTextArea}></Field>
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
            form: 'ModalAcceptance',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalAcceptance)));
