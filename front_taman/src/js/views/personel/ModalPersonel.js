import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker, RenderCheckbox, RenderSelect, RenderMultiSelect, RenderNumberInput, RenderInputPassword, RenderMoneyFormat } from '../../components/formInputs';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import isEmail from 'sane-email-validation';
import { SecurityUtils } from '../../utils/javascriptUtils';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_PERSONEL } from './action-types';
import { FIRE_REDIRECT } from '../../constants/action-types';
import moment from 'moment';
import ListFile from '../../components/ListFile';

const validate = values => {

    var today = new Date();
    var birthdaymin = moment(today, "DD/MM/YYYY").add(-18, 'years');
    const errors = {};
    if (!values.email) {
        errors.email = 'Vui lòng nhập email.';
    } else if (!isEmail(values.email)) {
        errors.email = 'Email không hợp lệ.';
    };
    if (!values.id && !values.password) {
        errors.password = 'Vui lòng nhập mật khẩu.';
    } else if (values.password) {
        if (values.password.length < 6) {
            errors.password = "Để bảo mật, mật khẩu phải chứa 6 ký tự trở lên.";
        }
    };
    if (!values.code) {
        errors.code = 'Vui lòng nhập mã nhân viên!';
    };
    if (!values.fullName) {
        errors.fullName = 'Vui lòng nhập họ tên!';
    };
    
    if (!values.companyId) {
        errors.companyId = "Vui lòng chọn công ty làm việc!"
    };
    if (values.birthday) {
        if (moment(values.birthday).format("YYYY") > moment(birthdaymin).format("YYYY")) {
            errors.birthday = "Tuổi của Nhân viên chưa đúng. Vui lòng nhập năm sinh nhỏ hơn hoặc bằng năm " + moment(birthdaymin).format("YYYY");
        }
    }
    return errors;
}
const selector = formValueSelector("ModalPersonel");
const mapStateToProps = state => {
    var updateValue = {
        ...state.personelReducer.updatingPersonel,
        birthday: state.personelReducer.updatingPersonel && state.personelReducer.updatingPersonel.birthday ? moment(state.personelReducer.updatingPersonel.birthday) : null,
        roles: state.personelReducer.updatingPersonel && state.personelReducer.updatingPersonel.roles ? state.personelReducer.updatingPersonel.roles.map(role => { return { label: role.name, value: role.id } }) : null,
        active: state.personelReducer.updatingPersonel && state.personelReducer.updatingPersonel.active ? state.personelReducer.updatingPersonel.active : 1,
        startWorkDate: state.personelReducer.updatingPersonel && state.personelReducer.updatingPersonel.startWorkDate ? moment(state.personelReducer.updatingPersonel.startWorkDate) : null,
        issuedDate: state.personelReducer.updatingPersonel && state.personelReducer.updatingPersonel.issuedDate ? moment(state.personelReducer.updatingPersonel.issuedDate) : null
    };
    return {
        initialValues: updateValue,
        currentUser: state.common.currentUser,
        salaryLevel: selector(state, "salaryLevel"),
        responsibilityAllowance: selector(state, "responsibilityAllowance")


    };
};

const mapDispatchToProps = dispatch => ({
    loadPersonel: (payload) =>
        dispatch({ type: LOAD_UPDATING_PERSONEL, payload: payload }),
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalPersonel", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })

});


