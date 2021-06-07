import moment from 'moment';
import React from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { LoadingScreen } from '../../components/commonWidgets';
import ProgressDetailStep from '../../components/ProgressDetailStep';
import agent from '../../services/agent';
import { SecurityUtils } from '../../utils/javascriptUtils';
import PaymentProject from './PaymentProject';
import InvoiceVAT from './InvoiceVAT';
import SecuredComponent from '../../components/SecuredComponent';
const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({
});

class ProgressRows extends React.Component {
    constructor() {
        super();
        this.state = {
            isShowProjectPaymentDetail: true,
            isShowInvoiceVAT :false,
            isQuotationShown: false,
            checkEnoughDataStepQuotation: true,
            checkEnoughDataStepApproval: true,
            checkEnoughDataStepAcceptance: true,
            checkEnoughDataStepCloseProject: true,
            checkEnoughDataStepEfficiency: true,
            checkEnoughDataStepIncurred: true,
            checkEnoughDataStepInvoiceVer1: true,
            checkEnoughDataStepInvoiceVer2: true,
            checkEnoughDataStepInvoiceVer3: true,
            checkEnoughDataStepContract: true,
            checkEnoughDataStepComplete: true,
            allowToClickStepQuotation: false,
            allowToClickStepApproval: false,
            allowToClickStepAcceptance: false,
            allowToClickStepCloseProject: false,
            allowToClickStepEfficiency: false,
            allowToClickStepIncurred: false,
            allowToClickStepInvoiceVer1: false,
            allowToClickStepInvoiceVer2: false,
            allowToClickStepInvoiceVer3: false,
            allowToClickStepContract: false,
            allowToClickStepComplete: false,
            projectPaymentDto: null,
            projectDetailDto: null,
            labelNotityInvoiceVer1: null,
            labelNotityInvoiceVer2: null,
            labelNotityInvoiceVer3: null,
            labelNotityCloseProject: null,

        }
        this.onReloadProgressItem = this.onReloadProgressItem.bind(this);
        this.handleShowProjectPaymentDetail = this.handleShowProjectPaymentDetail.bind(this);
        this.handleShowInvoiceVAT = this.handleShowInvoiceVAT.bind(this);

    };
    onReloadProgressItem() {
        this.props.onReloadProjectDetail();
        
    }
    getProjectPayment() {
        var id = this.props.projectDetailDto.id;
        this.props.onReloadProjectDetail();
        let setStateInRequest = (list) => { this.setState({ projectPaymentDto: list }) }
        agent.asyncRequests.get("/projectPaymentDto/findByProjectDetailId?projectDetailId=" + id
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }
    componentWillMount() {
        
        this.getProjectPayment();
    }
    handleShowProjectPaymentDetail() {
        this.setState({
            isShowProjectPaymentDetail: true,
            isShowInvoiceVAT: false
        })
    }
    handleShowInvoiceVAT() {
        this.setState({
            isShowProjectPaymentDetail: false,
            isShowInvoiceVAT: true
        })
    }

    render() {
        var projectDetailDto = this.props.projectDetailDto;
        var isShowProjectPaymentDetail = this.state.isShowProjectPaymentDetail;
        var isShowInvoiceVAT = this.state.isShowInvoiceVAT;
        const { currentUser } = this.props;
        var {
            checkEnoughDataStepQuotation,
            checkEnoughDataStepApproval,
            checkEnoughDataStepAcceptance,
            checkEnoughDataStepCloseProject,
            checkEnoughDataStepEfficiency,
            checkEnoughDataStepIncurred,
            checkEnoughDataStepInvoiceVer1,
            checkEnoughDataStepInvoiceVer2,
            checkEnoughDataStepInvoiceVer3,
            checkEnoughDataStepContract,
            checkEnoughDataStepComplete,
            allowToClickStepQuotation,
            allowToClickStepApproval,
            allowToClickStepAcceptance,
            allowToClickStepCloseProject,
            allowToClickStepEfficiency,
            allowToClickStepIncurred,
            allowToClickStepInvoiceVer1,
            allowToClickStepInvoiceVer2,
            allowToClickStepInvoiceVer3,
            allowToClickStepContract,
            allowToClickStepComplete,
            labelNotityInvoiceVer1,
            labelNotityInvoiceVer2,
            labelNotityInvoiceVer3,
            labelNotityCloseProject } = this.state;
        var today = moment();
        if (!projectDetailDto) {
            return <LoadingScreen></LoadingScreen>;
        } else {
            ////////////////////////////////////////// Start Check Enough Data ///////////////////////////
            // ApprovalCheck
            if (projectDetailDto.approval && projectDetailDto.approval.approvalStatus == "CHUA_DUYET") {
                checkEnoughDataStepApproval = false
            }
            if (projectDetailDto.invoiceVer1 && ((moment(projectDetailDto.invoiceVer1.sendDate).add(8, 'days') < moment(today) && projectDetailDto.invoiceVer1.status == "CHUA_THANH_TOAN") )) {
                checkEnoughDataStepInvoiceVer1 = false;
                labelNotityInvoiceVer1 = "Ngày gửi hóa đơn đã vượt quá 7 ngày nhưng chưa được thanh toán. Vui lòng kiểm tra lại !";

            }else if (projectDetailDto.invoiceVer1 &&(projectDetailDto.invoiceVer1.status==null || projectDetailDto.invoiceVer1.status == "CHUA_THANH_TOAN")) {
                checkEnoughDataStepInvoiceVer1 = false;
                labelNotityInvoiceVer1 = "Hóa Đơn Chưa Được Thanh Toán!";

            }
            if (projectDetailDto.invoiceVer2 && ((moment(projectDetailDto.invoiceVer2.sendDate).add(8, 'days')< moment(today) && projectDetailDto.invoiceVer2.status == "CHUA_THANH_TOAN"))) {
                checkEnoughDataStepInvoiceVer2 = false;
                labelNotityInvoiceVer2 = "Ngày gửi hóa đơn đã vượt quá 7 ngày nhưng chưa được thanh toán. Vui lòng kiểm tra lại !";

            }else if (projectDetailDto.invoiceVer2 &&  (projectDetailDto.invoiceVer2.status == null  ||  projectDetailDto.invoiceVer2.status == "CHUA_THANH_TOAN")) {
                checkEnoughDataStepInvoiceVer2 = false;
                labelNotityInvoiceVer2 = "Hóa Đơn Chưa Được Thanh Toán!";

            }
            if (projectDetailDto.invoiceVer3 && moment(projectDetailDto.invoiceVer3.sendDate).add(8, 'days') < moment(today) && projectDetailDto.invoiceVer3.status == "CHUA_THANH_TOAN") {
                checkEnoughDataStepInvoiceVer3 = false;
                labelNotityInvoiceVer3 = "Ngày gửi hóa đơn đã vượt quá 7 ngày nhưng chưa được thanh toán. Vui lòng kiểm tra lại !";

            }else if(projectDetailDto.invoiceVer3 && (projectDetailDto.invoiceVer3.status == "CHUA_THANH_TOAN" ||  projectDetailDto.invoiceVer3.status == "CHUA_THANH_TOAN")){
                checkEnoughDataStepInvoiceVer3 = false;
                labelNotityInvoiceVer3 = "Hóa Đơn Chưa Được Thanh Toán!";
            }
            // Incurred Check
            if (projectDetailDto.incurred && projectDetailDto.incurred.approvalStatus == "CHUA_DUYET") {
                checkEnoughDataStepIncurred = false
            }
            // CloseProject Check
            if (projectDetailDto.closeProject && !projectDetailDto.closeProject.closed || projectDetailDto.closeProject && projectDetailDto.closeProject.closeProjectDate == null) {
                checkEnoughDataStepCloseProject = false,
                labelNotityCloseProject = <span>Công Việc Chưa Được Đóng. <br/>Vui Lòng Đóng Công Việc Để Tính Doanh Thu & Lợi Nhuận</span>
            }
            ////////////////////////////////////////// End Check Enough Data ///////////////////////////
            ////////////////////////////////////////// Start Check Allow To manipulation Data ///////////////////////////
            if (projectDetailDto.projectDetailStatus == "DANG_THUC_THI") {
                if (SecurityUtils.hasPermission(currentUser, "admin.projectProgress.quotationC&U")) {
                    allowToClickStepQuotation = true
                }
                if (SecurityUtils.hasPermission(currentUser, "admin.projectProgress.approvalC&U")) {
                    allowToClickStepApproval = true
                }
                if (SecurityUtils.hasPermission(currentUser, "admin.projectProgress.contractC&U")) {
                    allowToClickStepContract = true
                }
                if (SecurityUtils.hasPermission(currentUser, "admin.projectProgress.invoiceVer1C&U")) {
                    allowToClickStepInvoiceVer1 = true
                }
                if (SecurityUtils.hasPermission(currentUser, "admin.projectProgress.efficientC&U")) {
                    allowToClickStepEfficiency = true
                }
                if (SecurityUtils.hasPermission(currentUser, "admin.projectProgress.invoiceVer2C&U")) {
                    allowToClickStepInvoiceVer2 = true
                }
                if (SecurityUtils.hasPermission(currentUser, "admin.projectProgress.completeC&U")) {
                    allowToClickStepComplete = true
                }
                if (SecurityUtils.hasPermission(currentUser, "admin.projectProgress.acceptanceC&U")) {
                    allowToClickStepAcceptance = true
                }
                if (SecurityUtils.hasPermission(currentUser, "admin.projectProgress.invoiceVer3C&U")) {
                    allowToClickStepInvoiceVer3 = true
                }
                if (SecurityUtils.hasPermission(currentUser, "admin.projectProgress.incurredC&U")) {
                    allowToClickStepIncurred = true
                }
                if (SecurityUtils.hasPermission(currentUser, "admin.projectProgress.closeProjectC&U")) {
                    allowToClickStepCloseProject = true
                }
               

            }

            ////////////////////////////////////////// End Check Allow To manipulation Data ///////////////////////////
        }
        var paymentProject = null;
        if (isShowProjectPaymentDetail == true) {
            paymentProject = <PaymentProject onReloadProjectDetail={this.props.onReloadProjectDetail} projectDetailDto={this.props.projectDetailDto}  ></PaymentProject>
        }
        if(isShowInvoiceVAT ==  true){
            paymentProject = <InvoiceVAT projectDetailDto={projectDetailDto} ></InvoiceVAT>
        }
        return (
            [<tr key={"ProjectProgress_"+projectDetailDto.id} >
                <td></td>
                <td colSpan="13" style={{ height: 150 }}>
                    {/* <Stepper  steps={steps} activeStep={9} activeColor={activeColorState} circleFontColor={circleFontColor} /> */}
                    <div style={{ display: 'table', width: '100%', margin: 'auto' }}>
                     {projectDetailDto.project.projectType == "CO_DOANH_THU"?   
                     [<ProgressDetailStep
                            isEnoughData={checkEnoughDataStepQuotation}
                            labelNotify={null}
                            idActiveColor={projectDetailDto.quotation ? true : false}
                            availableToInput={allowToClickStepQuotation ? true : false} onReload={this.onReloadProgressItem} rank={1} keyItem={"quotation"} titleName="BÁO GIÁ"
                            projectDetailDto={projectDetailDto}
                            idProgressItem={projectDetailDto.quotation ? projectDetailDto.quotation.id : null}
                            titleDate={projectDetailDto.quotation ? projectDetailDto.quotation.sendDate : null}
                        >
                        </ProgressDetailStep>,
                        <ProgressDetailStep
                            isEnoughData={checkEnoughDataStepApproval}
                            labelNotify={null}
                            idActiveColor={projectDetailDto.approval ? true : false}
                            availableToInput={projectDetailDto.quotation && allowToClickStepApproval ? true : false} onReload={this.onReloadProgressItem} rank={2} keyItem={"approval"} titleName="TRẠNG THÁI DUYỆT"
                            projectDetailDto={projectDetailDto}
                            idProgressItem={projectDetailDto.approval ? projectDetailDto.approval.id : null}
                            titleDate={projectDetailDto.approval ? projectDetailDto.approval.approvalDate : null} >
                        </ProgressDetailStep>,
                        <ProgressDetailStep idActiveColor={projectDetailDto.contract ? true : false} availableToInput={projectDetailDto.approval && allowToClickStepContract ? true : false}
                            labelNotify={null}
                            isEnoughData={checkEnoughDataStepContract}
                            onReload={this.onReloadProgressItem} rank={3} keyItem={"contract"} titleName="HỢP ĐỒNG"
                            projectDetailDto={projectDetailDto}
                            idProgressItem={projectDetailDto.contract ? projectDetailDto.contract.id : null}
                            titleDate={projectDetailDto.contract ? projectDetailDto.contract.sendDate : null} ></ProgressDetailStep>,
                        <ProgressDetailStep idActiveColor={projectDetailDto.invoiceVer1 ? true : false}
                            isEnoughData={checkEnoughDataStepInvoiceVer1}
                            labelNotify={labelNotityInvoiceVer1}
                            availableToInput={projectDetailDto.contract && allowToClickStepInvoiceVer1 ? true : false}
                            onReload={this.onReloadProgressItem} rank={4} keyItem={"invoiceVer1"} titleName="HOÁ ĐƠN 1"
                            projectDetailDto={projectDetailDto}
                            idProgressItem={projectDetailDto.invoiceVer1 ? projectDetailDto.invoiceVer1.id : null}
                            titleDate={projectDetailDto.invoiceVer1 ? projectDetailDto.invoiceVer1.sendDate : null} ></ProgressDetailStep>,
                        <ProgressDetailStep idActiveColor={projectDetailDto.efficiency ? true : false} availableToInput={allowToClickStepEfficiency ? true : false}
                            isEnoughData={checkEnoughDataStepEfficiency}
                            labelNotify={null}
                            onReload={this.onReloadProgressItem} rank={5} keyItem={"efficiency"} titleName="THỰC HIỆN"
                            projectDetailDto={projectDetailDto}
                            idProgressItem={projectDetailDto.efficiency ? projectDetailDto.efficiency.id : null}
                            titleDate={projectDetailDto.efficiency ? projectDetailDto.efficiency.startActualProgressDate : null} ></ProgressDetailStep>,
                        <ProgressDetailStep idActiveColor={projectDetailDto.invoiceVer2 ? true : false} availableToInput={allowToClickStepInvoiceVer2 ? true : false}
                            labelNotify={labelNotityInvoiceVer2}
                            isEnoughData={checkEnoughDataStepInvoiceVer2}
                            rank={6} onReload={this.onReloadProgressItem} keyItem={"invoiceVer2"} titleName="HOÁ ĐƠN 2"
                            projectDetailDto={projectDetailDto}
                            idProgressItem={projectDetailDto.invoiceVer2 ? projectDetailDto.invoiceVer2.id : null}
                            titleDate={projectDetailDto.invoiceVer2 ? projectDetailDto.invoiceVer2.sendDate : null}></ProgressDetailStep>,
                        <ProgressDetailStep idActiveColor={projectDetailDto.complete ? true : false} availableToInput={allowToClickStepComplete ? true : false}
                            isEnoughData={checkEnoughDataStepComplete}
                            labelNotify={null}
                            onReload={this.onReloadProgressItem} rank={7} keyItem={"complete"} titleName="HOÀN THÀNH"
                            projectDetailDto={projectDetailDto}
                            idProgressItem={projectDetailDto.complete ? projectDetailDto.complete.id : null}
                            titleDate={projectDetailDto.complete ? projectDetailDto.complete.completedDate : null}  ></ProgressDetailStep>,
                        <ProgressDetailStep idActiveColor={projectDetailDto.acceptance ? true : false}
                            isEnoughData={checkEnoughDataStepAcceptance}
                            labelNotify={null}
                            availableToInput={allowToClickStepAcceptance ? true : false} onReload={this.onReloadProgressItem} rank={8} keyItem={"acceptance"} titleName="NGHIỆM THU"
                            projectDetailDto={projectDetailDto}
                            idProgressItem={projectDetailDto.acceptance ? projectDetailDto.acceptance.id : null}
                            titleDate={projectDetailDto.acceptance ? projectDetailDto.acceptance.acceptanceDate : null} ></ProgressDetailStep>,
                        <ProgressDetailStep idActiveColor={projectDetailDto.invoiceVer3 ? true : false}
                            isEnoughData={checkEnoughDataStepInvoiceVer3}
                            labelNotify={labelNotityInvoiceVer3}
                            availableToInput={allowToClickStepInvoiceVer3 ? true : false} onReload={this.onReloadProgressItem} rank={9} keyItem={"invoiceVer3"} titleName="HOÁ ĐƠN 3"
                            projectDetailDto={projectDetailDto}
                            idProgressItem={projectDetailDto.invoiceVer3 ? projectDetailDto.invoiceVer3.id : null}
                            titleDate={projectDetailDto.invoiceVer3 ? projectDetailDto.invoiceVer3.sendDate : null} ></ProgressDetailStep>,
                        <ProgressDetailStep idActiveColor={projectDetailDto.incurred ? true : false}
                            isEnoughData={checkEnoughDataStepIncurred}
                            labelNotify={null}
                            availableToInput={allowToClickStepIncurred ? true : false} onReload={this.onReloadProgressItem} rank={10} keyItem={"incurred"} titleName="PHÁT SINH"
                            projectDetailDto={projectDetailDto}
                            idProgressItem={projectDetailDto.incurred ? projectDetailDto.incurred.id : null}
                     titleDate={projectDetailDto.incurred ? projectDetailDto.incurred.endProgressDate : null}  ></ProgressDetailStep>]
                      :null}
                        <ProgressDetailStep idActiveColor={projectDetailDto.closeProject ? true : false} availableToInput={allowToClickStepCloseProject ? true : false} endProgress={true}
                            isEnoughData={checkEnoughDataStepCloseProject}
                            labelNotify={labelNotityCloseProject}
                            onReload={this.onReloadProgressItem} rank={projectDetailDto.project.projectType == "CO_DOANH_THU" ?11:1} keyItem={"closeProject"} titleName="ĐÓNG CÔNG VIỆC"
                            projectDetailDto={projectDetailDto}
                            idProgressItem={projectDetailDto.closeProject ? projectDetailDto.closeProject.id : null}
                            titleDate={projectDetailDto.closeProject ? projectDetailDto.closeProject.closeProjectDate : null}  ></ProgressDetailStep>
                    </div>
                </td>
                <td></td>
            </tr>,
            <tr key={"ProjectPayment_"+projectDetailDto.id}>
                <td></td>
                <td colSpan="13">
                    <div style={{display :'flex', justifyContent : 'center'}}>
                        <div style={{textAlign : 'center'}}>
                            <button style={{width : '80px', height : '35px', display : 'inline-block', fontSize :'16px'}} className="btn btn-success" onClick={() => this.handleShowProjectPaymentDetail()} > 1 </button>
                            <br/>
                            <label>Thanh Toán</label>
                        </div>
                        <SecuredComponent allowedPermission="admin.projectProgress.HoachToanHoaDon">
                            
                        <div style={{ textAlign : 'center', paddingLeft : '20px'}}>
                            <button style={{width : '80px', height : '35px', display : 'inline-block', fontSize :'16px'}} className="btn btn-primary" onClick={() => this.handleShowInvoiceVAT()}  > 2 </button>
                            <br/>
                            <label>Hoạch Toán Hóa Đơn VAT</label>
                        </div>
                        </SecuredComponent>
                    </div>
                </td>
                <td></td>
            </tr>].concat(paymentProject)
        )
    }
};
export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(ProgressRows));
