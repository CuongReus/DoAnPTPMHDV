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
import { LOAD_UPDATING_JOB } from './action-types';
import SecuredComponent from '../../components/SecuredComponent';
import ModalSwotJob from '../swotJob/ModalSwotJob';

const SwotItemRows = (props) => {
    const { currentNo,
        swotItemObject,
        t,
        handleShowModalSwot,
        deleteSwotJob,
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
        <td>{swotItemObject.note}</td>
        <td className="text-center footable-visible footable-last-column">
            <ul className="icons-list">
                <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                        <i className="icon-menu9"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-right">
                        <SecuredComponent allowedPermission="admin.contact.update">
                            <li><a onClick={() => handleShowModalSwot(swotItemObject.id)}><i className="icon-pencil"></i>S???a Th??ng Tin</a></li>
                        </SecuredComponent>
                        <SecuredComponent allowedPermission="admin.users.delete">
                            <li><a onClick={() => deleteSwotJob(swotItemObject.id)}><i className="icon-cross2"></i>X??a</a></li>
                        </SecuredComponent>
                    </ul>
                </li>
            </ul>
        </td>
    </tr>])
}

let getSwotItemByJobId = (listSwotItemByJobId, jobId) => {
    for (var i = 0; i < listSwotItemByJobId.length; i++) {
        if (listSwotItemByJobId[i].jobId == jobId) {
            return listSwotItemByJobId[i];
        }
    }
    return null;
}

const validate = values => {
    const errors = {};
    if (!values.title) {
        errors.title = 'Vui l??ng nh???p t??n ngh??? nghi???p';
    }
    return errors;
}
const selector = formValueSelector("ModalJob");
const mapStateToProps = state => {
    var updateValue = {
        ...state.jobReducer.updatingJob
    };
    return {
        initialValues: updateValue,
        currentUser: state.common.currentUser,
    };
};

const mapDispatchToProps = dispatch => ({
    loadJob: (payload) =>
        dispatch({ type: LOAD_UPDATING_JOB, payload: payload }),
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalJob", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })

});


