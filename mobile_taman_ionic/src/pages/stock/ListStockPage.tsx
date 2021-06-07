import React, { useState, useRef, useEffect } from 'react';
import { IonToolbar, IonContent, IonPage, IonButtons, IonMenuButton, IonLoading, IonSearchbar, IonRefresher, IonRefresherContent, IonModal, IonHeader, getConfig, IonTitle, IonList, IonItem, IonLabel, IonItemSliding, IonAvatar } from '@ionic/react';
import { connect } from '../../data/connect';
import { options } from 'ionicons/icons';
import '../ListPage.scss'
import * as stockselectors from './StockSelectors';
import { Stock } from './Stock';
import { loadListStock } from './liststock.actions';
import { setSearchText } from '../../data/sessions/sessions.actions';


interface OwnProps { }

interface StateProps {
  listStocks: Stock[];
  mode: 'ios' | 'md'
}

interface DispatchProps {
  setSearchText: typeof setSearchText;
  loadListStock: typeof loadListStock;
}

type ListStockPageProps = OwnProps & StateProps & DispatchProps;

const ListStockPage: React.FC<ListStockPageProps> = ({ listStocks, setSearchText,loadListStock, mode }) => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);
  const [showCompleteToast, setShowCompleteToast] = useState(false);

  const doRefresh = () => {
    setTimeout(() => {
      ionRefresherRef.current!.complete();
      setShowCompleteToast(true);
    }, 2500)
  };

  useEffect(() => {
    loadListStock();
  }, []);

  return (
    <IonPage id="list-stock-page" className="list-page">
      <IonHeader>
        <IonToolbar className='custom-toolbar'>
          <IonButtons slot="start">
            <IonMenuButton className='c-white'/>
          </IonButtons>

          <IonTitle className='c-white'>Tồn Kho Sản Phẩm</IonTitle>

        </IonToolbar>

        <IonToolbar className='custom-toolbar'>
          <IonSearchbar
            className="custom-search"
            placeholder="Tìm theo tên sản phẩm"
            onIonChange={(e: CustomEvent) => setSearchText(e.detail.value)}
          />
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonRefresher slot="fixed" ref={ionRefresherRef} onIonRefresh={doRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        <IonLoading message="Đang tải dữ liệu..." backdrop-dismiss={true} duration={3000} isOpen={(true)} />
        <IonList>
        {listStocks.map((stock, index: number) => (
          <IonItemSliding key={stock.id}>
            <IonItem>
              <IonLabel>
                <h3> Mã {stock.product.code} - Loại {stock.product.productCategory.name}</h3>
                <p>
                Tên: {stock.product.name}
                </p>
                <p>
                Kho: {stock.storageLocation.locationName} - Tồn : {stock.quantity}
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
    listStocks: stockselectors.getFilteredStocks(state),
    mode: getConfig()!.get('mode')
  }),
  mapDispatchToProps: {
    setSearchText, loadListStock
  },
  component: React.memo(ListStockPage)
});
