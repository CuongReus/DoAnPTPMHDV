import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { ScriptUtils } from '../../utils/javascriptUtils';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ModalSwotJob from './ModalSwotJob';
import SecuredComponent from '../../components/SecuredComponent';
const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
});
const mapDispatchToProps = dispatch => ({
});
class SwotJobList extends React.Component {
    constructor() {
        super();
        this.state = {
            listSwotJob: null,
            isSwotJobListModalShown: false,
        }
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isSwotJobModalShown: false });
            this.updateListSwotJob();
        }
    };

    updateListSwotJob() {
        // var search = qs.parse(this.props.location.search).search;
        var search = '';
        var page = 0;
        let setStateInRequest = (list) => { this.setState({ listSwotJob: list }) }
        return (agent.SwotJobApi.listSwotJob(search, page
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
        // var search = qs.parse(this.props.location.search).search;
        var search = '';
        // var page = qs.parse(this.props.location.search).page;
        var page = 0;
        let setStateInRequest = (list) => { this.setState({ listSwotJob: list }) }
        return agent.SwotJobApi.listSwotJob(search, page
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

    //Delete SwotJob Function
    deleteSwotJob(id, name) {

        if (confirm("Bạn có chắc sẽ xoá Danh mục Swot: " + "'" + name + "'")) {
            var url = `/swotJob/${id}`;
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
            isSwotJobModalShown: true,
            idSwotJob: id
        })
    };

    handleHidemodal() {
        this.setState({
            isSwotJobModalShown: false
        })
    };

    render() {
        const data = this.state.listSwotJob;
        const {t} = this.props;
        // var page = qs.parse(this.props.location.search).page;
        var page = 0
        if(!page){
            page = 1;
        }
        if (!data) {
            return null;
        }
        var currentNo = ((page - 1) * 20);
        var rows = data.content.map(item => {
            currentNo = currentNo + 1;
            return (
                <tr key={item.id}>
                    <td>{currentNo}</td>
                    <td>{item.swotItem.title}</td>
                    {/* <td><span class="label label-success">{t(item.swotType)}</span></td> */}
                    <td>
                    {(function() {
                    if (item.swotItem.swotType === 'STRENGTH') {
                      return (
                        (
                            <span className="label label-success">{t(item.swotItem.swotType)}</span>
                        )
                      )
                    }else if(item.swotItem.swotType === 'WEAKNESS'){
                        return (
                            (
                                <span className="label label-danger">{t(item.swotItem.swotType)}</span>
                            )
                    )}else if(item.swotItem.swotType === 'OPPORTUNITY'){
                        return (
                            (
                                <span className="label label-primary">{t(item.swotItem.swotType)}</span>
                            )
                    )}else{
                        return (
                            (
                                <span className="label label-warning">{t(item.swotItem.swotType)}</span>
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
                                    <li><a onClick={() => this.deleteSwotJob(item.id, item.name)}><i className="icon-cross2"></i>Xóa</a></li>
                                    </SecuredComponent>
                                </ul>
                            </li>
                        </ul>
                    </td>
                </tr>);
        });

        // var search = qs.parse(this.props.location.search).search;

        return (
            <div className="content-wrapper">
                <div className="content">
                    <div className="page-header">
                        <h4>
                            <i className=" icon-paragraph-justify2 position-left"></i>
                            <span className="text-semibold">Đánh giá SWOT nhân viên</span>
                            <span className="pull-right">
                            <SecuredComponent allowedPermission="admin.department.create">
                                <button className="btn bg-teal" onClick={() => this.handleShowmodal()}>Thêm Mới</button>
                            </SecuredComponent>
                            </span>
                        </h4>
                    </div>
                    <div className="row">
                        <div className="col-md-12">

                            {this.state.isSwotJobModalShown ? <ModalSwotJob title="Danh Mục SWOT" idSwotJob={this.state.idSwotJob} show={this.state.isSwotJobModalShown} onHide={this.handleHidemodal} /> : null}

                            <div className="panel panel-flat">
                                <table className="table table-togglable table-hover">
                                    <thead>
                                        <tr className="bg-teal">
                                            <th data-toggle="true">STT</th>
                                            <th data-toggle="true">Tiêu đề</th>
                                            <th data-toggle="true">Loại</th>
                                            <th data-hide="phone">Ghi chú</th>
                                            <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>
                            {/* <TablePagination data={data} baseUrl="/listSwotJob" /> */}
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(SwotJobList));