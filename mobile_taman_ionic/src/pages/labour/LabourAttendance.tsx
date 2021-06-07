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
import { loadListLabour } from "./listLabour.actions";
import { Labour } from "./Labour";
import moment from "moment";
import { Plugins } from "@capacitor/core";
import { toast } from "../../toast";
import { loadProject, loadListEfficiency, loadLabourById } from "./labourConfig";


interface OwnProps extends RouteComponentProps {}

interface StateProps {
  listLabourOptions: Labour[];
}

interface DispatchProps {
  loadListLabour: typeof loadListLabour;
}

type LabourAttendanceProps = OwnProps & StateProps & DispatchProps;

const LabourAttendance: React.FC<LabourAttendanceProps> = ({
  loadListLabour,
  history,
}) => {

  const [project, setProject] = useState(Object);
  const [projectError, setProjectError] = useState(false);
  const [workDate, setWorkDate] = useState(moment().toISOString());
  const [workDateError, setWorkDateError] = useState(false);
  const [startDateTime, setStartDateTime] = useState("");
  const [startDateTimeError, setStartDateTimeError] = useState(false);
  const [createdDate, setCreatedDate] = useState(moment().toISOString());
  const [farConstructionStatus, setFarConstructionStatus] = useState("KHONG");
  const [transportFeeStatus, setTransportFeeStatus] = useState("KHONG");
  const [lateStatus, setLateStatus] = useState("KHONG");
  const [note, setNote] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [messageResult, setMessageResult] = useState("");

  const [dataProject, setDataProject] = useState([]);
  const [projectDetail, setProjectDetail] = useState(Object);
  const [projectDetailError, setProjectDetailError] = useState(false);
  const [dataEfficiency, setDataEfficiency] = useState([]);
  const [loadEfficiency, setLoadEfficiency] = useState(false);
  const [labour, setLabour] = useState(Object);

  // const { labourId } = useParams();
  const params : any = useParams();

  const currentUser = JSON.parse(localStorage._cap_currentUser);

  const handleCheckLate = (startTime : any) => {
    var standardHour = '0815';
    var startDatetime = startTime.replace(":", "");
    if (parseInt(startDatetime) > parseInt(standardHour)) {
      setLateStatus("CO")
    } else {
      setLateStatus("KHONG")
    }
  }

  useEffect(() => {
    loadProject().then((project: any) => {
      if (project) {
        setDataProject(project);
      }
    });
    loadListEfficiency().then((efficiency: any) => {
      if (efficiency) {
        setDataEfficiency(efficiency);
        setLoadEfficiency(true);
      }
    });
    loadLabourById(params.labourId).then((labour: any) => {
      if (labour) {
        setLabour(labour);
      }
    });

  }, []);

  const handleLabourAttendance = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    var today = moment(new Date, "YYYY/MM/DD");

    if (moment(workDate) > moment(today)) {
      setWorkDateError(true);
    }
    if (!startDateTime) {
      setStartDateTimeError(true);
    }
    //Kiểm Tra Field Project có trống không.
    if (Object.keys(project).length === 0 && project.constructor === Object) {
      setProjectError(true);
    }
    //Kiểm Tra Field ProjectDetail có trống không.
    if (Object.keys(projectDetail).length === 0 && projectDetail.constructor === Object) {
      setProjectDetailError(true);
    }

    var url = "/labourAttendance/add";
    var bodyObject = {
            labourId: parseInt(params.labourId),
            projectId: project ? project.id : null,
            projectDetailId: projectDetail ? projectDetail : null,
            dateToWork: workDate,
            startDatetime: startDateTime ? moment(startDateTime, "HH:mm").format("HH:mm:ss") : "00:00:00",
            endDatetime: "00:00:00",
            totalDatetime: 0,
            // session: values.session,
            // overtimeStatus: values.overtimeStatus,
            startOvertime: "00:00:00",
            endOvertime: "00:00:00",
            totalOvertime: 0,
            lateStatus: lateStatus,
            lateHour: "00:00:00",
            totalLateHour: 0,
            absentDate: null,
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
            outTime: 0,
            createdUserId: currentUser.id,
            lastedUpdateUserId: currentUser.id ? currentUser.id : null,
            createdDate: createdDate,
            lastedUpdateDate: createdDate,
            minusLunchHour: 0
    };

    asyncRequests.post(url, bodyObject).then((result) => {
      if (result && result.id) {
        toast("Chấm Công Thành Công!");
        history.push("/listLabour");
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
  var optionProjectDetail : any[] = [];

  if(loadEfficiency){
    dataEfficiency.map((item:any)  => {
      if(item.projectDetail.project.id== project.id){
        optionProjectDetail.push({label:item.projectDetail.name,id:item.projectDetail.id});
        }
    })
  }

  return  (
    <IonPage id="edituser-page">
      <IonHeader>
        <IonToolbar className='custom-toolbar'>
          <IonButtons slot="start">
            <IonMenuButton className='c-white'></IonMenuButton>
          </IonButtons>
          <IonTitle className='c-white'>Chấm Công Nhân Công</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form noValidate onSubmit={handleLabourAttendance}>
          <IonList>
            <IonItem>
              <IonLabel>
                <h2>Tên: {labour ? labour.fullName : ""}</h2>
                <h2>Công việc: {labour ? labour.title : ""}</h2>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
                Tên dự án
              </IonLabel>
              <IonSelect
                value={project}
                placeholder="Chọn Tên Dự Án"
                onIonChange={(e) => setProject(e.detail.value!)}
              >
                {dataProject
                  ? dataProject.map((data: any, index: number) => (
                      <IonSelectOption key={data.id} value={data}>
                        {data.name}
                      </IonSelectOption>
                    ))
                  : null}
              </IonSelect>
            </IonItem>
            {formSubmitted && projectError && (
              <IonText color="danger">
                <p className="ion-padding-start">Vui Lòng Chọn Dự Án Chấm Công</p>
              </IonText>
            )}
            <IonItem>
              <IonLabel position="stacked" color="success">
                Tên công việc
              </IonLabel>
              <IonSelect
                value={projectDetail}
                placeholder="Chọn Công Việc"
                onIonChange={(e) => setProjectDetail(e.detail.value!)}
              >
                {optionProjectDetail.map((option:any) => (
                  <IonSelectOption key={option.id} value={option.id}>
                    {option.label}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            {formSubmitted && projectDetailError && (
              <IonText color="danger">
                <p className="ion-padding-start">Vui Lòng Chọn Công Việc Dự Án</p>
              </IonText>
            )}
            <IonItem>
              <IonLabel position="stacked" color="success">
                Ngày Làm việc (*)
              </IonLabel>
              <IonDatetime
                displayFormat="DD/MM/YYYY"
                placeholder="Chọn Ngày"
                value={workDate}
                onIonChange={(e) => setWorkDate(e.detail.value!)}
              ></IonDatetime>
            </IonItem>
            {formSubmitted && workDateError && (
              <IonText color="danger">
                <p className="ion-padding-start">Không được chấm công ngày tương lai!, vui lòng thử lại!</p>
              </IonText>
            )}

            <IonItem>
              <IonLabel position="stacked" color="success">
                Giờ bắt đầu (*)
              </IonLabel>
              {/* <IonDatetime
                displayFormat="HH:mm"
                placeholder="Chọn Giờ"
                value={startDateTime}
                onIonChange={(e) => {setStartDateTime(e.detail.value!);handleCheckLate(e.detail.value!)}}
              ></IonDatetime> */}
              <IonInput
                type="text"
                value={startDateTime}
                placeholder="00:00"
                onIonChange={(e: any) => {
                  var valueStartTime: string = e.detail.value!;
                  if (valueStartTime.length == 2) {
                    setStartDateTime(valueStartTime + ":");
                  }
                  if (valueStartTime.length == 5) {
                    setStartDateTime(valueStartTime);
                    handleCheckLate(valueStartTime)
                  }
                }}
                ></IonInput>
            </IonItem>
            {formSubmitted && startDateTimeError && (
              <IonText color="danger">
                <p className="ion-padding-start">Vui Lòng Nhập Giờ Bắt Đầu</p>
              </IonText>
            )}

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
              <IonSelect
                value={lateStatus}
                placeholder="Chọn Trạng Thái"
                disabled
                onIonChange={(e) => setLateStatus(e.detail.value!)}
              >
                {optionLateStatus.map((option) => (
                  <IonSelectOption key={option.value} value={option.value}>
                    {option.label}
                  </IonSelectOption>
                ))}
              </IonSelect>
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

            <IonItem>
              <IonLabel position="stacked" color="success">
                Người Chấm Công
              </IonLabel>
              <IonInput value={currentUser.fullName} disabled></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" color="success">
                Ngày tạo bảng
              </IonLabel>
              <IonDatetime
                displayFormat="DD/MM/YYYY"
                placeholder="Chọn Ngày"
                value={createdDate}
                onIonChange={(e) => setCreatedDate(e.detail.value!)}
                disabled
              ></IonDatetime>
            </IonItem>
          </IonList>

          <IonRow>
            <IonCol>
              <IonButton color='success' type="submit" expand="block">
                Chấm Công
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton routerLink="/listLabour" color="light" expand="block">
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
  mapDispatchToProps: {
    loadListLabour,
  },
  component: LabourAttendance,
});
