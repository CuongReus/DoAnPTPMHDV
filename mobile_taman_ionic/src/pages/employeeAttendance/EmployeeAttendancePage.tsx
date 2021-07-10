import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonDatetime,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { connect } from "../../data/connect";
import { asyncRequests } from "../../data/dataApi";
import "../EditPage.scss";
import * as employeeSelectors from './EmployeeAttendanceSelectors';
import { setSearchText } from '../../data/sessions/sessions.actions';
import { Employee } from './Employee';
import { loadListEmployeeAttendance } from './listEmployeeAttendance.actions';
import startOfMonth from 'date-fns/startOfMonth'
import lastDayOfMonth from 'date-fns/lastDayOfMonth'
import moment from 'moment';

import { toast } from "../../toast";

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  listDateWorkInMonth: Employee[];
}

interface DispatchProps {
  setSearchText: typeof setSearchText;
  loadListEmployeeAttendance: typeof loadListEmployeeAttendance;
}

type EmployeeAttendanceProps = OwnProps & StateProps & DispatchProps;

const EmployeeAttendance: React.FC<EmployeeAttendanceProps> = ({ history , listDateWorkInMonth, setSearchText, loadListEmployeeAttendance }) => {
  const [dateToWork, setDateToWork] = useState(moment().toISOString());
  const [attendanceType, setAttendanceType] = useState("");
  const [attendanceTypeError, setAttendanceTypeError] = useState(false);
  const [attendanceType1Error, setAttendanceType1Error] = useState(false);
  const [attendanceType2Error, setAttendanceType2Error] = useState(false);
  const [attendanceType3Error, setAttendanceType3Error] = useState(false);
  const [dateToWorkError, setDateToWorkError] = useState(false);
  const [dateToWork1Error, setDateToWork1Error] = useState(false);
  const [dateToWork2Error, setDateToWork2Error] = useState(false);
  const [workPlace, setWorkPlace] = useState("Văn Phòng");
  const [overtimeType, setOvertimeType] = useState(null);
  const [lateStatus, setLateStatus] = useState("KHONG");
  const [status, setStatus] = useState("");
  const [statusError, setStatusError] = useState(false);
  const [status1Error, setStatus1Error] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [messageResult, setMessageResult] = useState("");
  const [isShowOvertimeType, setIsShowOvertimeType] = useState(false);

  const currentUser = JSON.parse(localStorage._cap_currentUser);

  var currentDate = new Date();;
  var startDateOfMonth = moment(startOfMonth(currentDate)).format("YYYY-MM-DD-HH:mm:ss");
  var endDateOfMonth = moment(lastDayOfMonth(currentDate)).format("YYYY-MM-DD-HH:mm:ss");

  useEffect(() => {
    loadListEmployeeAttendance(currentUser.id,startDateOfMonth,endDateOfMonth);
  },[]);

  const handleEditLeaveLetter = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!attendanceType) {
      setAttendanceTypeError(true);
    }

    var url = "/employeeAttendance/add";
    var bodyObject = {
      userId: currentUser.id,
      dateToWork: dateToWork,
      attendanceType: attendanceType,
      status: status,
      workPlace: workPlace,
      lateStatus: lateStatus,
      overtimeType: overtimeType,
      // lastedUpdateUserId: currentUser.id,
    };

    asyncRequests.post(url, bodyObject).then((result) => {
      if (result && result.id) {
        toast("Chấm Công Thành Công");
        history.push("/listEmployeeAttendance");
      } else {
        toast("Lỗi Lưu trữ!");
        setShowToast(true);
      }
    });
  };

  var weekdays = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");

  var optionAttendanceType: any[] = [];
  if (dateToWork && status) {
    if (status == "CO_MAT") {
      if (weekdays[moment(dateToWork).day()] == "Sunday") {
        optionAttendanceType.push(
          { value: "NG_CN", label: "NG_CN - Ngày chủ nhật" },
          {
            value: "NG_CN2",
            label: "NG_CN2 - Ngày chủ nhật nửa ngày",
            disabled: true,
          },
          { value: "NG_L", label: "NG_L - Ngày lễ" }
        );
        // setIsShowOvertimeType(true);
      } else if (weekdays[moment(dateToWork).day()] == "Saturday") {
        optionAttendanceType.push(
          { value: "X2", label: "X2 - Đi làm nửa ngày" },
          { value: "NG_7", label: "NG_7 - Ngoài giờ thứ 7" },
          {
            value: "NG_72",
            label: "NG_72 - Ngoài giờ Thứ 7 nửa ngày",
            disabled: true,
          },
          { value: "NG_L", label: "NG_L - Ngày lễ" }
          // { value: "NG_L2", label: "NG_L2 - Ngày lễ nữa ngày" }
        );
        // if(employeeDto.department && employeeDto.department.workOnWeekendStatus =="CO"){
        //     optionAttendanceType.unshift({ value: "X", label: "X - Đi làm bình thường" },
        //     // { value: "X2", label: "X2 - Đi làm nửa ngày" }
        //     )
        // }
        // isShowOvertimeType =true;
      } else if (
        weekdays[moment(dateToWork).day()] != "Sunday" &&
        weekdays[moment(dateToWork).day()] != "Saturday"
      ) {
        optionAttendanceType.push(
          { value: "X", label: "X - Đi làm bình thường" },
          { value: "X2", label: "X2 - Đi làm bình thường (nửa ngày)" },
          { value: "NG_X", label: "NG_X - Ngoài giờ ngày thường" },
          { value: "NG_L", label: "NG_L - Ngày lễ" }
          // { value: "NG_L2", label: "NG_L2 - Ngày lễ nữa ngày" }
        );
      }
    } else if (status == "VANG_MAT") {
      // totalLeaveYearRemain = employeeDto && employeeDto.annualLeaveNumberRemaining !=null ? employeeDto.annualLeaveNumberRemaining: 0;
      optionAttendanceType = [
        { value: "NL", label: "NL - Nghỉ lễ" },
        { value: "NL2", label: "NL2 - Nghỉ lễ nửa ngày" },

        // { value: "PN2", label: "PN2 -  Nghỉ phép năm nửa ngày" },
        { value: "KP", label: "KP -  Nghỉ không phép" },
        { value: "KP2", label: "KP2 -  Nghỉ không phép nửa ngày" },
        { value: "NB", label: "NB -  Nghỉ bù" },
        { value: "NB2", label: "NB2 -  Nghỉ bù nửa ngày" },
      ];
      // if(totalLeaveYearRemain > 0){
      optionAttendanceType.unshift(
        { value: "PN", label: "PN - Nghỉ phép năm" },
        { value: "PN2", label: "PN2 -  Nghỉ phép năm nửa ngày" }
      );
      // }
    }
  }

  const checkAttendanceType = (attendanceType: any) => {
    if (
      attendanceType == "NG_L" ||
      attendanceType == "NG_L2" ||
      attendanceType == "NG_X" ||
      attendanceType == "NG_7" ||
      attendanceType == "NG_72"
    ) {
      setIsShowOvertimeType(true);
    } else {
      setIsShowOvertimeType(false);
    }
  };

  const resetAttendanceType = () => {
    setAttendanceType("");
  };

  var optionWorkplace = [
    { label: "Văn Phòng", value: "Văn Phòng" },
    { label: "Công Trường", value: "Công Trường" },
    { label: "Khác", value: "Khác" },
  ];
  var optionStatus = [
    { label: "Có Mặt", value: "CO_MAT" },
    { label: "Vắng Mặt", value: "VANG_MAT" },
  ];
  var optionLateStatus = [
    { label: "Có", value: "CO" },
    { label: "Không", value: "KHONG" },
  ];
  var optionOvertimeType = [
    { label: "Dưới 5H-30", value: "DUOI_5H_30" },
    { label: "Trên 5H-30", value: "TREN_5H_30" },
  ];

  const [disabledButton, setDisabledButton] = useState(false);
  const [disabledButtonIfFuture, setDisabledButtonIfFuture] = useState(false);

  const checkValidate = (selectedWork : any, selectedAttendanceType : any) => {
    var futureDate = moment(selectedWork, 'DD-MM-YYYY');
    var todayDate = moment(new Date().toISOString(), 'DD-MM-YYYY');
        // todayDate = todayDate.subtract(1, "days");
    var dDiff = todayDate.diff(futureDate);

    //Nếu nhỏ hơn 0 là ngày trong tương lai
    if (dDiff < 0){
      setDisabledButtonIfFuture(true);
      setDateToWork2Error(true);
    }else{
      setDisabledButtonIfFuture(false);
      setDateToWork2Error(false);
    }
    var dateWork = moment(selectedWork).format('YYYY-MM-DD');
    for(var i = 0; i < listDateWorkInMonth.length; i++){
      if(moment(listDateWorkInMonth[i].dateToWork).isSame(dateWork)) {
        if(status == "CO_MAT" && selectedAttendanceType) {
          if(selectedAttendanceType.substring(0, 2) != "NG"){
            if(listDateWorkInMonth[i].attendanceType.substring(0, 1) == selectedAttendanceType.substring(0, 1)){
              setDisabledButton(true);
              setDateToWorkError(true);
              break;
            }
          }else if(selectedAttendanceType.substring(0, 2) == "NG"){
            if (listDateWorkInMonth[i].attendanceType.substring(0, 2) == selectedAttendanceType.substring(0, 2)){
              setDisabledButton(true);
              setAttendanceType1Error(true);
              break;
            }
          }
        }else if(status == "VANG_MAT" && selectedAttendanceType){
          if (listDateWorkInMonth[i].status == status) {
            setDisabledButton(true);
            setStatusError(true);
            break;
          }else if (listDateWorkInMonth[i].attendanceType == "X"){
            setDisabledButton(true);
            setStatus1Error(true);
            break;
          }else if (listDateWorkInMonth[i].attendanceType == "X2" && !selectedAttendanceType.substring(2,3) && selectedAttendanceType != "NL"){
            setDisabledButton(true);
            setDateToWorkError(true);
            break;
          }
        }
        if(listDateWorkInMonth[i].status == "VANG_MAT" && selectedAttendanceType){
          if (listDateWorkInMonth[i].attendanceType.substring(2,3) == "2") {
            if(selectedAttendanceType.substring() == "X") {
              setDisabledButton(true);
              setAttendanceType2Error(true);
              break;
            }
          }else if(selectedAttendanceType.substring(0, 2) != "NG"){
            setDisabledButton(true);
            setAttendanceType3Error(true);
            break;
          }
        }
      }else {
        setDisabledButton(false);
        setDateToWorkError(false);
        setDateToWork1Error(false);
        setAttendanceTypeError(false);
        setAttendanceType1Error(false);
        setAttendanceType2Error(false);
        setAttendanceType3Error(false);
        setStatusError(false);
        setStatus1Error(false);
      }
    }
  }

  return (
    <IonPage id="edituser-page">
      <IonHeader>
        <IonToolbar className="custom-toolbar">
          <IonButtons slot="start">
            <IonMenuButton className="c-white"></IonMenuButton>
          </IonButtons>
          <IonTitle className="c-white">Chấm Công Văn Phòng</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form id="resetForm" noValidate onSubmit={handleEditLeaveLetter}>
          <IonList>
            <IonItem>
              <IonLabel>
                <h2>Tên: {currentUser.fullName}</h2>
                <h2>Email: {currentUser.email}</h2>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" color="success">
                Ngày Làm (*)
              </IonLabel>
              <IonDatetime
                displayFormat="DD/MM/YYYY"
                placeholder="Chọn Ngày Làm Việc"
                value={dateToWork}
                onIonChange={(e) => {setDateToWork(e.detail.value!); checkValidate(e.detail.value!, attendanceType);}}
              ></IonDatetime>
            </IonItem>
            {dateToWorkError && (
              <IonText color="danger">
                <p className="ion-padding-start">
                Ngày công đã tồn tại! Vui lòng thử lại.
                </p>
              </IonText>
            )}
            {dateToWork1Error && (
              <IonText color="danger">
                <p className="ion-padding-start">
                Vui lòng chọn ngày nghỉ nữa ngày hoặc ngày lễ, vì hôm nay nhân viên đã làm nữa ngày!
                </p>
              </IonText>
            )}
            {dateToWork2Error && (
              <IonText color="danger">
                <p className="ion-padding-start">
                Không được chọn ngày trong tương lai! Vui lòng chọn lại!
                </p>
              </IonText>
            )}

            <IonItem>
              <IonLabel position="stacked" color="success">
                Trạng Thái
              </IonLabel>
              <IonSelect
                value={status}
                placeholder="Chọn Trạng Thái"
                onIonChange={(e) => {setStatus(e.detail.value!); resetAttendanceType()}}
              >
                {optionStatus.map((option) => (
                  <IonSelectOption key={option.value} value={option.value}>
                    {option.label}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            {statusError && (
              <IonText color="danger">
                <p className="ion-padding-start">
                Nhân viên đã vắng mặt trong ngày này, vui lòng chọn trạng thái ngày làm khác!
                </p>
              </IonText>
            )}
            {status1Error && (
              <IonText color="danger">
                <p className="ion-padding-start">
                Không được chấm vắng mặt khi đã có công ngày thường!
                </p>
              </IonText>
            )}

            <IonItem>
              <IonLabel position="stacked" color="success">
                Loại Ngày Công (*)
              </IonLabel>
              <IonSelect
                value={attendanceType}
                placeholder="Chọn Loại"
                onIonChange={(e) => {
                  setAttendanceType(e.detail.value!);
                  checkAttendanceType(e.detail.value!);
                  checkValidate(dateToWork, e.detail.value!);
                }}
              >
                {optionAttendanceType.map((option) => (
                  <IonSelectOption value={option.value}>
                    {option.label}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            {formSubmitted && attendanceTypeError && (
              <IonText color="danger">
                <p className="ion-padding-start">
                  Vui Lòng Chọn Loại Ngày Công
                </p>
              </IonText>
            )}
            {attendanceType1Error && (
              <IonText color="danger">
                <p className="ion-padding-start">
                Ngày công "Ngoài Giờ" đã tồn tại! Vui lòng thử lại.
                </p>
              </IonText>
            )}
            {attendanceType2Error && (
              <IonText color="danger">
                <p className="ion-padding-start">
                Nhân viên đã vắng mặt nữa ngày này, vui lòng chọn trạng thái công nữa ngày hoặc Ngoài Giờ (NG)!
                </p>
              </IonText>
            )}
            {attendanceType3Error && (
              <IonText color="danger">
                <p className="ion-padding-start">
                Nhân viên đã vắng mặt trong ngày này, vui lòng chọn trạng thái công Ngoài Giờ (NG)!
                </p>
              </IonText>
            )}

            {isShowOvertimeType ? (
              <IonItem>
                <IonLabel position="stacked" color="success">
                  Loại Giờ Làm Việc
                </IonLabel>
                <IonSelect
                  value={overtimeType}
                  placeholder="Chọn Loại Giờ Làm Việc"
                  onIonChange={(e) => setOvertimeType(e.detail.value!)}
                >
                  {optionOvertimeType.map((option) => (
                    <IonSelectOption value={option.value}>
                      {option.label}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            ) : null}

            <IonItem>
              <IonLabel position="stacked" color="success">
                Nơi Làm Việc
              </IonLabel>
              <IonSelect
                value={workPlace}
                placeholder="Chọn Nơi Làm Việc"
                onIonChange={(e) => setWorkPlace(e.detail.value!)}
              >
                {optionWorkplace.map((option) => (
                  <IonSelectOption value={option.value}>
                    {option.label}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" color="success">
                Trạng thái đi trễ
              </IonLabel>
              <IonSelect
                value={lateStatus}
                placeholder="Chọn Trạng Thái"
                onIonChange={(e) => setLateStatus(e.detail.value!)}
              >
                {optionLateStatus.map((option) => (
                  <IonSelectOption key={option.value} value={option.value}>
                    {option.label}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          </IonList>

          <IonRow>
            <IonCol>
              {attendanceType == "PN" || attendanceType == "PN2" ? (
                <IonButton
                  color="primary"
                  type="button"
                  disabled={disabledButton || disabledButtonIfFuture}
                  expand="block"
                  routerLink={`/editLeaveLetter/${currentUser.id}`}
                >
                  Tạo Đơn
                </IonButton>
              ) : (
                <IonButton disabled={disabledButton || disabledButtonIfFuture} color="success" type="submit" expand="block">
                  Chấm Công
                </IonButton>
              )}
            </IonCol>
            <IonCol>
              <IonButton routerLink="/listUser" color="light" expand="block">
                Bỏ Qua
              </IonButton>
            </IonCol>
          </IonRow>
        </form>
      </IonContent>
      <IonToast
        isOpen={showToast}
        duration={3000}
        message={messageResult}
        onDidDismiss={() => setShowToast(false)}
      />
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    listDateWorkInMonth: employeeSelectors.getFilteredEmployees(state),
  }),
  mapDispatchToProps: {
    setSearchText, loadListEmployeeAttendance
  },
  component: EmployeeAttendance,
});
