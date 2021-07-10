import React, { useState, useRef, useEffect } from "react";
import {
  IonToolbar,
  IonContent,
  IonPage,
  IonButtons,
  IonButton,
  IonIcon,
  IonMenuButton,
  IonSearchbar,
  IonRefresher,
  IonRefresherContent,
  IonHeader,
  getConfig,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
  IonItemSliding,
  IonAvatar,
  IonLoading,
} from "@ionic/react";
import { connect } from "../../data/connect";
import "../ListPage.scss";
import * as labourselectors from "./LabourSelectors";
import { setSearchText } from "../../data/sessions/sessions.actions";
import { Labour } from "./Labour";
import { loadListLabour } from "./listLabour.actions";
import { list, create } from "ionicons/icons";
// import AboutPopover from '../../components/AboutPopover';

interface OwnProps {}

interface StateProps {
  listLabours: Labour[];
  mode: "ios" | "md";
}

interface DispatchProps {
  setSearchText: typeof setSearchText;
  loadListLabour: typeof loadListLabour;
}

type ListLabourPageProps = OwnProps & StateProps & DispatchProps;

const ListLabourPage: React.FC<ListLabourPageProps> = ({
  listLabours,
  setSearchText,
  loadListLabour,
}) => {
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);
  const [showCompleteToast, setShowCompleteToast] = useState(false);

  const doRefresh = () => {
    setTimeout(() => {
      ionRefresherRef.current!.complete();
      setShowCompleteToast(true);
    }, 2500);
  };

  useEffect(() => {
    loadListLabour();
  }, []);

  return (
    <IonPage id="list-user-page" className="list-page">
      <IonHeader>
        <IonToolbar className="custom-toolbar">
          <IonButtons slot="start">
            <IonMenuButton className="c-white" />
          </IonButtons>

          <IonTitle className="c-white">Danh Sách Nhân Công</IonTitle>
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
          message="Please wait..."
          duration={0}
          isOpen={listLabours ? false : true}
        />
        <IonList>
          {listLabours &&
            listLabours.map((labour) => (
              <IonItemSliding key={labour.id}>
                {/* <IonItem routerLink={`/labourNormalAttendance/${labour.id}`}> */}
                <IonItem>
                  <IonAvatar slot="start">
                    {/* <img src={`/assets/img/${user.id}`} /> */}
                    <img alt="avatar" src="/assets/img/avartar-blue.png" />
                  </IonAvatar>

                  <IonLabel>
                    <h3>{labour.fullName}</h3>
                    <p>Phone: {labour.phone}</p>
                  </IonLabel>
                  <IonButtons slot="end">
                    <IonButton
                      color="success"
                      routerLink={`/labourNormalAttendance/${labour.id}`}
                    >
                      <IonIcon slot="icon-only" icon={list} />
                    </IonButton>
                    <IonButton
                      color="success"
                      routerLink={`/labourOverTimeAttendance/${labour.id}`}
                    >
                      <IonIcon slot="icon-only" icon={create} />
                    </IonButton>
                  </IonButtons>
                </IonItem>
              </IonItemSliding>
            ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    listLabours: labourselectors.getFilteredLabours(state),
    mode: getConfig()!.get("mode"),
  }),
  mapDispatchToProps: {
    setSearchText,
    loadListLabour,
  },
  component: React.memo(ListLabourPage),
});
