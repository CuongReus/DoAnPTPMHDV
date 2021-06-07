import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker, RenderCheckbox, RenderSelect, RenderNumberInput, RenderMoneyFormat } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import isEmail from 'sane-email-validation';
import { StringUtils } from '../../utils/javascriptUtils';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_SUPPLIER } from './action-types';
import { FIRE_REDIRECT } from '../../constants/action-types';
import ListFile from '../../components/ListFile';
import { isNull } from 'util';
import moment from 'moment';
const validate = values => {
    const errors = {};
    if(!values.name){
        errors.name = "Vui lòng nhập tên nhà cung cấp hoặc thương hiệu!"
    }
    if(!values.productProvideName){
        errors.productProvideName = "Vui lòng nhập sản phẩm cung cấp hoặc loại sản phẩm cung cấp!"
    }
    if(!values.type){
        errors.type = "Vui lòng chọn loại!"
    }
    return errors;
}

const mapStateToProps = state => {
    var updateValue = {
        ...state.supplierReducer.updatingSupplier,

    };
    return {
        initialValues: updateValue
    };
};

const mapDispatchToProps = dispatch => ({
    loadSupplier: (payload) =>
        dispatch({ type: LOAD_UPDATING_SUPPLIER, payload: payload })
});


class ModalSupplier extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
    }

    componentWillMount() {
        const { loadSupplier } = this.props;
        var id = this.props.idSupplier;
        const dataPromise = agent.SupplierApi.getSupplier(id);
        loadSupplier(Promise.resolve(dataPromise))

    }


    handleAdd(values) {
        var onHide = this.props.onHide;
        var id = this.props.idSupplier;
        var url = '/supplier/add';
        var bodyObject = {
            productProvideName: values.productProvideName,
            name: values.name,
            address: values.address,
            email: values.email,
            phoneNumber: values.phoneNumber,
            bankAccountNumber: values.bankAccountNumber,
            note: values.note,
            type:values.type

        };
        if (id) {
            url = '/supplier/update';
            bodyObject.id = id;
        }

        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                onHide();
                toast.info("Lưu Thành Công.", {autoClose: 8000});
            } else {

                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });

    }

    ///Hide and Clean Value
    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        // event.preventDefault();
        onHide();
        destroy();
    }
    render() {
        // const { objectSupplier, listfile, title, onHide } = this.props;

        const { handleSubmit, submitting, title, invalid } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"sm",  onHide: this.props.onHide, submitting: this.props.submitting };
        var id = this.props.idSupplier;
        var newModal = null;
        var optionsType= [{label:"Nhà Cung Cấp" ,value:"NHA_CUNG_CAP"},{label:"Thương Hiệu" ,value:"THUONG_HIEU"}]

        newModal =
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
                            <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.handleAdd)}>
                                <Field name="name" label="Tên (*)" placeholder="Nhập tên nhà cung cấp hoặc thương hiệu..." component={RenderInputWithDiv}></Field>
                                <Field name="productProvideName" label="Cung Cấp (*)" placeholder="Nhập tên sản phẩm & loại sản phẩm cung cấp..." component={RenderInputWithDiv}></Field>
                                <Field name="type"  label="Loại" placeholder="Chọn loại..." options={optionsType} component={RenderSelect}></Field>
                                
                                <Field name="address" label="Địa Chỉ" placeholder="Nhập địa chỉ..." rows={3} component={RenderTextArea}></Field>
                                <Field name="email" label="Email" placeholder="Nhập email..." component={RenderInputWithDiv}></Field>
                                <Field name="phoneNumber" label="Số Điện Thoại" placeholder="Nhập số điện thoại.." component={RenderInputWithDiv}></Field>
                                <Field name="bankAccountNumber" label="Số Tài Khoản" placeholder="Nhập số tài khoản..." component={RenderInputWithDiv}></Field>
                                <Field name="note" label="Ghi Chú" placeholder="Nhập Ghi Chú..." rows={3} component={RenderTextArea}></Field>
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
            form: 'ModalSupplier',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalSupplier)));
