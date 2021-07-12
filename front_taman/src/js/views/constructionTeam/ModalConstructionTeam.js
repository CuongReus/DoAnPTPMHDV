import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderTextArea, RenderSelect } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import {LOAD_UPDATING_CONSTRUCTION_TEAM} from './action-types';

const validate = values => {
    const errors = {};
    if (!values.teamLeaderName) {
        errors.teamLeaderName = 'Vui lòng nhập tên đội trưởng !.';
    }
    return errors;
}

const mapStateToProps = state => {
    var updateValue = {
        ...state.constructionTeamReducer.updatingConstructionTeam, 
     
    };
    return {
        initialValues: updateValue
    };
};

const mapDispatchToProps = dispatch => ({
        loadConstructionTeam: (payload) => 
        dispatch({ type: LOAD_UPDATING_CONSTRUCTION_TEAM, payload: payload })
});


class ModalConstructionTeam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllCompanies:[],
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
    }
    
  componentWillMount() {
        const { loadConstructionTeam } = this.props;
        var id = this.props.idConstructionTeam;
      
            const dataPromise = agent.ConstructionTeamApi.getConstructionTeam(id);
            loadConstructionTeam(Promise.resolve(dataPromise)); 
            return(
                this.getListCompanies()
            )
        
    }

  getListCompanies(){
    let setStateInRequest = (list) => { this.setState({ listAllCompanies: list }) }
    return agent.asyncRequests.get("/company/listAll").then(function (res) {
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

    handleAdd(values) {
        var onHide = this.props.onHide;
        var id = this.props.idConstructionTeam;
        var url = '/constructionTeam/add';
        var bodyObject = {
            companyId: values.companyId,
            teamLeaderName: values.teamLeaderName,
            specialize : values.specialize,
            leaderPhoneNumber: values.leaderPhoneNumber,
            bankAccountNumber: values.bankAccountNumber,
            note: values.note
         
        };
        if (id) {
            url = '/constructionTeam/update';
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
       // const { objectConstructionTeam, listfile, title, onHide } = this.props;
        
       const {handleSubmit,submitting, title,invalid } = this.props;
        const modalConfig = { backdrop: 'static',show: this.props.show,bsSize:"sm",  onHide:this.props.onHide,submitting: this.props.submitting};
        var dataCompany = this.state.listAllCompanies;
        var optionCompanies = []; 
        dataCompany.map(item=>{
            optionCompanies.push({label:item.name,value:item.id})
        })
        var id = this.props.idConstructionTeam;
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
                                    <Field name="companyId" label="Công Ty" placeholder="Chọn tên công ty..."  options={optionCompanies} component={RenderSelect}></Field>
                                    <Field name="teamLeaderName" label="Tên Đội Trưởng" placeholder="Nhập tên đội trưởng..."  component={RenderInputWithDiv}></Field>
                                    <Field name="specialize"  label="Chuyên Môn" placeholder="Nhập chuyên môn cho đội..." component={RenderInputWithDiv}></Field>
                                    <Field name="leaderPhoneNumber" label="Số Điện Thoại" placeholder="Nhập số điện thoại đội trưởng..." component={RenderInputWithDiv}></Field>
                                    <Field name="bankAccountNumber" label="Số Tài Khoản" placeholder="Nhập số tài khoản ngân hàng.." component={RenderInputWithDiv}></Field>
                                    <Field name="note"  label="Ghi Chú" placeholder="Nhập Ghi Chú..." rows={3} component={RenderTextArea}></Field>
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
            form: 'ModalConstructionTeam',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalConstructionTeam)));
