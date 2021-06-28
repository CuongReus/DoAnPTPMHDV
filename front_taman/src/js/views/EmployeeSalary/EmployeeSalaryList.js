import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { ScriptUtils, FormatterUtils, SecurityUtils } from '../../utils/javascriptUtils';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import { RenderSelect, RenderSmallSelect, RenderInputWithDiv } from '../../components/formInputs';
import { Link } from 'react-router-dom';
import ModalEmployeeSalary from './ModalEmployeeSalary';
import moment from 'moment';
import { PermanentCacheService } from '../../services/middleware';
import { connect } from 'react-redux';
import dateFns from 'date-fns';
import { LoadingScreen } from '../../components/commonWidgets';
import ModalUpdateAttendanceCoefficient from './ModalUpdateAttendanceCoefficient';
import ModalPaymentAllEmployee from './ModalPaymentAllEmployee';
import KhongDau from 'khong-dau';
import SecuredComponent from '../../components/SecuredComponent';
import ModalLoadUserSalaryConfig from './ModalLoadUserSalaryConfig';

const CalendarHeader = (props) => {
    return (
        <div>
            <div className="col-md-3">
                <br />
                <div className="btn-group">
                    <button type="button" className="btn btn-primary" onClick={props.prev}>&lt;</button>
                    <button type="button" className="btn btn-primary" onClick={props.today}>Tháng Hiện Tại</button>
                    <button type="button" className="btn btn-primary" onClick={props.next}>&gt;</button>
                </div>
                <h3>Tháng {dateFns.format(props.currentDate, 'MM / YYYY')}</h3>
            </div>
        </div>
    )
}

const selector = formValueSelector('EmployeeSalaryList');

const mapStateToProps = state => {
    return {
        currentUser: state.common.currentUser,
        companyId: selector(state, "companyId"),
        fullNameOrEmail: selector(state, "fullNameOrEmail"),
    };
};

