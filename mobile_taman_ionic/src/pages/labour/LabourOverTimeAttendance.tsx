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
  const [startOvertime, setStartOverTime] = useState("");
  const [startOverTimeError, setStartOverTimeError] = useState(false);
  const [startOverTime1Error, setStartOverTime1Error] = useState(false);
  const [startOverTime2Error, setStartOverTime2Error] = useState(false);
  const [startOverTime3Error, setStartOverTime3Error] = useState(false);
  const [createdDate, setCreatedDate] = useState(moment().toISOString());
  const [overtimeStatus, setOvertimeStatus] = useState("");
  const [overTimeStatusError, setOverTimeStatusError] = useState(false);
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
  const [isLoadLabour, setIsLoadLabour] = useState(false);

  const params : any = useParams();

  const currentUser = JSON.parse(localStorage._cap_currentUser);

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
        setIsLoadLabour(true)
      }
    });

  }, [params.labourId]);

  const handleLabourAttendance = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    var today = moment(new Date, "YYYY/MM/DD");

    if (moment(workDate) > moment(today)) {
      setWorkDateError(true);
    }
    if (!startOvertime) {
      setStartOverTimeError(true);
    }
    if (!overtimeStatus) {
      setOverTimeStatusError(true);
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
            projectId: project ? project : null,
            projectDetailId: projectDetail ? projectDetail : null,
            dateToWork: workDate,
            startDatetime: "00:00:00",
            endDatetime: "00:00:00",
            totalDatetime: 0,
            overtimeStatus: overtimeStatus,
            startOvertime: startOvertime ? startOvertime + ':00' : "00:00:00",
            endOvertime: "00:00:00",
            totalOvertime: 0,
            lateStatus: "KHONG",
            lateHour: "00:00:00",
            totalLateHour: 0,
            absentDate: null,
            supportFarConstructionStatus: "KHONG",
            supportTransportFeeStatus: "KHONG",
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
        loadListLabour();
      } else {
        toast("Lỗi lưu trữ");
        setShowToast(true);
      }
    });
  };

  var optionOvertimeStatus = [
    { label: "Tăng Ca Ngày Thường (Tối)", value: "TANG_CA_THUONG_TOI" },
    { label: "Tăng Ca Khuya", value: "TANG_CA_KHUYA" }
  ];
  var optionProjectDetail : any[] = [];
  var optionProject : any[] = [];

  dataProject.map((item : any) => {
    if(isLoadLabour){
      labour.companies.map((labourCompanies : any) => {
        if (item.projectYear.company.id == labourCompanies.id && item.projectStatus == 'DANG_THUC_THI'){
          optionProject.push({ label: item.projectYear.company.name + " - " + item.name, id: item.id });
        }
      })
    }
  })

  if(loadEfficiency){
    dataEfficiency.map((item:any)  => {
      if(item.projectDetail.project.id == project){
        optionProjectDetail.push({label:item.projectDetail.name,id:item.projectDetail.id});
        }
    })
  }

  const [disabledButtonIfFuture, setDisabledButtonIfFuture] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const [workDate1Error, setWorkDate1Error] = useState(false);

  const resetStartOverTime = () => {
    setStartOverTime("");
  }

  const checkValidate = (selectedWork : any, startOverTime : any) => {
    var futureDate = moment(selectedWork, 'DD-MM-YYYY');
    var todayDate = moment(new Date().toISOString(), 'DD-MM-YYYY');
        // todayDate = todayDate.subtract(1, "days");
    var dDiff = todayDate.diff(futureDate);

    //Nếu nhỏ hơn 0 là ngày trong tương lai
    if (dDiff < 0){
      setDisabledButtonIfFuture(true);
      setWorkDate1Error(true);
    }else{
      setDisabledButtonIfFuture(false);
      setWorkDate1Error(false);
    }

    var checkMidnightTime = false;
    if (overtimeStatus == "TANG_CA_THUONG_TOI") {
      if(startOverTime < "18:00"){
        setDisabledButton(true);
        setStartOverTime1Error(true);
      }else if(startOverTime == "22:00" || startOverTime > "22:00"){
        setDisabledButton(true);
        setStartOverTime2Error(true);
      }else{
        setDisabledButton(false);
        setStartOverTimeError(false);
        setStartOverTime1Error(false);
        setStartOverTime2Error(false);
      }
    }else if(overtimeStatus == "TANG_CA_KHUYA"){
      if (startOverTime >= "00:00" && startOverTime < "04:30") {
        checkMidnightTime = true;
      }
      if(startOverTime < "22:00" && checkMidnightTime == false){
        setDisabledButton(true);
        setStartOverTime3Error(true);
      }else{
        setDisabledButton(false);
        setStartOverTime3Error(false);
      }
    }
  }

  return  (
    <IonPage id="edituser-page">
      <IonHeader>
        <IonToolbar className='custom-toolbar'>
          <IonButtons slot="start">
            <IonMenuButton className='c-white'></IonMenuButton>
          </IonButtons>
          <IonTitle className='c-white'>Chấm Công Tăng Ca</IonTitle>
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
                {optionProject
                  ? optionProject.map((data: any, index: number) => (
                      <IonSelectOption key={data.id} value={data.id}>
                        {data.label}
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
                onIonChange={(e) => {setWorkDate(e.detail.value!); checkValidate(e.detail.value!, startOvertime);}}
              ></IonDatetime>
            </IonItem>
            {formSubmitted && workDateError && (
              <IonText color="danger">
                <p className="ion-padding-start">Không được chấm công ngày tương lai!, vui lòng thử lại!</p>
              </IonText>
            )}
            {workDate1Error && (
              <IonText color="danger">
                <p className="ion-padding-start">
                Không được chọn ngày trong tương lai! Vui lòng chọn lại!
                </p>
              </IonText>
            )}
            <IonItem>
              <IonLabel position="stacked" color="success">
                <IonText color="primary">Trạng thái tăng ca</IonText>
              </IonLabel>
              <IonSelect
                value={overtimeStatus}
                placeholder="Chọn Trạng Thái"
                onIonChange={(e) => {setOvertimeStatus(e.detail.value!); checkValidate(workDate,startOvertime); resetStartOverTime()}}
              >
                {optionOvertimeStatus.map((option) => (
                  <IonSelectOption key={option.value} value={option.value}>
                    {option.label}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            {formSubmitted && overTimeStatusError && (
              <IonText color="danger">
                <p className="ion-padding-start">Vui lòng nhập trạng thái tăng ca.</p>
              </IonText>
            )}
            <IonItem>
              <IonLabel position="stacked" color="success">
              <IonText color="primary">Giờ bắt đầu tăng ca (*)</IonText>
              </IonLabel>
              <IonInput
                type="text"
                value={startOvertime}
                placeholder="18:00"
                onIonChange={(e: any) => {
                  var valueStartOverTime: string = e.detail.value!;
                  if (valueStartOverTime.length == 2) {
                    setStartOverTime(valueStartOverTime + ":");
                  }
                  if (valueStartOverTime.length == 5) {
                    setStartOverTime(valueStartOverTime);
                    checkValidate(workDate,valueStartOverTime)
                  }
                }}
                ></IonInput>
            </IonItem>
            {formSubmitted && startOverTimeError && (
              <IonText color="danger">
                <p className="ion-padding-start">Vui lòng nhập giờ bắt đầu tăng ca.</p>
              </IonText>
            )}
            {startOverTime1Error && (
              <IonText color="danger">
                <p className="ion-padding-start">Lưu ý: Giờ tăng ca thường chỉ được xét vào lúc 18:00 giờ trở về sau. </p>
              </IonText>
            )}
            {startOverTime2Error && (
              <IonText color="danger">
                <p className="ion-padding-start">Lưu ý: Giờ bắt đầu tăng ca Thường không được lớn hơn hoặc bằng 22:00</p>
              </IonText>
            )}
            {startOverTime3Error && (
              <IonText color="danger">
                <p className="ion-padding-start">Lưu ý: Giờ bắt đầu tăng ca KHUYA chỉ được xét vào lúc 22:00 giờ trở về sau.</p>
              </IonText>
            )}
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
              <IonButton disabled={disabledButton || disabledButtonIfFuture} color='success' type="submit" expand="block">
                Chấm Công Tăng Ca
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
