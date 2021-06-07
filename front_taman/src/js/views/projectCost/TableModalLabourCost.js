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
import dateFns from 'date-fns';
import ProjectCostPayment from './ProjectCostPayment';
import { PermanentCacheService } from '../../services/middleware';
import ModalLabourCost from './ModalLabourCost';
import ModalLabourPayment from '../payment/ModalLabourPayment';
import ModalProjectCostApprovalAll from './ModalProjectCostApprovalAll';
import SecuredComponent from '../../components/SecuredComponent';

const CalendarHeader = (props) => {
    return (
        <div>
            <div className="col-md-3">
                <br />
                <div className="btn-group">
                    <button type="button" className="btn btn-primary" onClick={props.prev}>&lt;</button>
                    <button type="button" className="btn btn-primary" onClick={props.today}>Tháng Hiện Tại</button>
                    <button type="button" className="btn btn-primary" onClick={props.next}>&gt;</button>
                </div>
                <h3>Tháng {dateFns.format(props.currentDate, 'MM / YYYY')}</h3>
            </div>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        currentUser: state.common.currentUser
    }
};

const mapDispatchToProps = dispatch => ({
});

const LabourCost = (props) => {
    let today = new Date();
    const { t,limitDate, handleShowModal, handleShowApprovalAllModal, deleteProjectCost, projectCostItem, currentNo, currentUser, handleShowLabourPayment, handleAddNewPayment, dataProjectCostPayment, keyItem, reloadProjectCost } = props;
    if (dataProjectCostPayment && dataProjectCostPayment.isShown) {


        var labourPaymentRows = dataProjectCostPayment.listPayments.map(labourPayment => {
            return <ProjectCostPayment key={"NHAN_CONG" + labourPayment.id} dataProjectCostPayment={dataProjectCostPayment} reloadProjectCost={reloadProjectCost} paymentType="NHAN_CONG" projectCostDto={projectCostItem} projectCostPaymentDto={labourPayment}  ></ProjectCostPayment>
        })
        var labourPaymentHeader =
            [<tr key={"NHAN_CONG_HEADER" + projectCostItem.id} className="success" style={{ textAlign: 'center' }}>
                <td></td>
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
                <td className="text-center footable-visible footable-last-column">
                </td>
            </tr>].concat(labourPaymentRows)
    }
    // var totalNormalAttendance = 0;
    // var totalOvertimeAttendance = 0;
    // var totalMidnightAttendance = 0;
    // var totalNormalSalary = 0;
    // var totalMidnightSalary = 0;
    // var totalSalary = 0;
    // totalNormalAttendance = FormatterUtils.round2Decimals(projectCostItem.totalNormalAttendance);
    // totalOvertimeAttendance = FormatterUtils.round2Decimals(projectCostItem.totalOvertimeAttendance);
    // totalMidnightAttendance = FormatterUtils.round2Decimals(projectCostItem.totalMidnightAttendance);
    // totalNormalSalary = (totalNormalAttendance + totalOvertimeAttendance) * projectCostItem.salaryPerDay;
    // totalMidnightSalary = totalMidnightAttendance * projectCostItem.salaryMidnight;
    // totalSalary = totalNormalSalary + totalMidnightSalary;
    var body = [<tr key={"labourCost_" + projectCostItem.id}>
        <td>
            {/* <SecuredComponent allowedPermission="admin.projectDetail.read"> */}
            {dataProjectCostPayment && dataProjectCostPayment.isShown ? null : <button className="bg-info icon-plus22 " onClick={() => handleShowLabourPayment(projectCostItem.id)}></button>}
            {dataProjectCostPayment && dataProjectCostPayment.isShown ? <button className="bg-info icon-dash" onClick={() => handleShowLabourPayment(projectCostItem.id)}></button> : null}
            {/* </SecuredComponent> */}
        </td>
        <td>{projectCostItem.lotNumber}</td>
        <td>{projectCostItem.title}</td>
        <td>{moment(projectCostItem.startWorkDate).format("DD/MM/YYYY")}</td>
        <td>{moment(projectCostItem.endWorkDate).format("DD/MM/YYYY")}</td>
        <td>{FormatterUtils.formatCurrency(projectCostItem.totalMoney)}</td>
        <td>{FormatterUtils.formatCurrency(projectCostItem.totalPaid)}</td>
        <td>{FormatterUtils.formatCurrency(projectCostItem.totalMoney - projectCostItem.totalPaid)}</td>
        <td style={{textAlign:"center"}}>
            <span style={projectCostItem.status =="DA_THANH_TOAN_DU" ? {color:"green", textTransform:"uppercase"} : {color:"red", textTransform:"uppercase"}}>{t(projectCostItem.status)}</span>
        </td>
        <td>{projectCostItem.status == "DA_THANH_TOAN_DU" ? moment(projectCostItem.closeDate).format("DD/MM/YYYY") : null}</td>
        <td>{projectCostItem.approvalBy ? projectCostItem.approvalBy.fullName : "N/A"}</td>
        <td colSpan="2">{projectCostItem.note}</td>
        <td className="text-center footable-visible footable-last-column">
            <ul className="icons-list">
                <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                        <i className="icon-menu9"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-right">
                        {SecurityUtils.hasPermission(currentUser, "admin.projectCost.labourC&U")  ?
                            (limitDate < today ? null : 
                            <li><a onClick={() => handleShowModal(projectCostItem.id)}><i className="icon-pencil"></i>Chỉnh Sửa</a></li>) : null
                        }

                        <SecuredComponent allowedPermission="admin.projectCostApproval.labourAllowApproval">
                            <li><a onClick={() => handleShowApprovalAllModal(projectCostItem.id)}><i className="icon-stack-check"></i>Duyệt Tất Cả</a></li> 
                        </SecuredComponent>
                        {SecurityUtils.hasPermission(currentUser, "admin.projectCost.labourDelete")?
                            <li><a onClick={() => deleteProjectCost(projectCostItem.id)}><i className="icon-cross2"></i>Xóa</a></li> : null
                        }
                    </ul>

                </li>
            </ul>
        </td>
    </tr>].concat(labourPaymentHeader)
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
class TableModalLabourCost extends React.Component {
    constructor(props) {
        let initialDate = new Date()
        initialDate = PermanentCacheService.getItem("selected_month") ? new Date(PermanentCacheService.getItem("selected_month")) : dateFns.setDate(initialDate, 1)
        super(props);
        this.state = {
            currentDate: initialDate,
            listProjectCost: [],
            listRefreshLaboutCost: [],
            isShownProjectCostModal: false,
            isShowModalPaymentCost: false,
            idProjectCost: null,
            listProjectCostPayment: [],
            projectCostDto: null,
            reloadNum: 0,
            projectCostId: null
        }
        this.updateProjectCost = this.updateProjectCost.bind(this);
        this.handleShowLabourPayment = this.handleShowLabourPayment.bind(this);
        this.updatePaymentCost = this.updatePaymentCost.bind(this);
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
        this.handleShowModal = (id) => {
            this.setState({
                isShownProjectCostModal: true,
                idProjectCost: id,
                projectCostId: id
            })
        }
        this.handleHidemodal = () => {
            this.setState({
                isShownProjectCostModal: false,
                isShowModalPaymentCost: false,
                isShownApprovalAllModal: false,
            });
            this.refreshLabourCost();
        }
        this.reloadProjectCost = () => {
            // Reload On TableModal
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
        this.prev = () => {
            const prev = dateFns.subMonths(this.state.currentDate, 1)
            PermanentCacheService.setItem("selected_month", prev);
            this.setState({ currentDate: prev }, () => {
                this.updateProjectCost();
                // this.refreshLabourCost();

            })
        }
        this.next = () => {
            const next = dateFns.addMonths(this.state.currentDate, 1)
            PermanentCacheService.setItem("selected_month", next);
            this.setState({ currentDate: next }, () => {
                this.updateProjectCost();
            //    this.refreshLabourCost();

            })
        }
        this.today = () => {
            let today = new Date()
            today = dateFns.setDate(today, 1)
            PermanentCacheService.setItem("selected_month", today);
            this.setState({ currentDate: today }, () => {
                this.updateProjectCost();
            //    this.refreshLabourCost();

            })
        }
        this.refreshLabourCost = () =>{
        //     var _this = this;
        //     const { projectDetailDto, currentUser } = this.props;
        //     const currentDate = this.state.currentDate;
        //     var month = moment(dateFns.startOfMonth(currentDate)).format("M");
        //     var year = moment(dateFns.lastDayOfMonth(currentDate)).format("YYYY");
        // let setStateInRequest = (list) => { this.setState({ listRefreshLaboutCost: list }) }
            
        //     return agent.asyncRequests.post("/projectCost/refreshLabourCost?projectDetailId=" + projectDetailDto.id + "&month=" + month + "&year="+ year + "&currentUserId=" + currentUser.id).then(function (res) {
        //         var result = res.body.resultData;
        //         if (result) {
        //             setStateInRequest(result);
        //         } else {
        //             toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
        //         }
        //     }, function (err) {
        //         toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        //     });
        }

    }
    // reloadPaymentCost() {
    //     // OnHide projectYear just show project when user have right permission
    //     const {currentUser} = this.props;
    //     this.handleShowProject();
    //     this.reloadOnlyProjectYear();
    // }

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
        const { t, projectDetailDto  } = this.props;
        const currentDate = this.state.currentDate;
        var month = moment(dateFns.startOfMonth(currentDate)).format("M");
        var year = moment(dateFns.lastDayOfMonth(currentDate)).format("YYYY");
        var paymentType = "NHAN_CONG";
        let setStateInRequest = (list) => { 
            this.setState({ listProjectCost: list });
            this.setState({ listRefreshLaboutCost: list });
         }
        return agent.asyncRequests.get('/projectCost/findByProjectDetailIdAndPaymentTypeAndMonthAndYear?projectDetailId=' + projectDetailDto.id + '&paymentType=' + paymentType + '&month=' + month + '&year=' + year).then(function (res) {
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
        this.updateProjectCost();
    }

    handleShowLabourPayment(projectCostId) {
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

        const { t, handleSubmit, submitting, title, invalid, createdUser, currentUser, lastedUpdateUser } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show, bsSize: "lg", onHide: this.props.onHide, submitting: this.props.submitting };
        const { projectDetailDto } = this.props;
        // const currentDate = new Date(this.state.currentDate.getTime());
        const wrapperStyle = {
            height: '100%',
            width: '100%'
        }
        if (!currentUser) {
            return <LoadingScreen></LoadingScreen>
        }
        // const dataProjectCost = this.state.listProjectCost;
        const dataProjectCost = this.state.listRefreshLaboutCost;
        const dataProjectCostPayment = this.state.listProjectCostPayment;
        var rowsClick = this.state.rowsClick;
        if (!dataProjectCost) {
            return null;
        }
        if (!projectDetailDto) {
            return <LoadingScreen></LoadingScreen>
        }

        var currentNo = 0;
        var rows = dataProjectCost.map(projectCostItem => {
            currentNo++
            if(projectCostItem.totalMoney > 0){

                return (
                    <LabourCost
                    key={projectCostItem.id}
                    t = {t}
                    currentNo={currentNo}
                    currentUser={currentUser}
                    handleAddNewPayment={this.handleAddNewPayment}
                    handleShowModal={this.handleShowModal}
                    handleShowApprovalAllModal={this.handleShowApprovalAllModal}
                    projectCostItem={projectCostItem}
                    handleShowLabourPayment={this.handleShowLabourPayment}
                    dataProjectCostPayment={getPaymentByProjectCost(this.state.listProjectCostPayment, projectCostItem.id)}
                    reloadProjectCost={this.reloadProjectCost}
                    deleteProjectCost={this.deleteProjectCost}
                    limitDate={moment(projectDetailDto.efficiency.endPlanProgressDate)}
                    ></LabourCost>
                    
                    )
                }
        })



        var newModal = null;
        newModal =
            <div style={{ width: '100%' }}>

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
                                <h5>Công Việc: {projectDetailDto.name} </h5>
                                <h5>{projectDetailDto.efficiency ?
                                    "Thực Hiện Từ: " + moment(projectDetailDto.efficiency.startActualProgressDate).format("DD/MM/YYYY") + " - Đến Ngày: " + moment(projectDetailDto.efficiency.endPlanProgressDate).format("DD/MM/YYYY") : null}
                                </h5></center>
                            {/* <span style={wrapperStyle}>
                                <CalendarHeader
                                    currentDate={currentDate}
                                    next={this.next}
                                    prev={this.prev}
                                    today={this.today} />
                            </span> */}
                            <div className="pull-right">
                                {SecurityUtils.hasPermission(currentUser, "admin.projectCost.labourC&U")?
                                    <button className="btn bg-success" onClick={()=>this.updateProjectCost()}>Làm Mới</button> : null
                                }
                            </div>
                            <br style={{ lineHeight: "50px" }}></br>

                            <table className="table .table-xxs table-togglable table-bordered table-hover">
                                <thead>
                                    <tr className="bg-green">
                                        <th className="text-center footable-visible footable-last-column"><i className="icon-menu-open2"></i></th>
                                        <th data-toggle="true">Số Đợt</th>
                                        <th data-toggle="true">Nội Dung</th>
                                        <th data-toggle="true">Thanh Toán Từ</th>
                                        <th data-toggle="true">Đến Hết Ngày</th>
                                        {/* <th data-hide="phone">Tổng Ngày Công Thường</th>
                                        <th data-hide="phone">Tổng Ngày Công Tăng Ca</th>
                                        <th data-hide="phone">Tông Ngày Công Khuya</th> */}
                                        <th data-hide="phone">Tổng</th>
                                        <th data-hide="phone">Đã Thanh Toán</th>
                                        <th data-hide="phone">Còn Lại</th>
                                        <th data-hide="phone">Trạng Thái</th>
                                        <th data-hide="phone">Ngày Đóng Đợt TT</th>
                                        <th data-hide="phone">Duyệt Bởi</th>
                                        <th colSpan="2" data-hide="phone">Ghi Chú</th>
                                        <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows}
                                </tbody>
                            </table>
                            {this.state.isShowModalPaymentCost ? <ModalLabourPayment title="Đợt Thanh Toán Nhân Công" dataProjectCostPayment={dataProjectCostPayment.length != 0 ? dataProjectCostPayment : null} projectCostDto={this.state.projectCostDto} currentDate={this.state.currentDate} idPayment={null} projectDetailDto={projectDetailDto} show={this.state.isShowModalPaymentCost} onHide={this.handleHidemodal} /> : null}
                            {this.state.isShownProjectCostModal ? <ModalLabourCost title="Thanh Toán Nhân Công" lotNumber={dataProjectCost.length + 1} dataProjectCost={dataProjectCost.length != 0 ? dataProjectCost : null} currentDate={this.state.currentDate} idProjectCost={this.state.idProjectCost} projectDetailDto={projectDetailDto} show={this.state.isShownProjectCostModal} onHide={this.handleHidemodal} /> : null}
                            {this.state.isShownApprovalAllModal ? <ModalProjectCostApprovalAll title="Duyệt Tất Cả" idProjectCost={this.state.idProjectCost} projectDetailDto={projectDetailDto} show={this.state.isShownApprovalAllModal} onHide={this.handleHidemodal} /> : null}
                            {/* <TablePagination data={data} baseUrl="/listProject" /> */}




                        </Modal.Body>
                    </div>
                </Modal>


            </div>
        return newModal;
    }
};


export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(TableModalLabourCost));
