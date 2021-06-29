import moment from 'moment';
import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import ModalAcceptance from '../views/acceptance/ModalAcceptance';
import ModalApproval from '../views/approval/ModalApproval';
import ModalCloseProject from '../views/closeProject/ModalCloseProject';
import ModalComplete from '../views/complete/ModalComplete';
import ModalEfficiency from '../views/efficiency/ModalEfficiency';
import ModalIncurred from '../views/incurred/ModalIncurred';
import ModalInvoiceVer1 from '../views/invoiceVer1/ModalInvoiceVer1';
import ModalInvoiceVer2 from '../views/invoiceVer2/ModalInvoiceVer2';
import ModalInvoiceVer3 from '../views/invoiceVer3/ModalInvoiceVer3';
import ModalQuotation from '../views/quotation/ModalQuotation';

class ProgressDetailStep extends React.Component {
    constructor(props) {
        super(props);   
        this.state = {
            isQuotationItemShownModal:false,
            isApprovalItemShownModal:false,
            isAcceptanceItemShownModal:false,
            isCloseProjectItemShownModal:false,
            isEfficiencyItemShownModal:false,
            isInvoiceVer1ItemShownModal:false,
            isInvoiceVer2ItemShownModal:false,
            isInvoiceVer3ItemShownModal:false,
            isCompleteItemShownModal:false,
            isIncurredItemShownModal:false,
            idProgressItem:null,

        }
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.handleHidemodal = this.handleHidemodal.bind(this);
        this.handleAfterSaveModal = this.handleAfterSaveModal.bind(this);
      
    };