class ModalJob extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listSwotItemByJobId: [],
            disableDataManipulation: true,
            isSwotJobModalShown: false,
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.handleShowModalSwot = this.handleShowModalSwot.bind(this);
        this.handleHideModalSwot = this.handleHideModalSwot.bind(this);
        this.deleteSwotJob = this.deleteSwotJob.bind(this);
        this.getListSwotItemByJobId = this.getListSwotItemByJobId.bind(this);
    }

    getListSwotItemByJobId() {
        var id = this.props.idJob;
        let setStateInRequest = (list) => { this.setState({ listSwotItemByJobId: list }) }
        return agent.asyncRequests.get("/swotJob/listFindByJobId?jobId=" + id).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("C?? l???i khi t???i d??? li???u. L???i: " + result.errorMessage, { autoClose: 15000 });
            }
        });
    };

    componentWillMount() {
        const { loadJob } = this.props;
        var id = this.props.idJob;
        const dataPromise = agent.JobApi.getJob(id);
        loadJob(Promise.resolve(dataPromise));

        return (
            this.getListSwotItemByJobId()
        )

    }

    deleteSwotJob(id) {
        var _this = this;
        if (confirm("B???n c?? ch???c s??? xo?? ?")) {
            var url = `/swotJob/${id}`;
            return agent.asyncRequests.del(url
            ).then(function (res) {
                var result = res.body.resultData;
                if (result && !result.error) {
                    alert("Xo?? Th??nh C??ng.");
                    _this.getListSwotItemByJobId();
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
            isSwotJobModalShown: true,
            idSwotJob: id
        })
    };
    handleHideModalSwot() {
        this.setState({
            isSwotJobModalShown: false
        });
        this.getListSwotItemByJobId();
    };

    handleAdd(values) {
        var onHide = this.props.onHide;
        var id = this.props.idJob;
        var url = '/job/add';
        var bodyObject = {
            title: values.title,
            description: values.description,
        };
        if (id) {
            url = '/job/update';
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
        const data = this.state.listSwotItemByJobId;
        const {t} = this.props;
        const { handleSubmit, submitting, title, invalid, currentUser, idJob } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show, bsSize: "xS", onHide: this.props.onHide, submitting: this.props.submitting };
        
        var newModal = null;
        console.log(data)
        var currentNo = 0;
        var rows = data.map((item, index) => {
            currentNo = currentNo + 1;
            return (
                // here is table body / Row
                <SwotItemRows key={currentNo}
                    handleShowModalSwot={this.handleShowModalSwot}
                    handleHideModalSwot={this.handleHideModalSwot}
                    deleteSwotJob={this.deleteSwotJob}
                    index={index}
                    t={t}
                    swotItemObject={item}
                    swotItemListByJobId={getSwotItemByJobId(this.state.listSwotItemByJobId, idJob)}
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
                                    <div style={{ display: 'block ' }} className="form-group">
                                        <div className="tabbable">
                                            <ul className="nav nav-tabs nav-tabs-highlight nav-justified mb-0">
                                                <ul className="nav nav-tabs nav-tabs-solid nav-tabs-component">
                                                    <li className="active" style={{width: 50 + '%', textAlign: 'center'}}>
                                                        <a href="#default-justified-tab1" data-toggle="tab">Th??ng Tin Ngh??? Nghi???p</a>
                                                    </li>
                                                    <li style={{width: 50 + '%', textAlign: 'center'}}>
                                                        <a href="#default-justified-tab2" data-toggle="tab">????nh Gi?? SWOT ngh??? nghi???p</a>
                                                    </li>
                                                </ul>
                                            </ul>
                                            <div className="tab-content">
                                                <div className="tab-pane active" id="default-justified-tab1">
                                                    <Field name="title" label="T??n Ngh??? Nghi???p" placeholder="Nh???p T??n Ngh??? Nghi???p" component={RenderInputWithDiv}></Field>
                                                    <Field name="description" label="M?? T??? Ngh??? Nghi???p" placeholder="Nh???p M?? T???" rows={3} component={RenderTextArea}></Field>
                                                        <div className="text-right">
                                                    <button type="button" className="btn btn-link" onClick={this.handleHideAndClear} >H???y</button>
                                                    <button type="button" className="btn bg-orange" disabled={submitting} onClick={handleSubmit(this.handleAdd)}>L??u</button>
                                                </div>
                                                </div>
                                            <div className="tab-pane" id="default-justified-tab2">
                                                <div className="page-header">
                                                    <h4>
                                                        <i className=" icon-paragraph-justify2 position-left"></i>
                                                        <span className="text-semibold">????nh gi?? SWOT ngh??? nghi???p</span>
                                                        <span className="pull-right">
                                                            {idJob ? <SecuredComponent allowedPermission="admin.users.create">
                                                                <button type="button" style={{ marginLeft: '10px' }} className="btn bg-teal" onClick={() => this.handleShowModalSwot()}>Th??m M???i SWOT</button>
                                                            </SecuredComponent> : null}
                                                        </span>
                                                    </h4>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                    {this.state.isSwotJobModalShown ? <ModalSwotJob title="SWOT ngh??? nghi???p" idSwotJob={this.state.idSwotJob} show={this.state.isSwotJobModalShown} idJob={this.props.idJob} onHide={this.handleHideModalSwot} /> : null}

                                                        <div className="panel panel-flat">
                                                            <table style={{ textAlign: 'center' }} className="table table-xxs">
                                                                <thead>
                                                                <tr className="bg-teal">
                                                                    <th data-toggle="true">STT</th>
                                                                    <th data-hide="phone"><center>Ti??u ?????</center></th>
                                                                    <th data-hide="phone"><center>Lo???i</center></th>
                                                                    <th data-hide="phone"><center>Ghi ch??</center></th>
                                                                    <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                {idJob ? rows : null}
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
            form: 'ModalJob',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalJob)));
