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
} from "@ionic/react";
import { connect } from "../../data/connect";
import "../ListPage.scss";
import * as labourselectors from "./LabourSelectors";
import { setSearchText } from "../../data/sessions/sessions.actions";
import { Labour } from "./Labour";
import { loadListLabour } from "./listLabour.actions";


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
  mode,
}) => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);
  const [showCompleteToast, setShowCompleteToast] = useState(false);
  const [showPopover, setShowPopover] = useState(false);

  const [showActionSheet, setShowActionSheet] = useState(false);

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
      <IonHeader >
        <IonToolbar className='custom-toolbar'>
          <IonButtons slot="start">
            <IonMenuButton className='c-white'/>
          </IonButtons>

          <IonTitle className='c-white'>Danh Sách Nhân Công</IonTitle>
        </IonToolbar>

        <IonToolbar className='custom-toolbar'>
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
                <IonItem routerLink={`/labourAttendance/${labour.id}`}>
                  <IonAvatar slot="start">
                    {/* <img src={`/assets/img/${user.id}`} /> */}
                    <img src="/assets/img/person-circle-outline.svg" />
                  </IonAvatar>

                  <IonLabel>
                    <h3>{labour.fullName}</h3>
                    <p>Phone: {labour.phone}</p>
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
    listLabours: labourselectors.getFilteredLabours(state),
    mode: getConfig()!.get("mode"),
  }),
  mapDispatchToProps: {
    setSearchText,
    loadListLabour,
  },
  component: React.memo(ListLabourPage),
});
