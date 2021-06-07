import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker, RenderCheckbox, RenderSelect, RenderNumberInput, RenderMoneyFormat, RenderMultiSelect, RenderDatePickerMinPrev } from '../../components/formInputs';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import isEmail from 'sane-email-validation';
import { StringUtils,FormatterUtils, SecurityUtils } from '../../utils/javascriptUtils';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_PAYMENT } from './action-types';
import { LOAD_PROJECT_COST_DTO } from '../projectCost/action-types';
import { FIRE_REDIRECT } from '../../constants/action-types';
import ListFile from '../../components/ListFile';
import { isNull } from 'util';
import moment from 'moment';
const validate = values => {
    const errors = {};
    if (!values.createdUserId) {
        errors.createdUserId = "";

    }
    if(!values.projectCostId){
        errors.projectCostId = '';
    }
    if (!values.lotNumber) {
        errors.lotNumber = '';
    } 
    if(!values.approvalById){
        errors.approvalById ="Vui lòng chọn người duyệt !";
    }
    if(values.status =="DA_DUYET_THANH_TOAN" && !values.paymentDate){
        errors.paymentDate = "Vui lòng chọn ngày thanh toán";
    }
    return errors;
}

const selector = formValueSelector('ModalProductPayment');

var today = moment(new Date,"DD/MM/YYYY");

const mapStateToProps = state => {
    var projectCostDto = state.projectCostReducer.projectCostDto;
    var updateValue = {
        ...state.paymentReducer.updatingPayment,
        projectCostId: projectCostDto? projectCostDto.id:null,
        approvalById: projectCostDto? projectCostDto.approvalBy.id:null,
        paymentDate: state.paymentReducer.updatingPayment && state.paymentReducer.updatingPayment.paymentDate ? moment(state.paymentReducer.updatingPayment.paymentDate) : null,
        notifyTo: null,
        notifyMessage: null,
        // startWorkDate:state.paymentReducer.updatingPayment && state.paymentReducer.updatingPayment.startWorkDate ? moment(state.paymentReducer.updatingPayment.startWorkDate) : null,
        // endWorkDate:state.paymentReducer.updatingPayment && state.paymentReducer.updatingPayment.endWorkDate ? moment(state.paymentReducer.updatingPayment.endWorkDate) : null,
        createdDate:state.paymentReducer.updatingPayment && state.paymentReducer.updatingPayment.createdDate ? moment(state.paymentReducer.updatingPayment.createdDate) : today,
        lastedUpdateDate:state.paymentReducer.updatingPayment && state.paymentReducer.updatingPayment.lastedUpdateDate ? moment(state.paymentReducer.updatingPayment.lastedUpdateDate) : null,
        createdUserId:state.paymentReducer.updatingPayment && state.paymentReducer.updatingPayment.createdUserId ?  state.paymentReducer.updatingPayment.createdUserId: state.common.currentUser.id ,
        status:state.paymentReducer.updatingPayment && state.paymentReducer.updatingPayment.status ?  state.paymentReducer.updatingPayment.status: "CHUA_DUYET_THANH_TOAN"

    };
    return {
        initialValues: updateValue,
        lastedUpdateUserId: selector(state,"lastedUpdateUserId"),
        createdUserId: selector(state, "createdUserId"),
        status: selector(state,"status"),
        currentUser: state.common.currentUser,
        lotNumber:selector(state,"lotNumber")
    };
};

