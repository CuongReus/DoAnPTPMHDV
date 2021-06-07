import React from 'react';
import { Modal } from 'react-bootstrap';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { reduxForm } from 'redux-form';
import { LoadingScreen } from '../../components/commonWidgets';
import agent from '../../services/agent';
import { FormatterUtils } from '../../utils/javascriptUtils';
import ModalProductCost from '../projectCost/ModalProductCost';
import ModalLabourCost from '../projectCost/ModalLabourCost';
import ModalOtherCost from '../projectCost/ModalOtherCost';
import ModalConstructionTeamCost from '../projectCost/ModalConstructionTeamCost';

const validate = values => {
    const errors = {};
    return errors;
}

const mapStateToProps = state => {
    var updateValue = {
    };
    return {
    };
};

const mapDispatchToProps = dispatch => ({
        updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalShowAllInvoiceOutput", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});

class ModalShowAllInvoiceOutput extends React.Component {
    

constructor(props) {
    super(props);
    this.state = {
        listProjectCost : null,
        idProjectCost : null,
        costType : null,
        isShowModalLabourCost : false,
        isShowModalOrtherCost : false,
        isShowModalProductCost : false,
        isShowModalConstructionTeamCost : false,
        projectDetail : null
    }
    this.handleHideAndClear = this.handleHideAndClear.bind(this);
    this.handleHidemodal = this.handleHidemodal.bind(this);
    this.handleShowModalProjectCost = this.handleShowModalProjectCost.bind(this);
}

getListInvoiceCost(){
    var projectDetailId = this.props.projectDetailId;
    let setStateInRequest = (list) => { this.setState({ listProjectCost: list }) }
    agent.asyncRequests.get("/projectCost/findByProjectDetailIdOrderLot?projectDetailId=" + projectDetailId
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
handleShowModalProjectCost(id, type, projectDetail){

    if( type == "NHAN_CONG"){
        this.setState({
            idProjectCost : id,
            isShowModalLabourCost : true,
            paymentType : type,
            projectDetail : projectDetail
        })
    }else if( type == "VAT_TU"){
        this.setState({
            idProjectCost : id,
            isShowModalProductCost : true,
            paymentType : type, projectDetail : projectDetail
        })
    }else if( type == "CHI_PHI_KHAC"){
        this.setState({
            idProjectCost : id,
            isShowModalOrtherCost : true,
            paymentType : type, 
            projectDetail : projectDetail
        })
    }else if( type == "DOI_THI_CONG"){
        this.setState({
            idProjectCost : id,
            isShowModalConstructionTeamCost : true,
            paymentType : type, 
            projectDetail : projectDetail
        })
    }
}
handleHidemodal(){
    this.setState({
        isShowModalLabourCost : false,
        isShowModalOrtherCost : false,
        isShowModalProductCost : false,
        isShowModalConstructionTeamCost : false
    })
}
componentWillMount() {
    this.getListInvoiceCost();
}

///Hide and Clean Value
handleHideAndClear() {
    const { destroy, onHide } = this.props;
    // event.preventDefault();
    onHide();
    destroy();
}
render() {
    // const { objectProject, listfile, title, onHide } = this.props;
    let dataProjectCost = this.state.listProjectCost;
    const { handleSubmit, submitting, title,invalid , t} = this.props;
    const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"lg",  onHide: this.props.onHide, submitting: this.props.submitting };

    var totalunitPrice = 0;
    var totalMoney = 0;
    var totalPaid = 0 ;
    var totalExitAmount = 0;

    var rows =  dataProjectCost != null ? dataProjectCost.map(item =>{
        totalunitPrice += item.unitPrice;
        totalMoney += item.totalMoney;
        totalPaid += item.totalPaid;
        totalExitAmount += item.totalMoney - item.totalPaid;

        return (<tr key={"dataProjectCost" + item.id}>
            <td>{item.title}</td>
            <td>{item.lotNumber}</td>
            <td>{FormatterUtils.formatCurrency(item.unitPrice)}</td>
            <td>{FormatterUtils.formatCurrency(item.totalMoney)}</td>
            <td>{FormatterUtils.formatCurrency(item.totalPaid)}</td>
            <td>{FormatterUtils.formatCurrency(item.totalMoney - item.totalPaid)}</td>
            <td> <span style={item.status =="DA_THANH_TOAN_DU" ? {color:"green", textTransform:"uppercase"} : {color:"red", textTransform:"uppercase"}}>{t(item.status)}</span></td>
            <td>{item.paymentType}</td>
            <td className="text-center footable-visible footable-last-column">
                <ul className="icons-list">
                    <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                            <i className="icon-menu9"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-right">
                            <li><a onClick={() => this.handleShowModalProjectCost(item.id, item.paymentType, item.projectDetail)}><i className="icon-file-pdf"></i>Chi Tiết</a></li>
                        </ul>
                    </li>
                </ul>
            </td>
        </tr>)
    }) : null;
    var newModal =
        <div style={{ width: '2000px' }}>
            <Modal
                {...modalConfig}
                aria-labelledby="contained-modal-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg"><center>{title}</center> </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {submitting ? <LoadingScreen /> :
                        <form className="form-horizontal" role="form">
                            <table className="table table-togglable">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th>Tổng Đơn Gía</th>
                                        <th>Tổng Số Tiền Cần Thanh Toán</th>
                                        <th>Tổng Số Tiền Đã Thanh Toán</th>
                                        <th>Tổng Số Tiền Còn Lại</th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th>{FormatterUtils.formatCurrency(totalunitPrice)}</th>
                                        <th>{FormatterUtils.formatCurrency(totalMoney)}</th>
                                        <th>{FormatterUtils.formatCurrency(totalPaid)}</th>
                                        <th>{FormatterUtils.formatCurrency(totalExitAmount)}</th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                    <tr className="bg-green">
                                        <td>Thông tin</td>
                                        <td >Đợt Thanh Toán</td>
                                        <td >Đơn Gía</td>
                                        <td >Số Tiền Cần Thanh Toán</td>
                                        <td >Đã Thanh Toán</td>
                                        <td >Còn Lại</td>
                                        <td >Trạng Thái</td>
                                        <td >Loại Thanh Toán</td>
                                        <th style={{ textAlign: 'center' }} className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows}
                                </tbody>
                            </table>
                            <div className="text-right">
                                <button type="button" className="btn btn-link" onClick={this.handleHideAndClear} >Hủy</button>
                            </div>

                        </form>
                    }
                    {this.state.isShowModalProductCost ? <ModalProductCost projectDetailDto={this.state.projectDetail} title="Thanh Toán Vật Tư" idProjectCost={this.state.idProjectCost}  show={this.state.isShowModalProductCost} onHide={this.handleHidemodal} ></ModalProductCost> : null}
                    {this.state.isShowModalLabourCost ? <ModalLabourCost projectDetailDto={this.state.projectDetail} title="Thanh Toán Nhân Công" idProjectCost={this.state.idProjectCost}  show={this.state.isShowModalLabourCost} onHide={this.handleHidemodal} ></ModalLabourCost> : null}
                    {this.state.isShowModalOrtherCost ? <ModalOtherCost  projectDetailDto={this.state.projectDetail} title="Thanh Chi Phí Khác" idProjectCost={this.state.idProjectCost}  show={this.state.isShowModalOrtherCost} onHide={this.handleHidemodal} ></ModalOtherCost> : null}
                    {this.state.isShowModalConstructionTeamCost ? <ModalConstructionTeamCost projectDetailDto={this.state.projectDetail} title="Thanh Toán  Đội Thi Công" idProjectCost={this.state.idProjectCost}  show={this.state.isShowModalConstructionTeamCost} onHide={this.handleHidemodal} ></ModalConstructionTeamCost> : null}
                </Modal.Body>
            </Modal>
        </div>
    return newModal;
}
};


export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'ModalShowAllInvoiceOutput',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalShowAllInvoiceOutput)));
