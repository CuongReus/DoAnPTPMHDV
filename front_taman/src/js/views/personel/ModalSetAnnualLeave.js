import React from 'react';
import { Modal } from 'react-bootstrap';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Field, reduxForm } from 'redux-form';
import { LoadingScreen } from '../../components/commonWidgets';
import { RenderNumberInput, RenderSelect } from '../../components/formInputs';
import agent from '../../services/agent';
const validate = values => {
    const errors = {};
    if (!values.annualLeaveYear) {
        errors.annualLeaveYear = 'Vui lòng nhập số ngày phép năm.';
    } 
    if(values.userId){
        errors.userId = ""
    }
    return errors;
}

const mapStateToProps = (state,props) => {
    var updateValue = {
        ...state.companyReducer.updatingCompany, 
        userId: props.userDto ? props.userDto.id : null 
     
    };
    return {
        initialValues: updateValue
    };
};

const mapDispatchToProps = dispatch => ({
      
});


class ModalSetAnnualLeave extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // listAllCompanys:[],
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
    }
    

    handleAdd(values) {
        var onHide = this.props.onHide;
        var url = '/user/setAllUserAnnualLeave';
        var bodyObject = {
            annualLeaveYear: values.annualLeaveYear? values.annualLeaveYear: 0 ,
            year:values.year
        };
        if(values.userId){
         var url = '/user/setUserAnnualLeaveByUserId';
            bodyObject.userId = values.userId
        }
        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result == "ANNUAL_SETUP_SUCCESS") {
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
       const {handleSubmit,submitting, title,invalid,userDto } = this.props;
        const modalConfig = { backdrop: 'static',show: this.props.show,bsSize:"sm",  onHide:this.props.onHide,submitting: this.props.submitting};
        var id = this.props.idCompany;
        var newModal = null;
       var optionsUser = [];
       const year = (new Date()).getFullYear();
        const years = Array.from(new Array(20),( val, index) =>  year - index);
        var optionYears = [];
        years.map(item=>{
            optionYears.push({label:item,value:item});
        })
       if(userDto){
        optionsUser.push({label:userDto.fullName,value:userDto.id})
       }
            
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
                                    
                                    {userDto ?<Field disabled={true} name="userId" label="Tên Nhân Viên" placeholder="" options={optionsUser}component={RenderSelect}></Field> : null}
                                    <Field name="year" label="Năm" placeholder="Chọn năm..." options={optionYears} component={RenderSelect}></Field>
                                    <Field name="annualLeaveYear" label="Số Ngày Phép Năm" placeholder="Nhập số ngày phép năm..."component={RenderNumberInput}></Field>
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
            form: 'ModalSetAnnualLeave',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalSetAnnualLeave)));


                 