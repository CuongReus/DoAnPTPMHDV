import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { FormatterUtils } from '../../util/javascriptUtils';
import '../ListPage.scss';
import { loadProjectYear, loadListProjectByProjectItemId, listFindByProjectYear } from './projectConfig';

const ProjectYearPage: React.FC = () => {

  const params: any = useParams();

  const [dataProjectYear, setDataProjectYear] = useState([]);

  const [dataProjects, setListProjectItem] = useState([]);
  const [dataItem, setDataItem] = useState([]);
  const [indexRow, setIndexRow] = useState(0);
  const [dataItemDetail, setDataItemDetail] = useState([]);
  const [indexDataItemRow, setIndexDataItemRow] = useState(0);

  useEffect(() => {
    loadProjectYear(params.conpanyId).then((projectYear: any) => {
      if (projectYear) {
        setDataProjectYear(projectYear);
      }
    });
  }, []);

  function handleSearch(event: any) {
    var resultSearch = dataProjects.filter((project: any) => (project.name.toLowerCase().indexOf(event.toLowerCase()) > -1));
    setDataItem(resultSearch);
  };

  function loadProjectScreen(index: number, projectYearId: number) {
    if (dataProjects.length > 0) {
      setListProjectItem([]);
      setDataItem([]);
      setDataItemDetail([]);
      setIndexRow(index);
    } else {
      listFindByProjectYear(projectYearId).then((projects: any) => {
        if (projects) {
          setListProjectItem(projects);
          setDataItem(projects);
          setIndexRow(index);
        }
      });
    }
  };

  function loadProjectIemDetail(index: number, projectItemId: number) {
    if (dataItemDetail.length > 0) {
      setDataItemDetail([]);
      setIndexDataItemRow(index);

    } else {
      loadListProjectByProjectItemId(projectItemId).then((projects: any) => {
        if (projects) {
          setDataItemDetail(projects);
          setIndexDataItemRow(index);
        }
      });
    }
  };

  return (
    <IonPage id="list-user-page" className="list-page">
      <IonHeader>
        <IonToolbar className='custom-toolbar'>
          <IonButtons slot="start">
            <IonMenuButton className='c-white'/>
          </IonButtons>
          <IonTitle className='c-white'>Danh Sách Dự Án</IonTitle>
          <IonButtons slot="end">
            <IonBackButton color="primary"></IonBackButton>
          </IonButtons>
        </IonToolbar>

        <IonToolbar className='custom-toolbar'>
          <IonSearchbar
            className="custom-search"
            placeholder="Tìm theo tên"
            onIonChange={(e: any) => handleSearch(e.detail.value)}
          />
        </IonToolbar>

      </IonHeader>
      <IonContent>
        <IonList  >
          {dataProjectYear ? dataProjectYear.map((item: any, index1: number) =>
            <div key={"dataProjectYear_" + index1} >
              <IonItem color="secondary"  >
                <div>
                  <p> {(index1 + 1 + ". ")}
                    Năm: {item.year}
                  </p>
                  <p>
                    Doanh Thu: {FormatterUtils.formatCurrency(item.totalRevenue)}
                  </p>
                  <p>
                    Lợi Nhuận: {FormatterUtils.formatCurrency(item.totalProfit)}
                  </p>
                </div>
                {(dataProjects.length && indexRow == index1) > 0 ? <IonButton color="primary" slot="end" onClick={() => loadProjectScreen(index1, item.id)}>
                  -
                </IonButton> : <IonButton color="primary" slot="end" onClick={() => loadProjectScreen(index1, item.id)}>
                    +
                </IonButton>}
                {/* <ProjectItemDetailRow dataProjects={dataProjects} /> */}

              </IonItem>

              {/* list Level 1 */}
              < IonList style={{ padding: 0, margin: 0 }}>
                {(dataItem && indexRow == index1) ? dataItem.map((project: any, index2: number) =>
                  <div key={"project_item_" + index2} >
                    <IonItem color="primary">
                      <div style={{ margin: 5 }}>
                        <IonLabel style={{ whiteSpace: 'normal' }}>
                          {(index1 + 1) + "." + (index2 + 1) + ". " + project.name}
                        </IonLabel>
                        <br />
                        <IonLabel slot="end">
                          Tổng Doanh Thu: {FormatterUtils.formatCurrency(project.totalRevenue)}
                        </IonLabel>
                        <br />
                        <IonLabel slot="end">
                          Tổng Lợi Nhuận: {FormatterUtils.formatCurrency(project.totalProfit)}
                        </IonLabel>
                        <br />
                      </div>
                      {((dataItemDetail.length > 0) && (indexDataItemRow == index2)) ? <IonButton color="secondary" slot="end" onClick={() => loadProjectIemDetail(index2, project.id)}>
                        -
                  </IonButton> : <IonButton color="secondary" slot="end" onClick={() => loadProjectIemDetail(index2, project.id)}>
                          +
                  </IonButton>}
                    </IonItem>

                    {/* list Level 2 */}
                    <IonList style={{ padding: 0, margin: 0 }}>
                      {(dataItemDetail && indexDataItemRow == index2) ? dataItemDetail.map((projectItemDetail: any, index3: number) =>
                        <div className="row" key={"projectItemDetail_" + index3}>
                          <IonItem color="success" >
                            <div style={{ margin: 5 }}>
                              <IonLabel>
                                {(indexRow + 1) + "." + (indexDataItemRow + 1) + "." + (index3 + 1) + ". " + projectItemDetail.name}
                              </IonLabel>
                              <br />
                              <IonLabel slot="end">
                                Tổng Doanh Thu: {FormatterUtils.formatCurrency(projectItemDetail.totalRevenue)}
                              </IonLabel>
                              <br />
                              <IonLabel slot="end">
                                Tổng Lợi Nhuận: {FormatterUtils.formatCurrency(projectItemDetail.totalProfit)}
                              </IonLabel>
                              <br />
                              <div className="row">
                                <IonButton color="light" slot="start" routerLink={`/detailPaymentProject/${projectItemDetail.id}/${params.conpanyId}`}> Thanh Toán </IonButton>
                                <IonButton color="light" slot="end" routerLink={`/detailPaymentProjectVAT/${projectItemDetail.id}`}> Hạch Toán VAT </IonButton>
                              </div>
                            </div>
                          </IonItem>
                        </div>) : null}
                    </IonList>

                  </div>) : null}
              </IonList>
            </div>) : null}

        </IonList>
      </IonContent>
    </IonPage >
  );
};

export default ProjectYearPage;