const mapDispatchToProps = dispatch => ({
    loadPayment: (payload) =>
        dispatch({ type: LOAD_UPDATING_PAYMENT, payload: payload }),
    loadProjectCostDto: (projectCostDto) =>
        dispatch({ type: LOAD_PROJECT_COST_DTO, projectCostDto: projectCostDto }),
        updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalProductPayment", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});




class ModalProductPayment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllUsers:[],
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.handlePercentCalc= (percentPaid)=>{
            const {projectCostDto,updateField} = this.props;
            var percentPaid = percentPaid ?percentPaid : 0
            if(projectCostDto && percentPaid  && projectCostDto.totalMoney > 0){
                updateField("moneyPaid",parseFloat(projectCostDto.totalMoney * (percentPaid/100)));
            }else{
                updateField("moneyPaid",0);
            }
        }
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

        getLotNumber(){ // just use this method  when add new
            const {dataProjectCostPayment,projectCostDto,updateField,isApprovalScreen,listPaymentFromApprovalScreen} = this.props;
            var lotNumber = 0;
            if(dataProjectCostPayment){
                dataProjectCostPayment.map(item=>{
                    if(item.projectCostId == projectCostDto.id){
                        lotNumber = item.listPayments.length +1; 
                        setTimeout(() => {
                            updateField("lotNumber",lotNumber);
                            }, 100);

                    }
                })
            }else if(isApprovalScreen && listPaymentFromApprovalScreen){
                lotNumber = listPaymentFromApprovalScreen.length +1; 
                setTimeout(() => {
                    updateField("lotNumber",lotNumber);
                    }, 100);
            }
            
        }
    componentWillMount() {
        const { loadPayment,loadProjectCostDto,projectCostDto } = this.props;
        var id = this.props.idPayment;
        if(projectCostDto){
            loadProjectCostDto(projectCostDto);
        }
        if(!id){
            this.getLotNumber();
        }
        const dataPromise = agent.PaymentApi.getPayment(id);
        loadPayment(Promise.resolve(dataPromise));
        return(
            this.getListUser()
                    )
      

    }


    handleAdd(values) {
        var onHide = this.props.onHide;
        const {projectCostDto,currentUser} = this.props;
        var id = this.props.idPayment;
        var url = '/payment/add';
        var today = moment(new Date,"DD/MM/YYYY");
        var bodyObject = {
            projectCostId:projectCostDto.id,
            lotNumber:values.lotNumber,
            paymentDate:values.paymentDate,
            startWorkDate:values.startWorkDate,
            endWorkDate:values.endWorkDate,
            percentPaid:values.percentPaid?values.percentPaid: 0,
            moneyPaid:values.moneyPaid?values.moneyPaid: 0,
            approvalById:values.approvalById,
            status:values.status,
            lbNormalAttendance:values.lbNormalAttendance?values.lbNormalAttendance: 0,
            lbOvertimeAttendance:values.lbOvertimeAttendance?values.lbOvertimeAttendance: 0,
            lbMidnightAttendance:values.lbMidnightAttendance?values.lbMidnightAttendance: 0,
            notifyTo:values.notifyTo ? values.notifyTo.map(item =>{
                return item.value
            }).join(','): null,
            notifyMessage:values.notifyMessage,
            note:values.note,
            createdUserId:values.createdUserId,
            lastedUpdateUserId: id ?  currentUser.id : null,
            createdDate:id? values.createdDate: today,
            lastedUpdateDate: id ? moment(today) : null

        };
        if (id) {
            url = '/payment/update';
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
    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        // event.preventDefault();
        onHide();
        destroy();
    }
    render() {
        // const { objectProject, listfile, title, onHide } = this.props;

        const { handleSubmit, submitting,projectCostDto,dataProjectCostPayment,totalPercentPaidFromProps, title,projectDetailDto,status, invalid, createdUserId,currentUser,lastedUpdateUserId,initialValues,
            lastedLot,isApprovalScreen
        } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"sm",  onHide: this.props.onHide, submitting: this.props.submitting };
        // const dataProjectYear= this.state.listAllYears;
        var dataPersonels = this.state.listAllUsers;
        var id = this.props.idPayment;
        var optionProjectCost = [];
        if(!dataPersonels){
            return null;
        } 
        var optionNotifyTo = [];
        var optionsApprovalBy = [];
        dataPersonels.map(item => {
            if(SecurityUtils.hasPermission(item, "admin.projectPaymentApproval.productAllowApproval")){
                optionsApprovalBy.push({ label: "Tên: " + item.fullName + " || " + item.email, value: item.id })
            }
                optionNotifyTo.push({ label: "Tên: " + item.email, value: item.email })
            // }
        })
        var sumTotalPercentPaid = 0; //That total percent follow by projectCost Id
        // Start IF user's manipulate of ApprovalPayment from email not calculate bellow
        if(!isApprovalScreen){
        if(!id){
            if(dataProjectCostPayment !=0 &&projectCostDto){
                dataProjectCostPayment.map(item=>{
                    if(item.projectCostId==projectCostDto.id&&item.listPayments!=0){
                        item.listPayments.map(paymentCost=>{
                            sumTotalPercentPaid += paymentCost.percentPaid;
        
                        })
                    }
                })
             
            }
        }else{
            sumTotalPercentPaid = totalPercentPaidFromProps;
        }
    }
    //End  IF user's manipulate of ApprovalPayment from email not calculate
        
        var optionsStatus = [{label:"Chưa Duyệt Thanh Toán", value:"CHUA_DUYET_THANH_TOAN"},{label:"Đã Duyệt Thanh Toán" ,value: "DA_DUYET_THANH_TOAN"}];

      
        var startActualPrgressDate = null;
        var lastedLotDate = null;
        if(projectCostDto){
            optionProjectCost.push({label:projectCostDto.title,value: projectCostDto.id})
        }
        var showCreatedUser = [];
        var showLastedUpdateUser = [];
        if (dataPersonels) {
            dataPersonels.map(item => {
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
                        {!isApprovalScreen ?
                        <center>
                        <h5>Thanh Toán Cho: {projectCostDto.title} || {projectCostDto.lotNumber}</h5>
                        <h5>Tổng Tổng Tiền Mục: {FormatterUtils.formatCurrency(projectCostDto.totalMoney)}</h5>
                        <h5>Tổng % Đã Thanh Toán: {sumTotalPercentPaid} %</h5>
                        <h5>Tổng Tiền Đã Thanh Toán: {FormatterUtils.formatCurrency(projectCostDto.totalPaid)}</h5>
                        </center>: null}
                    </Modal.Header>
                    <Modal.Body>
                        {submitting ? <LoadingScreen /> :
                            <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.handleAdd)}>
                                <Field disabled={true} name="projectCostId" label="Thanh Toán Cho Mục" placeholder="" options={optionProjectCost}  component={RenderSelect}></Field>
                                <Field disabled={true}  name="lotNumber" label="Đợt Thanh Toán" placeholder=""  component={RenderNumberInput}></Field>
                                {/* <Field name="paymentDate" label="Ngày Thanh Toán" dateFormat="DD/MM/YYYY"  component={RenderDatePicker}></Field> */}
                                {/* <Field name="totalMoneyLink" label="Tổng Tiền Mục Lớn"        component={RenderNumberInput}></Field>
                                <Field name="totalPercentPaidLink" label="Phần Trăm Đã Trả Cho Mục Này"  component={RenderNumberInput}></Field> */}
                                <Field name="percentPaid" label="Phần Trăm Cần Thanh Toán" placeholder="Nhập phần trăm cần thanh toán..." onChangeAction= {(value)=>this.handlePercentCalc(value)}  component={RenderNumberInput}></Field>
                                <Field disabled={true} name="moneyPaid" label="Tổng Tiền Cần Thanh Toán" placeholder=""  thousandSeparator={true}  component={RenderMoneyFormat} ></Field>
                                <Field name="approvalById" label="Duyệt Bởi" placeholder="Chọn người duyệt..." options={optionsApprovalBy} component={RenderSelect}></Field>
                                <Field disabled={SecurityUtils.hasPermission(currentUser, "admin.projectPaymentApproval.productAllowApproval")? false : true} name="status" label="Trạng Thái Thanh Toán" placeholder="Chọn Trạng Thái Thanh Toán"  options={optionsStatus} component={RenderSelect}></Field>
                                
                                {status=="DA_DUYET_THANH_TOAN" ? <Field name="paymentDate" label="Ngày Thanh Toán" dateFormat="DD/MM/YYYY"  component={RenderDatePicker}></Field> : null}
                                
                                
                                
                                <Field name="note" label="Ghi Chú" placeholder="Nhập ghi chú..." rows={3} component={RenderTextArea}></Field>
                                <Field name="notifyTo" label="Thông Báo Đến" placeholder="Chọn người bạn muốn thông báo đến..."options={optionNotifyTo} component={RenderMultiSelect}></Field>
                                <Field name="notifyMessage" label="Nội Dung Thông Báo" placeholder="Nhập nội dung thông báo..." rows={3} component={RenderTextArea}></Field>
                                
                                {/* <Field disabled={true} name="totalRevenue"  label="Tổng Doanh Thu" placeholder="Nhập tổng doanh thu..." thousandSeparator={true} component={RenderMoneyFormat}></Field> */}
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
            form: 'ModalProductPayment',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalProductPayment)));
