import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker, RenderCheckbox, RenderSelect, RenderNumberInput, RenderMoneyFormat, RenderTimeWrapper } from '../../components/formInputs';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import isEmail from 'sane-email-validation';
import { StringUtils, FormatterUtils } from '../../utils/javascriptUtils';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_LABOUR_ATTENDANCE } from './action-types';
import { FIRE_REDIRECT } from '../../constants/action-types';
import ListFile from '../../components/ListFile';
import { isNull } from 'util';
import moment from 'moment';
const validate = values => {

    const errors = {};
    if (!values.project) {
        errors.project = { id: 'Vui lòng chọn dự án chấm công !.' };
    }

    if (!values.overtimeStatus) {
        if (!values.startDatetime || values.startDatetime == "00:00") {
            errors.startDatetime = "Vui lòng nhập giờ bắt đầu làm."
        }
    } else {
        if (!values.startOvertime || values.startOvertime == "00:00") {
            errors.startOvertime = "Vui lòng nhập giờ bắt đầu."
        }
    }
    // if (!values.endDatetime||values.endDatetime=="00:00") {
    //     errors.endDatetime ="Vui lòng nhập giờ kết thúc."
    // }
    // if (!values.startOvertime) {
    //     errors.startOvertime ="Vui lòng nhập giờ bắt đầu."
    // }
    // if (!values.endOvertime||values.endOvertime=="00:00") {
    //     errors.endOvertime ="Vui lòng nhập giờ bắt đầu."
    // }
    return errors;
}
const selector = formValueSelector('ModalSetLabourAbsent');
const mapStateToProps = state => {
    var updateValue = {
        ...state.labourAttendanceReducer.updatingLabourAttendance,
        dateToWork: state.labourAttendanceReducer.updatingLabourAttendance && state.labourAttendanceReducer.updatingLabourAttendance.dateToWork ? moment(state.labourAttendanceReducer.updatingLabourAttendance.dateToWork) : null,
        absentDate: state.labourAttendanceReducer.updatingLabourAttendance && state.labourAttendanceReducer.updatingLabourAttendance.absentDate ? moment(state.labourAttendanceReducer.updatingLabourAttendance.absentDate) : null,
        createdDate: state.labourAttendanceReducer.updatingLabourAttendance && state.labourAttendanceReducer.updatingLabourAttendance.createdDate ? moment(state.labourAttendanceReducer.updatingLabourAttendance.createdDate) : null,
        lastedUpdateDate: state.labourAttendanceReducer.updatingLabourAttendance && state.labourAttendanceReducer.updatingLabourAttendance.lastedUpdateDate ? moment(state.labourAttendanceReducer.updatingLabourAttendance.lastedUpdateDate) : null,
        absentStatus:state.labourAttendanceReducer.updatingLabourAttendance && state.labourAttendanceReducer.updatingLabourAttendance.absentStatus ? state.labourAttendanceReducer.updatingLabourAttendance.absentStatus : "CO_PHEP"
    };
    return {
        initialValues: updateValue,
        currentUser: state.common.currentUser,
    };
};

const mapDispatchToProps = dispatch => ({
    loadLabourAttendance: (payload) =>
        dispatch({ type: LOAD_UPDATING_LABOUR_ATTENDANCE, payload: payload }),
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalSetLabourAbsent", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});
class ModalSetLabourAbsent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllProjects: [],
            listAllLabour: [],
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
    }
    getListProject() {
        const { projectDto, updateField } = this.props;
        let setStateInRequest = (list) => { this.setState({ listAllProjects: list }) }
        return agent.asyncRequests.get("/project/listAll").then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
                if (projectDto) {
                    updateField("project.id", projectDto.id)
                }
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }
    getListLabour() {
        let setStateInRequest = (list) => { this.setState({ listAllLabour: list }) }
        return agent.asyncRequests.get("/labour/listAll").then(function (res) {
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
        const { loadLabourAttendance, labourDto, updateField, currentUser } = this.props;

        this.getListProject();
        this.getListLabour();
        var id = this.props.idLabourAttendance;
        var today = new Date();
        const dataPromise = agent.LabourAttendanceApi.getLabourAttendance(id);
        loadLabourAttendance(Promise.resolve(dataPromise));

        if (labourDto) {
            setTimeout(() => {
                    updateField("labour.id", labourDto.id),
                    updateField("dateToWork", moment(today)),
                    updateField("absentDate", moment(today))
                if (!id) {
                    updateField("createdUser.id", currentUser.id);
                    updateField("createdDate", moment(today));
                }
            }, 100);

        }
        this.getListProject();
        this.getListLabour();
    }

    handleAdd(values) {
        const { currentUser, labourDto } = this.props;
        var onHide = this.props.onHide;
        var id = this.props.idLabourAttendance;
        var url = '/labourAttendance/add';
        var today = new Date();
        var bodyObject = {
            labour: id ? values.labour : labourDto,
            project: values.project,
            dateToWork: values.dateToWork,
            startDatetime: "00:00:00",
            endDatetime: "00:00:00",
            totalDatetime: values.totalDatetime,
            session: values.session,
            overtimeStatus: values.overtimeStatus,
            startOvertime: "00:00:00",
            endOvertime:  "00:00:00",
            totalOvertime: values.totalOvertime,
            lateStatus: values.lateStatus,
            lateHour: "00:00:00",
            totalLateHour: values.totalLateHour,
            absentStatus: values.absentStatus,
            absentDate: values.absentDate,
            absentReason: values.absentReason,
            supportFarConstructionStatus: values.supportFarConstructionStatus,
            supportTransportFeeStatus: values.supportTransportFeeStatus,
            notOvertimeStatus: values.notOvertimeStatus,
            notOvertimeDate: values.notOvertimeDate,
            uniformBreachStatus: values.uniformBreachStatus,
            uniformBreachDate: values.uniformBreachDate,
            safetyBreachStatus: values.safetyBreachStatus,
            safetyBreachDate: values.safetyBreachDate,
            constructionBreachStatus: values.constructionBreachStatus,
            constructionBreachDate: values.constructionBreachDate,
            outTime:  1,
            createdUser: values.createdUser,
            lastedUpdateUser: id ? currentUser : null,
            createdDate: values.createdDate,
            lastedUpdateDate: id ? moment(today) : null
        };
        if (id) {
            url = '/labourAttendance/update';
            bodyObject.id = id;
        }
        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                onHide();
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
        setTimeout(() => {
            destroy();
        }, 100);

    }
    render() {
        // const { objectLabourAttendance, listfile, title, onHide } = this.props;
        const { handleSubmit, submitting, title, invalid, currentUser, initialValues, labourDto} = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"small",  onHide: this.props.onHide, submitting: this.props.submitting };
        var dataProject = this.state.listAllProjects;
        var dataLabour = this.state.listAllLabour;

        var optionProject = [];
        dataProject.map(item => {
            if (labourDto) {
                if (item.projectYear.company.id == labourDto.company.id) {
                    optionProject.push({ label: item.name, value: item.id })
                }
            } else {
                optionProject.push({ label: item.name, value: item.id });
            }

        })
        var optionLabours = [];
        dataLabour.map(item => {
            optionLabours.push({ label: item.fullName, value: item.id })
        })
        var showCreatedUser = [];
        var showLastedUpdateUser = [];
        // Push created user
        showCreatedUser.push({
            label: initialValues.createdUser ? initialValues.createdUser.fullName + " || " + initialValues.createdUser.email
                : currentUser.fullName + " || " + currentUser.email,
            value: initialValues.createdUser ? initialValues.createdUser.id : currentUser.id
        });
        // Push Updated User
        showLastedUpdateUser.push({
            label: initialValues.lastedUpdateUser ? initialValues.lastedUpdateUser.fullName + " || " + initialValues.lastedUpdateUser.email
                : currentUser.fullName + " || " + currentUser.email,
            value: initialValues.lastedUpdateUser ? initialValues.lastedUpdateUser.id : currentUser.id
        });
        var optionAbsentStatus = [{ label: "Có Xin Phép", value: "CO_PHEP" }, { label: "Không Xin Phép", value: "KHONG_PHEP" }]
        var id = this.props.idLabourAttendance;
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
                                {/* Just Load Id To save DATABASE */}
                                <Field disabled={true} name="labour.id" label="Tên Nhân Công" placeholder="Chọn tên nhân viên" options={optionLabours} component={RenderSelect}></Field>
                                <Field disabled={id ? true : false} name="project.id" label="Tên Dự Án" options={optionProject} component={RenderSelect}></Field>
                                <Field name="dateToWork" label="Ngày Vắng Mặt" dataFormat="DD/MM/YYYY" component={RenderDatePicker}></Field>
                                {/* <Field name="absentDate" dataFormat="DD/MM/YYYY" label="Ngày Vắng Mặt" placeholder="Chọn ngày vắng mặt..." component={RenderDatePicker}></Field> */}
                                <Field name="absentStatus" label="Trạng Thái Vắng Mặt" options={optionAbsentStatus} component={RenderSelect}></Field>
                                <Field name="absentReason" label="Lý Do Vắng Mặt" rows={3} component={RenderTextArea}></Field>
                                <Field disabled={true} name="createdUser.id" label="Người Chấm Công" options={showCreatedUser} component={RenderSelect}></Field>
                                <Field disabled={true} name="createdDate" label="Ngày Tạo Bảng" dateFormat="DD/MM/YYYY" component={RenderDatePicker}></Field>
                                <div style={initialValues.lastedUpdateUser ? { display: 'block' } : { display: 'none' }}>
                                    <Field disabled={true} name="lastedUpdateUser.id" label="Người Chỉnh Sửa Gần Nhất" options={showLastedUpdateUser} component={RenderSelect}></Field>
                                    <Field disabled={true} name="lastedUpdateDate" label="Ngày Chỉnh Sửa Gần Nhất" dateFormat="DD/MM/YYYY" component={RenderDatePicker}></Field> </div>
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
            form: 'ModalSetLabourAbsent',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalSetLabourAbsent)));
