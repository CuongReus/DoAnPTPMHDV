import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderTextArea, RenderDatePicker, RenderSelect, RenderNumberInput, RenderMoneyFormat } from '../../components/formInputs';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_EMPLOYEE_ATTENDANCE } from './action-types';
import moment from 'moment';
import { SecurityUtils } from '../../utils/javascriptUtils';

const validate = (values, props) => {
    var weekdays = new Array(
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    );
    const errors = {};
    const { listCurrentAttendance, idEmployeeAttendance } = props;
    if (listCurrentAttendance &&  !idEmployeeAttendance) {
        listCurrentAttendance.map(item => {
            if (values.status == "CO_MAT" && values.attendanceType) {
                if (values.attendanceType.substring(0, 2) != "NG") {
                    if (item.attendanceType.substring(0, 1) == values.attendanceType.substring(0, 1) ) {
                     errors.attendanceType = 'Ngày công đã tồn tại! Vui lòng thử lại.';
                    }
                }
                else if (values.attendanceType.substring(0, 2) == "NG") {
                    if (item.attendanceType.substring(0, 2) == values.attendanceType.substring(0, 2)) {
                        errors.attendanceType = 'Ngày công "Ngoài Giờ" đã tồn tại! Vui lòng thử lại.';
                    }
                }


            }
             else if (values.status == "VANG_MAT" &&values.attendanceType) {
                if (item.status == values.status) {
                    errors.attendanceType = 'Nhân viên đã vắng mặt trong ngày này, vui lòng chọn trạng thái ngày làm khác!';
                }
                else if (item.attendanceType == "X") {
                    errors.attendanceType = 'Không được chấm vắng mặt khi đã có công ngày thường'
                }
                else if(item.attendanceType == "X2" && !values.attendanceType.substring(2,3) &&   values.attendanceType != "NL"){
                    errors.attendanceType = 'Vui lòng chọn ngày nghỉ nữa ngày hoặc ngày lễ, vì hôm nay nhân viên đã làm nữa ngày!';
                }
            }
            if (item.status == "VANG_MAT" &&values.attendanceType) {
                if(item.attendanceType.substring(2,3) == "2"){
                    if(values.attendanceType.substring() =="X"){
                        errors.attendanceType = 'Nhân viên đã vắng mặt nữa ngày này, vui lòng chọn trạng thái công nữa ngày hoặc Ngoài Giờ (NG)!';
                    }
                }
                else{ 
                    if (values.attendanceType.substring(0, 2) != "NG") {
                        errors.attendanceType = 'Nhân viên đã vắng mặt trong ngày này, vui lòng chọn trạng thái công Ngoài Giờ (NG)!';
                    }
                }
             
            }
        })

    }
    if (!values.userId) {
        errors.userId = 'Vui lòng nhập họ tên.';
    }
    if (!values.dateToWork) {
        errors.dateToWork = 'Vui lòng chọn ngày đi làm.';
    }
    
    if (!values.attendanceType) {

        errors.attendanceType = 'Vui lòng chọn trạng thái đi làm.';
    }
    
    if (!values.overtimeType) {

        errors.overtimeType = 'Vui lòng chọn loại giờ công!.';
    }
    if (values.attendanceType && values.attendanceType == "X") {
        if (weekdays[moment(values.dateToWork).day()] == "Sunday") {
            errors.attendanceType = " ";
        }
        if (weekdays[moment(values.dateToWork).day()] == "Saturday") {
            errors.attendanceType = " ";
        }
    }
    if (weekdays[moment(values.dateToWork).day()] != "Sunday" && (values.attendanceType == "NG_CN" || values.attendanceType == "NG_CN2")) {
        errors.attendanceType = " ";
    }
    if (weekdays[moment(values.dateToWork).day()] != "Saturday" && (values.attendanceType == "NG_7" || values.attendanceType == "NG_72")) {
        errors.attendanceType = " ";
    }
    if (values.status =="VANG_MAT" && values.attendanceType && (values.attendanceType.substring(0, 2) == "NG" || values.attendanceType.substring(0, 1) == "X") ) {

        errors.attendanceType = ' ';
    }
    return errors;

}

