import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { ScriptUtils, FormatterUtils, SecurityUtils } from '../../utils/javascriptUtils';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import { RenderSelect, RenderSmallSelect } from '../../components/formInputs';
import { Link } from 'react-router-dom';
import ModalLabourSalary from './ModalLabourSalary';
import moment from 'moment';
import { PermanentCacheService } from '../../services/middleware';
import { connect } from 'react-redux';
import dateFns from 'date-fns';
import ExportLabourSalaryToExcel from './ExportLabourSalaryToExcel';
import SecuredComponent from '../../components/SecuredComponent';
import ModalPaymentAllLabour from './ModalPaymentAllLabour';

const AttendanceRows = (props) => {
    const {attendanceByLabourId} = props;
    var AttendanceRowProjectDetailGroup = null;
   
    var groupRows = [];
    let getProjectDetail = (groupProjectDetail, projectDetailId) => {
        for (var i = 0; i < groupProjectDetail.length; i++) {
            if (groupProjectDetail[i].projectDetail.id == projectDetailId) {
                return groupProjectDetail[i];
            }
        }
        return null;
    }
     if (attendanceByLabourId && attendanceByLabourId.isShown) {
        attendanceByLabourId.attendances.map(item => {
        var projectDetailGroup = getProjectDetail(groupRows, item.projectDetailId)
        if (!projectDetailGroup) {
                var groupObject = {
                    projectDetail: item.projectDetail,
                    attendanceList: [item]

                };
                groupRows.push(groupObject);

            } else {
                projectDetailGroup.attendanceList.push(item);
            }

       
        });
                    var normalAttendance = 0;
                    var overtimeAttendance = 0;
                    var midnightAttendance = 0;
                    var totalAttendance = 0;
        if(groupRows){
         AttendanceRowProjectDetailGroup =   groupRows.map(pdGroup=>{
                normalAttendance = 0;
                overtimeAttendance = 0;
                midnightAttendance = 0;
                totalAttendance = 0;
                    var attendanceRows = pdGroup.attendanceList.map(item=>{
               
                normalAttendance += parseFloat(item.totalDatetime/8);
                 if(item.overtimeStatus == 'TANG_CA_THUONG_TOI'){
                    overtimeAttendance +=parseFloat(item.totalOvertime/6);
                }
                else if(item.overtimeStatus == 'TANG_CA_KHUYA'){
                    midnightAttendance +=parseFloat(item.totalOvertime/6);
                }
            });
            totalAttendance += normalAttendance +overtimeAttendance
             return [<tr className="alpha-slate" style={{textAlign:'center'}}>
            <td></td>
            <td></td>
            <td colSpan="2">{pdGroup.projectDetail.project.name}</td>
            <td colSpan="2">{pdGroup.projectDetail.name}</td>
            <td>{FormatterUtils.round2Decimals(normalAttendance)}</td>
            <td>{FormatterUtils.round2Decimals(overtimeAttendance)}</td>
            <td>{FormatterUtils.round2Decimals(midnightAttendance)}</td>
            <td>{FormatterUtils.round2Decimals(totalAttendance)}</td>
            <td colSpan="12"></td>
             </tr>].concat(attendanceRows)
            })
            
        }
    }
    return AttendanceRowProjectDetailGroup;
}

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

const selector = formValueSelector('LabourSalaryList');

const mapStateToProps = state => {
    return {
        currentUser: state.common.currentUser,
        labourId: selector(state, "labourId"),

    };
};

