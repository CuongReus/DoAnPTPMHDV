// import React from 'react';
// import qs from 'query-string';
// import { toast } from 'react-toastify';
// import { translate } from 'react-i18next';
// import { ScriptUtils } from '../../utils/javascriptUtils';
// import TablePagination from '../../components/TablePagination';
// import agent from '../../services/agent';
// import { Link } from 'react-router-dom';
// import ModalPersonel from './ModalLabourSalary';


// class PersonelList extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             listPersonel: null,
//             isPersonelModalShown: false,
//             objectUser: null
//         }
//         this.handleShowmodal = this.handleShowmodal.bind(this);
//         this.handleHidemodal = () => {
//             this.setState({ isPersonelModalShown: false });
//             this.updateListPersonel();
//         };




//     };

//     updateListPersonel() {

//         var search = qs.parse(this.props.location.search).search;
//         var page = qs.parse(this.props.location.search).page;

//         let setStateInRequest = (list) => { this.setState({ listPersonel: list }) }
//         return (agent.UserApi.listPersonel(search, page
//         ).then(function (res) {
//             var result = res.body.resultData;
//             if (result) {

//                 setStateInRequest(result);

//             }
//             else {
//                 toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
//             }
//         }, function (err) {
//             toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
//         }))
//     }
//     componentWillMount() {
//         var search = qs.parse(this.props.location.search).search;
//         var page = qs.parse(this.props.location.search).page;
//         let setStateInRequest = (list) => { this.setState({ listPersonel: list }) }
//         return agent.UserApi.listPersonel(search, page
//         ).then(function (res) {
//             var result = res.body.resultData;
//             if (result) {
//                 setStateInRequest(result);
//             } else {
//                 toast.error("Có lỗi khi lưu trữ. Lỗi: " + result.errorMessage, { autoClose: 15000 });
//             }
//         }, function (err) {
//             toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
//         });
//     };

//     componentDidUpdate() {
//         ScriptUtils.loadFootable();
//     }
//     //Delete Personel Function
//     deletePersonel(id, fullName) {

//         if (confirm("Bạn có chắc sẽ xoá Nhân Viên: " + "'" + fullName + "'")) {
//             var url = `/user/${id}`;
//             return agent.asyncRequests.del(url
//             ).then(function (res) {
//                 var result = res.body.resultData;
//                 if (result && !result.error) {
//                     alert("Xoá Thành Công Nhân Viên: " + fullName);
//                     window.location.reload(true);
//                 } else {
//                     toast.error("Có lỗi khi lưu trữ. Lỗi: " + result.errorMessage, { autoClose: 15000 });
//                 }
//             }, function (err) {
//                 toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
//             });


//         } else {
//         }
//     }

//     handleShowmodal(id) {
//         this.setState({
//             isPersonelModalShown: true,
//             idUser: id
//         });

//     }


//     render() {
//         const data = this.state.listPersonel;
//         if (!data) {
//             return null;
//         }
//         var rows = data.content.map(item => {
//             return (
//                 <tr key={item.id}>
//                     <td>{item.id}</td>
//                     
//                     <td><a onClick={() => this.handleShowmodal(item.id)}>{item.labourSalary}</a></td>
//                     <td>{item.amount}</td>
//                     <td>{item.paymentType}</td>
//                     <td>{item.paidDate}</td>
//                     <td>{item.validatedBy}</td>
//                     <td>{item.validatedDate}</td>
//                     <td>{item.status}</td>
//                     <td>{item.note}</td>
//                     <td className="active-font" target={item.active ? "Đang Hoạt Động" : "Vô Hiệu Hoá"}>{item.active ? "Đang Hoạt Động" : "Vô Hiệu Hoá"}</td>
//                     <td className="text-center footable-visible footable-last-column">
//                         <ul className="icons-list">
//                             <li className="dropdown">
//                                 <a href="#" className="dropdown-toggle" data-toggle="dropdown">
//                                     <i className="icon-menu9"></i>
//                                 </a>
//                                 <ul className="dropdown-menu dropdown-menu-right">
//                                     <li><a onClick={() => this.deletePersonel(item.id, item.fullName)}><i className="icon-cross2"></i>Xóa</a></li>
//                                 </ul>
//                             </li>
//                         </ul>
//                     </td>
//                 </tr>);
//         });

//         var search = qs.parse(this.props.location.search).search;

//         return (

//             <div className="content-wrapper">


//                 <div className="content">
//                     <div className="page-header">
//                         <h4>
//                             <i className=" icon-paragraph-justify2 position-left"></i>
//                             <span className="text-semibold">Danh sách Nhân Viên</span>
//                             <span className="pull-right">
//                                 <button className="btn bg-green" onClick={() => this.handleShowmodal()}>Thêm Mới</button>
//                             </span>
//                         </h4>
//                     </div>

//                     <div className="row">
//                         <div className="col-md-12">
//                             <div className="panel panel-flat">

//                                 <div className="panel-body">
//                                     <form className="main-search" role="form">
//                                         <div className="input-group content-group">
//                                             <div className="has-feedback has-feedback-left">
//                                                 <input type="text" className="form-control input-xlg" placeholder="Tên Nhân Viên, Số Điện Thoại, Địa Chỉ, Email..." name="search" defaultValue={search} autoFocus={true} />
//                                                 <div className="form-control-feedback">
//                                                     <i className="icon-search4 text-muted text-size-base"></i>
//                                                 </div>
//                                             </div>

//                                             <div className="input-group-btn">
//                                                 <button type="submit" className="btn bg-green btn-xlg">Tìm</button>
//                                             </div>
//                                         </div>
//                                     </form>
//                                 </div>
//                             </div>
//                             {this.state.isPersonelModalShown ? <ModalPersonel title="Nhân Viên" idUser={this.state.idUser} show={this.state.isPersonelModalShown} onHide={this.handleHidemodal} /> : null}

//                             <div className="panel panel-flat">
//                                 <table className="table table-togglable table-hover">
//                                     <thead>
//                                         <tr className="bg-green">
//                                             <th data-toggle="true">STT</th>
//                                             {/* <th data-hide="phone">Hình Ảnh</th> */}
//                                             <th data-toggle="true">Email</th>
//                                             <th data-hide="phone">Họ Tên</th>
//                                             <th data-hide="phone">Thuộc Bộ Phận</th>
//                                             <th data-hide="phone">Địa chỉ</th>
//                                             <th data-hide="phone">Chức Vụ </th>
//                                             <th data-hide="phone">Công Ty </th>
//                                             <th data-hide="phone">Điện thoại</th>
//                                             <th data-hide="phone">Ngày Phép / Năm</th>
//                                             <th data-hide="phone">Trạng Thái</th>
//                                             <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {rows}
//                                     </tbody>
//                                 </table>
//                             </div>
//                             <TablePagination data={data} baseUrl="/listPersonel" />
//                         </div>
//                     </div>
//                 </div>

//             </div>
//         );
//     }

// }

// export default translate('translations')(PersonelList);