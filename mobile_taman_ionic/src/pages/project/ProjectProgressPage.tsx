import { IonBackButton, IonButtons, IonButton, IonContent, IonHeader, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import '../EditPage.scss';
import { loadProjectByProjectDetailId, loadDataCloseProject, loadDataQuotation, loadDataApproval, loadDataIncurred, loadDataContract, loadDataInvoiceVer1, loadDataEfficiency, loadDataInvoiceVer2, loadDataComplete, loadDataAcceptance, loadDataInvoiceVer3 } from './projectConfig';
import moment from 'moment';
import { FormatterUtils } from '../../util/javascriptUtils';

const ProjectProgressPage: React.FC = () => {

  const [projectDetailDto, setProjectDetailDto] = useState([{}]);
  const params: any = useParams();
  const [indexRow, setIndexRow] = useState(Number);

  useEffect(() => {
    loadProjectByProjectDetailId(params.projectDetailId).then((projectYear: any) => {
      if (projectYear) {
        setProjectDetailDto([projectYear]);
      }
    });
  }, []);

  function refreshData() {
    setIndexRow(0);
    setDataQuotation([]);
    setDataApproval([]);
    setContract([]);
    setinvoiceVer1([]);
    setEfficiency([]);
    setCompletedDate([]);
    setInvoiceVer2([]);
    setAcceptance([]);
    setInvoiceVer3([]);
    setIncurred([]);
    setCloseProject([]);
  }
  const [dataQuotation, setDataQuotation] = useState([{}]);
  function getDataQuotation(index: number, itemId: number) {
    if (dataQuotation.length > 0) {
      refreshData();
    } else {
      if (itemId) {
        loadDataQuotation(itemId).then((projects: any) => {
          if (projects) {
            let tmp = [];
            tmp.push(projects);
            setDataQuotation(tmp);
            setIndexRow(index);
          }
        });
      }
    }
  };

  const [dataApproval, setDataApproval] = useState([{}]);
  function getDataApproval(index: number, itemId: number) {
    if (dataApproval.length > 0) {
      refreshData();
    } else {
      if (itemId) {
        loadDataApproval(itemId).then((projects: any) => {
          if (projects) {
            let tmp = [];
            tmp.push(projects);
            setDataApproval(tmp);
            setIndexRow(index);
          }
        });
      }
    }
  };

  const [contract, setContract] = useState([{}]);
  function getDataContract(index: number, itemId: number) {
    if (contract.length > 0) {
      refreshData();
    } else {
      if (itemId) {
        loadDataContract(itemId).then((projects: any) => {
          if (projects) {
            let tmp = [];
            tmp.push(projects);
            setContract(tmp);
            setIndexRow(index);
          }
        });
      }
    }
  };

  const [dataInvoiceVer1, setinvoiceVer1] = useState([{}]);
  function getDataInvoiceVer1(index: number, itemId: number) {
    if (dataInvoiceVer1.length > 0) {
      refreshData();
    } else {
      if (itemId) {

        loadDataInvoiceVer1(itemId).then((projects: any) => {
          if (projects) {
            let tmp = [];
            tmp.push(projects);
            setinvoiceVer1(tmp);
            setIndexRow(index);
          }
        });
      }
    }
  };

  const [dataEfficiency, setEfficiency] = useState([{}]);
  function getDataEfficiency(index: number, itemId: number) {
    if (dataEfficiency.length > 0) {
      refreshData();
    } else {
      if (itemId) {
        loadDataEfficiency(itemId).then((projects: any) => {
          if (projects) {
            let tmp = [];
            tmp.push(projects);
            setEfficiency(tmp);
            setIndexRow(index);
          }
        });
      }
    }
  };

  const [dataInvoiceVer2, setInvoiceVer2] = useState([{}]);
  function getDataInvoiceVer2(index: number, itemId: number) {
    if (dataInvoiceVer2.length > 0) {
      refreshData();
    } else {
      if (itemId) {
        loadDataInvoiceVer2(itemId).then((projects: any) => {
          if (projects) {
            let tmp = [];
            tmp.push(projects);
            setInvoiceVer2(tmp);
            setIndexRow(index);
          }
        });
      }
    }
  };

  const [dataCompletedDate, setCompletedDate] = useState([{}]);
  function getDatacompletedDate(index: number, itemId: number) {
    if (dataCompletedDate.length > 0) {
      refreshData();
    } else {
      if (itemId) {
        loadDataComplete(itemId).then((projects: any) => {
          if (projects) {
            let tmp = [];
            tmp.push(projects);
            setCompletedDate(tmp);
            setIndexRow(index);
          }
        });
      }
    }
  };

  const [dataAcceptance, setAcceptance] = useState([{}]);
  function getDataAcceptance(index: number, itemId: number) {
    if (dataAcceptance.length > 0) {
      refreshData();
    } else {
      if (itemId) {
        loadDataAcceptance(itemId).then((projects: any) => {
          if (projects) {
            let tmp = [];
            tmp.push(projects);
            setAcceptance(tmp);
            setIndexRow(index);
          }
        });
      }
    }
  };

  const [dataInvoiceVer3, setInvoiceVer3] = useState([{}]);
  function getDataInvoiceVer3(index: number, itemId: number) {
    if (dataInvoiceVer3.length > 0) {
      refreshData();
    } else {
      if (itemId) {
        loadDataInvoiceVer3(itemId).then((projects: any) => {
          if (projects) {
            let tmp = [];
            tmp.push(projects);
            setInvoiceVer3(tmp);
            setIndexRow(index);
          }
        });
      }
    }
  };

  const [dataIncurred, setIncurred] = useState([{}]);
  function getDataIncurred(index: number, itemId: number) {
    if (dataIncurred.length > 0) {
      refreshData();
    } else {
      if (itemId) {
        loadDataIncurred(itemId).then((projects: any) => {
          if (projects) {
            let tmp = [];
            tmp.push(projects);
            setIncurred(tmp);
            setIndexRow(index);
          }
        });
      }
    }
  };

  const [dataCloseProject, setCloseProject] = useState([{}]);
  function getDataCloseProject(index: number, itemId: number) {
    if (dataCloseProject.length > 0) {
      refreshData();
    } else {
      if (itemId) {
        loadDataCloseProject(itemId).then((projects: any) => {
          if (projects) {
            let tmp = [];
            tmp.push(projects);
            setCloseProject(tmp);
            setIndexRow(index);
          }
        });
      }
    }
  };


  return (

    <IonPage id="edituser-page">
      <IonHeader>
        <IonToolbar className='custom-toolbar'>
          <IonButtons slot="start">
            <IonMenuButton className='c-white'></IonMenuButton>
          </IonButtons>
          <IonTitle className='c-white'>Tiến Độ Dự Án</IonTitle>
          <IonButtons slot="end">
            <IonBackButton color="primary"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {projectDetailDto ? projectDetailDto.map((items: any, index: number) =>
            <div className="row" key={"items_" + index}>
              <IonItem >
                <div style={{ margin: 5 }}>
                  <IonLabel style={{ backgroundColor: items.quotation ? "green" : "lightGrey" }}>
                    <h2>1: BÁO GIÁ </h2>
                  </IonLabel>
                  <p> {items.quotation ? moment(items.quotation.sendDate).format("DD/MM/YYYY") : "N/A"}</p>
                </div>
                {(dataQuotation.length && indexRow == 1) > 0 ? <IonButton color="primary" slot="end" onClick={() => getDataQuotation(1, items.quotation.id)}>
                  -
                </IonButton> : <IonButton color="primary" slot="end" onClick={() => getDataQuotation(1, items.quotation.id)}>
                    +
                </IonButton>}
              </IonItem>
              <IonList style={{ padding: 0, margin: 0 }}>
                {(dataQuotation && indexRow == 1) ? dataQuotation.map((projectItemDetail: any) =>
                  <div className="row" key={"projectItemDetail_" + indexRow}>
                    <IonItem >
                      <div style={{ margin: 5 }}>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Báo giá số :  {projectItemDetail.quotationNumber} </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Tổng Tiền :  {FormatterUtils.formatCurrency(projectItemDetail.total)} </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Ngày Gửi :  {projectItemDetail.sendDate ? moment(projectItemDetail.sendDate).format("DD/MM/YYYY") : "N/A"}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Nội Dung :  {projectItemDetail.workContent + projectItemDetail.workContent}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Ghi Chú : {projectItemDetail.note} </IonLabel>
                      </div>
                    </IonItem>
                  </div>) : null}
              </IonList>

              <IonItem >
                <div >
                  <IonLabel style={{ margin: 5, backgroundColor: items.approval ? "green" : "lightGrey" }}>
                    <h2>2: TRẠNG THÁI DUYỆT </h2>
                  </IonLabel>
                  <p> {items.approval ? moment(items.approval.approvalDate).format("DD/MM/YYYY") : "N/A"}</p>
                </div>
                {(dataApproval.length && indexRow == 2) > 0 ? <IonButton color="primary" slot="end" onClick={() => getDataApproval(2, items.approval.id)}>
                  -
                </IonButton> : <IonButton color="primary" slot="end" onClick={() => getDataApproval(2, items.approval.id)}>
                    +
                </IonButton>}
              </IonItem>
              <IonList style={{ padding: 0, margin: 0 }}>
                {(dataApproval && indexRow == 2) ? dataApproval.map((approval: any) =>
                  <div className="row" key={"projectItemDetail_" + indexRow}>
                    <IonItem >
                      <div style={{ margin: 5 }}>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Giá Trị Được Duyệt:  {FormatterUtils.formatCurrency(approval.approvalValue)} </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Ngày Duyệt :  {approval.approvalDate ? moment(approval.approvalDate).format("DD/MM/YYYY") : "N/A"}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Trạng Thái Duyệt :  {approval.approvalStatus} </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Ghi Chú:  {approval.note} </IonLabel>
                      </div>
                    </IonItem>
                  </div>) : null}
              </IonList>

              <IonItem>
                <div >
                  <IonLabel style={{ margin: 5, backgroundColor: items.contract ? "green" : "lightGrey" }}>
                    <h2>3: HỢP ĐỒNG </h2>
                  </IonLabel>
                  <p> {items.contract ? moment(items.contract.sendDate).format("DD/MM/YYYY") : "N/A"}</p>
                </div>
                {(contract.length && indexRow == 3) > 0 ? <IonButton color="primary" slot="end" onClick={() => getDataContract(3, items.contract.id)}>
                  -
                </IonButton> : <IonButton color="primary" slot="end" onClick={() => getDataContract(3, items.contract.id)}>
                    +
                </IonButton>}
              </IonItem>
              <IonList style={{ padding: 0, margin: 0 }}>
                {(contract && indexRow == 3) ? contract.map((contract: any) =>
                  <div className="row" key={"projectItemDetail_" + indexRow}>
                    <IonItem >
                      <div style={{ margin: 5 }}>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Ngày Gửi :  {contract.sendDate ? moment(contract.sendDate).format("DD/MM/YYYY") : "N/A"}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Ngày Bắt Đầu :  {contract.startProgressDate ? moment(contract.startProgressDate).format("DD/MM/YYYY") : "N/A"}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Ngày Kết Thúc :  {contract.endProgressDate ? moment(contract.endProgressDate).format("DD/MM/YYYY") : "N/A"}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }} > Tổng Ngày:  {contract.progressDays} </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Ghi Chú:  {contract.note} </IonLabel>

                      </div>
                    </IonItem>
                  </div>) : null}
              </IonList>

              <IonItem>
                <div >
                  <IonLabel style={{ margin: 5, backgroundColor: items.invoiceVer1 ? "green" : "lightGrey" }}>
                    <h2>4: HÓA ĐƠN 1 </h2>
                  </IonLabel>
                  <p> {items.invoiceVer1 ? moment(items.invoiceVer1.sendDate).format("DD/MM/YYYY") : "N/A"}</p>
                </div>
                {(dataInvoiceVer1.length && indexRow == 4) > 0 ? <IonButton color="primary" slot="end" onClick={() => getDataInvoiceVer1(4, items.invoiceVer1.id)}>
                  -
                </IonButton> : <IonButton color="primary" slot="end" onClick={() => getDataInvoiceVer1(4, items.invoiceVer1.id)}>
                    +
                </IonButton>}
              </IonItem>
              <IonList style={{ padding: 0, margin: 0 }}>
                {(dataInvoiceVer1 && indexRow == 4) ? dataInvoiceVer1.map((invoiceVer1: any) =>
                  <div className="row" key={"projectItemDetail_" + indexRow}>
                    <IonItem >
                      <div style={{ margin: 5 }}>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Số Hóa Đơn: {invoiceVer1.invoiceNumber}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Tiền Hóa Đơn: {FormatterUtils.formatCurrency(invoiceVer1.invoiceMoney)}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Ngày Gửi :  {invoiceVer1.sendDate ? moment(invoiceVer1.sendDate).format("DD/MM/YYYY") : "N/A"}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Trạng Thái TT :  {invoiceVer1.status}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Ghi Chú:  {invoiceVer1.note} </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Hóa Đơn Đầu Vào:  {invoiceVer1.inputInvoice} </IonLabel>
                      </div>
                    </IonItem>
                  </div>) : null}
              </IonList>

              <IonItem>
                <div >
                  <IonLabel style={{ margin: 5, backgroundColor: items.efficiency ? "green" : "lightGrey" }}>
                    <h2>5: THỰC HIỆN </h2>
                  </IonLabel>
                  <p> {items.efficiency ? moment(items.efficiency.startActualProgressDate).format("DD/MM/YYYY") : "N/A"}</p>
                </div>
                {(dataEfficiency.length && indexRow == 5) > 0 ? <IonButton color="primary" slot="end" onClick={() => getDataEfficiency(5, items.efficiency ? items.efficiency.id : null)}>
                  -
                </IonButton> : <IonButton color="primary" slot="end" onClick={() => getDataEfficiency(5, items.efficiency ? items.efficiency.id : null)}>
                    +
                </IonButton>}
              </IonItem>
              <IonList style={{ padding: 0, margin: 0 }}>
                {(dataEfficiency && indexRow == 5) ? dataEfficiency.map((efficiency: any) =>
                  <div className="row" key={"projectItemDetail_" + indexRow}>
                    <IonItem >
                      <div style={{ margin: 5 }}>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Ngày Gửi :  {efficiency.sendDate ? moment(efficiency.sendDate).format("DD/MM/YYYY") : "N/A"}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Ngày Bắt Đầu :  {efficiency.startActualProgressDate ? moment(efficiency.startActualProgressDate).format("DD/MM/YYYY") : "N/A"}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Ngày Dự Tính :  {efficiency.endPlanProgressDate ? moment(efficiency.endPlanProgressDate).format("DD/MM/YYYY") : "N/A"}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Tổng Ngày: {efficiency.totalActualProgressDays}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Đội Thi Công: {efficiency.constructionTeam ? efficiency.constructionTeam.teamLeaderName : "N/A"}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Ghi Chú:  {efficiency.note} </IonLabel>
                      </div>
                    </IonItem>
                  </div>) : null}
              </IonList>

              <IonItem>
                <div >
                  <IonLabel style={{ margin: 5, backgroundColor: items.invoiceVer2 ? "green" : "lightGrey" }}>
                    <h2>6: HÓA ĐƠN 2 </h2>
                  </IonLabel>
                  <p> {items.invoiceVer2 ? moment(items.invoiceVer2.sendDate).format("DD/MM/YYYY") : "N/A"}</p>
                </div>
                {(dataInvoiceVer2.length && indexRow == 6) > 0 ? <IonButton color="primary" slot="end" onClick={() => getDataInvoiceVer2(6, items.invoiceVer2 ? items.invoiceVer2.id : null)}>
                  -
                </IonButton> : <IonButton color="primary" slot="end" onClick={() => getDataInvoiceVer2(6, items.invoiceVer2 ? items.invoiceVer2.id : null)}>
                    +
                </IonButton>}
              </IonItem>
              <IonList style={{ padding: 0, margin: 0 }}>
                {(dataInvoiceVer2 && indexRow == 6) ? dataInvoiceVer2.map((invoiceVer2: any) =>
                  <div className="row" key={"projectItemDetail_" + indexRow}>
                    <IonItem >
                      <div style={{ margin: 5 }}>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Số Hóa Đơn:  {invoiceVer2.invoiceNumber}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Tiền Hóa Đơn:  {invoiceVer2.invoiceMoney}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Yêu Cầu Thanh Toán:  {invoiceVer2.paymentRequestStatus}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Ngày Gửi :  {invoiceVer2.sendDate ? moment(invoiceVer2.sendDate).format("DD/MM/YYYY") : "N/A"}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Trạng Thái Thanh Toán:  {invoiceVer2.status}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Hóa Đơn Đầu Vào:  {invoiceVer2.inputInvoice}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Ghi Chú:  {invoiceVer2.note}  </IonLabel>
                      </div>
                    </IonItem>
                  </div>) : null}
              </IonList>

              <IonItem>
                <div >
                  <IonLabel style={{ margin: 5, backgroundColor: items.complete ? "green" : "lightGrey" }}>
                    <h2>7: HOÀN THÀNH </h2>
                  </IonLabel>
                  <p> {items.complete ? moment(items.complete.completedDate).format("DD/MM/YYYY") : "N/A"}</p>
                </div>
                {(dataCompletedDate.length && indexRow == 7) > 0 ? <IonButton color="primary" slot="end" onClick={() => getDatacompletedDate(7, items.complete ? items.complete.id : null)}>
                  -
                </IonButton> : <IonButton color="primary" slot="end" onClick={() => getDatacompletedDate(7, items.complete ? items.complete.id : null)}>
                    +
                </IonButton>}
              </IonItem>
              <IonList style={{ padding: 0, margin: 0 }}>
                {(dataCompletedDate && indexRow == 7) ? dataCompletedDate.map((complete: any) =>
                  <div className="row" key={"projectItemDetail_" + indexRow}>
                    <IonItem >
                      <div style={{ margin: 5 }}>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Ngày Hoàn Thành :  {complete.completedDate ? moment(complete.completedDate).format("DD/MM/YYYY") : "N/A"}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Ghi Chú :  {complete.note}  </IonLabel>
                      </div>
                    </IonItem>
                  </div>) : null}
              </IonList>

              <IonItem>
                <div >
                  <IonLabel style={{ margin: 5, backgroundColor: items.acceptance ? "green" : "lightGrey" }}>
                    <h2>8: NGHIỆM THU </h2>
                  </IonLabel>
                  <p> {items.acceptance ? moment(items.acceptance.acceptanceDate).format("DD/MM/YYYY") : "N/A"}</p>
                </div>
                {(dataAcceptance.length && indexRow == 8) > 0 ? <IonButton color="primary" slot="end" onClick={() => getDataAcceptance(8, items.acceptance ? items.acceptance.id : null)}>
                  -
                </IonButton> : <IonButton color="primary" slot="end" onClick={() => getDataAcceptance(8, items.acceptance ? items.acceptance.id : null)}>
                    +
                </IonButton>}
              </IonItem>
              <IonList style={{ padding: 0, margin: 0 }}>
                {(dataAcceptance && indexRow == 8) ? dataAcceptance.map((acceptance: any) =>
                  <div className="row" key={"projectItemDetail_" + indexRow}>
                    <IonItem >
                      <div style={{ margin: 5 }}>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Ngày Nghiệm Thu :  {acceptance.acceptanceDate ? moment(acceptance.acceptanceDate).format("DD/MM/YYYY") : "N/A"}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Trạng Thái :  {acceptance.acceptanceStatus}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Sai Sót/Tồn Đọng :  {acceptance.defectRemainingWorkStatus}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Khắc Phục :  {acceptance.overcomeStatus}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Ghi Chú :  {acceptance.note}  </IonLabel>
                      </div>
                    </IonItem>
                  </div>) : null}
              </IonList>

              <IonItem>
                <div >
                  <IonLabel style={{ margin: 5, backgroundColor: items.invoiceVer3 ? "green" : "lightGrey" }}>
                    <h2>9: HÓA ĐƠN 3 </h2>
                  </IonLabel>
                  <p> {items.invoiceVer3 ? moment(items.invoiceVer3.sendDate).format("DD/MM/YYYY") : "N/A"}</p>
                </div>
                {(dataInvoiceVer3.length && indexRow == 9) > 0 ? <IonButton color="primary" slot="end" onClick={() => getDataInvoiceVer3(9, items.invoiceVer3 ? items.invoiceVer3.id : null)}>
                  -
                </IonButton> : <IonButton color="primary" slot="end" onClick={() => getDataInvoiceVer3(9, items.invoiceVer3 ? items.invoiceVer3.id : null)}>
                    +
                </IonButton>}
              </IonItem>
              <IonList style={{ padding: 0, margin: 0 }}>
                {(dataInvoiceVer3 && indexRow == 9) ? dataInvoiceVer3.map((invoiceVer3: any) =>
                  <div className="row" key={"projectItemDetail_" + indexRow}>
                    <IonItem >
                      <div style={{ margin: 5 }}>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Ngày Gửi :  {invoiceVer3.sendDate ? moment(invoiceVer3.sendDate).format("DD/MM/YYYY") : "N/A"}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Số Hóa Đơn :  {invoiceVer3.invoiceNumber}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Tiền Hóa Đơn :  {FormatterUtils.formatCurrency(invoiceVer3.invoiceMoney)}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Yêu Cầu Thanh Toán :  {invoiceVer3.paymentRequestStatus}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Trạng Thái Thanh Toán :  {invoiceVer3.status}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Hóa Đơn Đầu Vào :  {invoiceVer3.inputInvoice}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Ghi Chú :  {invoiceVer3.note}  </IonLabel>
                      </div>
                    </IonItem>
                  </div>) : null}
              </IonList>

              <IonItem>
                <div >
                  <IonLabel style={{ margin: 5, backgroundColor: items.incurred ? "green" : "lightGrey" }}>
                    <h2>10: PHÁT SINH </h2>
                  </IonLabel>
                  <p> {items.incurred ? moment(items.incurred.sendAppendixDate).format("DD/MM/YYYY") : "N/A"}</p>
                </div>
                {(dataIncurred.length && indexRow == 10) > 0 ? <IonButton color="primary" slot="end" onClick={() => getDataIncurred(10, items.incurred ? items.incurred.id : null)}>
                  -
                </IonButton> : <IonButton color="primary" slot="end" onClick={() => getDataIncurred(10, items.incurred ? items.incurred.id : null)}>
                    +
                </IonButton>}
              </IonItem>
              <IonList style={{ padding: 0, margin: 0 }}>
                {(dataIncurred && indexRow == 10) ? dataIncurred.map((incurred: any) =>
                  <div className="row" key={"projectItemDetail_" + indexRow}>
                    <IonItem >
                      <div style={{ margin: 5 }}>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Ngày Gửi :  {incurred.sendAppendixDate ? moment(incurred.sendAppendixDate).format("DD/MM/YYYY") : "N/A"}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Nội Dung Công Việc :  {incurred.workContentIncurred}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Báo Giá :  {FormatterUtils.formatCurrency(incurred.incurredQuotation)}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Giá Trị Được Duyệt :  {FormatterUtils.formatCurrency(incurred.approvalValue)}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Trạng Thái Duyệt :  {incurred.approvalStatus}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Phụ Lục Số :  {incurred.appendixContractNumber}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Bắt Đầu :  {incurred.startProgressDate ? moment(incurred.startProgressDate).format("DD/MM/YYYY") : "N/A"}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Kết Thúc :  {incurred.endProgressDate ? moment(incurred.endProgressDate).format("DD/MM/YYYY") : "N/A"}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Trạng Thái Thực Hiện :  {incurred.workStatus}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Trạng Thái Sai Sót :  {incurred.defectStatus}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Trạng Thái Thanh Toán :  {incurred.paymentStatus}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Hóa Đơn Đầu Vào :  {FormatterUtils.formatCurrency(incurred.inputInvoice)}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Hóa Ghi Chú :  {incurred.note}  </IonLabel>
                      </div>
                    </IonItem>
                  </div>) : null}
              </IonList>

              <IonItem>
                <div >
                  <IonLabel style={{ margin: 5, backgroundColor: items.closeProject ? "green" : "lightGrey" }}>
                    <h2>11: ĐÓNG CÔNG VIỆC </h2>
                  </IonLabel>
                  <p> {items.closeProject ? moment(items.closeProject.closeProjectDate).format("DD/MM/YYYY") : "N/A"}</p>
                </div>
                {(dataCloseProject.length && indexRow == 11) > 0 ? <IonButton color="primary" slot="end" onClick={() => getDataCloseProject(11, items.closeProject ? items.closeProject.id : null)}>
                  -
                </IonButton> : <IonButton color="primary" slot="end" onClick={() => getDataCloseProject(11, items.closeProject ? items.closeProject.id : null)}>
                    +
                </IonButton>}
              </IonItem>
              <IonList style={{ padding: 0, margin: 0 }}>
                {(dataCloseProject && indexRow == 11) ? dataCloseProject.map((closeProject: any) =>
                  <div className="row" key={"projectItemDetail_" + indexRow}>
                    <IonItem >
                      <div style={{ margin: 5 }}>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Giá Trị Được Duyệt :  {FormatterUtils.formatCurrency(closeProject.closeApprovalValue)}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Giá Trị Thực Hiện :  {FormatterUtils.formatCurrency(closeProject.closeWorkDoneValue)}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Lợi Nhuận :  {FormatterUtils.formatCurrency(closeProject.closeApprovalValue - closeProject.closeWorkDoneValue)}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Lợi Nhuận % :  {FormatterUtils.formatCurrency( ((closeProject.closeApprovalValue- closeProject.closeWorkDoneValue)/closeProject.closeApprovalValue)*100)}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Bảo Hành :  {FormatterUtils.formatCurrency(closeProject.guaranteeMoney)}  </IonLabel>

                        <IonLabel style={{ whiteSpace: 'normal' }}> Ngày Bắt Đầu :  {closeProject.guaranteeStartDate ? moment(closeProject.guaranteeStartDate).format("DD/MM/YYYY") : "N/A"}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Ngày Kết Thúc :  {closeProject.guaranteeEndDate ? moment(closeProject.guaranteeEndDate).format("DD/MM/YYYY") : "N/A"}  </IonLabel>

                        <IonLabel style={{ whiteSpace: 'normal' }}> Giá Trị Duyệt Phát Sinh :  {FormatterUtils.formatCurrency(closeProject.incurApprovalValue)}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Giá Trị Thực Hiện Phát Sinh :  {FormatterUtils.formatCurrency(closeProject.incurWorkDoneValue)}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Lợi Nhuận Phát Sinh :  {FormatterUtils.formatCurrency(closeProject.incurApprovalValue - closeProject.incurWorkDoneValue)}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Lợi Nhuận Phát Sinh % :  {FormatterUtils.formatCurrency(  ((closeProject.incurApprovalValue - closeProject.incurWorkDoneValue)/closeProject.incurApprovalValue )*100 )}  </IonLabel>

                        <IonLabel style={{ whiteSpace: 'normal' }}> Đánh Giá:  {closeProject.teamEvaluate}  </IonLabel>
                        <IonLabel style={{ whiteSpace: 'normal' }}> Ghi Chú:  {closeProject.note}  </IonLabel>
                      </div>
                    </IonItem>
                  </div>) : null}
              </IonList>

            </div>) : null}
        </IonList>

        <IonRow>
          {/* <IonCol>
              <IonButton routerLink={`/projectYear/company/${params.conpanyId}`} color="light" expand="block">Quay Lại</IonButton>
            </IonCol> */}

        </IonRow>
      </IonContent>

    </IonPage>
  );
};

export default ProjectProgressPage;
