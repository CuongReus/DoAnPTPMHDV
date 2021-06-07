import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { ScriptUtils } from '../../utils/javascriptUtils';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import { Link } from 'react-router-dom';
import SecuredComponent from '../../components/SecuredComponent';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({
});

class RoleList extends React.Component {
    constructor() {
        super();
        this.state = {
            listRole: null
        }
        this.reloadListRole = this.reloadListRole.bind(this);
    };

    reloadListRole() {
        let setStateInRequest = (list) => { this.setState({ listRole: list }) }
        return agent.asyncRequests.get("/role/listAll"
        ).then(function (res) {
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
        this.reloadListRole();
    };

    componentDidUpdate() {
        ScriptUtils.loadFootable();
    }
    //Delete Role Function
    deleteRole(id, name) {

        if (confirm("Bạn có chắc sẽ xoá Phân Quyền : " + "'" + name + "'")) {
            var url = `/role/${id}`;
            _this = this;
            return agent.asyncRequests.del(url
            ).then(function (res) {
                var result = res.body.resultData;
                if (result && !result.error) {
                    alert("Xoá Thành Công Phân Quyền: " + name);
                    _this.reloadListRole();
                } else {
                    toast.error("Có lỗi khi xóa dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Không thể xóa dữ liệu đang được sử dụng từ màn hình khác! ", { autoClose: 15000 });
            });
        } else {
        }
    }


    render() {
        const data = this.state.listRole;
        if (!data) {
            return null;
        }
        var currentNo = 0;
        var page = qs.parse(this.props.location.search).page;
        if (!page) {
            page = 1;
        }
        var currentNo = ((page - 1) * 20);
        var rows = data.map(item => {
        currentNo++
            return (
                <tr key={item.id}>
                    <td>{currentNo}</td>
                    <td>{item.name}</td>
                    <td className="text-center footable-visible footable-last-column">
                        <ul className="icons-list">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="icon-menu9"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                <SecuredComponent allowedPermission="admin.roles.update">
                                    <li><Link to={"/editRole/" + item.id}><i className="icon-pencil"></i>Sửa</Link></li>
                                    </SecuredComponent>
                                    <SecuredComponent allowedPermission="admin.roles.delete">
                                    <li><a onClick={() => this.deleteRole(item.id, item.name)}><i className="icon-cross2"></i>Xóa</a></li>
                                    </SecuredComponent>
                                    
                                </ul>
                            </li>
                        </ul>
                    </td>
                </tr>);
        });

        var search = qs.parse(this.props.location.search).search;

        return (

            <div className="content-wrapper">


                <div className="content">
                    <div className="page-header">
                        <h4>
                            <i className=" icon-paragraph-justify2 position-left"></i>
                            <span className="text-semibold">Danh Sách Phân Quyền</span>
                            <span className="pull-right">
                                {/* <button className="btn bg-green" onClick={() => this.handleShowmodal()}>Thêm Mới</button> */}
                                <SecuredComponent allowedPermission="admin.roles.create">
                                <a type="button" className="btn bg-green" href={"/editRole/new"}><i className="icon-add-to-list"></i> Thêm mới</a>
                                </SecuredComponent>
                            </span>
                        </h4>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-flat">

                                
                            </div>
                            <div className="panel panel-flat">
                                <table className="table table-togglable table-hover">
                                    <thead>
                                        <tr className="bg-green">
                                            <th data-toggle="true">STT</th>
                                            <th data-hide="phone">Nhóm Quyền</th>

                                            <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}

export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(RoleList));