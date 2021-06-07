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
            meta: { form: "ModalListInvoiceVATDiferance", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});

class ModalListInvoiceVATDiferance extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            listInvoiceVATInput : null,
            listInvoiceVATOutput : null,

        }
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.handleHidemodal = this.handleHidemodal.bind(this);
    }

    getListInvoiceVATInput() {
        const {projectDetailDto} = this.props;
        let setStateInRequest = (list) => { this.setState({ listInvoiceVATInput: list }) }
        agent.asyncRequests.get("/invoiceVATInput/findByProjectDetailId?projectDetailId=" + projectDetailDto.id
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
    getListInvoiceVATOutput() {
        const {projectDetailDto} = this.props;
        let setStateInRequest = (list) => { this.setState({ listInvoiceVATOutput: list }) }
        agent.asyncRequests.get("/invoiceVATOutput/findByProjectDetailId?projectDetailId=" + projectDetailDto.id
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

    handleHidemodal() {
        this.setState({
        })
    }
    componentWillMount() {
        this.getListInvoiceVATInput();
        this.getListInvoiceVATOutput();
    }

    ///Hide and Clean Value
    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        // event.preventDefault();
        onHide();
        destroy();
    }
    render() {
        const { submitting, title, t } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show, bsSize: "large", onHide: this.props.onHide };
        
        var dataInvoiceVATInput = this.state.listInvoiceVATInput;
        var dataInvoiceOutput = this.state.listInvoiceVATOutput;
        var totalMoneyIn = 0;
        var totalMoneyInVAT = 0;
        var totalMoneyOut = 0;
        var totalMoneyOutVAT = 0;
        var currentNo = 0;
        var rows = null;

        if(dataInvoiceOutput){
            rows =  dataInvoiceOutput.map( invoiceVATOutput =>{
                currentNo ++;
                var rowInvoiceVATInput = null;
                totalMoneyOut += invoiceVATOutput.totalMoneyNoVat;
                totalMoneyOutVAT += invoiceVATOutput.totalMoneyVat;
                var totalMoneyInputOfOutput = 0;
                var totalMoneyInputvatOfOutput = 0;
                var currentNoRow = 0;
                if(dataInvoiceVATInput){
                    rowInvoiceVATInput = dataInvoiceVATInput.map( invoiceVATInput =>{
                        if(invoiceVATInput.invoiceVatOutId == invoiceVATOutput.id){
                            currentNoRow ++;
                                    totalMoneyIn += invoiceVATInput.totalMoneyNoVat;
                                    totalMoneyInVAT +=invoiceVATInput.totalMoneyVat;
                                    totalMoneyInputOfOutput += invoiceVATInput.totalMoneyNoVat;
                                    totalMoneyInputvatOfOutput +=invoiceVATInput.totalMoneyVat;

                                    return [<tr key={"dataInvoiceVATInput_"+currentNoRow}>
                                                <td>{currentNo + "." + (currentNoRow)}</td>
                                                <td style={{backgroundColor : "orange"}}><center>Vào</center></td>
                                                <td>{invoiceVATInput.invoiceVatCode}</td>
                                                <td>{invoiceVATInput.name}</td>
                                                <td>{invoiceVATInput.taxCode}</td>
                                                <td></td>
                                                <td>{invoiceVATInput.customerName}</td>
                                                <td>{ "-" +FormatterUtils.formatCurrency(invoiceVATInput.totalMoneyNoVat )}</td>
                                                <td>{ "-"+FormatterUtils.formatCurrency(invoiceVATInput.totalMoneyVat )}</td>
                                            </tr>]
                                }
                            })

                }
                var afterMoney = [
                    <tr className="success">
                        <td colSpan="7">Lợi Nhuận</td>
                        <td > {FormatterUtils.formatCurrency(invoiceVATOutput.totalMoneyNoVat -  totalMoneyInputOfOutput)}</td>
                        <td >{FormatterUtils.formatCurrency(invoiceVATOutput.totalMoneyVat -  totalMoneyInputvatOfOutput)}</td>
                    </tr>
                ]
                return [<tr key={"dataInvoiceVATOutput_"+currentNo}>
                        <td>{currentNo}</td>
                        <td style={{backgroundColor : "#8BC34A"}}><center>Ra</center></td>
                        <td>{invoiceVATOutput.invoiceVatCode}</td>
                        <td>{invoiceVATOutput.name}</td>
                        <td></td>
                        <td>{invoiceVATOutput.supplierName}</td>
                        <td></td>
                        <td>{FormatterUtils.formatCurrency(invoiceVATOutput.totalMoneyNoVat )}</td>
                        <td>{FormatterUtils.formatCurrency(invoiceVATOutput.totalMoneyVat )}</td>
                    </tr>].concat(rowInvoiceVATInput).concat(afterMoney)
            })
        }
    
        var newModal =
            <div style={{ width: '100%' }}>
                <Modal
                    {...modalConfig}
                    aria-labelledby="contained-modal-title-large"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-large"><center>{title}</center> </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {submitting ? <LoadingScreen /> :
                            <form className="form-horizontal" role="form">
                                <div style={{marginBottom : '10px'}}>
                                    <span>Tổng Tiền Hóa Đơn đầu vào : {FormatterUtils.formatCurrency(totalMoneyIn ) }</span>
                                    <br/>
                                    <span>Tổng Tiền Hóa Đơn đầu vào VAT : { FormatterUtils.formatCurrency(totalMoneyInVAT )  }</span>
                                    <br/>
                                    <span>Tổng Tiền Hóa Đơn đầu Ra : { FormatterUtils.formatCurrency(totalMoneyOut )  }</span>
                                    <br/>
                                    <span>Tổng Tiền Hóa Đơn đầu Ra VAT : { FormatterUtils.formatCurrency(totalMoneyOutVAT )  }</span>
                                    <br/>
                                </div>
                                <table className="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
                                    <thead  >
                                        <tr className="bg-info">
                                            <th  >STT</th>
                                            <th  >Loại</th>
                                            <th  >Mã Hóa Đơn</th>
                                            <th  >Định Danh Hóa Đơn</th>
                                            <th  >Mã Số Thuế</th>
                                            <th  >Khách Hàng</th>
                                            <th  >Nhà Cung Cấp</th>
                                            <th  >Số Tiền </th>
                                            <th  >Số Tiền VAT</th>
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
                    </Modal.Body>
                </Modal>
            </div>
        return newModal;
    }
};


export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'ModalListInvoiceVATDiferance',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalListInvoiceVATDiferance)));
