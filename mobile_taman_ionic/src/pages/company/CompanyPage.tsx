import { IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonItemSliding, IonLabel, IonList, IonMenuButton, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import { arrowForward } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { setSearchText } from '../../data/sessions/sessions.actions';
import '../ListPage.scss';
import { loadAuthCurrentUser } from '../project/projectConfig';
import { loadCompany } from './companyConfig';
// import { desktop} from 'ionicons/icons'


const CompanyPage: React.FC = () => {
  // const dataCompany = useSelector( (state : any) =>  state.companyData);

  const [dataCompany, setDataCompany] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    loadCompany().then((company : any ) => {
      if (company) {
        setDataCompany(company );
      }
    });
    loadAuthCurrentUser().then((user : any) => {
      if (user) {
        setUser(user );
      }
      console.log(user);
    });
  }, []);

  return (
    <IonPage id="list-user-page" className="list-page">
      <IonHeader>
        <IonToolbar className='custom-toolbar'>
          <IonButtons slot="start">
            <IonMenuButton className='c-white'/>
          </IonButtons>
          <IonTitle className='c-white'>Danh Sách Công Ty</IonTitle>
        </IonToolbar>
        <IonToolbar className='custom-toolbar'>
          <IonSearchbar
            className="custom-search"
            placeholder="Tìm tên, email, phone"
            onIonChange={(e: CustomEvent) => setSearchText(e.detail.value)}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {dataCompany ? dataCompany.map( (item : any, index : number) =>
            <IonItemSliding key={index}>
              <IonItem routerLink={`/projectYear/company/${item.id}`}>
                <IonLabel >
                  <h3>{item.name } </h3>
                </IonLabel>
                {/* <IonIcon icon={arrowForward} slot="end"></IonIcon> */}
              </IonItem>

            </IonItemSliding>
          ) : null}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default CompanyPage;


