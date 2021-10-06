import dateFns from 'date-fns';
import moment from 'moment';
import React from 'react';
import { translate } from 'react-i18next';
import { toast } from 'react-toastify';
import { PermanentCacheService } from '../../services/middleware';
import ModalCalendarType from './ModalCalendarType';
import agent from '../../services/agent';
import ModalCalendarBooking from './ModalCalendarBooking';
import { ScriptUtils } from '../../utils/javascriptUtils';
import { Field } from 'redux-form';
import { RenderSelect } from '../../components/formInputs';

const CalendarHeader = (props) => {
    return (
        <div>
            <div className="col-md-12" style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ paddingRight: 25 }} className="btn-group">
                    <button type="button" className="btn btn-primary" onClick={props.prev}>&lt;</button>
                    <button type="button" className="btn btn-primary" onClick={props.today}>Tháng Hiện Tại</button>
                    <button type="button" className="btn btn-primary" onClick={props.next}>&gt;</button>
                </div>
                <h4>Tháng {dateFns.format(props.currentDate, 'MM / YYYY')}</h4>
                <div style={{ flexBasis: '25%', marginBottom: '-20px', marginLeft: 150 }} className="row">
                    <div className="col-md-3">
                        <label className="control-label" htmlFor="company">Nhân Viên</label>
                    </div>
                    <div className="col-md-9">
                        <Field onChangeAction={(value) => props.setFilterCalendarBooking(value)} options={props.optionEmployee} placeholder="Tất cả" component={RenderSelect} name="userId"></Field>
                    </div>
                </div>
            </div>
        </div>
    )
}

const CalendarWeekBody = (props) => {
    const { currentDate, dataCalendarBooking, handleShowModalCalendarBooking, t } = props;
    const firstDayOfMonth = moment(currentDate).startOf('month').day() == 0 ? 1 : moment(currentDate).startOf('month').day();
    const lastDayOfMonth = moment(currentDate).endOf('month').day() == 0 ? 7 : moment(currentDate).endOf('month').day();
    const totalDayOfMonth = moment().daysInMonth();
    var rows = ((totalDayOfMonth == 30 && firstDayOfMonth > 5) || (totalDayOfMonth == 31 && firstDayOfMonth == 4)) ? 5 : 4;
    var renderMonthBody = [];
    var index = 1;
    for (let i = 0; i <= rows; i++) {
        if (i === 0) {
            let renderWeekBody = [];
            for (let j = 1; j < firstDayOfMonth; j++) {
                let bookingInRow = [];
                bookingInRow.push(<div key={`booking-row${i}${j}`} style={{ marginTop: "auto", zIndex: 0 }}></div>)
                renderWeekBody.push([<td key={`${i}${j}`} style={{ flexDirection: "column", textAlign: "center", height: "100%", maxWidth: 100, verticalAlign: 'baseline' }} >{bookingInRow}</td>])
            }
            for (let j = firstDayOfMonth; j < 8; j++) {
                let currentDateInRow = moment(currentDate).date(index).format('DD');
                let bookingInRow = [];
                let currentDateRow = moment(currentDate).date(index);
                bookingInRow.push(<div key={`booking-row${i}${j}`} style={{ marginTop: "auto", zIndex: 0 }}><button className="btn" style={{ border: "1px solid" }} onClick={() => handleShowModalCalendarBooking(null, currentDateRow)}>+</button> </div>)
                dataCalendarBooking.map(item => {
                    let dayOfStartDateItem = moment(item.startDate).format('DD');
                    if (dayOfStartDateItem == currentDateInRow) {
                        bookingInRow.push(<div key={item.id} style={{ backgroundColor: item.calenderType.color, textAlign: 'left', padding: 5, margin: 5, borderRadius: 5, textAlign: 'center', display: 'flex', alignItems: 'center' }} onClick={() => handleShowModalCalendarBooking(item.id)}>
                            <span style={{ display: 'inline-block', width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', cursor: 'pointer' }}>{item.title}</span> <br />
                        </div>);
                    }
                })
                renderWeekBody.push([<td key={`${i}${j}`} style={{ flexDirection: "column", textAlign: "center", height: "100%", maxWidth: 100, verticalAlign: 'baseline' }} ><span className="pull-right">{currentDateRow.format("DD")}</span><br />{bookingInRow}</td>])
                ++index;
            }
            renderMonthBody.push(<tr key={i}>{renderWeekBody}</tr>)
        }
        else if (i === rows) {
            let renderWeekBody = [];
            for (let j = 0; j < lastDayOfMonth; j++) {
                let currentDateInRow = moment(currentDate).date(index).format('DD');
                let bookingInRow = [];
                let currentDateRow = moment(currentDate).date(index);
                bookingInRow.push(<div key={`booking-row${i}${j}`} style={{ marginTop: "auto", zIndex: 0 }}><button className="btn" style={{ border: "1px solid" }} onClick={() => handleShowModalCalendarBooking(null, currentDateRow)}>+</button> </div>)
                dataCalendarBooking.map(item => {
                    let dayOfStartDateItem = moment(item.startDate).format('DD');
                    if (dayOfStartDateItem == currentDateInRow) {
                        bookingInRow.push(<div key={item.id} style={{ backgroundColor: item.calenderType.color, textAlign: 'left', padding: 5, margin: 5, borderRadius: 5, textAlign: 'center', overflow: 'hidden' }} onClick={() => handleShowModalCalendarBooking(item.id)}>
                            <span style={{ width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', cursor: 'pointer', color: '#fff' }}>{item.title}</span> <br />
                        </div>);
                    }
                })
                renderWeekBody.push([<td width="14%" key={`${i}${j}`} style={{ flexDirection: "column", textAlign: "center", height: "100%", maxWidth: 100, verticalAlign: 'baseline' }} ><span className="pull-right">{currentDateRow.format("DD")}</span><br />{bookingInRow}</td>])
                ++index;
            }
            for (let j = lastDayOfMonth; j < 7; j++) {
                let bookingInRow = [];
                bookingInRow.push(<div key={`booking-row${i}${j}`} style={{ marginTop: "auto", zIndex: 0 }}></div>)
                renderWeekBody.push([<td key={`${i}${j}`} style={{ flexDirection: "column", textAlign: "center", height: "100%", maxWidth: 100, verticalAlign: 'baseline' }} >{bookingInRow}</td>])
            }
            renderMonthBody.push(<tr key={i}>{renderWeekBody}</tr>)
        } else {
            let renderWeekBody = [];
            for (let j = 1; j < 8; j++) {
                let currentDateInRow = moment(currentDate).date(index).format('DD');
                let bookingInRow = [];
                let currentDateRow = moment(currentDate).date(index);
                bookingInRow.push(<div key={`booking-row${i}${j}`} style={{ marginTop: "auto", zIndex: 0 }}><button className="btn" style={{ border: "1px solid" }} onClick={() => handleShowModalCalendarBooking(null, currentDateRow)}>+</button> </div>)
                dataCalendarBooking.map(item => {
                    let dayOfStartDateItem = moment(item.startDate).format('DD');
                    if (dayOfStartDateItem == currentDateInRow) {
                        bookingInRow.push(<div key={item.id} style={{ backgroundColor: item.calenderType.color, textAlign: 'left', padding: 5, margin: 5, borderRadius: 5, textAlign: 'center', overflow: 'hidden' }} onClick={() => handleShowModalCalendarBooking(item.id)}>
                            <span style={{ width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', cursor: 'pointer', color: '#fff' }}>{item.title}</span> <br />
                        </div>);
                    }
                })
                renderWeekBody.push([<td key={`${i}${j}`} style={{ flexDirection: "column", textAlign: "center", height: "100%", maxWidth: 100, verticalAlign: 'baseline' }} ><span className="pull-right">{currentDateRow.format("DD")}</span><br />{bookingInRow}</td>])
                ++index;
            }
            renderMonthBody.push(<tr key={i}>{renderWeekBody}</tr>)
        }

    }
    return [renderMonthBody];
}

class CalendarPage extends React.Component {
    constructor(props) {
        super(props);
        let initialUserId = 'All'
        this.state = {
            currentDate: new Date(),
            currentWeek: 1,
            isShowModalCalendarType: false,
            idCalendarType: null,
            listAllCalendarType: [],
            listAllCalendarBooking: [],
            isShowModalCalendarBooking: false,
            idCalendarBooking: null,
            currentDateRow: null,
            listEmployee: [],
            userId: initialUserId
        }
        this.handleShowModalAddCalendarType = this.handleShowModalAddCalendarType.bind(this);
        this.handleShowModalCalendarBooking = this.handleShowModalCalendarBooking.bind(this);
        this.handleHileModal = () => {
            this.setState({
                isShowModalCalendarType: false,
                isShowModalCalendarBooking: false
            })
            this.getAllCalendar();
            this.getAllCalendarBooking();
        }
        this.preWeek = () => {
            var weekSelection = this.state.weekSelection - 1;
            PermanentCacheService.setItem("selected_week", weekSelection);
            this.setState({
                weekSelection: weekSelection,
                currentWeek: 1,
            }, () => {
                // this.updateEmployeeAttendance(this.state.userId);

            })
        }
        this.nextWeek = () => {
            var weekSelection = this.state.weekSelection + 1;
            PermanentCacheService.setItem("selected_week", weekSelection);
            this.setState({
                weekSelection: weekSelection,
                currentWeek: 1,
            }, () => {
                // this.updateEmployeeAttendance(this.state.userId);
            })
        }
        this.preMonth = () => {
            const prev = dateFns.subMonths(this.state.currentDate, 1);
            const weekSelection = moment(prev).week();
            PermanentCacheService.setItem("selected_month", prev);
            PermanentCacheService.setItem("selected_week", weekSelection);
            this.setState({
                currentDate: prev,
                weekSelection: weekSelection,
                currentWeek: 1,
            }, () => {
                // this.updateEmployeeAttendance(this.state.userId);
                this.getAllCalendarBooking();
            })
        }

        this.nextMonth = () => {
            const next = dateFns.addMonths(this.state.currentDate, 1)
            const weekSelection = moment(next).week();
            PermanentCacheService.setItem("selected_month", next);
            PermanentCacheService.setItem("selected_week", weekSelection);
            this.setState({
                currentDate: next,
                weekSelection: weekSelection,
                currentWeek: 1,
            }, () => {
                // this.updateEmployeeAttendance(this.state.userId);
                this.getAllCalendarBooking();
            })
        }

        this.today = () => {
            let today = new Date()
            today = dateFns.setDate(today, 1)
            PermanentCacheService.setItem("selected_month", today);
            this.setState({ currentDate: today }, () => {
                // this.updateEmployeeAttendance(this.state.userId);
                this.getAllCalendarBooking();
            })
        }
        this.setFilterCalendarBooking = (userIdValue) => {
            this.setState({
                userId: userIdValue !== "All" ? userIdValue : "All",
            }, () => this.getAllCalendarBooking());
        };
    };

    getAllCalendar() {
        let setStateInRequest = (list) => { this.setState({ listAllCalendarType: list }) }
        return agent.asyncRequests.get("/calendarType/listAll").then(function (res) {
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

    getAllCalendarBooking() {
        const { userId } = this.state;
        const currentDate = new Date(this.state.currentDate.getTime());
        let setStateInRequest = (list) => { this.setState({ listAllCalendarBooking: list }) }
        return agent.asyncRequests.get("/calendarBooking/listAllAndGroup?userId=" + userId + "&startDate=" + moment(currentDate).format("YYYY-MM-DD-HH:mm:ss")).then(function (res) {
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
    getAllEmployee() {
        let setStateInRequest = (list) => { this.setState({ listEmployee: list }) }
        return agent.asyncRequests.get("/user/listAll").then(function (res) {
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
        this.getAllCalendar();
        this.getAllCalendarBooking();
        this.getAllEmployee();
    };
    componentDidUpdate() {
        ScriptUtils.loadFootable();
        ScriptUtils.loadFormLayout();
    }

    handleChangWeek(typeAcction) {
        let numberWeek = this.state.currentWeek;
        if (typeAcction == 'prev') {
            numberWeek--;
        }
        if (typeAcction == 'next') {
            numberWeek++;
        }
        this.setState({
            currentWeek: numberWeek
        })
    }
    handleShowModalAddCalendarType(id) {
        this.setState({
            isShowModalCalendarType: true,
            idCalendarType: id
        })
    }
    handleShowModalCalendarBooking(id, date) {
        this.setState({
            isShowModalCalendarBooking: true,
            idCalendarBooking: id, currentDateRow: date
        })
    }
    render() {
        let numberCurrentWeek = this.state.currentWeek;
        let dataCalendarType = this.state.listAllCalendarType;
        let dataCalendarBooking = this.state.listAllCalendarBooking;

        const dataEmployee = this.state.listEmployee;
        if (!dataEmployee) {
            return <LoadingScreen></LoadingScreen>;
        }
        var optionEmployee = [{ label: "Tất Cả", value: "All" }];
        dataEmployee.map(item => {
            optionEmployee.push({ label: item.fullName, value: item.id })
        })

        const currentDate = new Date(this.state.currentDate.getTime());
        const wrapperStyle = {
            height: '100%',
            width: '50%'
        }
        const { t } = this.props;
        const dayOfMonth = moment(currentDate).daysInMonth();
        var renderCalendarType = null;
        var rowBody = null;
        if (dataCalendarType.length > 0) {
            renderCalendarType = dataCalendarType.map(item => {
                return <div key={item.id} style={{ paddingRight: 35 }}><div style={{ backgroundColor: item.color, width: 10, height: 10, display: 'inline-block' }}></div> <button onClick={() => this.handleShowModalAddCalendarType(item.id)}> {item.name} </button>    </div>
            })
            rowBody = dataCalendarType.map((item, index) => {
                return <tr key={"listAllCalendarType_" + item.id} style={{ minHeight: 50 }}>
                    <td style={{ width: 10 }}> </td>
                    <CalendarWeekBody
                        currentDate={currentDate}
                        numberWeek={numberCurrentWeek}
                        indexRow={index}
                        idCalendarTypeGroup={item.id}
                        dataCalendarBooking={dataCalendarBooking}
                        handleShowModalCalendarBooking={this.handleShowModalCalendarBooking}
                        t={t}
                    />
                    <td></td>
                </tr>
            })
        }

        return (
            <div className="content-wrapper">
                <div className="page-header page-header-default">
                <div className="breadcrumb-line">
                    <ul className="breadcrumb">
                        <li><a href=""><i className="icon-home2 position-left"></i> Home</a> </li>
                        <li className="active">Thông Tin - Hành Chính</li>
                        <li className="active">Lịch Hẹn</li>
                    </ul>
                </div>
                </div>
                <div className="content">
                    <div className="page-header">
                    </div>
                    <div className="page-body">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="panel panel-body" style={{ margin: 0, padding: 10 }}>
                                    <div className="col-md-12">
                                        <span style={wrapperStyle}>
                                            <CalendarHeader
                                                currentDate={currentDate}
                                                next={this.nextMonth}
                                                prev={this.preMonth}
                                                today={this.today}
                                                setFilterCalendarBooking={this.setFilterCalendarBooking}
                                                optionEmployee={optionEmployee} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="panel panel-body">
                                    <table style={{ whiteSpace: 'nowrap', backgroundColor: 'white' }} className="table  table-bordered">
                                        <thead>
                                            <tr>
                                                <th width="14%" className="bg-teal">T2</th>
                                                <th className="bg-teal">T3</th>
                                                <th className="bg-teal">T4</th>
                                                <th className="bg-teal">T5</th>
                                                <th className="bg-teal">T6</th>
                                                <th className="bg-teal">T7</th>
                                                <th className="bg-teal">CN</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <CalendarWeekBody
                                                currentDate={currentDate}
                                                numberWeek={numberCurrentWeek}
                                                dataCalendarBooking={dataCalendarBooking}
                                                handleShowModalCalendarBooking={this.handleShowModalCalendarBooking}
                                                t={t}
                                            />
                                        </tbody>
                                        <tfoot>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.state.isShowModalCalendarType ? <ModalCalendarType title="Loại Lịch" idCalendarType={this.state.idCalendarType} show={this.state.isShowModalCalendarType} onHide={this.handleHileModal} /> : null}
                    {this.state.isShowModalCalendarBooking ? <ModalCalendarBooking currentDateRow={this.state.currentDateRow} title="Nội Dung Lịch" idCalendarBooking={this.state.idCalendarBooking} show={this.state.isShowModalCalendarBooking} onHide={this.handleHileModal} /> : null}

                </div>
            </div>
        );
    }
}

export default translate('translations')(CalendarPage);