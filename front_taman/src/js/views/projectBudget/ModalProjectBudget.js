import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker, RenderCheckbox, RenderSelect, RenderNumberInput, RenderMoneyFormat } from '../../components/formInputs';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import isEmail from 'sane-email-validation';
import { StringUtils,FormatterUtils } from '../../utils/javascriptUtils';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_PROJECT_BUDGET } from './action-types';
import { FIRE_REDIRECT } from '../../constants/action-types';
import ListFile from '../../components/ListFile';
import { isNull } from 'util';
import { LOAD_PROJECT_DETAIL_DTO } from '../projectDetail/action-types';
import moment from 'moment';
const validate = values => {
    const errors = {};
    if (!values.createdUserId) {
        errors.createdUserId = "";

    }
    if (!values.name) {
        errors.name = 'Vui lòng nhập tên dư án.';
    } 
    if(values.projectDetail && values.projectDetail.approval && parseInt(values.projectDetail.approval.approvalValue) < parseInt(values.totalProjectBudget)){
        errors.totalProjectBudget = "Tổng ngân sách không được vượt quá giá trị được duyệt " + FormatterUtils.formatCurrency(values.projectDetail.approval.approvalValue)+ " VNĐ !";
    }
    return errors;
}

const selector = formValueSelector('ModalProjectBudget');

var today = moment(new Date,"DD/MM/YYYY");

const mapStateToProps = state => {
    var projectDetailDto = state.projectDetailReducer.projectDetailDto;

    var updateValue = {
        ...state.projectBudgetReducer.updatingProjectBudget,
        projectLink: projectDetailDto && projectDetailDto.project ? projectDetailDto.project.name: "N/A ", 
        projectDetailId:projectDetailDto ? projectDetailDto.id:null,
        createdDate:state.projectBudgetReducer.updatingProjectBudget && state.projectBudgetReducer.updatingProjectBudget.createdDate ? moment(state.projectBudgetReducer.updatingProjectBudget.createdDate) : today,
        lastedUpdateDate:state.projectBudgetReducer.updatingProjectBudget && state.projectBudgetReducer.updatingProjectBudget.lastedUpdateDate ? moment(state.projectBudgetReducer.updatingProjectBudget.lastedUpdateDate) : null,
        createdUserId:state.projectBudgetReducer.updatingProjectBudget && state.projectBudgetReducer.updatingProjectBudget.createdUserId ?  state.projectBudgetReducer.updatingProjectBudget.createdUserId: state.common.currentUser.id

    };
    return {
        initialValues: updateValue,
        lastedUpdateUserId: selector(state,"lastedUpdateUserId"),
        createdUserId: selector(state, "createdUserId"),
        productBudget:selector(state, "productBudget"),
        labourBudget:selector(state, "labourBudget"),
        otherBudget:selector(state, "otherBudget"),
        incurredBudget:selector(state, "incurredBudget"),
        constructionTeamBudget:selector(state, "constructionTeamBudget"),
        currentUser: state.common.currentUser
    };
};

