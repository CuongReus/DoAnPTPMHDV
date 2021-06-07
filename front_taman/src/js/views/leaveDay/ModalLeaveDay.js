// import React from 'react';
// import { connect } from 'react-redux';
// import agent from '../../services/agent';
// import { Modal } from 'react-bootstrap';
// import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker,RenderCheckbox, RenderSelect, RenderNumberInput } from '../../components/formInputs';
// import { Field, reduxForm } from 'redux-form';
// import isEmail from 'sane-email-validation';
// import { StringUtils } from '../../utils/javascriptUtils';
// import { toast } from 'react-toastify';
// import { translate } from 'react-i18next';
// import { LoadingScreen } from '../../components/commonWidgets';
// import {LOAD_UPDATING_LEAVE_DAY} from './action-types';
// import {FIRE_REDIRECT } from '../../constants/action-types';
// import ListFile from '../../components/ListFile';
// import { isNull } from 'util';
// import moment from 'moment';
// import UserAvatar from '../../components/UserAvatar';
// const validate = values => {
//     const errors = {};
//     if (!values.email) {
//         errors.email = 'Vui lòng nhập email.';
//     } else if (!isEmail(values.email)) {
//         errors.email = 'Email không hợp lệ.';
//     }
//     if (!values.password) {
//         errors.password = 'Vui lòng nhập mật khẩu.';
//     } else {
//         if (values.password.length < 6) {
//             errors.password = 'Để bảo mật, mật khẩu phải chứa 6 ký tự trở lên.';
//         }
//     }
//     if (!values.fullName) {
//         errors.fullName = 'Vui lòng nhập họ tên';
//     }
//     return errors;
// }

// const mapStateToProps = state => {
//     var updateValue = {
//         ...state.personelReducer.updatingPersonel, 
//         birthday: state.personelReducer.updatingPersonel && state.personelReducer.updatingPersonel.birthday ? moment(state.personelReducer.updatingPersonel.birthday) : null,
//         active: state.personelReducer.updatingPersonel && state.personelReducer.updatingPersonel.active ? state.personelReducer.updatingPersonel.active : 1
     
//     };
//     return {
//         initialValues: updateValue
//     };
// };

// const mapDispatchToProps = dispatch => ({
//         loadPersonel: (payload) => 
//         dispatch({ type: LOAD_UPDATING_PERSONEL, payload: payload })
// });


// class ModalPersonel extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             objPersonel: null,
//             listAllCompanys:[],
//         }
//         this.handleAdd = this.handleAdd.bind(this);
//         this.handleHideAndClear = this.handleHideAndClear.bind(this);
//     }
    
//   componentWillMount() {
//         const { loadPersonel } = this.props;
//         var id = this.props.idUser;
      
//             const dataPromise = agent.UserApi.getPersonel(id);
//             loadPersonel(Promise.resolve(dataPromise)); 
//             return(
//                 this.getListCompany()
//             )
        
//     }

//   getListCompany(){
//     let setStateInRequest = (list) => { this.setState({ listAllCompanys: list }) }
//     return agent.asyncRequests.get("/company/listAll").then(function (res) {
//         var result = res.body.resultData;
//         if (result) {
//             setStateInRequest(result);
//         } else {
//             toast.error("Có lỗi khi lưu trữ. Lỗi: " + result.errorMessage, { autoClose: 15000 });
//         }
//     }, function (err) {
//         toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
//     });
// }

//     handleAdd(values) {
//         var onHide = this.props.onHide;
//         var id = this.props.idUser;
//         var url = '/user/add';
//         var bodyObject = {
//             imageUpload: values.imageUpload,
//             image : values.image,
//             email: values.email,
//             password: values.password,
//             fullName: values.fullName,
//             company: values.company,
//             phone: values.phone, role:values.role,
//             address: values.address, 
//             birthday: values.birthday,
//             active: values.active,
//             leaveDayYear: values.leaveDayYear,
//             labourContract: values.labourContract,
//             department: values.department,
//             profiles: values.profiles,
         
//         };
//         if (id) {
//             url = '/user/update';
//             bodyObject.id = id;
//         }

//         return agent.asyncRequests.post(url, bodyObject
//         ).then(function (res) {
//             var result = res.body.resultData;
//             if (result && result.id) {
//               onHide();
//               toast.info("Lưu Thành Công.", {autoClose: 8000});
//             } else {
                
