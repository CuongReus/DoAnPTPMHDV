import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker, RenderCheckbox, RenderSelect, RenderNumberInput } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_DEPARTMENT } from './action-types';


const validate = values => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Vui lòng nhập tên phòng ban';
    }
    if(!values.workOnWeekendStatus){
        errors.workOnWeekendStatus = 'Vui lòng chọn trạng thái làm việc cuối tuần';
    }
    return errors;
};

const mapStateToProps = state => {
    var updateValue = {
        ...state.departmentReducer.updatingDepartment
          };
    return {
        initialValues: updateValue
    };
};

const mapDispatchToProps = dispatch => ({
    loadDepartment: (payload) =>
        dispatch({ type: LOAD_UPDATING_DEPARTMENT, payload: payload })
});

class ModalDepartment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            objDepartment: null
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
    };

    componentWillMount() {
        const { loadDepartment } = this.props;
        var id = this.props.idDepartment;
        const dataPromise = agent.DepartmentApi.getDepartment(id);
        loadDepartment(Promise.resolve(dataPromise));
    };

    handleAdd(values) {
        var onHide = this.props.onHide;
        var id = this.props.idDepartment;
        var url = '/department/add';
        var bodyObject = {
            code: values.code,
            name: values.name,
            attendanceCoefficient: values.attendanceCoefficient ? values.attendanceCoefficient: 0,
            workOnWeekendStatus: values.workOnWeekendStatus,
            note: values.note
        };
        if (id) {
            url = '/department/update';
            bodyObject.id = id;
        }

        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                onHide();
                toast.info("Lưu Thành Công.", {autoClose: 8000});
            } else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    };

    handleHideAndClear(){
        const{destroy,onHide} = this.props;
         // event.preventDefault();
         onHide();
         destroy();
     };

    render() {
        const { onHide, handleSubmit, submitting, title, invalid } = this.props;
        const modalConfig = {backdrop:'static', show: this.props.show, onHide: this.props.onHide, submitting: this.props.submitting };
        var workOnWeekendStatus =[
            {label:"Có",value:"CO"},{label:"Không", value: "KHONG"}]
        var newModal = null;
            newModal =
                <div style={{ width: '30%' }}>
                    <Modal
                        {...modalConfig}
                        aria-labelledby="contained-modal-title-lg"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-sm"><center>Thông Tin {title}</center></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {submitting ? <LoadingScreen /> :
                                <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.handleAdd)}>
                                    <Field name="code" label="Mã Phòng Ban" placeholder="Nhập Mã Phòng Ban" component={RenderInputWithDiv}></Field>
                                    <Field name="name" label="Tên Phòng Ban" placeholder="Nhập Tên Phòng Ban" component={RenderInputWithDiv}></Field>
                                    <Field name="attendanceCoefficient" label="Hệ Số Ngày Công" placeholder="Nhập hệ số ngày công" component={RenderNumberInput}></Field>
                                    <Field name="workOnWeekendStatus" label="Làm Việc Cuối Tuần" placeholder="Chọn trạng thái làm việc cuối tuần..." options={workOnWeekendStatus} component={RenderSelect}></Field>
                                    <Field name="note" label="Mô Tả Phòng Ban" placeholder="Nhập Mô Tả" rows={3} component={RenderTextArea}></Field>
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
            form: 'ModalDepartment',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalDepartment)));
