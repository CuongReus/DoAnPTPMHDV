import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { Field, formValueSelector } from 'redux-form';
import { translate } from 'react-i18next';
import { ScriptUtils } from '../../utils/javascriptUtils';
import agent from '../../services/agent';
import moment from 'moment';
import ModalLabourNormalAttendance from './ModalLabourNormalAttendance';
import { PermanentCacheService } from '../../services/middleware';
import dateFns from 'date-fns';
import ModalSetLabourAbsent from './ModalSetLabourAbsent';
import { RenderSelect } from '../../components/formInputs';
import ModalLabourOvertimeAttendance from './ModalLabourOvertimeAttendance';
import SecuredComponent from '../../components/SecuredComponent';

const selector = formValueSelector('ListLaboutAttendanceForSupervisor');
const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
    labourId:selector(state,"labourId")
});
const mapDispatchToProps = dispatch => ({
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ListLaboutAttendanceForSupervisor", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        }),
});

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

class ListLaboutAttendanceForSupervisor extends React.Component {
    constructor() {
        super();
        let initialDate = new Date()
        initialDate = PermanentCacheService.getItem("selected_month") ? new Date(PermanentCacheService.getItem("selected_month")) : dateFns.setDate(initialDate, 1)
        this.state = {
            currentDate: initialDate,
            listLabourAttendanceForSupervisor: [],
            idLabourAttendance: null,
            isOvertime: false,
            isSetOuttimeModalShown: false,
            isSetOutOvertimeModalShown: false,
            isEditLabourAbsentModalShown: false,
            labourId: null,
            listAllLabour: []

        }
        
        this.handleShowOuttimemodal = this.handleShowOuttimemodal.bind(this);
        this.hanleShowOutOvertimemodal = this.hanleShowOutOvertimemodal.bind(this);
        this.updateListLabourAttendanceForSupervisor = this.updateListLabourAttendanceForSupervisor.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isSetOuttimeModalShown: false,
                isSetOutOvertimeModalShown:false,
                isEditLabourAbsentModalShown: false,
                idLabourAttendance: null,
                isOvertime: false });
            this.updateListLabourAttendanceForSupervisor(this.state.labourId);
        };
        this.prev = () => {
            const prev = dateFns.subMonths(this.state.currentDate, 1)
            PermanentCacheService.setItem("selected_month", prev);
            this.setState({ currentDate: prev }, () => {
                this.updateListLabourAttendanceForSupervisor(this.state.labourId);
            })
        }
        this.next = () => {
            const next = dateFns.addMonths(this.state.currentDate, 1)
            PermanentCacheService.setItem("selected_month", next);
            this.setState({ currentDate: next }, () => {
                this.updateListLabourAttendanceForSupervisor(this.state.labourId);
            })
        }
        this.today = () => {
            let today = new Date()
            today = dateFns.setDate(today, 1)
            PermanentCacheService.setItem("selected_month", today);
            this.setState({ currentDate: today }, () => {
                this.updateListLabourAttendanceForSupervisor(this.state.labourId);
            })
        }
    };
    
    updateListLabourAttendanceForSupervisor(labourId) {
        const { currentUser } = this.props.location.state;
        if (!labourId) {
            return null;
        }
        if (currentUser) {
            if (labourId && labourId == "ALL") {
                let setStateInRequest = (list) => {
                    this.setState({ labourId: labourId, listLabourAttendanceForSupervisor: [] });
                    this.setState({ listLabourAttendanceForSupervisor: list });
                }
                const currentDate = this.state.currentDate;
                var startDateOfMonth = moment(dateFns.startOfMonth(currentDate)).format("YYYY-MM-DD-HH:mm:ss");
                var endDateOfMonth = moment(dateFns.lastDayOfMonth(currentDate)).format("YYYY-MM-DD-HH:mm:ss");
                return (agent.asyncRequests.get('/labourAttendance/findByCreatedUserId?createdUserId=' +
                    currentUser.id + "&dateToWorkStart=" + startDateOfMonth +
                    "&dateToWorkEnd=" + endDateOfMonth).then(function (res) {
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
                let setStateInRequest = (list) => {
                    this.setState({ labourId: labourId, listLabourAttendanceForSupervisor: [] });
                    this.setState({ listLabourAttendanceForSupervisor: list });
                }
                const currentDate = this.state.currentDate;
                var startDateOfMonth = moment(dateFns.startOfMonth(currentDate)).format("YYYY-MM-DD-HH:mm:ss");
                var endDateOfMonth = moment(dateFns.lastDayOfMonth(currentDate)).format("YYYY-MM-DD-HH:mm:ss");
                return (agent.asyncRequests.get('/labourAttendance/findByLabourIdAndCreatedUserId?labourId=' + labourId + '&createdUserId=' +
                    currentUser.id + "&dateToWorkStart=" + startDateOfMonth +
                    "&dateToWorkEnd=" + endDateOfMonth).then(function (res) {
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
    }
    componentWillMount() {
        const { updateField, labourId } = this.props;
        // try get from property, if not exist, try from query param
        var paramLabourId = qs.parse(this.props.location.search).labourId;
        if (paramLabourId) {
            updateField("labourId", paramLabourId);
            this.updateListLabourAttendanceForSupervisor(paramLabourId);
        } else if (labourId) {
            this.updateListLabourAttendanceForSupervisor(labourId);
        } else if (!labourId) {
            this.updateListLabourAttendanceForSupervisor('ALL');
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
    //Delete Labour Function
    deleteLabour(id) {
        var updateListLabourAttendanceForSupervisor = this.updateListLabourAttendanceForSupervisor;
        var labourId = this.state.labourId;
        if (confirm("Bạn có chắc sẽ xoá:")) {
            var url = `/labourAttendance/${id}`;
            return agent.asyncRequests.del(url
            ).then(function (res) {
                var result = res.body.resultData;
                if (result && !result.error) {
                    toast.info("Xóa Thành Công!" , { autoClose: 15000 });
                    updateListLabourAttendanceForSupervisor(labourId);
                } else {
                    toast.error("Có lỗi khi xóa dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Không thể xóa dữ liệu đang được sử dụng từ màn hình khác! ", { autoClose: 15000 });
            });
        } else {
        }
    }
    // Outtime of normal attendance
    handleShowOuttimemodal(id) {
        this.setState({
            idLabourAttendance: id,
        },()=>{
            this.setState({
                isSetOuttimeModalShown: true,
            })
        });
    }
    handleShowEditLabourAbsentDay(id) {
        this.setState({
            idLabourAttendance: id,
            isEditLabourAbsentModalShown: true

        })
    }
    hanleShowOutOvertimemodal(id) {
        this.setState({
            idLabourAttendance: id,
        },()=>{
            this.setState({ isSetOutOvertimeModalShown: true})
        });
    }
    
    render() {
        const {t} = this.props;
        const data = this.state.listLabourAttendanceForSupervisor;
        const currentDate = new Date(this.state.currentDate.getTime());
        var tdType = null;
        var trType = null;
        if (!data) {
            return null;
        }
        const wrapperStyle = {
            height: '100%',
            width: '100%'
        }
        var rows = data.map(item => {
            if (!item.overtimeStatus && !item.absentStatus) {
                tdType = 
                <SecuredComponent allowedPermission="admin.labourAttendance.update">
                    <button type="button" onClick={() => this.handleShowOuttimemodal(item.id)}>{!item.outTime ? "Chấm Giờ Về" : "Chỉnh Sửa"} </button>
                    </SecuredComponent>
            } else if (item.overtimeStatus && !item.absentStatus) {
                tdType = 
                <SecuredComponent allowedPermission="admin.labourAttendance.update">
                    <button type="button" onClick={() => this.hanleShowOutOvertimemodal(item.id)}>{!item.outTime ? "Chấm Giờ Về TC" : "Chỉnh Sửa"}</button>
                </SecuredComponent>
            };
            if (item.absentStatus) {
                trType = { backgroundColor: "#D0D0D0" }
            }
            return (
                <tr style={item.outTime ? trType : { backgroundColor: "#F5F5DC", trType }} key={item.id}>
                    <td>{tdType}</td>
                    <td>{item.labour ? item.labour.fullName : null}</td>
                    <td>{item.project ? item.project.name : null}</td>
                    <td>{item.dateToWork}</td>
                    {!item.overtimeStatus ?<td>{item.startDatetime}</td>:<td></td>}
                    {!item.overtimeStatus ?<td>{item.endDatetime}</td>:<td></td>}
                    {!item.overtimeStatus ?<td>{ item.minusLunchHour}</td>:<td></td>}
                    {!item.overtimeStatus ?<td>{item.totalDatetime}</td>:<td></td>}
                    {item.overtimeStatus?<td style={item.overtimeStatus ? { color: 'blue' } : null}>{t(item.overtimeStatus)}</td>:<td></td>}
                    {item.overtimeStatus?<td style={item.overtimeStatus ? { color: 'blue' } : null}>{item.startOvertime}</td>:<td></td>}
                    {item.overtimeStatus?<td style={item.overtimeStatus ? { color: 'blue' } : null}>{item.endOvertime}</td>:<td></td>}
                    {item.overtimeStatus?<td style={item.overtimeStatus ? { color: 'blue' } : null}>{item.overtimeStatus ?item.minusLunchHour:0}</td>:<td></td>}
                    {item.overtimeStatus? <td style={item.overtimeStatus ? { color: 'blue' } : null}>{item.totalOvertime}</td>:<td></td>}
        
                    <td>{t(item.lateStatus)}</td>
                    <td>{item.note}</td>
                    {!item.absentStatus ? <td className="active-font" target={item.outTime ? "Đã Có Giờ Về" : "Chưa Có Giờ Về"}><center>{item.outTime ? "Đã Có Giờ Về" : "Chưa Có Giờ Về"}</center></td> : <td></td>}
                    <td className="text-center footable-visible footable-last-column">
                        <ul className="icons-list">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="icon-menu9"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                    <SecuredComponent allowedPermission="admin.labourAttendance.update">
                                        <li><a onClick={() => this.deleteLabour(item.id, item.fullName)}><i className="icon-cross2"></i>Xóa</a></li>
                                    </SecuredComponent>
                                </ul>
                            </li>
                        </ul>
                    </td>
                </tr>);
        });
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
                            <span className="text-semibold">Danh Sách Ngày Công Nhân Công</span>
                            <span className="pull-right">
                            </span>
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

                                                <br/>
                                                <br/>

                                            <br style={{ lineHeight: '100px' }} />
                                            <Field name="labourId" placeholder="Chọn Nhân Công"
                                                options={optionLabour} component={RenderSelect}
                                                onChangeAction={(labourId) => this.updateListLabourAttendanceForSupervisor(labourId)}></Field>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {this.state.isSetOuttimeModalShown ? <ModalLabourNormalAttendance title="Chấm Công" idLabourAttendance={this.state.idLabourAttendance} show={this.state.isSetOuttimeModalShown} onHide={this.handleHidemodal} /> : null}
                        {this.state.isSetOutOvertimeModalShown ? <ModalLabourOvertimeAttendance title="Chấm Công Tăng Ca" idLabourAttendance={this.state.idLabourAttendance}   show={this.state.isSetOutOvertimeModalShown} onHide={this.handleHidemodal} /> : null}
                        {this.state.isEditLabourAbsentModalShown ? <ModalSetLabourAbsent title="Ngày Vắng Mặt" idLabourAttendance={this.state.idLabourAttendance} show={this.state.isEditLabourAbsentModalShown} onHide={this.handleHidemodal} /> : null}
                        <div className="panel panel-flat">
                            <table className="table table-bordered table-hover">
                                <thead>
                                    <tr className="bg-teal">
                                        <th rowSpan="2" className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        <th rowSpan="2" data-toggle="true">Họ Tên</th>
                                        <th rowSpan="2" data-hide="phone">Dự Án Làm Việc</th>
                                        <th rowSpan="2" data-hide="phone">Ngày Làm Việc</th>
                                        <th colSpan="4" data-hide="phone"><center>Ngày Công Thường</center></th>
                                        <th colSpan="5" data-hide="phone"><center>Ngày Công Tăng Ca</center></th>
                                        <th rowSpan="2" data-hide="phone">Đi Trễ</th>
                                        <th rowSpan="2" data-hide="phone">Ghi Chú</th>
                                        <th rowSpan="2" data-hide="phone">Trạng Thái Ngày Công</th>
                                        <th rowSpan="2" className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                    </tr>
                                    <tr className="bg-teal">
                                        <th data-hide="phone">Giờ Bắt Đầu Làm</th>
                                        <th data-hide="phone">Giờ Kết Thúc Làm Việc</th>
                                        <th data-hide="phone">Giờ Nghỉ</th>
                                        <th data-hide="phone">Tổng Giờ</th>
                                        <th data-hide="phone">Trạng Thái Tăng Ca</th>
                                        <th data-hide="phone">Giờ Bắt Làm Việc</th>
                                        <th data-hide="phone">Giờ Kết Thúc Làm Việc</th>
                                        <th data-hide="phone">Giờ Nghỉ</th>
                                        <th data-hide="phone">Tổng Giờ</th>
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

        );
    }

}

export default translate('translations')(connect(mapStateToProps, mapDispatchToProps)(ListLaboutAttendanceForSupervisor));

