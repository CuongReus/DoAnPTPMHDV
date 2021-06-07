import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker, RenderCheckbox, RenderSelect, RenderNumberInput, RenderMoneyFormat } from '../../components/formInputs';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import isEmail from 'sane-email-validation';
import { StringUtils, FormatterUtils, SecurityUtils } from '../../utils/javascriptUtils';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_PROJECT_BUDGET } from './action-types';
import { FIRE_REDIRECT } from '../../constants/action-types';
import ListFile from '../../components/ListFile';
import { isNull } from 'util';
import moment from 'moment';
import qs from 'query-string';
import { ScriptUtils } from '../../utils/javascriptUtils';
import TablePagination from '../../components/TablePagination';
import { Link } from 'react-router-dom';
// import ModalProjectCost from './ModalProjectCost';
import ModalOtherCost from './ModalOtherCost';
import ProjectCostPayment from './ProjectCostPayment';
import ModalOtherPayment from '../payment/ModalOtherPayment';
import ModalProjectCostApprovalAll from './ModalProjectCostApprovalAll';
import SecuredComponent from '../../components/SecuredComponent';


const mapStateToProps = state => {
    return {
        currentUser: state.common.currentUser
    }
};

const mapDispatchToProps = dispatch => ({
});

const OtherCost = (props) => {
    const {t, handleShowModal,handleShowApprovalAllModal,currentUser, deleteProjectCost, projectCostItem, handleAddNewPayment, handleShowOtherPayment, reloadProjectCost, dataProjectCostPayment, keyItem } = props;
    if (dataProjectCostPayment && dataProjectCostPayment.isShown) {
        var totalPercentPaid = 0;
        var otherPaymentRows = dataProjectCostPayment.listPayments.map(otherItem => {
            totalPercentPaid += otherItem.percentPaid;
            return <ProjectCostPayment key={"CHI_PHI_KHAC" + otherItem.id} reloadProjectCost={reloadProjectCost} totalPercentPaid={totalPercentPaid} projectCostDto={projectCostItem} paymentType="CHI_PHI_KHAC" projectCostPaymentDto={otherItem}  ></ProjectCostPayment>
        })
        var otherPaymentHeader =
            [<tr key={"header_"} className="success" style={{ textAlign: 'center' }}>
                <td colSpan="2"></td>
                <td>Số Đợt</td>
                <td>Phần Trăm Duyệt</td>
                <td>Thành Tiền</td>
                <td>Duyệt Bởi</td>
                <td>Trạng Thái </td>
                <td>Ngày Thanh Toán</td>
                <td colSpan="3">Ghi Chú </td>
                <td>
                    <SecuredComponent allowedPermission="admin.projectPayment.otherC&U">
                    <button className="btn bg-info" onClick={() => handleAddNewPayment(projectCostItem)}><i className="icon-plus22"></i></button>
                </SecuredComponent>
                </td>
            </tr>].concat(otherPaymentRows)
    }
    var body = [<tr key={"otherCost_" + projectCostItem.id}>
        <td>
            {/* <SecuredComponent allowedPermission="admin.projectDetail.read"> */}
            {dataProjectCostPayment && dataProjectCostPayment.isShown ? null : <button className="bg-info icon-plus22 " onClick={() => handleShowOtherPayment(projectCostItem.id)}></button>}
            {dataProjectCostPayment && dataProjectCostPayment.isShown ? <button className="bg-info icon-dash" onClick={() => handleShowOtherPayment(projectCostItem.id)}></button> : null}
            {/* </SecuredComponent> */}
        </td>
        <td>{projectCostItem.lotNumber}</td>
        <td>{projectCostItem.title}</td>
        <td>{FormatterUtils.formatCurrency(projectCostItem.unitPrice)}</td>
        <td>{FormatterUtils.formatCurrency(projectCostItem.totalMoney)}</td>
        <td>{FormatterUtils.formatCurrency(projectCostItem.totalPaid)}</td>
        <td>{FormatterUtils.formatCurrency(parseInt(projectCostItem.totalMoney) - parseInt(projectCostItem.totalPaid))}</td>
        <td style={{textAlign:"center"}}>
            <span style={projectCostItem.status =="DA_THANH_TOAN_DU" ? {color:"green", textTransform:"uppercase"} : {color:"red", textTransform:"uppercase"}}>{t(projectCostItem.status)}</span>
        </td>
        <td>{projectCostItem.status == "DA_THANH_TOAN_DU" ? moment(projectCostItem.closeDate).format("DD/MM/YYYY") : null}</td>
        <td>{projectCostItem.approvalBy ? projectCostItem.approvalBy.fullName : "N/A"}</td>
        <td>{projectCostItem.note}</td>
        <td className="text-center footable-visible footable-last-column">
            <ul className="icons-list">
                <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                        <i className="icon-menu9"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-right">
                                              {SecurityUtils.hasPermission(currentUser, "admin.projectCost.otherC&U")  ?
                        <li><a onClick={() => handleShowModal(projectCostItem.id)}><i className="icon-pencil"></i>Chỉnh Sửa</a></li>:null
                                               }
                        <SecuredComponent allowedPermission="admin.projectCostApproval.otherAllowApproval">
                        <li><a onClick={() => handleShowApprovalAllModal(projectCostItem.id)}><i className="icon-stack-check"></i>Duyệt Tất Cả</a></li>
                        </SecuredComponent>
                                                                      {SecurityUtils.hasPermission(currentUser, "admin.projectCost.otherDelete")?
                        <li><a onClick={() => deleteProjectCost(projectCostItem.id)}><i className="icon-cross2"></i>Xóa</a></li>:null
                                                                       }
                    </ul>
                </li>
            </ul>
        </td>
    </tr>].concat(otherPaymentHeader)
    return [body];

}


