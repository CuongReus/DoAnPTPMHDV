import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker, RenderCheckbox, RenderSelect, RenderNumberInput, RenderMoneyFormat, RenderSwitch } from '../../components/formInputs';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import isEmail from 'sane-email-validation';
import { StringUtils, FormatterUtils, SecurityUtils } from '../../utils/javascriptUtils';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_CLOSE_PROJECT } from './action-types';
import { FIRE_REDIRECT } from '../../constants/action-types';
import ListFile from '../../components/ListFile';
import { isNull } from 'util';
import moment from 'moment';
import SecuredComponent from '../../components/SecuredComponent';
import { LOAD_PROJECT_DETAIL_DTO } from '../projectDetail/action-types';

const validate = (values,props) => {
    const errors = {};
    if (!values.createdUserId) {
        errors.createdUserId = "";

    }
  
    
    if(values.closed){
        if(!values.closeProjectDate){
            errors.closeProjectDate = "Vui lòng chọn ngày đóng dự án!"
        }
        if(props.projectDetailDto && props.projectDetailDto.project && props.projectDetailDto.project.projectType == "CO_DOANH_THU" ){
              if(!values.completeDateLink){
            errors.closeProjectDate = "Chưa có ngày hoàn thành không thể đóng dự án!"
        }
    }
                   
    }
    if(props.projectDetailDto && props.projectDetailDto.project && props.projectDetailDto.project.projectType == "CO_DOANH_THU" ){
    if(values.closeProjectDate){
        if(!values.completeDateLink){
            errors.closeProjectDate = "Chưa có ngày hoàn thành không thể đóng dự án!"
        }
    }
    if(moment(values.incurredDateLink) > moment(values.closeProjectDate)){
        errors.closeProjectDate = "Ngày kết thúc dự án không được nhỏ hơn ngày kết thúc tiến độ thực hiện ( phát sinh)!" + moment(values.incurredDateLink).format("DD/MM/YYYY");
    }
    if(moment(values.completeDateLink) > moment(values.closeProjectDate)){
        errors.closeProjectDate = "Ngày kết thúc dự án không được nhỏ hơn ngày hoàn thành!"
    }
}
    return errors;
}
const selector = formValueSelector('ModalCloseProject');

var today = moment(new Date,"DD/MM/YYYY");

