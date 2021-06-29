import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import qs from 'query-string';
import agent from '../../services/agent';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { RenderSelect, RenderSmallSelect } from '../../components/formInputs';
import { FormatterUtils } from '../../utils/javascriptUtils';
import moment from 'moment';
import dateFns from 'date-fns';
// import ModalWorkPlan from './ModalWorkPlan';
import CalendarPagination from './CalendarPagination';
import { PermanentCacheService } from '../../services/middleware';
const DaysInMonth = (props) => {
  const { listLabourAttendance, labourId, date } = props
  var theadAttendance =
    <th key={"dayInMonth_"}>
      {dateFns.getDay(date) == 0 ? dateFns.format(date, 'D') + ".CN" :
        dateFns.format(date, 'D') + ".T" + (dateFns.getDay(date) + 1)} </th>
  return [theadAttendance]
}

const BodyAttendance = (props) => {
  const { listLabourAttendance, date } = props;
  // const {currentUser} = this.props.location.state;
  var today = new Date();
  var groupRows = [];
  let getProjectItem = (groupAttendance, labourId) => {
    for (var i = 0; i < groupAttendance.length; i++) {
      if (groupAttendance[i].labour.id == labourId) {
        return groupAttendance[i];
      }
    }
    return null;
  }
  listLabourAttendance.map(item => {
    var labourGroup = getProjectItem(groupRows, item.labour.id)
    if (!labourGroup) {
      var groupObject = {
        labour: item.labour,
        attendanceList: [item],

      };
      groupRows.push(groupObject);
    }
    else {
      labourGroup.attendanceList.push(item);
    }
  });
  let getMatchedNormalAttendance = (attendanceList, day) => {
    for (var i =0 ; i < attendanceList.length; i++) {
      if (!attendanceList[i].overtimeStatus &&attendanceList[i].dateToWork == moment(day).format("YYYY-MM-DD")) {
        return attendanceList[i];
      }
    }
    return null
  }
  let getMatchedNormalOvertimeAttendance = (attendanceList, day) => {
    for (var i =0 ; i < attendanceList.length; i++) {
      if (attendanceList[i].overtimeStatus&& attendanceList[i].overtimeStatus=="TANG_CA_THUONG_TOI" &&attendanceList[i].dateToWork == moment(day).format("YYYY-MM-DD")) {
        return attendanceList[i];
      }
    }
    return null
  }
  let getMatchedMidnightAttendance = (attendanceList, day) => {
    for (var i =0 ; i < attendanceList.length; i++) {
      if (attendanceList[i].overtimeStatus && attendanceList[i].overtimeStatus=="TANG_CA_KHUYA" &&attendanceList[i].dateToWork == moment(day).format("YYYY-MM-DD")) {
        return attendanceList[i];
      }
    }
    return null
  }
  let getMatchedLateAttendance = (attendanceList, day) => {
    for (var i =0 ; i < attendanceList.length; i++) {
      if (attendanceList[i].lateStatus && attendanceList[i].dateToWork == moment(day).format("YYYY-MM-DD")) {
        return attendanceList[i];
      }
    }
    return null
  }
  var checkSetAttendanceLate = null;
  var currentNo = 0;
  var allAttendanceType = groupRows.map(group => {
    currentNo++;
    var normalAttendance = [<tr  key={"normalAttendance_"+ group.labour.id}>
      <td style={{position:'sticky',left:0}} className="bg-success">{currentNo}</td>
      <td style={{position:'sticky',left:44}} className="bg-success">{group.labour.fullName}</td>
      {date.map( day => {
        var matchedAttendanceDay = getMatchedNormalAttendance(group.attendanceList, day);
        if(matchedAttendanceDay) {
          //Start Check Set Attendance Late
          if(moment(matchedAttendanceDay.createdDate)> moment(matchedAttendanceDay.dateToWork)){
            checkSetAttendanceLate = {color:'red'}
          }else{
            checkSetAttendanceLate=  {color:'#1E88E5'}
          }
           // End Check Set Attendance Late
          return (<td className="success"  style={!matchedAttendanceDay.outTime?{backgroundColor:'#ffff93'}:checkSetAttendanceLate}>
           Công Ty: {matchedAttendanceDay.project.projectYear && matchedAttendanceDay.project.projectYear.company ? matchedAttendanceDay.project.projectYear.company.name:null} 
           <br/>Dự Án: {matchedAttendanceDay.project.name}
           <br/>Công Việc: {matchedAttendanceDay.projectDetail.name}
            <br/>
            Tổng Giờ: {matchedAttendanceDay.totalDatetime}</td>)
          
        }
        else {
          return <td className="success"></td>
        }
      })}
    </tr>]
     var overtimeAttendance = [<tr  key={"overtimeAttendance_"+ group.labour.id}>
      <td className="warning"  style={{position:'sticky',left:0}} ></td>
      <td  className="warning" style={{position:'sticky',left:44}}>Tăng Ca Thường</td>
      {date.map( day => {
        var matchedAttendanceDay = getMatchedNormalOvertimeAttendance(group.attendanceList, day);
        if(matchedAttendanceDay) {
          //Start Check Set Attendance Late
          if(moment(matchedAttendanceDay.createdDate) > moment(matchedAttendanceDay.dateToWork)){
            checkSetAttendanceLate = {color:'red'}
          }else{
            checkSetAttendanceLate=  {color:'#1E88E5'}
          }
          // End Check Set Attendance Late
          return <td   style={!matchedAttendanceDay.outTime?{backgroundColor:'#ffff93'}:checkSetAttendanceLate}> 
           Công Ty: {matchedAttendanceDay.project.projectYear && matchedAttendanceDay.project.projectYear.company ? matchedAttendanceDay.project.projectYear.company.name:null} 
           <br/>Dự Án: {matchedAttendanceDay.project.name}
           <br/>Công Việc: {matchedAttendanceDay.projectDetail.name}
          <br/>
            Tổng Giờ: {matchedAttendanceDay.totalOvertime} </td>
          
        } else {
          return <td  ></td>
        }
      })}
    </tr>]
     var midnightAttendance = [<tr  key={"midnightAttendance_"+ group.labour.id}>
     <td className="warning"  style={{position:'sticky',left:0}} ></td>
     <td className="warning"  style={{position:'sticky',left:44}}>Tăng Ca Khuya</td>
     {date.map( day => {
       var matchedAttendanceDay = getMatchedMidnightAttendance(group.attendanceList, day);
       if(matchedAttendanceDay) {
         //Start Check Set Attendance Late
         if(moment(matchedAttendanceDay.createdDate) > moment(matchedAttendanceDay.dateToWork)){
           checkSetAttendanceLate = {color:'red'}
         }else{
           checkSetAttendanceLate=  {color:'#1E88E5'}
         }
         // End Check Set Attendance Late
         return <td   style={!matchedAttendanceDay.outTime?{backgroundColor:'#ffff93'}:checkSetAttendanceLate}> 
          Công Ty: {matchedAttendanceDay.project.projectYear && matchedAttendanceDay.project.projectYear.company ? matchedAttendanceDay.project.projectYear.company.name:null} 
          <br/>Dự Án: {matchedAttendanceDay.project.name}
          <br/>Công Việc: {matchedAttendanceDay.projectDetail.name}
         <br/>
           Tổng Giờ: {matchedAttendanceDay.totalOvertime} </td>
         
       } else {
         return <td  ></td>
       }
     })}
   </tr>]
    var numberColSpan = 0
    var lateAttendance = [<tr key={"lateAttendance_"+group.labour.id}>
      <td className="warning"  style={{position:'sticky',left:0}}></td>
      <td className="warning"  style={{position:'sticky',left:44}}>Đi Trể</td>
      {date.map( day => {
        numberColSpan++
        var matchedAttendanceDay = getMatchedLateAttendance(group.attendanceList, day);
        if(matchedAttendanceDay) {
          //Start Check Set Attendance Late
          if(moment(matchedAttendanceDay.createdDate) > moment(matchedAttendanceDay.dateToWork)){
            checkSetAttendanceLate = {color:'red'}
          }else{
            checkSetAttendanceLate=  {color:'#1E88E5'}
          }
          // End Check Set Attendance Late
          return <td style={!matchedAttendanceDay.outTime?{backgroundColor:'#ffff93'}:checkSetAttendanceLate}> {matchedAttendanceDay.lateStatus=="CO"? "CÓ" : null}</td>
        } else {
          return <td></td>
        }
      })}
    </tr>,
    // Set end tr color
    <tr className="alpha-slate">
    <td></td>
    <td></td>
       <td colSpan={numberColSpan}></td>
    </tr>]
    return [normalAttendance,overtimeAttendance,midnightAttendance,lateAttendance]
  })

  return [allAttendanceType]
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
const validate = values => {
  const errors = {};
  return errors;
};


const selector = formValueSelector('AttendanceGeneralScreen');

const mapStateToProps = state => {
  return {
    labourId: selector(state, "labourId"),
  };
};

const mapDispatchToProps = dispatch => ({
  updateField: (fieldName, value) =>
    dispatch({
      meta: { form: "AttendanceGeneralScreen", field: fieldName },
      payload: value,
      type: "@@redux-form/CHANGE"
    }),
});

class AttendanceGeneralScreen extends React.Component {

  constructor() {
    super()

    let initialDate = new Date()
    initialDate = PermanentCacheService.getItem("selected_month") ? new Date(PermanentCacheService.getItem("selected_month")) : dateFns.setDate(initialDate, 1)

    this.state = {
      currentDate: initialDate,
      isWPModalShown: false,
      currentWorkPlan: null,
      listLabourAttendance: [],
      currentPage: 1,
      numberOfPage: 1,
      listAllLabour: []
    }

    this.prev = () => {
      const prev = dateFns.subMonths(this.state.currentDate, 1)
      PermanentCacheService.setItem("selected_month", prev);
      this.setState({ currentDate: prev }, () => {
        this.updateCalendar(this.state.labourId);
      })
    }

    this.next = () => {
      const next = dateFns.addMonths(this.state.currentDate, 1)
      PermanentCacheService.setItem("selected_month", next);
      this.setState({ currentDate: next }, () => {
        this.updateCalendar(this.state.labourId);
      })
    }

    this.today = () => {
      let today = new Date()
      today = dateFns.setDate(today, 1)
      PermanentCacheService.setItem("selected_month", today);
      this.setState({ currentDate: today }, () => {
        this.updateCalendar(this.state.labourId);
      })
    }

    this.goToPage = (page) => {
      this.setState({ currentPage: page });
    }
  }

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

  updateCalendar(labourId, currentPage) {
    const currentDate = this.state.currentDate;
    var startDateOfMonth = moment(dateFns.startOfMonth(currentDate)).format("YYYY-MM-DD-HH:mm:ss");
    var endDateOfMonth = moment(dateFns.lastDayOfMonth(currentDate)).format("YYYY-MM-DD-HH:mm:ss");
    if(!labourId){
      return null;
    }
    if (labourId && labourId == "ALL") {
      let setStateInRequest = (list) => {
        this.setState({ labourId: labourId, listLabourAttendance: [] });
        this.setState({ listLabourAttendance: list });
      }
      return (agent.asyncRequests.get('/labourAttendance/findByDateToWork?dateToWorkStart=' + startDateOfMonth +
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
    } else if(labourId) {
      this.setState({ labourId: labourId, listLabourAttendance: [] });
      let setStateInRequest = (list) => {
        this.setState({ listLabourAttendance: list });
      }
      return (agent.asyncRequests.get('/labourAttendance/findByLabourId?labourId=' +
        labourId + "&dateToWorkStart=" + startDateOfMonth +
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

  componentWillMount() {
    const { updateField, labourId } = this.props;
    // try get from property, if not exist, try from query param
    var paramLabourId = qs.parse(this.props.location.search).labourId;
    if (paramLabourId) {
      updateField("labourId", paramLabourId);
      this.updateCalendar(paramLabourId);
    } else if (labourId) {
      this.updateCalendar(labourId);
    }
    else if (!labourId) {
      this.updateCalendar("ALL");
    }
    return (
      this.getListLabour()
    )
  }


  render() {
    const firstOfTheWeek = this.state.currentDate;
    const labourId = this.props;
    const currentDate = new Date(this.state.currentDate.getTime());
    const currentMonth = moment(currentDate).month() + 1;
    const currentYear = moment(currentDate).year();
    var itemsPerPage = 4;
    var startColumn = (this.state.currentPage - 1) * itemsPerPage;
    var endColumn = this.state.currentPage * itemsPerPage;
    // pagination for contractItems
    var listLabourAttendance = this.state.listLabourAttendance;
    const date = this.props;
    if (!listLabourAttendance){
      return null;
    }

    const dataLabour = this.state.listAllLabour;
    const calendarDays = [];
    const body = [];
    let dateIncrement = new Date(firstOfTheWeek.getTime());
    var numberOfDays = moment(currentDate).daysInMonth()
    let inc = 0;
    var dateArray = [];
    while (inc < numberOfDays) {

      calendarDays.push(<DaysInMonth
        date={dateIncrement}
        currentDate={currentDate}
        listLabourAttendance={listLabourAttendance}
        labourId={this.state.labourId}
        
        key={inc}></DaysInMonth>)
      dateArray.push(dateIncrement);

      inc += 1
      dateIncrement = dateFns.addDays(dateIncrement, 1)

    }
    if (labourId) {
      body.push(<BodyAttendance
        key={"_BodyAttendance"}
        date={dateArray}
        eachDate={dateIncrement}
        currentDate={currentDate}
        listLabourAttendance={listLabourAttendance}
        labourId={this.state.labourId}
        ></BodyAttendance>)
    }
    const wrapperStyle = {
      height: '100%',
      width: '100%'
    }

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
              <span className="text-semibold">Quản Lý Ngày Công</span>
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
                                                <br/>

                                            <br style={{ lineHeight: '100px' }} />

                      <div>

                        <Field name="labourId" placeholder="Chọn Nhân Công"
                          options={optionLabour} component={RenderSelect}
                          onChangeAction={(labourId) => this.updateCalendar(labourId)}></Field>
                      </div>
                    </div>
                    
                    <div className="pull-left">
                       <span>* Màu vàng nền thể hiện ngày công chưa có giờ về</span>
                       <br/>
                       <span>* Màu đỏ thể hiện ngày công được chấm muộn</span>
                       <br/>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ overflowX: 'auto' }} className="panel panel-flat">
                <table style={{whiteSpace: 'nowrap'}} className="table table-bordered">
                  <thead>
                    <tr >
                      <th className="bg-success"  style={{ position: 'sticky' ,left:0}} rowSpan={2}>STT</th>
                      <th className="bg-success"  style={{ position: 'sticky', left:44}} rowSpan={2}>Tên Nhân Công</th>
                      <th colSpan={numberOfDays}><center>Ngày Trong Tháng</center></th>
                    </tr>
                    <tr>
                      {calendarDays}
                    </tr>
                  </thead>
                  <tbody>
                    {body}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </div>




    )
  }
}


export default translate('translations')(connect(
  mapStateToProps, mapDispatchToProps)(
    reduxForm({
      form: 'AttendanceGeneralScreen',
      destroyOnUnmount: false,
      enableReinitialize: true,
      validate
    })(AttendanceGeneralScreen)));