import React, { useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonButtons,
  IonMenuButton,
  IonAlert,
  IonModal,
  IonButton,
} from "@ionic/react";
import "./Account.scss";
import { setUsername } from "../data/user/user.actions";
import { connect } from "../data/connect";
import { RouteComponentProps } from "react-router";

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  username?: string;
}

interface DispatchProps {
  setUsername: typeof setUsername;
}

interface AccountProps extends OwnProps, StateProps, DispatchProps {}

const Account: React.FC<AccountProps> = ({ setUsername, username }) => {
  const [showAlert, setShowAlert] = useState(false);

  const [showModal, setShowModal] = useState(false);
  return (
    <IonPage id="account-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonModal isOpen={showModal}>
        <p>This is modal content</p>
        <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton>
      </IonModal>
      <IonButton onClick={() => setShowModal(true)}>Show Modal</IonButton>
    </IonContent>

      <IonAlert
        isOpen={showAlert}
        header="Change Username"
        buttons={[
          "Cancel",
          {
            text: "Ok",
            handler: (data) => {
              setUsername(data.username);
            },
          },
        ]}
        inputs={[
          {
            type: "text",
            name: "username",
            value: username,
            placeholder: "username",
          },
        ]}
        onDidDismiss={() => setShowAlert(false)}
      />
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    username: state.user.username,
  }),
  mapDispatchToProps: {
    setUsername,
  },
  component: Account,
});
