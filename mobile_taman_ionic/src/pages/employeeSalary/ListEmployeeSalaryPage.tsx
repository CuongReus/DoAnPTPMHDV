import { getConfig, IonButtons, IonContent, IonGrid, IonHeader, IonItem, IonItemSliding, IonLabel, IonList, IonMenuButton, IonModal, IonPage, IonRefresher, IonRefresherContent, IonRow, IonSearchbar, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from '../../data/connect';
import '../ListPage.scss';
import { EmployeeSalary } from './EmployeeSalary';
import * as employeeSalaryselectors from './EmployeeSalarySelectors';
import { loadListEmployeeSalary } from './listemployeeSalary.actions';
import { setSearchText } from '../../data/sessions/sessions.actions';


interface OwnProps { }

interface StateProps {
  listEmployeeSalarys: EmployeeSalary[];
  mode: 'ios' | 'md'
}

interface DispatchProps {
  setSearchText: typeof setSearchText;
  loadListEmployeeSalary: typeof loadListEmployeeSalary;
}

type ListEmployeeSalaryPageProps = OwnProps & StateProps & DispatchProps;

const ListEmployeeSalaryPage: React.FC<ListEmployeeSalaryPageProps> = ({ listEmployeeSalarys, setSearchText, loadListEmployeeSalary, mode }) => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);
  const [showCompleteToast, setShowCompleteToast] = useState(false);

  const doRefresh = () => {
    setTimeout(() => {
      ionRefresherRef.current!.complete();
      setShowCompleteToast(true);
    }, 2500)
  };

  // const listEmployeeSalarys = [{id: 1, name: "Nguyễn Văn A", email: "nguyenvana@gmail.com", phone: "0909825783"},
  //                 {id: 2, name: "Nguyễn Văn B", email: "nguyenvana@gmail.com", phone: "0909825783"},
  //                 {id: 3, name: "Nguyễn Văn C", email: "nguyenvana@gmail.com", phone: "0909825783"}];
  useEffect(() => {
    loadListEmployeeSalary();
  }, []);

  return (
    <IonPage id="list-employeeSalary-page" className="list-page">
      <IonHeader>
        <IonToolbar className='custom-toolbar'>
          <IonButtons slot="start">
            <IonMenuButton className='c-white'/>
          </IonButtons>

          <IonTitle className='c-white'>Lương Nhân viên</IonTitle>

        </IonToolbar>
        {/* <IonList>
        <IonGrid>
          <IonRow>
            <IonItem>
              <IonLabel>Tháng</IonLabel>
              <IonSelect> ok-text="Submit" cancel-text="Cancel"
                <IonSelectOption value="01">Tháng 1</IonSelectOption>
                <IonSelectOption value="02">Tháng 02</IonSelectOption>
                <IonSelectOption value="03">Tháng 03</IonSelectOption>
                <IonSelectOption value="04">Tháng 04</IonSelectOption>
                <IonSelectOption value="05">Tháng 05</IonSelectOption>
                <IonSelectOption value="06">Tháng 06</IonSelectOption>
                <IonSelectOption value="07">Tháng 07</IonSelectOption>
                <IonSelectOption value="08">Tháng 08</IonSelectOption>
                <IonSelectOption value="09">Tháng 09</IonSelectOption>
                <IonSelectOption value="10">Tháng 10</IonSelectOption>
                <IonSelectOption value="11">Tháng 11</IonSelectOption>
                <IonSelectOption value="12">Tháng 12</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel>Năm</IonLabel>
              <IonSelect ok-text="Submit" cancel-text="Cancel">
                <IonSelectOption value="2018">2018</IonSelectOption>
                <IonSelectOption value="2019">2019</IonSelectOption>
                <IonSelectOption value="2020">2020</IonSelectOption>
                <IonSelectOption value="2021">2021</IonSelectOption>
                <IonSelectOption value="2022">2022</IonSelectOption>
                <IonSelectOption value="2023">2023</IonSelectOption>
                <IonSelectOption value="2024">2024</IonSelectOption>
                <IonSelectOption value="2025">2025</IonSelectOption>
                <IonSelectOption value="2026">2026</IonSelectOption>
                <IonSelectOption value="2027">2027</IonSelectOption>
                <IonSelectOption value="2028">2028</IonSelectOption>
                <IonSelectOption value="2029">2029</IonSelectOption>
              </IonSelect>

            </IonItem>

          </IonRow>
        </IonGrid>
        </IonList> */}

        <IonToolbar className='custom-toolbar'>
          <IonSearchbar
            placeholder="Tìm tên, mã nhân viên"
            onIonChange={(e: any) => setSearchText(e.detail.value)}
          />
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonRefresher slot="fixed" ref={ionRefresherRef} onIonRefresh={doRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        {/* <IonToast
          isOpen={showCompleteToast}
          message="Refresh complete"
          duration={2000}
          onDidDismiss={() => setShowCompleteToast(false)}
        /> */}

        <IonList>
          {listEmployeeSalarys.map((employeeSalary, index: number) => (
            <IonItemSliding key={employeeSalary.id}>
              <IonItem routerLink={`/editEmployeeSalary/${employeeSalary.id}`}>
                <IonLabel>
                  <h3> Tên: {employeeSalary.user.fullName} </h3>
                  <p>
                    Mã Nhân Viên {employeeSalary.user.code} - Vị Trí {employeeSalary.user.position}
                  </p>
                  <p>
                    Tổng ngày công: {employeeSalary.actualAttendance} - Năm: {employeeSalary.year}
                  </p>
                  <p>
                    Lương Chính: {employeeSalary.totalSalary}
                  </p>
                  <p>
                    Lương Thực Lĩnh: {employeeSalary.actualSalary}
                  </p>

                </IonLabel>
              </IonItem>
            </IonItemSliding>

          ))}
        </IonList>
      </IonContent>

      <IonModal
        isOpen={showFilterModal}
        onDidDismiss={() => setShowFilterModal(false)}
      >
      </IonModal>

    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    listEmployeeSalarys: employeeSalaryselectors.getFilteredEmployeeSalarys(state),
    mode: getConfig()!.get('mode')
  }),
  mapDispatchToProps: {
    setSearchText, loadListEmployeeSalary
  },
  component: React.memo(ListEmployeeSalaryPage)
});
