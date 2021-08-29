import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderDatePicker, RenderSelect, RenderTextArea, RenderNumberInput, RenderInputPassword } from '../../components/formInputs';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import isEmail from 'sane-email-validation';
import { SecurityUtils, UrlUtils } from '../../utils/javascriptUtils';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_PERSONEL } from './action-types';
import SecuredComponent from '../../components/SecuredComponent';
import moment from 'moment';
import ModalSwotUser from '../swotUser/ModalSwotUser';
import TablePagination from '../../components/TablePagination';

const SwotItemRows = (props) => {
    const { currentNo,
        swotItemObject,
        t,
        handleShowModalSwot,
        deleteSwotUser,
    } = props;
    return ([<tr key={1}>
        <td>{currentNo}</td>
        {/* <td>{swotItemObject ? swotItemObject.swotItem.title : null}</td> */}
        <td>{swotItemObject.swotItem.title}</td>
        <td>
            {/* <span class="label label-success">{swotItemObject.swotItem.swotType}</span> */}
            {(function() {
                    if (swotItemObject.swotItem.swotType === 'STRENGTH') {
                      return (
                        (
                            <span className="label label-success">{t(swotItemObject.swotItem.swotType)}</span>
                        )
                      )
                    }else if(swotItemObject.swotItem.swotType === 'WEAKNESS'){
                        return (
                            (
                                <span className="label label-danger">{t(swotItemObject.swotItem.swotType)}</span>
                            )
                    )}else if(swotItemObject.swotItem.swotType === 'OPPORTUNITY'){
                        return (
                            (
                                <span className="label label-primary">{t(swotItemObject.swotItem.swotType)}</span>
                            )
                    )}else{
                        return (
                            (
                                <span className="label label-warning">{t(swotItemObject.swotItem.swotType)}</span>
                            )
                    )}
                  })()}
        </td>
        <td>{swotItemObject.numberOfYears}</td>
        <td>{swotItemObject.note}</td>
        <td className="text-center footable-visible footable-last-column">
            <ul className="icons-list">
                <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                        <i className="icon-menu9"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-right">
                        {/* {SecurityUtils.hasPermission(currentUser, "admin.users.update") || currentUser.id == swotItemObject.id ?
                            <li><a onClick={() => this.handleShowModalSwot(swotItemObject.id)}><i className="icon-pencil"></i>Sửa</a></li> : null} */}
                        {/* <SecuredComponent allowedPermission="admin.users.update">
                            <li><a onClick={() => this.handleShowModalSwot(swotItemObject.id)}><i className="icon-pencil"></i>Sửa</a></li>
                        </SecuredComponent> */}
                        <SecuredComponent allowedPermission="admin.contact.update">
                            <li><a onClick={() => handleShowModalSwot(swotItemObject.id)}><i className="icon-pencil"></i>Sửa Thông Tin</a></li>
                        </SecuredComponent>
                        <SecuredComponent allowedPermission="admin.users.delete">
                            <li><a onClick={() => deleteSwotUser(swotItemObject.id)}><i className="icon-cross2"></i>Xóa</a></li>
                        </SecuredComponent>
                    </ul>
                </li>
            </ul>
        </td>
    </tr>])
}

