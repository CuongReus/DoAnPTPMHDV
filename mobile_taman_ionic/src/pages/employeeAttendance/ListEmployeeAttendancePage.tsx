import React, { useState, useRef, useEffect } from 'react';
import { IonToolbar, IonContent, IonPage, IonButtons, IonMenuButton, IonSearchbar, IonRefresher, IonRefresherContent, IonModal, IonHeader, getConfig, IonTitle, IonList, IonItem, IonLabel, IonItemSliding, IonAvatar, IonItemOption, IonPopover, IonLoading } from '@ionic/react';
import { connect } from '../../data/connect';
import '../ListPage.scss'
import * as employeeSelectors from './EmployeeAttendanceSelectors';
import { setSearchText } from '../../data/sessions/sessions.actions';
import { Employee } from './Employee';
import { loadListEmployeeAttendance } from './listEmployeeAttendance.actions';
import startOfMonth from 'date-fns/startOfMonth'
import lastDayOfMonth from 'date-fns/lastDayOfMonth'
import moment from 'moment';

interface OwnProps { }

interface StateProps {
  listEmployees: Employee[];
  mode: 'ios' | 'md'
}

interface DispatchProps {
  setSearchText: typeof setSearchText;
  loadListEmployeeAttendance: typeof loadListEmployeeAttendance;
}

type ListEmployeeAttendancePageProps = OwnProps & StateProps & DispatchProps;

const ListEmployeeAttendancePage: React.FC<ListEmployeeAttendancePageProps> = ({ listEmployees, setSearchText, loadListEmployeeAttendance, mode }) => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);
  const [showCompleteToast, setShowCompleteToast] = useState(false);
  const [showPopover, setShowPopover] = useState(false);


  const doRefresh = () => {
    setTimeout(() => {
      ionRefresherRef.current!.complete();
      setShowCompleteToast(true);
    }, 2500)
  };

  const currentUser = JSON.parse(localStorage._cap_currentUser);

  var currentDate = new Date();;
  var startDateOfMonth = moment(startOfMonth(currentDate)).format("YYYY-MM-DD-HH:mm:ss");
  var endDateOfMonth = moment(lastDayOfMonth(currentDate)).format("YYYY-MM-DD-HH:mm:ss");

  useEffect(() => {
    loadListEmployeeAttendance(currentUser.id,startDateOfMonth,endDateOfMonth);
  }, []);

  return (
    <IonPage id="list-user-page" className="list-page">
      <IonHeader>
        <IonToolbar className='custom-toolbar'>
          <IonButtons slot="start">
            <IonMenuButton className='c-white'/>
          </IonButtons>

          <IonTitle className='c-white'>Danh Sách Chấm Công</IonTitle>

        </IonToolbar>

        <IonToolbar className='custom-toolbar'>
          <IonSearchbar
            className="custom-search"
            placeholder="Tìm tên, phone, ngày làm"
            onIonChange={(e: any) => setSearchText(e.detail.value)}
          />
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonRefresher slot="fixed" ref={ionRefresherRef} onIonRefresh={doRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        <IonLoading message="Please wait..." duration={0} isOpen={(listEmployees ? false : true)} />
        <IonList>
          {listEmployees && listEmployees.map((employee, index: number) => (
            <IonItemSliding key={employee.id}>
              <IonItem>
                <IonAvatar slot="start">
                  <img src="/assets/img/avartar-blue.png"/>
                </IonAvatar>

                <IonLabel>

                  <h3>{employee.user.fullName}</h3>
                  <p>
                    Phone: {employee.user.phone}
                  </p>
                  <p>
                    Ngày Làm Việc: {employee.dateToWork}
                  </p>
                  <p>
                    Nơi Làm Việc: {employee.workPlace}
                  </p>
                  <p>
                    Trạng Thái: {employee.status}
                  </p>
                  <p>
                    Đi Trể: {employee.lateStatus}
                  </p>
                </IonLabel>
              </IonItem>
              <IonPopover
                isOpen={showPopover}
                cssClass=''
                onDidDismiss={e => setShowPopover(false)}
              >
                <p>This is popover content</p>
              </IonPopover>
            </IonItemSliding>


          ))}
        </IonList>
      </IonContent>

      <IonModal
        isOpen={showFilterModal}
        onDidDismiss={() => setShowFilterModal(false)}>
      </IonModal>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    listEmployees: employeeSelectors.getFilteredEmployees(state),
    mode: getConfig()!.get('mode')
  }),
  mapDispatchToProps: {
    setSearchText, loadListEmployeeAttendance
  },
  component: React.memo(ListEmployeeAttendancePage)
});
