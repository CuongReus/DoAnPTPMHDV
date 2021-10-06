import moment from 'moment';
import React from 'react';
import { Modal } from 'react-bootstrap';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Field, reduxForm } from 'redux-form';
import { LoadingScreen } from '../../components/commonWidgets';
import { RenderDatePickerWithTime, RenderInputWithDiv, RenderSelect, RenderTextArea, RenderMultiSelect } from '../../components/formInputs';
import agent from '../../services/agent';
import { LOAD_UPDATING_CALENDER_BOOKING } from './action-types';


const validate = values => {
    const errors = {};
    if (!values.title) {
        errors.title = 'Vui lòng tiêu đề.';
    }
    if (!values.responsibleId) {
        errors.responsibleId = 'Vui lòng chọn người tổ chức.';
    }
    if (!values.calenderTypeId) {
        errors.calenderTypeId = 'Vui lòng chọn loại lịch.';
    }
    return errors;
}

const mapStateToProps = state => {

    var updateValue = {
        ...state.calendarReducer.updatingCalenderBooking,
        startDate: state.calendarReducer.updatingCalenderBooking && state.calendarReducer.updatingCalenderBooking.startDate ? moment(state.calendarReducer.updatingCalenderBooking.startDate) : null,
        endDate: state.calendarReducer.updatingCalenderBooking && state.calendarReducer.updatingCalenderBooking.endDate ? moment(state.calendarReducer.updatingCalenderBooking.endDate) : null,
        users: state.calendarReducer.updatingCalenderBooking && state.calendarReducer.updatingCalenderBooking.users.length > 0 ? state.calendarReducer.updatingCalenderBooking.users.map((item) => { return { label: item.fullName, value: item.id } }) : null,
        contacts: state.calendarReducer.updatingCalenderBooking && state.calendarReducer.updatingCalenderBooking.contacts.length > 0 ? state.calendarReducer.updatingCalenderBooking.contacts.map((item) => { return { label: item.name, value: item.id } }) : null,
    }
    return {
        initialValues: updateValue
    };
};

const mapDispatchToProps = dispatch => ({
    uploadCalendar: (payload) =>
        dispatch({ type: LOAD_UPDATING_CALENDER_BOOKING, payload: payload }),
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalCalendarBooking", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});
class ModalCalendarBooking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            colorString: null,
            listAllCalendarType: [],
            listAllUser: [],
            listAllContact: []
        }
        this.handleAdd = this.handleAdd.bind(this);
    }

    getAllCalendar() {
        let setStateInRequest = (list) => { this.setState({ listAllCalendarType: list }) }
        return agent.asyncRequests.get("/calendarType/listAll").then(function (res) {
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
    getAllUser() {
        let setStateInRequest = (list) => { this.setState({ listAllUser: list }) }
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
    getAllContact() {
        let setStateInRequest = (list) => { this.setState({ listAllContact: list }) }
        return agent.asyncRequests.get("/contact/listAll").then(function (res) {
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
        const { uploadCalendar, currentDateRow, updateField, destroy } = this.props;
        var id = this.props.idCalendarBooking;
        if (id) {
            const dataPromise = agent.CalendarBookingApi.getCalendarBooking(id)
            uploadCalendar(Promise.resolve(dataPromise));
        } else {
            destroy();

            updateField("startDate", currentDateRow)
        }
        this.getAllCalendar();
        this.getAllUser();
        this.getAllContact();
    }
    handleAdd(values) {
        const { initialValues, destroy } = this.props;
        console.error('values: ', values)
        var onHide = this.props.onHide;
        var id = this.props.idCalendarBooking;
        var url = '/calendarBooking/add';
        var bodyObject = null;
        if (id) {
            url = '/calendarBooking/update';
            bodyObject
            bodyObject = {
                ...initialValues,
                ...values,
                id: id,
                users: values.users && values.users.length > 0 ? values.users.map(item => { return { id: item.value }; }) : null,
                contacts: values.contacts && values.contacts.length > 0 ? values.contacts.map(item => { return { id: item.value }; }) : null,
            }
        } else {
            bodyObject = {
                ...values,
                users: values.users ? values.users.map(item => { return { id: item.value }; }) : null,
                contacts: values.contacts ? values.contacts.map(item => { return { id: item.value }; }) : null,
            }
        }
        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                toast.info("Lưu Thành Công!", { autoClose: 3000 });
                onHide();

            } else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: " + result.errorMessage, { autoClose: 15000 });
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
        
        let dataCalendarType = this.state.listAllCalendarType;
        let dataUser = this.state.listAllUser;
        let dataContact = this.state.listAllContact;
        var optionType = [];
        var optionUser = [];
        var optionContact = [];
        if (dataCalendarType.length > 0) {
            dataCalendarType.map(item => {
                optionType.push({ label: item.name, value: item.id })
            })
        }

        if (dataUser.length > 0) {
            dataUser.map(item => {
                optionUser.push({ label: item.fullName, value: item.id })
            })
        }
        if (dataContact.length > 0) {
            dataContact.map(item => {
                optionContact.push({ label: item.name, value: item.id })
            })
        }
        var optionBookingType = [
            { label: "Sự Kiện", value: "EVENT" },
            { label: "Công Việc", value: "TASK" },
        ]

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
                                <Field name="title" label="Tiêu Đề" placeholder="Nhập tên loại..." component={RenderInputWithDiv}></Field>
                                <Field name="responsibleId" label="Người Tổ Chức" options={optionUser} component={RenderSelect}></Field>
                                <Field name="calenderTypeId" label="Loại Lịch" options={optionType} component={RenderSelect}></Field>
                                <Field name="bookingType" label="Loại Nội Dung" options={optionBookingType} component={RenderSelect}></Field>
                                <Field name="startDate" label="Ngày Bắt Đầu" options={optionType} component={RenderDatePickerWithTime}></Field>
                                <Field name="endDate" label="Ngày Kết Thúc" options={optionType} component={RenderDatePickerWithTime}></Field>
                                <Field name="description" label="Mô Tả" rows={3} component={RenderTextArea}></Field>
                                <Field name="users" label="Chọn Lịch Đến Nhân Viên" placeholder="Chọn nhân viên..." options={optionUser} component={RenderMultiSelect}></Field>
                                <Field name="contacts" label="Chọn Lịch Đến Khách Hàng" placeholder="Chọn khách hàng.." options={optionContact} component={RenderMultiSelect}></Field>
                                <div className="text-right">
                                    <button type="button" className="btn btn-link" onClick={onHide} >Hủy</button>
                                    <button type="submit" className="btn bg-orange" disabled={submitting || invalid}>Lưu Lịch Hẹn</button>
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
            form: 'ModalCalendarBooking',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalCalendarBooking)));