const mapStateToProps = state => {

    var projectDetailDto = state.projectDetailReducer.projectDetailDto;
    var updateValue = {
        ...state.closeProjectReducer.updatingCloseProject,

        projectLink: projectDetailDto && projectDetailDto.project ? projectDetailDto.project.name : "N/A ",
        projectDetailId: projectDetailDto ? projectDetailDto.id : null,
        contractNumberLink: projectDetailDto && projectDetailDto.contract ? projectDetailDto.contract.contractNumber : "N/A",
        workContentLink: projectDetailDto &&  projectDetailDto.quotation ? projectDetailDto.quotation.workContent : "N/A",
        closeApprovalValue: projectDetailDto && projectDetailDto.approval ? projectDetailDto.approval.approvalValue : 0,
        incurApprovalValue: projectDetailDto && projectDetailDto.incurred ? projectDetailDto.incurred.approvalValue : 0,
        constructionTeamId: projectDetailDto && projectDetailDto.efficiency ? projectDetailDto.efficiency.constructionTeamId : null,
        leaderName: projectDetailDto && projectDetailDto.efficiency && projectDetailDto.efficiency.constructionTeam ? projectDetailDto.efficiency.constructionTeam.teamLeaderName : "N/A",
        leaderPhone: projectDetailDto && projectDetailDto.efficiency && projectDetailDto.efficiency.constructionTeam ? projectDetailDto.efficiency.constructionTeam.leaderPhoneNumber : "N/A",
        incurredDateLink: projectDetailDto && projectDetailDto.incurred ? moment(projectDetailDto.incurred.endProgressDate) : null, 
        completeDateLink:projectDetailDto && projectDetailDto.complete ? moment(projectDetailDto.complete.completedDate) : null,

        guaranteeStartDate: state.closeProjectReducer.updatingCloseProject && state.closeProjectReducer.updatingCloseProject.guaranteeStartDate ? moment(state.closeProjectReducer.updatingCloseProject.guaranteeStartDate) : null,
        guaranteeEndDate: state.closeProjectReducer.updatingCloseProject && state.closeProjectReducer.updatingCloseProject.guaranteeEndDate ? moment(state.closeProjectReducer.updatingCloseProject.guaranteeEndDate) : null,
        closeProjectDate: state.closeProjectReducer.updatingCloseProject && state.closeProjectReducer.updatingCloseProject.closeProjectDate ? moment(state.closeProjectReducer.updatingCloseProject.closeProjectDate) : null,
        lastedUpdateDate: state.closeProjectReducer.updatingCloseProject && state.closeProjectReducer.updatingCloseProject.lastedUpdateDate ? moment(state.closeProjectReducer.updatingCloseProject.lastedUpdateDate) : null,
        startProgressDate: state.closeProjectReducer.updatingCloseProject && state.closeProjectReducer.updatingCloseProject.startProgressDate ? moment(state.closeProjectReducer.updatingCloseProject.startProgressDate) : null,
        endProgressDate: state.closeProjectReducer.updatingCloseProject && state.closeProjectReducer.updatingCloseProject.endProgressDate ? moment(state.closeProjectReducer.updatingCloseProject.endProgressDate) : null,
        createdUserId: state.closeProjectReducer.updatingCloseProject && state.closeProjectReducer.updatingCloseProject.createdUserId ?  state.closeProjectReducer.updatingCloseProject.createdUserId: state.common.currentUser.id,
        createdDate: state.closeProjectReducer.updatingCloseProject && state.closeProjectReducer.updatingCloseProject.createdDate ? moment(state.closeProjectReducer.updatingCloseProject.createdDate) : today
       
    };
    return {
        initialValues: updateValue,
        currentUser: state.common.currentUser,
        closeApprovalValue: selector(state, "closeApprovalValue"),
        closeWorkDoneValue: selector(state, "closeWorkDoneValue"),
        incurApprovalValue: selector(state, "incurApprovalValue"),
        incurWorkDoneValue: selector(state, "incurWorkDoneValue"),
        profit:selector(state,"profit"),
        profitIncurrent:selector(state,"profitIncurrent"),
        lastedUpdateUserId: selector(state,"lastedUpdateUserId"),
        createdUserId: selector(state, "createdUserId")
    };
};

