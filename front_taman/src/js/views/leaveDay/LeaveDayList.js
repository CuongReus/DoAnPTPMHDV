import React from 'react';
import qs from 'query-string';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { ScriptUtils, UrlUtils, FormatterUtils } from '../../utils/javascriptUtils';
import TablePagination from '../../components/TablePagination';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { RenderSelect, RenderSwitch } from '../../components/formInputs';
import agent from '../../services/agent';
import { Link } from 'react-router-dom';
import ModalLeaveLetter from '../leaveLetter/ModalLeaveLetter';
import moment from 'moment';
import SecuredComponent from '../../components/SecuredComponent';
import dateFns from 'date-fns';
import { PermanentCacheService } from '../../services/middleware';
import { LoadingScreen } from '../../components/commonWidgets';
const selector = formValueSelector("PersonelList");
const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
    companyIdSelector: selector(state, "companyId"),
    activeSelector: selector(state, "active")
});
const mapDispatchToProps = dispatch => ({
    updateField: (fieldName, value) =>
    dispatch({
        meta: { form: "LeaveDayList", field: fieldName },
        payload: value,
        type: "@@redux-form/CHANGE"
    })
});
const CalendarHeader = (props) => {
    return (
        <div>
            <div className="col-md-3">
                <div className="btn-group">
                    <button type="button" className="btn btn-primary" onClick={props.prev}>&lt;</button>
                    <button type="button" className="btn btn-primary" onClick={props.today}>Năm {dateFns.format(props.currentDate, 'YYYY')}</button>
                    <button type="button" className="btn btn-primary" onClick={props.next}>&gt;</button>
                </div>
                <h3> </h3>
            </div>
        </div>
    )
}
class LeaveDayList extends React.Component {
    constructor() {
        super();
        let initialDate = new Date()
        initialDate = PermanentCacheService.getItem("selected_year") ? new Date(PermanentCacheService.getItem("selected_year")) : dateFns.setDate(initialDate, 1)
        let initialCompanyId = 'ALL'
        initialCompanyId = PermanentCacheService.getItem("selected_leaveLetter_companyId") ? PermanentCacheService.getItem("selected_leaveLetter_companyId") : initialCompanyId;
        let initialActive = true
        initialActive = PermanentCacheService.getItem("selected_leaveLetter_active") !=null ? PermanentCacheService.getItem("selected_leaveLetter_active") : initialActive;
        this.state = {
            currentDate:initialDate,
            listLeaveDay: null,
            isLeaveDayModalShown: false,
            objectLeaveLetter: null,
            listPersonel:[],
            listAllCompanys: [],
            companyId: initialCompanyId,
            active: initialActive,
            listSumAttendanceForUser:[],
            
        }
        this.prev = () => {
            const prev = dateFns.subYears(this.state.currentDate, 1)
            PermanentCacheService.setItem("selected_year", prev);
            this.setState({ currentDate: prev }, () => {
                this.updateListLeaveDay();
            })
        }
        this.next = () => {
            const next = dateFns.addYears(this.state.currentDate, 1)
            PermanentCacheService.setItem("selected_year", next);
            this.setState({ currentDate: next }, () => {
                this.updateListLeaveDay();
            })
        }
        this.today = () => {
            let today = new Date()
            today = dateFns.setDate(today, 1)
            PermanentCacheService.setItem("selected_year", today);
            this.setState({ currentDate: today }, () => {
                this.updateListLeaveDay(this.state.userId);
            })
        }
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isLeaveDayModalShown: false });
            this.updateListLeaveDay();
        };
        this.setPermanentCache = (companyIdValue, activeValue) => {
            if (companyIdValue) {
                PermanentCacheService.setItem("selected_leaveLetter_companyId", companyIdValue);
            }
            if (activeValue != null ) {
                // debugger;
                PermanentCacheService.setItem("selected_leaveLetter_active", activeValue);
            }
            this.setState({
                companyId: companyIdValue ? companyIdValue : this.state.companyId,
                active: activeValue !=null ? activeValue : this.state.active,
            }, () => this.getListPersonel());
        };
    };
    getListPersonel() {
        const { companyId, active} = this.state;
        var search = qs.parse(this.props.location.search).search;
        search = search ? search : "";
        var page = qs.parse(this.props.location.search).page;
        this.getListCompany();
        this.updateListLeaveDay();
        this.updateListSumAttendance();
        let setStateInRequest = (list) => { this.setState({ listPersonel: list }) }
        return agent.asyncRequests.getPage('/user/findByCompanyIdAndFullNameOrPhoneOrEmail?companyId=' + companyId + "&fullNameOrPhoneOrEmail=" + search + "&isActive=" + active, page
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                // debugger;
                setStateInRequest(result);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
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
    updateListLeaveDay() {
        var page = qs.parse(this.props.location.search).page;
        var currentDate = this.state.currentDate;
        this.updateListSumAttendance();
        // var userId = this.props.match.params.id;
        let setStateInRequest = (list) => { this.setState({ listLeaveDay: list }) }
        return agent.LeaveDayApi.listLeaveDay(moment(currentDate).format("YYYY") , page
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            }
            else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        })
    }
    updateListSumAttendance() {
        var currentDate = this.state.currentDate;
        var startDateOfYear = moment(dateFns.startOfYear(currentDate)).format("YYYY-MM-DD-HH:mm:ss");
        var endDateOfYear = moment(dateFns.endOfYear(currentDate)).format("YYYY-MM-DD-HH:mm:ss");
        // var userId = this.props.match.params.id;
        let setStateInRequest = (list) => { this.setState({ listSumAttendanceForUser: list }) }
        return agent.asyncRequests.get("/employeeAttendance/listSumAttendanceForUser?dateToWorkStart="+startDateOfYear+
        "&dateToWorkEnd="+endDateOfYear
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            }
            else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        })
    }
    componentWillMount() {
        const { updateField } = this.props;
        var {companyId,
            active} = this.state;
        updateField("companyId", companyId);
        updateField("active", active);
        this.getListPersonel();
    };
    componentDidUpdate() {
        ScriptUtils.loadFootable();
    }
    handleShowmodal(id) {
        this.setState({
            isLeaveDayModalShown: true,
            userId: id,
        });
    }   
    render() {
        var baseUrl = UrlUtils.getPathWithParamsNotPaging();
        const dataLeaveDayGroup = this.state.listLeaveDay;
        const currentDate =this.state.currentDate;
        var startDateOfYear = moment(dateFns.startOfYear(currentDate)).format("YYYY-MM-DD-HH:mm:ss");
        var endDateOfYear = moment(dateFns.endOfYear(currentDate)).format("YYYY-MM-DD-HH:mm:ss");
        const dataPersonel = this.state.listPersonel;
        const dataSumAttendanceForUser = this.state.listSumAttendanceForUser;
        const { currentUser,activeSelector,
            companyIdSelector } = this.props;
        const wrapperStyle = {
            height: '100%',
            width: '50%'
        }
        if (!currentUser) {
            return "";
        }
        if ((!dataPersonel &&  !dataPersonel.content )|| !dataLeaveDayGroup || !dataSumAttendanceForUser ) {
            return <LoadingScreen></LoadingScreen>;
        }
        var currentNo = 0;
        var page = qs.parse(this.props.location.search).page;
        if (!page) {
            page = 1;
        }
        var currentNo = ((page - 1) * 20);

        var rows = dataPersonel.content ? dataPersonel.content.map(item => {
            currentNo++
            var lastTotalAnnualLeave = 0;
            var lastTotalAnnualLeaveRemaining = 0;
            var bonusNormalOvertimeAttendance = 0;
		    var bonusSatOvertimeAttendance = 0;
		    var bonusSunOvertimeAttendance = 0;
		    var bonusHolidayOvertimeAttendance = 0;
		    var holidayLeave = 0;
		    var leaveYear = 0;
		    var absentWithoutLeave = 0;
		    var compensatoryLeave = 0;
            dataLeaveDayGroup.map(leaveDayItem =>{
                if(item.id == leaveDayItem.userId){
                    lastTotalAnnualLeave =  leaveDayItem.lastTotalAnnualLeave
                    lastTotalAnnualLeaveRemaining = leaveDayItem.lastTotalAnnualLeaveRemaining;
                }
            })
            dataSumAttendanceForUser.map(sumAttendance=>{
                if(item.id == sumAttendance.userId){
                    bonusNormalOvertimeAttendance = sumAttendance.bonusNormalOvertimeAttendance;
                    bonusSatOvertimeAttendance = sumAttendance.bonusSatOvertimeAttendance;
                    bonusSunOvertimeAttendance = sumAttendance.bonusSunOvertimeAttendance;
                    bonusHolidayOvertimeAttendance = sumAttendance.bonusHolidayOvertimeAttendance;
                    holidayLeave = sumAttendance.holidayLeave;
                    leaveYear = sumAttendance.leaveYear;
                    absentWithoutLeave = sumAttendance.absentWithoutLeave;
                    compensatoryLeave = sumAttendance.compensatoryLeave;
                }
            })
            return (
                <tr key={item.id}>
                    <td>{currentNo}</td>
                    <td><SecuredComponent allowedPermission="admin.holiday.update">
                        <a href={"/listLeaveLetter/" + item.id + "?dateToWorkStart=" +startDateOfYear + "&dateToWorkEnd=" + endDateOfYear +"&year="+ moment(currentDate).format("YYYY")}><i className="icon-arrow-right16"> </i></a></SecuredComponent>{" " + item.fullName}</td>
                    <td>{item.email}</td>
                    {item.labourContract ? <td><a href={agent.getBackendUrl() + item.labourContract}> Click Để Tải HĐLĐ</a></td> : <td>Chưa Có HĐLĐ</td>}
                    <td>{item.phone}</td>
                    <td>
                        {FormatterUtils.round2Decimals(lastTotalAnnualLeave)}
                    </td>
                    <td>
                        {FormatterUtils.round2Decimals(leaveYear)}
                    </td>
                    <td> 
                        {FormatterUtils.round2Decimals(lastTotalAnnualLeave - leaveYear)}
                    </td>

                    <td>
                        {parseFloat(
                            bonusNormalOvertimeAttendance+
                            bonusSatOvertimeAttendance+
                            bonusSunOvertimeAttendance+
                            bonusHolidayOvertimeAttendance
                        )}
                    </td>
                    <td>
                        {FormatterUtils.round2Decimals(compensatoryLeave)}
                    </td>
                    <td> 
                        {FormatterUtils.round2Decimals(bonusNormalOvertimeAttendance+
                            bonusSatOvertimeAttendance+
                            bonusSunOvertimeAttendance+
                            bonusHolidayOvertimeAttendance - compensatoryLeave)}
                    </td>

                    <td> 
                        {FormatterUtils.round2Decimals((lastTotalAnnualLeave - leaveYear) +
                            bonusNormalOvertimeAttendance+
                            bonusSatOvertimeAttendance+
                            bonusSunOvertimeAttendance+
                            bonusHolidayOvertimeAttendance - compensatoryLeave)}
                    </td>
                

                    <td className="text-center footable-visible footable-last-column">
                        <ul className="icons-list">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="icon-menu9"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">

                                    {currentUser.id == item.id ? <li><a onClick={() => this.handleShowmodal(item.id)}><i className="icon-plus22"></i> Tạo Đơn</a></li> : null}
                               
                                    <li>
                                        <a href={"/listLeaveLetter/" + item.id + "?dateToWorkStart=" +startDateOfYear + "&dateToWorkEnd=" + endDateOfYear +"&year="+ moment(currentDate).format("YYYY") }><i className="icon-file-text2"></i>Xem Lịch Sử Đơn</a></li>
                                </ul>
                            </li>
                        </ul>
                    </td>
                </tr> );
        }) :null;
        const dataCompany = this.state.listAllCompanys;
        if (!dataCompany) {
            return null;
        }
        var search = qs.parse(this.props.location.search).search;

        var optionCompany = [{ label: "Tất Cả", value: "ALL" }];
        dataCompany.map(item => {
            optionCompany.push({ label: item.name, value: item.id })
        })
        return (

            <div className="content-wrapper">


                <div className="content">
                    <div className="page-header">
                        <h4>
                            <i className=" icon-paragraph-justify2 position-left"></i>
                            <span className="text-semibold">Quản Lý Ngày Phép</span>
                        </h4>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-flat">

                                <div className="panel-body">
                                <div style={{height: '100%', width: '100%' }}>
                                                <span style={wrapperStyle}>
                                                    <CalendarHeader
                                                        currentDate={currentDate}
                                                        next={this.next}
                                                        prev={this.prev}
                                                        today={this.today} />

                                                </span>
                                                <div className="form-group">
                                           
                                                
                                           <label className="control-label col-md-1" htmlFor="company">Công Ty</label>
                                           <div className="col-md-3">
                                               {/* <select placeholder="Tất cả" className="select form-control" name="company" defaultValue={company}>
                                                   <option key="ALL" value="ALL">Tất cả</option>
                                                   {optionCompany.map(company => <option key={company.value} value={company.value}>{company.label}</option>)}
                                               </select> */}
                                               <Field onChangeAction={(value) => this.setPermanentCache(value, activeSelector)} options={optionCompany} placeholder="Tất cả" component={RenderSelect} name="companyId" ></Field>
                                           </div>
                                               <label style={{ width: '105px' }} className="control-label col-md-2" htmlFor="active">TT Hoạt Động </label>
                                               <div className="col-md-3">
                                                   <Field onChangeAction={(value) => this.setPermanentCache(companyIdSelector, value)}component={RenderSwitch} name="active" ></Field>
                                               </div>
                                       </div>
                                              
                                                </div>  
                                                <form className="main-search" role="form">
                                        <div className="col-md-12">
                                           
                                        </div>
                                            <div style={{ height: 200 }}></div>
                                        <div className="row">
                                            <div className="input-group content-group">
                                                <div className="has-feedback has-feedback-left">
                                                    <input type="text" className="form-control input-xlg" placeholder="Tìm kiếm theo: Tên nhân viên,Số điện thoại,Email" name="search" defaultValue={search} autoFocus={true} />
                                                    <div className="form-control-feedback">
                                                        <i className="icon-search4 text-muted text-size-base"></i>
                                                    </div>
                                                </div>

                                                <div className="input-group-btn">
                                                    <button type="submit" className="btn bg-teal btn-xlg">Tìm</button>
                                                </div>

                                            </div>

                                        </div>
                                        
                                    </form>
                                </div>
                                </div>
                                {this.state.isLeaveDayModalShown ? <ModalLeaveLetter title="Đơn Nghỉ Phép"  idUser ={currentUser.id} show={this.state.isLeaveDayModalShown} onHide={this.handleHidemodal} /> : null}
                                <div className="panel panel-flat">
                                    <table className="table table-togglable table-hover">
                                        <thead>
                                            <tr className="bg-teal">
                                                <th data-toggle="true">STT</th>
                                                <th data-hide="phone">Tên Nhân Viên</th>
                                                <th data-hide="phone">Email</th>
                                                <th data-hide="phone">Hợp Đồng Lao Động</th>
                                                <th data-hide="phone">Số Điên Thoại</th>

                                                <th data-hide="phone">Phép Năm</th>
                                                <th data-hide="phone">Đã Nghỉ Phép</th>
                                                <th data-hide="phone">Phép Năm <br/> Còn Lại</th>

                                                <th data-hide="phone">Phép Thưởng TC</th>
                                                <th data-hide="phone">Đã Nghỉ Bù</th>
                                                <th data-hide="phone">Phép Thưởng TC <br/> Còn Lại</th>

                                                <th data-hide="phone">Tổng Phép <br/> Còn Lại</th>
                
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
                        <TablePagination data={dataPersonel} baseUrl={baseUrl} />
                    </div>

                </div>
                );
            }
        
        }
        
export default translate('translations')(connect(
            mapStateToProps, mapDispatchToProps)(
                reduxForm({
                    form: 'LeaveDayList',
                    destroyOnUnmount: true,
                    enableReinitialize: true,
                })(LeaveDayList)));