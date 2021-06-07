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
    if(!values.paymentStatus){
        errors.paymentStatus= "Vui lòng chọn trạng thái thanh toán!" 
    }
    return errors;

}
const selector = formValueSelector("ModalPaymentAllEmployee");
var today = moment(new Date, "DD/MM/YYYY");
const mapStateToProps = state => {
    var updateValue = {
        ...state.employeeSalaryReducer.updatingEmployeeSalary,
        lastedUpdateDate: state.employeeSalaryReducer.updatingEmployeeSalary && state.employeeSalaryReducer.updatingEmployeeSalary.lastedUpdateDate ? moment(state.employeeSalaryReducer.updatingEmployeeSalary.lastedUpdateDate) : null,
        paymentDate: state.employeeSalaryReducer.updatingEmployeeSalary && state.employeeSalaryReducer.updatingEmployeeSalary.paymentDate ? moment(state.employeeSalaryReducer.updatingEmployeeSalary.paymentDate) : today,
    };
    return {
        initialValues: updateValue,
        currentUser: state.common.currentUser,
        salaryPerMonth: selector(state,"salaryPerMonth"),
        responsibilityAllowance: selector(state,"responsibilityAllowance")

    };
};

const mapDispatchToProps = dispatch => ({
        loadEmployeeSalary: (payload) => 
        dispatch({ type: LOAD_UPDATING_EMPLOYEE_SALARY, payload: payload }),
        updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalPaymentAllEmployee", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});


class ModalPaymentAllEmployee extends React.Component {
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
        const { loadEmployeeSalary,month,year,updateField } = this.props;
        let setStateInRequest = (list) => { this.setState({ listAllEmployee: list }) }
        var id = this.props.idEmployeeSalary;
        // this.getListEmployee();
       if(month &&
        year){
        updateField("month",month);
        updateField("year",year);
    }
        const dataPromise = agent.EmployeeSalaryApi.getEmployeeSalary(id);
        loadEmployeeSalary(Promise.resolve(dataPromise)); 
        setStateInRequest(dataPromise);
    }

    handleAdd(values) {
        const {currentUser,onHide} = this.props;
        var id = this.props.idEmployeeSalary;
        var url = '/employeeSalary/updatePaymentStatus';
        var bodyObject = {
            month:values.month,
            year:values.year,
            paymentStatus : values.paymentStatus,
            paymentDate: values.paymentDate,



        };
        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result == "ok") {
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
        const {handleSubmit,submitting,invalid,currentUser, initialValues,editType,userDto,responsibilityAllowance,
            salaryPerMonth } = this.props;
        const modalConfig = { backdrop: 'static',show: this.props.show,bsSize:"md",  onHide:this.props.onHide,submitting: this.props.submitting};
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
                                    <Field disabled={true} name="month" component={RenderInputWithDiv}></Field>
                                    <Field disabled={true}  name="year"   component={RenderInputWithDiv}></Field>
                                    <Field  name="paymentStatus" options={optionsPaymentStatus}   component={RenderSelect}></Field>
                                    <Field  name="paymentDate" dateFormat="DD/MM/YYYY"   component={RenderDatePicker}></Field>
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
            form: 'ModalPaymentAllEmployee',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalPaymentAllEmployee)));
