// import React from 'react';
// import { connect } from 'react-redux';
// import agent from '../../services/agent';
// import { Modal } from 'react-bootstrap';
// import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker, RenderCheckbox, RenderSelect, RenderNumberInput, RenderMoneyFormat, RenderMultiSelect } from '../../components/formInputs';
// import { Field, reduxForm, formValueSelector } from 'redux-form';
// import isEmail from 'sane-email-validation';
// import { StringUtils } from '../../utils/javascriptUtils';
// import { toast } from 'react-toastify';
// import { translate } from 'react-i18next';
// import { LoadingScreen } from '../../components/commonWidgets';
// import { LOAD_UPDATING_PAYMENT } from './action-types';
// import { FIRE_REDIRECT } from '../../constants/action-types';
// import ListFile from '../../components/ListFile';
// import { isNull } from 'util';
// import moment from 'moment';
// import { LOAD_UPDATING_PROJECT_COST_DTO } from '../projectCost/action-types';
// const validate = values => {
//     const errors = {};
//     if (!values.name) {
//         errors.name = 'Vui lòng nhập tên dư án.';
//     } 
//     return errors;
// }

// const selector = formValueSelector('ModalPayment');

// var today = moment(new Date,"DD/MM/YYYY");

// const mapStateToProps = state => {
//     var projectCostDto = state.projectCostReducer.projectCostDto;
//     var updateValue = {
//         ...state.paymentReducer.updatingPayment,
//         projectCostDto: projectCostDto? projectCostDto.id:null,
//         labourNameLink: projectCostDto? projectCostDto.fullName:"N/A",
//         createdDate:state.paymentReducer.updatingPayment && state.paymentReducer.updatingPayment.createdDate ? moment(state.paymentReducer.updatingPayment.createdDate) : today,
//         lastedUpdateDate:state.paymentReducer.updatingPayment && state.paymentReducer.updatingPayment.lastedUpdateDate ? moment(state.paymentReducer.updatingPayment.lastedUpdateDate) : null,
//         createdUser:state.paymentReducer.updatingPayment && state.paymentReducer.updatingPayment.createdUser ?  state.paymentReducer.updatingPayment.createdUser: state.common.currentUser 

//     };
//     return {
//         initialValues: updateValue,
//         lastedUpdateUser: selector(state,"lastedUpdateUser"),
//         createdUser: selector(state, "createdUser"),
//         currentUser: state.common.currentUser,
//     };
// };

// const mapDispatchToProps = dispatch => ({
//     loadPayment: (payload) =>
//         dispatch({ type: LOAD_UPDATING_PAYMENT, payload: payload }),
//     loadProjectCostDto: (projectCostDto) =>
//         dispatch({ type: LOAD_UPDATING_PROJECT_COST_DTO, projectCostDto: projectCostDto }),
//         updateField: (fieldName, value) =>
//         dispatch({
//             meta: { form: "ModalPayment", field: fieldName },
//             payload: value,
//             type: "@@redux-form/CHANGE"
//         })
// });




// class ModalPayment extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//         }
//         this.handleAdd = this.handleAdd.bind(this);
//         this.handleHideAndClear = this.handleHideAndClear.bind(this);
//     }
   
//     componentWillMount() {
//         const { loadPayment,loadProjectCostDto,projectCostDto } = this.props;
//         var id = this.props.idPayment;
//         if(projectCostDto){
//             loadProjectCostDto(projectCostDto);
//         }
//         const dataPromise = agent.PaymentApi.getPayment(id);
//         loadPayment(Promise.resolve(dataPromise));
      

//     }


//     handleAdd(values) {
//         var onHide = this.props.onHide;
//         var id = this.props.idPayment;
//         var url = '/payment/add';
//         var today = moment(new Date,"DD/MM/YYYY");
//         var bodyObject = {
//             projectCost:values.projectCost,
//             lotNumber:values.lotNumber,
//             paymentDate:values.paymentDate,
//             startWorkDate:values.startWorkDate,
//             endWorkDate:values.endWorkDate,
//             percentPaid:values.percentPaid?values.percentPaid: 0,
//             moneyPaid:values.moneyPaid?values.moneyPaid: 0,
//             approvalBy:values.approvalBy,
//             status:values.status,
//             lbNormalAttendance:values.lbNormalAttendance?values.lbNormalAttendance: 0,
//             lbOvertimeAttendance:values.lbOvertimeAttendance?values.lbOvertimeAttendance: 0,
//             lbMidnightAttendance:values.lbMidnightAttendance?values.lbMidnightAttendance: 0,
//             notifyTo:values.notifyTo,
//             note:values.note,
//             createdUser:values.createdUser,
//             lastedUpdateUser: id ?  currentUser : null,
//             createdDate:id? values.createdDate: today,
//             lastedUpdateDate: id ? moment(today) : null

//         };
//         if (id) {
//             url = '/payment/update';
//             bodyObject.id = id;
//         }

//         return agent.asyncRequests.post(url, bodyObject
//         ).then(function (res) {
//             var result = res.body.resultData;
//             if (result && result.id) {
//                 onHide();
//                 toast.info("Lưu Thành Công.", {autoClose: 8000});
//             } else {

//                 toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
//             }
//         }, function (err) {
//             toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
//         });

//     }

//     ///Hide and Clean Value
//     handleHideAndClear() {
//         const { destroy, onHide } = this.props;
//         // event.preventDefault();
//         onHide();
//         destroy();
//     }
//     render() {
//         // const { objectProject, listfile, title, onHide } = this.props;

//         const { handleSubmit, submitting, title, invalid, createdUser,currentUser,lastedUpdateUser,initialValues} = this.props;
//         const modalConfig = { backdrop: 'static', show: this.props.isPayment,bsSize:"sm",  onHide: this.props.onHide, submitting: this.props.submitting };
//         // const dataProjectYear= this.state.listAllYears;
//         var optionProjectDetail = [];
//         var optionsApprovalBy = [];
//         var optionStatus = [];
//         var optionNotifyTo = [];
//         var id = this.props.idPayment;

//         var showCreatedUser = [];
//         var showLastedUpdateUser = [];
//         // Push created user
//             showCreatedUser.push({
//                 label: createdUser ? createdUser.fullName + " || " + createdUser.email
//                     : currentUser.fullName + " || " + currentUser.email,
//                 value: createdUser ? createdUser.id : currentUser.id
//             });
//           // Push Updated User
//         showLastedUpdateUser.push({label:lastedUpdateUser ?  lastedUpdateUser.fullName + " || "+ lastedUpdateUser.email 
//         : currentUser.fullName + " || "+currentUser.email,
//         value:lastedUpdateUser ?lastedUpdateUser.id: currentUser.id});

//         var newModal = null;
//         newModal =
//             <div style={{ width: '30%' }}>
//                 <Modal
//                     {...modalConfig}
//                     aria-labelledby="contained-modal-title-lg"
//                 >
//                     <Modal.Header closeButton>
//                         <Modal.Title id="contained-modal-title-sm"><center>{title}</center> </Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         {submitting ? <LoadingScreen /> :
//                             <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.handleAdd)}>
//                                 <Field disabled={true} name="projectCost.id" label="Mục Thanh Toán" placeholder=""  component={RenderInputWithDiv}></Field>
//                                 <Field disabled={true} name="labourNameLink" label="Tên Công Nhân" placeholder=""  component={RenderInputWithDiv}></Field>
//                                 <Field name="lotNumber" label="Đợt Thanh Toán" placeholder=""  component={RenderNumberInput}></Field>
//                                 {/* <Field name="paymentDate" label="Ngày Thanh Toán" dateFormat="DD/MM/YYYY"  component={RenderDatePicker}></Field>
//                                 <Field name="startWorkDate" label="Ngày Bắt Đầu Công Việc"dateFormat="DD/MM/YYYY"  component={RenderDatePicker}></Field>
//                                 <Field name="endWorkDate" label="Ngày Kết Thúc Công Việc" dateFormat="DD/MM/YYYY"  component={RenderDatePicker}></Field>
//                                 <Field name="percentPaid" label="Phần Trăm Cần Thanh Toán" placeholder="Nhập phần trăm cần thanh toán..."  component={RenderNumberInput}></Field>
//                                 <Field name="moneyPaid" label="Số Tiền Cần Thanh Toán" placeholder=""  thousandSeparator={true} component={RenderMoneyFormat}></Field>
//                                 <Field name="approvalBy" label="Duyệt Bởi" placeholder="Chọn người duyệt..." options={optionsApprovalBy} component={RenderSelect}></Field>
//                                 <Field name="status" label="Trạng Thái Thanh Toán" placeholder="Chọn Trạng Thái Thanh Toán"  options={optionStatus} component={RenderSelect}></Field>
//                                 <Field name="lbNormalAttendance" label="Tổng Ngày Công Thường"  component={RenderNumberInput}></Field>
//                                 <Field name="lbMidnightAttendance" label="Tổng Ngày Công Khuya"  component={RenderNumberInput}></Field>
//                                 <Field name="notifyTo" label="Thông Báo Đến"  dateFormat="DD/MM/YYYY" options={optionNotifyTo} component={RenderMultiSelect}></Field> */}
//                                 <Field name="note" label="Ghi Chú" placeholder="Nhập ghi chú..." rows={3} component={RenderTextArea}></Field>
//                                 {/* <Field disabled={true} name="totalRevenue"  label="Tổng Doanh Thu" placeholder="Nhập tổng doanh thu..." thousandSeparator={true} component={RenderMoneyFormat}></Field> */}
//                                 <Field disabled={true} name="createdUser.id" label="Người Tạo Bảng"  options={showCreatedUser} component={RenderSelect}></Field>
//                                 {id ?<Field disabled={true} name="createdDate" label="Ngày Tạo Bảng"  dateFormat="DD/MM/YYYY" component={RenderDatePicker}></Field> : null }
//                                 <div style={initialValues.lastedUpdateUser?{display:'block'}:{display:'none'}}>
//                                 <Field disabled={true} name="lastedUpdateUser.id" label="Người Chỉnh Sửa Gần Nhất" options={showLastedUpdateUser} component={RenderSelect}></Field>
//                                 <Field disabled={true} name="lastedUpdateDate"  label="Ngày Chỉnh Sửa Gần Nhất " dateFormat="DD/MM/YYYY" component={RenderDatePicker}></Field> </div>
//                                 <div className="text-right">
//                                     <button type="button" className="btn btn-link" onClick={this.handleHideAndClear} >Hủy</button>
//                                     <button type="submit" className="btn bg-orange" disabled={submitting || invalid}>Lưu</button>
//                                 </div>
//                             </form>
//                         }
//                     </Modal.Body>
//                 </Modal>
//             </div>





//         return newModal;
//     }
// };


// export default translate('translations')(connect(
//     mapStateToProps, mapDispatchToProps)(
//         reduxForm({
//             form: 'ModalPayment',
//             destroyOnUnmount: true,
//             enableReinitialize: true,
//             validate
//         })(ModalPayment)));
