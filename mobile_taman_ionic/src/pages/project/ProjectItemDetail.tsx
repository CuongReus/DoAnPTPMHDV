import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonItemSliding, IonList, IonMenuButton, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { FormatterUtils } from '../../util/javascriptUtils';
import '../ListPage.scss';
import { loadProject, loadProjectYear } from './projectConfig';

const ProjectItemDetail: React.FC = () => {

  const params: any = useParams();

  const [dataProjectYear, setDataProjectYear] = useState([]);

  const [dataProjects, setListProjectItem] = useState([]);
  const [dataItem, setDataItem] = useState([]);
  const [indexRow, setIndexRow] = useState(0);

  useEffect(() => {
    loadProjectYear(params.conpanyId).then((projectYear: any) => {
      if (projectYear) {
        setDataProjectYear(projectYear);

      }
    });
  }, []);

  function handleSearch(event: any) {
    // var newProjects: any = [];
    // if (event && dataProjects) {

    //   dataProjects.forEach((projectText: any) => {
    //     const shouldShow = projectText.name.toLowerCase().indexOf(event) > -1;
    //     if (shouldShow) {
    //       newProjects.push(projectText);
    //     }
    //   });
    //   setListProjectItem(newProjects);
    // } else {
    //   setListProjectItem(defaultData);
    // }

    var resultSearch = dataProjects.filter((project: any) => (project.name.toLowerCase().indexOf(event.toLowerCase()) > -1));
    setDataItem(resultSearch);
  };

  function loadProjectScreen( index : number) {
    if (dataProjects.length > 0) {
      setListProjectItem([]);
      setIndexRow(index);

    } else {
      loadProject().then((projects: any) => {
        if (projects) {
          setListProjectItem(projects);
          setDataItem(projects);
          setIndexRow(index);
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
        {/* <IonToolbar>
          <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)}></IonSearchbar>
        </IonToolbar> */}

        <IonToolbar className='custom-toolbar'>
          <IonSearchbar
            className="custom-search"
            placeholder="Tìm tên, email, phone"
            onIonChange={(e: any) => handleSearch(e.detail.value)}
          />
        </IonToolbar>

      </IonHeader>
      <IonContent>
        <IonList>
          {dataProjectYear ? dataProjectYear.map((item: any, index: number) =>

            <IonItemSliding key={"dataProjectYear_" + index}>
              <IonItem >
                <div>
                  <p>
                    Năm: {item.year}
                  </p>
                  <p>
                    Doanh Thu: {FormatterUtils.formatCurrency(item.totalRevenue)}
                  </p>
                  <p>
                    Lợi Nhuận: {FormatterUtils.formatCurrency(item.totalProfit)}
                  </p>
                </div>
                {dataProjects.length > 0 ? <IonButton slot="end" onClick={() => loadProjectScreen(index)}>
                  -
                </IonButton> : <IonButton slot="end" onClick={() => loadProjectScreen(index)}>
                    +
                </IonButton>}
                {/* <ProjectItemDetailRow dataProjects={dataProjects} /> */}

              </IonItem>
              <IonList>
                { (dataItem && indexRow == index ) ? dataItem.map((project: any, index: number) =>
                  <IonItem>
                    {project.name}
                  </IonItem>
                ) : null}

              </IonList>
            </IonItemSliding>

          ) : null}
        </IonList>
      </IonContent>

    </IonPage>
  );
};

export default ProjectItemDetail;


