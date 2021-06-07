import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker,RenderCheckbox, RenderSelect, RenderNumberInput, RenderMoneyFormat } from '../../components/formInputs';
import { Field, reduxForm,formValueSelector } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import {LOAD_UPDATING_LABOUR_SALARY} from './action-types';
import moment from 'moment';

const validate = values => {
    const errors = {};
    if(!values.paymentStatus){
        errors.paymentStatus= "Vui lòng chọn trạng thái thanh toán!" 
    }
    return errors;

}
const selector = formValueSelector("ModalPaymentAllLabour");
var today = moment(new Date, "DD/MM/YYYY");
const mapStateToProps = state => {
    var updateValue = {
        ...state.labourSalaryReducer.updatingLabourSalary,
        lastedUpdateDate: state.labourSalaryReducer.updatingLabourSalary && state.labourSalaryReducer.updatingLabourSalary.lastedUpdateDate ? moment(state.labourSalaryReducer.updatingLabourSalary.lastedUpdateDate) : null,
        paymentDate: state.labourSalaryReducer.updatingLabourSalary && state.labourSalaryReducer.updatingLabourSalary.paymentDate ? moment(state.labourSalaryReducer.updatingLabourSalary.paymentDate) : today,
    };
    return {
        initialValues: updateValue,
        currentUser: state.common.currentUser,
    

    };
};

const mapDispatchToProps = dispatch => ({
        loadLabourSalary: (payload) => 
        dispatch({ type: LOAD_UPDATING_LABOUR_SALARY, payload: payload }),
        updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalPaymentAllLabour", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});


class ModalPaymentAllLabour extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllLabour: []
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        
    }
   
  componentWillMount() {
        const { loadLabourSalary,month,year,updateField } = this.props;
        let setStateInRequest = (list) => { this.setState({ listAllLabour: list }) }
        var id = this.props.idLabourSalary;
        // this.getListLabour();
       if(month &&
        year){
        updateField("month",month);
        updateField("year",year);
    }
        const dataPromise = agent.LabourSalaryApi.getLabourSalary(id);
        loadLabourSalary(Promise.resolve(dataPromise)); 
        setStateInRequest(dataPromise);
    }

    handleAdd(values) {
        const {currentUser,onHide} = this.props;
        var url = '/labourSalary/updatePaymentStatus';
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
       // const { objectLabourSalary, listfile, title, onHide } = this.props;
        const {handleSubmit,submitting,invalid,currentUser, initialValues,editType,userDto} = this.props;
        const modalConfig = { backdrop: 'static',show: this.props.show,bsSize:"md",  onHide:this.props.onHide,submitting: this.props.submitting};
        var newModal = null;
        var showLastedUpdateUser = [];
        var title = null;
        var optionsUser= []
        if(userDto){
            optionsUser.push({label:userDto.fullName, value: userDto.id})

        }else{
            <LoadingScreen></LoadingScreen>
        }
        var optionsPaymentStatus = [{ label: "Chưa Duyệt Thanh Toán", value: "CHUA_DUYET_THANH_TOAN" }, { label: "Đã Duyệt Thanh Toán", value: "DA_DUYET_THANH_TOAN" }];
        
        // Push Updated User
              showLastedUpdateUser.push({
                  label: initialValues.lastedUpdateUser ? initialValues.lastedUpdateUser.fullName + " || " + initialValues.lastedUpdateUser.email
                      : currentUser.fullName + " || " + currentUser.email,
                  value: initialValues.lastedUpdateUser ? initialValues.lastedUpdateUser.id : currentUser.id
              });
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
            form: 'ModalPaymentAllLabour',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalPaymentAllLabour)));
