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
  const [project, setProject] = useState(Object);
  const [workDate, setWorkDate] = useState("");
  const [startDateTime, setStartDateTime] = useState<string>("");
  const [endDateTime, setEndDateTime] = useState<string>("");
  const [endDateTimeError, setEndDateTimeError] = useState(false);
  const [totalDateTime, setTotalDateTime] = useState<any>();
  const [minusLunchHour, setMinusLunchHour] = useState<any>(0);
  const [farConstructionStatus, setFarConstructionStatus] = useState("KHONG");
  const [transportFeeStatus, setTransportFeeStatus] = useState("KHONG");
  const [note, setNote] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [messageResult, setMessageResult] = useState("");

  const [dataEfficiency, setDataEfficiency] = useState([]);
  const [loadEfficiency, setLoadEfficiency] = useState(false);

  // const { labourId } = useParams();
  const params: any = useParams();

  const currentUser = JSON.parse(localStorage._cap_currentUser);

  useEffect(() => {
    loadLabourAttendanceById(params.labourId).then((labourAttendance: any) => {
      if (labourAttendance) {
        setLabourAttendance(labourAttendance);
        setHasLoadLabourAttendance(true);
      }
    });
  }, []);

  const handleTotalNormalWorkTime = (valueEndTime: any, minusLunchHour: any) => {

    var startTime = moment(labourAttendance.startDatetime, 'HH:mm');
    var endTime = moment(valueEndTime, 'HH:mm');

    var hours = moment(endTime).diff(startTime, "minutes") / 60;

    if (hours && hours >= 0) {
      setTotalDateTime(FormatterUtils.round2Decimals(hours - minusLunchHour));
    } else {
      setTotalDateTime(0);
    }
  };

  const handleLabourAttendance = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);

    var today = new Date();
    var startDateOfMonth = moment(startOfMonth(today)).format("YYYY-MM-DD-HH:mm:ss");
    var endDateOfMonth = moment(lastDayOfMonth(today)).format("YYYY-MM-DD-HH:mm:ss");

    if (!endDateTime) {
      setEndDateTimeError(true);
    }

    var url = "/labourAttendance/update";
    var bodyObject = {
      id: parseInt(params.labourId),
      labourId: labourAttendance.labourId,
      projectId: labourAttendance.project.id,
      projectDetailId: labourAttendance.projectDetail.id,
      dateToWork: moment(labourAttendance.dateToWork).toISOString(),
      startDatetime: startDateTime == "" ? labourAttendance.startDatetime : startDateTime,
      endDatetime: endDateTime ? moment(endDateTime, "HH:mm").format("HH:mm:ss") : "00:00:00",
      totalDatetime: totalDateTime ? totalDateTime : 0,
      session: labourAttendance.session,
      overtimeStatus: labourAttendance.overtimeStatus,
      startOvertime: "00:00:00",
      endOvertime: "00:00:00",
      totalOvertime: 0,
      lateStatus: labourAttendance.lateStatus,
      lateHour: "00:00:00",
      totalLateHour: 0,
      absentStatus: labourAttendance.absentStatus,
      absentDate: labourAttendance.absentDate,
      absentReason: labourAttendance.absentReason,
      supportFarConstructionStatus: farConstructionStatus,
      supportTransportFeeStatus: transportFeeStatus,
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
        history.push("/tabs/listLabourAttendanceForSupervisor");
        loadListLabourAttendanceForSupervisor(currentUser.id,startDateOfMonth,endDateOfMonth);
      } else {
        // setMessageResult("L???i L??u tr???!");
        toast("L???i L??u tr???!");
        setShowToast(true);
      }
    });
  };
  //

  var optionFarConstructionStatus = [
    { label: "C??", value: "CO" },
    { label: "Kh??ng", value: "KHONG" },
  ];
  var optionTransportFeeStatus = [
    { label: "C??", value: "CO" },
    { label: "Kh??ng", value: "KHONG" },
  ];
  var optionLateStatus = [
    { label: "C??", value: "CO" },
    { label: "Kh??ng", value: "KHONG" },
  ];
  var optionProjectDetail: any[] = [];

  if (loadEfficiency) {
    dataEfficiency.map((item: any) => {
      if (item.projectDetail.project.id == project.id) {
        optionProjectDetail.push({
          label: item.projectDetail.name,
          id: item.projectDetail.id,
        });
      }
    });
  }
  // console.log(labour);
  return hasLoadLabourAttendance ? (
    <IonPage id="edituser-page">
      <IonHeader>
        <IonToolbar className="custom-toolbar">
          <IonButtons slot="start">
            <IonMenuButton className="c-white"></IonMenuButton>
          </IonButtons>
          <IonTitle className="c-white">Ch????m C??ng Nh??n C??ng</IonTitle>
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
                Gi???? b????t ??????u (*)
              </IonLabel>
              <IonInput
                type="text"
                disabled
                value={moment(labourAttendance.startDatetime, 'HH:mm').format('HH:mm')}
                placeholder="00:00"
                onIonChange={(e: any) => {
                  var valueStartTime: string = e.detail.value!;
                  if (valueStartTime.length == 2) {
                    setStartDateTime(valueStartTime + ":");
                  }
                  if (valueStartTime.length == 5) {
                    setStartDateTime(valueStartTime);
                  }
                }}
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" color="success">
                Gi???? k????t thu??c (*)
              </IonLabel>
              <IonInput
                type="text"
                value={endDateTime}
                placeholder="00:00"
                onIonChange={(e: any) => {
                  var valueEndTime: string = e.detail.value!;
                  if (valueEndTime.length == 2) {
                    setEndDateTime(valueEndTime + ":");
                  }
                  if (valueEndTime.length == 5) {
                    setEndDateTime(valueEndTime);
                    handleTotalNormalWorkTime(valueEndTime, minusLunchHour)
                  }
                }}
              ></IonInput>
            </IonItem>
            {formSubmitted && endDateTimeError && (
              <IonText color="danger">
                <p className="ion-padding-start">Vui L??ng Nh???p Gi???? K????t Thu??c</p>
              </IonText>
            )}

            <IonItem>
              <IonLabel position="stacked" color="success">
                T????ng gi???? la??m
              </IonLabel>
              {/* <IonInput type="number" value={labour.totalDatetime} placeholder="Nh????p t????ng gi???? la??m" onIonInput={(e: any) => setTotalDateTime(e.target.value)}></IonInput> */}
              <IonInput
                type="number"
                disabled
                value={totalDateTime}
                placeholder="Nh????p t????ng gi???? la??m"
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
                onIonChange={(e: any) => {setMinusLunchHour(e.detail.value!);handleTotalNormalWorkTime(endDateTime, e.detail.value!)}}
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" color="success">
                H???? Tr???? C??ng Tri??nh Xa
              </IonLabel>
              <IonSelect
                value={farConstructionStatus}
                placeholder="Ch???n Tr???ng Th??i"
                onIonChange={(e) => setFarConstructionStatus(e.detail.value!)}
              >
                {optionFarConstructionStatus.map((option) => (
                  <IonSelectOption key={option.value} value={option.value}>
                    {option.label}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" color="success">
                H???? Tr???? Chi Phi?? ??i La??i
              </IonLabel>
              <IonSelect
                value={transportFeeStatus}
                placeholder="Ch???n Tr???ng Th??i"
                onIonChange={(e) => setTransportFeeStatus(e.detail.value!)}
              >
                {optionTransportFeeStatus.map((option) => (
                  <IonSelectOption key={option.value} value={option.value}>
                    {option.label}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" color="success">
                ??i Tr????
              </IonLabel>
              <IonInput value={labourAttendance.lateStatus} disabled></IonInput>
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
              <IonButton color="success" type="submit" expand="block">
                Ch????m C??ng
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton routerLink="/tabs/listLabourAttendanceForSupervisor" color="light" expand="block">
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
