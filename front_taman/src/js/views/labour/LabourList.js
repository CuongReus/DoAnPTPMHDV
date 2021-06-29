import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { Popover, Overlay, OverlayTrigger, Button } from 'react-bootstrap'
import { connect } from 'react-redux';
import { ScriptUtils, FormatterUtils } from '../../utils/javascriptUtils';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import { Link } from 'react-router-dom';
import ModalLabour from './ModalLabour';
import moment from 'moment';
import SecuredComponent from '../../components/SecuredComponent';
import ModalLabourNormalAttendance from '../labourAttendance/ModalLabourNormalAttendance';
// import ModalSetLabourAbsent from '../labourAttendance/ModalSetLabourAbsent';
import { LoadingScreen } from '../../components/commonWidgets';
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
            // isLabourAbsentShown: false,
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
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
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
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        }))
    };
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
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    };


    componentDidUpdate() {
        ScriptUtils.loadFootable();
    }
    //Delete Labour Function
    deleteLabour(id) {

        if (confirm("Bạn có chắc sẽ xoá:")) {
            var url = `/labour/${id}`;
            return agent.asyncRequests.del(url
            ).then(function (res) {
                var result = res.body.resultData;
                if (result && !result.error) {
                    alert("Xoá Thành Công:");
                    window.location.reload(true);
                } else {
                    toast.error("Có lỗi khi xoá dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Có lỗi khi xoá dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
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
    // handleShowLabourAbsent(labour){
    //     this.setState({
    //         isLabourAbsentShown: true,
    //         labourDto:labour

    //     })
    // }
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
                    //  objSumTotal: { totalQuantitym2OfItem: 0, totalQuantityMdOfItem: 0 } 

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
                    
                    {/* <td><a onClick={() =>
                        <SecuredComponent allowedPermission="admin.labour.update">
                            {this.handleShowmodal(item.id)}</SecuredComponent>}>{item.fullName}</a></td> */}
                    <td>{item.fullName}</td>
                    {/* <td>
                    {groupRowProjectToday ? groupRowProjectToday.map(OverPlayTrigger => {
                       if( OverPlayTrigger.overPlayTriggerGroup.id == item.id) { 
                        var popover =  <Popover id="popover-basic" title={"Nhân Công: " + item.fullName}>{
                        OverPlayTrigger.projectTodayList.map(projectToday => {
                             return( 
                                         <span style={{ color: 'green' }}><center> {projectToday.createdUser.id == currentUser.id ? <Link to={{
                                            pathname: '/listLabourAttendanceForSupervisor',
                                            state: {
                                                currentUser: currentUser
                                            }
                                        }}><span style={{color:'orange'}}>{"Dự Án: "+projectToday.project.name}</span><br/>{"CV: "+projectToday.projectDetail.name}</Link> : <span ><span style={{color:'orange'}}>{"Dự Án: "+projectToday.project.name}</span><br/>{"CV: "+projectToday.projectDetail.name}</span>}<br />
                                            <span>{projectToday.overtimeStatus ? (projectToday.overtimeStatus == "TANG_CA_THUONG_TOI" ? " TC":" CA KHUYA") + " || Bắt Đầu: "+ projectToday.startOvertime   : "Bắt Đầu: " + projectToday.startDatetime}</span>
                                            <br /></center></span>
                                   )
                            })}
                            </Popover>
                            
                        return ( <OverlayTrigger rootClose={true} trigger={['click']} placement="right" overlay={popover}>
                            <Button variant="success">Xem dự án </Button>
                        </OverlayTrigger>)
                    
                    } } )  
                  :null}  </td> */}

                    <td>{item.companies ? item.companies.map(company => {
                        return <span key={company.id}>{company.name} <br /></span>
                    }) : null}</td>
                    <td>{item.title}</td>
                    <td>{item.phone}</td>
                    <td>{moment(item.birthday).format("DD/MM/YYYY")}</td>
                    {/* <td>{moment(item.startWorkDate).format("DD/MM/YYYY")}</td>
                    <td>{item.contractNumber}</td>
                    <td>{moment(item.contractSignDate).format("DD/MM/YYYY")}</td>
                    <td>{moment(item.contractEndDate).format("DD/MM/YYYY")}</td>
                    <td>{FormatterUtils.formatCurrency(item.salaryPerDay)}</td>
                    <td>{FormatterUtils.formatCurrency(item.salaryMidnight)}</td>
                    <td>{FormatterUtils.formatCurrency(item.additionSalary)}</td>
                    <td>{t(item.enoughLabourContract)}</td> */}
                    <td>{item.note}</td>
                    <td className="text-center footable-visible footable-last-column">
                        <ul className="icons-list">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="icon-menu9"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                    <SecuredComponent allowedPermission="admin.labour.update">
                                        <li><a onClick={() => this.handleShowmodal(item.id)}><i className="icon-pencil4"></i>Sửa Thông Tin</a></li>
                                    </SecuredComponent>
                                    <SecuredComponent allowedPermission="admin.labourAttendance.create">

                                        <li><a onClick={() => this.handleShowLabourAttendance(item)}><i className="icon-pencil7"></i>Chấm Công</a></li>
                                        <li><a onClick={() => this.handShowOvertimeAttendance(item)}><i className="icon-pencil7"></i>Chấm Công Tăng Ca</a></li>
                                    </SecuredComponent>
                                    {/* <li><a onClick={() => this.handleShowLabourAbsent(item)}><i className="icon-stack-minus"></i>Vắng Mặt</a></li> */}
                                    <SecuredComponent allowedPermission="admin.labour.delete">
                                        <li><a onClick={() => this.deleteLabour(item.id, item.fullName)}><i className="icon-cross2"></i>Xóa</a></li>
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


                <div className="content">
                    <div className="page-header">
                        <h4>
                            <i className=" icon-paragraph-justify2 position-left"></i>
                            <span className="text-semibold">Danh sách Nhân Công</span>
                            <span className="pull-right">
                                <SecuredComponent allowedPermission="admin.labour.create">
                                    <button className="btn bg-teal" onClick={() => this.handleShowmodal()}>Thêm Mới</button>
                                </SecuredComponent>
                            </span>
                        </h4>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-flat">

                                <div className="panel-body">
                                    <form className="main-search" role="form">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="control-label col-md-3" htmlFor="company">Công Ty</label>
                                                <div className="col-md-9">
                                                    <select placeholder="Tất cả" className="select form-control" name="company" defaultValue={company}>
                                                        <option key="ALL" value="ALL">Tất cả</option>
                                                        {optionCompany.map(company => <option key={company.value} value={company.value}>{company.label}</option>)}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="input-group content-group">
                                            <div className="has-feedback has-feedback-left">
                                                <input type="text" className="form-control input-xlg" placeholder="Tìm kiếm theo: Tên nhân công & Số điện thoại" name="search" defaultValue={search} autoFocus={true} />
                                                <div className="form-control-feedback">
                                                    <i className="icon-search4 text-muted text-size-base"></i>
                                                </div>
                                            </div>

                                            <div className="input-group-btn">
                                                <button type="submit" className="btn bg-teal btn-xlg">Tìm</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            {this.state.isLabourModalShown ? <ModalLabour title="Nhân Công" idLabour={this.state.idLabour} show={this.state.isLabourModalShown} onHide={this.handleHidemodal} /> : null}
                            {this.state.isLabourAttendanceModalShown ? <ModalLabourNormalAttendance title="Chấm Công" idLabourAttendance={null} listProjectLabourWorkTodayDto={dataProjectToday} show={this.state.isLabourAttendanceModalShown} labourDto={this.state.labourDto} onHide={this.handleHidemodal} /> : null}
                            {this.state.isLabourOvertimeAttendanceModalShown ? <ModalLabourOvertimeAttendance title="Chấm Công Tăng Ca" idLabourAttendance={null} listProjectLabourWorkTodayDto={dataProjectToday} show={this.state.isLabourOvertimeAttendanceModalShown} labourDto={this.state.labourDto} onHide={this.handleHidemodal} /> : null}
                            {/* {this.state.isLabourAbsentShown ? <ModalSetLabourAbsent title="Nhân Công Vắng Mặt" idLabourAttendance={null} show={this.state.isLabourAbsentShown} labourDto={this.state.labourDto} onHide={this.handleHidemodal} /> : null} */}

                            <div className="panel panel-flat">
                                <table className="table table-togglable table-hover">
                                    <thead>
                                        <tr className="bg-teal">
                                            <th data-toggle="true">STT</th>

                                            {/* <th data-hide="phone">Hình Ảnh</th> */}
                                            <th data-toggle="true">Họ Tên</th>
                                            {/* <th data-toggle="phone"><center>Dự Án Làm Việc Hôm Nay</center></th> */}
                                            <th data-hide="phone">Thuộc công ty</th>
                                            <th data-hide="phone">Công Việc</th>
                                            <th data-hide="phone">Số Điện Thoại</th>
                                            <th data-hide="phone">Ngày Sinh </th>
                                            {/* <th data-hide="phone">Ngày Bắt Đầu Làm Việc</th>
                                            <th data-hide="phone">Số Hợp Đồng Lao Động </th>
                                            <th data-hide="phone">Ngày Ký HĐLĐ</th>
                                            <th data-hide="phone">Ngày Kết Thúc HĐLĐ</th>
                                            <th data-hide="phone">Lương / Ngày</th>
                                            <th data-hide="phone">Lương Tăng Ca Khuya</th>
                                            <th data-hide="phone">Lượng Phụ Cấp</th>
                                            <th data-hide="phone">Trạng Thái HĐLĐ</th> */}
                                            <th data-hide="phone">Ghi Chú</th>
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