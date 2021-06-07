import React, { useState, useRef, useEffect } from 'react';
import { IonToolbar, IonContent, IonPage, IonButtons, IonMenuButton, IonSearchbar, IonRefresher, IonRefresherContent, IonModal, IonHeader, getConfig, IonTitle, IonList, IonItem, IonLabel, IonItemSliding, IonAvatar, IonItemOption, IonPopover, IonLoading } from '@ionic/react';
import { connect } from '../../data/connect';
import '../ListPage.scss'
import * as userselectors from './UserSelectors';
import { setSearchText } from '../../data/sessions/sessions.actions';
import { User } from './User';
import { loadListUser } from './listuser.actions';
import { toast } from '../../toast';


interface OwnProps { }

interface StateProps {
  listUsers: User[];
  mode: 'ios' | 'md'
}

interface DispatchProps {
  setSearchText: typeof setSearchText;
  loadListUser: typeof loadListUser;
}

type ListUserPageProps = OwnProps & StateProps & DispatchProps;

const ListUserPage: React.FC<ListUserPageProps> = ({ listUsers, setSearchText, loadListUser, mode }) => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);
  const [showCompleteToast, setShowCompleteToast] = useState(false);
  const [showPopover, setShowPopover] = useState(false);


  const doRefresh = () => {
    setTimeout(() => {
      ionRefresherRef.current!.complete();
      setShowCompleteToast(true);
    }, 2500)
  };

  useEffect(() => {
    loadListUser();
  }, []);

  return (
    <IonPage id="list-user-page" className="list-page">
      <IonHeader>
        <IonToolbar className='custom-toolbar'>
          <IonButtons slot="start">
            <IonMenuButton className='c-white'/>
          </IonButtons>

          <IonTitle className='c-white'>Danh Sách Nhân Viên</IonTitle>

        </IonToolbar>

        <IonToolbar className='custom-toolbar'>
          <IonSearchbar
            className="custom-search"
            placeholder="Tìm tên, email, phone"
            onIonChange={(e: any) => setSearchText(e.detail.value)}
          />
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonRefresher slot="fixed" ref={ionRefresherRef} onIonRefresh={doRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        <IonLoading message="Please wait..." duration={0} isOpen={(listUsers ? false : true)} />
        <IonList>
          {listUsers && listUsers.map((user, index: number) => (
            <IonItemSliding key={user.id}>
              <IonItem routerLink={`/editLeaveLetter/${user.id}`}>
                <IonAvatar slot="start">
                  {/* <img src={`/assets/img/${user.id}`} /> */}
                  <img src="/assets/img/person-circle-outline.svg"/>
                </IonAvatar>

                <IonLabel>

                  <h3>{user.fullName}</h3>
                  <p>
                    Email: {user.email}
                  </p>
                  <p>
                    Phone: {user.phone}
                  </p>
                </IonLabel>
              </IonItem>
              <IonPopover
                isOpen={showPopover}
                cssClass=''
                onDidDismiss={e => setShowPopover(false)}
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
    listUsers: userselectors.getFilteredUsers(state),
    mode: getConfig()!.get('mode')
  }),
  mapDispatchToProps: {
    setSearchText, loadListUser
  },
  component: React.memo(ListUserPage)
});
