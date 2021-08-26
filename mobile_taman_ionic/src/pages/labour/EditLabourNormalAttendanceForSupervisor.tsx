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
        toast("Chấm Giờ Về Thành Công!");
        history.push("/tabs/listLabourAttendanceForSupervisor");
        loadListLabourAttendanceForSupervisor(currentUser.id,startDateOfMonth,endDateOfMonth);
      } else {
        // setMessageResult("Lỗi Lưu trữ!");
        toast("Lỗi Lưu trữ!");
        setShowToast(true);
      }
    });
  };
  //

  var optionFarConstructionStatus = [
    { label: "Có", value: "CO" },
    { label: "Không", value: "KHONG" },
  ];
  var optionTransportFeeStatus = [
    { label: "Có", value: "CO" },
    { label: "Không", value: "KHONG" },
  ];
  var optionLateStatus = [
    { label: "Có", value: "CO" },
    { label: "Không", value: "KHONG" },
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
          <IonTitle className="c-white">Chấm Công Nhân Công</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form noValidate onSubmit={handleLabourAttendance}>
          <IonList>
            <IonItem>
              <IonLabel>
                <h2>Tên: {labourAttendance ? labourAttendance.labour.fullName : ""}</h2>
                <h2>Công việc: {labourAttendance ? labourAttendance.labour.title : ""}</h2>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
                Tên dự án
              </IonLabel>
              <IonInput value={labourAttendance.project.name} disabled></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" color="success">
                Tên công việc
              </IonLabel>
              <IonInput value={labourAttendance.projectDetail.name} disabled></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" color="success">
                Ngày Làm việc (*)
              </IonLabel>
              <IonDatetime
                displayFormat="DD/MM/YYYY"
                placeholder="Chọn Ngày"
                value={labourAttendance.dateToWork}
                disabled
                onIonChange={(e) => setWorkDate(e.detail.value!)}
              ></IonDatetime>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" color="success">
                Giờ bắt đầu (*)
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
                Giờ kết thúc (*)
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
                <p className="ion-padding-start">Vui Lòng Nhập Giờ Kết Thúc</p>
              </IonText>
            )}

            <IonItem>
              <IonLabel position="stacked" color="success">
                Tổng giờ làm
              </IonLabel>
              {/* <IonInput type="number" value={labour.totalDatetime} placeholder="Nhập tổng giờ làm" onIonInput={(e: any) => setTotalDateTime(e.target.value)}></IonInput> */}
              <IonInput
                type="number"
                disabled
                value={totalDateTime}
                placeholder="Nhập tổng giờ làm"
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" color="success">
                Thời gian nghỉ
              </IonLabel>
              <IonInput
                type="number"
                value={minusLunchHour}
                placeholder="Nhập thời gian nghỉ"
                onIonChange={(e: any) => {setMinusLunchHour(e.detail.value!);handleTotalNormalWorkTime(endDateTime, e.detail.value!)}}
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" color="success">
                Hỗ Trợ Công Trình Xa
              </IonLabel>
              <IonSelect
                value={farConstructionStatus}
                placeholder="Chọn Trạng Thái"
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
                Hỗ Trợ Chi Phí Đi Lại
              </IonLabel>
              <IonSelect
                value={transportFeeStatus}
                placeholder="Chọn Trạng Thái"
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
                Đi Trễ
              </IonLabel>
              <IonInput value={labourAttendance.lateStatus} disabled></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" color="success">
                Ghi Chú
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
                Chấm Công
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton routerLink="/tabs/listLabourAttendanceForSupervisor" color="light" expand="block">
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
  ) : null;
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapDispatchToProps: {
    loadListLabourAttendanceForSupervisor,
  },
  component: LabourAttendance,
});