    handleShowmodal(id) {
        const {keyItem} = this.props;
        this.setState({idProgressItem:null});
    if(keyItem == "quotation"){
             this.setState({
            idProgressItem: id,
            isQuotationItemShownModal: true
            });
        
    }else if(keyItem == "approval"){
        this.setState({
            isApprovalItemShownModal: true,
            idProgressItem: id
        })
    } 
    else if(keyItem == "acceptance"){
        this.setState({
            isAcceptanceItemShownModal: true,
            idProgressItem: id
        })
    } else if(keyItem == "closeProject"){
        this.setState({
            isCloseProjectItemShownModal: true,
            idProgressItem: id
        })
    } else if(keyItem == "efficiency"){
        this.setState({
            isEfficiencyItemShownModal: true,
            idProgressItem: id
        })
    } else if(keyItem == "incurred"){
        this.setState({
            isIncurredItemShownModal: true,
            idProgressItem: id
        })
    } else if(keyItem == "invoiceVer1"){
        this.setState({
            isInvoiceVer1ItemShownModal: true,
            idProgressItem: id
        })
    } else if(keyItem == "invoiceVer2"){
        this.setState({
            isInvoiceVer2ItemShownModal: true,
            idProgressItem: id
        })
    } else if(keyItem == "invoiceVer3"){
        this.setState({
            isInvoiceVer3ItemShownModal: true,
            idProgressItem: id
        })
    } 
    else if(keyItem == "complete"){
        this.setState({
            isCompleteItemShownModal: true,
            idProgressItem: id
        })
    } 
       
    }
    handleHidemodal() {
        this.setState({
            isQuotationItemShownModal:false,
            isApprovalItemShownModal:false,
            isAcceptanceItemShownModal:false,
            isCloseProjectItemShownModal:false,
            isEfficiencyItemShownModal:false,
            isInvoiceVer1ItemShownModal:false,
            isInvoiceVer2ItemShownModal:false,
            isInvoiceVer3ItemShownModal:false,
            isCompleteItemShownModal:false,
            isIncurredItemShownModal:false
        })
        
    }
    handleAfterSaveModal() {
        this.props.onReload();
        this.handleHidemodal();
      

    }
    render() {
        const {rank,titleDate,titleName,endProgress,idProgressItem,idActiveColor,availableToInput,isEnoughData,projectDetailDto,labelNotify} = this.props;
        
        var stepBackgroundColor=null;
        
        if(idActiveColor && isEnoughData){
            stepBackgroundColor = "green";
        }else if(idActiveColor && !isEnoughData){
            stepBackgroundColor = "#FF8C00";
        }else{
            stepBackgroundColor =  "lightGrey";
        }
        return(
            
        //     position: absolute;
        //     top: 0;
        //     left: 0;
        //     right: 0;
        //     text-align: center;
        // }

            <div key={"ProgressDetailStep_"+projectDetailDto.id} style={{width: '9%', display: 'table-cell', position: 'relative', paddingTop: '24px'}}>
            <center>


            <div> 
            <OverlayTrigger rootClose={true} trigger={['hover']} placement="top" overlay={
            !isEnoughData?
            <Popover id="popover-basic" title={titleName}>
                <div>{labelNotify}</div>
          </Popover>:  <div style={{display:'none'}}><Popover id="popover-basic" >
          </Popover></div>
          

         
           }>
            <div>
            {availableToInput ?  <a onClick={() => this.handleShowmodal(idProgressItem)}
            style={{lineHeight:
             '36px',
              color: "#FFF",
              width: '60px',
               height: '35px', 
               backgroundColor:stepBackgroundColor ,
                borderRadius: '20%',
                 textAlign: 'center',
                  padding: '1px', 
                  fontSize: '16px', display: 'block', borderWidth: '0px'}}>{rank}</a> 
                  : <span 
                  style={{lineHeight:
                   '36px',
                    color: "#FFF",
                    width: '60px',
                     height: '35px', 
                     backgroundColor:stepBackgroundColor ,
                      borderRadius: '20%',
                       textAlign: 'center',
                        padding: '1px', 
                        fontSize: '16px', display: 'block', borderWidth: '0px'}}>{rank}</span>}

            <a style={{marginTop: '4px', fontSize: '10px', fontWeight: 300, textAlign: 'center', display: 'block', color: "black"}}>
            <br/>
            <span>  {titleDate ? moment(titleDate).format("DD/MM/YYYY"):"N/A"} <br/> {titleName=="THỰC HIỆN"&&idActiveColor?<span>{projectDetailDto.efficiency && projectDetailDto.efficiency.curator ?projectDetailDto.efficiency.curator.fullName: "N/A" }</span>:null} <br/>  {titleName} <br/>   </span>
            </a>
            </div>
            </OverlayTrigger> 
            </div>
            </center>
           {!endProgress ? <div style={{position: 'absolute', top: '40px', height: '1px', borderTopStyle: 'solid', borderTopWidth: '1px', right: '0px', left: '80px'}}>
            </div> : null}
            {this.state.isQuotationItemShownModal    ? <ModalQuotation title="Báo Giá"  idQuotation={this.state.idProgressItem} projectDetailDto={this.props.projectDetailDto}           show={this.state.isQuotationItemShownModal}       onHide={this.handleHidemodal} onAfterSave={this.handleAfterSaveModal} /> : null}
            {this.state.isApprovalItemShownModal     ? <ModalApproval title="Trạng Thái Duyệt"  idApproval={this.state.idProgressItem} projectDetailDto={this.props.projectDetailDto}    show={this.state.isApprovalItemShownModal}         onHide={this.handleHidemodal}     onAfterSave={this.handleAfterSaveModal}   /> : null}
            {this.state.isAcceptanceItemShownModal   ? <ModalAcceptance title="Nghiệm Thu"  idAcceptance={this.state.idProgressItem} projectDetailDto={this.props.projectDetailDto}     show={this.state.isAcceptanceItemShownModal}      onHide={this.handleHidemodal}      onAfterSave={this.handleAfterSaveModal}     />    :null}
            {this.state.isCloseProjectItemShownModal ? <ModalCloseProject title="Đóng Dự Án" subtitle1="Phát Sinh"  subtitle2="Đội Thi Công"  idCloseProject={this.state.idProgressItem} projectDetailDto={this.props.projectDetailDto} show={this.state.isCloseProjectItemShownModal}  onAfterSave={this.handleAfterSaveModal} onHide={this.handleHidemodal} />    :null}
            {this.state.isEfficiencyItemShownModal   ? <ModalEfficiency title="Thực Hiện"  idEfficiency={this.state.idProgressItem} projectDetailDto={this.props.projectDetailDto}      show={this.state.isEfficiencyItemShownModal}     onHide={this.handleHidemodal}      onAfterSave={this.handleAfterSaveModal}         />    :null}
            {this.state.isInvoiceVer1ItemShownModal  ? <ModalInvoiceVer1 title="Hoá Đơn Lần 1"  idInvoiceVer1={this.state.idProgressItem} projectDetailDto={this.props.projectDetailDto} show={this.state.isInvoiceVer1ItemShownModal}    onHide={this.handleHidemodal}      onAfterSave={this.handleAfterSaveModal}      />    :null}
            {this.state.isInvoiceVer2ItemShownModal  ? <ModalInvoiceVer2 title="Hoá Đơn Lần 2"  idInvoiceVer2={this.state.idProgressItem} projectDetailDto={this.props.projectDetailDto}show={this.state.isInvoiceVer2ItemShownModal}   onHide={this.handleHidemodal}       onAfterSave={this.handleAfterSaveModal}     />    :null}
            {this.state.isInvoiceVer3ItemShownModal  ? <ModalInvoiceVer3 title="Hoá Đơn Lần 3"  idInvoiceVer3={this.state.idProgressItem} projectDetailDto={this.props.projectDetailDto}show={this.state.isInvoiceVer3ItemShownModal}    onHide={this.handleHidemodal}      onAfterSave={this.handleAfterSaveModal}      />    :null}
            {this.state.isCompleteItemShownModal     ? <ModalComplete title="Hoàn Thành"  idComplete={this.state.idProgressItem} projectDetailDto={this.props.projectDetailDto}        show={this.state.isCompleteItemShownModal}        onHide={this.handleHidemodal}      onAfterSave={this.handleAfterSaveModal}     />   :null}
            {this.state.isIncurredItemShownModal     ? <ModalIncurred title="Phát Sinh"   idIncurred={this.state.idProgressItem} projectDetailDto={this.props.projectDetailDto}         show={this.state.isIncurredItemShownModal }       onHide={this.handleHidemodal}     onAfterSave={this.handleAfterSaveModal}       />    :null}   
            </div>
        
       
        );
      
    }
}
export default ProgressDetailStep;