import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker,RenderCheckbox, RenderSelect, RenderNumberInput, RenderMoneyFormat } from '../../components/formInputs';
import { Field, reduxForm,formValueSelector } from 'redux-form';
import isEmail from 'sane-email-validation';
import { StringUtils } from '../../utils/javascriptUtils';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import {LOAD_UPDATING_LABOUR_SALARY} from './action-types';
import {FIRE_REDIRECT } from '../../constants/action-types';
import ListFile from '../../components/ListFile';
import { isNull } from 'util';
import moment from 'moment';
const validate = values => {
    const errors = {};
    return errors;
}
const selector = formValueSelector('ModalLabourSalary');
const mapStateToProps = state => {
    var updateValue = {
        ...state.labourSalaryReducer.updatingLabourSalary,
        lastedUpdateDate: state.labourSalaryReducer.updatingLabourSalary && state.labourSalaryReducer.updatingLabourSalary.lastedUpdateDate ? moment(state.labourSalaryReducer.updatingLabourSalary.lastedUpdateDate) : null,

    };
    return {
        initialValues: updateValue,
        currentUser: state.common.currentUser,
        lastedUpdateUserId: selector(state,"lastedUpdateUserId"),
        createdUserId: selector(state, "createdUserId"),
    };
};

const mapDispatchToProps = dispatch => ({
        loadLabourSalary: (payload) => 
        dispatch({ type: LOAD_UPDATING_LABOUR_SALARY, payload: payload }),
        updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalLabourSalary", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});


class ModalLabourSalary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllLabour: [],
listAllUsers: []
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
        const { loadLabourSalary,updateField, currentUser } = this.props;
        var id = this.props.idLabourSalary;
        this.getListLabour();
         this.getListUser();
        const dataPromise = agent.LabourSalaryApi.getLabourSalary(id);
        loadLabourSalary(Promise.resolve(dataPromise)); 
    }



    handleAdd(values) {
        const {currentUser,onHide} = this.props;
        var today = new Date();
        var id = this.props.idLabourSalary;
        var url = '/labourSalary/add';
        var bodyObject = {
            labourId:values.labourId,
            month:values.month,
            year:values.year,
            salaryPerDay: values.salaryPerDay?values.salaryPerDay:0,
            salaryMidnight: values.salaryMidnight?values.salaryMidnight:0,
            attendanceLv0:values.attendanceLv0?values.attendanceLv0:0,
            attendanceLv1:values.attendanceLv1?values.attendanceLv1:0,
            attendanceLv2:values.attendanceLv2?values.attendanceLv2:0,
            attendanceLv3:values.attendanceLv3?values.attendanceLv3:0,
            totalAttendanceCalc:values.totalAttendanceCalc?values.totalAttendanceCalc:0,
            totalNormalSalary:values.totalNormalSalary?values.totalNormalSalary:0,
            totalMidnightSalary:values.totalMidnightSalary?values.totalMidnightSalary:0,
            totalSalary:values.totalSalary?values.totalSalary:0,
            numberOfLateDay: values.numberOfLateDay ? values.numberOfLateDay :0,
            numberOfDistanceDay:values.numberOfDistanceDay?values.numberOfDistanceDay:0,
            numberOfTransport:values.numberOfTransport?values.numberOfTransport:0,
            otherSupportFee:values.otherSupportFee?values.otherSupportFee:0,
            labourSupportFee: values.labourSupportFee?values.labourSupportFee:0,
            totalSupportFee:values.totalSupportFee?values.totalSupportFee:0,
            birthdayFee:values.birthdayFee?values.birthdayFee:0,
            holidayFee:values.holidayFee?values.holidayFee:0,
            otherExtraFee:values.otherExtraFee?values.otherExtraFee:0,
            totalExtraFee:values.totalExtraFee?values.totalExtraFee:0,
            diligenceFee:values.diligenceFee?values.diligenceFee:0,
            unionFee:values.unionFee?values.unionFee:0,
            taxFee:values.taxFee?values.taxFee:0,
            socialInsuranceFee:values.socialInsuranceFee?values.socialInsuranceFee:0,
            penaltyFee:values.penaltyFee?values.penaltyFee:0,
            totalMinusFee:values.totalMinusFee?values.totalMinusFee:0,
            actualSalary:values.actualSalary?values.actualSalary:0,
            advanceFee:values.advanceFee?values.advanceFee:0,
            note:values.note,
            lastedUpdateUserId: id ? currentUser.id : null,
            lastedUpdateDate: id ? moment(today) : null,
            paymentStatus : values.paymentStatus,
            paymentDate: values.paymentDate,
        };
        if (id) {
            url = '/labourSalary/update';
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
    handleHideAndClear(){
       const{destroy,onHide} = this.props;
        // event.preventDefault();
        onHide();
        destroy();
    }
    render() {
       // const { objectLabourSalary, listfile, title, onHide } = this.props;
        
       const {handleSubmit,submitting,invalid,currentUser, initialValues,editType,lastedUpdateUserId,
        createdUserId } = this.props;
        const modalConfig = { backdrop: 'static',show: this.props.show,bsSize:"sm",  onHide:this.props.onHide,submitting: this.props.submitting};
        var id = this.props.idLabourSalary;
        var dataLabour = this.state.listAllLabour;
        var optionLabours = [];
              dataLabour.map(item => {
                  optionLabours.push({ label: item.fullName, value: item.id })
              })
        var newModal = null;
        var showLastedUpdateUser = [];
        var title = null;
        if(editType=="salaryPerDayEdit"){
            title ="Chỉnh Sửa Lương Theo Ngày";
        }else if(editType=="extraFeeEdit"){
            title ="Chỉnh Sửa Tiền Ngoài Lương";
        }else if(editType=="supportFeeEdit"){
            title ="Chỉnh Sửa Tiền Phụ Cấp"
        }else if(editType=="minusFeeEdit"){
            title ="Chỉnh Sửa Tiền Trừ";
        }
        var dataUser =this.state.listAllUsers;
        var showLastedUpdateUser = [];
        if (dataUser) {
            dataUser.map(item => {
              
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
                                  
                                    <Field disabled={true} name="labourId" label="Tên Nhân Công" options={optionLabours} component={RenderSelect}></Field>
                                <div style={ editType=="salaryPerDayEdit"?{display:'block'}:{display:'none'}}>
                                    <Field name="salaryPerDay" label="Lương Ngày Công" thousandSeparator={true}  component={RenderMoneyFormat}></Field>
                                    <Field name="salaryMidnight" label="Lương Công Tăng Ca Khuya" thousandSeparator={true}  component={RenderMoneyFormat}></Field>
                                   
                                    </div>
                                     {/* Start Support Fee */}
                                    <div style={ editType=="supportFeeEdit"?{display:'block'}:{display:'none'}}>
                                    <Field disabled={true} name="numberOfDistanceDay"   label="Số Ngày Phụ Cấp Công Trình Xa"   component={RenderNumberInput}></Field>
                                    <Field disabled={true} name="numberOfTransport"  label="Số Ngày Phụ Cấp Đi Lại"  component={RenderNumberInput}></Field>
                                    <Field name="otherSupportFee"  label="Phụ Cấp Khác" placeholder="Nhập phụ cấp khác..." thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                     </div>
                                      {/* End Support Fee */}
                                      {/* Start Extra Fee */}
                                     <div style={ editType=="extraFeeEdit"?{display:'block'}:{display:'none'}}>
                                  
                                    <Field name="otherExtraFee" label="Tiền Thưởng Khác"  thousandSeparator={true} placeholder="Nhập tiền thưởng khác..." component={RenderMoneyFormat}></Field>
                                      </div>
                                      {/* End Extra Fee */}
                                    {/* Start Minus Fee */}
                                    <div style={ editType=="minusFeeEdit"?{display:'block'}:{display:'none'}}>
                                   
                                      </div>
                                     {/* End Minus Fee */}
                                     {/* Hidden Field */}
                                     <div style={{display:'none'}}>
                                     <Field type="hidden" disabled={true} name="month" component={RenderInputWithDiv}></Field>
                                    <Field type="hidden" disabled={true}  name="year"   component={RenderInputWithDiv}></Field>
                                    <Field type="hidden" name="labourSupportFee"  label="Lương Phụ Cấp" thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                     <Field type="hidden" name="unionFee"  label="Tiền Công Đoàn" placeholder="Nhập tiền công đoàn..."  thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                    <Field type="hidden" name="taxFee"  label="Thuế TNCN" placeholder="Nhập thuế thu nhập cá nhân..."  thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                    <Field type="hidden" name="socialInsuranceFee"  label="Tiền BHXH" placeholder="Nhập tiền BHXH..."  thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                    <Field type="hidden" name="penaltyFee"  label="Phạt Vi Phạm"  placeholder="Nhập tiền BHXH..."  thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                    <Field type="hidden" name="advanceFee"  label="Tiền Tạm Ứng"  label="Tiền Tạm Ứng" thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                    <Field type="hidden" name="actualSalary" thousandSeparator={true}  component={RenderMoneyFormat}></Field>
                                    <Field type="hidden"  name="birthdayFee" label="Tiền Thưởng Sinh Nhật" placeholder="Nhập tiền thưởng sinh nhật..."  thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                    <Field type="hidden" name="holidayFee"  label="Tiền Thưởng Lễ" placeholder="Nhập tiền thưởng lễ..."  thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                    <Field type="hidden" name="diligenceFee"  label="Thưởng Chuyên Cần" placeholder="Nhập tiền thưởng chuyên cần..."  thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                    <Field type="hidden" disabled={true} name="attendanceLv0" component={RenderNumberInput}></Field>
                                    <Field type="hidden" disabled={true} name="attendanceLv1" component={RenderNumberInput}></Field>
                                    <Field type="hidden" disabled={true} name="attendanceLv2"  component={RenderNumberInput}></Field>
                                    <Field type="hidden" disabled={true} name="attendanceLv3"  component={RenderNumberInput}></Field>
                                    <Field type="hidden" disabled={true} name="totalAttendanceCalc"  component={RenderNumberInput}></Field>
                                    <Field type="hidden" disabled={true} name="totalSalary" thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                    <Field type="hidden" name="totalMinusFee" thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                    <Field type="hidden" name="totalExtraFee" thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                    <Field type="hidden" name="totalSupportFee" thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                    </div>
                                    {/* End Hidden Field */}
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
            form: 'ModalLabourSalary',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalLabourSalary)));