const mapDispatchToProps = dispatch => ({
    loadProjectBudget: (payload) =>
        dispatch({ type: LOAD_UPDATING_PROJECT_BUDGET, payload: payload }),
        loadProjectDetailDto: (projectDetailDto) =>
        dispatch({ type: LOAD_PROJECT_DETAIL_DTO, projectDetailDto: projectDetailDto }),
        updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalProjectBudget", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});




class ModalProjectBudget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllYears: [],
            listAllUsers:[],
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.totalProjectBudget=(productBudget,constructionTeamBudget,labourBudget,otherBudget,incurredBudget)=>{
                const {updateField} = this.props;
                var productBudget =productBudget ?productBudget: 0;
                var labourBudget = labourBudget ?labourBudget:0;
                var constructionTeamBudget = constructionTeamBudget ?constructionTeamBudget:0;
                var otherBudget = otherBudget ?otherBudget:0;
                var incurredBudget = incurredBudget ?incurredBudget:0;
                if(productBudget ||
                    constructionTeamBudget ||
                    labourBudget ||
                    otherBudget||
                    incurredBudget){

                        updateField("totalProjectBudget",parseInt(productBudget)+
                        parseInt(constructionTeamBudget)+
                        parseInt(labourBudget)+
                        parseInt(otherBudget)+
                        parseInt(incurredBudget));
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
        const { loadProjectBudget,loadProjectDetailDto,projectDetailDto } = this.props;
        var id = this.props.idProjectBudget;
        if(projectDetailDto){
            loadProjectDetailDto(projectDetailDto)
        }
        const dataPromise = agent.ProjectBudgetApi.getProjectBudget(id);
        loadProjectBudget(Promise.resolve(dataPromise));
        return(this.getListUser());

    }


    handleAdd(values) {
        const {onAfterSave} = this.props;
        const {currentUser} = this.props;
        var id = this.props.idProjectBudget;
        var url = '/projectBudget/add';
        var today = moment(new Date,"DD/MM/YYYY");
        var bodyObject = {
            projectDetailId:values.projectDetailId,
            productBudget:values.productBudget?values.productBudget:0,
            labourBudget:values.labourBudget?values.labourBudget: 0,
            constructionTeamBudget:values.constructionTeamBudget?values.constructionTeamBudget: 0,
            otherBudget:values.otherBudget?values.otherBudget:0,
            incurredBudget:values.incurredBudget?values.incurredBudget: 0,
            totalProjectBudget:values.totalProjectBudget?values.totalProjectBudget:0,
            note:values.note,
            createdUserId:values.createdUserId,
            lastedUpdateUserId: id ?  currentUser.id : null,
            createdDate:id? values.createdDate: today,
            lastedUpdateDate: id ? moment(today) : null
        };
        if (id) {
            url = '/projectBudget/update';
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
        // const { objectProject, listfile, title, onHide } = this.props;

        const { handleSubmit, submitting, title,projectDetailDto, invalid,currentUser, createdUserId,lastedUpdateUserId,initialValues,productBudget,
            labourBudget,
            otherBudget,
            incurredBudget,
            constructionTeamBudget } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"sm",  onHide: this.props.onHide, submitting: this.props.submitting };
        // const dataProjectYear= this.state.listAllYears;
        var optionProjectDetail = [];
        var id = this.props.idProjectBudget;
        if(!projectDetailDto){
            <LoadingScreen></LoadingScreen>
        }else{
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
                                <Field disabled={true} name="projectLink" label="Tên Dự Án" placeholder="" component={RenderInputWithDiv}></Field>
                                <Field disabled={true} name="projectDetailId" label="Tên Công Việc" placeholder="" options={optionProjectDetail} component={RenderSelect}></Field>
                                <Field name="productBudget" label="Ngân Sách Vật Tư" placeholder="Nhập ngân sách vật tư..."  thousandSeparator={true} component={RenderMoneyFormat} onChangeAction={(value)=>this.totalProjectBudget(value,constructionTeamBudget,labourBudget,otherBudget,incurredBudget)}></Field>
                                <Field name="constructionTeamBudget" label="Ngân Sách Đội Thi Công" placeholder="Nhập ngân sách đội thi công..."  thousandSeparator={true} component={RenderMoneyFormat} onChangeAction={(value)=>this.totalProjectBudget(productBudget,value,labourBudget,otherBudget,incurredBudget)}></Field>
                                <Field name="labourBudget" label="Ngân Sách Nhân Công" placeholder="Nhập ngân sách nhân công..."  thousandSeparator={true} component={RenderMoneyFormat} onChangeAction={(value)=>this.totalProjectBudget(productBudget,constructionTeamBudget,value,otherBudget,incurredBudget)}></Field>
                                <Field name="otherBudget" label="Ngân Sách Khác" placeholder="Nhập ngân sách khác..."  thousandSeparator={true} component={RenderMoneyFormat} onChangeAction={(value)=>this.totalProjectBudget(productBudget,constructionTeamBudget,labourBudget,value,incurredBudget)}></Field>
                                <Field name="incurredBudget" label="Ngân Sách Phát Sinh" placeholder="Nhập ngân sách phát sinh..." thousandSeparator={true} component={RenderMoneyFormat} onChangeAction={(value)=>this.totalProjectBudget(productBudget,constructionTeamBudget,labourBudget,otherBudget,value)}></Field>
                                <Field disabled={true} name="totalProjectBudget" label="Tổng Ngân Sách"  thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                <Field name="note" label="Ghi Chú" placeholder="Nhập ghi chú..." rows={3} component={RenderTextArea}></Field>
                                {/* <Field disabled={true} name="totalRevenue"  label="Tổng Doanh Thu" placeholder="Nhập tổng doanh thu..." thousandSeparator={true} component={RenderMoneyFormat}></Field> */}

                                <Field disabled={true} name="createdUserId" label="Người Tạo Bảng"  options={showCreatedUser} component={RenderSelect}></Field>
                                {id ?<Field disabled={true} name="createdDate" label="Ngày Tạo Bảng"  dateFormat="DD/MM/YYYY" component={RenderDatePicker}></Field> : null }
                                <div style={initialValues.lastedUpdateUserId?{display:'block'}:{display:'none'}}>
                                <Field disabled={true} name="lastedUpdateUserId" label="Người Chỉnh Sửa Gần Nhất" options={showLastedUpdateUser} component={RenderSelect}></Field>
                                <Field disabled={true} name="lastedUpdateDate"  label="Ngày Chỉnh Sửa Gần Nhất " dateFormat="DD/MM/YYYY" component={RenderDatePicker}></Field> </div>

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
            form: 'ModalProjectBudget',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalProjectBudget)));
