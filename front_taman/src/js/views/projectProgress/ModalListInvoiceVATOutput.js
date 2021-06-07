import moment from 'moment';
import React from 'react';
import { Modal } from 'react-bootstrap';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { reduxForm } from 'redux-form';
import { LoadingScreen } from '../../components/commonWidgets';
import agent from '../../services/agent';
import { FormatterUtils } from '../../utils/javascriptUtils';
import ModalEditInvoiceVATOutput from '../invoiceVATOutput/ModalEditInvoiceVATOutput';


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
            meta: { form: "ModalListInvoiceVATOutput", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});




class ModalListInvoiceVATOutput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listInvoiceVAT :  null,
            isShowModalInvoiceVATOutput :  false,
            idInvoiceVATInput : null
        }

        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isShowModalInvoiceVATOutput: false });
            this.getListInvoiceVATOutputByProjectDetailId();
        };
        
    }

    getListInvoiceVATOutputByProjectDetailId(){
        const {projectDetailDto} =  this.props;
        let setStateInRequest = (list) => { this.setState({ listInvoiceVAT: list }) }
        agent.asyncRequests.get("/invoiceVATOutput/findByProjectDetailId?projectDetailId=" + projectDetailDto.id
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            } 
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }


    handleDelete(id) {
        if (confirm("Bạn có chắc sẽ xoá!")) {
            var url = `/invoiceVATOutput/${id}`;

            let reload = () => { this.getListInvoiceVATOutputByProjectDetailId()}
            return agent.asyncRequests.del(url
            ).then(function (res) {
                var result = res.body.resultData;
                if (result && !result.error) {
                    reload();
                    // window.location.reload(true);
                } else {
                    toast.error("Có lỗi khi xóa dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Không thể xóa dữ liệu đang được sử dụng từ màn hình khác! ", { autoClose: 15000 });
            });
        }
    }

    handleShowmodal (id) {
        this.setState({ 
            isShowModalInvoiceVATOutput: true, 
            idInvoiceVATInput : id })
    }
    componentWillMount() {
        this.getListInvoiceVATOutputByProjectDetailId();
    }

    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        onHide();
        destroy();
    }

    render() {
        let dataInvoiceVAT = this.state.listInvoiceVAT;
        var rows = null;
        if(dataInvoiceVAT){
            rows =   dataInvoiceVAT.map( (item, index) =>{
                            return (<tr key={"dataInvoiceVATOutput_"+index}>
                                        <td>{item.invoiceVatCode}</td>
                                        <td>{item.name}</td>
                                        <td>{item.supplierName}</td>
                                        <td>{FormatterUtils.formatCurrency(item.totalMoneyNoVat )}</td>
                                        <td>{FormatterUtils.formatCurrency(item.totalMoneyVat )}</td>
                                        <td>{moment(item.paymentDate).format("DD/MM/YYYY")}</td>
                                        <td>{moment(item.invoiceOutputDate).format("DD/MM/YYYY")}</td>
                                        <td>{item.responsibleUser ? item.responsibleUser.fullName : ""}</td>
                                        <td className="text-center footable-visible footable-last-column">
                                            <ul className="icons-list">
                                                <li className="dropdown">
                                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                                        <i className="icon-menu9"></i>
                                                    </a>
                                                    <ul className="dropdown-menu dropdown-menu-right">
                                                        {/* <SecuredComponent allowedPermission="admin.supplier.update"> */}
                                                            <li><a onClick={() => this.handleShowmodal(item.id)}><i className="icon-pencil"></i>Chỉnh Sửa</a></li>
                                                        {/* </SecuredComponent> */}
                                                        {/* <SecuredComponent allowedPermission="admin.supplier.delete"> */}
                                                            <li><a onClick={() => this.handleDelete(item.id)}><i className="icon-cross2"></i>Xóa</a></li>
                                                        {/* </SecuredComponent> */}
                                                    </ul>
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>)
                            })
        }
       

        const { submitting, title } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"lg",  onHide: this.props.onHide, submitting: this.props.submitting };
  
        var newModal =
            <div style={{ width: '30%' }}>
                <Modal
                    {...modalConfig}
                    aria-labelledby="contained-modal-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-sm"><center>{title}</center> </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {submitting ? <LoadingScreen /> :

                            <form className="form-horizontal" role="form">
                                <span className="pull-right" style={{marginBottom : '10px'}}>
                                    {/* <SecuredComponent allowedPermission="admin.supplier.create"> */}
                                        <button className="btn bg-green" type="button" onClick={() => this.handleShowmodal()}>Thêm Mới</button>
                                    {/* </SecuredComponent> */}
                                </span>
                                <br/>
                                <table className="table table-togglable">
                                    <thead>
                                        <tr className="bg-green">
                                            <th >Mã Hóa Đơn</th>
                                            <th >Tên Hóa Đơn</th>
                                            <th >Tên Khách Hàng</th>
                                            <th >Tổng Tiền Chưa VAT</th>
                                            <th >Tổng Tiền VAT</th>
                                            <th >Ngày Thanh Toán</th>
                                            <th >Ngày Xuất Hóa Đơn</th>
                                            <th >Kế Toán</th>
                                            <th style={{ textAlign: 'center' }} className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                                <div className="text-right" style={{marginTop :'10px'}}>
                                    <button type="button" className="btn btn-warning" onClick={this.handleHideAndClear} >Đóng</button>
                                </div>
                            </form>
                        }
                        {this.state.isShowModalInvoiceVATOutput ? <ModalEditInvoiceVATOutput title="Hoá Đơn Đầu Ra" projectDetailDto={this.props.projectDetailDto} invoiceVATOutputId={this.state.idInvoiceVATInput} show={this.state.isShowModalInvoiceVATOutput} onHide={this.handleHidemodal} /> : null}
                    </Modal.Body>
                </Modal>
            </div>
        return newModal;
    }
};
    
export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'ModalListInvoiceVATOutput',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalListInvoiceVATOutput)));
