import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm, formValueSelector } from "redux-form";
import qs from "query-string";
import agent from "../../services/agent";
import { toast } from "react-toastify";
import { translate } from "react-i18next";
import { RenderSelect, RenderSwitch } from "../../components/formInputs";
import { SecurityUtils, ScriptUtils } from "../../utils/javascriptUtils";
import moment from "moment";
import dateFns from "date-fns";
import { PermanentCacheService } from "../../services/middleware";
import { LoadingScreen, ModalLoading } from "../../components/commonWidgets";
import ModalEmployeeAttendance from "./ModalEmployeeAttendance";
import SecuredComponent from "../../components/SecuredComponent";
import ModalLeaveLetter from "../leaveLetter/ModalLeaveLetter";
const validate = (values) => {
  const errors = {};
  return errors;
};

const selector = formValueSelector("EmployeeAttendanceList");

const mapStateToProps = (state) => {
  return {
    currentUser: state.common.currentUser,
    userId: selector(state, "userId"),
    isEmployeeActive: selector(state, "isEmployeeActive"),
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateField: (fieldName, value) =>
    dispatch({
      meta: {
        form: "EmployeeAttendanceList",
        field: fieldName,
      },
      payload: value,
      type: "@@redux-form/CHANGE",
    }),
});
const DaysInMonth = (props) => {
  const { listEmployeeAttendance, userId, date } = props;

  var theadAttendance = (
    <th key={"dayInMonth_"}>
      {" "}
      {dateFns.getDay(date) == 0 ? (
        <span>
          <center>
            {" "}
            {dateFns.format(date, "D")} <br /> {"CN"}{" "}
          </center>{" "}
        </span>
      ) : (
        <span>
          <center>
            {" "}
            {dateFns.format(date, "D")} <br />{" "}
            {"T" + (dateFns.getDay(date) + 1)}{" "}
          </center>{" "}
        </span>
      )}{" "}
    </th>
  );
  return [theadAttendance];
};

