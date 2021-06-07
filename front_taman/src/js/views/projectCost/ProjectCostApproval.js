import React from 'react';
import qs from 'query-string';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { ScriptUtils, FormatterUtils } from '../../utils/javascriptUtils';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import { Link } from 'react-router-dom';

import { LoadingScreen } from '../../components/commonWidgets';
import ModalLabourPayment from '../payment/ModalLabourPayment';
import ModalProductPayment from '../payment/ModalProductPayment';
import moment from  'moment';
import ModalConstructionTeamPayment from '../payment/ModalConstructionTeamPayment';
import ModalOtherCost from './ModalOtherCost';
import ModalOtherPayment from '../payment/ModalOtherPayment';
import ModalProjectCostApprovalAll from './ModalProjectCostApprovalAll';
const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({
});

class ProjectCostApproval extends React.Component {
    constructor() {
        super();
        this.state = {
            listPaymentByProjectCostId: null,
            idProjectCost: null,
            isShownApprovalAllModal: false,
            isPaymentModalShown: false,
            idPayment: null,
            projectCostDto: null,
        }
        this.handleShowPaymentModal = this.handleShowPaymentModal.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isPaymentModalShown: false,
                isShownApprovalAllModal: false
            });
            this.updateListPayment();
        };
    };
    updateListPayment() {
        const {projectCostDto}  = this.props;
        var projectCostId = this.props.match.params.token;
        this.getProjectCostDto();
        let setStateInRequest = (list) => { this.setState({ listPaymentByProjectCostId: list }) }
        return agent.asyncRequests.get("/payment/listFindByProjectCostId?projectCostId="+projectCostId
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
   
    getProjectCostDto(){
        var projectCostId = this.props.match.params.token;
        let setStateInRequest = (list) => { this.setState({ projectCostDto: list }) }
        return agent.ProjectCostApi.getHBEntityProjectCost(projectCostId
        ).then(function (res) {
            var result = res.resultData;
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
        var projectCostId = this.props.match.params.token;
        this.getProjectCostDto();
        let setStateInRequest = (list) => { this.setState({ listPaymentByProjectCostId: list }) }
        return agent.asyncRequests.get("/payment/listFindByProjectCostId?projectCostId="+projectCostId
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
    };


    componentDidUpdate() {
        ScriptUtils.loadFootable();
    }
    //Delete Payment Function
    deletePayment(id, fullName) {

        if (confirm("Bạn có chắc sẽ xoá!")) {
            var url = `/project/${id}`;
            return agent.asyncRequests.del(url
            ).then(function (res) {
                var result = res.body.resultData;
                if (result && !result.error) {
                    alert("Xoá Thành Công Nhân Viên: " + fullName);
                    window.location.reload(true);
                } else {
                    toast.error("Có lỗi khi xóa dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Không thể xóa dữ liệu đang được sử dụng từ màn hình khác! ", { autoClose: 15000 });
            });


        } else {
        }
    }

    handleShowPaymentModal(id) {
        this.setState({
            isPaymentModalShown: true,
            idPayment: id
        });

    }
    handleShowApprovalAllModal(id){
        this.setState({
            isShownApprovalAllModal: true,
            idProjectCost: id,
            projectCostId: id,
        })
    }


    render() {
        const data = this.state.listPaymentByProjectCostId;
        const {projectCostDto}  = this.state;
        const {currentUser} = this.props;
        
        var header = null;
        var title = null;
        var percentPaid = null;
        if (!data) {
            return null;
        }
        if(!projectCostDto){
            return <LoadingScreen></LoadingScreen>
        }else if(currentUser && currentUser.id != projectCostDto.approvalById){
            return null;

        }else if(projectCostDto && projectCostDto.paymentType != "NHAN_CONG") {
            title = [<span>
            <h3>Duyệt Thanh Toán: {projectCostDto.paymentType} - Đợt: {projectCostDto.lotNumber} - Nội Dung: {projectCostDto.title}  </h3>  
            <h4>Dự Án: {projectCostDto.projectDetail.project.name} </h4> 
            <h4>Công Việc: {projectCostDto.projectDetail.name} </h4> 
            <h5>Tổng Tiền: {FormatterUtils.formatCurrency(projectCostDto.totalMoney)} - Tổng Tiền Đã Trả: {FormatterUtils.formatCurrency(projectCostDto.totalPaid)}  </h5> 
            <h5>Còn Lại: {FormatterUtils.formatCurrency(projectCostDto.totalMoney - projectCostDto.totalPaid)} </h5>
             </span>]
            header = <tr className="bg-green">
            <th>Số Đợt</th>
            <th>Phần Trăm Duyệt</th>
            <th>Thành Tiền</th>
            <th>Duyệt Bởi</th>
            <th>Trạng Thái </th>
            <th>Ngày Thanh Toán</th>
            <th>Ghi Chú </th>
            <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>

        </tr>
        }else if(projectCostDto && projectCostDto.paymentType =="NHAN_CONG" ){
            title = [<span>
                <h3>Duyệt Thanh Toán: {projectCostDto.paymentType} - Đợt: {projectCostDto.lotNumber} - Nội Dung {projectCostDto.title}  </h3> 
                <h3>Dự Án: {projectCostDto.projectDetail.project.name} </h3> 
                <h4>Công Việc: {projectCostDto.projectDetail.name} </h4> 
                <h5>Từ Ngày: {moment(projectCostDto.startWorkDate).format("DD/MM/YYYY")} - Đến Ngày: {moment(projectCostDto.endWorkDate).format("DD/MM/YYYY")} </h5> 
                <h5> Tổng Tiền: {FormatterUtils.formatCurrency(projectCostDto.totalMoney)} - Tổng Tiền Đã Trả: {FormatterUtils.formatCurrency(projectCostDto.totalPaid)} </h5> 
                 <h5>Còn Lại: {FormatterUtils.formatCurrency(projectCostDto.totalMoney - projectCostDto.totalPaid)} </h5>
                 </span>]
            header= <tr className="bg-green">
            <td>STT</td>
                <td>Tên Nhân Công</td>
                <td>Lương Theo Ngày </td>
                <td>Lương Ca Khuya</td>
                <td>Tổng Công Thường</td>
                <td>Tổng Công TC</td>
                <td>Tổng Công Ca Khuya</td>
                <td>Số Tiền Thanh Toán</td>
                <td>Trạng Thái Thanh Toán</td>
                <td>Ngày Thanh Toán</td>
                <td>Người Duyệt</td>
                <td>Ghi Chú </td>
        <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
        </tr>
        }
      
        var rows = data.map(item => {
            if(projectCostDto && projectCostDto.paymentType != "NHAN_CONG"){
                percentPaid += item.percentPaid;
            return (
                 <tr className="warning" key={"productCost_"+item.id}>
                        <td>{item.lotNumber}</td>
                        <td>{item.percentPaid} %</td>
                        <td>{FormatterUtils.formatCurrency(item.moneyPaid)}</td>
                        <td>{item.approvalBy?item.approvalBy.fullName:null}</td>
                        <td>{item.status}</td>
                        <td>{item.paymentDate}</td>
                        <td >{item.note}</td>
                        <td className="text-center footable-visible footable-last-column">
                        <ul className="icons-list">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="icon-menu9"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                    {/* <SecuredComponent allowedPermission="admin.company.update"> */}

                                    {/* <li><a onClick={() => this.deleteCompany(item.id)}><i className="icon-cross2"></i>Xóa</a></li>  */}
                                    {/* </SecuredComponent> */}
                                    {/* <SecuredComponent allowedPermission="admin.company.delete"> */}

                                    <li><a onClick={() => this.handleShowPaymentModal(item.id)}><i className="icon-pencil"></i>Chỉnh Sửa</a></li>
                                    {/* </SecuredComponent> */}
                                </ul>
                            </li>
                        </ul>
                    </td>
                    </tr>
                );
            }
            else if(projectCostDto && projectCostDto.paymentType =="NHAN_CONG" ){
                return(
                    <tr>
                    <td>{item.lotNumber}</td>
                    <td>{item.labour?item.labour.fullName:null}</td>
                    <td>{FormatterUtils.formatCurrency(item.lbSalaryPerDay)}</td>
                    <td>{FormatterUtils.formatCurrency(item.lbSalaryMidNight)}</td>
                    <td>{item.lbNormalAttendance}</td>
                    <td>{item.lbOvertimeAttendance}</td>
                    <td>{item.lbMidnightAttendance}</td>
                    <td>{FormatterUtils.formatCurrency(item.moneyPaid)}</td>
                    <td>{item.status}</td>
                    <td>{item.status == "DA_DUYET_THANH_TOAN" && item.paymentDate ? moment(item.paymentDate).format("DD/MM/YYYY"): null}</td>
                    <td>{item.approvalBy? item.approvalBy.fullName: null}</td>
                    <td> {item.note}</td>
                    <td className="text-center footable-visible footable-last-column">
                    <ul className="icons-list">
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <i className="icon-menu9"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-right">
                                {/* <SecuredComponent allowedPermission="admin.company.update"> */}

                                {/* <li><a onClick={() => this.deleteCompany(item.id)}><i className="icon-cross2"></i>Xóa</a></li>  */}
                                {/* </SecuredComponent> */}
                                {/* <SecuredComponent allowedPermission="admin.company.delete"> */}

                                <li><a onClick={() => this.handleShowPaymentModal(item.id)}><i className="icon-pencil"></i>Chỉnh Sửa</a></li>
                                {/* </SecuredComponent> */}
                            </ul>
                        </li>
                    </ul>
                </td>
                </tr>
                );
            }

        });
        return (

            <div className="content-wrapper">


                <div className="content">
                    <div className="page-header">
                        <h4>
                            <i className=" icon-paragraph-justify2 position-left"></i>
                            <span className="text-semibold"></span>
                            {projectCostDto && projectCostDto.paymentType !="NHAN_CONG" ?
                            <span className="pull-right">
                                <button className="btn bg-green" onClick={() => this.handleShowPaymentModal()}>Thêm Mới Đợt Thanh Toán Chi Tiết</button>
                            </span>: null}
                        </h4>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-flat">

                                <div className="panel-body">
                                    {projectCostDto ?
                                    <center>
                                        {title}
                                      </center>
                                      : null }
                                
                                </div>
                               
                            </div>
                            
                            {this.state.isPaymentModalShown && projectCostDto && projectCostDto.paymentType =="VAT_TU" ? <ModalProductPayment isApprovalScreen={true} listPaymentFromApprovalScreen ={data}   title="Đợt Thanh Toán Vật Tư"      item={null} totalPercentPaidFromProps={this.props.totalPercentPaid} projectCostDto={this.state.projectCostDto} idPayment={this.state.idPayment}  show={this.state.isPaymentModalShown} onHide={this.handleHidemodal} /> : null}
                            {this.state.isPaymentModalShown && projectCostDto && projectCostDto.paymentType =="DOI_THI_CONG" ? <ModalConstructionTeamPayment   isApprovalScreen={true} listPaymentFromApprovalScreen ={data}   title="Đợt Thanh Toán Đội Thi Công"      item={null} totalPercentPaidFromProps={this.props.totalPercentPaid} projectCostDto={this.state.projectCostDto} idPayment={this.state.idPayment}  show={this.state.isPaymentModalShown} onHide={this.handleHidemodal} /> : null}
                            {this.state.isPaymentModalShown && projectCostDto && projectCostDto.paymentType =="CHI_PHI_KHAC" ? <ModalOtherPayment  isApprovalScreen={true} listPaymentFromApprovalScreen ={data}   title="Đợt Thanh Toán Chi Phí Khác"      item={null} totalPercentPaidFromProps={this.props.totalPercentPaid} projectCostDto={this.state.projectCostDto} idPayment={this.state.idPayment}  show={this.state.isPaymentModalShown} onHide={this.handleHidemodal} /> : null}
                            {this.state.isPaymentModalShown && projectCostDto && projectCostDto.paymentType =="NHAN_CONG" ? <ModalLabourPayment isApprovalScreen={true} listPaymentFromApprovalScreen ={data} title="Đợt Thanh Toán Nhân Công"  item={null} projectCostDto={this.state.projectCostDto} currentDate={this.state.currentDate} idPayment={this.state.idPayment}  show={this.state.isPaymentModalShown} onHide={this.handleHidemodal} /> : null}
                            {this.state.isShownApprovalAllModal && projectCostDto &&projectCostDto.projectDetail ? <ModalProjectCostApprovalAll title="Duyệt Tất Cả" idProjectCost={this.state.idProjectCost} projectDetailDto={projectCostDto.projectDetail} show={this.state.isShownApprovalAllModal} onHide={this.handleHidemodal} /> : null}
                            
                            {/* {this.state.isPaymentModalShown && projectCostDto && projectCostDto.paymentType =="CHI_PHI_KHAC" ? <ModalLabourPayment isApprovalScreen={true} listPaymentFromApprovalScreen ={data} title="Đợt Thanh Toán Nhân Công"  item={this.props.item} projectCostDto={this.state.projectCostDto} currentDate={this.state.currentDate} idPayment={this.state.idPayment}  show={this.state.isPaymentModalShown} onHide={this.handleHidemodal} /> : null} */}
                            {/* {this.state.isPaymentModalShown && projectCostDto && projectCostDto.paymentType =="DOI_THI_CONG" ? <ModalLabourPayment isApprovalScreen={true} listPaymentFromApprovalScreen ={data} title="Đợt Thanh Toán Nhân Công"  item={this.props.item} projectCostDto={this.state.projectCostDto} currentDate={this.state.currentDate} idPayment={this.state.idPayment}  show={this.state.isPaymentModalShown} onHide={this.handleHidemodal} /> : null} */}
                           <br/>
                           <span className="pull-right">
                                <button className="btn bg-info" onClick={() => this.handleShowApprovalAllModal(projectCostDto.id)}>Duyệt Tất Cả</button>
                            </span>
                           <br/>
                           <br/>
                            <div className="panel panel-flat">
                                <table className="table table-togglable table-hover">
                                    <thead>
                                       {header}
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}

export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(ProjectCostApproval));