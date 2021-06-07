import { IonContent, IonItem, IonItemSliding, IonList } from '@ionic/react';
import React from 'react';

const ProjectYearPageRow: React.FC = ( dataProjects: any) => {

  return (<IonContent>
    {dataProjects ? dataProjects.map((project: any, index: number) => {
      <IonItemSliding key={"dataProjects_" + index}>
        <IonItem>
          {project.name}
        </IonItem>
      </IonItemSliding>
    }) : null
    }
  </IonContent>
  )
};
export default ProjectYearPageRow;
