import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonDatetime,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToast,
  IonToolbar,
  IonInput,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { RouteComponentProps, useParams } from "react-router";
import { connect } from "../../data/connect";
import { asyncRequests } from "../../data/dataApi";
import { loadListUser } from "./listuser.actions";
import { User } from "./User";
import moment from "moment";
import { toast } from "../../toast";
import { loadEmployeeById  } from "./userConfig";
import { AuthService } from "../../data/dataApi";


interface OwnProps extends RouteComponentProps {}

interface StateProps {
  listUserOptions: User[];
}

interface DispatchProps {
  loadListUser: typeof loadListUser;
}

type CourseProps = OwnProps & StateProps & DispatchProps;

const EditUserPage: React.FC<CourseProps> = ({
  loadListUser,
  history,
}) => {

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [messageResult, setMessageResult] = useState("");
  const [user, setUser] = useState(Object);
  const [name, setName] = useState<string>();
  const [code, setCode] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [dateOfBirth, setDateOfBirth] = useState<string>();
  const [gender, setGender] = useState<string>();
  const [company, setCompany] = useState<string>();
  const [annualLeaveYear, setAnnualLeaveYear] = useState<string>();
  const [address, setAddress] = useState<string>();

  const [currentUser, setCurrentUser] = useState(Object);
  const params: any = useParams();

  useEffect(() => {
    AuthService.current().then((user: any) => {
      setCurrentUser(user);
    });
    loadEmployeeById(params.userId).then((user: any) => {
      if (user) {
        setUser(user);
        setCode(user.code);
        setName(user.fullName);
        setEmail(user.email);
        setPhone(user.phone);
        setDateOfBirth(user.birthday);
        setGender(user.gender);
        setAnnualLeaveYear(user.annualLeaveYear);
        setAddress(user.currentAddress);
      }
    });
  }, [params.userId]);

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);

    var url = "/user/update";
    var bodyObject = {
      id: parseInt(params.userId),
      email: "cuong123@gmail.com",
      fullName: name,
      companyId: user.companyId ? parseInt(user.companyId) : null,
      password: "123456",
      phone: phone,
      role: "ADMIN",
      roles: null,
      birthday: moment(dateOfBirth).toISOString(),
      active: 1,
      annualLeaveYear: annualLeaveYear,
      departmentId: null,
      currentAddress: address,
      position: null,
      gender: gender,
      code: user.code,
      createdUserEmail: currentUser.email,
      lastedUpdateUserEmail: currentUser.email,
    };

    asyncRequests.post(url, bodyObject).then((result) => {
      console.log(result);
      if (result && result.id) {
        toast("S????a nh??n vi??n tha??nh c??ng!");
        history.push("/listUser");
        loadListUser();
      } else {
        toast("L???i L??u tr???!");
        setShowToast(true);
      }
    });
  };

  var optionGender = [
    { label: "Nam", value: "MALE" },
    { label: "N???", value: "FEMALE" },
    { label: "Kh??c", value: "OTHER" }
];
var optionCompany = [
  { label: "T??m An", value: "3" },
  { label: "PCO", value: "4" },
  { label: "OGA", value: "5" }
];

  return (
    <IonPage id="edituser-page">
      <IonHeader>
        <IonToolbar className='custom-toolbar'>
          <IonButtons slot="start">
            <IonMenuButton className='c-white'></IonMenuButton>
          </IonButtons>
          <IonTitle className='c-white'>Chi??nh S????a Th??ng Tin Nh??n Vi??n</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form noValidate onSubmit={handleUpdateUser}>
          <IonList>
          <IonItem>
              <IonLabel position="stacked" color="success">
              Ma?? nh??n vi??n
              </IonLabel>
              <IonInput value={code} placeholder="Nh????p ma?? nh??n vi??n" onIonChange={e => setCode(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
              Ho?? va?? t??n
              </IonLabel>
              <IonInput value={name} placeholder="Nh????p ho?? va?? t??n" onIonChange={e => setName(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
              Email (*)
              </IonLabel>
              <IonInput value={email} placeholder="Nh????p email" onIonChange={e => setEmail(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
              S???? ??i????n thoa??i (*)
              </IonLabel>
              <IonInput value={phone} placeholder="Nh????p m????t kh????u" onIonChange={e => setPhone(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
                Nga??y sinh
              </IonLabel>
              <IonDatetime
                displayFormat="DD/MM/YYYY"
                placeholder="Ch???n nga??y sinh"
                value={dateOfBirth}
                onIonChange={(e) => setDateOfBirth(e.detail.value!)}
              ></IonDatetime>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
                Gi????i ti??nh
              </IonLabel>
              <IonSelect
                value={gender}
                placeholder="Ch???n gi????i ti??nh"
                onIonChange={(e) => setGender(e.detail.value!)}
              >
                {optionGender.map((option) => (
                  <IonSelectOption key={option.value} value={option.value}>
                    {option.label}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
              S???? nga??y phe??p/n??m
              </IonLabel>
              <IonInput value={annualLeaveYear} placeholder="Nh????p ma?? nh??n vi??n" onIonChange={e => setAnnualLeaveYear(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
              ??i??a chi??
              </IonLabel>
              <IonInput value={address} placeholder="Nh????p ??i??a chi??" onIonChange={e => setAddress(e.detail.value!)}></IonInput>
            </IonItem>
          </IonList>
          <IonRow>
            <IonCol>
              <IonButton color="success" type="submit" expand="block">
                C???p nh???t
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton routerLink="/listUser" color="light" expand="block">
                  Tr???? v????
              </IonButton>
            </IonCol>
          </IonRow>
        </form>
      </IonContent>
      <IonToast
        isOpen={showToast}
        duration={3000}
        message={messageResult}
        onDidDismiss={() => setShowToast(false)}
      />
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapDispatchToProps: {
    loadListUser,
  },
  component: EditUserPage,
});
