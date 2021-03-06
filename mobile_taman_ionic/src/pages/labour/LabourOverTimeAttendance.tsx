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
    //Ki????m Tra Field Project co?? tr????ng kh??ng.
    if (Object.keys(project).length === 0 && project.constructor === Object) {
      setProjectError(true);
    }
    //Ki????m Tra Field ProjectDetail co?? tr????ng kh??ng.
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
        toast("Ch????m C??ng Th??nh C??ng!");
        history.push("/tabs/listLabour");
        loadListLabour();
      } else {
        toast("L????i l??u tr????");
        setShowToast(true);
      }
    });
  };

  var optionOvertimeStatus = [
    { label: "T??ng Ca Ng??y Th?????ng (T???i)", value: "TANG_CA_THUONG_TOI" },
    { label: "T??ng Ca Khuya", value: "TANG_CA_KHUYA" }
  ];
  var optionProjectDetail : any[] = [];
  var optionProject : any[] = [];

  dataProject.map((item : any) => {
    if(isLoadLabour){
      labour.companies.map((labourCompanies : any) => {
        if (item.projectYear.company.id == labourCompanies.id && item.projectStatus == 'DANG_THUC_THI'){
          optionProject.push({ label: item.name, id: item.id });
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

    //N????u nho?? h??n 0 la?? nga??y trong t????ng lai
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
          <IonTitle className='c-white'>Ch????m C??ng T??ng Ca</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form noValidate onSubmit={handleLabourAttendance}>
          <IonList>
            <IonItem>
              <IonLabel>
                <h2>T??n: {labour ? labour.fullName : ""}</h2>
                <h2>C??ng vi????c: {labour ? labour.title : ""}</h2>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
                T??n d???? a??n
              </IonLabel>
              <IonSelect
                value={project}
                placeholder="Ch???n T??n D???? A??n"
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
                <p className="ion-padding-start">Vui L??ng Cho??n D???? A??n Ch????m C??ng</p>
              </IonText>
            )}
            <IonItem>
              <IonLabel position="stacked" color="success">
                T??n c??ng vi????c
              </IonLabel>
              <IonSelect
                value={projectDetail}
                placeholder="Ch???n C??ng Vi????c"
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
                <p className="ion-padding-start">Vui L??ng Cho??n C??ng Vi????c D???? A??n</p>
              </IonText>
            )}
            <IonItem>
              <IonLabel position="stacked" color="success">
                Ng??y La??m vi????c (*)
              </IonLabel>
              <IonDatetime
                displayFormat="DD/MM/YYYY"
                placeholder="Ch???n Ng??y"
                value={workDate}
                onIonChange={(e) => {setWorkDate(e.detail.value!); checkValidate(e.detail.value!, startOvertime);}}
              ></IonDatetime>
            </IonItem>
            {formSubmitted && workDateError && (
              <IonText color="danger">
                <p className="ion-padding-start">Kh??ng ???????c ch???m c??ng ng??y t????ng lai!, vui l??ng th??? l???i!</p>
              </IonText>
            )}
            {workDate1Error && (
              <IonText color="danger">
                <p className="ion-padding-start">
                Kh??ng ????????c cho??n nga??y trong t????ng lai! Vui lo??ng cho??n la??i!
                </p>
              </IonText>
            )}
            <IonItem>
              <IonLabel position="stacked" color="success">
                <IonText color="primary">Tra??ng tha??i t??ng ca</IonText>
              </IonLabel>
              <IonSelect
                value={overtimeStatus}
                placeholder="Ch???n Tr???ng Th??i"
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
                <p className="ion-padding-start">Vui l??ng nh???p tra??ng tha??i t??ng ca.</p>
              </IonText>
            )}
            <IonItem>
              <IonLabel position="stacked" color="success">
              <IonText color="primary">Gi???? b????t ??????u t??ng ca (*)</IonText>
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
                <p className="ion-padding-start">Vui l??ng nh???p gi??? b???t ?????u t??ng ca.</p>
              </IonText>
            )}
            {startOverTime1Error && (
              <IonText color="danger">
                <p className="ion-padding-start">L??u ??: Gi??? t??ng ca th?????ng ch??? ???????c x??t v??o l??c 18:00 gi??? tr??? v??? sau. </p>
              </IonText>
            )}
            {startOverTime2Error && (
              <IonText color="danger">
                <p className="ion-padding-start">L??u ??: Gi??? b???t ?????u t??ng ca Th?????ng kh??ng ???????c l???n h??n ho???c b???ng 22:00</p>
              </IonText>
            )}
            {startOverTime3Error && (
              <IonText color="danger">
                <p className="ion-padding-start">L??u ??: Gi??? b???t ?????u t??ng ca KHUYA ch??? ???????c x??t v??o l??c 22:00 gi??? tr??? v??? sau.</p>
              </IonText>
            )}
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

            <IonItem>
              <IonLabel position="stacked" color="success">
                Ng??y ta??o ba??ng
              </IonLabel>
              <IonDatetime
                displayFormat="DD/MM/YYYY"
                placeholder="Ch???n Ng??y"
                value={createdDate}
                onIonChange={(e) => setCreatedDate(e.detail.value!)}
                disabled
              ></IonDatetime>
            </IonItem>
          </IonList>

          <IonRow>
            <IonCol>
              <IonButton disabled={disabledButton || disabledButtonIfFuture} color='success' type="submit" expand="block">
                Ch????m C??ng T??ng Ca
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton routerLink="/tabs/listLabour" color="light" expand="block">
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
  mapDispatchToProps: {
    loadListLabour,
  },
  component: LabourAttendance,
});
