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
                            <li><a onClick={() => this.handleShowModalSwot(swotItemObject.id)}><i className="icon-pencil"></i>S???a</a></li> : null} */}
                        {/* <SecuredComponent allowedPermission="admin.users.update">
                            <li><a onClick={() => this.handleShowModalSwot(swotItemObject.id)}><i className="icon-pencil"></i>S???a</a></li>
                        </SecuredComponent> */}
                        <SecuredComponent allowedPermission="admin.contact.update">
                            <li><a onClick={() => handleShowModalSwot(swotItemObject.id)}><i className="icon-pencil"></i>S???a Th??ng Tin</a></li>
                        </SecuredComponent>
                        <SecuredComponent allowedPermission="admin.users.delete">
                            <li><a onClick={() => deleteSwotUser(swotItemObject.id)}><i className="icon-cross2"></i>X??a</a></li>
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
        errors.email = 'Vui l??ng nh???p email.';
    } else if (!isEmail(values.email)) {
        errors.email = 'Email kh??ng h???p l???.';
    };
    if (!values.id && !values.password) {
        errors.password = 'Vui l??ng nh???p m???t kh???u.';
    } else if (values.password) {
        if (values.password.length < 6) {
            errors.password = "????? b???o m???t, m???t kh???u ph???i ch???a 6 k?? t??? tr??? l??n.";
        }
    };
    if (!values.code) {
        errors.code = 'Vui l??ng nh???p m?? nh??n vi??n!';
    };
    if (!values.fullName) {
        errors.fullName = 'Vui l??ng nh???p h??? t??n!';
    };
    
    if (!values.companyId) {
        errors.companyId = "Vui l??ng ch???n c??ng ty l??m vi???c!"
    };
    if (values.birthday) {
        if (moment(values.birthday).format("YYYY") > moment(birthdaymin).format("YYYY")) {
            errors.birthday = "Tu???i c???a Nh??n vi??n ch??a ????ng. Vui l??ng nh???p n??m sinh nh??? h??n ho???c b???ng n??m " + moment(birthdaymin).format("YYYY");
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
            listAllJobs: [],
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
                toast.error("C?? l???i khi t???i d??? li???u. L???i: " + result.errorMessage, { autoClose: 15000 });
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
            this.getListSwotItemByUserId(),
            this.getListJob()
        )

    }

    getListCompany() {
        let setStateInRequest = (list) => { this.setState({ listAllCompanys: list }) }
        return agent.asyncRequests.get("/company/listAll").then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("C?? l???i khi t???i d??? li???u. L???i: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("C?? l???i khi t???i d??? li???u. Qu?? kh??ch vui l??ng ki???m tra k???t n???i internet v?? th??? l???i. Ho???c li??n h??? qu???n tr??? vi??n.", { autoClose: 15000 });
        });
    }

    getListJob() {
        let setStateInRequest = (list) => { this.setState({ listAllJobs: list }) }
        return agent.asyncRequests.get("/job/listAll").then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("C?? l???i khi t???i d??? li???u. L???i: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("C?? l???i khi t???i d??? li???u. Qu?? kh??ch vui l??ng ki???m tra k???t n???i internet v?? th??? l???i. Ho???c li??n h??? qu???n tr??? vi??n.", { autoClose: 15000 });
        });
    }

    getListDepartment() {
        let setStateInRequest = (list) => { this.setState({ listAllDepartment: list }) }
        return agent.asyncRequests.get("/department/listAll").then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("C?? l???i khi t???i d??? li???u. L???i: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("C?? l???i khi t???i d??? li???u. Qu?? kh??ch vui l??ng ki???m tra k???t n???i internet v?? th??? l???i. Ho???c li??n h??? qu???n tr??? vi??n.", { autoClose: 15000 });
        });
    }
    getListRoles() {
        let setStateInRequest = (list) => { this.setState({ listAllRoles: list }) }
        return agent.asyncRequests.get("/role/listAll").then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("C?? l???i khi t???i d??? li???u. L???i: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("C?? l???i khi t???i d??? li???u. Qu?? kh??ch vui l??ng ki???m tra k???t n???i internet v?? th??? l???i. Ho???c li??n h??? qu???n tr??? vi??n.", { autoClose: 15000 });
        });
    }

    deleteSwotUser(id) {
        var _this = this;
        if (confirm("B???n c?? ch???c s??? xo?? ?")) {
            var url = `/swotUser/${id}`;
            return agent.asyncRequests.del(url
            ).then(function (res) {
                var result = res.body.resultData;
                if (result && !result.error) {
                    alert("Xo?? Th??nh C??ng.");
                    _this.getListSwotItemByUserId();
                } else {
                    toast.error("C?? l???i khi x??a d??? li???u. L???i: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Kh??ng th??? x??a d??? li???u ??ang ???????c s??? d???ng t??? m??n h??nh kh??c!", { autoClose: 15000 });
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
            jobId: values.jobId,
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
                toast.info("L??u Th??nh C??ng.", { autoClose: 8000 });
            } else {
                onHide();
            }
        }, function (err) {
            toast.error("C?? l???i khi l??u tr???. Qu?? kh??ch vui l??ng ki???m tra k???t n???i internet v?? th??? l???i. Ho???c li??n h??? qu???n tr??? vi??n.", { autoClose: 15000 });
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
        var optionJobs = [];
        this.state.listAllJobs.map(item => {
            optionJobs.push({ label: item.title, value: item.id })
        })
        
        var newModal = null;
        var dateNow = new Date();
        var optionGender = [
            { label: "Nam", value: "MALE" },
            { label: "N???", value: "FEMALE" },
            { label: "Kh??c", value: "OTHER" }
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
                                                        <a href="#default-justified-tab1" data-toggle="tab">Th??ng Tin T???ng Qu??t</a>
                                                    </li>
                                                    <li style={{width: 50 + '%', textAlign: 'center'}}>
                                                        <a href="#default-justified-tab2" data-toggle="tab">????nh Gi?? SWOT nh??n vi??n</a>
                                                    </li>
                                                </ul>
                                            </ul>
                                            <div className="tab-content">
                                                <div className="tab-pane active" id="default-justified-tab1">
                                                <Field name="code" label="M?? Nh??n Vi??n(*)" placeholder="Nh???p m?? nh??n vi??n..." component={RenderInputWithDiv}></Field>
                                                        <Field name="fullName" label="H??? T??n(*)" placeholder="Nh???p h??? t??n ng?????i d??ng..." component={RenderInputWithDiv}></Field>
                                                        <Field name="email" type="email" label="Email(*)" placeholder="Nh???p email ng?????i d??ng..." component={RenderInputWithDiv}></Field>
                                                        <Field name="password" label="M???t kh???u(*)" placeholder="Nh???p m???t kh???u..." component={RenderInputPassword}></Field>
                                                        <Field name="phone" label="S??? ??i???n Tho???i" placeholder="Nh???p s??? ??i???n tho???i..." component={RenderNumberInput}></Field>
                                                        <Field name="birthday" dateFormat="DD/MM/YYYY" label="Ng??y Sinh" component={RenderDatePicker}></Field>
                                                        <Field name="gender" label="Gi???i T??nh" options={optionGender} component={RenderSelect}></Field>
                                                        <Field name="companyId" label="Thu???c c??ng ty(*)" options={optionCompanies} component={RenderSelect} ></Field>
                                                        <Field name="jobId" label="Ngh??? nghi???p(*)" options={optionJobs} component={RenderSelect} ></Field>
                                                        <Field name="departmentId" disabled={!SecurityUtils.hasPermission(currentUser, "admin.users.update") ? true : false} label="Thu???c Ph??ng Ban" placeholder="Ch???n ph??ng ban..." options={optionDepartment} component={RenderSelect}></Field>
                                                        <Field disabled={!SecurityUtils.hasPermission(currentUser, "admin.users.setupAnnualLeaveForUser") ? true :false} name="annualLeaveYear" label="S??? Ng??y Ph??p / N??m" placeholder="Nh???p s??? ng??y ph??p c???a nh??n vi??n / n??m..." component={RenderNumberInput}></Field>
                                                        <Field name="currentAddress" label="?????a Ch??? Hi???n T???i" placeholder="Nh???p ?????a ch??? hi???n t???i..." component={RenderInputWithDiv}></Field>
                                                        <div className="text-right">
                                                    <button type="button" className="btn btn-link" onClick={this.handleHideAndClear} >H???y</button>
                                                    <button type="button" className="btn bg-orange" disabled={submitting} onClick={handleSubmit(this.handleAdd)}>L??u</button>
                                                </div>
                                                </div>
                                            <div className="tab-pane" id="default-justified-tab2">
                                                <div className="page-header">
                                                    <h4>
                                                        <i className=" icon-paragraph-justify2 position-left"></i>
                                                        <span className="text-semibold">????nh gi?? SWOT</span>
                                                        <span className="pull-right">
                                                            {idUser ? <SecuredComponent allowedPermission="admin.users.create">
                                                                <button type="button" style={{ marginLeft: '10px' }} className="btn bg-teal" onClick={() => this.handleShowModalSwot()}>Th??m M???i SWOT</button>
                                                            </SecuredComponent> : null}
                                                        </span>
                                                    </h4>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                    {this.state.isSwotUserModalShown ? <ModalSwotUser title="Th??m Swot nh??n vi??n" idSwotUser={this.state.idSwotUser} show={this.state.isSwotUserModalShown} idUser={this.props.idUser} onHide={this.handleHideModalSwot} /> : null}

                                                        <div className="panel panel-flat">
                                                            <table style={{ textAlign: 'center' }} className="table table-xxs">
                                                                <thead>
                                                                <tr className="bg-teal">
                                                                    <th data-toggle="true">STT</th>
                                                                    <th data-hide="phone"><center>Ti??u ?????</center></th>
                                                                    <th data-hide="phone"><center>Lo???i</center></th>
                                                                    <th data-hide="phone"><center>N??m kinh nghi???m</center></th>
                                                                    <th data-hide="phone"><center>Ghi ch??</center></th>
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
