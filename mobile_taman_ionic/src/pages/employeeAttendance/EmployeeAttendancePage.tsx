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
  const [workPlace, setWorkPlace] = useState("V??n Ph??ng");
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
        toast("Ch????m C??ng Tha??nh C??ng");
        history.push("/tabs/listEmployeeAttendance");
      } else {
        toast("L???i L??u tr???!");
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
          { value: "NG_CN", label: "NG_CN - Ng??y ch??? nh???t" },
          {
            value: "NG_CN2",
            label: "NG_CN2 - Ng??y ch??? nh???t n???a ng??y",
            disabled: true,
          },
          { value: "NG_L", label: "NG_L - Ng??y l???" }
        );
        // setIsShowOvertimeType(true);
      } else if (weekdays[moment(dateToWork).day()] == "Saturday") {
        optionAttendanceType.push(
          { value: "X2", label: "X2 - ??i l??m n???a ng??y" },
          { value: "NG_7", label: "NG_7 - Ngo??i gi??? th??? 7" },
          {
            value: "NG_72",
            label: "NG_72 - Ngo??i gi??? Th??? 7 n???a ng??y",
            disabled: true,
          },
          { value: "NG_L", label: "NG_L - Ng??y l???" }
          // { value: "NG_L2", label: "NG_L2 - Ng??y l??? n???a ng??y" }
        );
        // if(employeeDto.department && employeeDto.department.workOnWeekendStatus =="CO"){
        //     optionAttendanceType.unshift({ value: "X", label: "X - ??i l??m b??nh th?????ng" },
        //     // { value: "X2", label: "X2 - ??i l??m n???a ng??y" }
        //     )
        // }
        // isShowOvertimeType =true;
      } else if (
        weekdays[moment(dateToWork).day()] != "Sunday" &&
        weekdays[moment(dateToWork).day()] != "Saturday"
      ) {
        optionAttendanceType.push(
          { value: "X", label: "X - ??i l??m b??nh th?????ng" },
          { value: "X2", label: "X2 - ??i l??m b??nh th?????ng (n???a ng??y)" },
          { value: "NG_X", label: "NG_X - Ngo??i gi??? ng??y th?????ng" },
          { value: "NG_L", label: "NG_L - Ng??y l???" }
          // { value: "NG_L2", label: "NG_L2 - Ng??y l??? n???a ng??y" }
        );
      }
    } else if (status == "VANG_MAT") {
      // totalLeaveYearRemain = employeeDto && employeeDto.annualLeaveNumberRemaining !=null ? employeeDto.annualLeaveNumberRemaining: 0;
      optionAttendanceType = [
        { value: "NL", label: "NL - Ngh??? l???" },
        { value: "NL2", label: "NL2 - Ngh??? l??? n???a ng??y" },

        // { value: "PN2", label: "PN2 -  Ngh??? ph??p n??m n???a ng??y" },
        { value: "KP", label: "KP -  Ngh??? kh??ng ph??p" },
        { value: "KP2", label: "KP2 -  Ngh??? kh??ng ph??p n???a ng??y" },
        { value: "NB", label: "NB -  Ngh??? b??" },
        { value: "NB2", label: "NB2 -  Ngh??? b?? n???a ng??y" },
      ];
      // if(totalLeaveYearRemain > 0){
      optionAttendanceType.unshift(
        { value: "PN", label: "PN - Ngh??? ph??p n??m" },
        { value: "PN2", label: "PN2 -  Ngh??? ph??p n??m n???a ng??y" }
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
    { label: "V??n Ph??ng", value: "V??n Ph??ng" },
    { label: "C??ng Tr?????ng", value: "C??ng Tr?????ng" },
    { label: "Kh??c", value: "Kh??c" },
  ];
  var optionStatus = [
    { label: "C?? M???t", value: "CO_MAT" },
    { label: "V???ng M???t", value: "VANG_MAT" },
  ];
  var optionLateStatus = [
    { label: "C??", value: "CO" },
    { label: "Kh??ng", value: "KHONG" },
  ];
  var optionOvertimeType = [
    { label: "D?????i 5H-30", value: "DUOI_5H_30" },
    { label: "Tr??n 5H-30", value: "TREN_5H_30" },
  ];

  const [disabledButton, setDisabledButton] = useState(false);
  const [disabledButtonIfFuture, setDisabledButtonIfFuture] = useState(false);

  const checkValidate = (selectedWork : any, selectedAttendanceType : any) => {
    var futureDate = moment(selectedWork, 'DD-MM-YYYY');
    var todayDate = moment(new Date().toISOString(), 'DD-MM-YYYY');
        // todayDate = todayDate.subtract(1, "days");
    var dDiff = todayDate.diff(futureDate);

    //N????u nho?? h??n 0 la?? nga??y trong t????ng lai
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
          <IonTitle className="c-white">Ch????m C??ng V??n Pho??ng</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form id="resetForm" noValidate onSubmit={handleEditLeaveLetter}>
          <IonList>
            <IonItem>
              <IonLabel>
                <h2>T??n: {currentUser.fullName}</h2>
                <h2>Email: {currentUser.email}</h2>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" color="success">
                Ng??y La??m (*)
              </IonLabel>
              <IonDatetime
                displayFormat="DD/MM/YYYY"
                placeholder="Ch???n Ng??y La??m Vi????c"
                value={dateToWork}
                onIonChange={(e) => {setDateToWork(e.detail.value!); checkValidate(e.detail.value!, attendanceType);}}
              ></IonDatetime>
            </IonItem>
            {dateToWorkError && (
              <IonText color="danger">
                <p className="ion-padding-start">
                Ng??y c??ng ???? t???n t???i! Vui l??ng th??? l???i.
                </p>
              </IonText>
            )}
            {dateToWork1Error && (
              <IonText color="danger">
                <p className="ion-padding-start">
                Vui l??ng ch???n ng??y ngh??? n???a ng??y ho???c ng??y l???, v?? h??m nay nh??n vi??n ???? l??m n???a ng??y!
                </p>
              </IonText>
            )}
            {dateToWork2Error && (
              <IonText color="danger">
                <p className="ion-padding-start">
                Kh??ng ????????c cho??n nga??y trong t????ng lai! Vui lo??ng cho??n la??i!
                </p>
              </IonText>
            )}

            <IonItem>
              <IonLabel position="stacked" color="success">
                Tra??ng Tha??i
              </IonLabel>
              <IonSelect
                value={status}
                placeholder="Ch???n Tr???ng Th??i"
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
                Nh??n vi??n ???? v???ng m???t trong ng??y n??y, vui l??ng ch???n tr???ng th??i ng??y l??m kh??c!
                </p>
              </IonText>
            )}
            {status1Error && (
              <IonText color="danger">
                <p className="ion-padding-start">
                Kh??ng ???????c ch???m v???ng m???t khi ???? c?? c??ng ng??y th?????ng!
                </p>
              </IonText>
            )}

            <IonItem>
              <IonLabel position="stacked" color="success">
                Lo???i Nga??y C??ng (*)
              </IonLabel>
              <IonSelect
                value={attendanceType}
                placeholder="Ch???n Lo???i"
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
                  Vui L??ng Cho??n Loa??i Nga??y C??ng
                </p>
              </IonText>
            )}
            {attendanceType1Error && (
              <IonText color="danger">
                <p className="ion-padding-start">
                Ng??y c??ng "Ngo??i Gi???" ???? t???n t???i! Vui l??ng th??? l???i.
                </p>
              </IonText>
            )}
            {attendanceType2Error && (
              <IonText color="danger">
                <p className="ion-padding-start">
                Nh??n vi??n ???? v???ng m???t n???a ng??y n??y, vui l??ng ch???n tr???ng th??i c??ng n???a ng??y ho???c Ngo??i Gi??? (NG)!
                </p>
              </IonText>
            )}
            {attendanceType3Error && (
              <IonText color="danger">
                <p className="ion-padding-start">
                Nh??n vi??n ???? v???ng m???t trong ng??y n??y, vui l??ng ch???n tr???ng th??i c??ng Ngo??i Gi??? (NG)!
                </p>
              </IonText>
            )}

            {isShowOvertimeType ? (
              <IonItem>
                <IonLabel position="stacked" color="success">
                  Loa??i Gi???? La??m Vi????c
                </IonLabel>
                <IonSelect
                  value={overtimeType}
                  placeholder="Ch???n Loa??i Gi???? La??m Vi????c"
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
                N??i L??m Vi???c
              </IonLabel>
              <IonSelect
                value={workPlace}
                placeholder="Ch???n N??i L??m Vi???c"
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
                Tra??ng tha??i ??i tr????
              </IonLabel>
              <IonSelect
                value={lateStatus}
                placeholder="Ch???n Tr???ng Th??i"
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
                  Ta??o ????n
                </IonButton>
              ) : (
                <IonButton disabled={disabledButton || disabledButtonIfFuture} color="success" type="submit" expand="block">
                  Ch????m C??ng
                </IonButton>
              )}
            </IonCol>
            <IonCol>
              <IonButton routerLink="/listUser" color="light" expand="block">
                B??? Qua
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
