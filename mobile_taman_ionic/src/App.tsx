import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/typography.css';
import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import Menu from './components/Menu';
import { AppContextProvider } from './data/AppContext';
import { connect } from './data/connect';
import { loadConfData } from './data/sessions/sessions.actions';
import { loadUserData, setIsLoggedIn, setUsername } from './data/user/user.actions';
import { Session } from "./models/Session";
import About from './pages/About';
import Account from './pages/Account';
import ListEmployeeSalaryPage from './pages/employeeSalary/ListEmployeeSalaryPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Support from './pages/Support';
import Tutorial from './pages/Tutorial';
import EditLeaveLetterPage from './pages/user/EditLeaveLetterPage';
import AddUserPage from './pages/user/AddUserPage';
import EmployeeAttendance from './pages/employeeAttendance/EmployeeAttendancePage';

import ListEmployeeAttendancePage from './pages/employeeAttendance/ListEmployeeAttendancePage';
import ListUserPage from './pages/user/ListUserPage';
import ListLabourPage from './pages/labour/ListLabourPage';
import LabourAttendance from './pages/labour/LabourAttendance';
import EditLabourAttendance from './pages/labour/EditLabourAttendanceForSupervisor';
import ListLabourAttendanceForSupervisor from './pages/labour/ListLabourAttendanceForSupervisor';
/* Theme variables */
import './theme/variables.css';


const App: React.FC = () => {
  return (
    <AppContextProvider>
      <IonicAppConnected />
    </AppContextProvider>
  );
};

interface StateProps {
  darkMode: boolean,
  sessions: Session[],
}

interface DispatchProps {
  loadConfData: typeof loadConfData;
  loadUserData: typeof loadUserData;
  setIsLoggedIn: typeof setIsLoggedIn;
  setUsername: typeof setUsername;
}

interface IonicAppProps extends StateProps, DispatchProps { }

const IonicApp: React.FC<IonicAppProps> = ({ darkMode, sessions, setIsLoggedIn, setUsername, loadConfData, loadUserData }) => {

  useEffect(() => {
    loadUserData();
    loadConfData();
  }, []);

  return (
    sessions.length === 0 ? (
      <div></div>
    ) : (
        <IonApp className={`${darkMode ? 'dark-theme' : ''}`}>
          <IonReactRouter>
            <IonSplitPane contentId="main">
              <Menu />
              {/* {busy ? */}
              <IonRouterOutlet id="main">
                {/* <Route path="/tabs" component={MainTabs} /> */}
                <Route path="/about" component={About} />
                <Route path="/account" component={Account} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/support" component={Support} />
                <Route path="/listUser" component={ListUserPage} />
                <Route path="/addUser" component={AddUserPage} />
                <Route path="/employeeAttendance" component={EmployeeAttendance} />
                {/* <Route path="/editEmployeeAttendance/:employeeAttendanceId" component={EditEmployeeAttendance} /> */}
                <Route path="/listEmployeeAttendance" component={ListEmployeeAttendancePage} />
                <Route path="/listLabour" component={ListLabourPage} />
                <Route path="/labourAttendance/:labourId" component={LabourAttendance} />
                <Route path="/editLabourAttendance/:labourId" component={EditLabourAttendance} />
                <Route path="/listLabourAttendanceForSupervisor" component={ListLabourAttendanceForSupervisor} />

                <Route path="/listEmployeeSalary" component={ListEmployeeSalaryPage} />
                <Route path="/editLeaveLetter/:userId" component={EditLeaveLetterPage} />

                <Route path="/tutorial" component={Tutorial} />
                <Route path="/" component={Login} exact />

              </IonRouterOutlet>
            </IonSplitPane>
          </IonReactRouter>
        </IonApp>
      )
  )
}

export default App;

const IonicAppConnected = connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    darkMode: state.user.darkMode,
    sessions: state.data.sessions
  }),
  mapDispatchToProps: { loadConfData, loadUserData, setIsLoggedIn, setUsername },
  component: IonicApp
});
