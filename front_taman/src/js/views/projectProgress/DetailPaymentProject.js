import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import qs from 'query-string';
import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker, RenderCheckbox, RenderSelect, RenderPlainCheckbox } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { StringUtils, SecurityUtils, FormatterUtils } from '../../utils/javascriptUtils';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_PROJECT } from './action-types';
import ProgressDetailStep from '../../components/ProgressDetailStep';
import Stepper from 'react-stepper-horizontal';
import moment from 'moment';
import SecuredComponent from '../../components/SecuredComponent';
import ModalProjectBudget from '../projectBudget/ModalProjectBudget';
import TableModalProductCost from '../projectCost/TableModalProductCost';
import TableModalLabourCost from '../projectCost/TableModalLabourCost';
import TableModalOtherCost from '../projectCost/TableModalOtherCost';
import TableModalConstructionTeamCost from '../projectCost/TableModalConstructionTeamCost';
import TableModalReport from '../projectCost/TableModalReport';
const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({
});

class DetailPaymentProject extends React.Component {
    constructor() {
        super();
        this.state = {
            isProjectBudgetShownModal: false,
            isProductCostShownTableModal: false,
            isLabourCostShownTableModal: false,
            isOtherCostTableShownModal: false,
            isConstructionTeamCostTableShownModal: false,
            isReportShownModal: false,
        }
        this.handleHidemodal = this.handleHidemodal.bind(this);
        this.handleAfterSaveModal = this.handleAfterSaveModal.bind(this);

    };

    componentWillMount() {

    }
    handleShowmodal(id) {
        const { keyItem } = this.props;
        if (keyItem == "projectBudget") {
            this.setState({
                idProjectBudget: id,
                isProjectBudgetShownModal: true
            });

        }
        else if (keyItem == "productCost") {
            this.setState({
                isProductCostShownTableModal: true,
            })
        }
        else if (keyItem == "labourCost") {
            this.setState({
                isLabourCostShownTableModal: true,
            })

        }
        else if (keyItem == "otherCost") {
            this.setState({
                isOtherCostTableShownModal: true,
            })
        }
        else if (keyItem == "constructionTeamCost") {
            this.setState({
                isConstructionTeamCostTableShownModal: true,
            })
        }
        else if (keyItem == "report") {
            this.setState({
                isReportShownModal: true,
                idProgressItem: id
            })
        }

    }
    handleHidemodal() {
        this.setState({
            isProjectBudgetShownModal: false,
            isProductCostShownTableModal: false,
            isLabourCostShownTableModal: false,
            isOtherCostTableShownModal: false,
            isConstructionTeamCostTableShownModal: false,
            isReportShownModal: false,
        })


    }
    handleAfterSaveModal() {
        this.props.onReload();
        this.handleHidemodal();


    }
    render() {
        const { projectPaymentDto, availableToInput, keyItem,
            titleName, rank, idActiveColor, idProjectBudget, projectBudget,
            listProductCost,
            listLabourCost,
            listOtherCost,
            listConstructionTeamCost,
            isApprovalPaid,
            allowToViewTotalPaid } = this.props;
        var stepBackgroundColor = null;
        if (!projectPaymentDto) {
            <LoadingScreen></LoadingScreen>
        }


        // Sum totalPaid 
        var totalPaid = 0;
        var isFullPaid = true;
        if (listProductCost) {
            listProductCost.map(item => {
                totalPaid += item.totalPaid;
                if (item.totalMoney > 0) {
                    if (item.status == "CHUA_THANH_TOAN_DU" && item.totalMoney > 0) {
                        isFullPaid = false;
                    }
                }
            })
        }
        else if (listLabourCost) {
            listLabourCost.map(item => {
                totalPaid += item.totalPaid;
                if (item.totalMoney > 0) {
                    if (item.status == "CHUA_THANH_TOAN_DU" && item.totalMoney > 0) {
                        isFullPaid = false;
                    }
                }
            })
        }
        else if (listOtherCost) {
            listOtherCost.map(item => {
                totalPaid += item.totalPaid;
                if (item.totalMoney > 0) {
                    if (item.status == "CHUA_THANH_TOAN_DU" && item.totalMoney > 0) {
                        isFullPaid = false;
                    }
                }
            })
        }
        else if (listConstructionTeamCost) {
            listConstructionTeamCost.map(item => {
                totalPaid += item.totalPaid;
                if (item.totalMoney > 0) {
                    if (item.status == "CHUA_THANH_TOAN_DU") {
                        isFullPaid = false;
                    }
                }
            })
        }
        else if (projectBudget) {
            totalPaid = projectBudget.totalProjectBudget
        }

        if (idActiveColor) {
            if (isFullPaid) {
                stepBackgroundColor = "green";
            } else {
                stepBackgroundColor = "orange";
            }
        } else {
            stepBackgroundColor = "lightGrey";
        }

        return (
            <div key={"DetailPaymentProject_" + projectPaymentDto.id} style={{ paddingLeft: "20px", display: 'table-cell', position: 'relative', paddingTop: '24px' }}>
                <center>
                    <div>
                        {availableToInput ? <a onClick={() => this.handleShowmodal(idProjectBudget)}
                            style={{
                                lineHeight:
                                    '36px',
                                color: "#FFF",
                                width: '80px',
                                height: '35px',
                                backgroundColor: stepBackgroundColor,
                                // borderRadius: '20%',
                                textAlign: 'center',
                                padding: '1px',
                                fontSize: '16px', display: 'block', borderWidth: '0px'
                            }}>{rank}</a>
                            : <span
                                style={{
                                    lineHeight:
                                        '36px',
                                    color: "#FFF",
                                    width: '80px',
                                    height: '35px',
                                    backgroundColor: stepBackgroundColor,
                                    //   borderRadius: '20%',
                                    textAlign: 'center',
                                    padding: '1px',
                                    fontSize: '16px', display: 'block', borderWidth: '0px'
                                }}>{rank}</span>}

                        <a style={{ marginTop: '4px', fontSize: '12px', fontWeight: 300, textAlign: 'center', display: 'block', color: "black" }}>

                            {allowToViewTotalPaid && keyItem != "report" ? <span> <br />{FormatterUtils.formatCurrency(totalPaid) + " VNĐ"}</span> : null}
                            <br />
                            {titleName}
                            {/* <span>  {titleDate ? moment(titleDate).format("DD/MM/YYYY"):"N/A"} <br/> {titleName=="THỰC HIỆN"&&idActiveColor?<span>{projectDetailDto.efficiency && projectDetailDto.efficiency.curator ?projectDetailDto.efficiency.curator.fullName: "N/A" }</span>:null} <br/>  {titleName} <br/>   </span> */}
                        </a>
                    </div>

                </center>
                {/* {!endProgress ? <div style={{position: 'absolute', top: '40px', height: '1px', borderTopStyle: 'solid', borderTopWidth: '1px', right: '0px', left: '80px'}}>
            </div> : null} */}
                {this.state.isProjectBudgetShownModal ? <ModalProjectBudget title="Ngân Sách" idProjectBudget={this.state.idProjectBudget} projectDetailDto={this.props.projectDetailDto} show={this.state.isProjectBudgetShownModal} onHide={this.handleHidemodal} onAfterSave={this.handleAfterSaveModal} /> : null}
                {this.state.isProductCostShownTableModal ? <TableModalProductCost title="Thanh Toán Vật Tư" onReloadProjectDetail={this.props.onReloadProjectDetail} onReloadProjectPayment={this.props.onReload} listProductCost={this.props.listProductCost} projectDetailDto={this.props.projectDetailDto} show={this.state.isProductCostShownTableModal} onHide={this.handleHidemodal} onAfterSave={this.handleAfterSaveModal} /> : null}
                {this.state.isLabourCostShownTableModal ? <TableModalLabourCost title="Thanh Toán Nhân Công" onReloadProjectDetail={this.props.onReloadProjectDetail} onReloadProjectPayment={this.props.onReload} listLabourCost={this.props.listLabourCost} projectDetailDto={this.props.projectDetailDto} show={this.state.isLabourCostShownTableModal} onHide={this.handleHidemodal} onAfterSave={this.handleAfterSaveModal} /> : null}
                {this.state.isOtherCostTableShownModal ? <TableModalOtherCost title="Thanh Toán Chi Phí Khác" onReloadProjectDetail={this.props.onReloadProjectDetail} onReloadProjectPayment={this.props.onReload} listOtherCost={this.props.listOtherCost} projectDetailDto={this.props.projectDetailDto} show={this.state.isOtherCostTableShownModal} onHide={this.handleHidemodal} onAfterSave={this.handleAfterSaveModal} /> : null}
                {this.state.isConstructionTeamCostTableShownModal ? <TableModalConstructionTeamCost title="Thanh Toán Đội Thi Công" onReloadProjectDetail={this.props.onReloadProjectDetail} onReloadProjectPayment={this.props.onReload} listConstructionTeamCost={this.props.listConstructionTeamCost} projectDetailDto={this.props.projectDetailDto} show={this.state.isConstructionTeamCostTableShownModal} onHide={this.handleHidemodal} onAfterSave={this.handleAfterSaveModal} /> : null}
                {this.state.isReportShownModal ? <TableModalReport title="Báo Cáo" projectPaymentDto={this.props.projectPaymentDto} projectDetailDto={this.props.projectDetailDto} show={this.state.isReportShownModal} onHide={this.handleHidemodal} onAfterSave={this.handleAfterSaveModal} /> : null}


            </div>
        )









    }
};
export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(DetailPaymentProject));