//                 toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
//             }
//         }, function (err) {
//             toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
//         });
    
//     }

//     ///Hide and Clean Value
//     handleHideAndClear(){
//        const{destroy,onHide} = this.props;
//         // event.preventDefault();
//         onHide();
//         destroy();
//     }
//     render() {
//        // const { objectUser, listfile, title, onHide } = this.props;
        
//        const {handleSubmit,submitting, title,invalid } = this.props;
//         const modalConfig = { backdrop: 'static',show: this.props.show,bsSize:"sm",  onHide:this.props.onHide,submitting: this.props.submitting};
//         var dataCompany = this.state.listAllCompanys;
//         var optionRoles = [
//             { label: "Nhân Viên", value: "STAFF" },
//             { label: "Admin", value: "ADMIN" }
           
//         ];
//         var optionCompanies = []; 
//         dataCompany.map(item=>{
//             optionCompanies.push({label:item.code +  "-" + item.name,value:item.id})
//         })
//         // optionEmployees = [];
//         // dataEmployee.map(item => {
//         //     optionEmployees.push({ label: item.fullName + "( " +item.phone +" )", value: item.id })
//         // });
//         var id = this.props.idUser;
//         var newModal = null;
       
            
//             newModal =
//             <div style={{ width: '30%' }}>
//                 <Modal
//                     {...modalConfig}
//                     aria-labelledby="contained-modal-title-lg"
//                 >
//                     <Modal.Header closeButton>
//                         <Modal.Title id="contained-modal-title-sm"><center>{title}</center> </Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                     {submitting ? <LoadingScreen /> :
//                                 <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.handleAdd)}>
//                                     <Field name="imageUpload"  component={UserAvatar}></Field>
//                                     <Field name="fullName" label="Họ Tên(*)" placeholder="Nhập Họ Tên Người Dùng..." component={RenderInputWithDiv}></Field>
//                                     <Field name="email" type="email" label="Email(*)" placeholder="Nhập Email Người Dùng..." component={RenderInputWithDiv}></Field>
//                                     {id ?  null :<Field name="password" label="Mật khẩu" placeholder="Nhập Mật Khẩu Hoặc Click Vào Biểu Tượng Bên Phải Để Tự Tạo Mật Khẩu" component={RenderInputWithGen}></Field>}
//                                     <Field name="address"  label="Địa Chỉ" placeholder="Nhập Địa Chỉ..." rows={3} component={RenderTextArea}></Field>
//                                     <Field name="department"  label="Phòng Ban" placeholder="Nhập tên phòng ban..." component={RenderInputWithDiv}></Field>
//                                     <Field name="role" label="Cấp Quyền" placeholder="Chọn Quyền Cho Nhân Viên..." options={optionRoles} component={RenderSelect}></Field>
//                                     <Field name="phone" label="Số Điện Thoại(*)" placeholder="Nhập Số Điện Thoại..." component={RenderInputWithDiv}></Field>                                  
//                                     <Field dateFormat="DD/MM/YYYY" label="Ngày Sinh" name="birthday" component={RenderDatePicker}></Field>
//                                     <Field  name="leaveDayYear" label="Số Ngày Phép / Năm" placeholder="Nhập số ngày phép của nhân viên / năm..."  component={RenderNumberInput}></Field>
//                                     <Field name="company.id" label="Thuộc công ty" options={optionCompanies} component={RenderSelect} ></Field>
//                                     <Field name="active" label="Trạng Thái" checkLabel="Đang Làm Việc"  component={RenderCheckbox}></Field>
//                                     <Field name="profiles"  component={ListFile}></Field>
//                                     <div className="text-right">
//                                         <button type="button" className="btn btn-link" onClick={this.handleHideAndClear} >Hủy</button>
//                                         <button type="submit" className="btn bg-orange" disabled={submitting || invalid}>Lưu</button>
//                                     </div>
//                                 </form>
//                             }
//                     </Modal.Body>
//                 </Modal>
//             </div>
        
       

        

//         return newModal;
//     }
// };


// export default translate('translations')(connect(
//     mapStateToProps, mapDispatchToProps)(
//         reduxForm({
//             form: 'ModalLeaveLetter',
//             destroyOnUnmount: true,
//             enableReinitialize: true,
//             validate
//         })(ModalPersonel)));
