// import React from 'react';
// import qs from 'query-string';
// import { toast } from 'react-toastify';
// import { translate } from 'react-i18next';
// import { ScriptUtils } from '../../utils/javascriptUtils';
// import TablePagination from '../../components/TablePagination';
// import agent from '../../services/agent';
// import { Link } from 'react-router-dom';
// import ModalProject from './ModalProject';


// class ProjectList extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             listProject: null,
//             isProjectModalShown: false,
//             objectProject: null
//         }
//         this.handleShowmodal = this.handleShowmodal.bind(this);
//         this.handleHidemodal = () => {
//             this.setState({ isProjectModalShown: false });
//             this.updateListProject();
//         };




//     };

//     updateListProject() {

//         var search = qs.parse(this.props.location.search).search;
//         var page = qs.parse(this.props.location.search).page;

//         let setStateInRequest = (list) => { this.setState({ listProject: list }) }
//         return (agent.ProjectApi.listProject(search, page
//         ).then(function (res) {
//             var result = res.body.resultData;
//             if (result) {

//                 setStateInRequest(result);
//             }
//             else {
//                 toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
//             }
//         }, function (err) {
//             toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
//         }))
//     }
//     componentWillMount() {
//         var search = qs.parse(this.props.location.search).search;
//         var page = qs.parse(this.props.location.search).page;
//         let setStateInRequest = (list) => { this.setState({ listProject: list }) }
//         return agent.ProjectApi.listProject(search, page
//         ).then(function (res) {
//             var result = res.body.resultData;
//             if (result) {
//                 setStateInRequest(result);
//             } else {
//                 toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
//             }
//         }, function (err) {
//             toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
//         });
//     };

//     componentDidUpdate() {
//         ScriptUtils.loadFootable();
//     }
//     //Delete Project Function
//     deleteProject(id, fullName) {

//         if (confirm("Bạn có chắc sẽ xoá!")) {
//             var url = `/project/${id}`;
//             return agent.asyncRequests.del(url
//             ).then(function (res) {
//                 var result = res.body.resultData;
//                 if (result && !result.error) {
//                     alert("Xoá Thành Công Nhân Viên: " + fullName);
//                     window.location.reload(true);
//                 } else {
//                     toast.error("Có lỗi khi xóa dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
//                 }
//             }, function (err) {
//                 toast.error("Không thể xóa dữ liệu đang được sử dụng từ màn hình khác! ", { autoClose: 15000 });
//             });


//         } else {
//         }
//     }

//     handleShowmodal(id) {
//         this.setState({
//             isProjectModalShown: true,
//             idProject: id
//         });

//     }


//     render() {
//         const data = this.state.listProject;
//         if (!data) {
//             return null;
//         }

//         var rows = data.content.map(item => {
//             return (
//                 <tr key={item.id}>
//                     <td>{item.id}</td>
//                    
//                     <td>{item.projectYear.year}</td>
//                     <td><a onClick={() => this.handleShowmodal(item.id)}>{item.name}</a></td>
//                     <td>{item.note}</td>
//                     <td>{item.totalRevenue}</td>
//                     <td className="text-center footable-visible footable-last-column">
//                         <ul className="icons-list">
//                             <li className="dropdown">
//                                 <a href="#" className="dropdown-toggle" data-toggle="dropdown">
//                                     <i className="icon-menu9"></i>
//                                 </a>
//                                 <ul className="dropdown-menu dropdown-menu-right">
//                                     <li><a onClick={() => this.deleteProject(item.id)}><i className="icon-cross2"></i>Xóa</a></li>
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
//                             <span className="text-semibold">Danh sách Dự Án</span>
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
//                                                 <input type="text" className="form-control input-xlg" placeholder="" name="search" defaultValue={search} autoFocus={true} />
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
//                             {this.state.isProjectModalShown ? <ModalProject title="Dự Án" idProject={this.state.idProject} show={this.state.isProjectModalShown} onHide={this.handleHidemodal} /> : null}

//                             <div className="panel panel-flat">
//                                 <table className="table table-togglable table-hover">
//                                     <thead>
//                                         <tr className="bg-green">
//                                             <th data-toggle="true">STT</th>
//                                             <th data-toggle="true">Năm</th>
//                                             <th data-toggle="true">Tên Dự Án</th>
//                                             <th data-hide="phone">Ghi Chú</th>
//                                             <th data-hide="phone">Tổng Doanh Thu</th>
//                                             <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {rows}
//                                     </tbody>
//                                 </table>
//                             </div>
//                             <TablePagination data={data} baseUrl="/listProject" />
//                         </div>
//                     </div>
//                 </div>

//             </div>
//         );
//     }

// }

// export default translate('translations')(ProjectList);