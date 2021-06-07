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
import { LOAD_UPDATING_COMPLETE } from './action-types';
import { FIRE_REDIRECT } from '../../constants/action-types';
import ListFile from '../../components/ListFile';
import { isNull } from 'util';
import moment from 'moment';
import SecuredComponent from '../../components/SecuredComponent';
import { LOAD_PROJECT_DETAIL_DTO } from '../projectDetail/action-types';

const validate = values => {
    const errors = {};
    if(moment(values.startEfficientProgressDateLink) > moment(values.completedDate)){
        errors.completedDate = "Ngày hoàn thành không được nhỏ hơn ngày thực hiện!" + moment(values.startEfficientProgressDateLink).format("DD/MM/YYYY");
    }
    return errors;
}
const selector = formValueSelector('ModalComplete');

var today = moment(new Date,"DD/MM/YYYY");

const mapStateToProps = state => {
    
    var projectDetailDto = state.projectDetailReducer.projectDetailDto;
    var updateValue = {
        ...state.completeReducer.updatingComplete, 

        projectLink: projectDetailDto && projectDetailDto.project ? projectDetailDto.project.name : "N/A ",
        projectDetailId: projectDetailDto ? projectDetailDto.id : null,
        contractNumberLink : projectDetailDto && projectDetailDto.contract ? projectDetailDto.contract.contractNumber :"N/A",
        workContentLink : projectDetailDto && projectDetailDto.quotation ? projectDetailDto.quotation.workContent :"N/A",
        curatorLink : projectDetailDto && projectDetailDto.efficiency && projectDetailDto.efficiency.curator ? projectDetailDto.efficiency.curator.fullName: "N/A",
        startEfficientProgressDateLink : projectDetailDto && projectDetailDto.efficiency ? moment(projectDetailDto.efficiency.startActualProgressDate): null ,
        startContractProgressDate : projectDetailDto && projectDetailDto.contract ? moment(projectDetailDto.contract.startProgressDate) : null,
        endContractProgressDate : projectDetailDto && projectDetailDto.contract ? moment(projectDetailDto.contract.endProgressDate) :null,
        totalContractProgressDays : projectDetailDto && projectDetailDto.contract ? projectDetailDto.contract.progressDays :null,

        completedDate: state.completeReducer.updatingComplete && state.completeReducer.updatingComplete.completedDate ? moment(state.completeReducer.updatingComplete.completedDate) : null,
        startContractProgressDate: state.completeReducer.updatingComplete && state.completeReducer.updatingComplete.startContractProgressDate ? moment(state.completeReducer.updatingComplete.startContractProgressDate) : null,
        endContractProgressDate: state.completeReducer.updatingComplete && state.completeReducer.updatingComplete.endContractProgressDate ? moment(state.completeReducer.updatingComplete.endContractProgressDate) : null,
        lastedUpdateDate: state.completeReducer.updatingComplete && state.completeReducer.updatingComplete.lastedUpdateDate ? moment(state.completeReducer.updatingComplete.lastedUpdateDate) : null,
        startProgressDate: state.completeReducer.updatingComplete && state.completeReducer.updatingComplete.startProgressDate ? moment(state.completeReducer.updatingComplete.startProgressDate) : null,
        endProgressDate: state.completeReducer.updatingComplete && state.completeReducer.updatingComplete.endProgressDate ? moment(state.completeReducer.updatingComplete.endProgressDate) : null,  
        createdUserId:state.completeReducer.updatingComplete && state.completeReducer.updatingComplete.createdUserId ?  state.completeReducer.updatingComplete.createdUserId: state.common.currentUser.id,
        createdDate: state.completeReducer.updatingComplete && state.completeReducer.updatingComplete.createdDate ? moment(state.completeReducer.updatingComplete.createdDate) : today
        
    };
    return {
        initialValues: updateValue,
        currentUser: state.common.currentUser,
        completedDate:selector(state,"completedDate"),
        lastedUpdateUserId: selector(state,"lastedUpdateUserId"),
        createdUserId: selector(state, "createdUserId")
    };
};
const mapDispatchToProps = dispatch => ({
    loadComplete: (payload) =>
        dispatch({ type: LOAD_UPDATING_COMPLETE, payload: payload }),
    loadProjectDetailDto: (projectDetailDto) =>
        dispatch({ type: LOAD_PROJECT_DETAIL_DTO, projectDetailDto: projectDetailDto }),
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalComplete", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});

class ModalComplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // listAllYears: [],
            isLateProgress: false,
            disableDataManipulation:true,
            listAllUsers:[],
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.handleDiffCompletedDate = (completedDate) => {
            const { updateField,projectDetailDto } = this.props;
            if (completedDate && projectDetailDto.efficiency ? projectDetailDto.efficiency.startActualProgressDate : null ) {
                var diffBetweenTwoDate = moment(completedDate).diff(projectDetailDto.efficiency.startActualProgressDate, 'days');
                setTimeout(() => {
                    updateField("actualCompleteDay", diffBetweenTwoDate);
                 }, 200);
                 if(diffBetweenTwoDate && projectDetailDto.contract){
                    if(diffBetweenTwoDate > projectDetailDto.contract.progressDays ){
                        this.setState({isLateProgress:true});
                        setTimeout(() => {
                            updateField("evaluateProgress", "TRE_TIEN_DO");
                         }, 200);   
                    }
                    else{
                        this.setState({isLateProgress:false});
                        if(diffBetweenTwoDate === projectDetailDto.contract.progressDays ){
                            setTimeout(() => {
                                updateField("evaluateProgress", "DUNG_TIEN_DO");
                            }, 200);
                        }
                        else{
                            setTimeout(() => {
                                updateField("evaluateProgress", "SOM_TIEN_DO");
                             }, 200);
                        }
                        
                    }
                 }
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
        const { loadComplete,projectDetailDto, loadProjectDetailDto } = this.props;
        var id = this.props.idComplete;
        var today = new Date();
        const dataPromise = agent.CompleteApi.getComplete(id);
        loadComplete(Promise.resolve(dataPromise));
        if(projectDetailDto){
            loadProjectDetailDto(projectDetailDto);
        }
        return(this.getListUser());

    }


    handleAdd(values) {
        const {currentUser,onAfterSave} = this.props;
        var today = new Date();
        var onHide = this.props.onHide;
        var id = this.props.idComplete;
        var url = '/complete/add';
        var bodyObject = {
            projectDetailId: values.projectDetailId,
            evaluateProgress: values.evaluateProgress,
            actualCompleteDay:values.actualCompleteDay,
            teamEvaluate: values.teamEvaluate,
            completedDate: values.completedDate,
            startContractProgressDate: values.startContractProgressDate,
            endContractProgressDate: values.endContractProgressDate,
            note: values.note,
            createdUserId:values.createdUserId,
            lastedUpdateUserId: id ?  currentUser.id : null,
            createdDate:id? values.createdDate: today,
            lastedUpdateDate: id ? moment(today) : null
        };
        if (id) {
            url = '/complete/update';
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

        const { handleSubmit, submitting, title, invalid,projectDetailDto,currentUser, initialValues, createdUserId,lastedUpdateUserId } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"sm",  onHide: this.props.onHide, submitting: this.props.submitting };
        var isLateProgress = this.state.isLateProgress;
        var id = this.props.idComplete;
        var optionEvaluateProgress = [
            {label: "Trể Tiến Độ" , value:"TRE_TIEN_DO"},
            {label: "Sớm Tiến Độ" , value:"SOM_TIEN_DO"},
            {label: "Đúng Tiến Độ" , value:"DUNG_TIEN_DO"},
        
        
        ];
        var optionProjectDetail = [];
        if(projectDetailDto){
            optionProjectDetail.push({label:projectDetailDto.name,value:projectDetailDto.id })
        }
        var optionTeamProgress = [{
            label:"Đạt", value:"DAT"},
            {label:"Chưa Đạt", value:"CHUA_DAT"

        }];

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
        if(SecurityUtils.hasPermission(currentUser, "admin.projectProgress.completeC&U")){
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
                                <Field disabled={true} name="projectDetailId" label="Công Việc Dự Án" placeholder="" options={optionProjectDetail} component={RenderSelect}></Field>
                                <Field disabled={true} name="contractNumberLink" label="Hợp Đồng Số" component={RenderInputWithDiv}></Field>
                                <Field disabled={true} name="workContentLink" label="Nội Dung Công Việc"  rows={2} component={RenderTextArea}></Field>
                                <Field disabled={true} name="startEfficientProgressDateLink" dateFormat="DD/MM/YYYY" label="Ngày Bắt Đầu (Thực Hiện) " component={RenderDatePicker}></Field>
                                <Field disabled={true} name="curatorLink" label="Người Phụ Trách" component={RenderInputWithDiv}></Field>
                                {/* Link Date Form Contract And fill value for Complete */}
                                <Field disabled={true} name="startContractProgressDate" dateFormat="DD/MM/YYYY" label="Ngày Bắt Đầu Tiến Độ (HĐ *)" component={RenderDatePicker}></Field>
                                <Field disabled={true} name="endContractProgressDate" dateFormat="DD/MM/YYYY" label="Ngày Kết Thúc Tiến Độ (HĐ *)"  component={RenderDatePicker}></Field>
                                <Field disabled={true} name="totalContractProgressDays"  label="Tiến Độ Hợp Đồng" component={RenderInputWithDiv}></Field>
                                {/* Link Date */}
                                <Field name="completedDate" dateFormat="DD/MM/YYYY" label="Ngày Hoàn Thành" onChangeAction={(value) => this.handleDiffCompletedDate(value)}  component={RenderDatePicker}></Field>
                                <div style={ isLateProgress ? {display:'block',color:'red'} : {display:'none'} }>
                                    <label>Bạn Đã Trể Tiến Độ</label>
                                    </div> 
                                 {/* TODO Calculate actual day and put value into actualCompleteDay to show  */}
                               <Field name="actualCompleteDay" disabled={true}  label="Số Ngày Hoàn Thành" component={RenderInputWithDiv}></Field>
                                <Field disabled={true} name="evaluateProgress"  label="Đánh Giá Tiến Độ" options={optionEvaluateProgress} placeholder="Nhập đánh giá tiến độ..."  component={RenderSelect}></Field>
                                <Field name="teamEvaluate"  label="Đánh Giá Đội Thi Công" options={optionTeamProgress} placeholder="Nhập đánh giá tiến độ..."  component={RenderSelect}></Field>
                               <Field name="note" label="Ghi Chú" placeholder="Nhập ghi chú..." rows={3} component={RenderTextArea}></Field>
                               <Field disabled={true} name="createdUserId" label="Người Tạo Bảng" options={showCreatedUser} component={RenderSelect}></Field>
                                <Field disabled={true} name="createdDate" label="Ngày Tạo Bảng" dateFormat="DD/MM/YYYY" component={RenderDatePicker}></Field>
                                <div style={initialValues.lastedUpdateUserId ? { display: 'block' } : { display: 'none' }}>
                                    <Field disabled={true} name="lastedUpdateUserId" label="Người Chỉnh Sửa Gần Nhất" options={showLastedUpdateUser} component={RenderSelect}></Field>
                                    <Field disabled={true} name="lastedUpdateDate" label="Ngày Chỉnh Sửa Gần Nhất" dateFormat="DD/MM/YYYY" component={RenderDatePicker}></Field> </div>
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
            form: 'ModalComplete',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalComplete)));
