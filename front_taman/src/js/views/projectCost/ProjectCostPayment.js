import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker, RenderCheckbox, RenderSelect, RenderNumberInput, RenderMoneyFormat } from '../../components/formInputs';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import isEmail from 'sane-email-validation';
import { StringUtils, FormatterUtils } from '../../utils/javascriptUtils';
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
import ModalLabourPayment from '../payment/ModalLabourPayment';
import ModalProductPayment from '../payment/ModalProductPayment';
import ModalOtherPayment from '../payment/ModalOtherPayment';
import SecuredComponent from '../../components/SecuredComponent';
// import ModalProjectCost from './ModalProjectCost';
// import ModalProductCost from './ModalProductCost';







class ProjectCostPayment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectCostPaymentDto: null,
            isShowLabourPaymentModal: false,
            isShowProductPaymentModal: false,
            isShowOtherPaymentModal: false,
            isShowConstructionTeamPaymentModal: false,
            idPayment: null //General Use for LabourPayment,ProductPayment, OtherPayment


        }
        this.handleShowModalEditLabourPayment = (id) => {
            this.setState({
                isShowLabourPaymentModal: true,
                idPayment: id
            })
        }
        this.handleShowModalEditProductPayment = (id) => {
            this.setState({
                isShowProductPaymentModal: true,
                idPayment: id
            })
        }
        this.handleShowModalEditOtherPayment = (id) => {
            this.setState({
                isShowOtherPaymentModal: true,
                idPayment: id
            })
        }
        this.handleShowModalEditConstructionTeamPayment = (id) => {
            this.setState({
                isShowConstructionTeamPaymentModal: true,
                idPayment: id
            })
        }
        // this.updateProjectCost = this.updateProjectCost.bind(this);
        this.handleHidemodal = () => {
            const { projectCostDto } = this.props;
            this.setState({
                isShowLabourPaymentModal: false,
                isShowProductPaymentModal: false,
                isShowOtherPaymentModal: false,
                isShowConstructionTeamPaymentModal: false
            });
            // this.updateProjectCost();
            this.props.reloadProjectCost(projectCostDto.id);
        }
        this.handleDeletePayment = (id) => {
            const { projectCostDto } = this.props;
            const reloadProjectCost = this.props.reloadProjectCost
            if (confirm("Bạn có chắc sẽ xoá!")) {
                var url = `/payment/${id}`;
                return agent.asyncRequests.del(url
                ).then(function (res) {
                    var result = res.body.resultData;
                    if (result && !result.error) {
                        alert("Xoá Thành Công!");
                        reloadProjectCost(projectCostDto.id);
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

    componentWillMount() {
        const { projectCostPaymentDto } = this.props;
        if (projectCostPaymentDto) {
            this.setState({ projectCostPaymentDto: projectCostPaymentDto });
        }
    }




    render() {
        const { t, paymentType } = this.props;

        const dataProjectCostPayment = this.props.projectCostPaymentDto;
        if (!dataProjectCostPayment) {
            return <LoadingScreen></LoadingScreen>;
        } else {
            if (paymentType == "VAT_TU") {
                return (

                    <tr style={{ textAlign: 'center' }} className="warning" key={"productCost_" + dataProjectCostPayment.id}>
                        <td colSpan="2"></td>
                        <td>{dataProjectCostPayment.lotNumber}</td>
                        <td>{dataProjectCostPayment.percentPaid} %</td>
                        <td>{FormatterUtils.formatCurrency(dataProjectCostPayment.moneyPaid)}</td>
                        <td>{dataProjectCostPayment.approvalBy ? dataProjectCostPayment.approvalBy.fullName : null}</td>
                        <td style={{textAlign:"center"}}>
                            <span style={dataProjectCostPayment.status =="DA_DUYET_THANH_TOAN" ? {color:"green", textTransform:"uppercase"} : {color:"red", textTransform:"uppercase"}}>{t(dataProjectCostPayment.status)}</span>
                        </td>
                        <td>{dataProjectCostPayment.status == "DA_DUYET_THANH_TOAN" ? dataProjectCostPayment.paymentDate : null}</td>
                        <td colSpan="3" >{dataProjectCostPayment.note}</td>
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
                                        <SecuredComponent allowedPermission="admin.projectPayment.productC&U">
                                        <li><a onClick={() => this.handleShowModalEditProductPayment(dataProjectCostPayment.id)}><i className="icon-pencil"></i>Chỉnh Sửa</a></li>
                                         </SecuredComponent>
                                       <SecuredComponent allowedPermission="admin.projectPayment.productDelete">
                                        <li><a onClick={() => this.handleDeletePayment(dataProjectCostPayment.id)}><i className="icon-cross2"></i>Xóa</a></li>
                                         </SecuredComponent>
                                        {/* </SecuredComponent> */}
                                    </ul>
                                </li>
                            </ul>
                        </td>
                        {this.state.isShowProductPaymentModal ? <ModalProductPayment title="Đợt Thanh Toán Vật Tư" dataProjectCostPayment={null} totalPercentPaidFromProps={this.props.totalPercentPaid} projectCostDto={this.props.projectCostDto} currentDate={this.state.currentDate} idPayment={this.state.idPayment} show={this.state.isShowProductPaymentModal} onHide={this.handleHidemodal} /> : null}
                    </tr>
                )

            } else if (paymentType == "DOI_THI_CONG") {
                return (

                    <tr style={{ textAlign: 'center' }} className="warning" key={"constructionTeamCost_" + dataProjectCostPayment.id}>
                        <td colSpan="2"></td>
                        <td>{dataProjectCostPayment.lotNumber}</td>
                        <td>{dataProjectCostPayment.percentPaid} %</td>
                        <td>{FormatterUtils.formatCurrency(dataProjectCostPayment.moneyPaid)}</td>
                        <td>{dataProjectCostPayment.approvalBy ? dataProjectCostPayment.approvalBy.fullName : null}</td>
                        <td style={{textAlign:"center"}}>
                            <span style={dataProjectCostPayment.status =="DA_DUYET_THANH_TOAN" ? {color:"green", textTransform:"uppercase"} : {color:"red", textTransform:"uppercase"}}>{t(dataProjectCostPayment.status)}</span>
                        </td>
                        <td>{dataProjectCostPayment.status == "DA_DUYET_THANH_TOAN" ? dataProjectCostPayment.paymentDate : null}</td>
                        <td colSpan="3" >{dataProjectCostPayment.note}</td>
                        <td className="text-center footable-visible footable-last-column">
                            <ul className="icons-list">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                        <i className="icon-menu9"></i>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-right">
                                        <SecuredComponent allowedPermission="admin.projectPayment.constructionTeamC&U">
                                        <li><a onClick={() => this.handleShowModalEditConstructionTeamPayment(dataProjectCostPayment.id)}><i className="icon-pencil"></i>Chỉnh Sửa</a></li>
                                        </SecuredComponent>
                                        <SecuredComponent allowedPermission="admin.projectPayment.constructionTeamDelete">
                                        <li><a onClick={() => this.handleDeletePayment(dataProjectCostPayment.id)}><i className="icon-cross2"></i>Xóa</a></li>
                                        </SecuredComponent>
                                    </ul>
                                </li>
                            </ul>
                        </td>
                        {this.state.isShowConstructionTeamPaymentModal ? <ModalOtherPayment title="Thanh Toán Đội Thi Công" dataProjectCostPayment={null} totalPercentPaidFromProps={this.props.totalPercentPaid} projectCostDto={this.props.projectCostDto} currentDate={this.state.currentDate} idPayment={this.state.idPayment} show={this.state.isShowConstructionTeamPaymentModal} onHide={this.handleHidemodal} /> : null}
                    </tr>
                )

            }
            else if (paymentType == "NHAN_CONG") {
                return (
                    <tr className="warning">
                        <td></td>
                        <td>{dataProjectCostPayment.lotNumber}</td>
                        <td>{dataProjectCostPayment.labour ? dataProjectCostPayment.labour.fullName : null}</td>
                        <td>{FormatterUtils.formatCurrency(dataProjectCostPayment.lbSalaryPerDay)}</td>
                        <td>{FormatterUtils.formatCurrency(dataProjectCostPayment.lbSalaryMidNight)}</td>
                        <td>{dataProjectCostPayment.lbNormalAttendance}</td>
                        <td>{dataProjectCostPayment.lbOvertimeAttendance}</td>
                        <td>{dataProjectCostPayment.lbMidnightAttendance}</td>
                        <td>{FormatterUtils.formatCurrency(dataProjectCostPayment.moneyPaid)}</td>
                        <td style={{textAlign:"center"}}>
                            <span style={dataProjectCostPayment.status =="DA_DUYET_THANH_TOAN" ? {color:"green", textTransform:"uppercase"} : {color:"red", textTransform:"uppercase"}}>{t(dataProjectCostPayment.status)}</span>
                        </td>
                        <td>{dataProjectCostPayment.status == "DA_DUYET_THANH_TOAN" && dataProjectCostPayment.paymentDate ? moment(dataProjectCostPayment.paymentDate).format("DD/MM/YYYY") : null}</td>
                        <td>{dataProjectCostPayment.approvalBy ? dataProjectCostPayment.approvalBy.fullName : null}</td>
                        <td> {dataProjectCostPayment.note}</td>
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
                                        <SecuredComponent allowedPermission="admin.projectPayment.labourC&U">
                                        <li><a onClick={() => this.handleShowModalEditLabourPayment(dataProjectCostPayment.id)}><i className="icon-pencil"></i>Chỉnh Sửa</a></li>
                                        </SecuredComponent>
                                    </ul>
                                </li>
                            </ul>
                        </td>
                        {this.state.isShowLabourPaymentModal ? <ModalLabourPayment title="Đợt Thanh Toán Nhân Công" dataProjectCostPayment={this.props.dataProjectCostPayment} projectCostDto={this.props.projectCostDto} currentDate={this.state.currentDate} idPayment={this.state.idPayment} show={this.state.isShowLabourPaymentModal} onHide={this.handleHidemodal} /> : null}
                    </tr>
                )
            }
            else if (paymentType == "CHI_PHI_KHAC") {
                return (

                    <tr style={{ textAlign: 'center' }} className="warning" key={"otherCost_" + dataProjectCostPayment.id}>
                        <td colSpan="2"></td>
                        <td>{dataProjectCostPayment.lotNumber}</td>
                        <td>{dataProjectCostPayment.percentPaid} %</td>
                        <td>{FormatterUtils.formatCurrency(dataProjectCostPayment.moneyPaid)}</td>
                        <td>{dataProjectCostPayment.approvalBy ? dataProjectCostPayment.approvalBy.fullName : null}</td>
                        <td style={{textAlign:"center"}}>
                            <span style={dataProjectCostPayment.status =="DA_DUYET_THANH_TOAN" ? {color:"green", textTransform:"uppercase"} : {color:"red", textTransform:"uppercase"}}>{t(dataProjectCostPayment.status)}</span>
                        </td>
                        <td>{dataProjectCostPayment.status == "DA_DUYET_THANH_TOAN" ? dataProjectCostPayment.paymentDate : null}</td>
                        <td colSpan="3" >{dataProjectCostPayment.note}</td>
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
                                        <SecuredComponent allowedPermission="admin.projectPayment.otherC&U">
                                        <li><a onClick={() => this.handleShowModalEditOtherPayment(dataProjectCostPayment.id)}><i className="icon-pencil"></i>Chỉnh Sửa</a></li>
                                          </SecuredComponent>
                                        <SecuredComponent allowedPermission="admin.projectPayment.otherDelete">
                                        <li><a onClick={() => this.handleDeletePayment(dataProjectCostPayment.id)}><i className="icon-cross2"></i>Xóa</a></li>
                                          </SecuredComponent>
                                        {/* </SecuredComponent> */}
                                    </ul>
                                </li>
                            </ul>
                        </td>
                        {this.state.isShowOtherPaymentModal ? <ModalOtherPayment title="Thanh Toán Chi Phí Khác" dataProjectCostPayment={null} totalPercentPaidFromProps={this.props.totalPercentPaid} projectCostDto={this.props.projectCostDto} currentDate={this.state.currentDate} idPayment={this.state.idPayment} show={this.state.isShowOtherPaymentModal} onHide={this.handleHidemodal} /> : null}
                    </tr>
                )

            }

        }





    }
};


export default translate('translations')(ProjectCostPayment);
