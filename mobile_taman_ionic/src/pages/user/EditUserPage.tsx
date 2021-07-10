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

  const [currentUser, setCurrentUser] = useState(Object);
  const params: any = useParams();

  useEffect(() => {
    AuthService.current().then((user: any) => {
      setCurrentUser(user);
    });
    loadEmployeeById(params.userId).then((user: any) => {
      if (user) {
        setUser(user);
      }
    });
  }, [params.userId]);

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


  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);

    var url = "/user/update";
    var bodyObject = {
      id: parseInt(params.userId),
      email: user.email,
      fullName: name,
      companyId: parseInt(user.companyId),
      phone: user.phone,
      role: "ADMIN",
      roles: null,
      birthday: user.birthday,
      active: 1,
      annualLeaveYear: parseInt(user.annualLeaveYear),
      departmentId: null,
      currentAddress: user.currentAddress,
      position: null,
      gender: user.gender,
      code: user.code,
      createdUserEmail: currentUser.email,
      lastedUpdateUserEmail: currentUser.email,
    };

    asyncRequests.post(url, bodyObject).then((result) => {
      if (result && result.id) {
        toast("Sửa nhân viên thành công!");
        history.push("/listUser");
        loadListUser();
      } else {
        toast("Lỗi Lưu trữ!");
        setShowToast(true);
      }
    });
  };

  var optionGender = [
    { label: "Nam", value: "MALE" },
    { label: "Nữ", value: "FEMALE" },
    { label: "Khác", value: "OTHER" }
];
var optionCompany = [
  { label: "Tâm An", value: "3" },
  { label: "PCO", value: "4" },
  { label: "OGA", value: "5" }
];
  console.log(user);
  return (
    <IonPage id="edituser-page">
      <IonHeader>
        <IonToolbar className='custom-toolbar'>
          <IonButtons slot="start">
            <IonMenuButton className='c-white'></IonMenuButton>
          </IonButtons>
          <IonTitle className='c-white'>Chỉnh Sửa Thông Tin Nhân Viên</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form noValidate onSubmit={handleAddCourse}>
          <IonList>
          <IonItem>
              <IonLabel position="stacked" color="success">
              Mã nhân viên
              </IonLabel>
              <IonInput value={user.code} placeholder="Nhập mã nhân viên" onIonChange={e => setCode(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
              Họ và tên
              </IonLabel>
              <IonInput value={name} placeholder="Nhập họ và tên" onIonChange={e => setName(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
              Email (*)
              </IonLabel>
              <IonInput value={user.email} placeholder="Nhập email" onIonChange={e => setEmail(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
              Số điện thoại (*)
              </IonLabel>
              <IonInput value={user.phone} placeholder="Nhập mật khẩu" onIonChange={e => setPhone(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
                Ngày sinh
              </IonLabel>
              <IonDatetime
                displayFormat="DD/MM/YYYY"
                placeholder="Chọn ngày sinh"
                value={user.birthday}
                onIonChange={(e) => setDateOfBirth(e.detail.value!)}
              ></IonDatetime>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
                Giới tính
              </IonLabel>
              <IonSelect
                value={user.gender}
                placeholder="Chọn giới tính"
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
              Số ngày phép/năm
              </IonLabel>
              <IonInput value={user.annualLeaveYear} placeholder="Nhập mã nhân viên" onIonChange={e => setAnnualLeaveYear(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="success">
              Địa chỉ
              </IonLabel>
              <IonInput value={user.currentAddress} placeholder="Nhập địa chỉ" onIonChange={e => setAddress(e.detail.value!)}></IonInput>
            </IonItem>
          </IonList>
          <IonRow>
            <IonCol>
              <IonButton color="success" type="submit" expand="block">
                Thêm
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton routerLink="/listUser" color="light" expand="block">
                  Trở về
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
