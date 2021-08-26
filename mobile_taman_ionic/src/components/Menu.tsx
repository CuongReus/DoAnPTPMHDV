import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import {
  people,
  logIn,
  person,
  construct,
  create,
  briefcase,
} from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { connect } from "../data/connect";
import { AuthService } from "../data/dataApi";
import { setDarkMode } from "../data/user/user.actions";
import '../pages/EditPage.scss'
import { User } from "../pages/user/User";


const routes = {
  // loggedInPages: [
  //   { title: "Quản Lý Nhân Viên", path: "/listUser", icon: people },
  // ],
  labourPages: [
    { title: "Chấm Công Nhân Công", path: "/tabs/listLabour", icon: construct },
    { title: "Thuộc Về Giám Sát", path: "/tabs/listLabourAttendanceForSupervisor",icon: person },
    { title: "Chấm Công Văn Phòng", path: "/employeeAttendance", icon: create },
    { title: "Quản Lý Chấm Công VP", path: "/tabs/listEmployeeAttendance", icon: briefcase },
  ],
  loggedOutPages: [
    { title: "Đăng Xuất", path: "/login", icon: logIn },
  ],
  login: [{ title: "Đăng Xuất", path: "/login", icon: logIn }],
};

interface Pages {
  title: string;
  path: string;
  icon: { ios: string; md: string };
  routerDirection?: string;
}
interface StateProps {
  darkMode: boolean;
  isAuthenticated: boolean;
  username: any;
  menuEnabled: boolean;
}

interface DispatchProps {
  setDarkMode: typeof setDarkMode;

  user?: User;
}

interface MenuProps extends RouteComponentProps, StateProps, DispatchProps {}

const Menu: React.FC<MenuProps> = ({
  darkMode,
  history,
  isAuthenticated,
  username,
  setDarkMode,
  menuEnabled,
}) => {
  const [disableMenu, setDisableMenu] = useState(false);
  const [currentUser, setCurrentUser] = useState(Object);
  function renderlistItems(list: Pages[]) {
    return list
      .filter((route) => !!route.path)
      .map((p) => (
        <IonMenuToggle key={p.title} auto-hide="false">
          <IonItem button routerLink={p.path} routerDirection="none">
            <IonIcon className='custom-icon' slot="start" icon={p.icon} />
            <IonLabel>{p.title}</IonLabel>
          </IonItem>
        </IonMenuToggle>
      ));
  }

  useEffect(() => {
    AuthService.current().then((user: User) => {
      setCurrentUser(user);
    });
  }, []);

  if(username){

    return (
       <IonMenu type="overlay" disabled={!menuEnabled} contentId="main">
        <IonHeader>
          <IonToolbar>
            <IonTitle>{username ? username : ""}</IonTitle>
          </IonToolbar>
        </IonHeader>
        {username ?
          <IonContent class="outer-content">
            {/* <IonListHeader className='custom-list-header'>Quản Lý Nhân Viên</IonListHeader>
            {isAuthenticated ? renderlistItems(routes.loggedInPages) : renderlistItems(routes.loggedOutPages)} */}
            <IonListHeader className='custom-list-header'>Quản Lý Ngày Công</IonListHeader>
            {isAuthenticated ? renderlistItems(routes.labourPages) : renderlistItems(routes.loggedOutPages)}
            <IonList>
              <IonItem>
                <IonLabel>Dark Theme</IonLabel>
                <IonToggle color="success" checked={darkMode} onClick={() => setDarkMode(!darkMode)} />
              </IonItem>
            </IonList>
            <IonList>
              <IonListHeader>Quản Lý Tài Khoản</IonListHeader>
              {isAuthenticated ? renderlistItems(routes.loggedOutPages) : renderlistItems(routes.loggedOutPages)}
            </IonList>
          </IonContent>
           :
          <IonContent class="outer-content">
            <IonList>
              <IonListHeader>Quản Lý Tài Khoản</IonListHeader>
              {isAuthenticated ? renderlistItems(routes.loggedOutPages) : renderlistItems(routes.loggedOutPages)}
            </IonList></IonContent>}
      </IonMenu>)
    }else{
      return (
      <IonMenu type="overlay" disabled={!menuEnabled} contentId="main">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent class="outer-content">
            <IonList>
              <IonListHeader>Quản Lý Tài Khoản</IonListHeader>
              {isAuthenticated ? renderlistItems(routes.login) : renderlistItems(routes.login)}
            </IonList></IonContent>
        </IonMenu>)
    }
};

export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
    darkMode: state.user.darkMode,
    isAuthenticated: state.user.isLoggedin,
    username: state.user.username,
    menuEnabled: state.data.menuEnabled
  }),
  mapDispatchToProps: {
    setDarkMode,
  },
  component: withRouter(Menu),
});