const mapDispatchToProps = dispatch => ({
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "EmployeeSalaryList", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        }),
});
class EmployeeSalaryList extends React.Component {
    constructor() {
        super();
        let initialDate = new Date()
        initialDate = PermanentCacheService.getItem("selected_month") ? new Date(PermanentCacheService.getItem("selected_month")) : dateFns.setDate(initialDate, 1)
        this.state = {
            currentDate: initialDate,
            listEmployeeSalary: [],
            listAllEmployeeSalary: [],
            isEmployeeSalaryModalShown: false,
            isShowPaymentAllEmployeeModal: false,
            idEmployeeSalary: null,
            isShowDepartmentAttendanceCoefficient: false,
            fullNameOrEmail: null,
            editType: null,
            idDepartment: null,
            listAllCompany: [],
            companyId: null,
            isShownExportExcelModal: false,
            employeeSalaryDto: null,
            userDto: null,
            isShowFormulaRows: false,
            hiddenColumns: true

        }
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.handleExportExcel = this.handleExportExcel.bind(this);
        this.handleShowAttendanceCoefficient = this.handleShowAttendanceCoefficient.bind(this);
        this.handleShowPaymentAllEmployee = this.handleShowPaymentAllEmployee.bind(this);

        this.handleHidemodal = () => {
            this.setState({
                isEmployeeSalaryModalShown: false,
                isShownExportExcelModal: false,
                isShowDepartmentAttendanceCoefficient: false,
                isShowPaymentAllEmployeeModal: false,
                isShowLoadSalaryConfig:false,
                editType: null
            });
            this.updateListEmployeeSalary(this.state.companyId);
        };
        this.prev = () => {
            const prev = dateFns.subMonths(this.state.currentDate, 1)
            PermanentCacheService.setItem("selected_month", prev);
            this.setState({ currentDate: prev }, () => {
                this.updateListEmployeeSalary(this.state.companyId);
            })
        }
        this.next = () => {
            const next = dateFns.addMonths(this.state.currentDate, 1)
            PermanentCacheService.setItem("selected_month", next);
            this.setState({ currentDate: next }, () => {
                this.updateListEmployeeSalary(this.state.companyId);
            })
        }
        this.today = () => {
            let today = new Date()
            today = dateFns.setDate(today, 1)
            PermanentCacheService.setItem("selected_month", today);
            this.setState({ currentDate: today }, () => {
                this.updateListEmployeeSalary(this.state.companyId);
            })
        }
        this.handleSetFullNameOrEmailSearch = (fullNameOrEmail) => {
            this.setState({ fullNameOrEmail: fullNameOrEmail }, () => this.updateListEmployeeSalary(this.state.companyId))

        }
        this.handleLoadSalaryConfig=(id,user)=>{
            this.setState({
                isShowLoadSalaryConfig: true,
                idEmployeeSalary: id,
                userDto:user
            })
        }
        this.hideOrShowColumns = () => {
            if (this.state.hiddenColumns) {
                this.setState({hiddenColumns: false});
            } else {
                this.setState({hiddenColumns: true});
            }
        }
    };
    updateListEmployeeSalary(companyId) {
        const currentDate = this.state.currentDate;
        var fullNameOrEmail = this.state.fullNameOrEmail;
        if (!fullNameOrEmail) {
            fullNameOrEmail = ""
        }
        var month = moment(currentDate).format("M");
        var year = moment(dateFns.startOfMonth(currentDate)).format("YYYY");
        let setStateInRequest = (list) => {
            this.setState({ companyId: companyId, listEmployeeSalary: list });
        }
        return (agent.asyncRequests.get('/employeeSalary/listAllEmployeeSalaryByMonthAndYear?month='
            + month + '&year='
            + year + '&companyId=' + companyId + "&fullNameOrEmail=" + fullNameOrEmail).then(function (res) {
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

    }
    componentWillMount() {
        const { updateField, companyId } = this.props;
        // try get from property, if not exist, try from query param
        var paramCompanyId = qs.parse(this.props.location.search).companyId;
        if (paramCompanyId) {
            updateField("companyId", paramCompanyId);
            this.updateListEmployeeSalary(paramCompanyId);
        } else if (companyId) {
            this.updateListEmployeeSalary(companyId);
        } else if (!companyId) {
            this.updateListEmployeeSalary('ALL');

        }
        return (
            this.getListEmployeeSalary(),
            this.getListCompanySalary()
        )
    };
    getListCompanySalary() {
        let setStateInRequest = (list) => { this.setState({ listAllCompany: list }) }
        return (agent.asyncRequests.get('/company/listAll').then(function (res) {
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
    }
    getListEmployeeSalary() {
        let setStateInRequest = (list) => { this.setState({ listAllEmployeeSalary: list }) }
        return (agent.asyncRequests.get('/employeeSalary/listAll').then(function (res) {
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
    }
    componentDidUpdate() {
        ScriptUtils.loadFootable();
        ScriptUtils.loadFormLayout();
    }
    //Delete EmployeeSalary Function
    deleteEmployeeSalary(id) {

        if (confirm("Bạn có chắc sẽ xoá:")) {
            var url = `/employeeSalary/${id}`;
            return agent.asyncRequests.del(url
            ).then(function (res) {
                var result = res.body.resultData;
                if (result && !result.error) {
                    alert("Xoá Thành Công:");
                    window.location.reload(true);
                } else {
                    toast.error("Có lỗi khi xóa dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Không thể xóa dữ liệu đang được sử dụng từ màn hình khác! ", { autoClose: 15000 });
            });
        } else {
        }
    }

    handleShowmodal(editType, id, userDto) {
        const { currentUser } = this.props;
        if (SecurityUtils.hasPermission(currentUser, "admin.employeeSalary.update")) {
            this.setState({
                isEmployeeSalaryModalShown: true,
                idEmployeeSalary: id,
                editType: editType,
                userDto: userDto
            });
        }
    }
    handleShowPaymentAllEmployee() {
        const { currentUser } = this.props;
        if (SecurityUtils.hasPermission(currentUser, "admin.employeeSalary.approvalAllPaymentSalary")) {
            this.setState({
                isShowPaymentAllEmployeeModal: true
            })
        }
    }
    handleShowAttendanceCoefficient(id) {
        const { currentUser } = this.props;
        if (SecurityUtils.hasPermission(currentUser, "admin.employeeSalary.updateAttendanceCoefficient")) {
            this.setState({
                idDepartment: id,
                isShowDepartmentAttendanceCoefficient: true
            });
        }
    }
    handleExportExcel(employeeSalaryDto) {
        this.setState({
            isShownExportExcelModal: true,
            employeeSalaryDto: employeeSalaryDto
        })
    }
    handleToggleShowFormula() {
        this.setState({
            isShowFormulaRows: !this.state.isShowFormulaRows
        })
    }
    render() {
        const { t } = this.props;
        const currentDate = new Date(this.state.currentDate.getTime());
        const isShowFormulaRows = this.state.isShowFormulaRows;
        const currentUser = this.props.currentUser;
        var month = moment(currentDate).format("M");
        var year = moment(dateFns.startOfMonth(currentDate)).format("YYYY");
        var totalSalaryAllEmployee = 0;
        var dataEmployeeSalary = this.state.listEmployeeSalary;
        var listEmployeeSalaryByCheckPermission = [];
        var hiddenColumns = this.state.hiddenColumns;
        if (!currentUser) {
            return <LoadingScreen></LoadingScreen>
        }
       
        if (currentUser) {
            dataEmployeeSalary && dataEmployeeSalary ? dataEmployeeSalary.map(item => {
                if (SecurityUtils.hasPermission(currentUser, "admin.employeeSalary.readAllEmployeeSalary")) {
                    listEmployeeSalaryByCheckPermission.push(item);
                } else if (item.user.id == currentUser.id) {
                    listEmployeeSalaryByCheckPermission.push(item)
                }
            }) : null
        }

        var groupRows = [];
        let getUserDepartmentGroup = (groupDetails, departmentId) => {
            for (var i = 0; i < groupDetails.length; i++) {
                if (groupDetails[i].department && groupDetails[i].department.id) {
                    if (groupDetails[i].department.id == departmentId) {
                        return groupDetails[i]
                    }
                }
            }
            return null;
        }

        listEmployeeSalaryByCheckPermission.map(item => {
            var departmentGroup = getUserDepartmentGroup(groupRows, (item.user && item.user.department ? item.user.department.id : null));
            if (!departmentGroup) {
                var groupObject = {
                    department: item.user.department,
                    attendanceCoefficient: item.attendanceCoefficient,
                    listEmployeeSalary: [item]
                };
                groupRows.push(groupObject);
            } else {
                departmentGroup.listEmployeeSalary.push(item);
            }


        })
        if (groupRows) {
            var employeeSalaryGroupList = groupRows.map(group => {
                var employeeSalaryList = group.listEmployeeSalary.map(item => {
                    totalSalaryAllEmployee += item.actualSalary;
                    let P_BHXH = FormatterUtils.formatCurrency(item.insuranceSalary * 0.08);
                    let P_BHYT = FormatterUtils.formatCurrency(item.insuranceSalary * 0.015);
                    let P_BHTN = FormatterUtils.formatCurrency(item.insuranceSalary * 0.01);
                    let C_BHXH = FormatterUtils.formatCurrency(item.insuranceSalary * 0.175);
                    let C_BHYT = FormatterUtils.formatCurrency(item.insuranceSalary * 0.03);
                    let C_BHTN = FormatterUtils.formatCurrency(item.insuranceSalary * 0.01);
                    // let sumInsuranceFee = BHXH + BHYT + BHTN;
                    return (

                        [<tr style={{ textAlign: 'center' }} key={item.id}>
                            <td style={{ position: 'sticky', left: 0 }} className="warning">
                                {/* <a onClick={() => this.handleExportExcel(item)}><i className="icon-file-excel"></i></a> */}
                                </td>
                            <td style={{ position: 'sticky', left: 35 }} className="warning">
                                {item.user ? item.user.fullName : null} <br />
                                <sub>{item.user ? item.user.code : null}<br /></sub>
                                <sub>{item.user ? item.user.position : null} </sub>
                            </td>
                            {/* <td style={{ position: 'sticky', left: 175 }} className="warning">{item.user ? item.user.code : null}<br /><sub>{item.user ? item.user.position : null} </sub></td> */}
                            <td style={{ position: 'sticky', left: 175 }} className="warning">{item.user ? item.user.bankAccountNumber : null}<br /><sub>{item.user ? item.user.bankName : null} </sub></td>
                            {/* <td>{item.user ? item.user.position : null}</td> */}
                            <td style={{ position: 'sticky', left: 340,color:'grey',fontSize:11 }} className="warning">

                                <center>{isShowFormulaRows?item.attendanceCoefficient: null}</center>
                            </td>
                            <td className="success">{FormatterUtils.formatCurrency(item.salaryPerMonth)}</td>
                            {/* <td className="success">{FormatterUtils.formatCurrency(item.normalOvertimeFee)}</td>
                            <td className="success">{FormatterUtils.formatCurrency(item.weekendOvertimeFee)}</td>
                            <td className="success">{FormatterUtils.formatCurrency(item.holidayOvertimeFee)}</td> */}
                            {hiddenColumns ? null: <td className="info">{FormatterUtils.formatCurrency(item.lunchFee)}</td>}
                            {hiddenColumns ? null: <td className="info">{FormatterUtils.formatCurrency(item.phoneFee)}</td>}
                            {hiddenColumns ? null: <td className="info">{FormatterUtils.formatCurrency(item.petrolFee)}</td>}
                            {hiddenColumns ? null: <td className="info">{FormatterUtils.formatCurrency(item.distanceSupportFee)}</td>}
                            <td style={{ color: '#1E88E5' }} className="info">{FormatterUtils.formatCurrency(item.lunchFee +
                                item.phoneFee +
                                item.petrolFee +
                                item.distanceSupportFee)}</td>
                            <td>{FormatterUtils.formatCurrency(item.responsibilityAllowance)}</td>
                            {/* <td className="warning">{FormatterUtils.round2Decimals(item.normalAttendance)}</td> */}
                            {hiddenColumns ? null: <td className="warning">{FormatterUtils.formatCurrency(item.normalOvertimeAttendance * item.normalOvertimeFee)}<br /> <span style={isShowFormulaRows?{fontSize:'11px',display:'block'}:{display:'none'}} >=({item.normalOvertimeAttendance}*{FormatterUtils.formatCurrency(item.normalOvertimeFee)}Đ)</span></td>}
                            {hiddenColumns ? null: <td className="warning">{FormatterUtils.formatCurrency(item.weekendAttendance * item.weekendOvertimeFee)}<br /> <span style={isShowFormulaRows?{fontSize:'11px',display:'block'}:{display:'none'}}>=({item.weekendAttendance}*{FormatterUtils.formatCurrency(item.weekendOvertimeFee)}Đ)</span></td>}
                            {hiddenColumns ? null: <td className="warning">{FormatterUtils.formatCurrency(item.holidayAttendance * item.holidayOvertimeFee)}<br /> <span style={isShowFormulaRows?{fontSize:'11px',display:'block'}:{display:'none'}}>=({item.holidayAttendance}*{FormatterUtils.formatCurrency(item.holidayOvertimeFee)}Đ)</span></td>}
                            <td style={{ color: '#1E88E5' }} className="warning">{FormatterUtils.round2Decimals(item.actualAttendance)}</td>
                            <td style={{ color: '#1E88E5' }}>{FormatterUtils.formatCurrency(item.totalSalary)}</td>
                            {hiddenColumns ? null: <td className="danger">{FormatterUtils.formatCurrency(item.taxableIncome)}</td>}
                            {hiddenColumns ? null: <td className="danger">{FormatterUtils.formatCurrency(item.insuranceSalary)}</td>}
                            {hiddenColumns ? null: <td className="danger">{C_BHXH}</td>}
                            {hiddenColumns ? null: <td className="danger">{C_BHYT}</td>}
                            {hiddenColumns ? null: <td className="danger">{C_BHTN}</td>}
                            {hiddenColumns ? null: <td className="danger">{FormatterUtils.formatCurrency(item.totalCompanyInsuranceFee)}</td>}
                            {hiddenColumns ? null: <td className="danger">{P_BHXH}</td>}
                            {hiddenColumns ? null: <td className="danger">{P_BHYT}</td>}
                            {hiddenColumns ? null: <td className="danger">{P_BHTN}</td>}
                            {hiddenColumns ? null: <td className="danger">{FormatterUtils.formatCurrency(item.totalPersonalInsuranceFee)}</td>}
                            {hiddenColumns ? null: <td className="danger">{FormatterUtils.formatCurrency(item.personalDeduction)}</td>}
                            {hiddenColumns ? null: <td className="danger">{FormatterUtils.formatCurrency(item.familyCircumstanceDeduction)}</td>}
                            {hiddenColumns ? null: <td className="danger">{FormatterUtils.formatCurrency(item.assessableIncome)}</td>}
                            {hiddenColumns ? null: <td className="danger">{FormatterUtils.formatCurrency(item.taxPayable)}</td>}
                            <td>{FormatterUtils.formatCurrency(item.actualSalary)}</td>
                            <td>{item.note}</td>
                            <td style={item.paymentStatus == "CHUA_DUYET_THANH_TOAN" ? { color: 'red' } : { color: 'green' }} >{t(item.paymentStatus)}</td>
                            <td className="text-center footable-visible footable-last-column">
                                <SecuredComponent allowedPermission="admin.employeeSalary.update">
                                    <ul className="icons-list">
                                        <li className="dropdown">
                                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                                <i className="icon-menu9"></i>
                                            </a>
                                            <ul className="dropdown-menu dropdown-menu-right">
                                                <li><a onClick={() => this.handleLoadSalaryConfig(item.id,item.user)}><i className="icon-download"></i>Tải cấu hình lương</a></li>
                                                <li><a onClick={() => this.handleShowmodal("employeeMoneyGroup", item.id, item.user)}><i className="icon-pencil4"></i>Sửa Các Khoản Tiền Nhân Viên</a></li>
                                                <li><a onClick={() => this.handleShowmodal("supportFeeEdit", item.id, item.user)}><i className="icon-pencil4"></i>Sửa Tiền Phụ Cấp</a></li>

                                            </ul>
                                        </li>
                                    </ul>
                                </SecuredComponent>
                            </td>
                        </tr>]
                    );

                })
                return (
                    [<tr >


                        <td className="bg-grey-300" style={{ position: 'sticky', left: 0 }} ></td>
                        <td className="bg-grey-300" style={{ position: 'sticky', left: 35 }} colSpan="2"> {group.department ? group.department.code : "Chưa Xác Định"} - {group.department ? group.department.name : "Chưa Xác Định"}</td>
                        <td className="bg-grey-300" style={{ position: 'sticky', left: 340 }}><center>{group.attendanceCoefficient ? group.attendanceCoefficient : 0} {group.department ?
                            <SecuredComponent allowedPermission="admin.employeeSalary.updateAttendanceCoefficient">
                                <a style={{ color: 'white' }} onClick={() => this.handleShowAttendanceCoefficient(group.department.id)}><i className="icon-pen6"></i></a>
                            </SecuredComponent>
                            : null}</center></td>
                        <td colSpan={hiddenColumns ? "7" : "25"}></td>
                        <td></td>
                    </tr>].concat(employeeSalaryList)
                );
            })
        }
        const wrapperStyle = {
            height: '100%',
            width: '100%'
        }
        var dataCompany = this.state.listAllCompany;
        var optionCompany = [{ label: "Tất Cả", value: "ALL" }];
        var companyId = qs.parse(this.props.location.search).companyId;
        if (!companyId) {
            companyId = "ALL";
        }
        if (dataCompany) {
            dataCompany.map(item => {
                optionCompany.push({ label: item.name, value: item.id })
            })
        }
        var search = qs.parse(this.props.location.search).search;
        return (

            <div className="content-wrapper">


                <div className="content">
                    <div className="page-header">
                        <h4>
                            <i className=" icon-paragraph-justify2 position-left"></i>
                            <span className="text-semibold">Danh sách Lương Khối Văn Phòng</span>
                        </h4>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-flat">

                                <div className="panel-body">
                                    <div style={{ height: '100%', width: '100%' }} className="input-group content-group">
                                        <div>
                                            <span style={wrapperStyle}>
                                                <CalendarHeader
                                                    currentDate={currentDate}
                                                    next={this.next}
                                                    prev={this.prev}
                                                    today={this.today} />
                                            </span>

                                            <br />

                                            <br style={{ lineHeight: '100px' }} />
                                            <div className="col-md-12">

                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <Field name="companyId" placeholder="Chọn Công Ty"
                                                            options={optionCompany} component={RenderSelect}
                                                            onChangeAction={(companyId) => this.updateListEmployeeSalary(companyId)}></Field>
                                                    </div>
                                                    <div className="col-md-9">
                                                        <Field name="fullNameOrEmail" placeholder="Tìm Kiếm Theo: Tên nhân viên, Mã nhân viên..."
                                                            component={RenderInputWithDiv}
                                                            onEnterAction={(fullNameOrEmail) => this.handleSetFullNameOrEmailSearch(fullNameOrEmail)}></Field>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <br />
                                        <br />
                                        <br />
                                        <div className="pull-right">
                                            <span>Lưu Ý: Những nhân viên chưa xác định phòng ban, vui lòng xét phòng ban cho nhân viên để có hệ số quy đổi ngày công</span>
                                            <br />

                                        </div>

                                    </div>
                                    <div className="pull-left">
                                        <button onClick={() => this.hideOrShowColumns()}> <i className="icon-arrow-left15"></i> Ẩn-Hiện Cột Chi Tiết </button>
                                    </div>
                                    <div className="pull-right">
                                        <SecuredComponent allowedPermission="admin.employeeSalary.approvalAllPaymentSalary">
                                            <button className="btn btn-primary" onClick={() => this.handleShowPaymentAllEmployee()}><i className="icon-checkmark"></i> DUYỆT TẤT CẢ LƯƠNG NHÂN VIÊN</button>
                                        </SecuredComponent>
                                        <br />
                                        <SecuredComponent allowedPermission="admin.totalRevenue.check">
                                            <span style={{ fontSize: "15px" }}>Tổng Lương: {FormatterUtils.formatCurrency(totalSalaryAllEmployee)}</span>
                                        </SecuredComponent>
                                    </div>
                                </div>
                            </div>
                            {this.state.isEmployeeSalaryModalShown ? <ModalEmployeeSalary title="Nhân Công" idEmployeeSalary={this.state.idEmployeeSalary} userDto={this.state.userDto} editType={this.state.editType} show={this.state.isEmployeeSalaryModalShown} onHide={this.handleHidemodal} /> : null}
                            {this.state.isShowDepartmentAttendanceCoefficient ? <ModalUpdateAttendanceCoefficient title="Chỉnh Sửa Hệ Số Ngày Công Theo Bộ Phận" idDepartment={this.state.idDepartment} month={month} year={year} show={this.state.isShowDepartmentAttendanceCoefficient} onHide={this.handleHidemodal} /> : null}
                            {this.state.isShowPaymentAllEmployeeModal ? <ModalPaymentAllEmployee title="Thanh Toán Lương Tất Cả Nhân Viên" month={month} year={year} show={this.state.isShowPaymentAllEmployeeModal} onHide={this.handleHidemodal} /> : null}
                            {this.state.isShowLoadSalaryConfig ? <ModalLoadUserSalaryConfig title="Tải Cấu Hình Lương" show={this.state.isShowLoadSalaryConfig}  userDto={this.state.userDto} idEmployeeSalary={this.state.idEmployeeSalary} onHide={this.handleHidemodal} /> : null}

                            <div  style={{maxHeight:'800px',overflow: 'auto'}} className="panel panel-flat">

                                <table className="table  table-bordered table-xxs ">
                                    <thead style={{ whiteSpace: 'nowrap' }}>
                                        <tr className="bg-teal">
                                            <th  style={{ backgroundColor:'#64B5F6',position: 'sticky', left: 0 }} rowSpan="2" className="text-center footable-visible footable-last-column" ><i    className="icon-menu-open2"></i></th>
                                            {/* <th data-hide="phone">Hình Ảnh</th> */}
                                            <th style={{backgroundColor:'#64B5F6', position: 'sticky', left: 35 }} rowSpan="2" >Họ và Tên Nhân Viên</th>
                                            {/* <th style={{ backgroundColor:'#64B5F6',position: 'sticky', left: 175 }} rowSpan="2" >Mã Nhân Viên & Chức Vụ</th> */}
                                            <th style={{ backgroundColor:'#64B5F6',position: 'sticky', left: 175 }} rowSpan="2" >STK Ngân Hàng & Tên Ngân Hàng</th>
                                            <th style={{ backgroundColor:'#64B5F6',position: 'sticky', left: 340 }} rowSpan="2" >Hệ Số NC</th>
                                            <th rowSpan="2" data-toggle="phone">Lương Chính</th>
                                            {/* <th rowSpan="2" data-toggle="phone">Lương TC Thường</th>
                                            <th rowSpan="2" data-toggle="phone">Lương TC Cuối Tuần</th>
                                            <th rowSpan="2" data-toggle="phone">Lương TC Lễ</th> */}
                                            <th colSpan={hiddenColumns ? "1" : "5"} data-toggle="phone"><center>Các khoản hỗ trợ <br/> (Không đóng BHXH)</center></th>
                                            <th rowSpan="2" data-toggle="phone">Phụ Cấp <br/> Trách Nhiệm</th>
                                            {/* <th rowSpan="2" data-toggle="phone">Ngày Công Thường</th> */}
                                            {hiddenColumns ? null: <th colSpan="3" data-toggle="phone"><center>Ngoài Giờ <br/> <a style={{color:'grey'}} onClick={()=>this.handleToggleShowFormula()}>{isShowFormulaRows?"(Ẩn công thức)":"(Hiện công thức)"}</a></center></th>}
                                            <th rowSpan="2" data-toggle="phone">Tổng Ngày Công</th>
                                            <th rowSpan="2" data-toggle="phone">Tổng Lương</th>
                                            {hiddenColumns ? null: <th rowSpan="2" data-toggle="phone">Thu Nhập Chịu Thuế TNCN</th>}
                                            {hiddenColumns ? null: <th rowSpan="2" data-toggle="phone">Lương Đóng BHXH</th>}
                                            {hiddenColumns ? null: <th colSpan="4" data-toggle="phone"><center>Các khoản trích vào Chi phí của DN</center></th>}
                                            {hiddenColumns ? null: <th colSpan="4" data-toggle="phone"><center>Các khoản trích trừ vào lương của NV</center></th>}
                                            {hiddenColumns ? null: <th colSpan="2" data-toggle="phone"><center>Giảm Trừ</center></th>}
                                            {hiddenColumns ? null: <th rowSpan="2" data-toggle="phone">Thu Nhập Tính Thuế TNCN</th>}
                                            {hiddenColumns ? null: <th rowSpan="2" data-toggle="phone">Thuế TNCN Phải Nộp</th>}
                                            <th rowSpan="2" data-toggle="phone">Thực Lĩnh</th>
                                            <th rowSpan="2" data-toggle="phone">Ghi Chú</th>
                                            <th rowSpan="2" data-toggle="phone">Trạng Thái Thanh Toán</th>
                                            <th rowSpan="2" className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        </tr>
                                        <tr className="bg-teal">
                                            {hiddenColumns ? null: <th data-toggle="phone">Ăn trưa</th>}
                                            {hiddenColumns ? null: <th data-toggle="phone">Điện Thoại</th>}
                                            {hiddenColumns ? null: <th data-toggle="phone">Xăng xe / Đi lại</th>}
                                            {hiddenColumns ? null: <th data-toggle="phone">Đi công trường</th>}
                                            <th data-toggle="phone">Tổng</th>
                                            {hiddenColumns ? null: <th data-toggle="phone">Ngày Thường</th>}
                                            {hiddenColumns ? null: <th data-toggle="phone">Thứ 7 & Chủ Nhật</th>}
                                            {hiddenColumns ? null: <th data-toggle="phone">Làm Ngày Lễ</th>}
                                            {hiddenColumns ? null: <th data-toggle="phone">BHXH (17,5%)</th>}
                                            {hiddenColumns ? null: <th data-toggle="phone">BHYT (3%)</th>}
                                            {hiddenColumns ? null: <th data-toggle="phone">BHTN (1%)</th>}
                                            {hiddenColumns ? null: <th data-toggle="phone">Cộng</th>}
                                            {hiddenColumns ? null: <th data-toggle="phone">BHXH (8%)</th>}
                                            {hiddenColumns ? null: <th data-toggle="phone">BHYT (1.5%)</th>}
                                            {hiddenColumns ? null: <th data-toggle="phone">BHTN (1%)</th>}
                                            {hiddenColumns ? null: <th data-toggle="phone">Cộng</th>}
                                            {hiddenColumns ? null: <th data-toggle="phone">Bản Thân</th>}
                                            {hiddenColumns ? null: <th data-toggle="phone">Người PT</th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {employeeSalaryGroupList}
                                        <tr>
                                            <td colSpan="39"></td>
                                        </tr>
                                        <tr style={{ height: '100px' }}>
                                            <td colSpan="39"></td>
                                        </tr>

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

export default translate('translations')
    (connect(mapStateToProps, mapDispatchToProps)(EmployeeSalaryList));

