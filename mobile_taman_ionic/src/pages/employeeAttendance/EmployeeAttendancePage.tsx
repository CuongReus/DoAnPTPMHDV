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
import React, { useState } from "react";
import { RouteComponentProps } from "react-router";
import { connect } from "../../data/connect";
import { asyncRequests } from "../../data/dataApi";
import "../EditPage.scss";
import { Employee } from "./Employee";
import moment from "moment";
import { toast } from "../../toast";

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  listEmployeeOptions: Employee[];
}

type EmployeeAttendanceProps = OwnProps & StateProps;

const EmployeeAttendance: React.FC<EmployeeAttendanceProps> = ({ history }) => {
  const [dateToWork, setDateToWork] = useState(moment().toISOString());
  const [attendanceType, setAttendanceType] = useState("X");
  const [attendanceTypeError, setAttendanceTypeError] = useState(false);
  const [workPlace, setWorkPlace] = useState("Văn Phòng");
  const [overtimeType, setOvertimeType] = useState("");
  const [lateStatus, setLateStatus] = useState("KHONG");
  const [status, setStatus] = useState("CO_MAT");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [messageResult, setMessageResult] = useState("");
  const [isShowOvertimeType, setIsShowOvertimeType] = useState(false);

  const currentUser = JSON.parse(localStorage._cap_currentUser);

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
    };

    asyncRequests.post(url, bodyObject).then((result) => {
      if (result && result.id) {
        toast("Chấm Công Thành Công");
        history.push("/listUser");
      } else {
        toast("Lỗi Lưu trữ!");
        setShowToast(true);
      }
    });
  };

  var weekdays = new Array(
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  );

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
        <form noValidate onSubmit={handleEditLeaveLetter}>
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
                onIonChange={(e) => setDateToWork(e.detail.value!)}
              ></IonDatetime>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" color="success">
                Trạng Thái
              </IonLabel>
              <IonSelect
                value={status}
                placeholder="Chọn Trạng Thái"
                onIonChange={(e) => setStatus(e.detail.value!)}
              >
                {optionStatus.map((option) => (
                  <IonSelectOption key={option.value} value={option.value}>
                    {option.label}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>

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
                  expand="block"
                  routerLink={`/editLeaveLetter/${currentUser.id}`}
                >
                  Tạo Đơn
                </IonButton>
              ) : (
                <IonButton color="success" type="submit" expand="block">
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

export default connect<OwnProps, StateProps>({
  component: EmployeeAttendance,
});
