import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderInputWithGen, RenderPlainDatePicker, RenderTextArea, RenderDatePicker, RenderCheckbox, RenderSelect, RenderNumberInput, RenderMoneyFormat } from '../../components/formInputs';
import { Field, reduxForm,formValueSelector,change } from 'redux-form';
// import { reduxForm } from 'redux-form/immutable';
import isEmail from 'sane-email-validation';
import { StringUtils, SecurityUtils } from '../../utils/javascriptUtils';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_EFFICIENCY } from './action-types';
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
    if (!values.name) {
        errors.name = 'Vui lòng nhập tên dư án.';
    }
    if(moment(values.quotationSendDate)>moment(values.startActualProgressDate)){
        errors.startActualProgressDate="Ngày bắt đầu công việc không được nhỏ hơn ngày gửi báo giá " + moment(values.quotationSendDate).format("DD/MM/YYYY");
    }
    if(moment(values.quotationSendDate)>moment(values.endPlanProgressDate)){
        errors.endPlanProgressDate="Ngày kết thúc công việc không được nhỏ hơn ngày gửi báo giá " + moment(values.quotationSendDate).format("DD/MM/YYYY");
    }
    if(moment(values.startActualProgressDate)>moment(values.endPlanProgressDate)){
        errors.endPlanProgressDate="Ngày kết thúc công việc không được nhỏ hơn ngày bắt đầu ";
    }
    if(!values.startActualProgressDate){
        errors.startActualProgressDate="Vui lòng chọn ngày bắt đầu công việc! ";
    }
    if(!values.endPlanProgressDate){
        errors.endPlanProgressDate="Vui lòng chọn ngày kết thúc công việc! ";
    }
    return errors;
}

const selector = formValueSelector('ModalEfficiency');

var today = moment(new Date,"DD/MM/YYYY");

const mapStateToProps = state => {
    var projectDetailDto = state.projectDetailReducer.projectDetailDto;
    var updateValue = {
        ...state.efficiencyReducer.updatingEfficiency,
        // ProjectDetailDto
        projectLink: projectDetailDto && projectDetailDto.project ? projectDetailDto.project.name : "N/A ",
        projectDetailId: projectDetailDto ? projectDetailDto.id : null,
        contractNumberLink: projectDetailDto && projectDetailDto.contract ? projectDetailDto.contract.contractNumber : "N/A",
        quotationSendDate:projectDetailDto &&projectDetailDto.quotation ? projectDetailDto.quotation.sendDate : null,
        workContentLink: projectDetailDto && projectDetailDto.quotation ? projectDetailDto.quotation.workContent : "N/A",
        startContractProgressDate:projectDetailDto &&projectDetailDto.contract ? moment(projectDetailDto.contract.startProgressDate) :null,
        endContractProgressDate:projectDetailDto &&projectDetailDto.contract ? moment(projectDetailDto.contract.endProgressDate):null,
        totalContractProgressDays:projectDetailDto &&projectDetailDto.contract ? projectDetailDto.contract.progressDays  :0,
        // State 
        createdUserId:state.efficiencyReducer.updatingEfficiency && state.efficiencyReducer.updatingEfficiency.createdUserId ?  state.efficiencyReducer.updatingEfficiency.createdUserId: state.common.currentUser.id ,
        startContractProgressDate: state.efficiencyReducer.updatingEfficiency && state.efficiencyReducer.updatingEfficiency.startContractProgressDate ? moment(state.efficiencyReducer.updatingEfficiency.startContractProgressDate) : null,
        endContractProgressDate: state.efficiencyReducer.updatingEfficiency && state.efficiencyReducer.updatingEfficiency.endContractProgressDate ? moment(state.efficiencyReducer.updatingEfficiency.endContractProgressDate) : null,
        startActualProgressDate: state.efficiencyReducer.updatingEfficiency && state.efficiencyReducer.updatingEfficiency.startActualProgressDate ? moment(state.efficiencyReducer.updatingEfficiency.startActualProgressDate) : null,
        endPlanProgressDate: state.efficiencyReducer.updatingEfficiency && state.efficiencyReducer.updatingEfficiency.endPlanProgressDate ? moment(state.efficiencyReducer.updatingEfficiency.endPlanProgressDate) : null,
        createdDate: state.efficiencyReducer.updatingEfficiency && state.efficiencyReducer.updatingEfficiency.createdDate ? moment(state.efficiencyReducer.updatingEfficiency.createdDate) : today,
        lastedUpdateDate: state.efficiencyReducer.updatingEfficiency && state.efficiencyReducer.updatingEfficiency.lastedUpdateDate ? moment(state.efficiencyReducer.updatingEfficiency.lastedUpdateDate) : null,
        startProgressDate: state.efficiencyReducer.updatingEfficiency && state.efficiencyReducer.updatingEfficiency.startProgressDate ? moment(state.efficiencyReducer.updatingEfficiency.startProgressDate) : null,
        endProgressDate: state.efficiencyReducer.updatingEfficiency && state.efficiencyReducer.updatingEfficiency.endProgressDate ? moment(state.efficiencyReducer.updatingEfficiency.endProgressDate) : null,
       
    };
    return {
        initialValues: updateValue,
        currentUser: state.common.currentUser,
        startContractProgressDate: selector(state, "startContractProgressDate"),
        endContractProgressDate: selector(state, "endContractProgressDate"),
        startActualProgressDate: selector(state, "startActualProgressDate"),
        endPlanProgressDate: selector(state, "endPlanProgressDate"),
        selectedConstructionTeamId: selector(state, "constructionTeamId"),
        lastedUpdateUserId: selector(state,"lastedUpdateUserId"),
        createdUserId: selector(state, "createdUserId")
    };
};