const mapDispatchToProps = dispatch => ({
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "LabourSalaryList", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        }),
});
let getAttendanceByLabourId = (listAttendanceByLabourId, lbIdShow) => {
    for (var i = 0; i < listAttendanceByLabourId.length; i++) {
        if (listAttendanceByLabourId[i].lbIdShow == lbIdShow) {
            return listAttendanceByLabourId[i];
        }
    }
    return null;
}
class LabourSalaryList extends React.Component {
    constructor() {
        super();
        let initialDate = new Date()
        initialDate = PermanentCacheService.getItem("selected_month") ? new Date(PermanentCacheService.getItem("selected_month")) : dateFns.setDate(initialDate, 1)
        this.state = {
            currentDate: initialDate,
            listLabourSalary: [],
            listAllLabour: [],
            isLabourSalaryModalShown: false,
            idLabourSalary: null,
            editType: null,
            labourId: null,
            lbIdShow: null,
            isShownExportExcelModal: false,
            labourSalaryDto: null,
            isShowPaymentAllLabourModal: false,
            reloadNum:0,
            listAttendanceByLabourId:[]

        }
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.handleExportExcel = this.handleExportExcel.bind(this);
        this.handleShowPaymentAllLabour = this.handleShowPaymentAllLabour.bind(this);
        this.handleHidemodal = () => {
            this.setState({
                isLabourSalaryModalShown: false,
                isShownExportExcelModal: false,
                isShowPaymentAllLabourModal: false,
                editType: null
            });
            this.updateListLabourSalary(this.state.labourId);
        };
        this.prev = () => {
            const prev = dateFns.subMonths(this.state.currentDate, 1)
            PermanentCacheService.setItem("selected_month", prev);
            this.setState({ currentDate: prev }, () => {
                this.updateListLabourSalary(this.state.labourId);
            })
        }
        this.next = () => {
            const next = dateFns.addMonths(this.state.currentDate, 1)
            PermanentCacheService.setItem("selected_month", next);
            this.setState({ currentDate: next }, () => {
                this.updateListLabourSalary(this.state.labourId);
            })
        }
        this.today = () => {
            let today = new Date()
            today = dateFns.setDate(today, 1)
            PermanentCacheService.setItem("selected_month", today);
            this.setState({ currentDate: today }, () => {
                this.updateListLabourSalary(this.state.labourId);
            })
        }
        this.handleShowAttendanceByLabourId = (lbIdShow) => {
            // if()
             const currentDate = this.state.currentDate;
            var startDateOfMonth = moment(dateFns.startOfMonth(currentDate)).format("YYYY-MM-DD-HH:mm:ss");
            var endDateOfMonth = moment(dateFns.lastDayOfMonth(currentDate)).format("YYYY-MM-DD-HH:mm:ss");
            // if(this.state.listAttendanceByLabourId){
            var currentAttendanceList = this.state.listAttendanceByLabourId;
            var reloadNum = this.state.reloadNum;
            if (lbIdShow) {
                this.setState({ lbIdShow: lbIdShow })
                var attendanceShown = getAttendanceByLabourId(currentAttendanceList, lbIdShow);
                if (attendanceShown && attendanceShown.isShown) {
                    attendanceShown.isShown = false;
                    this.setState({ reloadNum: reloadNum + 1 });
                    return;
                }
                let setStateInRequest = (list) => {
                    var newAttendanceList = getAttendanceByLabourId(this.state.listAttendanceByLabourId, lbIdShow)
                    if (newAttendanceList) {
                        newAttendanceList.attendances = list;
                        newAttendanceList.isShown = true;
                    } else {
                        currentAttendanceList.push({ lbIdShow: lbIdShow, attendances: list, isShown: true });
                    }
                    this.setState({ listAttendanceByLabourId: currentAttendanceList, reloadNum: reloadNum + 1 });
                }
                return agent.asyncRequests.get("/labourAttendance/findByLabourId?labourId=" + lbIdShow+"&dateToWorkStart="+startDateOfMonth+"&dateToWorkEnd="+endDateOfMonth).then(function (res) {
                    var result = res.body.resultData;
                    if (result) {
                        setStateInRequest(result);
                    } else {
                        toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                    }
                }, function (err) {
                    toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
                });
            }else{
                                    this.setState({ listAttendanceByLabourId: [], reloadNum: reloadNum + 1 });

            }
        }
    };
    updateListLabourSalary(labourId) {
        const currentDate = this.state.currentDate;
        var month = moment(currentDate).format("M");
        var year = moment(dateFns.startOfMonth(currentDate)).format("YYYY");
      
        if (!labourId) {
            return null;
        }
        if (labourId && labourId == "ALL") {
                        this.handleShowAttendanceByLabourId(null);
            let setStateInRequest = (list) => {
                this.setState({ labourId: labourId, listLabourSalary: [] });
                this.setState({ listLabourSalary: list });
            }
            return (agent.asyncRequests.get('/labourSalary/listAllLabourByMonthAndYear?month='
                + month + '&year=' + year).then(function (res) {
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
        } else if (labourId && labourId != "ALL") {
            this.handleShowAttendanceByLabourId(labourId);
            this.setState({ labourId: labourId, listLabourSalary: [] });
            let setStateInRequest = (list) => {
                this.setState({ listLabourSalary: list });
            }
            return (agent.asyncRequests.get('/labourSalary/listFindByLabourIdAndMonthAndYear?labourId='
                + labourId + '&month='
                + month + '&year=' + year).then(function (res) {
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
    }
    componentWillMount() {
        const { updateField, labourId } = this.props;
        // try get from property, if not exist, try from query param
        var paramLabourId = qs.parse(this.props.location.search).labourId;
        if (paramLabourId) {
            updateField("labourId", paramLabourId);
            this.updateListLabourSalary(paramLabourId);
        } else if (labourId) {
            this.updateListLabourSalary(labourId);
        } else if (!labourId) {
            this.updateListLabourSalary('ALL');
        }
        return (
            this.getListLabour()
        )
    };
    getListLabour() {
        let setStateInRequest = (list) => { this.setState({ listAllLabour: list }) }
        return (agent.asyncRequests.get('/labour/listAll').then(function (res) {
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
    }
    //Delete LabourSalary Function
    deleteLabourSalary(id) {

        if (confirm("Bạn có chắc sẽ xoá:")) {
            var url = `/labourSalary/${id}`;
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
    handleShowmodal(editType, id) {
        this.setState({
            isLabourSalaryModalShown: true,
            idLabourSalary: id,
            editType: editType
        });
    }
    handleShowPaymentAllLabour() {
        const { currentUser } = this.props;
        if (SecurityUtils.hasPermission(currentUser, "admin.labourSalary.approvalAllPaymentSalary")) {
            this.setState({
                isShowPaymentAllLabourModal: true
            })
        }
    }

    handleExportExcel(labourSalaryDto) {
        this.setState({
            isShownExportExcelModal: true,
            labourSalaryDto: labourSalaryDto
        })
    }
    render() {
        const { t } = this.props;
        const currentDate = new Date(this.state.currentDate.getTime());
        var page = qs.parse(this.props.location.search).page;
        var month = moment(currentDate).format("M");
        var year = moment(dateFns.startOfMonth(currentDate)).format("YYYY");
        var totalSalaryAllLabour = 0;
        const data = this.state.listLabourSalary;
        if (!data) {
            return null;
        }
        if (!page) {
            page = 1;
        }

       
        


        var currentNo = ((page - 1) * 20);
        var rows = data.map(item => {
        
         var  AttenRows=  <AttendanceRows attendanceByLabourId={getAttendanceByLabourId(this.state.listAttendanceByLabourId, item.labourId)} ></AttendanceRows>   
         currentNo = currentNo + 1;
         totalSalaryAllLabour += item.actualSalary;
         return (
                [<tr style={{ textAlign: 'center' }} key={item.id}>
                     <td>
                <button className="bg-info icon-arrow-down22" onClick={() => this.handleShowAttendanceByLabourId(item.labourId)}></button>
            </td>
                    <td>
                        {/* <a onClick={() => this.handleExportExcel(item)}><i className="icon-file-excel"></i></a> */}
                        </td>
                    <td>{currentNo}</td>
                    <td>{item.labour ? item.labour.fullName : null}</td>
                    <td>{item.labour ? FormatterUtils.formatCurrency(item.labour.salaryPerDay) : null}</td>
                    <td>{item.labour ? FormatterUtils.formatCurrency(item.labour.salaryMidnight) : null}</td>
                    <td className="success">{FormatterUtils.round2Decimals(item.attendanceLv0 / 8.0)}</td>
                    <td className="success">{FormatterUtils.round2Decimals(item.attendanceLv1 / 6.0)}</td>
                    <td className="success">{FormatterUtils.round2Decimals(item.attendanceLv2 / 6.0)}</td>
                    {/* <td className="success">{item.attendanceLv2/8}</td>
                    <td className="success">{item.attendanceLv3/8}</td> */}
                    <td style={{ color: '#1E88E5' }}>{FormatterUtils.round2Decimals(item.totalAttendanceCalc)}</td>
                    <td style={{ color: '#1E88E5' }}>{FormatterUtils.formatCurrency(item.totalNormalSalary)}</td>
                    <td style={{ color: '#1E88E5' }}>{FormatterUtils.formatCurrency(item.totalMidnightSalary)}</td>
                    <td style={{ color: '#1E88E5' }}>{FormatterUtils.formatCurrency(item.totalSalary)}</td>
                    {/* <td className="info">{item.numberOfDistanceDay}</td>
                    <td className="info">{item.numberOfTransport}</td>
                    <td className="info">{FormatterUtils.formatCurrency(item.labourSupportFee)}</td> */}
                    <td className="info">{FormatterUtils.formatCurrency(item.otherSupportFee)}</td>
                    <td style={{ color: '#1E88E5' }}>{FormatterUtils.formatCurrency(item.totalSupportFee)}</td>
                    {/* <td className="warning">{FormatterUtils.formatCurrency(item.birthdayFee)}</td>
                    <td className="warning">{FormatterUtils.formatCurrency(item.holidayFee)}</td>
                    <td className="warning">{FormatterUtils.formatCurrency(item.diligenceFee)}</td> */}
                    <td className="warning">{FormatterUtils.formatCurrency(item.otherExtraFee)}</td>
                    <td style={{ color: '#1E88E5' }}>{FormatterUtils.formatCurrency(item.totalExtraFee)}</td>
                    {/* <td className="danger">{FormatterUtils.formatCurrency(item.unionFee)}</td>
                    <td className="danger">{FormatterUtils.formatCurrency(item.taxFee)}</td>
                    <td className="danger">{FormatterUtils.formatCurrency(item.socialInsuranceFee)}</td>
                    <td className="danger">{FormatterUtils.formatCurrency(item.penaltyFee)}</td>
                    <td className="danger">{FormatterUtils.formatCurrency(item.advanceFee)}</td>
                    <td style={{color:'#1E88E5'}}>{FormatterUtils.formatCurrency(item.totalMinusFee)}</td> */}
                    <td style={{ color: '#8BC34A', fontSize: 14 }}>{FormatterUtils.formatCurrency(item.actualSalary)}</td>
                    <td>{item.note}</td>
                    <td style={item.paymentStatus == "CHUA_DUYET_THANH_TOAN" ? { color: 'red' } : { color: 'green' }} >{t(item.paymentStatus)}</td>
                    <td>{item.paymentStatus == "DA_DUYET_THANH_TOAN" ? moment(item.paymentDate).format("DD/MM/YYYY") : null}</td>
                    <td className="text-center footable-visible footable-last-column">
                        {item.paymentStatus   == "CHUA_DUYET_THANH_TOAN"?<ul className="icons-list">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="icon-menu9"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                    <li><a onClick={() => this.handleShowmodal("salaryPerDayEdit", item.id)}><i className="icon-pencil4"></i>Sửa Lương Theo Ngày</a></li>
                                    <li><a onClick={() => this.handleShowmodal("supportFeeEdit", item.id)}><i className="icon-pencil4"></i>Sửa Tiền Phụ Cấp</a></li>
                                    <li><a onClick={() => this.handleShowmodal("extraFeeEdit", item.id)}><i className="icon-pencil4"></i>Sửa Tiền Ngoài Lương</a></li>
                                    {/* <li><a onClick={() => this.handleShowmodal("minusFeeEdit",item.id)}><i className="icon-pencil4"></i>Sửa Tiền Trừ</a></li> */}
                                </ul>
                            </li>
                        </ul>:null}
                    </td>
                </tr>].concat(AttenRows));
        });
        

        const wrapperStyle = {
            height: '100%',
            width: '100%'
        }
        var dataLabour = this.state.listAllLabour;
        var optionLabour = [{ label: "Tất Cả", value: "ALL" }];
        if (dataLabour) {
            dataLabour.map(item => {
                optionLabour.push({ label: item.fullName, value: item.id })
            })
        }
        return (

            <div className="content-wrapper">


                <div className="content">
                    <div className="page-header">
                        <h4>
                            <i className=" icon-paragraph-justify2 position-left"></i>
                            <span className="text-semibold">Danh sách Lương Nhân Công</span>
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
                                            <Field name="labourId" placeholder="Chọn Nhân Công"
                                                options={optionLabour} component={RenderSelect}
                                                onChangeAction={(labourId) => this.updateListLabourSalary(labourId)}></Field>
                                        </div>
                                        <br />
                                        <br />
                                        <span style={{ fontSize: "15px" }}>* Ngày công thường = tổng giờ công * (hệ số 1) / 8</span>
                                        <br />
                                        <span style={{ fontSize: "15px" }}>* Ngày công tăng ca thường = tổng giờ công tăng ca thường / 6</span>
                                        <br />
                                        <span style={{ fontSize: "15px" }}>* Ngày công tăng ca KHUYA = tổng giờ công tăng ca KHUYA / 6</span>
                                        <br />
                                        <div className="pull-right">
                                            <SecuredComponent allowedPermission="admin.labourSalary.approvalAllPaymentSalary">
                                                <button onClick={() => this.handleShowPaymentAllLabour()}>Duyệt Tất Cả Lương Nhân Công</button>
                                            </SecuredComponent>
                                            <br />
                                            <SecuredComponent allowedPermission="admin.totalRevenue.check">
                                                <span style={{ fontSize: "15px" }}>Tổng Lương: {FormatterUtils.formatCurrency(totalSalaryAllLabour)}</span>
                                            </SecuredComponent>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {this.state.isLabourSalaryModalShown ? <ModalLabourSalary title="Nhân Công" idLabourSalary={this.state.idLabourSalary} editType={this.state.editType} show={this.state.isLabourSalaryModalShown} onHide={this.handleHidemodal} /> : null}
                            {this.state.isShowPaymentAllLabourModal ? <ModalPaymentAllLabour title="Thanh Toán Lương Tất Cả Nhân Công" month={month} year={year} show={this.state.isShowPaymentAllLabourModal} onHide={this.handleHidemodal} /> : null}

                            <div style={{ overflowX: 'auto' }} className="panel panel-flat">
						
                                <table className="table table-bordered table-xxs">
                                    <thead style={{ whiteSpace: 'nowrap' }}>
                                        <tr className="bg-teal">
                                            <th rowSpan="2" className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                            <th rowSpan="2" className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                            <th rowSpan="2" data-toggle="true">STT</th>
                                            {/* <th data-hide="phone">Hình Ảnh</th> */}
                                            <th rowSpan="2" data-toggle="phone">Tên Nhân Viên</th>
                                            <th rowSpan="2" data-toggle="phone">Lương Theo Ngày</th>
                                            <th rowSpan="2" data-toggle="phone">Lương Tăng Ca Khuya</th>
                                            {/* <th colSpan="4" data-toggle="phone"><center>Ngày Công Thực Tế</center></th> */}
                                            <th colSpan="3" data-toggle="phone"><center>Ngày Công</center></th>
                                            <th rowSpan="2" data-toggle="phone">Tổng Ngày Công</th>
                                            <th rowSpan="2" data-toggle="phone">Tổng Tiền TC & Công Thường </th>
                                            <th rowSpan="2" data-toggle="phone">Tổng Tiền Công Khuya </th>
                                            <th rowSpan="2" data-toggle="phone">Tổng Tiền</th>
                                            <th colSpan="1" data-toggle="phone"><center>Phụ Cấp</center></th>
                                            <th rowSpan="2" data-toggle="phone">Tổng Tiền Phụ Cấp</th>
                                            <th colSpan="1" data-toggle="phone"><center>Ngoài Lương</center></th>
                                            <th rowSpan="2" data-toggle="phone">Tổng Ngoài Lương</th>
                                            {/* <th colSpan="5" data-toggle="phone"><center>Khoản Trừ</center></th> */}
                                            {/* <th rowSpan="2" data-toggle="phone">Tổng Khoảng Trừ</th> */}
                                            <th rowSpan="2" data-toggle="phone">Tổng Lương Thực (Đã Trừ Các Khoảng Chi Phí)</th>
                                            <th rowSpan="2" data-toggle="phone">Ghi Chú</th>
                                            <th rowSpan="2" data-toggle="phone">Trạng Thái Thanh Toán</th>
                                            <th rowSpan="2" data-toggle="phone">Ngày Thanh Toán</th>
                                            <th rowSpan="2" className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        </tr>
                                        <tr className="bg-teal">
                                            {/* <th data-toggle="phone">Ngày Công (Thường)</th>
                                            <th data-toggle="phone">Ngày Công (Cấp Độ 1)</th>
                                            <th data-toggle="phone">Ngày Công (Cấp Độ 2)</th>
                                            <th data-toggle="phone">Ngày Công (Cấp Độ 3)</th> */}
                                            <th data-toggle="phone">Ngày Công (Thường)</th>
                                            <th data-toggle="phone">Ngày Công Tăng Ca(Thường)</th>
                                            <th data-toggle="phone">Ngày Công Tăng Ca (Khuya)</th>
                                            {/* <th data-toggle="phone">Ngày Công (Cấp Độ 2)</th>
                                            <th data-toggle="phone">Ngày Công (Cấp Độ 3)</th> */}
                                            {/* <th data-toggle="phone">Số Ngày Phụ Cấp Công Trình Xa</th>
                                            <th data-toggle="phone">Số Ngày Phụ Cấp Đi Lại</th>
                                            <th data-toggle="phone">Lương Phụ Cấp</th> */}
                                            <th data-toggle="phone">Phụ Cấp Khác</th>
                                            {/* <th data-toggle="phone">Tiền Thưởng Sinh Nhật</th>
                                            <th data-toggle="phone">Tiền Thưởng Lễ</th>
                                            <th data-toggle="phone">Thưởng Chuyên Cần</th> */}
                                            <th data-toggle="phone">Tiền Thưởng Khác</th>
                                            {/* <th data-toggle="phone">Tiền Công Đoàn</th>
                                            <th data-toggle="phone">Thuế TNCN</th>
                                            <th data-toggle="phone">Tiền BHXH</th>
                                            <th data-toggle="phone">Phạt Vi Phạm</th>
                                            <th data-toggle="phone">Tiền Tạm Ứng</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                        <tr>
                                            <td colSpan="30"></td>
                                        </tr>
                                        <tr style={{ height: '100px' }}>
                                            <td colSpan="30"></td>
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
    (connect(mapStateToProps, mapDispatchToProps)(LabourSalaryList));