var today = moment(new Date, "DD/MM/YYYY");
const selector = formValueSelector('ModalEmployeeAttendance');
const mapStateToProps = state => {
    var updateValue = {
        ...state.employeeAttendanceReducer.updatingEmployeeAttendance,
        dateToWork: state.employeeAttendanceReducer.updatingEmployeeAttendance && state.employeeAttendanceReducer.updatingEmployeeAttendance.dateToWork ? moment(state.employeeAttendanceReducer.updatingEmployeeAttendance.dateToWork) : null,
        attendanceType: state.employeeAttendanceReducer.updatingEmployeeAttendance && state.employeeAttendanceReducer.updatingEmployeeAttendance.attendanceType ? state.employeeAttendanceReducer.updatingEmployeeAttendance.attendanceType : "X",
        status: state.employeeAttendanceReducer.updatingEmployeeAttendance && state.employeeAttendanceReducer.updatingEmployeeAttendance.status ? state.employeeAttendanceReducer.updatingEmployeeAttendance.status : "CO_MAT",
        lateStatus: state.employeeAttendanceReducer.updatingEmployeeAttendance && state.employeeAttendanceReducer.updatingEmployeeAttendance.lateStatus ? state.employeeAttendanceReducer.updatingEmployeeAttendance.lateStatus : "KHONG",
        workPlace: state.employeeAttendanceReducer.updatingEmployeeAttendance && state.employeeAttendanceReducer.updatingEmployeeAttendance.workPlace ? state.employeeAttendanceReducer.updatingEmployeeAttendance.workPlace : "Văn Phòng"
    };
    return {
        initialValues: updateValue,
        currentUser: state.common.currentUser,
        dateToWork: selector(state, "dateToWork"),
        status: selector(state, "status"),
        attendanceType: selector(state,"attendanceType")
    };
};

