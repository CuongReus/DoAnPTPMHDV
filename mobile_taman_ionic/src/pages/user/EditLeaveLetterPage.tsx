import { IonButton, IonButtons, IonCol, IonContent, IonDatetime, IonHeader, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonRow, IonSelect, IonSelectOption, IonText, IonTextarea, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps, useParams } from 'react-router';
import { connect } from '../../data/connect';
import { asyncRequests } from '../../data/dataApi';
import '../EditPage.scss';
import { loadListUser } from './listuser.actions';
import { loadEmployeeById  } from "./userConfig";
import { User } from './User';
import * as userselectors from './UserSelectors';
import moment from 'moment';
import { Plugins } from '@capacitor/core';
import { toast } from '../../toast';

const { Storage } = Plugins;

interface OwnProps extends RouteComponentProps { }

interface StateProps {
  listUserOptions: User[];
}

interface DispatchProps {
  loadListUser: typeof loadListUser;
}

type EditLeaveLetterProps = OwnProps & StateProps & DispatchProps;

const EditLeaveLetterPage: React.FC<EditLeaveLetterProps> = ({ listUserOptions, loadListUser, history }) => {

  const [leaveType, setLeaveType] = useState('ANNUAL_HOLIDAY');
  const [workPlace, setWorkPlace] = useState('Văn Phòng');
  const [startLeaveDate, setStartLeaveDate] = useState('');
  const [endLeaveDate, setEndLeaveDate] = useState('');
  const [startWorkDate, setStartWorkDate] = useState('');
  const [reason, setReason] = useState('');
  const [status, setStatus] = useState('DANG_CHO_DUYET');
  const [approvedById, setApprovedById] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [startLeaveDateError, setStartLeaveDateError] = useState(false);
  const [endLeaveDateError, setEndLeaveDateError] = useState(false);
  const [startWorkDateError, setStartWorkDateeError] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [messageResult, setMessageResult] = useState('');
  const [user, setUser] = useState(Object);
  const [currentUser , setCurrentUser] = useState(null);

  // const { userId } = useParams();
  const params: any = useParams();

  const handleEditLeaveLetter = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!startLeaveDate) {
      setStartLeaveDateError(true);
    }
    if (!endLeaveDate) {
      setEndLeaveDateError(true);
    }
    if (!startWorkDate) {
      setStartWorkDateeError(true);
    }

    var holidayAndWeekendDay = 0;
    var nomalletterDay = 0;

    if (startLeaveDate && endLeaveDate) {

      var loop = new Date(startLeaveDate);
      while (loop <= new Date(endLeaveDate)) {

        var checkDay = moment(loop).format('dd');
        if (checkDay === 'T7') {
          holidayAndWeekendDay = holidayAndWeekendDay + 0.5;
        }
        if (checkDay === 'CN') {
          holidayAndWeekendDay = holidayAndWeekendDay + 1;
        }
        loop = new Date(loop.setDate(loop.getDate() + 1));
        nomalletterDay++;
      }

    }

    var url = '/leaveLetter/add';
    var bodyObject = {
      userId: parseInt(params.userId),
      // userId: currentUser.id,
      startLeaveDate: startLeaveDate,
      endLeaveDate: endLeaveDate,
      // leaveDays: values.leaveDays,
      // holiday: values.holiday,
      startWorkDate: startWorkDate,
      approvedById: approvedById,
      // holidayAndWeekendDay: values.holidayAndWeekendDay ? values.holidayAndWeekendDay.map(item => {
      //     return moment(item).format("YYYY-MM-DD")
      // }).join(','):null,
      // note: values.note,
      totalLeaveDays: nomalletterDay - holidayAndWeekendDay,
      // year: values.year,
      // month: values.month,
      status: status, // TODO
      reason: reason,
      leaveType: leaveType,
      workPlace: workPlace,
      // lastTotalAbsentDay:values.lastTotalAbsentDay,
      // lastTotalBonusLeaveDay:values.lastTotalBonusLeaveDay,
      // lastTotalAnnualLeave:values.lastTotalAnnualLeave,
      // lastTotalAnnualLeaveRemaining:values.lastTotalAnnualLeaveRemaining,
    };

    asyncRequests.post(url, bodyObject).then(result => {
      if (result && result.id) {
        // setMessageResult("Tao Lịch Nghỉ Phép Thành Công!");
        toast("Tao Lịch Nghỉ Phép Thành Công!")
        history.push('/listUser');
      } else {
        // setMessageResult("Lỗi Lưu trữ!");
        toast("Lỗi Lưu trữ!")

        setShowToast(true);
      }
    });

  };

  var optionLeaveTypes = [
    { label: "Nghỉ phép năm", value: "PN" },
    { label: "Nghỉ phép năm nữa ngày", value: "PN2" }
  ];
  var optionWorkplace = [
    { label: "Văn Phòng", value: "Văn Phòng" },
    { label: "Công Trường", value: "Công Trường" },
    { label: "Khác", value: "Khác" }
  ];
  var optionStatus = [{ label: "Đang Chờ Duyệt", value: "DANG_CHO_DUYET" },
  { label: "Không Được Duyệt", value: "KHONG_DUOC_DUYET" }, { label: "Đã Duyệt", value: "DA_DUYET" }
  ];

  useEffect(() => {
    loadListUser();
    // const currentUser : any  = Storage.get( {key : "currentUser"});
    // setCurrentUser(currentUser);
    loadEmployeeById(params.userId).then((user: any) => {
      if (user) {
        setUser(user);
      }
    });

  }, []);

  return (
    <IonPage id="edituser-page">
      <IonHeader>
        <IonToolbar className='custom-toolbar'>
          <IonButtons slot="start">
            <IonMenuButton className='c-white'></IonMenuButton>
          </IonButtons>
          <IonTitle className='c-white'>Tạo Đơn Nghỉ Phép</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <form noValidate onSubmit={handleEditLeaveLetter}>
          <IonList>
            <IonItem>
              <IonLabel>
                <h2>Tên: {user.fullName}</h2>
                <h2>Email: {user.email}</h2>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" color="success">Loại Nghỉ Phép (*)</IonLabel>
              <IonSelect value={leaveType} placeholder="Chọn Loại" onIonChange={e => setLeaveType(e.detail.value!)}>
                {optionLeaveTypes.map(option =>
                  <IonSelectOption value={option.value}>{option.label}</IonSelectOption>)}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" color="success">Nơi Làm Việc</IonLabel>
              <IonSelect value={workPlace} placeholder="Chọn Nơi Làm Việc" onIonChange={e => setWorkPlace(e.detail.value!)}>
                {optionWorkplace.map(option =>
                  <IonSelectOption value={option.value}>{option.label}</IonSelectOption>)}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" color="success">Nghỉ Phép Từ (*)</IonLabel>
              <IonDatetime displayFormat="DD/MM/YYYY" placeholder="Chọn Ngày" value={startLeaveDate} onIonChange={e => setStartLeaveDate(e.detail.value!)}></IonDatetime>
            </IonItem>
            {formSubmitted && startLeaveDateError && <IonText color="danger">
              <p className="ion-padding-start">
                Vui Lòng Nhập Nghỉ Phép Từ
              </p>
            </IonText>}

            <IonItem>
              <IonLabel position="stacked" color="success">Đến Hết Ngày (*)</IonLabel>
              <IonDatetime displayFormat="DD/MM/YYYY" placeholder="Chọn Ngày" value={endLeaveDate} onIonChange={e => setEndLeaveDate(e.detail.value!)}></IonDatetime>
            </IonItem>
            {formSubmitted && endLeaveDateError && <IonText color="danger">
              <p className="ion-padding-start">
                Vui Lòng Nhập Đến Hết Ngày
              </p>
            </IonText>}

            <IonItem>
              <IonLabel position="stacked" color="success">Ngày Đi Làm Lại (*)</IonLabel>
              <IonDatetime displayFormat="DD/MM/YYYY" placeholder="Chọn Ngày" value={startWorkDate} onIonChange={e => setStartWorkDate(e.detail.value!)}></IonDatetime>
            </IonItem>
            {formSubmitted && startWorkDateError && <IonText color="danger">
              <p className="ion-padding-start">
                Vui Lòng Nhập Ngày Đi Làm
              </p>
            </IonText>}

            <IonItem>
              <IonLabel position="stacked" color="success">Lý Do Nghỉ</IonLabel>
              <IonTextarea name="reason" value={reason} onIonChange={e => setReason(e.detail.value!)}>
              </IonTextarea>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" color="success">Người Duyệt (*)</IonLabel>
              <IonSelect value={approvedById} placeholder="Chọn Người Duyệt" onIonChange={e => setApprovedById(e.detail.value!)}>
                {listUserOptions.map(option =>
                  <IonSelectOption value={option.id}>{option.email + " | " + option.fullName}</IonSelectOption>)}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" color="success">Trạng Thái Duyệt</IonLabel>
              <IonSelect value={status} placeholder="Chọn Trạng Thái" onIonChange={e => setStatus(e.detail.value!)}>
                {optionStatus.map(option =>
                  <IonSelectOption value={option.value}>{option.label}</IonSelectOption>)}
              </IonSelect>
            </IonItem>

          </IonList>

          <IonRow>
            <IonCol>
              <IonButton color='primary' type="submit" expand="block">Tạo Đơn</IonButton>
            </IonCol>
            <IonCol>
              <IonButton routerLink="/listUser" color="light" expand="block">Bỏ Qua</IonButton>
            </IonCol>
          </IonRow>
        </form>

      </IonContent>
      <IonToast
        isOpen={showToast}
        duration={3000}
        message={messageResult}
        onDidDismiss={() => setShowToast(false)} />

    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    listUserOptions: userselectors.getAllowApprovalUsers(state)
  }),
  mapDispatchToProps: {
    loadListUser
  },
  component: EditLeaveLetterPage
});
