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
import { LOAD_UPDATING_PROJECT_DETAIL, LOAD_PROJECT_DTO } from './action-types';
import { FIRE_REDIRECT } from '../../constants/action-types';
import ListFile from '../../components/ListFile';
import { isNull } from 'util';
import moment from 'moment';
const validate = values => {
    const errors = {};
    if (!values.createdUserId) {
        errors.createdUserId = "";

    }
    if (!values.name) {
        errors.name = 'Vui lòng nhập tên công việc.';
    }
    if (values.projectDetailStatus == "DA_HOAN_THANH" && !values.closedDate) {
        errors.closedDate = 'Vui lòng chọn ngày đóng công việc';
    }
    return errors;
}
const selector = formValueSelector("ModalProjectDetail")
var today = moment(new Date,"DD/MM/YYYY");  
const mapStateToProps = state => {
    var projectDto = state.projectDetailReducer.projectDto;
    var updateValue = {
        ...state.projectDetailReducer.updatingProjectDetail,
        projectId:  projectDto ? projectDto.id : null,
        notifyTo: null,
        notifyMessage: null,
        closedDate: state.projectDetailReducer.updatingProjectDetail && state.projectDetailReducer.updatingProjectDetail.closedDate ? moment(state.projectDetailReducer.updatingProjectDetail.closedDate) : null,
        projectDetailStatus: state.projectDetailReducer.updatingProjectDetail && state.projectDetailReducer.updatingProjectDetail.projectDetailStatus ? state.projectDetailReducer.updatingProjectDetail.projectDetailStatus : 'DANG_THUC_THI',
        createdDate: state.projectDetailReducer.updatingProjectDetail && state.projectDetailReducer.updatingProjectDetail.createdDate ? moment(state.projectDetailReducer.updatingProjectDetail.createdDate) : today,
        lastedUpdateDate: state.projectDetailReducer.updatingProjectDetail && state.projectDetailReducer.updatingProjectDetail.lastedUpdateDate ? moment(state.projectDetailReducer.updatingProjectDetail.lastedUpdateDate) : null,
        createdUserId: state.projectDetailReducer.updatingProjectDetail && state.projectDetailReducer.updatingProjectDetail.createdUserId ? state.projectDetailReducer.updatingProjectDetail.createdUserId : state.common.currentUser.id,
        userBudgetPermissions: state.projectDetailReducer.updatingProjectDetail && state.projectDetailReducer.updatingProjectDetail.userBudgetPermissions ? state.projectDetailReducer.updatingProjectDetail.userBudgetPermissions.map(userBugetPermission => {return {label: userBugetPermission.fullName, value: userBugetPermission.id}}) : null,
    };
    return {
        initialValues: updateValue,
        projectDetailStatus: selector(state, "projectDetailStatus"),
        currentUser: state.common.currentUser,
        lastedUpdateUserId: selector(state,"lastedUpdateUserId"),
        createdUserId: selector(state, "createdUserId"),
    };
};

const mapDispatchToProps = dispatch => ({
    loadProjectDetail: (payload) =>
        dispatch({ type: LOAD_UPDATING_PROJECT_DETAIL, payload: payload }),
    loadProjectDto: (projectDto) =>
        dispatch({ type: LOAD_PROJECT_DTO, projectDto: projectDto }),
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalProjectDetail", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});


class ModalProjectDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllProjects: [],
            listAllUsers: [],
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
        const { loadProjectDetail, projectDto, loadProjectDto } = this.props;
        var id = this.props.idProjectDetail;


        if (projectDto) {
            loadProjectDto(projectDto)

        }
        const dataPromise = agent.ProjectDetailApi.getProjectDetail(id);
        loadProjectDetail(Promise.resolve(dataPromise));
        return (
            this.getListProject(),
            this.getListUser()
        )

    }

    getListProject() {
        const { projectDto, updateField } = this.props;
        let setStateInRequest = (list) => { this.setState({ listAllProjects: list }) }
        return agent.asyncRequests.get("/project/listAll").then(function (res) {
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

    handleAdd(values) {
        var onHide = this.props.onHide;
        var id = this.props.idProjectDetail;
        const {currentUser} = this.props;
        var url = '/projectDetail/add';
        var today = new Date();
        var bodyObject = {
            projectId: values.projectId,
            name: values.name,
            note: values.note,
            totalRevenue: values.totalRevenue ? values.totalRevenue : 0,
            totalProfit: values.totalProfit ? values.totalProfit : 0,
            projectDetailStatus: values.projectDetailStatus,
            closedDate: values.closedDate,
            notifyTo: values.notifyTo ? values.notifyTo.map(item => {
                return item.value
            }).join(',') : null,
            userBudgetPermissions: values.userBudgetPermissions ? values.userBudgetPermissions.map(item => {return {id: item.value};}) : null,
            notifyMessage: values.notifyMessage,
            createdUserId: values.createdUserId,
            lastedUpdateUserId: id ? currentUser.id : null,
            createdDate: id ? values.createdDate : today,
            lastedUpdateDate: id ? moment(today) : null

        };
        if (id) {
            url = '/projectDetail/update';
            bodyObject.id = id;
        }

        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                onHide();
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
        // const { objectProjectDetail, listfile, title, onHide } = this.props;

        const { handleSubmit, submitting, isCloseProject,title, invalid, projectDetailStatus,currentUser,initialValues,createdUserId,lastedUpdateUserId } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show, bsSize: "sm", onHide: this.props.onHide, submitting: this.props.submitting };
        var dataProject = this.state.listAllProjects;
        var id = this.props.idProjectDetail;
        const dataPersonels = this.state.listAllUsers;
        if (!dataPersonels) {
            return null;
        }
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
        var optionsNotifyTo = [];
        dataPersonels.map(item => {
            optionsNotifyTo.push({ label: "Tên: " + item.email, value: item.email })
        })

        var optionUserBudgetPermission = [];
        dataPersonels.map(item => {
            optionUserBudgetPermission.push({ label:  "Email: "+ item.email, value: item.id })
        })
        var optionProject = [];
        dataProject.map(item => {
            optionProject.push({ label: item.name, value: item.id })
        })
        var optionProjectStatus = [
            { label: "Đang Thực Thi", value: "DANG_THUC_THI" },
            { label: "Đã Hoàn Thành", value: "DA_HOAN_THANH" }
        ]

      
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
                                <Field disabled={true} name="projectId" label="Tên Dự Án" placeholder="Chọn dự án..." options={optionProject} component={RenderSelect}></Field>
                                <Field name="name" label="Tên Công Việc" placeholder="Nhập tên dự án..." component={RenderInputWithDiv}></Field>
                                <Field name="note" label="Ghi Chú" placeholder="Nhập ghi chú..." rows={3} component={RenderTextArea}></Field>
                                {id&&isCloseProject==true?<Field name="projectDetailStatus" label="Trạng Thái Công Việc" placeholder="Chọn trạng thái công việc..." options={optionProjectStatus} component={RenderSelect}></Field>: null}
                                {SecurityUtils.hasPermission(currentUser, "admin.projectDetail.allowSetUserBudgetPermission")?<Field name="userBudgetPermissions" label="Cho Phép Thao Tác Ngân Sách" placeholder="Chọn nhân viên..." options={optionUserBudgetPermission} component={RenderMultiSelect}></Field>: null}
                                {projectDetailStatus == "DA_HOAN_THANH" ? <Field name="closedDate" label="Ngày Đóng Dự Án" placeholder="Chọn ngày đóng dự án..." dateFormat="DD/MM/YYYY" component={RenderDatePicker}></Field> : null}
                                <Field name="notifyTo" label="Thông Báo Đến" placeholder="Chọn người bạn muốn thông báo đến..." options={optionsNotifyTo} component={RenderMultiSelect}></Field>
                                <Field name="notifyMessage" label="Nội Dung Thông Báo" placeholder="Nhập nội dung thông báo..." rows={3} component={RenderTextArea}></Field>
                                {/* <Field disabled={true} name="totalRevenue"  label="Tổng Doanh Thu" placeholder="Nhập tổng doanh thu..." thousandSeparator={true} component={RenderMoneyFormat}></Field> */}
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
            form: 'ModalProjectDetail',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalProjectDetail)));
