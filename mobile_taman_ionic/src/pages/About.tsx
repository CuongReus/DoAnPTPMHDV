import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonButton, IonIcon, IonList, IonPopover } from '@ionic/react';
import './About.scss';
import { more } from 'ionicons/icons';
import AboutPopover from '../components/AboutPopover';

interface AboutProps { }

const About: React.FC<AboutProps> = () => {

  const [showPopover, setShowPopover] = useState(false);
  const [popoverEvent, setPopoverEvent] = useState();

  const presentPopover = (e: React.MouseEvent) => {
    setShowPopover(true);
  };


  return (
    <IonPage id="about-page">
      <IonHeader>
        <IonToolbar className='custom-toolbar'>
          <IonButtons slot="start">
            <IonMenuButton className='c-white'></IonMenuButton>
          </IonButtons>
          <IonTitle className='c-white'>About</IonTitle>
          <IonButtons slot="end">
            <IonButton className='c-white' icon-only onClick={presentPopover}>
              <IonIcon slot="icon-only" icon={more}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <div className="about-header">
          <img src="assets/img/appicon.png" alt="TamAn logo" />
        </div>
        <div className="about-info">
          <h4 className="ion-padding-start">Tâm An Mobile App</h4>

          <p className="ion-padding-start ion-padding-end">
            Phần mềm hỗ trợ quản lý các tác vụ nhanh chóng trong quản trị nhân sự và dự án. Các chức năng của hệ thống bao gồm:
            Danh sách nhân viên, Đơn nghỉ phép, Thông Tin Tồn Kho, Đơn Hàng, Dự Án.
          </p>
          <p className="ion-padding-start ion-padding-end">
          V1.30052021
          </p>
        </div>
      </IonContent>
      <IonPopover
        isOpen={showPopover}
        event={popoverEvent}
        onDidDismiss={() => setShowPopover(false)}
      >
        <AboutPopover dismiss={() => setShowPopover(false)} />
      </IonPopover>
    </IonPage>
  );
};

export default React.memo(About);