const mapDispatchToProps = dispatch => ({
    loadCloseProject: (payload) =>
        dispatch({ type: LOAD_UPDATING_CLOSE_PROJECT, payload: payload }),
    loadProjectDetailDto: (projectDetailDto) =>
        dispatch({ type: LOAD_PROJECT_DETAIL_DTO, projectDetailDto: projectDetailDto }),
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalCloseProject", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});


class ModalCloseProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllConstructionTeam: [],
            labelProfit: 0,
            labelIncurredProfit: 0,
            disableDataManipulation:true,
            listAllUsers:[],
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        // this.deleteCloseProject = this.deleteCloseProject.bind(this);
        this.handleCalcProfit = (closeApprovalValue, closeWorkDoneValue) => {
            const { updateField } = this.props;
            var  closeApprovalValue = closeApprovalValue ? closeApprovalValue :0;
            var closeWorkDoneValue = closeWorkDoneValue ? closeWorkDoneValue :0;
            if (closeApprovalValue > 0 && closeWorkDoneValue > 0) {
                var calcProfit = 0;
                calcProfit = (closeApprovalValue - closeWorkDoneValue);
                if(calcProfit){
                    setTimeout(() => {
                    updateField("profit", calcProfit);
                    }, 0);
                }
            } 
            else if(closeApprovalValue == 0 || closeWorkDoneValue == 0) { 
                setTimeout(() => {
                updateField("profit", 0);
            }, 0);
            } else if(closeApprovalValue == closeWorkDoneValue ){
                setTimeout(() => {
                updateField("profit", 0);
            }, 0);
        }
    }
    
        this.handleCalcIncurredProfit = (incurApprovalValue, incurWorkDoneValue) => {
            const { updateField } = this.props;
            if (incurApprovalValue &&incurWorkDoneValue ) {
                if(incurApprovalValue>0 &&incurWorkDoneValue>0){
                var calcIncurredProfit = 0;
                calcIncurredProfit = (incurApprovalValue - incurWorkDoneValue);
                if(calcIncurredProfit){
                        setTimeout(() => {
                        updateField("profitIncurrent", calcIncurredProfit);
                    }, 0);
             
                }
            } if(incurApprovalValue == 0 ||incurWorkDoneValue==0){
                updateField("profitIncurrent", 0);
            }
            else if(incurApprovalValue == incurWorkDoneValue){
                updateField("profitIncurrent", 0);
            }
            }
        }
        this.handleClickCloseProject=(isCloseProject)=>{
            const{updateField}= this.props;
            if(isCloseProject ==false){
                updateField("closeProjectDate",null);
            }
        }
       
        

    }   
    getSumTotalPaidOfProjectCost(projectDetailId){
        const {updateField}= this.props;
        let setStateInRequest = (obj) => { this.setState({ sumTotalPaidByProjectCost: obj }) }
        return agent.asyncRequests.get("/projectCost/sumTotalPaidByCloseProject?projectDetailId="+projectDetailId).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
                setTimeout(() => {
                updateField("closeWorkDoneValue",parseInt(result.totalPaid));
            }, 0);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
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
    getConstructionTeam() {
        let setStateInRequest = (list) => { this.setState({ listAllConstructionTeam: list }) }
        return agent.asyncRequests.get("/constructionTeam/listAll").then(function (res) {
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
        const { loadCloseProject, projectDetailDto, loadProjectDetailDto} = this.props;
        var id = this.props.idCloseProject;
        var today = new Date();
        const dataPromise = agent.CloseProjectApi.getCloseProject(id);
        loadCloseProject(Promise.resolve(dataPromise));
        if(projectDetailDto && projectDetailDto.closeProject){
            debugger;
            this.handleCalcProfit(projectDetailDto.closeProject.closeApprovalValue,projectDetailDto.closeProject.closeWorkDoneValue);
            this.handleCalcIncurredProfit(projectDetailDto.closeProject.incurApprovalValue,projectDetailDto.closeProject.incurWorkDoneValue);
        }
        if(projectDetailDto){
            loadProjectDetailDto(projectDetailDto);
            this.getSumTotalPaidOfProjectCost(projectDetailDto.id);
        }
    
        return (this.getConstructionTeam(),this.getListUser());
    }


    handleAdd(values) {
        const { currentUser,onAfterSave } = this.props;
        var onHide = this.props.onHide;
        var id = this.props.idCloseProject;
        var url = '/closeProject/add';
        var today = new Date();
        var bodyObject = {
            projectDetailId: values.projectDetailId,
            constructionTeamId: values.constructionTeamId,
            closeApprovalValue: values.closeApprovalValue ? values.closeApprovalValue: 0,
            closeWorkDoneValue: values.closeWorkDoneValue ? values.closeWorkDoneValue: 0,
            closeWorkDoneUpload: values.closeWorkDoneUpload,
            profit: values.profit ?values.profit : 0,
            guaranteeMoney: values.guaranteeMoney ? values.guaranteeMoney : 0,
            guaranteeStartDate: values.guaranteeStartDate,
            guaranteeEndDate: values.guaranteeEndDate,
            incurApprovalValue: values.incurApprovalValue ? values.incurApprovalValue : 0,
            incurWorkDoneValue: values.incurWorkDoneValue ? values.incurWorkDoneValue : 0,
            incurredUpload: values.incurredUpload,
            profitIncurrent: values.profitIncurrent ? values.profitIncurrent: 0 ,
            leaderName: values.leaderName,
            leaderPhone: values.leaderPhone,
            teamEvaluate: values.teamEvaluate,
            closed: values.closed,
            closeProjectDate: values.closeProjectDate,
            closeWorkDoneUploadFile: values.closeWorkDoneUploadFile,
            incurredUploadFile: values.incurredUploadFile,
            note: values.note,
            createdUserId:values.createdUserId,
            lastedUpdateUserId: id ?  currentUser.id : null,
            createdDate:id? values.createdDate: today,
            lastedUpdateDate: id ? moment(today) : null
            
        };
        if (id) {
            url = '/closeProject/update';
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
        // const { objectCloseProject, listfile, title, onHide } = this.props;

        const { handleSubmit, submitting, title, invalid, projectDetailDto, subtitle1, subtitle2, currentUser, initialValues, closeApprovalValue,closeWorkDoneValue, incurApprovalValue, incurWorkDoneValue,profit,profitIncurrent, createdUserId,lastedUpdateUserId } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show, bsSize: "sm", onHide: this.props.onHide, submitting: this.props.submitting };
        const dataConstructionTeam = this.state.listAllConstructionTeam;
        var labelProfit = this.state.labelProfit;
        var labelIncurredProfit = this.state.labelIncurredProfit;
        var id = this.props.idCloseProject;
        if (!dataConstructionTeam) {
            return null;
        }
        var optionConstructionTeam = [];
        dataConstructionTeam.map(item => {
            optionConstructionTeam.push({ label: "Tên:" + item.teamLeaderName, value: item.id })
        })
        // Set Percent profit 
        if(profit || profitIncurrent){
        labelProfit = (profit / closeApprovalValue) * 100
        labelIncurredProfit = (profitIncurrent / incurApprovalValue) * 100
        }
        // end set percent profit 
        var optionEvaluateTeam = [{
            label: "Đạt", value: "DAT"
        },
        {
            label: "Chưa Đạt", value: "CHUA_DAT"

        }];
        var newModal = null;
        var optionProjectDetail = [];
        if (projectDetailDto) {
            optionProjectDetail.push({ label: projectDetailDto.name, value: projectDetailDto.id })
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
        var disableDataManipulation = this.state.disableDataManipulation;
        if(SecurityUtils.hasPermission(currentUser, "admin.projectProgress.closeProjectC&U")){
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
                                {/* Link From Approval */}
                                <Field disabled={true} name="closeApprovalValue" label="Giá Trị Được Duyệt" thousandSeparator={true} onChangeAction={(value) => { this.handleCalcProfit(value, closeWorkDoneValue) }} component={RenderMoneyFormat}></Field>
                                <Field disabled={true} name="closeWorkDoneValue" label="Giá Trị Thực Hiện" placeholder="Nhập giá trị thực hiện..." placeholder="Nhập giá trị được duyệt.." onChangeAction={(value) => { this.handleCalcProfit(closeApprovalValue, value) }} thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                {disableDataManipulation ? null : <Field name="closeWorkDoneUploadFile" label="File Giá Trị Thực Hiện" component={ListFile} modalUrl="/uploadCloseProjectFile"></Field>}
                                {/* Calculate Profit, and convert to Percent Profit */}
                                <SecuredComponent allowedPermission="admin.totalRevenue.check">
                                <Field disabled={true} name="profit" label="Lợi Nhuận" placeholder="Nhập lợi nhuận..." thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                </SecuredComponent>
                                <label  style={{ fontStyle: 'italic', color: 'red' }}>Lợi Nhuận: {FormatterUtils.round2Decimals(labelProfit)} %</label>
                                <br />
                                <br />
                                <Field name="guaranteeMoney" label="Bảo Hành" placeholder="Nhập số tiền.." thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                <Field name="guaranteeStartDate" dataFormat="DD/MM/YYYY" label="Ngày Bắt Đầu Bảo Hành" component={RenderDatePicker}></Field>
                                <Field name="guaranteeEndDate" dataFormat="DD/MM/YYYY" label="Ngày Kết Thúc Bảo Hành" component={RenderDatePicker}></Field>
                                {/* Gimme title Incurred */}
                                <Modal.Title id="contained-modal-title-sm"><center>Thông Tin {subtitle1}</center> </Modal.Title>
                                <Field disabled={true} name="incurApprovalValue" label="Giá Trị Được Duyệt Phát Sinh" placeholder="Nhập giá trị được duyệt..." onChangeAction={(value) => { this.handleCalcIncurredProfit(value, incurWorkDoneValue) }} thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                <Field name="incurWorkDoneValue" label="Giá Trị Thực Hiện Phát Sinh" placeholder="Nhập giá trị thực hiện..." onChangeAction={(value) => { this.handleCalcIncurredProfit(incurApprovalValue, value) }} thousandSeparator={true} component={RenderMoneyFormat}></Field>
                               
                                {/* Calculate Profit, and convert to Percent Profit */}
                                <SecuredComponent allowedPermission="admin.totalRevenue.check">
                                <Field disabled={true} name="profitIncurrent" label="Lợi Nhuận Phát Sinh" thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                </SecuredComponent>
                                <label style={{ fontStyle: 'italic', color: 'red' }}>Lợi Nhuận Phát Sinh: {FormatterUtils.round2Decimals(labelIncurredProfit)} %</label>
                                <br />
                                <br />
                                {disableDataManipulation ? null :  <Field name="incurredUploadFile" label="File Giá Thực Hiện" component={ListFile} modalUrl="/uploadCloseProjectFile"></Field>}
                                {/* Gimme title ConstructionTeam */}
                                <Modal.Title id="contained-modal-title-sm"><center>Thông Tin {subtitle2}</center> </Modal.Title>
                                <Field disabled={true} name="constructionTeamId" label="Đội Thi Công" options={optionConstructionTeam} component={RenderSelect}></Field>
                                <Field disabled={true} name="leaderName" label="Tên Đội Trưởng" component={RenderInputWithDiv} ></Field>
                                <Field disabled={true} name="leaderPhone" label="Số Điện Thoại Đội Trưởng" component={RenderInputWithDiv}></Field>
                                <Field name="teamEvaluate" label="Đánh Giá Đội Thi Công (Phát sinh)" placeholder="Chọn trạng thái đánh giá..." options={optionEvaluateTeam} component={RenderSelect}></Field>
                                <Field name="note" label="Ghi Chú" placeholder="Nhập Ghi Chú..." rows={3} component={RenderTextArea}></Field>
                                <Field name="closed" label="Đóng Dự Án" checkLabel="Đồng Ý ?" component={RenderSwitch} onChangeAction={(value)=>this.handleClickCloseProject(value)}></Field>
                                <Field  name="closeProjectDate" dataFormat="DD/MM/YYYY" label="Ngày Đóng Dự Án" component={RenderDatePicker}></Field>
                                <Field disabled={true} name="createdUserId" label="Người Tạo Bảng" options={showCreatedUser} component={RenderSelect}></Field>
                                <Field disabled={true} name="createdDate" label="Ngày Tạo Bảng" dateFormat="DD/MM/YYYY" component={RenderDatePicker}></Field>
                                <div style={initialValues.lastedUpdateUserId ? { display: 'block' } : { display: 'none' }}>
                                    <Field disabled={true} name="lastedUpdateUserId" label="Người Chỉnh Sửa Gần Nhất" options={showLastedUpdateUser} component={RenderSelect}></Field>
                                    <Field disabled={true} name="lastedUpdateDate" label="Ngày Chỉnh Sửa Gần Nhất " dateFormat="DD/MM/YYYY" component={RenderDatePicker}></Field> </div>
                                <div className="text-right">
                                    <button type="button" className="btn btn-link" onClick={this.handleHideAndClear} >Hủy</button>
                                    <button type="submit" className="btn bg-orange" disabled={submitting || invalid}>Lưu</button>
                                </div>
                                {/* <div>
                                    <center>
                                    <button type="button" className="btn btn-danger" onClick={this.deleteCloseProject} >Xóa</button>
                                    </center>
                                </div> */}
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
            form: 'ModalCloseProject',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalCloseProject)));
