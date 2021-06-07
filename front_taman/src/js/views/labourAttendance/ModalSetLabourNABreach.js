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
import { LOAD_UPDATING_LABOUR_DTO } from '../labour/action-types';
import moment from 'moment';
const validate = values => {
   
    const errors = {};
    if (!values.projectId) {
        errors.projectId ='Vui lòng chọn dự án chấm công !.';
    }
    if (!values.projectDetailId) {
        errors.projectDetailId ='Vui lòng chọn công việc dự án!.' ;
    }
    if(!values.overtimeStatus){
        if (!values.startDatetime || values.startDatetime=="00:00" ) {
            errors.startDatetime ="Vui lòng nhập giờ bắt đầu làm."
        }
    }else{
        if (!values.startOvertime || values.startOvertime=="00:00") {
                errors.startOvertime ="Vui lòng nhập giờ bắt đầu."
            }
    }
    return errors;
}
const selector = formValueSelector('ModalSetLabourNABreach');
var today = moment(new Date,"DD/MM/YYYY");
const mapStateToProps = state => {
     var labourDto = state.labourReducer.labourDto;
    var updateValue = {
        ...state.labourAttendanceReducer.updatingLabourAttendance,
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
        labourId:state.labourAttendanceReducer.updatingLabourAttendance&& state.labourAttendanceReducer.updatingLabourAttendance.id ? state.labourAttendanceReducer.updatingLabourAttendance.labourId : labourDto.id,
        createdUserId:state.labourAttendanceReducer.updatingLabourAttendance && state.labourAttendanceReducer.updatingLabourAttendance.createdUserId ?  state.labourAttendanceReducer.updatingLabourAttendance.createdUserId: state.common.currentUser ,
        createdDate: state.labourAttendanceReducer.updatingLabourAttendance && state.labourAttendanceReducer.updatingLabourAttendance.createdDate ? moment(state.labourAttendanceReducer.updatingLabourAttendance.createdDate) : today,
    
    
    };
    return {
        initialValues: updateValue,
        currentUser: state.common.currentUser,
        startDatetime: selector(state, "startDatetime"),
        endDatetime: selector(state, "endDatetime"),
        startOvertime: selector(state, "startOvertime"),
        endOvertime: selector(state, "endOvertime"),
        lastedUpdateUserId: selector(state,"lastedUpdateUserId"),
        createdUserId: selector(state, "createdUserId"),
    };
};