const BodyAttendance = (props) => {
  const {
    list,
    userId,
    isEmployeeActive,
    listEmployeeAttendance,
    listEmployee,
    date,
    handleShowModalEditAttendance,
    handleShowModalAddAttendance,
    handleDeleteAttendance,
    currentUser,
  } = props;

  var today = new Date();
  var firstDayOfCurrentMonth = moment(dateFns.startOfMonth(today));
  var weekdays = new Array(
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  );
  let getMatchedAttendance = (attendanceList, day, userId) => {
    var listAttendanceByDay = [];
    for (var i = 0; i < attendanceList.length; i++) {
      if (
        userId == attendanceList[i].user.id &&
        attendanceList[i].dateToWork == moment(day).format("YYYY-MM-DD")
      ) {
        listAttendanceByDay.push(attendanceList[i]);
      }
    }
    return listAttendanceByDay;
  };
  var dataEmployee = [];
  listEmployee.map((item) => {
    if (
      SecurityUtils.hasPermission(
        currentUser,
        "admin.employeeAttendance.readAllEmployeeAttendance"
      )
    ) {
      if (item.id == userId) {
        dataEmployee.push(item);
      } else if (userId == "ALL") {
        if (item.active == isEmployeeActive) {
          dataEmployee.push(item);
        }
      }
    } else if (item.id == currentUser.id) {
      dataEmployee.push(item);
    }
  });
  var groupRows = [];
  let getCompanyGroup = (groupDetails, company) => {
    for (var i = 0; i < groupDetails.length; i++) {
      if (groupDetails[i].company.id == company) {
        return groupDetails[i];
      }
    }
    return null;
  };
  if (dataEmployee) {
    dataEmployee.map((item) => {
      var companyGroup = getCompanyGroup(groupRows, item.company.id);
      if (!companyGroup) {
        var groupObject = {
          company: item.company,
          listEmployee: [item],
        };
        groupRows.push(groupObject);
      } else {
        companyGroup.listEmployee.push(item);
      }
    });
  }

  var currentNo = 0;
  var employeeCompanyGroup = groupRows.map((group) => {
    var employeeRows = group.listEmployee.map((item) => {
      currentNo++;
      return (
        <tr key={"employeeKey_" + item.id}>
          <td
            className="warning"
            style={{
              position: "sticky",
              left: 0,
            }}
          >
            {" "}
            {currentNo}{" "}
          </td>{" "}
          <td
            className="warning"
            style={{
              position: "sticky",
              left: 38,
            }}
          >
            <center>
              {" "}
              {item.fullName} <br />
              <sub>
                {" "}
                {item.department && item.department.workOnWeekendStatus != null
                  ? item.department.workOnWeekendStatus == "CO"
                    ? "Làm nguyên ngày T7"
                    : null
                  : "Chưa Xác Định Ngày Làm Việc"}{" "}
              </sub>{" "}
            </center>{" "}
          </td>{" "}
          {date.map((day) => {
            if (listEmployeeAttendance) {
              var lastDayOfValueMonth = moment(dateFns.lastDayOfMonth(day));
              var listMatchedAttendanceDay = getMatchedAttendance(
                listEmployeeAttendance,
                day,
                item.id
              );
              if (listMatchedAttendanceDay) {
                if (moment(day).diff(today, "days", true) > 0) {
                  return (
                    <td
                      key={"Day_" + day}
                      style={{
                        minWidth: "180px",
                      }}
                      className="bg-grey-300"
                    ></td>
                  );
                } else if (
                  !SecurityUtils.hasPermission(
                    currentUser,
                    "admin.employeeAttendance.allowSetAtterndanceAfter10Days"
                  ) &&
                  (moment(today).add(-1, "month") >
                    moment(dateFns.lastDayOfMonth(day)) ||
                    moment(today).format("DD") >= "11") &&
                  firstDayOfCurrentMonth > lastDayOfValueMonth
                ) {
                  return (
                    <td
                      key={"Day_" + day}
                      style={{
                        minWidth: "180px",
                        padding: "25px 25px 25px 25px",
                      }}
                      className="bg-grey-300"
                    >
                      <center>
                        {" "}
                        {listMatchedAttendanceDay.map(
                          (matchedAttendanceDay) => {
                            return [
                              <div
                                key={"Day_MatchAttendance" + day}
                                style={{
                                  padding: "0px 5px",
                                  border: "1px solid black",
                                  borderRadius: "5px",
                                }}
                              >
                                <span
                                  style={
                                    matchedAttendanceDay.status == "VANG_MAT"
                                      ? {
                                        color: "red",
                                      }
                                      : null
                                  }
                                >
                                  {matchedAttendanceDay.attendanceType} -{" "}
                                  {matchedAttendanceDay.workPlace}{" "}
                                  {matchedAttendanceDay.overtimeType ? (
                                    <br />
                                  ) : null}{" "}
                                  {/* Check <br> for overtimeType*/}{" "}
                                  {matchedAttendanceDay.overtimeType}{" "}
                                </span>{" "}
                                <br />
                              </div>,
                              <div
                                style={{
                                  paddingBottom: "5px",
                                }}
                              >
                                {" "}
                              </div>,
                            ];
                          }
                        )}{" "}
                      </center>{" "}
                    </td>
                  );
                } else if (
                  SecurityUtils.hasPermission(
                    currentUser,
                    "admin.employeeAttendance.allowSetAtterndanceAfter10Days"
                  )
                ) {
                  return (
                    <td
                      key={"Day_" + day}
                      style={{
                        minWidth: "180px",
                        padding: "25px 25px 25px 25px",
                      }}
                      onDoubleClick={() =>
                        handleShowModalAddAttendance(
                          day,
                          item,
                          listMatchedAttendanceDay
                        )
                      }
                      className={
                        weekdays[moment(day).day()] == "Sunday" ||
                          weekdays[moment(day).day()] == "Saturday"
                          ? "danger"
                          : "success"
                      }
                    >
                      <center>
                        {" "}
                        {listMatchedAttendanceDay.map(
                          (matchedAttendanceDay) => {
                            return [
                              <div
                                key={"Day_MatchAttendance" + day}
                                style={{
                                  padding: "0px 5px",
                                  border: "1px solid blue",
                                  borderRadius: "5px",
                                }}
                              >
                                <a
                                  style={
                                    matchedAttendanceDay.status == "VANG_MAT"
                                      ? {
                                        color: "red",
                                      }
                                      : null
                                  }
                                  onClick={() =>
                                    handleShowModalEditAttendance(
                                      matchedAttendanceDay.id,
                                      item,
                                      listMatchedAttendanceDay
                                    )
                                  }
                                >
                                  {matchedAttendanceDay.attendanceType} -{" "}
                                  {matchedAttendanceDay.workPlace}{" "}
                                  {matchedAttendanceDay.overtimeType ? (
                                    <br />
                                  ) : null}{" "}
                                  {/* Check <br> for overtimeType*/}{" "}
                                  {matchedAttendanceDay.overtimeType}{" "}
                                </a>

                                <br />
                              </div>,
                              <div
                                style={{
                                  paddingBottom: "5px",
                                }}
                              >
                                {" "}
                              </div>,
                            ];
                          }
                        )}{" "}
                      </center>{" "}
                    </td>
                  );
                } else {
                  return [
                    <td
                      key={"Day_" + day}
                      style={{
                        minWidth: "180px",
                        padding: "25px 25px 25px 25px",
                      }}
                      onDoubleClick={() =>
                        handleShowModalAddAttendance(
                          day,
                          item,
                          listMatchedAttendanceDay
                        )
                      }
                      className={
                        weekdays[moment(day).day()] == "Sunday" ||
                          weekdays[moment(day).day()] == "Saturday"
                          ? "danger"
                          : "success"
                      }
                    >
                      <center>
                        {" "}
                        {listMatchedAttendanceDay.map(
                          (matchedAttendanceDay) => {
                            return [
                              <div
                                key={"Day_MatchAttendance" + day}
                                style={{
                                  padding: "0px 5px",
                                  border: "1px solid blue",
                                  borderRadius: "5px",
                                }}
                              >
                                <a
                                  style={
                                    matchedAttendanceDay.status == "VANG_MAT"
                                      ? {
                                        color: "red",
                                      }
                                      : null
                                  }
                                  onClick={() =>
                                    handleShowModalEditAttendance(
                                      matchedAttendanceDay.id,
                                      item,
                                      listMatchedAttendanceDay
                                    )
                                  }
                                >
                                  {matchedAttendanceDay.attendanceType} -{" "}
                                  {matchedAttendanceDay.workPlace}{" "}
                                  {matchedAttendanceDay.overtimeType ? (
                                    <br />
                                  ) : null}{" "}
                                  {matchedAttendanceDay.overtimeType}{" "}
                                </a>{" "}
                              </div>,
                              <div
                                style={{
                                  paddingBottom: "5px",
                                }}
                              >
                                {" "}
                              </div>,
                            ];
                          }
                        )}{" "}
                      </center>{" "}
                    </td>,
                  ];
                }
              }
            }
          })}{" "}
        </tr>
      );
    });
    return [
      <tr key={"CompanyKey_" + group.company.id}>
        <td
          className="bg-grey-300"
          style={{
            position: "sticky",
            left: 0,
          }}
        ></td>{" "}
        <td
          className="bg-grey-300"
          style={{
            position: "sticky",
            left: 38,
          }}
        >
          <center>
            {" "}
            {group.company.code} - {group.company.name}{" "}
          </center>{" "}
        </td>{" "}
        <td className="alpha-slate" colSpan={date.length + 11}>
          {" "}
        </td>{" "}
      </tr>,
    ].concat(employeeRows);
  });

  return [employeeCompanyGroup];
};

