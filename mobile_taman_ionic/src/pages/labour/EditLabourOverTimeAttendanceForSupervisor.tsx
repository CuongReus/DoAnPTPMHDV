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
  IonTextarea,
  IonTitle,
  IonToast,
  IonToolbar,
  IonInput,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { RouteComponentProps, useParams } from "react-router";
import { connect } from "../../data/connect";
import { asyncRequests } from "../../data/dataApi";
import "../EditPage.scss";
import { loadListLabourAttendanceForSupervisor } from "./listLabour.actions";
import { Labour } from "./Labour";
import moment from "moment";
import { toast } from "../../toast";
import { loadLabourAttendanceById } from "./labourConfig";
import { FormatterUtils } from "../../util/javascriptUtils";
import startOfMonth from "date-fns/startOfMonth";
import lastDayOfMonth from "date-fns/lastDayOfMonth";


interface OwnProps extends RouteComponentProps {}

interface StateProps {
  listLabourOptions: Labour[];
}

interface DispatchProps {
  loadListLabourAttendanceForSupervisor: typeof loadListLabourAttendanceForSupervisor;
}

type LabourAttendanceProps = OwnProps & StateProps & DispatchProps;

const LabourAttendance: React.FC<LabourAttendanceProps> = ({
  loadListLabourAttendanceForSupervisor,
  history,
}) => {
  const [labourAttendance, setLabourAttendance] = useState(Object);
  const [hasLoadLabourAttendance, setHasLoadLabourAttendance] = useState(false);
  const [workDate, setWorkDate] = useState("");
  const [overtimeStatus, setOvertimeStatus] = useState("");
  const [startOvertime, setStartOverTime] = useState("");
  const [endOvertime, setEndOverTime] = useState("");
  const [endOverTimeError, setEndOverTimeError] = useState(false);
  const [endOverTime1Error, setEndOverTime1Error] = useState(false);
  const [totalOverTime, setTotalOverTime] = useState<any>();
  const [minusLunchHour, setMinusLunchHour] = useState<any>(0);
  const [note, setNote] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [messageResult, setMessageResult] = useState("");

  const params: any = useParams();

  const currentUser = JSON.parse(localStorage._cap_currentUser);

  useEffect(() => {
    loadLabourAttendanceById(params.labourId).then((labourAttendance: any) => {
      if (labourAttendance) {
        setLabourAttendance(labourAttendance);
        setHasLoadLabourAttendance(true);
      }
    });
  }, [params.labourId]);

  const handleTotalOvertime = (valueEndTime: any, minusLunchHour: any) => {

    var startTime = moment(labourAttendance.startOvertime, 'HH:mm');
    var endTime = moment(valueEndTime, 'HH:mm');

    var hours = moment(endTime).diff(startTime, "minutes") / 60;

    if(labourAttendance.overtimeStatus == "TANG_CA_KHUYA"){
      if (hours && hours < 0){
        var totalOvertimeHours = hours + 24;
        setTotalOverTime(FormatterUtils.round2Decimals(totalOvertimeHours - minusLunchHour));
      }else if(hours && hours > 0){
        setTotalOverTime(FormatterUtils.round2Decimals(hours - minusLunchHour));
      }else {
        setTotalOverTime(0);
      }
    }else if (labourAttendance.overtimeStatus == "TANG_CA_THUONG_TOI"){
      if (hours && hours > 0){
        setTotalOverTime(FormatterUtils.round2Decimals(hours - minusLunchHour));
      }else {
        setTotalOverTime(0);
      }
    }
  };

  const handleLabourAttendance = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    var today = new Date();
    var startDateOfMonth = moment(startOfMonth(today)).format("YYYY-MM-DD-HH:mm:ss");
    var endDateOfMonth = moment(lastDayOfMonth(today)).format("YYYY-MM-DD-HH:mm:ss");

    if (!endOvertime) {
      setEndOverTimeError(true);
    }

    var url = "/labourAttendance/update";
    var bodyObject = {
      id: parseInt(params.labourId),
      labourId: labourAttendance.labourId,
      projectId: labourAttendance.project.id,
      projectDetailId: labourAttendance.projectDetail.id,
      dateToWork: moment(labourAttendance.dateToWork).toISOString(),
      startDatetime: "00:00:00",
      endDatetime: "00:00:00",
      totalDatetime: 0,
      overtimeStatus: labourAttendance.overtimeStatus,
      startOvertime: startOvertime == "" ? labourAttendance.startOvertime : startOvertime,
      endOvertime: endOvertime ? moment(endOvertime, "HH:mm").format("HH:mm:ss") : "00:00:00",
      totalOvertime: totalOverTime ? totalOverTime : 0,
      lateStatus: "KHONG",
      lateHour: "00:00:00",
      totalLateHour: 0,
      absentStatus: labourAttendance.absentStatus,
      absentDate: labourAttendance.absentDate,
      absentReason: labourAttendance.absentReason,
      supportFarConstructionStatus: labourAttendance.supportFarConstructionStatus,
      supportTransportFeeStatus: labourAttendance.supportTransportFeeStatus,
      notOvertimeStatus: "KHONG",
      notOvertimeDate: null,
      uniformBreachStatus: "KHONG",
      uniformBreachDate: null,
      safetyBreachStatus: "KHONG",
      safetyBreachDate: null,
      constructionBreachStatus: "KHONG",
      constructionBreachDate: null,
      outTime: 1,
      createdUserId: currentUser.id,
      lastedUpdateUserId: currentUser.id ? currentUser.id : null,
      createdDate: moment(labourAttendance.createdDate).toISOString(),
      lastedUpdateDate: moment().toISOString(),
      minusLunchHour: minusLunchHour,
    };

    asyncRequests.post(url, bodyObject).then((result) => {
      if (result && result.id) {
        toast("Ch????m Gi???? V???? Th??nh C??ng!");
        history.push("/listLabourAttendanceForSupervisor");
        loadListLabourAttendanceForSupervisor(currentUser.id,startDateOfMonth,endDateOfMonth);
      } else {
        toast("L???i L??u tr???!");
        setShowToast(true);
      }
    });
  };
  //

  var optionOvertimeStatus = [
    { label: "T??ng Ca Ng??y Th?????ng (T???i)", value: "TANG_CA_THUONG_TOI" },
    { label: "T??ng Ca Khuya", value: "TANG_CA_KHUYA" }
  ];

  const [disabledButton, setDisabledButton] = useState(false);

  const checkValidate = ( endOvertime : any) => {

    var checkOvertimeTime = false;
    if (endOvertime >= "00:00" && endOvertime <= "15:59") {
      checkOvertimeTime = true
    }
    if (labourAttendance.overtimeStatus == "TANG_CA_THUONG_TOI" && (endOvertime > "22:00" || checkOvertimeTime == true)) {
      setDisabledButton(true);
      setEndOverTime1Error(true);
    }else{
      setDisabledButton(false);
      setEndOverTime1Error(false);
    }
  }


  return hasLoadLabourAttendance ? (
    <IonPage id="edituser-page">
      <IonHeader>
        <IonToolbar className="custom-toolbar">
          <IonButtons slot="start">
            <IonMenuButton className="c-white"></IonMenuButton>
          </IonButtons>
          <IonTitle className="c-white">Ch????m C??ng T??ng Ca</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form noValidate onSubmit={handleLabourAttendance}>
          <IonList>
            <IonItem>
              <IonLabel>
                <h2>T??n: {labourAttendance ? labourAttendance.labour.fullName : ""}</h2>
                <h2>C??ng vi????c: {labourAttendance ? labourAttendance.labour.title : ""}</h2>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
                T??n d???? a??n
              </IonLabel>
              <IonInput value={labourAttendance.project.name} disabled></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" color="success">
                T??n c??ng vi????c
              </IonLabel>
              <IonInput value={labourAttendance.projectDetail.name} disabled></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" color="success">
                Ng??y La??m vi????c (*)
              </IonLabel>
              <IonDatetime
                displayFormat="DD/MM/YYYY"
                placeholder="Ch???n Ng??y"
                value={labourAttendance.dateToWork}
                disabled
                onIonChange={(e) => setWorkDate(e.detail.value!)}
              ></IonDatetime>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
                <IonText color="primary">Tra??ng tha??i t??ng ca</IonText>
              </IonLabel>
              <IonSelect
                value={labourAttendance.overtimeStatus}
                placeholder="Ch???n Tr???ng Th??i"
                disabled
                onIonChange={(e) => {setOvertimeStatus(e.detail.value!)}}
              >
                {optionOvertimeStatus.map((option) => (
                  <IonSelectOption key={option.value} value={option.value}>
                    {option.label}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
              <IonText color="primary">Gi???? b????t ??????u t??ng ca (*)</IonText>
              </IonLabel>
              <IonInput
                type="text"
                value={moment(labourAttendance.startOvertime, 'HH:mm').format('HH:mm')}
                placeholder="18:00"
                disabled
                onIonChange={(e: any) => {
                  var valueStartOverTime: string = e.detail.value!;
                  if (valueStartOverTime.length == 2) {
                    setStartOverTime(valueStartOverTime + ":");
                  }
                  if (valueStartOverTime.length == 5) {
                    setStartOverTime(valueStartOverTime);
                  }
                }}
                ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" color="success">
                <IonText color="primary">Gi???? k????t thu??c t??ng ca (*)</IonText>
              </IonLabel>
              <IonInput
                type="text"
                value={endOvertime}
                placeholder="00:00"
                onIonChange={(e: any) => {
                  var valueEndTime: string = e.detail.value!;
                  if (valueEndTime.length == 2) {
                    setEndOverTime(valueEndTime + ":");
                  }
                  if (valueEndTime.length == 5) {
                    setEndOverTime(valueEndTime);
                    handleTotalOvertime(valueEndTime, minusLunchHour);
                    checkValidate(valueEndTime);
                  }
                }}
              ></IonInput>
            </IonItem>
            {formSubmitted && endOverTimeError && (
              <IonText color="danger">
                <p className="ion-padding-start">Vui L??ng Nh???p Gi???? K????t Thu??c T??ng Ca</p>
              </IonText>
            )}
            {endOverTime1Error && (
              <IonText color="danger">
                <p className="ion-padding-start">L??u ??: Gi??? v??? t??ng ca Th?????ng kh??ng ???????c l???n h??n 22:00.</p>
              </IonText>
            )}

            <IonItem>
              <IonLabel position="stacked" color="success">
                <IonText color="primary">T????ng gi???? t??ng ca</IonText>
              </IonLabel>
              <IonInput
                type="number"
                disabled
                value={totalOverTime}
                placeholder="T????ng gi???? la??m"
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" color="success">
                Th????i gian nghi??
              </IonLabel>
              <IonInput
                type="number"
                value={minusLunchHour}
                placeholder="Nh????p th????i gian nghi??"
                onIonChange={(e: any) => {setMinusLunchHour(e.detail.value!);handleTotalOvertime(endOvertime, e.detail.value!)}}
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" color="success">
                Ghi Chu??
              </IonLabel>
              <IonTextarea
                name="note"
                value={note}
                onIonChange={(e) => setNote(e.detail.value!)}
              ></IonTextarea>
            </IonItem>
          </IonList>

          <IonRow>
            <IonCol>
              <IonButton disabled={disabledButton} color="success" type="submit" expand="block">
                Ch????m C??ng T??ng Ca
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton routerLink="/listLabourAttendanceForSupervisor" color="light" expand="block">
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
  ) : null;
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapDispatchToProps: {
    loadListLabourAttendanceForSupervisor,
  },
  component: LabourAttendance,
});
