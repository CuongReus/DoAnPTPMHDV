import qs from 'query-string';
import React from 'react';
import { translate } from 'react-i18next';
import { toast } from 'react-toastify';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import { ScriptUtils, UrlUtils } from '../../utils/javascriptUtils';
import ModalContactDetail from '../contactDetail/ModalContactDetail';
import ModalContact from './ModalContact';
import SecuredComponent from '../../components/SecuredComponent';
import { PermanentCacheService } from '../../services/middleware';
import { connect } from 'react-redux';
import { RenderSelect } from '../../components/formInputs';




const ContactRows = (props) => {
    const { currentNo,
        handleShowContactModal,
        handleShowContactDetailModal,
        deleteContact,
        deleteContactDetail,
        handleHidemodal,
        contactObject,
        contactDetailListByContactId,
        handleShowContactDetails,
        t
    } = props;
    if (contactDetailListByContactId && contactDetailListByContactId.isShown) {
        var contactDetailRows = contactDetailListByContactId.listContactDetail.map(item => {
            return <tr style={{ textAlign: 'center' }} className="alpha-slate" key={item.id}>
                <td>{currentNo}</td>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.position}</td>
                <td>{t(item.gender)}</td>
                <td colSpan = "4">{item.note}</td>
                {/* <td>{item.trustLevel}</td> */}
                {/* <td className="active-font" target={item.company?"YES":"NO"}>{item.company?"YES":"NO"}</td> */}
                <td className="text-center footable-visible footable-last-column">
                    <ul className="icons-list">
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <i className="icon-menu9"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-right">
                                <SecuredComponent allowedPermission="admin.contact.update">
                                    <li><a onClick={() => handleShowContactDetailModal(item.id, contactObject)}><i className="icon-pencil"></i>S???a Th??ng Tin</a></li>
                                </SecuredComponent>
                                <SecuredComponent allowedPermission="admin.contact.delete">
                                    <li><a onClick={() => deleteContactDetail(item.id)}><i className="icon-cross2"></i>X??a</a></li>
                                </SecuredComponent>
                            </ul>
                        </li>
                    </ul>
                </td>
            </tr>
        })
        var contactDetailBody = [<tr style={{ textAlign: 'center', whiteSpace: 'nowrap' }} className="success">
            <td>STT</td>
            <td>T??n</td>
            <td>S??? ??i???n Tho???i</td>
            <td>Email</td>
            <td>V??? Tr??</td>
            <td>Gi???i T??nh</td>
            <td colSpan="4">Ghi Ch??</td>

            <td className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></td>
        </tr>].concat(contactDetailRows)
    }
    return ([<tr style={{ textAlign: 'center' }} key={contactObject.id}>
        <td><button className="icon-arrow-down22" onClick={() => handleShowContactDetails(contactObject.id)}></button></td>
        <td>{currentNo}</td>
        <td>{contactObject.name}</td>
        <td>{contactObject.address}</td>
        <td>{t(contactObject.contactStatus)}</td>
        <td>{contactObject.note}</td>
        <td className="text-center footable-visible footable-last-column">
            <ul className="icons-list">
                <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                        <i className="icon-menu9"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-right">
                        <SecuredComponent allowedPermission="admin.contact.create">
                            <li><a onClick={() => handleShowContactDetailModal(null, contactObject)}><i className="icon-plus2"></i>Th??m M???i Chi Ti???t Li??n H???</a></li>
                        </SecuredComponent>
                        <SecuredComponent allowedPermission="admin.contact.update">
                            <li><a onClick={() => handleShowContactModal(contactObject.id)}><i className="icon-pencil"></i>S???a Th??ng Tin</a></li>
                        </SecuredComponent>
                        <SecuredComponent allowedPermission="admin.contact.delete">
                            <li><a onClick={() => deleteContact(contactObject.id)}><i className="icon-cross2"></i>X??a</a></li>
                        </SecuredComponent>
                    </ul>
                </li>
            </ul>
        </td>
    </tr>].concat(contactDetailBody))

}

let getContactDetailByContactId = (listContactDetailByContactId, contactId) => {
    for (var i = 0; i < listContactDetailByContactId.length; i++) {
        if (listContactDetailByContactId[i].contactId == contactId) {
            return listContactDetailByContactId[i];
        }
    }
    return null;
}

const selector = formValueSelector('ContactList');

const mapStateToProps = state => {
    return {
        // currentUser: state.common.currentUser,
        contactStatusSelector:selector(state,"contactStatus")


    };
};
const mapDispatchToProps = dispatch => ({
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ContactList", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});

class ContactList extends React.Component {
    constructor() {
        super();
        let initialContactStatus = 'ALL'
        initialContactStatus = PermanentCacheService.getItem("selected_contact_contactStatus") ? PermanentCacheService.getItem("selected_contact_contactStatus") : initialContactStatus;

        this.state = {
            listContact: [],
            isContactModalShown: false,
            reloadNum: 1,
            contactId: null,
            contactDto: null,
            isShowContactDetailModal: false,
            listContactDetailByContactId: [],
            contactStatus:initialContactStatus

        }
        this.handleShowContactModal = this.handleShowContactModal.bind(this);
        this.updateListContact = this.updateListContact.bind(this);
        this.deleteContact = this.deleteContact.bind(this);

        this.handleHidemodal = () => {
            this.setState({
                isContactModalShown: false,
                isShowContactDetailModal: false
            });
            this.updateListContact();
            this.updateContactDetail(this.state.contactId);


        }
        this.setPermanentCache = (contactStatus) => {
            if (contactStatus) {
                PermanentCacheService.setItem("selected_contact_contactStatus", contactStatus);
            }
            this.setState({
                contactStatus: contactStatus ? contactStatus : this.state.contactStatus,
            }, () => this.updateListContact());
        };
        this.handleShowContactDetailModal = (id, contactDto) => {
            this.setState({
                idContactDetail: id,
                contactDto: contactDto,
                isShowContactDetailModal: true
            });
        }

        this.deleteContactDetail = (contactId) => {
            var _this = this;
            if (confirm("B???n c?? ch???c s??? xo?? ?")) {
                var url = `/contactDetail/${contactId}`;
                return agent.asyncRequests.del(url
                ).then(function (res) {
                    var result = res.body.resultData;
                    if (result && !result.error) {
                        alert("Xo?? Th??nh C??ng.");
                        _this.updateContactDetail(_this.state.contactId);
                    } else {
                        toast.error("C?? l???i khi x??a d??? li???u. L???i: " + result.errorMessage, { autoClose: 15000 });
                    }
                }, function (err) {
                    toast.error("Kh??ng th??? x??a d??? li???u ??ang ???????c s??? d???ng t??? m??n h??nh kh??c!", { autoClose: 15000 });
                });
            } else {
            }
        }

        this.updateContactDetail = (contactId) => {
            var listContactDetail = this.state.listContactDetailByContactId;
            var reloadNum = this.state.reloadNum;
            if (contactId) {
                let setStateInRequest = (list) => {
                    var contactDetailByContactId = getContactDetailByContactId(listContactDetail, contactId)
                    if (contactDetailByContactId) {
                        contactDetailByContactId.listContactDetail = list;
                        contactDetailByContactId.isShown = true;
                    } else {
                        listContactDetail.push({ contactId: contactId, listContactDetail: list, isShown: true });
                    }
                    this.setState({ listContactDetailByContactId: listContactDetail, reloadNum: reloadNum + 1 });
                }
                return agent.asyncRequests.get("/contactDetail/listFindByContactId?contactId=" + contactId).then(function (res) {
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
        }

        this.handleShowContactDetails = (contactId) => {
            
            var listContactDetail = this.state.listContactDetailByContactId;
            var reloadNum = this.state.reloadNum;
            if (contactId) {
                this.setState({ contactId: contactId })
                var currentContactDetailShown = getContactDetailByContactId(listContactDetail, contactId);
                if (currentContactDetailShown && currentContactDetailShown.isShown) {
                    currentContactDetailShown.isShown = false;
                    this.setState({ reloadNum: reloadNum + 1 });
                    return;
                }
                let setStateInRequest = (list) => {
                    var newContactDetailByContactId = getContactDetailByContactId(this.state.listContactDetailByContactId, contactId)
                    if (newContactDetailByContactId) {
                        newContactDetailByContactId.listContactDetail = list;
                        newContactDetailByContactId.isShown = true;
                    } else {
                        listContactDetail.push({ contactId: contactId, listContactDetail: list, isShown: true });
                    }
                    this.setState({ listContactDetailByContactId: listContactDetail, reloadNum: reloadNum + 1 });
                }
                return agent.asyncRequests.get("/contactDetail/listFindByContactId?contactId=" + contactId).then(function (res) {
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

        };
    };

    updateListContact() {
        const {contactStatus} = this.state;
        var search = qs.parse(this.props.location.search).search;
        if(!search){
            search = "";
            }
        var page = qs.parse(this.props.location.search).page;
        let setStateInRequest = (list) => { this.setState({ listContact: list }) }
        return (agent.asyncRequests.getPage("/contact/listFindByContactStatusAndNameOrTaxNumber?contactStatus=" + contactStatus + "&nameOrTaxNumber=" + search, page).then(function (res) {
            
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            }
            else {
                toast.error("C?? l???i khi t???i d??? li???u. L???i: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("C?? l???i khi t???i d??? li???u. Qu?? kh??ch vui l??ng ki???m tra k???t n???i internet v?? th??? l???i. Ho???c li??n h??? qu???n tr??? vi??n.", { autoClose: 15000 });
        }))
    };

    componentWillMount() {
        const { updateField } = this.props;
        const contactStatus = this.state.contactStatus;
        updateField("contactStatus", contactStatus);
        this.updateListContact();
    };

    componentDidUpdate() {
        ScriptUtils.loadFootable();
    };

    //Delete Contact Function
    deleteContact(id) {
        var updateListContact = this.updateListContact;
        if (confirm("B???n c?? ch???c s??? xo?? ?")) {
            var url = `/contact/${id}`;
            return agent.asyncRequests.del(url
            ).then(function (res) {
                var result = res.body.resultData;
                if (result && !result.error) {
                    alert("Xo?? Th??nh C??ng.");
                    updateListContact();
                } else {
                    toast.error("C?? l???i khi x??a d??? li???u. L???i: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Kh??ng th??? x??a d??? li???u ??ang ???????c s??? d???ng t??? m??n h??nh kh??c!", { autoClose: 15000 });
            });
        } else {
        }
    };

    handleShowContactModal(id) {
        this.setState({
            isContactModalShown: true,
            idContact: id
        })
    };

    render() {
        const data = this.state.listContact;
        // var baseUrl = UrlUtils.getPathWithParamsNotPaging();
        var page = qs.parse(this.props.location.search).page;
        const { t, contactStatusSelector } = this.props;
        if (!page) {
            page = 1;
        }
        if (!data.content) {
            return null;
        }
        // var currentNo = 0;

        var currentNo = ((page - 1) * 20);
        var rows = data.content.map((item, index) => {
            currentNo = currentNo + 1;
            return (
                // here is table body / Row
                <ContactRows key={currentNo}
                    t={t}
                    handleShowContactModal={this.handleShowContactModal}
                    handleShowContactDetailModal={this.handleShowContactDetailModal}
                    deleteContact={this.deleteContact}
                    deleteContactDetail={this.deleteContactDetail}
                    contactObject={item}
                    contactDetailListByContactId={getContactDetailByContactId(this.state.listContactDetailByContactId, item.id)}
                    handleShowContactDetails={this.handleShowContactDetails}
                    index={index}
                    updateContactDetail={this.updateContactDetail}
                    currentNo={currentNo}  ></ContactRows>
            );
        });

        var search = qs.parse(this.props.location.search).search;
        if(!search){
            search = "";
            }
        var optionContactStatus = [
            { label: "T???t C???", value: "ALL" },
            { label: "Kh??ch H??ng L???", value: "KH_LE" },
            { label: "?????i L??", value: "DAI_LY" }
        ]
        return (

            <div className="content-wrapper">
                <div className="page-header page-header-default">
                <div className="breadcrumb-line">
                    <ul className="breadcrumb">
                        <li><a href=""><i className="icon-home2 position-left"></i> Home</a> </li>
                        <li className="active">Th??ng tin ?????i t??c</li>
                        <li className="active">Danh s??ch Kh??ch H??ng</li>
                    </ul>
                    <div className="heading-elements">
                        <div className="heading-btn-group">
                        <SecuredComponent allowedPermission="admin.contact.create">
                            <button className="btn bg-teal"   onClick={() => this.handleShowContactModal()}>Th??m M???i</button>
                        </SecuredComponent>
                        </div>
                    </div>
                </div>
                </div>
                <div className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-flat">

                                <div className="panel-body">
                                    <form className="main-search" role="form">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label className="control-label col-md-1" htmlFor="company">Ph??n Lo???i</label>
                                                <div className="col-md-3">
                                                    <Field name="contactStatus" placeholder="T???t C???" options={optionContactStatus} onChangeAction={(value) => this.setPermanentCache(value, contactStatusSelector)} component={RenderSelect}></Field>
                                                </div>
                                            </div>
                                        </div>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <div className="input-group content-group">
                                            <div className="has-feedback has-feedback-left">
                                                <input type="text" className="form-control input-xlg" placeholder="Nh????p t??n Kh??ch H??ng..." name="search" defaultValue={search} autoFocus={true} />
                                                <div className="form-control-feedback">
                                                    <i className="icon-search4 text-muted text-size-base"></i>
                                                </div>
                                            </div>
                                            <div className="input-group-btn">
                                                <button type="submit" className="btn bg-teal btn-xlg">T??m</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            {this.state.isContactModalShown ? <ModalContact title="Kh??ch H??ng" idContact={this.state.idContact} show={this.state.isContactModalShown} onHide={this.handleHidemodal} /> : null}
                            {this.state.isShowContactDetailModal ? <ModalContactDetail title="Chi Ti???t ????n V??? Li??n H???" idContactDetail={this.state.idContactDetail} contactDto={this.state.contactDto} show={this.state.isShowContactDetailModal} onHide={this.handleHidemodal} /> : null}

                            <div className="panel panel-flat">
                                <table className="table table-togglable table-bordered">
                                    <thead>
                                        <tr className="bg-teal">
                                            <th style={{ textAlign: 'center' }} className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                            <th style={{ textAlign: 'center' }} data-toggle="true">STT</th>
                                            <th style={{ textAlign: 'center' }} data-toggle="true">T??n</th>
                                            {/* <th style={{ textAlign: 'center' }} colSpan="2" data-hide="phone">M?? S??? Thu???</th> */}
                                            <th style={{ textAlign: 'center' }} data-hide="phone">?????a Ch???</th>
                                            <th style={{ textAlign: 'center' }} data-hide="phone">Lo???i Kh??ch H??ng</th>
                                            {/* <th style={{ textAlign: 'center' }} data-hide="phone">Ph???n Tr??m Chi???t Kh???u</th> */}
                                            <th style={{ textAlign: 'center' }} data-hide="phone">Ghi Ch??</th>
                                            <th style={{ textAlign: 'center' }} className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>
                            <TablePagination data={data} baseUrl={"/listContact"} />
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'ContactList',
            destroyOnUnmount: true,
            enableReinitialize: true,
        })(ContactList)));