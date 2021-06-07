import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker,RenderCheckbox, RenderSelect, RenderNumberInput, RenderMoneyFormat } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import isEmail from 'sane-email-validation';
import { StringUtils } from '../../utils/javascriptUtils';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import {LOAD_UPDATING_PAYMENT_SALARY} from './action-types';
import {FIRE_REDIRECT } from '../../constants/action-types';
import ListUserFile from '../../components/ListUserFile';
import { isNull } from 'util';
import moment from 'moment';
import UserAvatar from '../../components/UserAvatar';
const validate = values => {
    const errors = {};
    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
        ...state.paymentSalaryReducer.updatingPaymentSalary, 
        validatedDate: state.paymentSalaryReducer.updatingPaymentSalary && state.paymentSalaryReducer.updatingPaymentSalary.validatedDate ? moment(state.paymentSalaryReducer.updatingPaymentSalary.validatedDate) : null,
        paidDate: state.paymentSalaryReducer.updatingPaymentSalary && state.paymentSalaryReducer.updatingPaymentSalary.paidDate ? moment(state.paymentSalaryReducer.updatingPaymentSalary.paidDate) : null,
        createdDate:state.paymentSalaryReducer.updatingPaymentSalary && state.paymentSalaryReducer.updatingPaymentSalary.createdDate ? moment(state.paymentSalaryReducer.updatingPaymentSalary.createdDate) : null,
        lastedUpdateDate:state.paymentSalaryReducer.updatingPaymentSalary && state.paymentSalaryReducer.updatingPaymentSalary.lastedUpdateDate ? moment(state.paymentSalaryReducer.updatingPaymentSalary.lastedUpdateDate) : null,
    };
    return {
        initialValues: updateValue
    };
};

const mapDispatchToProps = dispatch => ({
        loadPaymentSalary: (payload) => 
        dispatch({ type: LOAD_UPDATING_PAYMENT_SALARY, payload: payload })
});


class ModalPaymentSalary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
    }
    
  componentWillMount() {
        const { loadPaymentSalary } = this.props;
        var id = this.props.idUser;
            const dataPromise = agent.UserApi.getPaymentSalary(id);
            loadPaymentSalary(Promise.resolve(dataPromise)); 
            setTimeout(() => {
                if(!id){
                            updateField("createdUser.id", currentUser.id);
                            updateField("createdDate",moment(today));
                          }
                  }, 200);
    }
  getListCompany(){
    let setStateInRequest = (list) => { this.setState({ listAllCompanys: list }) }
    return agent.asyncRequests.get("/company/listAll").then(function (res) {
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
        const {currentUser} = this.props;
        var onHide = this.props.onHide;
        var id = this.props.idUser;
        var url = '/user/add';
        var bodyObject = {
            labourSalary: value.labourSalary,
            amount: values.amount,
            paymentType: values.paymentType,
            createdUser:values.createdUser,
            lastedUpdateUser: id ?  currentUser : null,
            createdDate:values.createdDate,
            lastedUpdateDate: id ? moment(today) : null,
            validatedBy: values.validatedBy,
            validatedDate: values.validatedDate,
            status: values.status,
            paidDate: values.paidDate,
            note: values.note,
         
        };
        if (id) {
            url = '/user/update';
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
       // const { objectUser, listfile, title, onHide } = this.props;
        
       const {handleSubmit,submitting, title,invalid,currentUser,initialValues } = this.props;
        const modalConfig = { backdrop: 'static',show: this.props.show,bsSize:"sm",  onHide:this.props.onHide,submitting: this.props.submitting};
        var dataCompany = this.state.listAllCompanys;
        
        var optionsLabour = [];
        var optionPaymentStatus = [];
        var showLastedUpdateUser = [];
        // optionEmployees = [];
        // dataEmployee.map(item => {
        //     optionEmployees.push({ label: item.fullName + "( " +item.phone +" )", value: item.id })
        // });

        var showCreatedUser = [];
        var showLastedUpdateUser = [];
            // Push created user
        showCreatedUser.push({label:initialValues.createdUser ?  initialValues.createdUser.fullName + " || "+ initialValues.createdUser.email 
        : currentUser.fullName + " || "+currentUser.email,
        value:initialValues.createdUser ?initialValues.createdUser.id: currentUser.id});
          // Push Updated User
        showLastedUpdateUser.push({label:initialValues.lastedUpdateUser ?  initialValues.lastedUpdateUser.fullName + " || "+ initialValues.lastedUpdateUser.email 
        : currentUser.fullName + " || "+currentUser.email,
        value:initialValues.lastedUpdateUser ?initialValues.lastedUpdateUser.id: currentUser.id});
      
    
        var id = this.props.idUser;
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
                                    {/* Get Labour Salary but show Labour Name */}
                                    <Field name="labourSalary.id" label="Tên Nhân Công" options={optionsLabour} component={RenderSelect}></Field>
                                    <Field name="amount" label="Số Tiền" placeholder="Nhập số tiền..." thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                    <Field name="paymentType" label="Loại Thanh Toán" placeholder="Chọn loại thanh toán..." options={optionPaymentStatus} component={RenderSelect}></Field>
                                    <Field name="paidDate" dateFormat="DD/MM/YYYY" label="Ngày Chi Trả"  component={RenderDatePicker}></Field>
                                    <Field name="validatedBy"  label="Được Duyệt Bởi" placeholder="Chọn người xác duyệt" component={RenderSelect}></Field>
                                    <Field name="validatedDate" label="Ngày Được Duyệt" dateFormat="DD/MM/YYYY" component={RenderDatePicker}></Field>
                                    <Field name="status" label="Trạng Thái Xác Duyệt" placeholder="Chọn Trạng Thái Xác Duyệt" component={RenderInputWithDiv}></Field>                                  
                                    <Field name="note" label="Ghi Chú" placeholder="Nhập ghi chú..."  component={RenderNumberInput}></Field>
                                    <Field disabled={true} name="createdUser.id" label="Người Tạo Bảng"  options={showCreatedUser} component={RenderSelect}></Field>
                                    <Field disabled={true} name="createdDate" label="Ngày Tạo Bảng"  dateFormat="DD/MM/YYYY" component={RenderDatePicker}></Field>
                                    <div style={initialValues.lastedUpdateUser?{display:'block'}:{display:'none'}}>
                                    <Field disabled={true} name="lastedUpdateUser.id" label="Người Chỉnh Sửa Gần Nhất" options={showLastedUpdateUser} component={RenderSelect}></Field>
                                    <Field disabled={true} name="lastedUpdateDate"  label="Ngày Chỉnh Sửa Gần Nhất " dateFormat="DD/MM/YYYY" component={RenderDatePicker}></Field> </div>
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
            form: 'ModalPaymentSalary',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalPaymentSalary)));
