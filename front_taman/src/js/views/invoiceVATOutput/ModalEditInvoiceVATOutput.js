import moment from 'moment';
import React from 'react';
import { Modal } from 'react-bootstrap';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Field, reduxForm } from 'redux-form';
import { LoadingScreen } from '../../components/commonWidgets';
import { RenderDatePicker, RenderInputWithDiv, RenderMoneyFormat, RenderSelect, RenderTextArea } from '../../components/formInputs';
import ListFile from '../../components/ListFile';
import agent from '../../services/agent';
import { LOAD_UPDATING_INVOICE_VAT_OUTPUT } from './action-types';

const validate = values => {
    const errors = {};
    return errors;
}

const mapStateToProps = state => {
    var updateValue = {
        ...state.invoiceVATOutputReducer.updatingInvoiceVATOutput,
        paymentDate: state.invoiceVATOutputReducer.updatingInvoiceVATOutput && state.invoiceVATOutputReducer.updatingInvoiceVATOutput.paymentDate ? moment(state.invoiceVATOutputReducer.updatingInvoiceVATOutput.paymentDate) : null,
        invoiceOutputDate: state.invoiceVATOutputReducer.updatingInvoiceVATOutput && state.invoiceVATOutputReducer.updatingInvoiceVATOutput.invoiceOutputDate ? moment(state.invoiceVATOutputReducer.updatingInvoiceVATOutput.invoiceOutputDate) : null,

    };
    return {
        initialValues: updateValue
    };
};

const mapDispatchToProps = dispatch => ({
    loadInvoiceVATOutput: (payload) =>
        dispatch({ type: LOAD_UPDATING_INVOICE_VAT_OUTPUT, payload: payload }),
     updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalEditInvoiceVATOutput", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});

class ModalEditInvoiceVATOutput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkInvoiceSendDate: null,
            disableDataManipulation: true,
            listAllUsers: [],
            projectDetail: [],
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
    }
    getListUser() {
        let setStateInRequest = (list) => { this.setState({ listAllUsers: list }) }
        return agent.asyncRequests.get("/user/listAll").then(function (res) {
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
        const { loadInvoiceVATOutput,invoiceVATOutputId, projectDetailDto, updateField, destroy} = this.props;
        if (invoiceVATOutputId) {
            const dataPromise = agent.InvoiceVATOutputAPI.getInvoiceVATOutput(invoiceVATOutputId);
            loadInvoiceVATOutput(Promise.resolve(dataPromise));
        }else{
            destroy();
        }
        this.getListUser();
        updateField("projectDetailId", projectDetailDto.id)
    }

    handleAdd(values) {
        var onHide = this.props.onHide;
        var id = this.props.invoiceVATOutputId;
        const {} = this.props
        var url = '/invoiceVATOutput/add';
        var bodyObject = {
           projectDetailId : values.projectDetailId,
           name : values.name,
           invoiceVatCode : values.invoiceVatCode,
           supplierName : values.supplierName,
           totalMoneyNoVat : values.totalMoneyNoVat,
           totalMoneyVat : values.totalMoneyVat,
           paymentDate : values.paymentDate,
           invoiceOutputDate : values.invoiceOutputDate,
           note : values.note,
           responsibleUserId : values.responsibleUserId,
           files : values.files
        };
        if (id) {
            url = '/invoiceVATOutput/update';
            bodyObject.id = id;
        }

        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                onHide();
                toast.info("Lưu Thành Công.", { autoClose: 8000 });
            } else {

                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });

    }

    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        onHide();
        destroy();
    }


    render() {
        const { handleSubmit, submitting, title, invalid, projectDetailDto} = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show, bsSize: "sm", onHide: this.props.onHide, submitting: this.props.submitting  };

        var dataUser = this.state.listAllUsers;
        var optionUser = [];
        if(dataUser){
            dataUser.map(user =>{
                optionUser.push({label : user.fullName, value : user.id})
            })
        }


        var optionProjectDetail = [{label : projectDetailDto.name, value : projectDetailDto.id}]
        

        var newModal = <div style={{ width: '30%' }}>
                        <Modal
                            {...modalConfig}
                            aria-labelledby="contained-modal-title-lg"
                        >
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title-sm"><center>{title}</center>  </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {submitting ? <LoadingScreen /> :
                                    <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.handleAdd)}>
                                            <Field disabled={true} name="projectDetailId" label="Công Việc Dự Án" options={optionProjectDetail} component={RenderSelect}></Field>
                                            <Field name="name" label="Tên Hóa Đơn" component={RenderInputWithDiv}></Field>
                                            <Field name="invoiceVatCode" label="Mã Hóa Đơn" component={RenderInputWithDiv}></Field>
                                            <Field name="supplierName" label="Tên Khách Hàng" component={RenderInputWithDiv}></Field>
                                            <Field name="totalMoneyNoVat" label="Tổng Tiền" thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                            <Field name="totalMoneyVat" label="Tổng Tiền VAT" thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                            <Field name="paymentDate" dateFormat="DD/MM/YYYY" label="Ngày Thanh Toán" component={RenderDatePicker}></Field>
                                            <Field name="invoiceOutputDate" dateFormat="DD/MM/YYYY" label="Ngày Xuất Hóa Đơn" component={RenderDatePicker}></Field>
                                            <Field name="note" label="Ghi Chú" placeholder="Nhập ghi chú..." rows={3} component={RenderTextArea}></Field>
                                            <Field name="responsibleUserId" label="Kế Toán" options={optionUser} component={RenderSelect}></Field>
                                            <Field name="files" label="File Hoá Đơn ĐV" component={ListFile} modalUrl="/uploadInvoiceVATOutputFile"></Field>
                                            <div className="text-right">
                                                <button type="button" className="btn btn-link" onClick={this.handleHideAndClear} >Hủy</button>
                                                <button type="submit" className="btn bg-orange" disabled={submitting || invalid}>Lưu</button>
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
            form: 'ModalEditInvoiceVATOutput',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalEditInvoiceVATOutput)));
