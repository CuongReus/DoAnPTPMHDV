import { Plugins } from '@capacitor/core';
import { IonButton, IonButtons, IonCol, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonRow, IonText, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from '../data/connect';
import { AuthService } from '../data/dataApi';
import { setIsLoggedIn, setUsername } from '../data/user/user.actions';
import './Login.scss';
import './EditPage.scss';


const { Storage } = Plugins;
interface OwnProps extends RouteComponentProps { }

interface DispatchProps {
  setIsLoggedIn: typeof setIsLoggedIn;
  setUsername: typeof setUsername;
}

interface LoginProps extends OwnProps, DispatchProps { }

const Login: React.FC<LoginProps> = ({ setIsLoggedIn, history, setUsername: setUsernameAction }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // window.location.reload();

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!username) {
      setUsernameError(true);
    }
    if (!password) {
      setPasswordError(true);
    }

    if (username && password) {
      AuthService.login(username, password).then(token => {
        if (token) {
          setIsLoggedIn(true);
          setUsernameAction(username);

          history.push('/tabs/listLabour', { direction: 'none' });
          // window.history.replaceState( {}, '', '/listUser')

        } else {
          setShowToast(true);
        }
      });
    }
    e.preventDefault();
  };

  return (
    <IonPage id="login-page">
      <IonHeader>
        <IonToolbar className='custom-toolbar'>
          {/* <IonButtons slot="start">
            <IonMenuButton color='success'></IonMenuButton>
          </IonButtons> */}
          <IonTitle style={{textAlign: 'center'}} className='c-white'>Đăng nhập</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <div className="login-logo">
          <img src="assets/img/favicon.png" alt="Ionic logo" />
        </div>

        <form noValidate onSubmit={login}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked" color="success">Tên tài khoản:</IonLabel>
              <IonInput name="username" type="text" value={username} spellCheck={false} autocapitalize="off" onIonChange={e => setUsername(e.detail.value!)}
                required>
              </IonInput>
            </IonItem>

            {formSubmitted && usernameError && <IonText color="danger">
              <p className="ion-padding-start">
                Vui lòng điền thông tin tài khoản!
              </p>
            </IonText>}

            <IonItem>
              <IonLabel position="stacked" color="success">Mật khẩu:</IonLabel>
              <IonInput name="password" type="password" value={password} onIonChange={e => setPassword(e.detail.value!)}>
              </IonInput>
            </IonItem>

            {formSubmitted && passwordError && <IonText color="danger">
              <p className="ion-padding-start">
                Vui lòng điền thông tin mật khẩu!
              </p>
            </IonText>}
          </IonList>

          <IonRow>
            <IonCol>
              <IonButton color="success" type="submit" expand="block">Đăng nhập</IonButton>
            </IonCol>
            {/* <IonCol>
              <IonButton routerLink="/signup" color="light" expand="block">Signup</IonButton>
            </IonCol> */}
          </IonRow>
        </form>

      </IonContent>
      <IonToast
        isOpen={showToast}
        duration={3000}
        message={"Không thể đăng nhập. Vui lòng kiểm tra lại thông tin!"}
        onDidDismiss={() => setShowToast(false)} />

    </IonPage>
  );
};

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: {
    setIsLoggedIn,
    setUsername
  },
  component: Login
})
