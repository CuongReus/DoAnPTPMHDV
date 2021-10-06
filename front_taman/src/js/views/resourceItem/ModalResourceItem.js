import React from 'react';
import { Modal } from 'react-bootstrap';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Field, reduxForm } from 'redux-form';
import { LoadingScreen } from '../../components/commonWidgets';
import { RenderInputWithDiv, RenderSelect, RenderTextArea } from '../../components/formInputs';
import agent from '../../services/agent';
import { LOAD_UPDATING_RESOURCE_ITEM } from './action-types';


const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Vui lòng nhập email.';
    } 
    return errors;
}

const mapStateToProps = state => {

    var updateValue = {
        ...state.resourceItemReducer.updatingResourceItem, 
       
    };
    return {
        initialValues: updateValue
    };
};

const mapDispatchToProps = dispatch => ({
        loadResourceItem: (payload) => 
        dispatch({ type: LOAD_UPDATING_RESOURCE_ITEM, payload: payload }),
        updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalResourceItem", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});


class ModalResourceItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllUser: null
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
    }
    
  componentWillMount() {
        const { loadResourceItem, destroy} = this.props;
        var id = this.props.idResourceItem;
        if(id){
            const dataPromise = agent.ResourceItemAPI.getResourceItem(id);
            loadResourceItem(Promise.resolve(dataPromise)); 
            
        }else{
            destroy();
        }

       this.getAllUser();
    }

    getAllUser() {

        let setStateInRequest = (list) => { this.setState({ listAllUser: list }) }
        return (agent.UserApi.listAllPersonel(
        ).then(function (res) {
            var result = res.resultData;
            if (result) {
                setStateInRequest(result);
            }
            else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        }))
    }

    handleAdd(values) {
        var onHide = this.props.onHide;
        var id = this.props.idResourceItem;
        var url = '/resourceItem/add';
        var bodyObject = {
            name: values.name,
            resourceType: values.resourceType,
            responsibleUserId: values.responsibleUserId,
            description: values.description,
        };
        if (id) {
            url = '/resourceItem/update';
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
       // const { objectProjectYearYear, listfile, title, onHide } = this.props;
        
       const {handleSubmit,submitting, title,invalid } = this.props;
        const modalConfig = { backdrop: 'static',show: this.props.show,bsSize:"sm",  onHide:this.props.onHide,submitting: this.props.submitting};
        
       
        var id = this.props.idResourceItem;
        var newModal = null;
        
        const dataUser = this.state.listAllUser;
        let optionUser = [{label : "Tất Cả" , value : "ALL"}];
        let optionType = [
            {label : "Tất Cả" , value : "ALL"},
            {label : "Trang Thiết Bị - Dụng Cụ " , value :"DEVICE"},
            {label : "Phòng" , value :"ROOM"},
            {label : "Đội Nhóm" , value :"TEAM"}
        ];
     
        if(dataUser){
            dataUser.map(item => {
                optionUser.push({label : item.fullName , value : item.id})
            })
        }
            
            newModal =
            <div style={{ width: '30%' }}>
                <Modal
                    {...modalConfig}
                    aria-labelledby="contained-modal-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-sm"><center>{ id ? " Chỉnh Sửa " : "Thêm Mới " +"Tài Nguyên"}</center> </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    {submitting ? <LoadingScreen /> :
                                <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.handleAdd)}>
                                <Field name="name" label="Định Danh Tài Nguyên" placeholder="Nhập định danh..." component={RenderInputWithDiv}></Field>
                                <Field label="Phân Loại" name="resourceType" options={optionType}  component={RenderSelect}></Field>
                                <Field label="Người Quản Lý" name="responsibleUserId"   options={optionUser} component={RenderSelect}></Field>
                                <Field name="description" label="Thông tin thêm" placeholder="Nhập ..." row={3} component={RenderTextArea}></Field>
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
            form: 'ModalResourceItem',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalResourceItem)));
