import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { albums, colorPalette, informationCircle, people } from 'ionicons/icons';
import React from 'react';
import { Redirect, Route } from 'react-router';
import About from './About';
import ListStockPage from './stock/ListStockPage';
import ListUserPage from './user/ListUserPage';

interface MainTabsProps { }

const MainTabs: React.FC<MainTabsProps> = () => {



  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/listUser" />

        <Route path="/project" render={() => <About />} exact={true} />
        <Route path="/listUser" render={() => <ListUserPage />} exact={true} />
        <Route path="/listStock" render={() => <ListStockPage />} exact={true} />
        <Route path="/leaveletter" render={() => <About />} exact={true} />
      </IonRouterOutlet>

      <IonTabBar slot="bottom" translucent={true}>

        <IonTabButton tab="project" href="/project">
          <IonIcon icon={albums} />
          <IonLabel>Dự Án</IonLabel>
        </IonTabButton>
        <IonTabButton tab="user" href="/listUser">
          <IonIcon icon={people} />
          <IonLabel>Nhân Viên</IonLabel>
        </IonTabButton>
        <IonTabButton tab="product" href="/listStock">
          <IonIcon icon={colorPalette} />
          <IonLabel>Sản Phẩm</IonLabel>
        </IonTabButton>
        <IonTabButton tab="leaveletter" href="/leaveletter">
          <IonIcon icon={informationCircle} />
          <IonLabel>Nghỉ Phép</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;