const CalendarHeader = (props) => {
  return (
    <div>
      <div className="col-md-3">
        <br />
        <div className="btn-group">
          <button type="button" className="btn btn-primary" onClick={props.prev}>
            &lt;{" "}
          </button>{" "}
          <button
            type="button"
            className="btn btn-primary"
            onClick={props.today}
          >
            Tháng Hiện Tại{" "}
          </button>{" "}
          <button
            type="button"
            className="btn btn-primary"
            onClick={props.next}
          >
            &gt;{" "}
          </button>{" "}
        </div>{" "}
        <h3> Tháng {dateFns.format(props.currentDate, "MM / YYYY")} </h3>{" "}
      </div>{" "}
    </div>
  );
};

class EmployeeAttendanceList extends React.Component {
  constructor() {
    super();
    let initialDate = new Date();
    initialDate = PermanentCacheService.getItem("selected_month")
      ? new Date(PermanentCacheService.getItem("selected_month"))
      : dateFns.setDate(initialDate, 1);
    this.state = {
      isLoading: false,
      currentDate: initialDate,
      employeeDto: null,
      listEmployeeAttendance: [],
      isShowLeaveLetterModal: false,
      employeeAttendanceDto: null,
      currentPage: 1,
      numberOfPage: 1,
      listAllEmployee: [],
      // listSumEmployeeAttendance: [],
      dayToAttendance: null,
      idEmployeeAttendance: null,
      isShownEmployeeAttendance: false,
      isEditEmployeeAttendanceModal: false,
      userId: null,
      listCurrentAttendance: [],
    };

    this.prev = () => {
      const prev = dateFns.subMonths(this.state.currentDate, 1);
      PermanentCacheService.setItem("selected_month", prev);
      this.setState(
        {
          currentDate: prev,
        },
        () => {
          this.updateEmployeeAttendance(this.state.userId);
        }
      );
    };

    this.next = () => {
      const next = dateFns.addMonths(this.state.currentDate, 1);
      PermanentCacheService.setItem("selected_month", next);
      this.setState(
        {
          currentDate: next,
        },
        () => {
          this.updateEmployeeAttendance(this.state.userId);
        }
      );
    };

    this.today = () => {
      let today = new Date();
      today = dateFns.setDate(today, 1);
      PermanentCacheService.setItem("selected_month", today);
      this.setState(
        {
          currentDate: today,
        },
        () => {
          this.updateEmployeeAttendance(this.state.userId);
        }
      );
    };
    this.showLeaveLetterModal = (employeeAttendanceObj) => {
      this.setState({
        isShowLeaveLetterModal: true,
        employeeAttendanceDto: employeeAttendanceObj,
      });
    };
    this.handleShowModalAddAttendance = this.handleShowModalAddAttendance.bind(this);
    this.handleShowModalEditAttendance = this.handleShowModalEditAttendance.bind(this);
    this.updateEmployeeAttendance = this.updateEmployeeAttendance.bind(this);
    this.handleHideAttendanceModal = () => {
      this.updateEmployeeAttendance(this.state.userId);
      this.setState({
        isShownEmployeeAttendance: false,
        isEditEmployeeAttendanceModal: false,
        isShowLeaveLetterModal: false,
      });
    };
    this.handleDeleteAttendance = this.handleDeleteAttendance.bind(this);
  }
  getListEmployee() {
    let setStateInRequest = (list) => {
      this.setState({
        listAllEmployee: list,
      });
    };
    return agent.asyncRequests.get("/user/listAll").then(
      function (res) {
        var result = res.body.resultData;
        if (result) {
          setStateInRequest(result);
        } else {
          toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + res.body.errorMessage, {
            autoClose: 15000,
          });
        }
      },
      function (err) {
        toast.error(
          "Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.",
          {
            autoClose: 15000,
          }
        );
      }
    );
  }
  updateEmployeeAttendance(userId) {
    // waiting loading
    this.setState({
      isLoading: true,
    });
    var currentDate = this.state.currentDate;
    
    var startDateOfMonth = moment(dateFns.startOfMonth(currentDate)).format(
      "YYYY-MM-DD-HH:mm:ss"
    );
    var endDateOfMonth = moment(dateFns.lastDayOfMonth(currentDate)).format(
      "YYYY-MM-DD-HH:mm:ss"
    );
    this.getListEmployee();
    if (!userId) {
      return null;
    }
    if (userId && userId == "ALL") {
      let setStateInRequest = (list) => {
        this.setState({
          userId: userId,
          listEmployeeAttendance: list,
          isLoading: false,
        });
      };

      return agent.asyncRequests
        .get(
          "/employeeAttendance/findByDateToWork?dateToWorkStart=" +
          startDateOfMonth +
          "&dateToWorkEnd=" +
          endDateOfMonth
        )
        .then(
          function (res) {
            var result = res.body.resultData;

            if (result) {
              setStateInRequest(result);
            } else {
              toast.error(
                "Có lỗi khi tải dữ liệu. Lỗi: " + res.body.errorMessage,
                {
                  autoClose: 15000,
                }
              );
            }
          },
          function (err) {
            toast.error(
              "Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.",
              {
                autoClose: 15000,
              }
            );
          }
        );
    } else if (userId) {
      let setStateInRequest = (list) => {
        this.setState({
          listEmployeeAttendance: list,
          userId: userId,
          isLoading: false,
          isLoading: false,
        });
      };
      return agent.asyncRequests
        .get(
          "/employeeAttendance/findByUserId?userId=" +
          userId +
          "&dateToWorkStart=" +
          startDateOfMonth +
          "&dateToWorkEnd=" +
          endDateOfMonth
        )
        .then(
          function (res) {
            var result = res.body.resultData;
            if (result) {
              setStateInRequest(result);
            } else {
              toast.error(
                "Có lỗi khi tải dữ liệu. Lỗi: " + res.body.errorMessage,
                {
                  autoClose: 15000,
                }
              );
            }
          },
          function (err) {
            toast.error(
              "Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.",
              {
                autoClose: 15000,
              }
            );
          }
        );
    }
  }

  componentWillMount() {
    const { updateField, userId } = this.props;
    // try get from property, if not exist, try from query param
    var paramUserId = qs.parse(this.props.location.search).userId;
    updateField("isEmployeeActive", true);
    if (paramUserId) {
      updateField("userId", paramUserId);
      this.updateEmployeeAttendance(paramUserId);
    } else if (userId) {
      this.updateEmployeeAttendance(userId);
    } else if (!userId) {
      this.updateEmployeeAttendance("ALL");
      updateField("userId", "ALL");
    }
  }
  componentDidUpdate() {
    ScriptUtils.loadFootable();
    ScriptUtils.loadFormLayout();
    ScriptUtils.loadLibrary("/assets/js/scroll-bar/double-scrollbar.js");
  }
  handleShowModalEditAttendance(id, employeeDto, listCurrentAttendance) {
    const { currentUser } = this.props;
    if (
      SecurityUtils.hasPermission(
        currentUser,
        "admin.employeeAttendance.update"
      ) ||
      SecurityUtils.hasPermission(
        currentUser,
        "admin.employeeAttendance.allowSetAttendanceForAll"
      )
    ) {
      this.setState({
        listCurrentAttendance: null, //set null before set a new list
        idEmployeeAttendance: id,
        isEditEmployeeAttendanceModal: true,
        employeeDto: employeeDto,
        dayToAttendance: null,
        listCurrentAttendance: listCurrentAttendance,
      });
    }
  }
  handleShowModalAddAttendance(
    dayToAttendance,
    employeeDto,
    listCurrentAttendance
  ) {
    const { currentUser } = this.props;
    if (
      SecurityUtils.hasPermission(
        currentUser,
        "admin.employeeAttendance.create"
      ) ||
      SecurityUtils.hasPermission(
        currentUser,
        "admin.employeeAttendance.allowSetAttendanceForAll"
      )
    ) {
      this.setState({
        listCurrentAttendance: null, //set null before set a new list
        idEmployeeAttendance: null,
        dayToAttendance: dayToAttendance,
        employeeDto: employeeDto,
        isShownEmployeeAttendance: true,
        listCurrentAttendance: listCurrentAttendance,
      });
    }
  }
  //Delete ManagePersonalContract Function
  handleDeleteAttendance(id) {
    const { currentUser } = this.props;
    if (
      SecurityUtils.hasPermission(
        currentUser,
        "admin.employeeAttendance.delete"
      )
    ) {
      var updateEmployeeAttendance = this.updateEmployeeAttendance;
      var userId = this.state.userId;
      if (confirm("Bạn có chắc sẽ xoá ngày công này!")) {
        var url = `/employeeAttendance/${id}`;
        return agent.asyncRequests.del(url).then(
          function (res) {
            var result = res.body.resultData;
            if (result && !result.error) {
              alert("Xoá Thành Công: ");
              updateEmployeeAttendance(userId);
            } else {
              toast.error(
                "Có lỗi khi xoá dữ liệu. Lỗi: " + result.errorMessage,
                {
                  autoClose: 15000,
                }
              );
            }
          },
          function (err) {
            toast.error(
              "Không thể xóa dữ liệu đang được sử dụng từ màn hình khác!",
              {
                autoClose: 15000,
              }
            );
          }
        );
      } else {
      }
    }
  }
  render() {
    const firstOfTheWeek = this.state.currentDate;
    const currentUser = this.props.currentUser;
    // var listSumEmployeeAttendance = this.state.listSumEmployeeAttendance;
    const currentDate = new Date(this.state.currentDate.getTime());
    var itemsPerPage = 4;
    
    // pagination for contractItems
    var listEmployeeAttendance = this.state.listEmployeeAttendance;
    var isEmployeeActive = this.props.isEmployeeActive;
    
    if (!currentUser) {
      return null;
    }
    if (!listEmployeeAttendance) {
      return <LoadingScreen> </LoadingScreen>;
    }

    const dataEmployee = this.state.listAllEmployee;

    const calendarDays = [];
    const body = [];
    var page = qs.parse(this.props.location.search).page;
    let dateIncrement = new Date(firstOfTheWeek.getTime());
    var numberOfDays = moment(currentDate).daysInMonth();
    let inc = 0;
    var dateArray = [];
    while (inc < numberOfDays) {
      calendarDays.push(
        <DaysInMonth
          date={dateIncrement}
          currentDate={currentDate}
          listEmployeeAttendance={listEmployeeAttendance}
          userId={this.state.userId}
          key={inc}
        ></DaysInMonth>
      );
      dateArray.push(dateIncrement);
      inc += 1;
      dateIncrement = dateFns.addDays(dateIncrement, 1);
    }
    if (!dataEmployee) {
      <LoadingScreen> </LoadingScreen>;
    }
    body.push(
      <BodyAttendance
        key={"_BodyAttendance"}
        date={dateArray}
        eachDate={dateIncrement}
        isEmployeeActive={isEmployeeActive}
        // listSumEmployeeAttendance={listSumEmployeeAttendance}
        currentDate={currentDate}
        listEmployee={dataEmployee}
        userId={this.state.userId}
        currentUser={this.props.currentUser}
        listEmployeeAttendance={listEmployeeAttendance}
        handleShowModalEditAttendance={this.handleShowModalEditAttendance}
        handleShowModalAddAttendance={this.handleShowModalAddAttendance}
        handleHideAttendanceModal={this.handleHideAttendanceModal}
        handleDeleteAttendance={this.handleDeleteAttendance}
      ></BodyAttendance>
    );
    const wrapperStyle = {
      height: "100%",
      width: "50%",
    };
    var optionEmployee = [
      {
        label: "Tất Cả",
        value: "ALL",
      },
    ];
    if (dataEmployee) {
      dataEmployee.map((item) => {
        optionEmployee.push({
          label: item.fullName,
          value: item.id,
        });
      });
    }
    if (!page) {
      page = 1;
    }
    var currentNo = (page - 1) * 20;
    return (
      <div className="content-wrapper">
        <div className="content">
          <div className="page-header">
            <h4>
              <span className="text-semibold"> Quản Lý Ngày Công </span>{" "}
            </h4>{" "}
          </div>{" "}
          <div className="row">
            <div className="col-md-12">
              <div className="panel panel-flat">
                <div className="panel-body">
                  <div
                    style={{
                      height: "100%",
                      width: "100%",
                    }}
                    className="input-group content-group"
                  >
                    <div>
                      <span style={wrapperStyle}>
                        <CalendarHeader
                          currentDate={currentDate}
                          next={this.next}
                          prev={this.prev}
                          today={this.today}
                        />{" "}
                      </span>{" "}
                      <br />
                      <span style={wrapperStyle}>
                        <label
                          style={{
                            width: "105px",
                          }}
                          className="control-label col-md-2"
                          htmlFor="active"
                        >
                          TT Hoạt Động{" "}
                        </label>{" "}
                        <div className="col-md-3">
                          <Field
                            component={RenderSwitch}
                            name="isEmployeeActive"
                          ></Field>{" "}
                        </div>{" "}
                      </span>
                      {this.state.isShownEmployeeAttendance ? (
                        <ModalEmployeeAttendance
                          title="Chấm Công"
                          listCurrentAttendance={
                            this.state.listCurrentAttendance
                          }
                          showLeaveLetterModal={this.showLeaveLetterModal}
                          idEmployeeAttendance={null}
                          employeeDto={this.state.employeeDto}
                          dayToAttendance={this.state.dayToAttendance}
                          show={this.state.isShownEmployeeAttendance}
                          onHide={this.handleHideAttendanceModal}
                        />
                      ) : null}{" "}
                      {this.state.isLoading ? (
                        <ModalLoading
                          show={this.state.isLoading}
                        ></ModalLoading>
                      ) : null}{" "}
                      {this.state.isEditEmployeeAttendanceModal ? (
                        <ModalEmployeeAttendance
                          title="Chỉnh Sửa Ngày Công"
                          listCurrentAttendance={
                            this.state.listCurrentAttendance
                          }
                          idEmployeeAttendance={this.state.idEmployeeAttendance}
                          employeeDto={this.state.employeeDto}
                          dayToAttendance={this.state.dayToAttendance}
                          show={this.state.isEditEmployeeAttendanceModal}
                          onHide={this.handleHideAttendanceModal}
                        />
                      ) : null}{" "}
                      {this.state.isShowLeaveLetterModal ? (
                        <ModalLeaveLetter
                          title="Tạo Đơn Nghỉ Phép"
                          listCurrentAttendance={
                            this.state.listCurrentAttendance
                          }
                          employeeAttendanceDto={
                            this.state.employeeAttendanceDto
                          }
                          dayToAttendance={this.state.dayToAttendance}
                          idLeaveLetter={null}
                          userDto={this.state.employeeDto}
                          show={this.state.isShowLeaveLetterModal}
                          onHide={this.handleHideAttendanceModal}
                          isAttendance={true}
                        />
                      ) : null}
                      <br
                        style={{
                          lineHeight: "100px",
                        }}
                      />{" "}
                      <div>
                        <br />
                        <SecuredComponent allowedPermission="admin.employeeAttendance.readAllEmployeeAttendance">
                          <Field
                            name="userId"
                            placeholder="Chọn Nhân Viên"
                            options={optionEmployee}
                            component={RenderSelect}
                            onChangeAction={(userId) =>
                              this.updateEmployeeAttendance(userId)
                            }
                          ></Field>{" "}
                        </SecuredComponent>{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
              <div
                style={{
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                }}
                className="scroll-wrapper1"
              >
                <div className="div-scroll-1"> </div>{" "}
              </div>{" "}
              <div
                style={{
                  overflow: "auto",
                }}
                className="panel panel-flat scroll-wrapper2"
              >
                <table
                  style={{
                    whiteSpace: "nowrap",
                  }}
                  className="table  table-bordered div-scroll-2"
                >
                  <thead>
                    <tr>
                      <th
                        className="bg-success"
                        style={{
                          position: "sticky",
                          left: 0,
                        }}
                        rowSpan={2}
                      >
                        STT{" "}
                      </th>{" "}
                      <th
                        className="bg-success"
                        style={{
                          position: "sticky",
                          left: 38,
                        }}
                        rowSpan={2}
                      >
                        Tên Nhân Sự{" "}
                      </th>{" "}
                      <th colSpan={numberOfDays}>
                        <center> Ngày Trong Tháng </center>{" "}
                      </th>{" "}
                      
                    </tr>{" "}
                  </thead>{" "}
                  <tbody> {body} </tbody> <tfoot> </tfoot>{" "}
                </table>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    );
  }
}

export default translate("translations")(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    reduxForm({
      form: "EmployeeAttendanceList",
      destroyOnUnmount: false,
      enableReinitialize: true,
      validate,
    })(EmployeeAttendanceList)
  )
);
