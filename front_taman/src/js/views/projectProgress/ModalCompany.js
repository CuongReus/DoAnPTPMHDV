import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker,RenderCheckbox, RenderSelect, RenderNumberInput, RenderMoneyFormat } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import isEmail from 'sane-email-validation';
import { StringUtils } from '../../utils/javascriptUtils';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import {LOAD_UPDATING_COMPANY} from './action-types';
import {FIRE_REDIRECT } from '../../constants/action-types';
import ListFile from '../../components/ListFile';
import { isNull } from 'util';
import moment from 'moment';
const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Vui lòng nhập email.';
    } 
    return errors;
}

const mapStateToProps = state => {
    var updateValue = {
        ...state.companyReducer.updatingCompany, 
     
    };
    return {
        initialValues: updateValue
    };
};

const mapDispatchToProps = dispatch => ({
        loadCompany: (payload) => 
        dispatch({ type: LOAD_UPDATING_COMPANY, payload: payload })
});


class ModalCompany extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // listAllCompanys:[],
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
    }
    
  componentWillMount() {
        const { loadCompany } = this.props;
        var id = this.props.idCompany;
            const dataPromise = agent.CompanyApi.getCompany(id);
            loadCompany(Promise.resolve(dataPromise)); 
        
    }



    handleAdd(values) {
        var onHide = this.props.onHide;
        var id = this.props.idCompany;
        var url = '/company/add';
        var bodyObject = {
            name: values.name,
            description : values.description,
            code: values.code
         
        };
        if (id) {
            url = '/company/update';
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
    handleHideAndClear(){
       const{destroy,onHide} = this.props;
        // event.preventDefault();
        onHide();
        destroy();
    }
    render() {
       // const { objectCompany, listfile, title, onHide } = this.props;
        
       const {handleSubmit,submitting, title,invalid } = this.props;
        const modalConfig = { backdrop: 'static',show: this.props.show,bsSize:"sm",  onHide:this.props.onHide,submitting: this.props.submitting};
        var id = this.props.idCompany;
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
                                    <Field name="name" label="Tên Công Ty" placeholder="Nhập tên công ty..."component={RenderInputWithDiv}></Field>
                                    <Field name="code" label="Mã Công Ty" placeholder="Nhập mã công ty..." component={RenderInputWithDiv}></Field>
                                <Field name="description" label="Mô Tả" placeholder="Nhập mô tả..." rows={3} component={RenderTextArea}></Field>
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
            form: 'ModalCompany',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalCompany)));