const mapDispatchToProps = dispatch => ({
    loadEfficiency: (payload) =>
        dispatch({ type: LOAD_UPDATING_EFFICIENCY, payload: payload }),
    loadProjectDetailDto: (projectDetailDto) =>
        dispatch({ type: LOAD_PROJECT_DETAIL_DTO, projectDetailDto: projectDetailDto }),
        updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalEfficiency", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});




class ModalEfficiency extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllUsers: [],
            listAllConstructionTeam: [],
            createNewConsTeamShown: false,
            disableDataManipulation:true,
            listAllUsers:[],
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.handleDiffContractProgressDate = (startContractProgressDate, endContractProgressDate) => {
            const { updateField } = this.props;
            if (startContractProgressDate && endContractProgressDate) {
                var diffBetweenTwoDate = moment(endContractProgressDate).diff(startContractProgressDate, 'days');
                updateField("totalContractProgressDays", diffBetweenTwoDate);
            }
        }
        this.handleDiffActualProgressDate = (startActualProgressDate, endPlanProgressDate) => {
            const { updateField } = this.props;
            if (startActualProgressDate && endPlanProgressDate) {
                var diffBetweenTwoDate = moment(endPlanProgressDate).diff(startActualProgressDate, 'days');
                updateField("totalActualProgressDays", diffBetweenTwoDate);
            }
        }
        this.handleFillNameAndPhoneLeader = (selectedConstructionTeamId) => {
            const dataConstructionTeam = this.state.listAllConstructionTeam;
            const { updateField } = this.props;
            for (var i = 0; i < dataConstructionTeam.length; i++) {
                if (dataConstructionTeam[i].id == selectedConstructionTeamId) {
                    updateField("leaderName", dataConstructionTeam[i].teamLeaderName);
                    updateField("leaderPhone", dataConstructionTeam[i].leaderPhoneNumber);
                }
            }
        }
        this.toggleCreateConstructionShowHide=()=> {
            const { updateField } = this.props;
            this.setState({
                createNewConsTeamShown: !this.state.createNewConsTeamShown
            },()=>{
                if(this.state.createNewConsTeamShown==true){
                updateField("constructionTeam.id",null);
                updateField("leaderName", null);
                updateField("leaderPhone", null);
                }else{
                updateField("newLeaderName", null);
                updateField("newLeaderPhone", null);
                updateField("newSpecialize", null);
                }
            });
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
        const { loadEfficiency, loadProjectDetailDto, updateField, projectDetailDto,currentUser } = this.props;
        var id = this.props.idEfficiency;
        const dataPromise = agent.EfficiencyApi.getEfficiency(id);
        loadEfficiency(Promise.resolve(dataPromise));
        if(projectDetailDto){
            loadProjectDetailDto(projectDetailDto);
        }
        return (this.getListUser(), this.getConstructionTeam());
    }

    
    handleAdd(values) {
        const { currentUser,onAfterSave } = this.props;
        var today = new Date();
        var onHide = this.props.onHide;
        var id = this.props.idEfficiency;
        var url = '/efficiency/add';
        var bodyObject = {
            projectDetailId: values.projectDetailId,
            curatorId: values.curatorId,
            constructionTeamId: values.constructionTeamId,
            startContractProgressDate: values.startContractProgressDate,
            endContractProgressDate: values.endContractProgressDate,
            startActualProgressDate: values.startActualProgressDate,
            endPlanProgressDate: values.endPlanProgressDate,
            totalContractProgressDays: values.totalContractProgressDays,
            totalActualProgressDays: values.totalActualProgressDays,
            handoverWorkReportStatus: values.handoverWorkReportStatus,
            handoverWorkUpload: values.handoverWorkUpload,
            leaderName: values.leaderName,
            leaderPhone: values.leaderPhone,
            newLeaderName: values.newLeaderName,
            newLeaderPhone: values.newLeaderPhone,
            newSpecialize: values.newSpecialize,
            note: values.note,
            handoverWorkUploadFile: values.handoverWorkUploadFile,
            createdUserId:values.createdUserId,
            lastedUpdateUserId: id ?  currentUser.id : null,
            createdDate:id? values.createdDate: today,
            lastedUpdateDate: id ? moment(today) : null
            
        };
        if (id) {
            url = '/efficiency/update';
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
        // const { objectEfficiency, listfile, title, onHide } = this.props;

        const { handleSubmit,
            submitting,
            title,
            invalid,
            projectDetailDto,
            startContractProgressDate,
            endContractProgressDate,
            startActualProgressDate,
            endPlanProgressDate,
            currentUser,
            initialValues,
            createdUserId,lastedUpdateUserId
        } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"sm",  onHide: this.props.onHide, submitting: this.props.submitting };
        const dataPersonels = this.state.listAllUsers;
        const dataConstructionTeam = this.state.listAllConstructionTeam;
        const createNewConsTeamShown = this.state.createNewConsTeamShown;
        var id = this.props.idEfficiency;
        var optionCurators = [];
        if (!dataPersonels) {
            return null;
        }
        dataPersonels.map(item => {
            optionCurators.push({ label: "Tên:" + item.fullName, value: item.id })
        })
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

        var optionsHandoverWorkReportStatus = [{ label: "Đã Bàn Giao", value: "DA_BAN_GIAO" },
        { label: "Chưa Bàn Giao", value: "CHUA_BAN_GIAO" }];
        var optionConstructionTeam = [];
        dataConstructionTeam.map(item => {
            optionConstructionTeam.push({ label: "Tên:" + item.teamLeaderName, value: item.id })
        })
        var optionProjectDetail = [];
        if (projectDetailDto) {
            optionProjectDetail.push({ label: projectDetailDto.name, value: projectDetailDto.id })
        }
      
        var optionApprovalStatus= [
            {label:"Đã Duyệt",value:"DA_DUYET"},
            {label:"Chưa Duyệt",value:"CHUA_DUYET"}]; 

        var newModal = null;
        var disableDataManipulation = this.state.disableDataManipulation;
        if(SecurityUtils.hasPermission(currentUser, "admin.projectProgress.efficientC&U")){
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
                                    <Field disabled={true} name="workContentLink" label="Nội Dung Công Việc" rows={2} component={RenderTextArea}></Field>
                                    <Field disabled={true} name="startContractProgressDate" dateFormat="DD/MM/YYYY" label="Bắt Đầu Tiến Độ (HĐ)" onChangeAction={(value) => this.handleDiffContractProgressDate(value, endContractProgressDate)} component={RenderDatePicker}></Field>
                                    <Field disabled={true} name="endContractProgressDate" dateFormat="DD/MM/YYYY" label="Kết Thúc Tiến Độ(HĐ)" onChangeAction={(value) => this.handleDiffContractProgressDate(startContractProgressDate, value)} component={RenderDatePicker}></Field>
                                    <Field disabled={true} name="totalContractProgressDays" label="Tiến Độ Hợp Đồng" component={RenderNumberInput}></Field>
                                    <Field name="handoverWorkReportStatus" label="Biên Bản Bàn Giao Công Việc" options={optionsHandoverWorkReportStatus} component={RenderSelect}></Field>
                                    {disableDataManipulation ? null : <Field name="handoverWorkUploadFile" label="File BBBG Công Việc" component={ListFile} modalUrl="/uploadEfficiencyFile"></Field>}
                                    <Field name="curatorId" label="Người Phụ Trách" options={optionCurators} component={RenderSelect}></Field>
                                    <Field name="startActualProgressDate" dateFormat="DD/MM/YYYY" label="Ngày Bắt Đầu Công Việc(*)" onChangeAction={(value) => this.handleDiffActualProgressDate(value, endPlanProgressDate)} component={RenderDatePicker}></Field>
                                    <Field name="endPlanProgressDate" dateFormat="DD/MM/YYYY" label="Ngày Kết Thúc Công Việc Dự Tính (*)" onChangeAction={(value) => this.handleDiffActualProgressDate(startActualProgressDate, value)} component={RenderDatePicker}></Field>
                                    <Field disabled={true} name="totalActualProgressDays" label="Tiến Độ Thực Hiện" component={RenderNumberInput}></Field>
                                    <Field disabled={createNewConsTeamShown} name="constructionTeamId" label="Đội Thi Công" options={optionConstructionTeam} onChangeAction={(value) => this.handleFillNameAndPhoneLeader(value)} component={RenderSelect}></Field>
                                    <Field disabled={true} name="leaderName" label="Tên Đội Trưởng" component={RenderInputWithDiv}></Field>
                                    <Field disabled={true} name="leaderPhone" label="Số Điện Thoại Đội Trưởng" component={RenderNumberInput}></Field>
                                    {/* Start Toggle Add New ConstructionTeam */}
                                    <a onClick={() => this.toggleCreateConstructionShowHide()}>Nhấn Để Thêm Đội TC</a>
                                    <div style={createNewConsTeamShown ? { display: "block" } : { display: "none" }}>
                                        <div style={{ color: 'red' }}>
                                            <Field name="newSpecialize" label="Tên Đội (Thêm Mới)" component={RenderInputWithDiv}></Field>
                                            <Field name="newLeaderName" label="Tên Đội Trưởng(Thêm mới)" component={RenderInputWithDiv}></Field>
                                            <Field name="newLeaderPhone" label="Số Điện Thoại (Thêm mới)" component={RenderNumberInput}></Field>
                                        </div>
                                    </div>
                                    {/* End Toggle Add New ConstructionTeam */}
                                    <Field name="note" label="Ghi Chú" placeholder="Nhập ghi chú..." rows={3} component={RenderTextArea}></Field>
                                    <Field disabled={true} name="createdUserId" label="Người Tạo Bảng" options={showCreatedUser} component={RenderSelect}></Field>
                               {id ? <Field disabled={true} name="createdDate" label="Ngày Tạo Bảng" dateFormat="DD/MM/YYYY" component={RenderDatePicker}></Field>: null}
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
            form: 'ModalEfficiency',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalEfficiency)));
