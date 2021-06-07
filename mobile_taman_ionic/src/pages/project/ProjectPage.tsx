import { IonButtons, IonContent, IonHeader, IonItem, IonItemSliding, IonLabel, IonList, IonMenuButton, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { setSearchText } from '../../data/sessions/sessions.actions';
import '../ListPage.scss';
import { loadProject } from './projectConfig';



const ProjectPage: React.FC = () => {
  // const dataProject = useSelector( (state : any) =>  state.projectData);

  const [dataProject, setDataProject] = useState([]);

  useEffect(() => {
    loadProject().then((project : any ) => {
      if (project) {
        setDataProject(project );
      }
    });
  }, []);

  return (
    <IonPage id="list-user-page" className="list-page">
      <IonHeader>
        <IonToolbar className='custom-toolbar'>
          <IonButtons slot="start">
            <IonMenuButton className='c-white'/>
          </IonButtons>
          <IonTitle className='c-white'>Danh Sách Dự Án</IonTitle>
        </IonToolbar>
        <IonToolbar className='custom-toolbar'>
          <IonSearchbar
            placeholder="Tìm tên, email, phone"
            onIonChange={(e: CustomEvent) => setSearchText(e.detail.value)}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {dataProject ? dataProject.map( (item : any, index : number) =>
            <IonItemSliding key={index}>
              <IonItem >
                <IonLabel>
                  <h3>{item.name}</h3>
                </IonLabel>
              </IonItem>

            </IonItemSliding>
          ) : null}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ProjectPage;


