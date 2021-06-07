import React from 'react';
import { translate } from 'react-i18next';
import { FormatterUtils } from '../../utils/javascriptUtils';
import moment from 'moment';

class ModalInvoiceDifferentRows extends React.Component {
    constructor() {
        super();
        this.state = {
        }
    };

    componentWillMount() {
        
    };

    render() {

        const {item , indexs} = this.props;

        var rowProduuct = [];
        var rowLabour = [];
        var rowTeam = [];
        var rowOrther = [];
        var thRowProjectCost =[];

        let numberProduct = 0;
        let totalProductPrice = 0;
        let totalProductmoney = 0;
        let totalProductPaid = 0;

        let numberLabour = 0;
        let totalLabourPrice = 0;
        let totalLabourMoney = 0;
        let totalLabourPaid = 0;

        let numberTeam = 0;
        let totalTeamPrice = 0;
        let totalTeamMoney = 0;
        let totalTeamPaid = 0;

        let numberOrther = 0;
        let totalOrtherPrice = 0;
        let totalOrtherMoney = 0;
        let totalOrtherPaid = 0;

        var rows = [];
        var indexInvoiceOupt = 0;
        if(item.projectCosts){
            item.projectCosts.map((item, index) =>{
                if( item.paymentType == "NHAN_CONG"){
                    numberLabour++;
                    totalLabourPrice += item.unitPrice;
                    totalLabourMoney += item.totalMoney;
                    totalLabourPaid += item.totalPaid;
                }else if( item.paymentType == "VAT_TU"){
                    numberProduct++;
                    totalProductPrice += item.unitPrice;
                    totalProductmoney += item.totalMoney;
                    totalProductPaid += item.totalPaid;
                }else if( item.paymentType == "CHI_PHI_KHAC"){
                    numberOrther++;
                    totalOrtherPrice += item.unitPrice;
                    totalOrtherMoney += item.totalMoney;
                    totalOrtherPaid += item.totalPaid;
                    
                }else if( item.paymentType == "DOI_THI_CONG"){
                    numberTeam++;
                    totalTeamPrice += item.unitPrice;
                    totalTeamMoney += item.totalMoney;
                    totalTeamPaid += item.totalPaid;
                }
            })
            if(numberLabour > 0 ){
                indexInvoiceOupt++;
                rowLabour = [<tr>
                                    <td>{indexs + "."+indexInvoiceOupt }</td>
                                    <td>Nhân Công</td>
                                    <td>{numberLabour}</td>
                                    <td>{ totalLabourPrice}</td>
                                    <td>{totalLabourMoney}</td>
                                    <td>{totalLabourPaid}</td>
                                </tr> ]
            }
            if(numberProduct > 0){
                indexInvoiceOupt++;
                rowProduuct =  [<tr>
                                    <td>{indexs +"."+indexInvoiceOupt}</td>
                                    <td>Vật Tư</td>
                                    <td>{numberProduct}</td>
                                    <td>{ totalProductPrice}</td>
                                    <td>{totalProductmoney}</td>
                                    <td>{totalProductPaid}</td>
                                </tr>]
            }
            if(numberTeam > 0){
                indexInvoiceOupt++;
                rowTeam = [<tr>
                                <td>{indexs +"."+indexInvoiceOupt}</td>
                                <td>Đội Thi Công</td>
                                <td>{numberTeam}</td>
                                <td>{ totalTeamPrice}</td>
                                <td>{totalTeamMoney}</td>
                                <td>{totalTeamPaid}</td>
                            </tr>]
            }
            if(numberOrther > 0){
                indexInvoiceOupt++;
                rowOrther = [<tr>
                                <td>{indexs+"."+indexInvoiceOupt}</td>
                                <td>Chi Phí Khác</td>
                                <td>{numberOrther}</td>
                                <td>{ totalOrtherPrice}</td>
                                <td>{totalOrtherMoney}</td>
                                <td>{totalLabourPaid}</td>
                            </tr>]
            }

            if(item.projectCosts.length > 0 ){
                thRowProjectCost = [<tr >
                <td className="bg-success-400" colSpan="6"><center>Hóa Đơn Đầu Ra</center></td>
            </tr>].concat([ <tr style={{backgroundColor : '#ffa500'}}>
                    <td></td>
                    <td>Loại Hóa Đơn</td>
                    <td>Số Lượng</td>
                    <td>Tổng Đơn Gía</td>
                    <td>Tổng Tiền</td>
                    <td>Tổng Tiền Đã Trả</td>
                </tr>
            ]).concat(rowLabour).concat(rowProduuct).concat(rowTeam).concat(rowOrther)
            }
        }

        
        
        
                                    
                                    

        if(item.invoicever1){
           
    
            rows = [<tr key={"dataProjectCost" + item.invoicever1.id} colSpan="9">
                        <td>{indexs}</td>
                        <td>{item.invoicever1.invoiceName}</td>
                        <td>{FormatterUtils.formatCurrency(item.quotation.total)}</td>
                        <td>{FormatterUtils.formatCurrency(item.invoicever1.invoiceMoney)}</td>
                        <td>{moment(item.invoicever1.createdDate).format("DD/MM/YYYY") }</td>
                        <td>{item.invoicever1.paymentRequestStatus}</td>
        </tr>].concat(thRowProjectCost)
        } else if(item.invoicever2){
             rows = [<tr key={"dataProjectCost" + item.invoicever2.id} colSpan="9">
                        <td>{indexs}</td>
                        <td>{item.invoicever2.invoiceName}</td>
                        <td>{FormatterUtils.formatCurrency(item.quotation.total)}</td>
                        <td>{FormatterUtils.formatCurrency(item.invoicever2.invoiceMoney)}</td>
                        <td>{moment(item.invoicever2.createdDate).format("DD/MM/YYYY") }</td>
                        <td>{item.invoicever2.paymentRequestStatus}</td>
            </tr>].concat(thRowProjectCost)
        }else if(item.invoicever3){
            rows = [<tr key={"dataProjectCost" + item.invoicever3.id} colSpan="9">
                    <td>{indexs}</td>
                    <td>{item.invoicever3.invoiceName}</td>
                    <td>{FormatterUtils.formatCurrency(item.quotation.total)}</td>
                    <td>{FormatterUtils.formatCurrency(item.invoicever3.invoiceMoney)}</td>
                    <td>{moment(item.invoicever3.createdDate).format("DD/MM/YYYY") }</td>
                    <td>{item.invoicever3.paymentRequestStatus}</td>
            </tr>].concat(thRowProjectCost)
        }
           

        //     [<tr key={"dataProjectCost" + ProjectCost.id}>
        //     <td>{ProjectCost.title}</td>
        //     <td>{ProjectCost.lotNumber}</td>
        //     <td>{FormatterUtils.formatCurrency(ProjectCost.unitPrice)}</td>
        //     <td>{FormatterUtils.formatCurrency(ProjectCost.totalMoney)}</td>
        //     <td>{FormatterUtils.formatCurrency(ProjectCost.totalPaid)}</td>
        //     <td>{FormatterUtils.formatCurrency(ProjectCost.totalMoney - ProjectCost.totalPaid)}</td>
        //     <td> <span style={ProjectCost.status =="DA_THANH_TOAN_DU" ? {color:"green", textTransform:"uppercase"} : {color:"red", textTransform:"uppercase"}}>{t(ProjectCost.status)}</span></td>
        //     <td>{ProjectCost.paymentType}</td>
        //     <td className="text-center footable-visible footable-last-column">
        //         <ul className="icons-list">
        //             <li className="dropdown">
        //                 <a href="#" className="dropdown-toggle" data-toggle="dropdown">
        //                     <i className="icon-menu9"></i>
        //                 </a>
        //                 <ul className="dropdown-menu dropdown-menu-right">
        //                     {/* <li><a onClick={() => this.handleShowModalProjectCost(ProjectCost.id, ProjectCost.paymentType, ProjectCost.projectDetail)}><i className="icon-file-pdf"></i>Chi Tiết</a></li> */}
        //                 </ul>
        //             </li>
        //         </ul>
        //     </td>
        // </tr>]

        return  rows
                   
    }

};


export default translate('translations')(ModalInvoiceDifferentRows);
