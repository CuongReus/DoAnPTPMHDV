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
import { LOAD_UPDATING_STORAGE_LOCATION } from './action-types';
import { FIRE_REDIRECT } from '../../constants/action-types';
import ListFile from '../../components/ListFile';
import { isNull } from 'util';
import moment from 'moment';
const validate = values => {
    const errors = {};
    // if (!values.email) {
    //     errors.email = 'Vui lòng nhập email.';
    // } else if (!isEmail(values.email)) {
    //     errors.email = 'Email không hợp lệ.';
    // }
    // // if (!values.password) {
    // //     errors.password = 'Vui lòng nhập mật khẩu.';
    // // } else {
    // //     if (values.password.length < 6) {
    // //         errors.password = 'Để bảo mật, mật khẩu phải chứa 6 ký tự trở lên.';
    // //     }
    // // }
    // if (!values.fullName) {
    //     errors.fullName = 'Vui lòng nhập họ tên.';
    // }
    // if (!values.company || !values.company.id) {
    //     errors.company = { id: "Vui lòng chọn công ty làm việc." }
    // }
    return errors;
}

const mapStateToProps = state => {
    var updateValue = {
        ...state.storageLocationReducer.updatingStorageLocation


    };
    return {
        initialValues: updateValue
    };
};

const mapDispatchToProps = dispatch => ({
    loadStorageLocation: (payload) =>
        dispatch({ type: LOAD_UPDATING_STORAGE_LOCATION, payload: payload })
});


class ModalStorageLocation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
    }

    componentWillMount() {
        const { loadStorageLocation } = this.props;
        var id = this.props.idStorageLocation;
        const dataPromise = agent.StorageLocationApi.getStorageLocation(id);
        loadStorageLocation(Promise.resolve(dataPromise));

    }


    handleAdd(values) {
        var onHide = this.props.onHide;
        var id = this.props.idStorageLocation;
        var url = '/storageLocation/add';
        var bodyObject = {
            locationName: values.locationName,
            address: values.address,
            note: values.note


        };
        if (id) {
            url = '/storageLocation/update';
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
        // const { objectStorageLocation, listfile, title, onHide } = this.props;

        const { handleSubmit, submitting, title, invalid } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"sm",  onHide: this.props.onHide, submitting: this.props.submitting };
        var id = this.props.idStorageLocation;
        var newModal = null;
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
                                <Field name="locationName" label="Tên Kho" placeholder="Nhập tên kho..." component={RenderInputWithDiv}></Field>
                                <Field name="address" label="Địa Chỉ Nhà Kho" placeholder="Nhập địa chỉ nhà kho..." rows={3} component={RenderTextArea}></Field>
                                <Field name="note" label="Ghi Chú" placeholder="Nhập ghi chú..." rows={3} component={RenderTextArea}></Field>
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
            form: 'ModalStorageLocation',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalStorageLocation)));
