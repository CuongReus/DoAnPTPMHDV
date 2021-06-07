import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker,RenderCheckbox, RenderSelect, RenderNumberInput, RenderMoneyFormat } from '../../components/formInputs';
import { Field, reduxForm,formValueSelector } from 'redux-form';
import isEmail from 'sane-email-validation';
import { StringUtils } from '../../utils/javascriptUtils';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import {LOAD_UPDATING_PROJECT_YEAR, LOAD_COMPANY_DTO} from './action-types';
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
    var companyDto = state.projectYearReducer.companyDto;
    var updateValue = {
        ...state.projectYearReducer.updatingProjectYear, 
        companyId: companyDto? companyDto.id: null
    };
    return {
        initialValues: updateValue
    };
};

const mapDispatchToProps = dispatch => ({
        loadProjectYear: (payload) => 
        dispatch({ type: LOAD_UPDATING_PROJECT_YEAR, payload: payload }),
        loadCompanyDto: (companyDto) =>
        dispatch({ type: LOAD_COMPANY_DTO, companyDto: companyDto }),
        updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalProjectYear", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});


class ModalProjectYear extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllCompanys:[],
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
    }
    
  componentWillMount() {
        const { loadProjectYear,companyDto,loadCompanyDto } = this.props;
        var id = this.props.idProjectYear;
            const dataPromise = agent.ProjectYearApi.getProjectYear(id);
            loadProjectYear(Promise.resolve(dataPromise)); 
            if(companyDto){
                loadCompanyDto(companyDto);
            }
            return(
                this.getListCompany()
            )
        
    }

  getListCompany(){
    let setStateInRequest = (list) => { this.setState({ listAllCompanys: list }) }
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
        var id = this.props.idProjectYear;
        var url = '/projectYear/add';
        var bodyObject = {
            companyId: values.companyId,
            year: values.year,
            note : values.note,
            totalRevenue: values.totalRevenue ? values.totalRevenue : 0,
            totalProfit: values.totalProfit ? values.totalProfit : 0
         
        };
        if (id) {
            url = '/projectYear/update';
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
        var dataCompany = this.state.listAllCompanys;
        var optionCompanys = []; 
        dataCompany.map(item=>{
            optionCompanys.push({label:item.name,value:item.id})
        })
        var id = this.props.idProjectYear;
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
                                    <Field disabled={true} name="companyId" label="Công Ty" placeholder="Chọn công ty..." options={optionCompanys} component={RenderSelect}></Field>
                                <Field name="year" label="Năm" placeholder="Nhập năm..." component={RenderNumberInput}></Field>
                                <Field name="note" label="Ghi Chú" placeholder="Nhập ghi chú..." rows={3} component={RenderTextArea}></Field>
                                {/* <Field disabled={true} name="totalRevenue"  label="Tổng Doanh Thu" placeholder="Nhập tổng doanh thu..." thousandSeparator={true} component={RenderMoneyFormat}></Field> */}
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
            form: 'ModalProjectYear',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalProjectYear)));
