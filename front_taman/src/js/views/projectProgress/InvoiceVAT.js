import React from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import ModalListInvoiceVATDiferance from './ModalListInvoiceVATDiferance';
import ModalListInvoiceVATInput from './ModalListInvoiceVATInput';
import ModalListInvoiceVATOutput from './ModalListInvoiceVATOutput';
const mapStateToProps = state => {
    return {
        currentUser: state.common.currentUser
    }
};

const mapDispatchToProps = dispatch => ({
});

class InvoiceVAT extends React.Component {
    constructor() {
        super();
        this.state = {

            isShowListInvoiceVATInput : false,
            isShowListInvoiceVATOutput : false,
            isShowInvoiceVATDiferance : false

        }

        this.handleShowListInvoiceVATInput = this.handleShowListInvoiceVATInput.bind(this);
        this.handleShowListInvoiceVATOutput = this.handleShowListInvoiceVATOutput.bind(this);
        this.handleShowModalDifference = this.handleShowModalDifference.bind(this);
        this.HandleHide = () => {
            this.setState({
                isShowInvoiceVATDiferance : false,
                isShowListInvoiceVATInput : false,
                isShowListInvoiceVATOutput : false
             })
        }
    };

    handleShowModalDifference(){
        this.setState({
            isShowInvoiceVATDiferance   : true
        })
    }
    handleShowListInvoiceVATInput(){
        this.setState({
            isShowListInvoiceVATInput   : true
        })
    }
    handleShowListInvoiceVATOutput(){
        this.setState({
            isShowListInvoiceVATOutput : true
        })
    }
    componentWillMount() {
    }


    render() {
        return (
            <tr>
                <td colSpan="15">
                <div style={{display :'flex', justifyContent : 'center'}}>
                        <div style={{textAlign : 'center'}}>
                            <button style={{width : '80px', height : '35px', display : 'inline-block', fontSize :'16px'}} className="btn btn-info" onClick={this.handleShowListInvoiceVATInput} >2.1</button>
                            <br/>
                            <label> Hóa Đơn Đầu Vào </label>
                        </div>
                        <div style={{textAlign : 'center', paddingLeft :'20px'}}>
                            <button style={{width : '80px', height : '35px', display : 'inline-block', fontSize :'16px'}} className="btn btn-info" onClick={this.handleShowListInvoiceVATOutput} > 2.2 </button>
                            <br/>
                            <label>Hóa Đơn Đầu Ra</label>
                        </div>
                        <div style={{textAlign : 'center', paddingLeft :'13px'}}>
                            <button style={{width : '80px', height : '35px', display : 'inline-block', fontSize :'16px'}} className="btn btn-info" onClick={this.handleShowModalDifference} > 2.3 </button>
                            <br/>
                            <label>Thống Kê Dòng Tiền</label>
                        </div>
                    </div>
                    {this.state.isShowListInvoiceVATInput ? <ModalListInvoiceVATInput title="Hóa Đơn Đầu Vào" onHide={this.HandleHide} projectDetailDto={this.props.projectDetailDto} show={this.state.isShowListInvoiceVATInput } />  : null}
                    {this.state.isShowListInvoiceVATOutput ? <ModalListInvoiceVATOutput title="Hóa Đơn Đầu Ra" onHide={this.HandleHide} projectDetailDto={this.props.projectDetailDto} show={this.state.isShowListInvoiceVATOutput } />  : null}
                    {this.state.isShowInvoiceVATDiferance ? <ModalListInvoiceVATDiferance title="Thống Kê Hóa Đơn VAT" onHide={this.HandleHide} projectDetailDto={this.props.projectDetailDto} show={this.state.isShowInvoiceVATDiferance } />  : null}
                </td>
            </tr>
        )
    }
};
export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(InvoiceVAT));
