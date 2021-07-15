import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker, RenderCheckbox, RenderSelect, RenderNumberInput, RenderMoneyFormat, RenderTimeWrapper } from '../../components/formInputs';
import { Field, reduxForm, formValueSelector, reset } from 'redux-form';
import isEmail from 'sane-email-validation';
import { StringUtils, FormatterUtils } from '../../utils/javascriptUtils';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_LABOUR_ATTENDANCE, LOAD_LIST_LABOUR_ATTENDANCE_TODAY, LOAD_LIST_EFFICIENCY } from './action-types';
import { FIRE_REDIRECT } from '../../constants/action-types';
import ListFile from '../../components/ListFile';
import { isNull } from 'util';
import moment from 'moment';
import { LOAD_UPDATING_LABOUR_DTO } from '../labour/action-types';
const validate = values => {

    const errors = {};
    var checkMidnightTime = false;
    var checkOvertimeTime = false;

    if (!values.projectId) {
        errors.projectId =  'Vui lòng chọn dự án chấm công !.' ;
    }
    if (!values.projectDetailId) {
        errors.projectDetailId =  'Vui lòng chọn công việc dự án!.' ;
    }
    if (values.projectDetailId && moment(values.dateToWork)) {
        if (values.listEfficiency) {
            values.listEfficiency.map(item => {
                if (item.projectDetail.id == values.projectDetailId && moment(values.dateToWork) < moment(item.startActualProgressDate)) {
                    errors.dateToWork = "Ngày công không được nhỏ hơn ngày " + moment(item.startActualProgressDate).format("DD/MM/YYYY") + " (ngày bắt đầu thực hiện), vui lòng thử lại!"
                }
            })
        }
    }
    if (moment(values.dateToWork) > moment(today)) {
        errors.dateToWork = 'Không được chấm công ngày tương lai!, vui lòng thử lại!'
    }

    if (!values.startOvertime) {
        errors.startOvertime = "Vui lòng nhập giờ bắt đầu tăng ca."
    }
    // }
    if (values.overtimeStatus == "TANG_CA_THUONG_TOI" && values.startOvertime < "18:00") {
        errors.startOvertime = "Lưu ý: Giờ tăng ca thường chỉ được xét vào lúc 18:00 giờ trở về sau. "
    }
    if (values.startOvertime >= "00:00" && values.startOvertime < "04:30") {
        checkMidnightTime = true
    }
    if (values.endOvertime >= "00:00" && values.endOvertime <= "15:59") {
        checkOvertimeTime = true
    }
    if (values.overtimeStatus == "TANG_CA_KHUYA" && values.startOvertime < "22:00" && checkMidnightTime == false) {
        errors.startOvertime = "Lưu ý: Giờ bắt đầu tăng ca KHUYA chỉ được xét vào lúc 22:00 giờ trở về sau. "

    }
    if (values.overtimeStatus == "TANG_CA_THUONG_TOI" && (values.startOvertime == "22:00" || values.startOvertime > "22:00")) {
        errors.startOvertime = "Lưu ý: Giờ bắt đầu tăng ca Thường không được lớn hơn hoặc bằng 22:00  "
    }
    if (values.overtimeStatus == "TANG_CA_THUONG_TOI" && (values.endOvertime > "22:00" || checkOvertimeTime == true)) {
        errors.endOvertime = "Lưu ý: Giờ về tăng ca Thường không được lớn hơn 22:00. "
    }
    if (!values.id && values.listAttendanceToday && values.labourId) {
        values.listAttendanceToday.map(item => {
            if (item.overtimeStatus != null && item.overtimeStatus == values.overtimeStatus) {
                if (values.labourId == item.labourId && moment(item.dateToWork).format("DD/MM/YYYY") == moment(values.dateToWork).format("DD/MM/YYYY")) {
                    errors.projectId =  "Hôm Nay Nhân công đang có giờ làm " + item.overtimeStatus + " ở dự án: " + item.project.name + " Ngày: " + moment(item.dateToWork).format("DD/MM/YYYY") 
                }
            }
        })
    }
    return errors;
}
const selector = formValueSelector('ModalLabourOvertimeAttendance');
var today = moment(new Date, "DD/MM/YYYY");
const mapStateToProps = state => {
    var labourDto = state.labourReducer.labourDto;
    var listAttendanceToday = state.labourAttendanceReducer.listAttendanceToday;
    var listEfficiency = state.labourAttendanceReducer.listEfficiency;
    var updateValue = {
        ...state.labourAttendanceReducer.updatingLabourAttendance,
        labourId: state.labourAttendanceReducer.updatingLabourAttendance && state.labourAttendanceReducer.updatingLabourAttendance.id ? state.labourAttendanceReducer.updatingLabourAttendance.labourId : (labourDto?labourDto.id: null) ,
        dateToWork: state.labourAttendanceReducer.updatingLabourAttendance && state.labourAttendanceReducer.updatingLabourAttendance.id ? moment(state.labourAttendanceReducer.updatingLabourAttendance.dateToWork) : today,
        absentDate: state.labourAttendanceReducer.updatingLabourAttendance && state.labourAttendanceReducer.updatingLabourAttendance.absentDate ? moment(state.labourAttendanceReducer.updatingLabourAttendance.absentDate) : null,
        notOvertimeDate: state.labourAttendanceReducer.updatingLabourAttendance && state.labourAttendanceReducer.updatingLabourAttendance.notOvertimeDate ? moment(state.labourAttendanceReducer.updatingLabourAttendance.notOvertimeDate) : null,
        uniformBreachDate: state.labourAttendanceReducer.updatingLabourAttendance && state.labourAttendanceReducer.updatingLabourAttendance.uniformBreachDate ? moment(state.labourAttendanceReducer.updatingLabourAttendance.uniformBreachDate) : null,
        safetyBreachDate: state.labourAttendanceReducer.updatingLabourAttendance && state.labourAttendanceReducer.updatingLabourAttendance.safetyBreachDate ? moment(state.labourAttendanceReducer.updatingLabourAttendance.safetyBreachDate) : null,
        constructionBreachDate: state.labourAttendanceReducer.updatingLabourAttendance && state.labourAttendanceReducer.updatingLabourAttendance.constructionBreachDate ? moment(state.labourAttendanceReducer.updatingLabourAttendance.constructionBreachDate) : null,
        lastedUpdateDate: state.labourAttendanceReducer.updatingLabourAttendance && state.labourAttendanceReducer.updatingLabourAttendance.lastedUpdateDate ? moment(state.labourAttendanceReducer.updatingLabourAttendance.lastedUpdateDate) : null,
        startProgressDate: state.labourAttendanceReducer.updatingLabourAttendance && state.labourAttendanceReducer.updatingLabourAttendance.startProgressDate ? moment(state.labourAttendanceReducer.updatingLabourAttendance.startProgressDate) : null,
        endProgressDate: state.labourAttendanceReducer.updatingLabourAttendance && state.labourAttendanceReducer.updatingLabourAttendance.endProgressDate ? moment(state.labourAttendanceReducer.updatingLabourAttendance.endProgressDate) : null,
        lateHour: state.labourAttendanceReducer.updatingLabourAttendance && state.labourAttendanceReducer.updatingLabourAttendance.lateHour ? state.labourAttendanceReducer.updatingLabourAttendance.lateHour.substring(0, 5) : null,
        startDatetime: state.labourAttendanceReducer.updatingLabourAttendance && state.labourAttendanceReducer.updatingLabourAttendance.startDatetime ? state.labourAttendanceReducer.updatingLabourAttendance.startDatetime.substring(0, 5) : null,
        endDatetime: state.labourAttendanceReducer.updatingLabourAttendance && state.labourAttendanceReducer.updatingLabourAttendance.endDatetime ? state.labourAttendanceReducer.updatingLabourAttendance.endDatetime.substring(0, 5) : null,
        totalDatetime: state.labourAttendanceReducer.updatingLabourAttendance && state.labourAttendanceReducer.updatingLabourAttendance.totalDatetime ? state.labourAttendanceReducer.updatingLabourAttendance.totalDatetime : 0,
        startOvertime: state.labourAttendanceReducer.updatingLabourAttendance && state.labourAttendanceReducer.updatingLabourAttendance.startOvertime ? state.labourAttendanceReducer.updatingLabourAttendance.startOvertime.substring(0, 5) : null,
        endOvertime: state.labourAttendanceReducer.updatingLabourAttendance && state.labourAttendanceReducer.updatingLabourAttendance.endOvertime ? state.labourAttendanceReducer.updatingLabourAttendance.endOvertime.substring(0, 5) : null,
        totalOvertime: state.labourAttendanceReducer.updatingLabourAttendance && state.labourAttendanceReducer.updatingLabourAttendance.totalOvertime ? state.labourAttendanceReducer.updatingLabourAttendance.totalOvertime : 0,
        minusLunchHour: state.labourAttendanceReducer.updatingLabourAttendance && state.labourAttendanceReducer.updatingLabourAttendance.minusLunchHour ? state.labourAttendanceReducer.updatingLabourAttendance.minusLunchHour : 0,
        supportFarConstructionStatus: state.labourAttendanceReducer.updatingLabourAttendance && state.labourAttendanceReducer.updatingLabourAttendance.supportFarConstructionStatus ? state.labourAttendanceReducer.updatingLabourAttendance.supportFarConstructionStatus : "KHONG",
        supportTransportFeeStatus: state.labourAttendanceReducer.updatingLabourAttendance && state.labourAttendanceReducer.updatingLabourAttendance.supportTransportFeeStatus ? state.labourAttendanceReducer.updatingLabourAttendance.supportTransportFeeStatus : "KHONG",
        lateStatus: state.labourAttendanceReducer.updatingLabourAttendance && state.labourAttendanceReducer.updatingLabourAttendance.lateStatus ? state.labourAttendanceReducer.updatingLabourAttendance.lateStatus : "KHONG",
        notOvertimeStatus: state.labourAttendanceReducer.updatingLabourAttendance && state.labourAttendanceReducer.updatingLabourAttendance.notOvertimeStatus ? state.labourAttendanceReducer.updatingLabourAttendance.notOvertimeStatus : "KHONG",
        uniformBreachStatus: state.labourAttendanceReducer.updatingLabourAttendance && state.labourAttendanceReducer.updatingLabourAttendance.uniformBreachStatus ? state.labourAttendanceReducer.updatingLabourAttendance.uniformBreachStatus : "KHONG",
        safetyBreachStatus: state.labourAttendanceReducer.updatingLabourAttendance && state.labourAttendanceReducer.updatingLabourAttendance.safetyBreachStatus ? state.labourAttendanceReducer.updatingLabourAttendance.safetyBreachStatus : "KHONG",
        constructionBreachStatus: state.labourAttendanceReducer.updatingLabourAttendance && state.labourAttendanceReducer.updatingLabourAttendance.constructionBreachStatus ? state.labourAttendanceReducer.updatingLabourAttendance.constructionBreachStatus : "KHONG",
        // //////
        createdUserId: state.labourAttendanceReducer.updatingLabourAttendance && state.labourAttendanceReducer.updatingLabourAttendance.createdUserId ? state.labourAttendanceReducer.updatingLabourAttendance.createdUserId : state.common.currentUser.id,
        createdDate: state.labourAttendanceReducer.updatingLabourAttendance && state.labourAttendanceReducer.updatingLabourAttendance.createdDate ? moment(state.labourAttendanceReducer.updatingLabourAttendance.createdDate) : today,
        listAttendanceToday: listAttendanceToday ? listAttendanceToday : null,
        listEfficiency: listEfficiency ? listEfficiency : null
    };
    return {
        initialValues: updateValue,
        currentUser: state.common.currentUser,
        projectIdSelector: selector(state, "projectId"),
        labourIdSelector: selector(state, "labourId"),
        dateToWork: selector(state, "dateToWork"),
        startOvertime: selector(state, "startOvertime"),
        endOvertime: selector(state, "endOvertime"),
        minusLunchHour: selector(state, "minusLunchHour"),
        overtimeStatus: selector(state, "overtimeStatus"),
        lastedUpdateUserId: selector(state,"lastedUpdateUserId"),
        createdUserId: selector(state, "createdUserId"),
    };
};

