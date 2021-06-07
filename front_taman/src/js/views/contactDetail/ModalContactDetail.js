import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker, RenderCheckbox, RenderSelect, RenderNumberInput } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import isEmail from 'sane-email-validation';
import { StringUtils } from '../../utils/javascriptUtils';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_CONTACT_DETAIL } from './action-types';
import { FIRE_REDIRECT } from '../../constants/action-types';
import ListFile from '../../components/ListFile';
import { isNull } from 'util';
import moment from 'moment';

const validate = values => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Vui lòng nhập họ tên';
    }
    if (!values.phone) {
        errors.phone = 'Vui lòng nhập số điện thoại liên hệ'
    }
    return errors;
}

const mapStateToProps = (state, props) => {
    var updateValue = {
        ...state.contactDetailReducer.updatingContactDetail,
        gender: state.contactDetailReducer.updatingContactDetail && state.contactDetailReducer.updatingContactDetail.gender ? state.contactDetailReducer.updatingContactDetail.gender : "OTHER",
        contact: { id: props.contactDto.id }
    };
    return {
        initialValues: updateValue
    };
};

const mapDispatchToProps = dispatch => ({
    loadContactDetail: (payload) =>
        dispatch({ type: LOAD_UPDATING_CONTACT_DETAIL, payload: payload })
});

class ModalContactDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
    };

    componentWillMount() {
        const { loadContactDetail } = this.props;
        var id = this.props.idContactDetail;
        const dataPromise = agent.ContactDetailApi.getContactDetail(id);
        loadContactDetail(Promise.resolve(dataPromise));
    };

    handleAdd(values) {
        var onHide = this.props.onHide;
        var id = this.props.idContactDetail;
        var url = '/contactDetail/add';
        var bodyObject = {
            contactId: values.contact.id,
            name: values.name,
            phone: values.phone,
            email: values.email,
            position: values.position,
            gender: values.gender,
            note: values.note,
        };
        if (id) {
            url = '/contactDetail/update';
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
        // const { objectContactDetail, listfile, title, onHide } = this.props;
        const { onHide, handleSubmit, submitting, title, invalid, contactDto } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show, onHide: this.props.onHide, submitting: this.props.submitting };
        var optionGenders = [
            { label: "Nam", value: "MALE" },
            { label: "Nữ", value: "FEMALE" },
            { label: "Khác", value: "OTHER" }
        ];
        var optionContact = [{ label: contactDto.name, value: contactDto.id }]
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
                                <Field disabled={true} label="Công Ty / Tập Đoàn" name="contact.id" options={optionContact} component={RenderSelect}></Field>
                                <Field name="name" label="Tên" placeholder="Họ tên" component={RenderInputWithDiv}></Field>
                                <Field name="phone" label="Số Điện Thoại" placeholder="Nhập số điện thoại..." component={RenderNumberInput}></Field>
                                <Field name="email" label="Email" placeholder="Nhập Email..." component={RenderInputWithDiv}></Field>
                                <Field name="position" label="Vị Trí" placeholder="Nhập vị trí (chức vụ)" component={RenderInputWithDiv}></Field>
                                <Field name="gender" label="Giới tính" placeholder="Chọn giới tính.." options={optionGenders} component={RenderSelect}></Field>
                                <Field name="note" label="Ghi Chú" placeholder="Nhập ghi chú..." component={RenderTextArea}></Field>
                                {/* <Field name="company" label="Công Ty" checkLabel="Đang Hoạt Động" component={RenderCheckbox}></Field> */}
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
            form: 'ModalContactDetail',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalContactDetail)));