class ModalPersonel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllCompanys: [],
            listAllRoles: [],
            listAllDepartment: [],
            disableDataManipulation: true
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.handleInsuranceSalaryCalc = (salaryLevel, responsibilityAllowance) => {
            const { updateField } = this.props;
            var salaryLevel = salaryLevel ? salaryLevel : 0;
            var responsibilityAllowance = responsibilityAllowance ? responsibilityAllowance : 0;
            if (salaryLevel || responsibilityAllowance) {
                updateField("insuranceSalary", parseInt(salaryLevel) + parseInt(responsibilityAllowance));
            }
        }
    }

    componentWillMount() {
        const { loadPersonel } = this.props;
        var id = this.props.idUser;
        const dataPromise = agent.UserApi.getPersonel(id);
        loadPersonel(Promise.resolve(dataPromise));

        return (
            this.getListCompany(),
            this.getListRoles(),
            this.getListDepartment()
        )

    }

    getListCompany() {
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

    getListDepartment() {
        let setStateInRequest = (list) => { this.setState({ listAllDepartment: list }) }
        return agent.asyncRequests.get("/department/listAll").then(function (res) {
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
    getListRoles() {
        let setStateInRequest = (list) => { this.setState({ listAllRoles: list }) }
        return agent.asyncRequests.get("/role/listAll").then(function (res) {
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
        const { currentUser } = this.props;
        var onHide = this.props.onHide;
        var id = this.props.idUser;
        var url = '/user/add';
        var bodyObject = {
            email: values.email,
            password: values.password,
            fullName: values.fullName,
            companyId: values.companyId,
            phone: values.phone,
            role: "ADMIN",
            roles: null,
            birthday: values.birthday,
            active: 1,
            annualLeaveYear: values.annualLeaveYear ? values.annualLeaveYear : 0,
            departmentId: values.departmentId,
            currentAddress: values.currentAddress,
            position: values.position,
            gender: values.gender,
            code: values.code,
            createdUserEmail: !id ? currentUser.email : values.createdUserEmail,
            lastedUpdateUserEmail: id && values.lastedUpdateUserEmail ? values.lastedUpdateUserEmail : currentUser.email,
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
                toast.info("Lưu Thành Công.", { autoClose: 8000 });
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
        destroy();
    }
    render() {

        const { handleSubmit, submitting, title, invalid, currentUser, isSalaryConfig, salaryLevel, responsibilityAllowance } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show, bsSize: "sm", onHide: this.props.onHide, submitting: this.props.submitting };
        var dataCompany = this.state.listAllCompanys;
        
        var optionCompanies = [];
        dataCompany.map(item => {
            optionCompanies.push({ label: item.code + "-" + item.name, value: item.id })
        })

        var optionUserRoles = [];
        this.state.listAllRoles.map(item => {
            optionUserRoles.push({ label: item.name, value: item.id })
        })
        var optionDepartment = [];
        this.state.listAllDepartment.map(item => {
            optionDepartment.push({ label: item.code + " - " + item.name, value: item.id })
        })
        
        var newModal = null;
        var dateNow = new Date();
        var optionGender = [
            { label: "Nam", value: "MALE" },
            { label: "Nữ", value: "FEMALE" },
            { label: "Khác", value: "OTHER" }
        ];

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
                                {/* <fieldset disabled={disableDataManipulation}> */}
                                <div className="form-group">
                                    <div style={isSalaryConfig ? { display: 'none' } : { display: 'block ' }} className="form-group">
                                            <div className="tabbable">
                                                
                                                <div className="tab-content">
                                                <div className="tab-pane active" id="default-justified-tab1">
                                                        <Field name="code" label="Mã Nhân Viên(*)" placeholder="Nhập mã nhân viên..." component={RenderInputWithDiv}></Field>
                                                        <Field name="fullName" label="Họ Tên(*)" placeholder="Nhập họ tên người dùng..." component={RenderInputWithDiv}></Field>
                                                        <Field name="email" type="email" label="Email(*)" placeholder="Nhập email người dùng..." component={RenderInputWithDiv}></Field>
                                                        <Field name="password" label="Mật khẩu(*)" placeholder="Nhập mật khẩu..." component={RenderInputPassword}></Field>
                                                        <Field name="phone" label="Số Điện Thoại" placeholder="Nhập số điện thoại..." component={RenderNumberInput}></Field>
                                                        <Field name="birthday" dateFormat="DD/MM/YYYY" label="Ngày Sinh" component={RenderDatePicker}></Field>
                                                        <Field name="gender" label="Giới Tính" options={optionGender} component={RenderSelect}></Field>
                                                        <Field name="companyId" label="Thuộc công ty(*)" options={optionCompanies} component={RenderSelect} ></Field>
                                                        <Field name="departmentId" disabled={!SecurityUtils.hasPermission(currentUser, "admin.users.update") ? true : false} label="Thuộc Phòng Ban" placeholder="Chọn phòng ban..." options={optionDepartment} component={RenderSelect}></Field>
                                                        {/* <Field disabled={!SecurityUtils.hasPermission(currentUser, "admin.users.update") ? true : false} name="roles" label="Bộ Phận" placeholder="Chọn bộ phận..." options={optionUserRoles} component={RenderMultiSelect}></Field> */}
                                                        {/* <Field name="active" label="Trạng Thái" checkLabel="Đang Làm Việc" component={RenderCheckbox}></Field> */}
                                                        <Field disabled={!SecurityUtils.hasPermission(currentUser, "admin.users.setupAnnualLeaveForUser") ? true :false} name="annualLeaveYear" label="Số Ngày Phép / Năm" placeholder="Nhập số ngày phép của nhân viên / năm..." component={RenderNumberInput}></Field>
                                                        <Field name="currentAddress" label="Địa Chỉ Hiện Tại" placeholder="Nhập địa chỉ hiện tại..." component={RenderInputWithDiv}></Field>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                </div>

                                <div className="text-right">
                                    <button type="button" className="btn btn-link" onClick={this.handleHideAndClear} >Hủy</button>
                                    {/* <button type="submit" className="btn bg-orange" disabled={submitting || invalid}>Lưu</button> */}
                                    <button type="submit" className="btn bg-orange" disabled={submitting}>Lưu</button>
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
            form: 'ModalPersonel',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalPersonel)));