const mapDispatchToProps = dispatch => ({
    loadLabourAttendance: (payload) =>
        dispatch({ type: LOAD_UPDATING_LABOUR_ATTENDANCE, payload: payload }),
    loadLabourDto: (labourDto) =>
        dispatch({ type: LOAD_UPDATING_LABOUR_DTO, labourDto: labourDto }),
    loadListAttendanceToday: (listAttendanceToday) =>
        dispatch({ type: LOAD_LIST_LABOUR_ATTENDANCE_TODAY, listAttendanceToday: listAttendanceToday }),
    loadListEfficiency: (listEfficiency) =>
        dispatch({ type: LOAD_LIST_EFFICIENCY, listEfficiency: listEfficiency }),
    fireRedirect: (url) =>
        dispatch({ type: FIRE_REDIRECT, toUrl: url }),
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalLabourOvertimeAttendance", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});
class ModalLabourOvertimeAttendance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllProjects: [],
            listAllLabour: [],
            listAllEfficiency: [],
            listAllUsers: []
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        
        this.handleTotalOvertime = (valueStartOverTime, valueEndOverTime, valueMinusHour) => {
            const { updateField, overtimeStatus, startOvertime, endOvertime, minusLunchHour } = this.props;
            if (valueStartOverTime == startOvertime && valueEndOverTime == endOvertime) {
                var startTime = moment(valueStartOverTime, 'hh:mm');
                var endTime = moment(valueEndOverTime, 'hh:mm');
                var hours = moment(endTime).diff(startTime, 'minutes') / 60;
                if (overtimeStatus == "TANG_CA_KHUYA") {
                    if (hours && hours < 0) {
                        var totalOvertimeHours = hours + 24
                        setTimeout(() => {
                            updateField("totalOvertime", FormatterUtils.round2Decimals(totalOvertimeHours) - valueMinusHour);
                        }, 0);
                        }
                     else if (hours && hours > 0) {
                        setTimeout(() => {
                            updateField("totalOvertime", FormatterUtils.round2Decimals(hours) - valueMinusHour);
                        }, 0);
                    }
                } else if (overtimeStatus == "TANG_CA_THUONG_TOI") {
                    if (hours && hours > 0) {
                        setTimeout(() => {
                        updateField("totalOvertime", FormatterUtils.round2Decimals(hours) - valueMinusHour);
                        }, 0);
                    }

                }
            }
        }
        }
    getListEfficiency() {
        const { loadListEfficiency } = this.props;
        let setStateInRequest = (list) => { this.setState({ listAllEfficiency: list }) }
        return agent.asyncRequests.get("/efficiency/listAll").then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
                loadListEfficiency(result);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }

    getListProject() {
        const { projectDto, updateField } = this.props;
        let setStateInRequest = (list) => { this.setState({ listAllProjects: list }) }
        return agent.asyncRequests.get("/project/listAll").then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
                if (projectDto) {
                    updateField("projectId", projectDto.id)
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
        const { loadLabourAttendance, labourDto, loadListAttendanceToday, listProjectLabourWorkTodayDto, loadLabourDto } = this.props;
        var id = this.props.idLabourAttendance;
        if (labourDto) {
            loadLabourDto(labourDto);
        }
        if (!id && listProjectLabourWorkTodayDto) {
            loadListAttendanceToday(listProjectLabourWorkTodayDto)
        }
        const dataPromise = agent.LabourAttendanceApi.getLabourAttendance(id);
        loadLabourAttendance(Promise.resolve(dataPromise));
        this.getListEfficiency();
        this.getListProject();
        this.getListLabour();
        this.getListUser();
    }

    handleAdd(values) {
        const { currentUser, labourDto } = this.props;
        var onHide = this.props.onHide;
        var id = this.props.idLabourAttendance;
        var url = '/labourAttendance/add';
        var today = new Date();
        var bodyObject = {
            labourId: values.labourId,
            projectId: values.projectId,
            dateToWork: values.dateToWork,
            projectDetailId: values.projectDetailId,
            startDatetime: values.startDatetime ? values.startDatetime + ':00' : "00:00:00",
            endDatetime: values.endDatetime ? values.endDatetime + ':00' : "00:00:00",
            totalDatetime: values.totalDatetime ? values.totalDatetime : 0,
            session: values.session,
            overtimeStatus: values.overtimeStatus,
            startOvertime: values.startOvertime ? values.startOvertime + ':00' : "00:00:00",
            endOvertime: values.endOvertime ? values.endOvertime + ':00' : "00:00:00",
            totalOvertime: values.totalOvertime ? values.totalOvertime : 0,
            lateStatus: values.lateStatus,
            lateHour: "00:00:00",
            totalLateHour: values.totalLateHour ? values.totalLateHour : 0,
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
            outTime: id ? 1 : 0,
            createdUserId: values.createdUserId,
            lastedUpdateUserId: id ? currentUser.id : null,
            createdDate: values.createdDate,
            lastedUpdateDate: id ? moment(today) : null,
            minusLunchHour: values.minusLunchHour
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

                toast.error("Không thể lưu trữ CÔNG TĂNG CA: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });

    }

    ///Hide and Clean Value
    handleHideAndClear() {
        const { destroy, onHide, fireRedirect } = this.props;

        // event.preventDefault();
        destroy();
        // reset('ModalLabourAttendance');
        onHide();
        // fireRedirect('/listLabourAttendanceForSupervisor');




    }
    render() {
        // const { objectLabourAttendance, listfile, title, onHide } = this.props;
        const { handleSubmit,
            submitting, title,
            invalid, currentUser,
            initialValues, listProjectLabourWorkTodayDto,
            labourDto, endOvertime, labourIdSelector, dateToWork,
            startOvertime, minusLunchHour, projectIdSelector,lastedUpdateUserId,createdUserId } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show, bsSize: "small", onHide: this.props.onHide, submitting: this.props.submitting };
        var dataProject = this.state.listAllProjects;
        // Not Use List ProjectDetail because that make slow performance
        var dataEfficiency = this.state.listAllEfficiency;
        var dataLabour = this.state.listAllLabour;
        var optionLabours = [];
        var id = this.props.idLabourAttendance;
        dataLabour.map(item => {
            optionLabours.push({ label: item.fullName, value: item.id })
        })
        var optionProject = [];
        var listProject = [];
        var optionProjectDetail = [];
        // Add Project into list to check exist 
        dataProject.map(item => {
            if (labourDto) {
                // if(listCompanyOfLabour){
                labourDto.companies.map(labourCompanies => {
                    if (item.projectYear.company.id == labourCompanies.id && item.projectStatus == 'DANG_THUC_THI') {
                        optionProject.push({ label: item.projectYear.company.name + " - " + item.name, value: item.id });
                    }
                })

                // }
            } else {
                optionProject.push({ label: item.name, value: item.id });
            }

        })
        // Not Use List ProjectDetail because that make slow performance
        if (dataEfficiency) {
            dataEfficiency.map(item => {
                if (item.projectDetail.project.id == projectIdSelector ) {
                    optionProjectDetail.push({ label: item.projectDetail.name, value: item.projectDetail.id });
                }
            })
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
        
        var optionOvertimeStatus = [
            { label: "Tăng Ca Ngày Thường (Tối)", value: "TANG_CA_THUONG_TOI" },
            { label: "Tăng Ca Khuya", value: "TANG_CA_KHUYA" }
        ];

        
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
                                <Field disabled={true} name="labourId" label="Tên Nhân Công" placeholder="Chọn tên nhân viên" options={optionLabours} component={RenderSelect}></Field>
                                <Field disabled={id ? true : false} name="projectId" label="Tên Dự Án" options={optionProject} component={RenderSelect}></Field>
                                <Field disabled={id ? true : false} name="projectDetailId" label="Tên Công Việc" options={optionProjectDetail} component={RenderSelect}></Field>
                                <Field disabled={id ? true : false} name="dateToWork" dateFormat="DD/MM/YYYY" label="Ngày Làm Việc" component={RenderDatePicker}></Field>
                                {  /* Just Show Infomation */}
                                <div style={{ color: 'blue' }}>
                                    <Field disabled={id ? true : false} name="overtimeStatus" label="Trạng Thái Tăng Ca" options={optionOvertimeStatus} component={RenderSelect}></Field>
                                    <Field name="startOvertime" label="Giờ Bắt Đầu Tăng Ca" placeholder="18:00" component={RenderTimeWrapper} onChangeAction={(value) => { this.handleTotalOvertime(value, endOvertime, minusLunchHour) }}></Field>
                                    {id ? <Field name="endOvertime" label="Giờ Kết Thúc Tăng Ca" placeholder="00:00" component={RenderTimeWrapper} onChangeAction={(value) => { this.handleTotalOvertime(startOvertime, value, minusLunchHour) }}></Field> : null}
                                    {id ? <Field disabled={true} name="totalOvertime" label="Tổng Giờ Tăng Ca" component={RenderNumberInput}></Field> : null}
                                </div>
                                {id ? <Field name="minusLunchHour" label="Thời Gian Nghỉ" placeholder="Nhập số giờ..." component={RenderNumberInput} onChangeAction={(value) => {
                                    this.handleTotalOvertime(startOvertime, endOvertime, value);
                                }}></Field> : null}

                                <Field name="note" label="Ghi Chú" placeholder="Nhập Ghi Chú..." rows={3} component={RenderTextArea}></Field>
                                {/* <div style={initialValues.lastedUpdateUserId ? { display: 'block' } : { display: 'none' }}>
                                    <Field disabled={true} name="lastedUpdateUserId" label="Người Chỉnh Sửa Gần Nhất" options={showLastedUpdateUser} component={RenderSelect}></Field>
                                    <Field disabled={true} name="lastedUpdateDate" label="Ngày Chỉnh Sửa Gần Nhất" dateFormat="DD/MM/YYYY" component={RenderDatePicker}></Field> </div> */}
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
            form: 'ModalLabourOvertimeAttendance',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalLabourOvertimeAttendance)));
