import React from 'react';
import { Modal } from 'react-bootstrap';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Field, reduxForm } from 'redux-form';
import { LoadingScreen } from '../../components/commonWidgets';
import { RenderInputWithDiv, RenderSelect, RenderTextArea } from '../../components/formInputs';
import agent from '../../services/agent';
import { LOAD_UPDATING_CALENDER_TYPE } from './action-types';
const validate = values => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Vui lòng nhập tên loại.';
    }
    return errors;
}

const mapStateToProps = state => {
    var updateValue = {
        ...state.calendarReducer.updatingCalendarType
    }
    return {
        initialValues: updateValue
    };
};

const mapDispatchToProps = dispatch => ({
    uploadCalendar: (payload) =>
        dispatch({ type: LOAD_UPDATING_CALENDER_TYPE, payload: payload })
});
class ModalCalendarType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            objBuyOrder: null,
            listAllSuppliers: [],
            optionUser: [],
            colorString: null
        }
        this.handleAdd = this.handleAdd.bind(this);
    }

    componentWillMount() {
        const { uploadCalendar } = this.props;
        var id = this.props.idCalendarType;
        // if (id) {
        //     const dataPromise = agent.CalendarTypeApi.getCalendarType(id)
        //     uploadCalendar(Promise.resolve(dataPromise));
        // }
        const dataPromise = agent.CalendarTypeApi.getCalendarType(id)
        uploadCalendar(Promise.resolve(dataPromise));

    }
    handleAdd(values) {
        const { initialValues } = this.props;
        var onHide = this.props.onHide;
        var id = this.props.idCalendarType;
        var url = '/calendarType/add';
        var bodyObject = null;
        if (id) {
            url = '/calendarType/update';
            bodyObject = {
                ...initialValues,
                ...values,
                id: id
            }
        } else {
            bodyObject = {
                ...values,
            }
        }
        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                onHide();
                toast.info("Lưu Thành Công!", { autoClose: 3000 });
            } else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: " + result.errorMessage, { autoClose: 3000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }
    randomColor() {
        return Math.floor(Math.random() * 16777215).toString(16);
    }

    handleChangColor(value) {
        this.setState({
            colorString: value
        })
    }

    render() {

        const { onHide, handleSubmit, submitting, title, invalid } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show, onHide: this.props.onHide, submitting: this.props.submitting };
        var id = this.props.idBuyOrder;
        var colorString = this.state.colorString;
        var colorOptions = [
            { value: '#00B8D9', label: 'Ocean', color: '#00B8D9', isFixed: true },
            { value: '#0052CC', label: 'Blue', color: '#0052CC', isDisabled: true },
            { value: '#5243AA', label: 'Purple', color: '#5243AA' },
            { value: '#FF5630', label: 'Red', color: '#FF5630', isFixed: true },
            { value: '#FF8B00', label: 'Orange', color: '#FF8B00' },
            { value: '#FFC400', label: 'Yellow', color: '#FFC400' },
            { value: '#36B37E', label: 'Green', color: '#36B37E' },
            { value: '#00875A', label: 'Forest', color: '#00875A' },
            { value: '#253858', label: 'Slate', color: '#253858' },
            { value: '#666666', label: 'Silver', color: '#666666' },
        ];

        var newModal = null;
        newModal =
            <div style={{ width: '30%' }}>
                <Modal
                    {...modalConfig}
                    aria-labelledby="contained-modal-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-sm">Thông Tin {title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {submitting ? <LoadingScreen /> :
                            <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.handleAdd)}>
                                <Field name="name" label="Tên Loại" placeholder="Nhập tên loại..." component={RenderInputWithDiv}></Field>
                                {/* <Field name="color" label="Màu Nhận Biết" style={{backgroundColor : colorString}} placeholder="" options={colorOptions} onchangeAction={ (values)=> this.handleChangColor(values)} component={RenderSelectColor}></Field> */}
                                <Field name="color" label="Màu Nhận Biết" style={{ backgroundColor: colorString }} options={colorOptions} component={RenderSelect}></Field>
                                <Field name="description" label="Mô Tả" options={colorOptions} rows={3} component={RenderTextArea}></Field>

                                <div className="text-right">
                                    <button type="button" className="btn btn-link" onClick={onHide} >Hủy</button>
                                    <button type="submit" className="btn bg-orange" disabled={submitting || invalid}>Lưu Loại Lịch</button>
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
            form: 'ModalCalendarType',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalCalendarType)));
