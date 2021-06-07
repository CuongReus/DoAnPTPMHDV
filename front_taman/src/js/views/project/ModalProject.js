import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker, RenderCheckbox, RenderSelect, RenderNumberInput, RenderMoneyFormat, RenderMultiSelect } from '../../components/formInputs';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import isEmail from 'sane-email-validation';
import { StringUtils } from '../../utils/javascriptUtils';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_PROJECT, LOAD_PROJECT_YEAR_DTO } from './action-types';
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
        errors.name = 'Vui lòng nhập tên dư án.';
    }
    if (values.projectStatus == "DA_HOAN_THANH" && !values.closedDate) {
        errors.closedDate = 'Vui lòng chọn ngày đóng dự án';
    }
    return errors;
}
const selector = formValueSelector("ModalProject");
var today = moment(new Date, "DD/MM/YYYY");
const mapStateToProps = state => {
    var projectYearDto = state.projectReducer.projectYearDto;
    var updateValue = {
        ...state.projectReducer.updatingProject,
        projectYearId: projectYearDto ? projectYearDto.id : null,
        closedDate: state.projectReducer.updatingProject && state.projectReducer.updatingProject.closedDate ? moment(state.projectReducer.updatingProject.closedDate) : null,
        projectStatus: state.projectReducer.updatingProject && state.projectReducer.updatingProject.projectStatus ? state.projectReducer.updatingProject.projectStatus : 'DANG_THUC_THI',
        projectType: state.projectReducer.updatingProject && state.projectReducer.updatingProject.projectType ? state.projectReducer.updatingProject.projectType : 'CO_DOANH_THU',
        notifyTo: null,
        notifyMessage: null,
        createdDate: state.projectReducer.updatingProject && state.projectReducer.updatingProject.createdDate ? moment(state.projectReducer.updatingProject.createdDate) : today,
        lastedUpdateDate: state.projectReducer.updatingProject && state.projectReducer.updatingProject.lastedUpdateDate ? moment(state.projectReducer.updatingProject.lastedUpdateDate) : null,
        createdUserId: state.projectReducer.updatingProject && state.projectReducer.updatingProject.createdUserId ? state.projectReducer.updatingProject.createdUserId : state.common.currentUser.id
    };
    return {
        initialValues: updateValue,
        projectStatus: selector(state, "projectStatus"),
        currentUser: state.common.currentUser,
        lastedUpdateUserId: selector(state, "lastedUpdateUserId"),
        createdUserId: selector(state, "createdUserId"),
    };
};

