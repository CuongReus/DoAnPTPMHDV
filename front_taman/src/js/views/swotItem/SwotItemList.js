import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { ScriptUtils } from '../../utils/javascriptUtils';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ModalSwotItem from './ModalSwotItem';
import SecuredComponent from '../../components/SecuredComponent';
const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
});
const mapDispatchToProps = dispatch => ({
});
class SwotItemList extends React.Component {
    constructor() {
        super();
        this.state = {
            listSwotItem: null,
            isSwotItemListModalShown: false,
        }
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isSwotItemModalShown: false });
            this.updateListSwotItem();
        }
    };

    updateListSwotItem() {
        var search = qs.parse(this.props.location.search).search;
        var page = qs.parse(this.props.location.search).page;
        let setStateInRequest = (list) => { this.setState({ listSwotItem: list }) }
        return (agent.SwotItemApi.listSwotItem(search, page
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            }
            else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        }))
    };

    componentWillMount() {
        var search = qs.parse(this.props.location.search).search;
        var page = qs.parse(this.props.location.search).page;
        let setStateInRequest = (list) => { this.setState({ listSwotItem: list }) }
        return agent.SwotItemApi.listSwotItem(search, page
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
    };

    componentDidUpdate() {
        ScriptUtils.loadFootable();
    };

    //Delete SwotItem Function
    deleteSwotItem(id, name) {

        if (confirm("Bạn có chắc sẽ xoá Danh mục Swot: " + "'" + name + "'")) {
            var url = `/swotItem/${id}`;
            return agent.asyncRequests.del(url
            ).then(function (res) {
                var result = res.body.resultData;
                if (result && !result.error) {
                    alert("Xoá Thành Công Danh Mục SWOT: " + name);
                    window.location.reload();
                } else {
                    toast.error("Có lỗi khi xóa dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Không thể xóa dữ liệu đang được sử dụng từ màn hình khác!", { autoClose: 15000 });
            });
        } else {
        }
    };

    handleShowmodal(id) {
        this.setState({
            isSwotItemModalShown: true,
            idSwotItem: id
        })
    };

    handleHidemodal() {
        this.setState({
            isSwotItemModalShown: false
        })
    };

    render() {
        const data = this.state.listSwotItem;
        const {t} = this.props;
        var page = qs.parse(this.props.location.search).page;
        if(!page){
            page = 1;
        }
        if (!data) {
            return null;
        }
        console.log(t);
        var currentNo = ((page - 1) * 20);
        var rows = data.content.map(item => {
            currentNo = currentNo + 1;
            return (
                <tr key={item.id}>
                    <td>{currentNo}</td>
                    <td>{item.title}</td>
                    {/* <td><span class="label label-success">{t(item.swotType)}</span></td> */}
                    <td>
                    {(function() {
                    if (item.swotType === 'STRENGTH') {
                      return (
                        (
                            <span class="label label-success">{t(item.swotType)}</span>
                        )
                      )
                    }else if(item.swotType === 'WEAKNESS'){
                        return (
                            (
                                <span class="label label-danger">{t(item.swotType)}</span>
                            )
                    )}else if(item.swotType === 'OPPORTUNITY'){
                        return (
                            (
                                <span class="label label-primary">{t(item.swotType)}</span>
                            )
                    )}else{
                        return (
                            (
                                <span class="label label-warning">{t(item.swotType)}</span>
                            )
                    )}
                  })()}
                    </td>
                    <td>{item.description}</td>
                    <td className="text-center footable-visible footable-last-column">
                        <ul className="icons-list">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="icon-menu9"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                <SecuredComponent allowedPermission="admin.department.update">
                                    <li><a onClick={() => this.handleShowmodal(item.id)}><i className="icon-pencil"></i>Sửa Thông Tin</a></li>
                                    </SecuredComponent>
                                    <SecuredComponent allowedPermission="admin.department.delete">
                                    <li><a onClick={() => this.deleteSwotItem(item.id, item.name)}><i className="icon-cross2"></i>Xóa</a></li>
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
                            <span className="text-semibold">Danh sách danh mục SWOT</span>
                            <span className="pull-right">
                            <SecuredComponent allowedPermission="admin.department.create">
                                <button className="btn bg-teal" onClick={() => this.handleShowmodal()}>Thêm Mới</button>
                            </SecuredComponent>
                            </span>
                        </h4>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-flat">

                                <div className="panel-body">
                                    <form className="main-search" role="form">
                                        <div className="input-group content-group">
                                            <div className="has-feedback has-feedback-left">
                                                <input type="text" className="form-control input-xlg" placeholder="Tìm Kiếm Theo: Tên tiêu đề swot." name="search" defaultValue={search} autoFocus={true} />
                                                <div className="form-control-feedback">
                                                    <i className="icon-search4 text-muted text-size-base"></i>
                                                </div>
                                            </div>
                                            <div className="input-group-btn">
                                                <button type="submit" className="btn bg-teal btn-xlg">Tìm</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            {this.state.isSwotItemModalShown ? <ModalSwotItem title="Danh Mục SWOT" idSwotItem={this.state.idSwotItem} show={this.state.isSwotItemModalShown} onHide={this.handleHidemodal} /> : null}

                            <div className="panel panel-flat">
                                <table className="table table-togglable table-hover">
                                    <thead>
                                        <tr className="bg-teal">
                                            <th data-toggle="true">STT</th>
                                            <th data-toggle="true">Tên danh mục SWOT</th>
                                            <th data-toggle="true">Loại</th>
                                            <th data-hide="phone">Mô Tả Danh Mục</th>
                                            <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>
                            <TablePagination data={data} baseUrl="/listSwotItem" />
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(SwotItemList));