let getPaymentByProjectCost = (listPaymentByProjectCost, projectCostId) => {
    for (var i = 0; i < listPaymentByProjectCost.length; i++) {
        if (listPaymentByProjectCost[i].projectCostId == projectCostId) {
            return listPaymentByProjectCost[i];
        }
    }
    return null;
}
class TableModalOtherCost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listProjectCost: [],
            isShownProjectCostModal: false,
            isShowModalPaymentCost: false,
            isShowProjectCostPayment: false,
            isShownApprovalAllModal: false,
            idProjectCost: null,
            listProjectCostPayment: [],
            reloadNum: 0,
            projectCostId: null
        }
        this.updateProjectCost = this.updateProjectCost.bind(this);
        this.handleShowOtherPayment = this.handleShowOtherPayment.bind(this);
        this.updatePaymentCost = this.updatePaymentCost.bind(this);
        this.handleShowModal = (id) => {
            this.setState({
                isShownProjectCostModal: true,
                idProjectCost: id
            })
        }
        this.handleAddNewPayment = (projectCostDto) => {
            this.setState({
                isShowModalPaymentCost: true,
                projectCostDto: projectCostDto
            })
        }
        this.handleShowApprovalAllModal = (id) => {
            this.setState({
                isShownApprovalAllModal: true,
                idProjectCost: id,
                projectCostId: id,
            })
        }
        this.handleHidemodal = () => {
            this.setState({
                isShownProjectCostModal: false,
                isShowModalPaymentCost: false,
                isShownApprovalAllModal: false,
            });
            this.reloadProjectCost();
        }
        this.reloadProjectCost = () => {
            this.updateProjectCost();
            this.updatePaymentCost(this.state.projectCostId);
            // Reload ProjectDetail Payment Screen
            this.props.onReloadProjectPayment();
            this.props.onReloadProjectDetail();
        }
        this.deleteProjectCost = (id) => {
            var reloadProjectCost = this.reloadProjectCost;
            if (confirm("Bạn có chắc sẽ xoá!")) {
                var url = `/projectCost/${id}`;
                return agent.asyncRequests.del(url
                ).then(function (res) {
                    var result = res.body.resultData;
                    if (result && !result.error) {
                        alert("Xoá Thành Công! ");
                        reloadProjectCost();
                    } else {
                        toast.error("Có lỗi khi xóa dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                    }
                }, function (err) {
                    toast.error("Không thể xóa dữ liệu đang được sử dụng từ màn hình khác! ", { autoClose: 15000 });
                });
            } else {
            }
        }
    }
    updatePaymentCost(projectCostId) {
        var listPayment = this.state.listProjectCostPayment;
        var reloadNum = this.state.reloadNum;
        if (projectCostId) {
            let setStateInRequest = (list) => {
                var paymentByProjectCostId = getPaymentByProjectCost(this.state.listProjectCostPayment, projectCostId)
                if (paymentByProjectCostId) {
                    paymentByProjectCostId.listPayments = list;
                    paymentByProjectCostId.isShown = true;
                } else {
                    listPayment.push({ projectCostId: projectCostId, listPayments: list, isShown: true });
                }
                this.setState({ listPaymentByProjectCost: listPayment });
                this.setState({ reloadNum: reloadNum + 1 });
            }
            return agent.asyncRequests.get("/payment/listFindByProjectCostId?projectCostId=" + projectCostId).then(function (res) {
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
    }
    updateProjectCost() {
        const { projectDetailDto } = this.props;
        var paymentType = "CHI_PHI_KHAC";
        let setStateInRequest = (list) => { this.setState({ listProjectCost: list }) }
        return agent.asyncRequests.get('/projectCost/findByProjectDetailIdAndPaymentType?projectDetailId=' + projectDetailDto.id + '&paymentType=' + paymentType).then(function (res) {
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
        const { projectDetailDto } = this.props;
        var paymentType = "CHI_PHI_KHAC";
        let setStateInRequest = (list) => { this.setState({ listProjectCost: list }) }
        return agent.asyncRequests.get('/projectCost/findByProjectDetailIdAndPaymentType?projectDetailId=' + projectDetailDto.id + '&paymentType=' + paymentType).then(function (res) {
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

    handleShowOtherPayment(projectCostId) {
        var listPayment = this.state.listProjectCostPayment;
        var reloadNum = this.state.reloadNum;
        if (projectCostId) {
            this.setState({ projectCostId: projectCostId })
            var paymentShown = getPaymentByProjectCost(listPayment, projectCostId);
            if (paymentShown && paymentShown.isShown) {
                paymentShown.isShown = false;
                this.setState({ reloadNum: reloadNum + 1 });
                return;
            }
            let setStateInRequest = (list) => {
                var paymentByProjectCostId = getPaymentByProjectCost(this.state.listProjectCostPayment, projectCostId)
                if (paymentByProjectCostId) {
                    paymentByProjectCostId.listPayments = list;
                    paymentByProjectCostId.isShown = true;
                } else {
                    listPayment.push({ projectCostId: projectCostId, listPayments: list, isShown: true });
                }
                this.setState({ listPaymentByProjectCost: listPayment });
                this.setState({ reloadNum: reloadNum + 1 });
            }
            return agent.asyncRequests.get("/payment/listFindByProjectCostId?projectCostId=" + projectCostId).then(function (res) {
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
    }




    render() {
        // const { objectProject, listfile, title, onHide } = this.props;

        const { t, handleSubmit, submitting, title, invalid,currentUser, createdUser, lastedUpdateUser } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show, bsSize: "lg", onHide: this.props.onHide, submitting: this.props.submitting };
        const { projectDetailDto } = this.props;
        const dataProjectCost = this.state.listProjectCost;
        const dataProjectCostPayment = this.state.listProjectCostPayment;
        var isShowProjectCostPayment = this.state.isShowProjectCostPayment;
        var rowsClick = this.state.rowsClick;
        if (!currentUser) {
            return <LoadingScreen></LoadingScreen>
        }
        if (!dataProjectCost) {
            return null;
        }
        if (!projectDetailDto) {
            return <LoadingScreen></LoadingScreen>
        }


        var rows = dataProjectCost.map(projectCostItem => {
            return (
                <OtherCost
                    key={projectCostItem.id}
                    t= {t}
                    handleShowModal={this.handleShowModal}
                    projectCostItem={projectCostItem}
                    currentUser={currentUser}
                    isShowProjectCostPayment={isShowProjectCostPayment}
                    handleAddNewPayment={this.handleAddNewPayment}
                    handleShowOtherPayment={this.handleShowOtherPayment}
                    handleShowApprovalAllModal = {this.handleShowApprovalAllModal}
                    dataProjectCostPayment={getPaymentByProjectCost(this.state.listProjectCostPayment, projectCostItem.id)}
                    reloadProjectCost={this.reloadProjectCost}
                    deleteProjectCost={this.deleteProjectCost}
                ></OtherCost>

            )
        })



        var newModal = null;
        newModal =
            <div style={{ width: '100%' }}>
                <center>
                    <Modal
                        {...modalConfig}
                        aria-labelledby="contained-modal-title-lg"
                    >
                <div style={{ width: '1150px', marginLeft: "-40px", fontSize: "12px" }} className="modal-content">
                           
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title-sm"><center>{title}</center> </Modal.Title>

                            </Modal.Header>
                            <Modal.Body>
                                <center> <h5>Dự Án: {projectDetailDto.project.name} </h5>
                                    <h5>Công Việc: {projectDetailDto.name} </h5></center>
                                <div className="pull-right">
                                              {SecurityUtils.hasPermission(currentUser, "admin.projectCost.otherC&U")  ?
                                    <button className="btn bg-success" onClick={() => this.handleShowModal()}>Thêm Mới</button>:null
                                                                               }
                               
                              
                                </div>
                                <br />
                                <br />

                                <table className="table table-togglable table-bordered table-hover">
                                    <thead>
                                        <tr className="bg-green">
                                            <th className="text-center footable-visible footable-last-column"><i className="icon-menu-open2"></i></th>
                                            <th data-toggle="true">Số Đợt</th>
                                            <th data-toggle="true">Nội Dung</th>
                                            <th data-toggle="true">Đơn Giá</th>
                                            <th data-hide="phone">Số Tiên Thanh Toán</th>
                                            <th data-hide="phone">Đã Thanh Toán</th>
                                            <th data-hide="phone">Còn Lại</th>
                                            <th data-hide="phone">Trạng Thái</th>
                                            <th data-hide="phone">Ngày Đóng Thanh Toán</th>
                                            <th data-hide="phone">Duyệt Bởi</th>
                                            <th data-hide="phone">Ghi Chú</th>
                                            <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                                {/* <TablePagination data={data} baseUrl="/listProject" /> */}




                            </Modal.Body>
                        </div>
                    </Modal>
                    {this.state.isShowModalPaymentCost ? <ModalOtherPayment title="Đợt Thanh Toán Chi Phí Khác" dataProjectCostPayment={dataProjectCostPayment.length != 0 ? dataProjectCostPayment : null} projectCostDto={this.state.projectCostDto} currentDate={this.state.currentDate} idPayment={null} projectDetailDto={projectDetailDto} show={this.state.isShowModalPaymentCost} onHide={this.handleHidemodal} /> : null}
                    {this.state.isShownProjectCostModal ? <ModalOtherCost title="Chi Phí Khác" lotNumber={dataProjectCost.length + 1} idProjectCost={this.state.idProjectCost} projectDetailDto={projectDetailDto} show={this.state.isShownProjectCostModal} onHide={this.handleHidemodal} /> : null}
                    {this.state.isShownApprovalAllModal ? <ModalProjectCostApprovalAll title="Duyệt Tất Cả" idProjectCost={this.state.idProjectCost} projectDetailDto={projectDetailDto} show={this.state.isShownApprovalAllModal} onHide={this.handleHidemodal} /> : null}
                
                </center>

            </div>
        return newModal;
    }
};


export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(TableModalOtherCost));

