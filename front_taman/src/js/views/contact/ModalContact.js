import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker, RenderCheckbox, RenderSelect } from '../../components/formInputs';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import isEmail from 'sane-email-validation';
import { StringUtils } from '../../utils/javascriptUtils';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_CONTACT } from './action-types';
import { FIRE_REDIRECT } from '../../constants/action-types';
import ListFile from '../../components/ListFile';
import { isNull } from 'util';
import moment from 'moment';

const validate = values => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Vui lòng nhập họ tên';
    }
    return errors;
}

const mapStateToProps = state => {
    var updateValue = {
        ...state.contactReducer.updatingContact,
        contactStatus: state.contactReducer.updatingContact && state.contactReducer.updatingContact.contactStatus ? state.contactReducer.updatingContact.contactStatus : "KH_LE",

    };
    return {
        initialValues: updateValue,
        contactStatus: selector(state, "contactStatus"),

    };
};
const selector = formValueSelector('ModalContact');
const mapDispatchToProps = dispatch => ({
    loadContact: (payload) =>
        dispatch({ type: LOAD_UPDATING_CONTACT, payload: payload })
});

class ModalContact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);

        this.handleChangeContactStatus = (contactStatus) => {
            const { updateField } = this.props;
            if (contactStatus == "KH_LE" || contactStatus == "NULL") {
                updateField("discountPercent", 0);
            }
            
        }
        
    };

    componentWillMount() {
        const { loadContact } = this.props;
        var id = this.props.idContact;
        const dataPromise = agent.ContactApi.getContact(id);
        loadContact(Promise.resolve(dataPromise));
    };

    handleAdd(values) {
        var onHide = this.props.onHide;
        var id = this.props.idContact;
        var url = '/contact/add';
        var bodyObject = {
            name: values.name,
            taxNumber: values.taxNumber,
            address: values.address,
            note: values.note,
            contactStatus: values.contactStatus,
            discountPercent: (values.contactStatus == 'KH_LE' || values.contactStatus == 'NULL') ? 0 :values.discountPercent,
        };
        if (id) {
            url = '/contact/update';
            bodyObject.id = id;
        }

        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                onHide();
                toast.info("Lưu Thành Công.", { autoClose: 8000 });
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    };

    ///Hide and Clean Value
    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        // event.preventDefault();
        onHide();
        destroy();
    };

    render() {
        // const { objectContact, listfile, title, onHide } = this.props;
        const { onHide, handleSubmit, submitting, title, invalid, contactStatus } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show, onHide: this.props.onHide, submitting: this.props.submitting };

        var optionContactStatus = [
            { label: "Khách Hàng Lẻ", value: "KH_LE" },
            { label: "Đại Lý", value: "DAI_LY" },
            { label: "Không Chọn", value: "NULL" },
        ]
        var newModal = null;
        newModal =
            <div style={{ width: '30%' }}>
                <Modal
                    {...modalConfig}
                    aria-labelledby="contained-modal-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-sm"><center>Thông Tin {title}</center></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {submitting ? <LoadingScreen /> :
                            <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.handleAdd)}>
                                <Field name="name" label="Tên" placeholder="Họ tên" component={RenderInputWithDiv}></Field>
                                <Field name="taxNumber" label="Mã Số Thuế" placeholder="Nhập Mã Số Thuế" component={RenderInputWithDiv}></Field>
                                <Field name="address" label="Địa Chỉ" placeholder="Nhập Địa Chỉ..." rows={3} component={RenderTextArea}></Field>
                                <Field name="contactStatus" label="Loại Khách Hàng" options={optionContactStatus} component={RenderSelect}></Field>
                                {contactStatus == "DAI_LY" ? <Field name="discountPercent" label="Nhập Phần Trăm Chiết Khấu" component={RenderInputWithDiv} onChangeAction={() => this.handle}></Field> : null}
                                {/* <Field name="company" label="Công Ty" checkLabel="Đang Hoạt Động" component={RenderCheckbox}></Field> */}
                                <Field name="note" label="Ghi Chú" placeholder="Nhập ghi chú..." component={RenderTextArea}></Field>
                                {/* <Field disabled={true}  name="trustLevel" label="Mức Độ Tin Tưởng" placeholder="Chọn Chọn Mức Độ Tin Tưởng..." options={optionTrustLevel} component={RenderSelect}></Field> */}
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
            form: 'ModalContact',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalContact)));
