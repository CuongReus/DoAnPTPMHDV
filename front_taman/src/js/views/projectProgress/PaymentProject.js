import React from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { LoadingScreen } from '../../components/commonWidgets';
import agent from '../../services/agent';
import { SecurityUtils } from '../../utils/javascriptUtils';
import DetailPaymentProject from './DetailPaymentProject';
const mapStateToProps = state => {
    return {
        currentUser: state.common.currentUser
    }
};

const mapDispatchToProps = dispatch => ({
});

class ProgressRows extends React.Component {
    constructor() {
        super();
        this.state = {
            isShowProjectPaymentDetail: false,
            projectPaymentDto: null,
            // projectDetailDto: null
            allowToClickProjectBudget: false,
            allowToClickProductCost: false,
            allowToClickLabourCost: false,
            allowToClickConstructionTeamCost: false,
            allowToClickOtherCost: false,
            allowToClickReport: false,
            allowToViewTotalMoneyProjectBudget: false,
            allowToViewTotalMoneyProductCost: false,
            allowToViewTotalMoneyLabourCost: false,
            allowToViewTotalMoneyConstructionTeamCost: false,
            allowToViewTotalMoneyOtherCost: false,
            isShowModalInputInvoice : false,
            isShowModalOutputInvoice : false,
            isShowModalInputDiferance : false

        }
        this.handleShowProjectPaymentDetail = this.handleShowProjectPaymentDetail.bind(this);
        this.onReloadProjectPayment = this.onReloadProjectPayment.bind(this);
        this.getProjectPayment = this.getProjectPayment.bind(this);
        this.handleShowModalInput = this.handleShowModalInput.bind(this);
        this.handleShowModalOutput = this.handleShowModalOutput.bind(this);
        this.handleShowModalDifference = this.handleShowModalDifference.bind(this);
        this.handleHideProjectPaymentDetail = () => {
            this.setState({ isShowProjectPaymentDetail: false, 
                isShowModalInputInvoice : false,
                isShowModalOutputInvoice : false,
                isShowModalInputDiferance : false
             })
        }
    };

