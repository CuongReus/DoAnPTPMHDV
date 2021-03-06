import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { ScriptUtils } from '../../utils/javascriptUtils';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import ModalLabour from './ModalLabour';
import moment from 'moment';
import SecuredComponent from '../../components/SecuredComponent';
import ModalLabourNormalAttendance from '../labourAttendance/ModalLabourNormalAttendance';
import ModalLabourOvertimeAttendance from '../labourAttendance/ModalLabourOvertimeAttendance';
const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
});
const mapDispatchToProps = dispatch => ({

});

class LabourList extends React.Component {
    constructor() {
        super();
        this.state = {
            listAllCompanys: [],
            listLabour: null,
            isLabourModalShown: false,
            idLabour: null,
            idLabourAbsent: null,
            showButtonPopover: false,
            labourDto: null,
            isLabourOvertimeAttendanceModalShown: false,
            isLabourAttendanceModalShown: false,
            listProjectLabourWorkToday: [],
        }
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.handleShowLabourAttendance = this.handleShowLabourAttendance.bind(this);
        this.handShowOvertimeAttendance = this.handShowOvertimeAttendance.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isLabourModalShown: false, isLabourAttendanceModalShown: false, isLabourAbsentShown: false, isLabourOvertimeAttendanceModalShown: false });
            this.updateListLabour();
        };
    };
    updateListLabour() {
        var search = qs.parse(this.props.location.search).search;
        search = search ? search : "";
        var page = qs.parse(this.props.location.search).page;
        this.getListCompany();
        this.getListProjectWorkToday();
        var company = qs.parse(this.props.location.search).company;
        company = company ? company : "ALL";
        let setStateInRequest = (list) => { this.setState({ listLabour: list }) }
        return agent.asyncRequests.getPage('/labour/findByCompanyIdAndFullNameOrPhone?companyId=' + company + "&fullNameOrPhone=" + search, page
        ).then(function (res) {
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
    // Get list project that labour work today
    getListProjectWorkToday() {
        const currentDate = new Date();
        var dateToWork = moment(currentDate).format("YYYY-MM-DD");
        let setStateInRequest = (list) => {
            this.setState({ listProjectLabourWorkToday: list });
        }
        return (agent.asyncRequests.get('/labourAttendance/findAttendanceToday?dateToWork=' + dateToWork).then(function (res) {
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
    componentWillMount() {
        var search = qs.parse(this.props.location.search).search;
        search = search ? search : "";
        var page = qs.parse(this.props.location.search).page;
        this.getListCompany();
        this.getListProjectWorkToday();
        var company = qs.parse(this.props.location.search).company;
        company = company ? company : "ALL";
        let setStateInRequest = (list) => { this.setState({ listLabour: list }) }
        return agent.asyncRequests.getPage('/labour/findByCompanyIdAndFullNameOrPhone?companyId=' + company + "&fullNameOrPhone=" + search, page
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("C?? l???i khi t???i d??? li???u. L???i: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("C?? l???i khi t???i d??? li???u. Qu?? kh??ch vui l??ng ki???m tra k???t n???i internet v?? th??? l???i. Ho???c li??n h??? qu???n tr??? vi??n.", { autoClose: 15000 });
        });
    };


    componentDidUpdate() {
        ScriptUtils.loadFootable();
    }
    //Delete Labour Function
    deleteLabour(id) {

        if (confirm("B???n c?? ch???c s??? xo??:")) {
            var url = `/labour/${id}`;
            return agent.asyncRequests.del(url
            ).then(function (res) {
                var result = res.body.resultData;
                if (result && !result.error) {
                    alert("Xo?? Th??nh C??ng:");
                    window.location.reload(true);
                } else {
                    toast.error("C?? l???i khi xo?? d??? li???u. L???i: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("C?? l???i khi xo?? d??? li???u. Qu?? kh??ch vui l??ng ki???m tra k???t n???i internet v?? th??? l???i. Ho???c li??n h??? qu???n tr??? vi??n.", { autoClose: 15000 });
            });
        } else {
        }
    }

    handleShowmodal(id) {
        this.setState({
            isLabourModalShown: true,
            idLabour: id
        });
    }
    handleShowLabourAttendance(labour) {
        this.setState({
            isLabourAttendanceModalShown: true,
            labourDto: labour

        })
    }
    handShowOvertimeAttendance(labour) {
        this.setState({
            isLabourOvertimeAttendanceModalShown: true,
            labourDto: labour

        })
    }
    
    render() {
        const { t, currentUser } = this.props;
        var showButtonPopover = this.state.showButtonPopover;
        if (!currentUser) {
            return null;
        }
        const dataProjectToday = this.state.listProjectLabourWorkToday;
        const data = this.state.listLabour;
        if (!data) {
            return null;
        }
        
        var currentNo = 0;
        var page = qs.parse(this.props.location.search).page;
        if (!page) {
            page = 1;
        }
        var currentNoProject = 0;
        var listProjectToday = [];
        var groupRowProjectToday = [];
        let getListProjectToday = (groupProject, labourId) => {
            for (var i = 0; i < groupProject.length; i++) {
                if (groupProject[i].overPlayTriggerGroup.id == labourId) {
                    return groupProject[i];
                }

            }
            return null
        }
        dataProjectToday.map(item => {
            var overPlayTriggerGroup = getListProjectToday(groupRowProjectToday, item.labour.id)
            if (!overPlayTriggerGroup) {
                var groupObject = {
                    //Group labour have project today
                    overPlayTriggerGroup: item.labour,
                    projectTodayList: [item]
                };
                groupRowProjectToday.push(groupObject);
            } else {
                overPlayTriggerGroup.projectTodayList.push(item);
            }
        })

        currentNo = ((page - 1) * 20);
        var rows = data.content.map(item => {
            currentNo++
            return (
                <tr key={item.id}>
                    <td>{currentNo}</td>
                    <td>{item.fullName}</td>
                    <td>{item.companies ? item.companies.map(company => {
                        return <span key={company.id}>{company.name} <br /></span>
                    }) : null}</td>
                    <td>{item.title}</td>
                    <td>{item.phone}</td>
                    <td>{moment(item.birthday).format("DD/MM/YYYY")}</td>
                    <td>{item.note}</td>
                    <td className="text-center footable-visible footable-last-column">
                        <ul className="icons-list">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="icon-menu9"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                    <SecuredComponent allowedPermission="admin.labour.update">
                                        <li><a onClick={() => this.handleShowmodal(item.id)}><i className="icon-pencil4"></i>S???a Th??ng Tin</a></li>
                                    </SecuredComponent>
                                    <SecuredComponent allowedPermission="admin.labourAttendance.create">

                                        <li><a onClick={() => this.handleShowLabourAttendance(item)}><i className="icon-pencil7"></i>Ch???m C??ng</a></li>
                                        <li><a onClick={() => this.handShowOvertimeAttendance(item)}><i className="icon-pencil7"></i>Ch???m C??ng T??ng Ca</a></li>
                                    </SecuredComponent>
                                    {/* <li><a onClick={() => this.handleShowLabourAbsent(item)}><i className="icon-stack-minus"></i>V???ng M???t</a></li> */}
                                    <SecuredComponent allowedPermission="admin.labour.delete">
                                        <li><a onClick={() => this.deleteLabour(item.id, item.fullName)}><i className="icon-cross2"></i>X??a</a></li>
                                    </SecuredComponent>
                                </ul>
                            </li>
                        </ul>
                    </td>
                </tr>);
        });

        const dataCompany = this.state.listAllCompanys;
        if (!dataCompany) {
            return null;
        }
        var search = qs.parse(this.props.location.search).search;
        var company = qs.parse(this.props.location.search).company;
        if (!company) {
            company = "ALL";
        }
        var optionCompany = [];
        dataCompany.map(item => {
            optionCompany.push({ label: item.name, value: item.id })
        })
        return (

            <div className="content-wrapper">
                <div className="page-header page-header-default">
                <div className="breadcrumb-line">
                    <ul className="breadcrumb">
                        <li><a href=""><i className="icon-home2 position-left"></i> Home</a> </li>
                        <li className="active">Qu???n l?? ng??y c??ng</li>
                        <li className="active">Danh s??ch nh??n c??ng</li>
                    </ul>
                    <div className="heading-elements">
                        <div className="heading-btn-group">
                        <SecuredComponent allowedPermission="admin.labour.create">
                            <button className="btn bg-teal" onClick={() => this.handleShowmodal()}>Th??m M???i</button>
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
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="control-label col-md-3" htmlFor="company">C??ng Ty</label>
                                                <div className="col-md-9">
                                                    <select placeholder="T???t c???" className="select form-control" name="company" defaultValue={company}>
                                                        <option key="ALL" value="ALL">T???t c???</option>
                                                        {optionCompany.map(company => <option key={company.value} value={company.value}>{company.label}</option>)}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="input-group content-group">
                                            <div className="has-feedback has-feedback-left">
                                                <input type="text" className="form-control input-xlg" placeholder="T??m ki???m theo: T??n nh??n c??ng & S??? ??i???n tho???i" name="search" defaultValue={search} autoFocus={true} />
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
                            {this.state.isLabourModalShown ? <ModalLabour title="Nh??n C??ng" idLabour={this.state.idLabour} show={this.state.isLabourModalShown} onHide={this.handleHidemodal} /> : null}
                            {this.state.isLabourAttendanceModalShown ? <ModalLabourNormalAttendance title="Ch???m C??ng" idLabourAttendance={null} listProjectLabourWorkTodayDto={dataProjectToday} show={this.state.isLabourAttendanceModalShown} labourDto={this.state.labourDto} onHide={this.handleHidemodal} /> : null}
                            {this.state.isLabourOvertimeAttendanceModalShown ? <ModalLabourOvertimeAttendance title="Ch???m C??ng T??ng Ca" idLabourAttendance={null} listProjectLabourWorkTodayDto={dataProjectToday} show={this.state.isLabourOvertimeAttendanceModalShown} labourDto={this.state.labourDto} onHide={this.handleHidemodal} /> : null}

                            <div className="panel panel-flat">
                                <table className="table table-togglable table-bordered">
                                    <thead>
                                        <tr className="bg-teal">
                                            <th data-toggle="true">STT</th>
                                            <th data-toggle="true">H??? T??n</th>
                                            <th data-hide="phone">Thu???c c??ng ty</th>
                                            <th data-hide="phone">C??ng Vi???c</th>
                                            <th data-hide="phone">S??? ??i???n Tho???i</th>
                                            <th data-hide="phone">Ng??y Sinh </th>
                                            <th data-hide="phone">Ghi Ch??</th>
                                            <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>
                            <TablePagination data={data} baseUrl="/listLabour" />
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}

export default translate('translations')(connect(mapStateToProps, mapDispatchToProps)(LabourList));