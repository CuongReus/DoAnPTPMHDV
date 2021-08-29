import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker, RenderCheckbox, RenderSelect, RenderNumberInput } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_SWOT_USER } from './action-types';


const validate = values => {
    const errors = {};
    if (!values.title) {
        errors.title = 'Vui lòng nhập tiêu đề!';
    }
    return errors;
};

const mapStateToProps = state => {
    var updateValue = {
        ...state.swotUserReducer.updatingSwotUser
          };
    return {
        initialValues: updateValue
    };
};

const mapDispatchToProps = dispatch => ({
    loadSwotUser: (payload) =>
        dispatch({ type: LOAD_UPDATING_SWOT_USER, payload: payload })
});

class ModalSwotUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            objSwotUser: null,
            listAllSwotItem: [],
        }
        this.handleAddSwot = this.handleAddSwot.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
    };

    getListSwotItem() {
        let setStateInRequest = (list) => { this.setState({ listAllSwotItem: list }) }
        return agent.asyncRequests.get("/swotItem/listAll").then(function (res) {
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
        const { loadSwotUser } = this.props;
        var id = this.props.idSwotUser;
        const dataPromise = agent.SwotUserApi.getSwotUser(id);
        loadSwotUser(Promise.resolve(dataPromise));

        return (
            this.getListSwotItem()
        )
    };

    handleAddSwot(values) {
        var onHide = this.props.onHide;
        var id = this.props.idSwotUser;
        var idUser = this.props.idUser;
        var url = '/swotUser/add';
        var bodyObject = {
            swotItemId: values.swotItemId,
            userId: idUser,
            numberOfYears: values.numberOfYears,
            note: values.note
        };
        if (id) {
            url = '/swotUser/update';
            bodyObject.id = id;
        }

        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                onHide();
                toast.info("Lưu Thành Công.", {autoClose: 8000});
            } else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    };

    handleHideAndClear(){
        const{destroy,onHide} = this.props;
         // event.preventDefault();
         onHide();
         destroy();
     };

    render() {
        const { onHide, handleSubmit, submitting, title, invalid, idUser } = this.props;
        const modalConfig = {backdrop:'static', show: this.props.show, onHide: this.props.onHide, submitting: this.props.submitting };
        var optionSwotItem = [];
        this.state.listAllSwotItem.map(item => {
            optionSwotItem.push({ label: item.title + " - " + item.swotType, value: item.id })
        })
        
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
                            {/* {submitting ? <LoadingScreen /> :
                                <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.handleAddSwot)}>
                                    <Field name="swotItemId" label="Danh mục SWOT" placeholder="Chọn danh mục SWOT..." options={optionSwotItem} component={RenderSelect}></Field>
                                    <Field name="numberOfYears" label="Số năm kinh nghiệm" placeholder="Nhập số năm kinh nghiệm..." component={RenderNumberInput}></Field>
                                    <Field name="note" label="Ghi chú" placeholder="Nhập ghi chú" rows={3} component={RenderTextArea}></Field>
                                    <div className="text-right">
                                        <button type="button" className="btn btn-link" onClick={this.handleHideAndClear} >Hủy</button>
                                        <button type="submit" className="btn bg-orange" disabled={submitting || invalid}>Lưu</button>
                                    </div>
                                </form>
                            } */}
                            <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.handleAddSwot)}>
                                    <Field name="swotItemId" label="Danh mục SWOT" placeholder="Chọn danh mục SWOT..." options={optionSwotItem} component={RenderSelect}></Field>
                                    <Field name="numberOfYears" label="Số năm kinh nghiệm" placeholder="Nhập số năm kinh nghiệm..." component={RenderNumberInput}></Field>
                                    <Field name="note" label="Ghi chú" placeholder="Nhập ghi chú" rows={3} component={RenderTextArea}></Field>
                                    <div className="text-right">
                                        <button type="button" className="btn btn-link" onClick={this.handleHideAndClear} >Hủy</button>
                                        <button type="submit" className="btn bg-orange" disabled={submitting || invalid}>Lưu</button>
                                    </div>
                            </form>
                        </Modal.Body>
                    </Modal>
                </div>
        return newModal;
    }
};


export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'ModalSwotUser',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalSwotUser)));
