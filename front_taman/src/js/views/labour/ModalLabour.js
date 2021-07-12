import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker,RenderCheckbox, RenderSelect, RenderNumberInput, RenderMoneyFormat, RenderMultiSelect } from '../../components/formInputs';
import { Field, reduxForm,formValueSelector } from 'redux-form';
import isEmail from 'sane-email-validation';
import { StringUtils } from '../../utils/javascriptUtils';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import {LOAD_UPDATING_LABOUR} from './action-types';
import {FIRE_REDIRECT } from '../../constants/action-types';
import ListFile from '../../components/ListFile';
import { isNull } from 'util';
import moment from 'moment';
const validate = values => {
    const errors = {};
    if (!values.fullName) {
        errors.fullName = 'Vui lòng nhập họ tên.';
    }
    // if (!values.company ||!values.company.id ){
    //     errors.company= {id:"Vui lòng chọn công ty làm việc."}
    // }
    return errors;
}

var today = moment(new Date,"DD/MM/YYYY");
const selector = formValueSelector('ModalLabour');

const mapStateToProps = state => {
    var updateValue = {
        ...state.labourReducer.updatingLabour, 
        birthday: state.labourReducer.updatingLabour && state.labourReducer.updatingLabour.birthday ? moment(state.labourReducer.updatingLabour.birthday) : null,
        startWorkDate: state.labourReducer.updatingLabour && state.labourReducer.updatingLabour.startWorkDate ? moment(state.labourReducer.updatingLabour.startWorkDate) : null,
        contractSignDate: state.labourReducer.updatingLabour && state.labourReducer.updatingLabour.contractSignDate ? moment(state.labourReducer.updatingLabour.contractSignDate) : null,
        contractEndDate: state.labourReducer.updatingLabour && state.labourReducer.updatingLabour.contractEndDate ?moment(state.labourReducer.updatingLabour.contractEndDate) : null,
        createdDate:state.labourReducer.updatingLabour && state.labourReducer.updatingLabour.createdDate ? moment(state.labourReducer.updatingLabour.createdDate) : today,
        lastedUpdateDate:state.labourReducer.updatingLabour && state.labourReducer.updatingLabour.lastedUpdateDate ? moment(state.labourReducer.updatingLabour.lastedUpdateDate) : null,
        createdUserId:state.labourReducer.updatingLabour && state.labourReducer.updatingLabour.createdUserId ?  state.labourReducer.updatingLabour.createdUserId: state.common.currentUser.id ,
        companies: state.labourReducer.updatingLabour && state.labourReducer.updatingLabour.companies ? state.labourReducer.updatingLabour.companies.map(company => {return {label: company.name, value: company.id}}) : null,
    };
    return {
        initialValues: updateValue,
        currentUser: state.common.currentUser,
        lastedUpdateUserId: selector(state,"lastedUpdateUserId"),
        createdUserId: selector(state, "createdUserId"),
    };
};

const mapDispatchToProps = dispatch => ({
        loadLabour: (payload) => 
        dispatch({ type: LOAD_UPDATING_LABOUR, payload: payload })
});