const mapDispatchToProps = dispatch => ({
    loadLabourAttendance: (payload) =>
        dispatch({ type: LOAD_UPDATING_LABOUR_ATTENDANCE, payload: payload }),
        loadLabourDto: (labourDto) =>
        dispatch({ type: LOAD_UPDATING_LABOUR_DTO, labourDto: labourDto }),
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalSetLabourNABreach", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});
class ModalSetLabourNABreach extends React.Component {
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
    getListEfficiency() {
        let setStateInRequest = (list) => { this.setState({ listAllEfficiency: list }) }
        return agent.asyncRequests.get("/efficiency/listAll").then(function (res) {
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
        this.getListEfficiency();
        this.getListUser();
        var id = this.props.idLabourAttendance;
        if (labourDto) {
            loadLabourDto(labourDto);
        }
        const dataPromise = agent.LabourAttendanceApi.getLabourAttendance(id);
        loadLabourAttendance(Promise.resolve(dataPromise));
    }

    handleAdd(values) {
        const { currentUser,labourDto } = this.props;
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
            totalDatetime: values.totalDatetime ? values.totalDatetime: 0,
            session: values.session,
            overtimeStatus: values.overtimeStatus,
            startOvertime: values.startOvertime ? values.startOvertime + ':00' : "00:00:00",
            endOvertime: values.endOvertime ? values.endOvertime + ':00' : "00:00:00",
            totalOvertime: values.totalOvertime ? values.totalOvertime : 0,
            lateStatus: values.lateStatus,
            lateHour: "00:00:00",
            totalLateHour: values.totalLateHour ? values.totalLateHour: 0  ,
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
            outTime: values.outTime,
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
        const { handleSubmit, submitting, title,createdUserId,
            lastedUpdateUserId, invalid, currentUser, initialValues, labourDto, endDatetime, startDatetime, startOvertime, endOvertime } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"sm",  onHide: this.props.onHide, submitting: this.props.submitting };
        var dataProject = this.state.listAllProjects;
        var id = this.props.idLabourAttendance;
        var dataLabour =this.state.listAllLabour;
         // Not Use List ProjectDetail because that make slow performance
         var dataEfficiency= this.state.listAllEfficiency;
        var optionProject = [];
        var optionProjectDetail = [];
        dataProject.map(item => {
            if (labourDto) {
                // if(listCompanyOfLabour){
                    labourDto.companies.map(labourCompanies=>{
                        if (item.projectYear.company.id == labourCompanies.id) {
                            // if (listProjectLabourWorkTodayDto) {
                            //     listProject.push(item);
        
                            // } 
                            // else {
                                optionProject.push({ label: item.projectYear.company.name +" - "+item.name, value: item.id });
                            // }
                        }
                    })
               
            // }
            } else {
                // if (listProjectLabourWorkTodayDto) {
                //     listProject.push(item);
                // }
                // else {
                    optionProject.push({ label: item.name, value: item.id });
                // }
            }

        })

        dataEfficiency.map(item=>{
            optionProjectDetail.push({label:item.projectDetail.name,value:item.projectDetail.id});
        })
        var optionLabours = [];
        dataLabour.map(item=>{
            optionLabours.push({label:item.fullName, value: item.id})
        })
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
        var optionSessions = [{ label: "Sáng", value: "SANG" }, { label: "Tối", value: "TOI" }];
        var optionLateStatus = [{ label: "Có", value: "CO" }, { label: "Không", value: "KHONG" }];
        var optionNotOvertime = [{ label: "Có", value: "CO" }, { label: "Không", value: "KHONG" }];
        var optionsUniformBreach = [{ label: "Có", value: "CO" }, { label: "Không", value: "KHONG" }];
        var optionSafetyBreach = [{ label: "Có", value: "CO" }, { label: "Không", value: "KHONG" }];
        var optionsConstructionBreach = [{ label: "Có", value: "CO" }, { label: "Không", value: "KHONG" }];
        var optionAbsentStatus = [{ label: "Có", value: "CO" }, { label: "Không", value: "KHONG" }]
        var optionOvertimeStatus = [
            // {label:"Tăng Ca Thường(Sáng)", value:"TANG_CA_THUONG_SANG"},
            { label: "Tăng Ca Ngày Thường (Tối)", value: "TANG_CA_THUONG_TOI" },
            { label: "Tăng Ca Chủ Nhật", value: "TANG_CA_CN" }
            // { label: "Tăng Ca Chủ Nhật(Sáng)", value: "TANG_CA_CN_SANG" },
            // { label: "Tăng Ca Chủ Nhật(Tối)", value: "TANG_CA_CN_TOI" },
            // {label:"Tăng Ca Ngày Lễ(Sáng)", value:"TANG_CA_NGAY_LE_SANG"},
            // {label:"Tăng Ca Ngày Lễ(Tối)", value:"TANG_CA_NGAY_LE_TOI"}
        ];

        var optionFarConstructionStatus = [{ label: "Có", value: "CO" }, { label: "Không", value: "KHONG" }]
        var optionTransportFeeStatus = [{ label: "Có", value: "CO" }, { label: "Không", value: "KHONG" }]
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
                                <Field disabled={true} name="labourId" label="Tên Nhân Công" placeholder="Chọn tên nhân viên"  options={optionLabours} component={RenderSelect}></Field>
                                <Field disabled={true} name="projectId" label="Tên Dự Án" options={optionProject} component={RenderSelect}></Field>
                                <Field disabled={id ? true : false} name="projectDetailId" label="Tên Công Việc" options={optionProjectDetail} component={RenderSelect}></Field>
                                <Field disabled={true} name="dateToWork" dateFormat="DD/MM/YYYY" label="Ngày Làm Việc" component={RenderDatePicker}></Field>
                                {  /* Just Show Infomation */}
                                <Field disabled={true} name="startDatetime" label="Giờ Bắt Đầu" placeholder="00:00" component={RenderTimeWrapper} ></Field>
                                <Field disabled={true} name="endDatetime" label="Giờ Kết Thúc" placeholder="00:00" component={RenderTimeWrapper} ></Field>
                                <Field disabled={true} name="totalDatetime" label="Tổng Giờ Làm" component={RenderNumberInput}></Field>
                                {/* <Field name="session" label="Ca Làm Việc" placeholder="Ca Làm Việc" options={optionSessions} component={RenderSelect}></Field> */}
                                {id ? <Field disabled={true} name="minusLunchHour" label="Thời Gian Nghỉ" placeholder="Nhập số giờ..." component={RenderNumberInput} ></Field>: null}
                                {/* <Field name="notOvertimeStatus" label="Không Tăng Ca" options={optionNotOvertime} component={RenderSelect}></Field> */}
                                {/* <Field name="notOvertimeDate" label="Ngày Không Tăng Ca" dataFormat="DD/MM/YYYY" component={RenderDatePicker}></Field> */}
                                <Field name="uniformBreachStatus" label="Trạng Thái Vi Phạm Đồng Phục" options={optionsUniformBreach} component={RenderSelect}></Field>
                                {/* <Field name="uniformBreachDate" label="Ngày Vi Phạm" dataFormat="DD/MM/YYYY" component={RenderDatePicker}></Field> */}
                                <Field name="safetyBreachStatus" label="Trạng Thái Vi Phạm An Toàn" options={optionSafetyBreach} component={RenderSelect}></Field>
                                {/* <Field name="safetyBreachDate" dataFormat="DD/MM/YYYY" label="Ngày Vi Phạm An Toàn" component={RenderDatePicker}></Field> */}
                                <Field name="constructionBreachStatus" label="Trạng Thái Vi Phạm Thi Công" options={optionsConstructionBreach} component={RenderSelect}></Field>
                                {/* <Field name="constructionBreachDate" dataFormat="DD/MM/YYYY" label="Ngày Vi Phạm Thi Công" component={RenderDatePicker}></Field> */}
                                <Field name="note" label="Ghi Chú" placeholder="Nhập Ghi Chú..." rows={3} component={RenderTextArea}></Field>
                                <Field disabled={true} name="createdUserId" label="Người Tạo Bảng" options={showCreatedUser} component={RenderSelect}></Field>
                                <Field disabled={true} name="createdDate" label="Ngày Tạo Bảng" dateFormat="DD/MM/YYYY" component={RenderDatePicker}></Field>
                                <div style={initialValues.lastedUpdateUserId ? { display: 'block' } : { display: 'none' }}>
                                    <Field disabled={true} name="lastedUpdateUserId" label="Người Chỉnh Sửa Gần Nhất" options={showLastedUpdateUser} component={RenderSelect}></Field>
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
            form: 'ModalSetLabourNABreach',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalSetLabourNABreach)));
