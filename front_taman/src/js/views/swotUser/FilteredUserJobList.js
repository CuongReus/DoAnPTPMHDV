import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { ScriptUtils, UrlUtils, SecurityUtils } from '../../utils/javascriptUtils';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import SecuredComponent from '../../components/SecuredComponent';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { RenderMultiSelect, RenderSelect, RenderSwitch } from '../../components/formInputs';


const selector = formValueSelector("FilteredUserJobList");
const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
    selectedJobIdSelector: selector(state, "selectedJobId"),
    currentJobIdsSelecter: selector(state, "currentJobIds"),
});

const mapDispatchToProps = dispatch => ({
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "FilteredUserJobList", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});

let isSwotItemMatched = (matchedSwotItems, swotItem) => {
    for (var i = 0; i < matchedSwotItems.length; i++) {
        if (matchedSwotItems[i].id == swotItem.id) {
            return true;
        }
    }
    return false;

}

class FilteredUserJobList extends React.Component {
    constructor() {
        super();
        
        this.state = {
            userJobResult: {},
            selectedJobId: null,
            optionJob: [],
            listShownSwotItemUserIds: [],
            currentReloadScreen: 0
        }
        this.getUserJobResult = this.getUserJobResult.bind(this);
        this.handleShowSwotItemUser = (userId) => {
            this.state.listShownSwotItemUserIds.push(userId);
            var newReloadScreen = this.state.currentReloadScreen + 1;
            this.setState({currentReloadScreen: newReloadScreen});
        };
        this.checkShownSwotItemUser = (userId) => {
            for (var i = 0; i < this.state.listShownSwotItemUserIds.length; i++) {
                if (this.state.listShownSwotItemUserIds[i] == userId) {
                    return true;
                }
            }
            return false;
        }
    };
    getUserJobResult() {
        const { selectedJobIdSelector, currentJobIdsSelecter } = this.props;
        if(!selectedJobIdSelector) {
            return null;
        }
        var bodyObject = {
            selectedJobId: selectedJobIdSelector,
            currentJobIds: currentJobIdsSelecter ? currentJobIdsSelecter.map(item => {
                return item.value
            }) : [],
        }
        
        let setStateInRequest = (result) => { this.setState({ userJobResult: result }) }
        return agent.asyncRequests.post('/swotUser/findMachedUserJob', bodyObject).then(function (res) {
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

    componentWillMount() {
        agent.JobApi.loadOptionsComboBox(this);
    };
    componentDidUpdate() {
        ScriptUtils.loadFootable();
        ScriptUtils.loadFormLayout();
    }

    render() {
        const userJobResult = this.state.userJobResult;
        const { selectedJobIdSelector, currentJobIdsSelecter } = this.props;

        var _this = this;
        var rows = userJobResult && userJobResult.userJobMatchedList ? 
        userJobResult.userJobMatchedList.map(item => {
            var row = <tr key={item.user.id}>
                <td>{item.user.id}</td>
                <td style={{ whiteSpace: 'nowrap' }} >{item.user.code} || {item.user.fullName}</td>
                <td>{item.user.email}<br />{item.phone}</td>
                <td>{item.user.currentAddress}</td>
                <td>{item.user.job ? item.user.job.title : ""}</td>
                {/* <td>{item.user.company ? item.user.company.name : null}</td> */}
                <td><a onClick={() => _this.handleShowSwotItemUser(item.user.id)}>{item.matchedSwotItems.length} / {userJobResult.swotItemsOfSelectedJob.length}</a> </td>
                <td className="text-center footable-visible footable-last-column">
                    <ul className="icons-list">
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <i className="icon-menu9"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-right">
                                
                            </ul>
                        </li>
                    </ul>
                </td>
            </tr>

            if (!_this.checkShownSwotItemUser(item.user.id)) {
                return row;
            }

            var matchedInfo = userJobResult.swotItemsOfSelectedJob.map(swotJob => {
                var swotItem = swotJob.swotItem;
                var isMatched = isSwotItemMatched(item.matchedSwotItems, swotItem);
                var styleTd = isMatched? {backgroundColor: "lightgreen"} : {backgroundColor: "lightgrey"};
                return <tr style={styleTd} key={"matchedInfo" + item.user.id + "_" + swotItem.id}>
                    <td></td>
                    <td>{isMatched ? "T????ng ?????ng" : "Ch??a c??"}</td>
                    <td>{swotItem.swotType}</td>
                    <td colSpan="3">{swotItem.title}</td>
                    <td></td>
                </tr>

            }) 
            return [row].concat(matchedInfo);
        }): null;

        return (

            <div className="content-wrapper">
                <div className="page-header page-header-default">
                <div className="breadcrumb-line">
                    <ul className="breadcrumb">
                        <li><a href=""><i className="icon-home2 position-left"></i> Home</a> </li>
                        <li className="active">Qu???n l?? nh??n s???</li>
                        <li className="active">Danh s??ch nh??n vi??n</li>
                    </ul>
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
                                                <div className="col-md-3"></div>
                                                <div className="col-md-3">
                                                    <Field label="Ngh??? Nghi???p ??ang Tuy???n" options={this.state.optionJob} placeholder="Vui l??ng ch???n" component={RenderSelect} name="selectedJobId" ></Field>
                                                </div>
                                                <div className="col-md-3">
                                                <Field name="currentJobIds" label="Ngh??? Nghi???p Hi???n T???i" placeholder="Ch???n ngh??? nghi???p nh??n vi??n ??ang l??m..." options={this.state.optionJob} component={RenderMultiSelect}></Field>
                                                </div>
                                                <div className="col-md-12" style={{paddingTop: "12px", textAlign: "center"}}>
                                                <button type="button" className="btn bg-teal btn-xlg" 
                                                onClick={() => this.getUserJobResult()}>Th???ng k??</button>
                                                </div>
                                                
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>

                            <div className="panel panel-flat">
                                <table style={{ textAlign: 'center' }} className="table table-xxs">
                                    <thead>
                                        <tr className="bg-teal">
                                            <th data-toggle="true">STT</th>
                                            <th data-toggle="phone"><center>M?? Nh??n Vi??n & H??? T??n</center></th>
                                            <th data-hide="phone"><center>Li??n H???</center></th>
                                            <th data-hide="phone"><center>?????a ch???</center></th>
                                            <th data-hide="phone"><center>C??ng Vi???c Hi???n T???i</center></th>
                                            {/* <th data-hide="phone"><center>C??ng Ty </center></th> */}
                                            <th data-hide="phone"><center>Swot ph?? h???p</center></th>
                                            
                                            <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        </tr>

                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>

                                </table>
                            </div>

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
            form: 'FilteredUserJobList',
            destroyOnUnmount: true,
            enableReinitialize: true,
        })(FilteredUserJobList)));