const mapDispatchToProps = dispatch => ({
    loadEmployeeAttendance: (payload) =>
        dispatch({ type: LOAD_UPDATING_EMPLOYEE_ATTENDANCE, payload: payload }),
    loadEmployeeDto: (payload) =>
        dispatch({ type: LOAD_EMPLOYEE_DTO, payload: payload }),
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalEmployeeAttendance", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});

class ModalEmployeeAttendance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllUser: [],
            isShowOvertimeType: false
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.handleDeleteAttendance=(id)=> {
            const { currentUser,onHide } = this.props;
            if (SecurityUtils.hasPermission(currentUser, "admin.employeeAttendance.delete")) {
                return agent.asyncRequests.get( "/countEmployeeAttentdence?id=" +id
                ).then(function (res) {
                    var result = res.body.resultData;
                        if (result && !result.error) {
                            if(result.length == 0){
                                var url = `/employeeAttendance/${id}`;
                                return agent.asyncRequests.del(url
                                ).then(function (res) {
                                var result = res.body.resultData;
                                    if (result && !result.error) {
                                        onHide();
                                    } else {
                                        toast.error("Có lỗi khi xoá dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                                    }
                                }, function (err) {
                                toast.error("Không thể xóa dữ liệu đang được sử dụng từ màn hình khác!", { autoClose: 15000 });
                                });
                            
                            }else{

                                if (confirm("Ngày công này có liên quan đến: " + result.length + " ngày công khác, Bạn có chắc sẽ xoá tất cả ngày công liên quan!")) {
            
                                    var url = `/employeeAttendance/${id}`;
                                    return agent.asyncRequests.del(url
                                    ).then(function (res) {
                                    var result = res.body.resultData;
                                        if (result && !result.error) {
                                            onHide();
                                        } else {
                                            toast.error("Có lỗi khi xoá dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                                        }
                                    }, function (err) {
                                    toast.error("Không thể xóa dữ liệu đang được sử dụng từ màn hình khác!", { autoClose: 15000 });
                                    });
                                }
                            }
                        } else {
                            toast.error("Có lỗi khi xoá dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                        }
                    }, function (err) {
                    toast.error("Không thể xóa dữ liệu đang được sử dụng từ màn hình khác!", { autoClose: 15000 });
                    });
                    
            }
          };
        this.handleChangeAttendanceType=(attendanceType)=>{
            const {updateField} = this.props;
            if(attendanceType){
                updateField("overtimeType",null);
            }
        }
        this.handleShowLeaveLetterModal = (values)=>{
            const {onHide} = this.props;
            onHide();
            this.props.showLeaveLetterModal(values);
            
        }
        this.handleChangeAttendanceStatus= (status) =>{
            const {updateField} =this.props;
            if(status){
                updateField("attendanceType",null);
                 
            }
        }
        this.handleCheckAbsentType= (absentType)=>{
            const {updateField,employeeDto} = this.props;
            if(absentType&&employeeDto){ 
                if((absentType=="PN" || absentType =="KP") &&employeeDto.annualLeaveNumberRemaining != null&& employeeDto.annualLeaveNumberRemaining > 0){
                    updateField("minusLeaveDayStatus","CO")
                }else{
                    updateField("minusLeaveDayStatus","KHONG")
                }
            }
        }
    };

    getListUserforEmployee() {
        const { updateField, employeeDto, dayToAttendance } = this.props;
        let setStateInRequest = (list) => { this.setState({ listAllUser: list }) }
        return agent.asyncRequests.get("/user/listAll").then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
                if (employeeDto && dayToAttendance) {
                    setTimeout(() => {
                        updateField("userId", employeeDto.id);
                        updateField("dateToWork", moment(dayToAttendance));
                    }, 100);
                }
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    };

    componentWillMount() {
        const { loadEmployeeAttendance } = this.props;
        var id = this.props.idEmployeeAttendance;
            const dataPromise = agent.EmployeeAttendanceApi.getEmployeeAttendance(id);
            loadEmployeeAttendance(Promise.resolve(dataPromise));

        this.getListUserforEmployee();
        // this.checkDayAndUpdateField();
    }

    handleAdd(values) {
        var onHide = this.props.onHide;
        const { dayToAttendance } = this.props;
        var id = this.props.idEmployeeAttendance;
        var url = '/employeeAttendance/add';
        var bodyObject = {
            userId: values.userId,
            dateToWork: values.dateToWork,
            attendanceType: values.attendanceType,
            status: values.status,
            workPlace: values.workPlace,
            lateStatus: values.lateStatus,
            overtimeType: values.overtimeType,
        };
        if (id) {
            url = '/employeeAttendance/update';
            bodyObject.id = id;
        }

        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                onHide();
                
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
        onHide();
        destroy();
    };

    render() {
        const { handleSubmit, submitting, title, invalid, status, initialValues, currentUser, dateToWork, dayToAttendance, employeeDto,attendanceType } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show, bsSize: "sm", onHide: this.props.onHide, submitting: this.props.submitting };
        const dataUser = this.state.listAllUser;
        var isShowOvertimeType = this.state.isShowOvertimeType;
        var totalLeaveYearRemain = employeeDto && employeeDto.annualLeaveNumberRemaining !=null ? employeeDto.annualLeaveNumberRemaining: 0;


    
        var optionUser = [];
        dataUser.map(item => {
            optionUser.push({ label: item.fullName, value: item.id })
        });
        
        var weekdays = new Array(
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        );
        var weekdaysVI = new Array(
            "Chủ Nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"
        );
        
        
        var optionAttendanceType = [];
        
        if (dateToWork && status) {
                if (status == "CO_MAT") {
                    if (weekdays[moment(dateToWork).day()] == "Sunday") {
                        optionAttendanceType.push({ value: "NG_CN", label: "NG_CN - Ngày chủ nhật" },
                        { value: "NG_CN2", label: "NG_CN2 - Ngày chủ nhật nửa ngày",disabled:true },
                        { value: "NG_L", label: "NG_L - Ngày lễ" },
                        
                        );
                        isShowOvertimeType = true;
                    }
                    else if (weekdays[moment(dateToWork).day()] == "Saturday") {
                        
                        optionAttendanceType.push( 
                            { value: "X2", label: "X2 - Đi làm nửa ngày" },
                            { value: "NG_7", label: "NG_7 - Ngoài giờ thứ 7" },
                        { value: "NG_72", label: "NG_72 - Ngoài giờ Thứ 7 nửa ngày",disabled:true },
                        { value: "NG_L", label: "NG_L - Ngày lễ" },
                        
                        );
                        if(employeeDto.department && employeeDto.department.workOnWeekendStatus =="CO"){
                            optionAttendanceType.unshift({ value: "X", label: "X - Đi làm bình thường" },
                            )
                        }
                    } else if (weekdays[moment(dateToWork).day()] != "Sunday"
                        && weekdays[moment(dateToWork).day()] != "Saturday") {
                        optionAttendanceType.push({ value: "X", label: "X - Đi làm bình thường" },
                            { value: "X2", label: "X2 - Đi làm bình thường (nửa ngày)" },
                            { value: "NG_X", label: "NG_X - Ngoài giờ ngày thường" },
                            { value: "NG_L", label: "NG_L - Ngày lễ" },
                            );
                    }
                } else if (status == "VANG_MAT") {
                    totalLeaveYearRemain = employeeDto && employeeDto.annualLeaveNumberRemaining !=null ? employeeDto.annualLeaveNumberRemaining: 0;
                    optionAttendanceType = [{ value: "NL", label: "NL - Nghỉ lễ" },
                    { value: "NL2", label: "NL2 - Nghỉ lễ nửa ngày" },
                  
                    { value: "KP", label: "KP -  Nghỉ không phép" },
                    { value: "KP2", label: "KP2 -  Nghỉ không phép nửa ngày" },
                    { value: "NB", label: "NB -  Nghỉ bù" },
                    { value: "NB2", label: "NB2 -  Nghỉ bù nửa ngày" }
                ]
                
                    optionAttendanceType.unshift({ value: "PN", label: "PN - Nghỉ phép năm" }, { value: "PN2", label: "PN2 -  Nghỉ phép năm nửa ngày" })
                
                }

        }
        if(attendanceType == "NG_L" || attendanceType ==  "NG_L2" ||attendanceType ==  "NG_X" || attendanceType == "NG_7"||attendanceType=="NG_72"){
            isShowOvertimeType = true;
        }
        var optionStatus = [{ label: "Có Mặt", value: "CO_MAT" },
        { label: "Vắng Mặt", value: "VANG_MAT" }
    ];
        var optionWorkplace = [
            { label: "Văn Phòng", value: "Văn Phòng" },
            { label: "Công Trường", value: "Công Trường" },
            { label: "Khác", value: "Khác" }
        ];
        var optionOvertimeType =[{label:"Dưới 5H-30", value:"DUOI_5H_30"},{label:"Trên 5H-30", value:"TREN_5H_30"}];
        var optionLateStatus = [{ label: "Có", value: "CO" }, { label: "Không", value: "KHONG" }];

        var id = this.props.idEmployeeAttendance;
        var newModal = null;
        newModal =
            <div style={{ width: '30%' }}>
                <Modal
                    {...modalConfig}
                    aria-labelledby="contained-modal-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-sm"><center>{id ? <span style={{color:'orange'}}>{"Chỉnh Sửa " + title} </span>:<span style={{color:'green'}}> {"Thêm Mới " + title}</span>}<br/>{weekdaysVI[moment(dateToWork).day()]}</center> </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {submitting ? null :
                            <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.handleAdd)}>
                                <Field disabled={true} name="userId" label="Tên Nhân Viên" placeholder="Tên Nhân Viên..." options={optionUser} component={RenderSelect}></Field>
                                <Field disabled={true} name="dateToWork" dateFormat="DD/MM/YYYY" label="Ngày Làm" component={RenderDatePicker}></Field> 
                                <Field disabled={id ? true:false} name="status" label="Trạng Thái" placeholder="Chọn trạng thái..." options={optionStatus} component={RenderSelect} onChangeAction={(value)=>this.handleChangeAttendanceStatus(value)}></Field>
                              
                                <Field disabled={id ? true:false} name="attendanceType" label="Loại Ngày Công" placeholder="Loại ngày công.." options={optionAttendanceType} component={RenderSelect} onChangeAction={(value)=>{this.handleChangeAttendanceType(value);status == "VANG_MAT" ?this.handleCheckAbsentType(value):null}}></Field>
                                {isShowOvertimeType? <Field name="overtimeType" disabled={id ? true:false} label="Loại Giờ Làm Việc" placeholder="Chọn loại giờ làm việc.." options={optionOvertimeType} component={RenderSelect}></Field>:null}
                                <Field name="workPlace" label="Nơi làm việc" placeholder="Chọn nơi làm việc..." options={optionWorkplace} component={RenderSelect}></Field>
                                <Field name="lateStatus" label="Trạng thái đi trể" placeholder="Chọn trạng thái đi trể..." options={optionLateStatus} component={RenderSelect}></Field>
                                <div >
                                <div style={{display:'inline-flex',float:'right'}} >
                                    <button type="button" className="btn btn-link" onClick={this.handleHideAndClear} >Hủy</button>
                                  { (attendanceType  == "PN" || attendanceType == "PN2")  ?  <button onClick={handleSubmit(this.handleShowLeaveLetterModal)} className="btn bg-primary" disabled={submitting || invalid}>Tạo Đơn</button>
                                  :<button type="submit" className="btn bg-orange" disabled={submitting || invalid}>Lưu</button>  }
                           

                                </div>
                                <div >
                                {id && SecurityUtils.hasPermission(currentUser, "admin.employeeAttendance.delete")?  <button type="button" className="btn btn-link" onClick={()=>this.handleDeleteAttendance(id)} ><i style={{color:'red'}} className="icon-bin"></i></button>:<br/>}
                                </div>
                                
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
            form: 'ModalEmployeeAttendance',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalEmployeeAttendance)));
