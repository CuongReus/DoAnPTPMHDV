import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker,RenderCheckbox, RenderSelect, RenderNumberInput, RenderMoneyFormat } from '../../components/formInputs';
import { Field, reduxForm,formValueSelector } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import {LOAD_UPDATING_EMPLOYEE_SALARY} from './action-types';
import moment from 'moment';

const validate = values => {
    const errors = {};
    return errors;
}
const selector = formValueSelector("ModalEmployeeSalary");
const mapStateToProps = state => {
    var updateValue = {
        ...state.employeeSalaryReducer.updatingEmployeeSalary,
        lastedUpdateDate: state.employeeSalaryReducer.updatingEmployeeSalary && state.employeeSalaryReducer.updatingEmployeeSalary.lastedUpdateDate ? moment(state.employeeSalaryReducer.updatingEmployeeSalary.lastedUpdateDate) : null,

    };
    return {
        initialValues: updateValue,
        currentUser: state.common.currentUser,
        salaryPerMonth: selector(state,"salaryPerMonth"),
        lastedUpdateUserId: selector(state,"lastedUpdateUserId"),
        responsibilityAllowance: selector(state,"responsibilityAllowance")

    };
};

const mapDispatchToProps = dispatch => ({
        loadEmployeeSalary: (payload) => 
        dispatch({ type: LOAD_UPDATING_EMPLOYEE_SALARY, payload: payload }),
        updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalEmployeeSalary", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});
class ModalEmployeeSalary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllEmployee: []
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.hanleCalcInsuranceSalary=(salaryPerMonth,responsibilityAllowance)=>{
            const {updateField} = this.props;
            var salaryPerMonth = salaryPerMonth ? salaryPerMonth :0;
            var responsibilityAllowance = responsibilityAllowance ? responsibilityAllowance :0;
            if(salaryPerMonth || responsibilityAllowance){  
                updateField("insuranceSalary",parseInt(salaryPerMonth)+parseInt(responsibilityAllowance));
            }

        }
    }
    // getListEmployee() {
    //     let setStateInRequest = (list) => { this.setState({ listAllEmployee: list }) }
    //     return agent.asyncRequests.get("/employee/listAll").then(function (res) {
    //         var result = res.body.resultData;
    //         if (result) {
    //             setStateInRequest(result);
    //         } else {
    //             toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
    //         }
    //     }, function (err) {
    //         toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
    //     });
    // }
  componentWillMount() {
        const { loadEmployeeSalary } = this.props;
        let setStateInRequest = (list) => { this.setState({ listAllEmployee: list }) }
        var id = this.props.idEmployeeSalary;
        // this.getListEmployee();
        const dataPromise = agent.EmployeeSalaryApi.getEmployeeSalary(id);
        loadEmployeeSalary(Promise.resolve(dataPromise)); 
        setStateInRequest(dataPromise);
    }

    handleAdd(values) {
        const {currentUser,onHide} = this.props;
        var id = this.props.idEmployeeSalary;
        var url = '/employeeSalary/update';
        var bodyObject = {
            id: id,
            userId:values.userId,
            actualAttendance:values.actualAttendance ? values.actualAttendance:0 , 
            month:values.month,
            year:values.year,
            salaryPerMonth:values.salaryPerMonth ? values.salaryPerMonth:0 ,
            normalOvertimeFee:values.normalOvertimeFee ? values.normalOvertimeFee:0 ,
            weekendOvertimeFee:values.weekendOvertimeFee ? values.weekendOvertimeFee:0 ,
            holidayOvertimeFee:values.holidayOvertimeFee ? values.holidayOvertimeFee:0 ,
            lunchFee:values.lunchFee ? values.lunchFee:0 ,
            petrolFee:values.petrolFee ? values.petrolFee:0 ,
            holidayFee:values.holidayFee ? values.holidayFee:0 ,
            diligenceFee:values.diligenceFee ? values.diligenceFee:0 ,
            insuranceSalary:values.insuranceSalary ? values.insuranceSalary:0 ,
            unionFee:values.unionFee ? values.unionFee:0 ,
            birthdayFee:values.birthdayFee ? values.birthdayFee:0 ,
            phoneFee:values.phoneFee ? values.phoneFee:0 ,
            distanceSupportFee:values.distanceSupportFee ? values.distanceSupportFee:0 ,
            otherSupportFee:values.otherSupportFee ? values.otherSupportFee:0 ,
            penaltyFee:values.penaltyFee ? values.penaltyFee:0 ,
            taxPayable:values.taxPayable ? values.taxPayable:0 ,
            taxableIncome: values.taxableIncome ?values.taxableIncome :0,
            assessableIncome:values.assessableIncome ? values.assessableIncome:0 ,
            otherMinusFee:values.otherMinusFee ? values.otherMinusFee:0 ,
            totalSalary:values.totalSalary ? values.totalSalary:0 ,
            totalPersonalInsuranceFee:values.totalPersonalInsuranceFee ? values.totalPersonalInsuranceFee:0 ,
            totalCompanyInsuranceFee:values.totalCompanyInsuranceFee ? values.totalCompanyInsuranceFee:0 ,
            personalDeduction:values.personalDeduction ? values.personalDeduction:0 ,
            familyCircumstanceDeduction:values.familyCircumstanceDeduction ? values.familyCircumstanceDeduction:0 ,
            actualSalary:values.actualSalary ? values.actualSalary:0 ,
            holidayLeave:values.holidayLeave,
            absentWithoutLeave:values.absentWithoutLeave,
            leaveYear:values.leaveYear,
            attendanceCoefficient:values.attendanceCoefficient ? values.attendanceCoefficient:0 ,
            normalAttendance:values.normalAttendance ? values.normalAttendance:0 ,
            normalOvertimeAttendance:values.normalOvertimeAttendance ? values.normalOvertimeAttendance:0 ,
            weekendAttendance:values.weekendAttendance ? values.weekendAttendance:0 ,
            holidayAttendance:values.holidayAttendance ? values.holidayAttendance:0 ,
            absentWithoutSalary:values.absentWithoutSalary,
            compensatoryLeave:values.compensatoryLeave,
            responsibilityAllowance:values.responsibilityAllowance ? values.responsibilityAllowance:0,
            paymentStatus : values.paymentStatus,
            paymentDate: values.paymentDate,
            lastedUpdateUserId: id ?  currentUser.id : null,



        };
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
    };

    ///Hide and Clean Value
    handleHideAndClear(){
       const{destroy,onHide} = this.props;
        // event.preventDefault();
        onHide();
        destroy();
    };

    render() {
       // const { objectEmployeeSalary, listfile, title, onHide } = this.props;
        const {handleSubmit,submitting,invalid,currentUser,lastedUpdateUserId, initialValues,editType,userDto,responsibilityAllowance,
            salaryPerMonth } = this.props;
        const modalConfig = { backdrop: 'static',show: this.props.show,bsSize:"md",  onHide:this.props.onHide,submitting: this.props.submitting};
        var id = this.props.idEmployeeSalary;
        var newModal = null;
        var title = null;
        if(editType=="minusInSalaryEdit"){
            title ="Chỉnh Sửa Các Khoản Trích Trừ Vào Lương";
        }else if(editType=="otherSupportFeeEdit"){
            title ="Chỉnh Sửa Các Khoản Cộng Khác";
        }else if(editType=="supportFeeEdit"){
            title ="Chỉnh Sửa Tiền Phụ Cấp"
        }else if(editType=="otherMinusFeeEdit"){
            title ="Chỉnh Sửa Các Khoản Trừ Khác";
        }else if(editType=="employeeMoneyGroup"){
            title ="Chỉnh Sửa Các Khoản Tiền Nhân Viên";
        }
        var optionsUser= []
        if(userDto){
            optionsUser.push({label:userDto.fullName, value: userDto.id})

        }else{
            <LoadingScreen></LoadingScreen>
        }
        var optionsPaymentStatus = [{ label: "Chưa Duyệt Thanh Toán", value: "CHUA_DUYET_THANH_TOAN" }, { label: "Đã Duyệt Thanh Toán", value: "DA_DUYET_THANH_TOAN" }];
        
        // Push Updated User
        var showLastedUpdateUser = [];
                // Push Updated User
                if(userDto){
                if (id && lastedUpdateUserId && lastedUpdateUserId == userDto.id) {
                    showLastedUpdateUser=[{
                        label: userDto.fullName + " || " + userDto.email,
                        value: userDto.id
                    }];
                } else if (id && !lastedUpdateUserId) {
                    showLastedUpdateUser=[{
                        label: currentUser.fullName + " || " + currentUser.email,
                        value: currentUser.id
                    }];
                }
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
                                    <Field type="hidden" disabled={true} name="month" component={RenderInputWithDiv}></Field>
                                    <Field type="hidden" disabled={true}  name="year"   component={RenderInputWithDiv}></Field>
                                    <Field disabled={true} name="userId" label="Tên nhân viên khối văn phòng" options={optionsUser} component={RenderSelect}></Field>
                                    {/* <div style={ editType=="minusInSalaryEdit"?{display:'block'}:{display:'none'}}>
                                        <Field name="unionFee" label="Phí công đoàn" thousandSeparator={true}  component={RenderMoneyFormat}></Field>
                                    </div> */}
                                     {/* Start Support Fee */}
                                    <div style={ editType=="supportFeeEdit"?{display:'block'}:{display:'none'}}>
                                        <Field name="lunchFee" label="Phụ cấp ăn trưa" thousandSeparator={true}  component={RenderMoneyFormat}></Field>
                                        <Field name="phoneFee" label="tiền điện thoại" thousandSeparator={true}  component={RenderMoneyFormat}></Field>
                                        <Field name="petrolFee" label="Phụ cấp xăng xe" thousandSeparator={true}  component={RenderMoneyFormat}></Field>
                                        <Field name="distanceSupportFee" label="phụ cấp đi công trình" thousandSeparator={true}  component={RenderMoneyFormat}></Field>
                                     </div>
                                      {/* End Support Fee */}
                                      {/* Start Extra Fee */}
                                     {/* <div style={ editType=="otherSupportFeeEdit"?{display:'block'}:{display:'none'}}>
                                        <Field name="birthdayFee" label="Sinh Nhật" placeholder="Nhập tiền sinh nhật..."  thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                        <Field name="distanceSupportFee"  label="Phụ cấp công trình xa" placeholder="Nhập tiền phụ cấp công trình xa..."  thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                        <Field name="otherSupportFee"  label="Cộng khác " placeholder="Nhập tiền cộng khác..."  thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                      </div> */}
                                      {/* End Extra Fee */}
                                    {/* Start Minus Fee */}
                                    {/* <div style={ editType=="otherMinusFeeEdit"?{display:'block'}:{display:'none'}}>
                                        <Field name="penaltyFee"  label="Phạt vi phạm" placeholder="Nhập tiền phạt vi phạm..."  thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                        <Field name="otherMinusFee"  label="Trừ khác" placeholder="Nhập tiền trừ khác..."  thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                      </div> */}
                                    <div style={ editType=="employeeMoneyGroup"?{display:'block'}:{display:'none'}}>
                                        <Field name="salaryPerMonth"  label="Lương Chính" placeholder="Nhập lương chính..."  thousandSeparator={true} component={RenderMoneyFormat} onChangeAction ={(value)=>this.hanleCalcInsuranceSalary(value,responsibilityAllowance)}></Field>
                                        <Field name="responsibilityAllowance" label="Phụ cấp trách nhiệm" thousandSeparator={true}  component={RenderMoneyFormat} onChangeAction ={(value)=>this.hanleCalcInsuranceSalary(salaryPerMonth,value)}></Field>
                                        <Field disabled={true} name="insuranceSalary"  label="Tiền Bảo Hiểm" placeholder="Nhập tiền bảo hiểm..."  thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                        <Field name="personalDeduction"  label="Giảm Trừ Bản Thân" placeholder="Nhập tiền giảm trừ bản thân..."  thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                        <Field name="familyCircumstanceDeduction"  label="Giảm Trừ Gia Cảnh" placeholder="Nhập tiền giảm trừ gia cảnh..."  thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                        <Field name="normalOvertimeFee"  label="Lương TC Thường" placeholder="Nhập tiền tăng ca ngày thường..."  thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                        <Field name="weekendOvertimeFee"  label="Lương TC Cuối Tuần" placeholder="Nhập tiền tăng ca cuối tuần..."  thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                        <Field name="holidayOvertimeFee"  label="Lương TC Lễ" placeholder="Nhập tiền tăng ca ngày lễ..."  thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                      </div>
                                     {/* End Minus Fee */}
                                    <Field name="note"  label="Ghi Chú" placeholder="Nhập Ghi Chú..." rows={3} component={RenderTextArea}></Field>
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
            form: 'ModalEmployeeSalary',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalEmployeeSalary)));
