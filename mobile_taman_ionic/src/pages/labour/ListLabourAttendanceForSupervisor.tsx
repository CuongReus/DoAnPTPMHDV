import React, { useState, useRef, useEffect } from "react";
import {
  IonToolbar,
  IonContent,
  IonPage,
  IonButtons,
  IonMenuButton,
  IonSearchbar,
  IonRefresher,
  IonRefresherContent,
  IonModal,
  IonHeader,
  getConfig,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
  IonItemSliding,
  IonAvatar,
  IonPopover,
  IonLoading,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { connect } from "../../data/connect";
import "../ListPage.scss";
import "../EditPage.scss";
import startOfMonth from "date-fns/startOfMonth";
import lastDayOfMonth from "date-fns/lastDayOfMonth";
import moment from "moment";
import * as labourselectors from "./LabourSelectors";
import { setSearchText } from "../../data/sessions/sessions.actions";
import { Labour } from "./Labour";
import { loadListLabourAttendanceForSupervisor } from "./listLabour.actions";
import { RouteComponentProps } from "react-router";

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  listLaboursForSupervisor: Labour[];
  mode: "ios" | "md";
}

interface DispatchProps {
  setSearchText: typeof setSearchText;
  loadListLabourAttendanceForSupervisor: typeof loadListLabourAttendanceForSupervisor;
}

type ListLabourAttendanceForSupervisorPageProps = OwnProps &
  StateProps &
  DispatchProps;

const ListLabourAttendanceForSupervisorPage: React.FC<ListLabourAttendanceForSupervisorPageProps> =
  ({
    listLaboursForSupervisor,
    setSearchText,
    loadListLabourAttendanceForSupervisor,
    mode,
  }) => {
    const [showFilterModal, setShowFilterModal] = useState(false);
    const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);
    const [showCompleteToast, setShowCompleteToast] = useState(false);
    const [showPopover, setShowPopover] = useState(false);
    const [dataMonth, setDataMonth] = useState(Object);
    const currentUser = JSON.parse(localStorage._cap_currentUser);


    var today = new Date();
    var monthsArray = []

  for (var i:number = 0; i < 3; i++) {
    monthsArray.push({
      label: "Tháng" + " " + (today.getMonth() + 1 - i),
      value: (today.getMonth() - i)
    });
  }

  //Kiểm tra mảng tháng có rỗng không? Mặc định khi chưa chọn Select
  if(Object.keys(dataMonth).length === 0 && dataMonth.constructor === Object) {
    var startDateOfMonth = moment(startOfMonth(today)).format("YYYY-MM-DD-HH:mm:ss");
    var endDateOfMonth = moment(lastDayOfMonth(today)).format("YYYY-MM-DD-HH:mm:ss");
  }else{
    var pastDay = moment().month(dataMonth).toDate();
    var startDateOfMonth = moment(startOfMonth(pastDay)).format("YYYY-MM-DD-HH:mm:ss");
    var endDateOfMonth = moment(lastDayOfMonth(pastDay)).format("YYYY-MM-DD-HH:mm:ss");
  }

    const doRefresh = () => {
      setTimeout(() => {
        ionRefresherRef.current!.complete();
        setShowCompleteToast(true);
      }, 1000);
    };

    useEffect(() => {
      loadListLabourAttendanceForSupervisor(currentUser.id,startDateOfMonth,endDateOfMonth);
    }, [startDateOfMonth, endDateOfMonth]);

    return (
      <IonPage id="list-user-page" className="list-page">
        <IonHeader>
          <IonToolbar className="custom-toolbar">
            <IonButtons slot="start">
              <IonMenuButton className="c-white" />
            </IonButtons>

            <IonTitle className="c-white">Thuộc Về Giám Sát</IonTitle>
          </IonToolbar>

          <IonToolbar className="custom-toolbar">
            <IonSearchbar
              className="custom-search"
              placeholder="Tìm tên, phone,..."
              onIonChange={(e: any) => setSearchText(e.detail.value)}
            />
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <IonRefresher
            slot="fixed"
            ref={ionRefresherRef}
            onIonRefresh={doRefresh}
          >
            <IonRefresherContent />
          </IonRefresher>
          <IonLoading
            message="Vui lòng chờ trong giây lát..."
            duration={0}
            isOpen={listLaboursForSupervisor ? false : true}
          />
          <IonItem lines="full" className="custom-item">
          <span style={{marginRight: 'auto'}}>Bộ lọc</span>
          <IonSelect
                value={dataMonth}
                placeholder="Tháng hiện tại"
                onIonChange={(e) => setDataMonth(e.detail.value!)}
              >
                {monthsArray.map((option:any) => (
                  <IonSelectOption key={option.value} value={option.value}>
                    {option.label}
                  </IonSelectOption>
                ))}
              </IonSelect>
          </IonItem>
          <IonList>
            {listLaboursForSupervisor &&
              listLaboursForSupervisor.map((item: any) => (
                <IonItemSliding key={item.id}>
                  <IonItem routerLink={`/editLabourAttendance/${item.id}`}>
                    <IonAvatar slot="start">
                      {/* <img src={`/assets/img/${user.id}`} /> */}
                      <img src="/assets/img/person-circle-outline.svg" />
                    </IonAvatar>

                    <IonLabel>
                      <h3>{item.labour.fullName}</h3>
                      <p>Dự Án Làm Việc: {item.project.name}</p>
                      <p>Ngày Làm Việc: {item.dateToWork}</p>
                      <p>Giờ Bắt Đầu Làm: {item.startDatetime}</p>
                      <p>Giờ Kết Thúc Làm: {item.endDatetime}</p>
                      <p>Số điện thoại: {item.labour.phone}</p>
                    </IonLabel>
                  </IonItem>
                  <IonPopover
                    isOpen={showPopover}
                    cssClass=""
                    onDidDismiss={(e) => setShowPopover(false)}
                  >
                    <p>This is popover content</p>
                  </IonPopover>
                </IonItemSliding>
              ))}
          </IonList>
        </IonContent>

        <IonModal
          isOpen={showFilterModal}
          onDidDismiss={() => setShowFilterModal(false)}>
        </IonModal>
      </IonPage>
    );
  };

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    listLaboursForSupervisor:
      labourselectors.getFilteredLaboursForSupervisor(state),
    mode: getConfig()!.get("mode"),
  }),
  mapDispatchToProps: {
    setSearchText,
    loadListLabourAttendanceForSupervisor,
  },
  component: React.memo(ListLabourAttendanceForSupervisorPage),
});