class ModalLabour extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllCompanys:[],
            listAllUsers:[],
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
    }
    getListUser() {
        let setStateInRequest = (list) => { this.setState({ listAllUsers: list }) }
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
  componentWillMount() {
        const { loadLabour } = this.props;
        var id = this.props.idLabour;
      
            const dataPromise = agent.LabourApi.getLabour(id);
            loadLabour(Promise.resolve(dataPromise)); 
            return(
                this.getListCompany(),
                this.getListUser()
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
        const {currentUser} = this.props;
        var onHide = this.props.onHide;
        var id = this.props.idLabour;
        var url = '/labour/add';
        var bodyObject = {
            fullName: values.fullName,
            title: values.title,
            salaryMidnight: values.salaryMidnight ? values.salaryMidnight : 0,
            salaryPerDay: values.salaryPerDay ? values.salaryPerDay : 0,
            additionSalary: values.additionSalary ? values.additionSalary: 0 ,
            companies:values.companies.map(item => {return {id: item.value};}),
            birthday: values.birthday,
            startWorkDate: values.startWorkDate,
            phone: values.phone,
            contractNumber: values.contractNumber,
            contractSignDate: values.contractSignDate,
            contractEndDate: values.contractEndDate,
            enoughLabourContract: values.enoughLabourContract,
            note: values.note,
            labourContractFile: values.labourContractFile,
            identityCardNumber: values.identityCardNumber,
            createdUserId:values.createdUserId,
            lastedUpdateUserId: id ?  currentUser.id : null,
            createdDate:id? values.createdDate: today,
            lastedUpdateDate: id ? moment(today) : null
         
        };
        if (id) {
            url = '/labour/update';
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
       // const { objectLabour, listfile, title, onHide } = this.props;
        
       const {handleSubmit,submitting, title,invalid, initialValues,currentUser,createdUserId,
        lastedUpdateUserId } = this.props;
        const modalConfig = { backdrop: 'static',show: this.props.show,bsSize:"sm",  onHide:this.props.onHide,submitting: this.props.submitting};
        var dataCompany = this.state.listAllCompanys;
        var id = this.props.idLabour;
        var optionCompanies = []; 
        dataCompany.map(item=>{
            optionCompanies.push({label:item.code +  "-" + item.name,value:item.id})
        })
        var optionLabourContractStatus = [{label: "Chưa Có HĐLĐ", value:"CHUA_CO"},
        {label: "Chưa Đủ", value:"CHUA_DU"},
        {label: "Đủ",value: "DU"}];

        var dataUser =this.state.listAllUsers;
        var showCreatedUser = [];
        var showLastedUpdateUser = [];
        if (dataUser) {
            dataUser.map(item => {
                // StartMap
                // Push created user
                // alert(createdUserId);
                if (createdUserId && createdUserId == item.id) {
                    showCreatedUser =[{
                        label: item.fullName + " || " + item.email, value: item.id
                    }];
                } else if (!createdUserId) {
                    showCreatedUser =[{
                        label: currentUser.fullName + " || " + currentUser.email, value: currentUser.id
                    }];
                }
                // Push Updated User
                if (id && lastedUpdateUserId && lastedUpdateUserId == item.id) {
                    showLastedUpdateUser=[{
                        label: item.fullName + " || " + item.email,
                        value: item.id
                    }];
                } else if (id && !lastedUpdateUserId) {
                    showLastedUpdateUser=[{
                        label: currentUser.fullName + " || " + currentUser.email,
                        value: currentUser.id
                    }];
                }
                // EndMap
            });

        }
        
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
                                    <Field name="fullName" label="Họ Tên(*)" placeholder="Nhập Họ Tên Nhân Công..." component={RenderInputWithDiv}></Field>
                                    <Field name="companies"label="Thuộc công ty(*)" placeholder="Chọn công ty..." options={optionCompanies} component={RenderMultiSelect}></Field>
                                    <Field name="title" label="Công Việc" placeholder="Công Việc..." component={RenderInputWithDiv}></Field>
                                    <Field name="phone" label="Số Điện Thoại" placeholder="Nhập số điện thoại..." component={RenderNumberInput}></Field>
                                    {/* <Field name="identityCardNumber" label="Số Chứng Minh Nhân Dân" placeholder="Nhập số CMND..." component={RenderNumberInput}></Field> */}
                                    <Field name="birthday"  dateFormat="DD/MM/YYYY" label="Ngày Sinh" component={RenderDatePicker}></Field>
                                    {/* <Field name="startWorkDate"  dateFormat="DD/MM/YYYY" label="Ngày Bắt Đầu Làm Việc" component={RenderDatePicker}></Field>
                                    <Field name="contractNumber" label="Số Hợp Đồng Lao Động" placeholder="Nhập Số HĐLĐ..." component={RenderInputWithDiv}></Field>                                  
                                    <Field name="contractSignDate" dateFormat="DD/MM/YYYY" label="Ngày Ký HĐLĐ" component={RenderDatePicker}></Field>
                                    <Field name="contractEndDate" label="Ngày Kết Thúc HĐLĐ"  component={RenderDatePicker}></Field>
                                    <Field name="salaryMidnight" label="Lương Tăng Ca KHUYA" placeholder="Nhập số tiền lương tăng ca KHUYA.." thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                    <Field name="salaryPerDay" label="Lương / Ngày" placeholder="Nhập số tiền lương trên ngày.." thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                    <Field name="additionSalary" label="Lượng Phụ Cấp" placeholder="Nhập lương phụ cấp..." thousandSeparator={true} component={RenderMoneyFormat}></Field> */}
                                    {/* TODO Split Screen two col */}
                                    {/* <Field name="enoughLabourContract" label="Trạng Thái HĐLĐ" options={optionLabourContractStatus} component={RenderSelect} ></Field>
                                    <Field name="labourContractFile" modalUrl="/uploadLabourContract"  component={ListFile}></Field> */}
                                    <Field name="note" label="Ghi Chú"  placeholder="Nhập ghi chú..."  rows={3} component={RenderTextArea}></Field>
                                    <Field disabled={true} name="createdUserId" label="Người Tạo Bảng"  options={showCreatedUser} component={RenderSelect}></Field>
                                    {id ?<Field disabled={true} name="createdDate" label="Ngày Tạo Bảng"  dateFormat="DD/MM/YYYY" component={RenderDatePicker}></Field> : null }
                                    <div style={initialValues.lastedUpdateUserId?{display:'block'}:{display:'none'}}>
                                    <Field disabled={true} name="lastedUpdateUserId" label="Người Chỉnh Sửa Gần Nhất" options={showLastedUpdateUser} component={RenderSelect}></Field>
                                    <Field disabled={true} name="lastedUpdateDate"  label="Ngày Chỉnh Sửa Gần Nhất " dateFormat="DD/MM/YYYY" component={RenderDatePicker}></Field> </div>
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
            form: 'ModalLabour',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalLabour)));
