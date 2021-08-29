import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker, RenderCheckbox, RenderSelect, RenderNumberInput } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_JOB } from './action-types';


const validate = values => {
    const errors = {};
    if (!values.title) {
        errors.title = 'Vui lòng nhập tên nghề nghiệp';
    }
    return errors;
};

const mapStateToProps = state => {
    var updateValue = {
        ...state.jobReducer.updatingJob
          };
    return {
        initialValues: updateValue
    };
};

const mapDispatchToProps = dispatch => ({
    loadJob: (payload) =>
        dispatch({ type: LOAD_UPDATING_JOB, payload: payload })
});

class ModalJob extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            objJob: null
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
    };

    componentWillMount() {
        const { loadJob } = this.props;
        var id = this.props.idJob;
        const dataPromise = agent.JobApi.getJob(id);
        loadJob(Promise.resolve(dataPromise));
    };

    handleAdd(values) {
        var onHide = this.props.onHide;
        var id = this.props.idJob;
        var url = '/job/add';
        var bodyObject = {
            title: values.title,
            description: values.description
        };
        if (id) {
            url = '/job/update';
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
        const { onHide, handleSubmit, submitting, title, invalid } = this.props;
        const modalConfig = {backdrop:'static', show: this.props.show, onHide: this.props.onHide, submitting: this.props.submitting };
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
                                    <Field name="title" label="Tên Nghề Nghiệp" placeholder="Nhập Tên Nghề Nghiệp" component={RenderInputWithDiv}></Field>
                                    <Field name="description" label="Mô Tả Nghề Nghiệp" placeholder="Nhập Mô Tả" rows={3} component={RenderTextArea}></Field>
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
            form: 'ModalJob',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalJob)));