const mapDispatchToProps = dispatch => ({
    loadProject: (payload) =>
        dispatch({ type: LOAD_UPDATING_PROJECT, payload: payload }),
    loadProjectYearDto: (projectYearDto) =>
        dispatch({ type: LOAD_PROJECT_YEAR_DTO, projectYearDto: projectYearDto }),
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalProject", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});




class ModalProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllYears: [],
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
    getListProjectYear() {
        let setStateInRequest = (list) => { this.setState({ listAllYears: list }) }
        return agent.asyncRequests.get("/projectYear/listAll").then(function (res) {
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
        const { loadProject, loadProjectYearDto, yearDto } = this.props;
        var id = this.props.idProject;
        const dataPromise = agent.ProjectApi.getProject(id);
        loadProject(Promise.resolve(dataPromise));
        if (yearDto) {
            loadProjectYearDto(yearDto)
        }
        return (
            this.getListProjectYear(),
            this.getListUser()
        )

    }


    handleAdd(values) {
        var onHide = this.props.onHide;
        const {currentUser} = this.props;
        var id = this.props.idProject;
        var url = '/project/add';
        var today = new Date();
        var bodyObject = {
            projectYearId: values.projectYearId,
            name: values.name,
            note: values.note,
            totalRevenue: values.totalRevenue ? values.totalRevenue : 0,
            totalProfit: values.totalProfit ? values.totalProfit : 0,
            projectStatus: values.projectStatus,
            closedDate: values.closedDate,
            projectType: values.projectType,
            notifyTo: values.notifyTo ? values.notifyTo.map(item => {
                return item.value
            }).join(',') : null,
            notifyMessage: values.notifyMessage,
            createdUserId: values.createdUserId,
            lastedUpdateUserId: id ? currentUser.id : null,
            createdDate: id ? values.createdDate : today,
            lastedUpdateDate: id ? moment(today) : null

        };
        if (id) {
            url = '/project/update';
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
        // const { objectProject, listfile, title, onHide } = this.props;

        const { handleSubmit, submitting, title, invalid, projectStatus,initialValues, createdUserId, lastedUpdateUserId,currentUser } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show, bsSize: "sm", onHide: this.props.onHide, submitting: this.props.submitting };
        const dataProjectYear = this.state.listAllYears;
        const dataPersonels = this.state.listAllUsers;
        var id = this.props.idProject;
        if (!dataPersonels) {
            return null;
        }
        var optionYears = [];
        dataProjectYear.map(item => {
            optionYears.push({ label: item.year, value: item.id })
        })
        var optionsNotifyTo = [];
        dataPersonels.map(item => {
            optionsNotifyTo.push({ label: "Tên: " + item.email, value: item.email })
        })
        var optionProjectStatus = [
            { label: "Đang Thực Thi", value: "DANG_THUC_THI" },
            { label: "Đã Hoàn Thành", value: "DA_HOAN_THANH" }
        ]
        var optionProjectType = [
            { label: "Có Doanh Thu", value: "CO_DOANH_THU" },
            { label: "Ngoài Doanh Thu", value: "NGOAI_DOANH_THU" }
        ]
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
                                <Field disabled={true} name="projectYearId" label="Năm" placeholder="Chọn năm..." options={optionYears} component={RenderSelect}></Field>
                                <Field name="name" label="Tên Dự Án" placeholder="Nhập tên dự án..." component={RenderInputWithDiv}></Field>
                                <Field name="note" label="Ghi Chú" placeholder="Nhập ghi chú..." rows={3} component={RenderTextArea}></Field>
                                <Field name="projectStatus" label="Trạng Thái Dự Án" placeholder="Chọn trạng thái dự án..." options={optionProjectStatus} component={RenderSelect}></Field>
                                {projectStatus == "DA_HOAN_THANH" ? <Field name="closedDate" label="Ngày Đóng Dự Án" placeholder="Chọn ngày đóng dự án..." dateFormat="DD/MM/YYYY" component={RenderDatePicker}></Field> : null}
                                <Field name="notifyTo" label="Thông Báo Đến" placeholder="Chọn người bạn muốn thông báo đến..." options={optionsNotifyTo} component={RenderMultiSelect}></Field>
                                <Field name="notifyMessage" label="Nội Dung Thông Báo" placeholder="Nhập nội dung thông báo..." rows={3} component={RenderTextArea}></Field>
                                <Field name="projectType" label="Loại Dự Án" placeholder="Chọn Loại Dự Án..." options={optionProjectType} component={RenderSelect}></Field>
                                <Field disabled={true} name="createdUserId" label="Người Tạo Bảng" options={showCreatedUser} component={RenderSelect}></Field>
                                {id ? <Field disabled={true} name="createdDate" label="Ngày Tạo Bảng" dateFormat="DD/MM/YYYY" component={RenderDatePicker}></Field> : null}
                                <div style={initialValues.lastedUpdateUserId ? { display: 'block' } : { display: 'none' }}>
                                    <Field disabled={true} name="lastedUpdateUserId" label="Người Chỉnh Sửa Gần Nhất" options={showLastedUpdateUser} component={RenderSelect}></Field>
                                    <Field disabled={true} name="lastedUpdateDate" label="Ngày Chỉnh Sửa Gần Nhất " dateFormat="DD/MM/YYYY" component={RenderDatePicker}></Field> </div>
                                {/* <Field disabled={true} name="totalRevenue"  label="Tổng Doanh Thu" placeholder="Nhập tổng doanh thu..." thousandSeparator={true} component={RenderMoneyFormat}></Field> */}
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
            form: 'ModalProject',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalProject)));
