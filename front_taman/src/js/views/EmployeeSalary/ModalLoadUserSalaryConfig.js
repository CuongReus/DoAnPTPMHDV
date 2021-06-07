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
    if(!values.userId){
        errors.userId= "" 
    }
    return errors;

}
const selector = formValueSelector("ModalLoadUserSalaryConfig");
var today = moment(new Date, "DD/MM/YYYY");
const mapStateToProps = (state,props) => {
    var updateValue = {
        ...state.employeeSalaryReducer.updatingEmployeeSalary,
        userId:props.userDto.id
    };
    return {
        initialValues: updateValue,
        currentUser: state.common.currentUser,
    

    };
};

const mapDispatchToProps = dispatch => ({
        loadEmployeeSalary: (payload) => 
        dispatch({ type: LOAD_UPDATING_EMPLOYEE_SALARY, payload: payload }),
        updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalLoadUserSalaryConfig", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});


class ModalLoadUserSalaryConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllLabour: []
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        
    }
   
  componentWillMount() {
        const { loadEmployeeSalary,month,year,updateField } = this.props;
        var id = this.props.idEmployeeSalary;
        // this.getListLabour();
    }

    handleAdd(values) {
        const {currentUser,onHide,idEmployeeSalary} = this.props;
        var url = '/employeeSalary/loadUserSalaryConfig';
        var bodyObject = {
            userId: values.userId,
            id:idEmployeeSalary
        };
        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result == "LOAD_USER_SALARY_SUCCESS") {
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
        const {handleSubmit,submitting,invalid,currentUser,title, initialValues,userDto} = this.props;
        const modalConfig = { backdrop: 'static',show: this.props.show,bsSize:"md",  onHide:this.props.onHide,submitting: this.props.submitting};
        var newModal = null;
        var optionsUser= []
        if(userDto){
            optionsUser.push({label:userDto.fullName, value: userDto.id})
        }else{
            <LoadingScreen></LoadingScreen>
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
                                    <Field disabled={true} name="userId" options={optionsUser} component={RenderSelect}></Field>
                                    <div className="text-right">
                                        <button type="button" className="btn btn-link" onClick={this.handleHideAndClear}>Hủy</button>
                                        <button type="submit" className="btn bg-orange" disabled={submitting || invalid}>Tải cấu hình lương</button>
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
            form: 'ModalLoadUserSalaryConfig',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalLoadUserSalaryConfig)));
