import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { briefcase, people, star } from 'ionicons/icons';
import React from 'react';
import { Redirect, Route } from 'react-router';
import ListLabourAttendanceForSupervisor from './labour/ListLabourAttendanceForSupervisor';
import ListLabourPage from './labour/ListLabourPage';
import ListEmployeeAttendancePage from './employeeAttendance/ListEmployeeAttendancePage';

interface MainTabsProps { }

const MainTabs: React.FC<MainTabsProps> = () => {

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/" to="/tabs/listLabour" />
        <Route path="/tabs/listLabour" render={() => <ListLabourPage />} exact={true} />
        <Route path="/tabs/listLabourAttendanceForSupervisor" component={ListLabourAttendanceForSupervisor} exact={true} />
        <Route path="/tabs/listEmployeeAttendance" render={() => <ListEmployeeAttendancePage />} exact={true} />
      </IonRouterOutlet>

      <IonTabBar slot="bottom" translucent={true}>

        <IonTabButton tab="listLabour" href="/tabs/listLabour">
          <IonIcon icon={people} />
          <IonLabel>Nhân Công</IonLabel>
        </IonTabButton>
        <IonTabButton tab="listEmployeeAttendance" href="/tabs/listEmployeeAttendance">
          <IonIcon icon={briefcase} />
          <IonLabel>Văn phòng</IonLabel>
        </IonTabButton>
        <IonTabButton tab="listLabourAttendanceForSupervisor" href="/tabs/listLabourAttendanceForSupervisor">
          <IonIcon icon={star} />
          <IonLabel>Giám sát</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;