    onReloadProjectPayment() {
        this.getProjectPayment();
    }
    getProjectPayment() {
        var id = this.props.projectDetailDto.id;
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

    handleShowModalDifference(){
        this.setState({
            isShowModalInputDiferance   : true
        })
    }
    handleShowModalInput(){
        this.setState({
            isShowModalInputInvoice   : true
        })
    }
    handleShowModalOutput(){
        this.setState({
            isShowModalOutputInvoice : true
        })

        
    }
    componentWillMount() {

        this.getProjectPayment();
    }
    handleShowProjectPaymentDetail() {
        this.setState({
            isShowProjectPaymentDetail: true
        })
    }

    render() {
        var projectDetailDto = this.props.projectDetailDto;
        const { currentUser } = this.props;
        var { allowToClickProjectBudget,
            allowToClickProductCost,
            allowToClickLabourCost,
            allowToClickOtherCost,
            allowToClickConstructionTeamCost,
            allowToClickReport,
            allowToViewTotalMoneyProjectBudget,
            allowToViewTotalMoneyProductCost,
            allowToViewTotalMoneyLabourCost,
            allowToViewTotalMoneyOtherCost,
            allowToViewTotalMoneyConstructionTeamCost
        } = this.state;
        var projectPaymentDto = this.state.projectPaymentDto;
        // if(!projectPaymentDto){
        //     <LoadingScreen></LoadingScreen>
        // }
        // allowToClickProjectBudget = true;

        // allowToClickReport = true;

        // if(projectDetailDto.userBudgetPermissions){
        //     projectDetailDto.userBudgetPermissions.map(item=>{
        //         if(item.id == currentUser.id){
        //         }
        //     })
        // }

        allowToViewTotalMoneyProductCost = true;
        allowToViewTotalMoneyLabourCost = true;
        allowToViewTotalMoneyOtherCost = true;
        allowToViewTotalMoneyConstructionTeamCost = true;
        
            if (projectDetailDto && projectDetailDto.approval && !SecurityUtils.hasPermission(currentUser, "admin.projectCost.budgetC&U") ) {
                // if (SecurityUtils.hasPermission(currentUser, "admin.projectProgress.quotationC&U")) {
                    if (projectDetailDto.userBudgetPermissions) {
                        projectDetailDto.userBudgetPermissions.map(item => {
                            if (item.id == currentUser.id) {
                                allowToViewTotalMoneyProjectBudget = true;
                                allowToClickProjectBudget = true;
                            }
                        })
                    }
            

            }else if( projectDetailDto && projectDetailDto.approval && SecurityUtils.hasPermission(currentUser, "admin.projectCost.budgetC&U")){
                allowToViewTotalMoneyProjectBudget = true;
                allowToClickProjectBudget = true;
            }
            // if (projectDetailDto && projectDetailDto.approval && SecurityUtils.hasPermission(currentUser, "admin.projectCost.budgetRead")) {
            //     allowToViewTotalMoneyProjectBudget = true
            // }
            if (SecurityUtils.hasPermission(currentUser, "admin.projectCost.productC&U")) {
                            allowToClickProductCost = true
            }
            if (projectDetailDto.efficiency && SecurityUtils.hasPermission(currentUser, "admin.projectCost.labourC&U")) {
                            allowToClickLabourCost = true
            }
            if (SecurityUtils.hasPermission(currentUser, "admin.projectCost.otherC&U")) {
                            allowToClickOtherCost = true
            }
            if (SecurityUtils.hasPermission(currentUser, "admin.projectCost.constructionTeamC&U")) {
                            allowToClickConstructionTeamCost = true
            }
            if (projectPaymentDto && projectPaymentDto.projectBudget && SecurityUtils.hasPermission(currentUser, "admin.projectCost.reportRead")) {
                // if (SecurityUtils.hasPermission(currentUser, "admin.projectProgress.efficientC&U")) {
                allowToClickReport = true
            }

        if (projectDetailDto.projectDetailStatus == "DA_HOAN_THANH") {
            allowToClickProjectBudget = false,
                allowToClickProductCost = false,
                allowToClickLabourCost = false,
                allowToClickOtherCost = false,
                allowToClickConstructionTeamCost = false
        }
       
        // alert("You got me although you no go in side!!")

        return (
            <tr>
                <td colSpan="15">
                    <div style={{ display: 'table', width: '100%', margin: 'auto' }}>
                        <center>
                            {projectPaymentDto ?
                                [<DetailPaymentProject rank={"1.1"} keyItem={"projectBudget"}onReloadProjectDetail={this.props.onReloadProjectDetail} allowToViewTotalPaid={allowToViewTotalMoneyProjectBudget ? true : false} projectBudget={projectPaymentDto.projectBudget ? projectPaymentDto.projectBudget : null} onReload={this.onReloadProjectPayment} idProjectBudget={projectPaymentDto.projectBudget ? projectPaymentDto.projectBudget.id : null} idActiveColor={projectPaymentDto.projectBudget ? true : false} availableToInput={allowToClickProjectBudget ? true : false} projectPaymentDto={projectPaymentDto} projectDetailDto={projectDetailDto} titleName="Ngân Sách" ></DetailPaymentProject>,
                                <DetailPaymentProject rank={"1.2"} keyItem={"productCost"} onReloadProjectDetail={this.props.onReloadProjectDetail}allowToViewTotalPaid={allowToViewTotalMoneyProductCost ? true : false} listProductCost={projectPaymentDto.listProductCost ? projectPaymentDto.listProductCost : null} onReload={this.onReloadProjectPayment} idActiveColor={projectPaymentDto.listProductCost.length != 0 ? true : false} availableToInput={allowToClickProductCost ? true : false} projectPaymentDto={projectPaymentDto} projectDetailDto={projectDetailDto} titleName="TT Vật Tư " ></DetailPaymentProject>,
                                <DetailPaymentProject rank={"1.3"} keyItem={"constructionTeamCost"}onReloadProjectDetail={this.props.onReloadProjectDetail} allowToViewTotalPaid={allowToViewTotalMoneyConstructionTeamCost ? true : false} listConstructionTeamCost={projectPaymentDto.listConstructionTeamCost ? projectPaymentDto.listConstructionTeamCost : null} onReload={this.onReloadProjectPayment} idActiveColor={projectPaymentDto.listConstructionTeamCost.length != 0 ? true : false} availableToInput={allowToClickConstructionTeamCost ? true : false} projectPaymentDto={projectPaymentDto} projectDetailDto={projectDetailDto} titleName="TT Đội Thi Công" ></DetailPaymentProject>,
                                <DetailPaymentProject rank={"1.4"} keyItem={"labourCost"}onReloadProjectDetail={this.props.onReloadProjectDetail} allowToViewTotalPaid={allowToViewTotalMoneyLabourCost ? true : false} listLabourCost={projectPaymentDto.listLabourCost ? projectPaymentDto.listLabourCost : null} onReload={this.onReloadProjectPayment} idActiveColor={projectPaymentDto.listLabourCost.length != 0 ? true : false} availableToInput={allowToClickLabourCost ? true : false} projectPaymentDto={projectPaymentDto} projectDetailDto={projectDetailDto} titleName="TT Nhân Công" ></DetailPaymentProject>,
                                <DetailPaymentProject rank={"1.5"} keyItem={"otherCost"} onReloadProjectDetail={this.props.onReloadProjectDetail}allowToViewTotalPaid={allowToViewTotalMoneyOtherCost ? true : false} listOtherCost={projectPaymentDto.listOtherCost ? projectPaymentDto.listOtherCost : null} onReload={this.onReloadProjectPayment} idActiveColor={projectPaymentDto.listOtherCost.length != 0 ? true : false} availableToInput={allowToClickOtherCost ? true : false} projectPaymentDto={projectPaymentDto} projectDetailDto={projectDetailDto} titleName="TT Chi Phí Khác" ></DetailPaymentProject>,
                                <DetailPaymentProject rank={"1.6"} keyItem={"report"} onReloadProjectDetail={this.props.onReloadProjectDetail}onReload={this.onReloadProjectPayment} 
                                    idActiveColor={true} availableToInput={allowToClickReport ? true : false} projectPaymentDto={projectPaymentDto}
                                    projectDetailDto={projectDetailDto} titleName="Báo Cáo" ></DetailPaymentProject>,
                                ] : <LoadingScreen></LoadingScreen>}
                                {/* <div style={{ display: 'table-cell', position: 'relative', paddingTop: '24px'}}>
                                    <button className="btn btn-info" style={{ height: '35px', marginLeft: '20px', marginBottom : '7px'}} onClick={this.handleShowModalInput} >Hóa Đơn Đầu Vào</button>
                                    <button className="btn btn-info" style={{ height: '35px', marginLeft: '20px', marginBottom : '7px'}} onClick={this.handleShowModalOutput}  >Hóa Đơn Đầu Ra</button>
                                    <button className="btn btn-info" style={{ height: '35px', marginLeft: '20px', marginBottom : '7px'}} onClick={this.handleShowModalDifference}>Thống Kê Dòng Tiền</button>
                                </div> */}
                        </center>
                    </div>
                </td>
            </tr>
        )
    }
};
export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(ProgressRows));