let getSwotItemByUserId = (listSwotItemByUserId, userId) => {
    for (var i = 0; i < listSwotItemByUserId.length; i++) {
        if (listSwotItemByUserId[i].userId == userId) {
            return listSwotItemByUserId[i];
        }
    }
    return null;
}

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
            listSwotItemByUserId: [],
            disableDataManipulation: true,
            isSwotUserModalShown: false,
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.handleShowModalSwot = this.handleShowModalSwot.bind(this);
        this.handleHideModalSwot = this.handleHideModalSwot.bind(this);
        this.deleteSwotUser = this.deleteSwotUser.bind(this);
        this.getListSwotItemByUserId = this.getListSwotItemByUserId.bind(this);
    }

    getListSwotItemByUserId() {
        var id = this.props.idUser;
        let setStateInRequest = (list) => { this.setState({ listSwotItemByUserId: list }) }
        return agent.asyncRequests.get("/swotUser/listFindByUserId?userId=" + id).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        });
    };

    componentWillMount() {
        const { loadPersonel } = this.props;
        var id = this.props.idUser;
        const dataPromise = agent.UserApi.getPersonel(id);
        loadPersonel(Promise.resolve(dataPromise));

        return (
            this.getListCompany(),
            this.getListRoles(),
            this.getListDepartment(),
            this.getListSwotItemByUserId()
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

    deleteSwotUser(id) {
        var _this = this;
        if (confirm("Bạn có chắc sẽ xoá ?")) {
            var url = `/swotUser/${id}`;
            return agent.asyncRequests.del(url
            ).then(function (res) {
                var result = res.body.resultData;
                if (result && !result.error) {
                    alert("Xoá Thành Công.");
                    _this.getListSwotItemByUserId();
                } else {
                    toast.error("Có lỗi khi xóa dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Không thể xóa dữ liệu đang được sử dụng từ màn hình khác!", { autoClose: 15000 });
            });
        } else {
        }
    };

    handleShowModalSwot(id) {
        this.setState({
            isSwotUserModalShown: true,
            idSwotUser: id
        })
    };
    handleHideModalSwot() {
        this.setState({
            isSwotUserModalShown: false
        });
        this.getListSwotItemByUserId();
    };

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
                onHide();
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
        const data = this.state.listSwotItemByUserId;
        const {t} = this.props;
        var baseUrl = UrlUtils.getPathWithParamsNotPaging();
        const { handleSubmit, submitting, title, invalid, currentUser, isSalaryConfig, idUser } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show, bsSize: "xS", onHide: this.props.onHide, submitting: this.props.submitting };
        var dataCompany = this.state.listAllCompanys;
        
        var optionCompanies = [];
        dataCompany.map(item => {
            optionCompanies.push({ label: item.name, value: item.id })
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
        var currentNo = 0;
        var rows = data.map((item, index) => {
            currentNo = currentNo + 1;
            return (
                // here is table body / Row
                <SwotItemRows key={currentNo}
                    handleShowModalSwot={this.handleShowModalSwot}
                    handleHideModalSwot={this.handleHideModalSwot}
                    deleteSwotUser={this.deleteSwotUser}
                    index={index}
                    t={t}
                    swotItemObject={item}
                    swotItemListByUserId={getSwotItemByUserId(this.state.listSwotItemByUserId, currentUser.id)}
                    currentNo={currentNo} ></SwotItemRows>
            );
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
                            <form className="form-horizontal">
                                <div className="form-group">
                                    <div style={isSalaryConfig ? { display: 'none' } : { display: 'block ' }} className="form-group">
                                        <div className="tabbable">
                                            <ul className="nav nav-tabs nav-tabs-highlight nav-justified mb-0">
                                                <ul className="nav nav-tabs nav-tabs-solid nav-tabs-component">
                                                    <li className="active" style={{width: 50 + '%', textAlign: 'center'}}>
                                                        <a href="#default-justified-tab1" data-toggle="tab">Thông Tin Tổng Quát</a>
                                                    </li>
                                                    <li style={{width: 50 + '%', textAlign: 'center'}}>
                                                        <a href="#default-justified-tab2" data-toggle="tab">Đánh Giá SWOT nhân viên</a>
                                                    </li>
                                                </ul>
                                            </ul>
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
                                                        <Field disabled={!SecurityUtils.hasPermission(currentUser, "admin.users.setupAnnualLeaveForUser") ? true :false} name="annualLeaveYear" label="Số Ngày Phép / Năm" placeholder="Nhập số ngày phép của nhân viên / năm..." component={RenderNumberInput}></Field>
                                                        <Field name="currentAddress" label="Địa Chỉ Hiện Tại" placeholder="Nhập địa chỉ hiện tại..." component={RenderInputWithDiv}></Field>
                                                        <div className="text-right">
                                                    <button type="button" className="btn btn-link" onClick={this.handleHideAndClear} >Hủy</button>
                                                    <button type="button" className="btn bg-orange" disabled={submitting} onClick={handleSubmit(this.handleAdd)}>Lưu</button>
                                                </div>
                                                </div>
                                            <div className="tab-pane" id="default-justified-tab2">
                                                <div className="page-header">
                                                    <h4>
                                                        <i className=" icon-paragraph-justify2 position-left"></i>
                                                        <span className="text-semibold">Đánh giá SWOT</span>
                                                        <span className="pull-right">
                                                            {idUser ? <SecuredComponent allowedPermission="admin.users.create">
                                                                <button type="button" style={{ marginLeft: '10px' }} className="btn bg-teal" onClick={() => this.handleShowModalSwot()}>Thêm Mới SWOT</button>
                                                            </SecuredComponent> : null}
                                                        </span>
                                                    </h4>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                    {this.state.isSwotUserModalShown ? <ModalSwotUser title="Thêm Swot nhân viên" idSwotUser={this.state.idSwotUser} show={this.state.isSwotUserModalShown} idUser={this.props.idUser} onHide={this.handleHideModalSwot} /> : null}

                                                        <div className="panel panel-flat">
                                                            <table style={{ textAlign: 'center' }} className="table table-xxs">
                                                                <thead>
                                                                <tr className="bg-teal">
                                                                    <th data-toggle="true">STT</th>
                                                                    <th data-hide="phone"><center>Tiêu đề</center></th>
                                                                    <th data-hide="phone"><center>Loại</center></th>
                                                                    <th data-hide="phone"><center>Năm kinh nghiệm</center></th>
                                                                    <th data-hide="phone"><center>Ghi chú</center></th>
                                                                    <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                {idUser ? rows : null}
                                                                </tbody>

                                                            </table>
                                                        </div>
                                                        {/* <TablePagination data={data} baseUrl={baseUrl} /> */}
                                                        
                                                    </div>  
                                                </div>
                                            </div>
                                                
                                            </div>
                                        </div>
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
            form: 'ModalPersonel',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalPersonel)));
