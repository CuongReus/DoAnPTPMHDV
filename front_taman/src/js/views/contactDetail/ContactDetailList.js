import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { ScriptUtils } from '../../utils/javascriptUtils';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import { Link } from 'react-router-dom';
import SecuredComponent from '../../components/SecuredComponent';
import ModalContactDetail from './ModalContactDetail';
class ContactDetailList extends React.Component {
    constructor() {
        super();
        this.state = {
            listContactDetail: [],
            isContactDetailModalShown: false
        }
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.updateListContactDetail = this.updateListContactDetail.bind(this);

        this.handleHidemodal = () => {
            this.setState({ isContactDetailModalShown: false });
            this.updateListContactDetail();
        }
    };

    updateListContactDetail() {
        var search = qs.parse(this.props.location.search).search;
        var page = qs.parse(this.props.location.search).page;
        let setStateInRequest = (list) => { this.setState({ listContactDetail: list }) }
        return (agent.ContactDetailApi.listContactDetail(search, page
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
        let setStateInRequest = (list) => { this.setState({ listContactDetail: list }) }
        return agent.ContactDetailApi.listContactDetail(search, page
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    };

    componentDidUpdate() {
        ScriptUtils.loadFootable();
    };

    //Delete ContactDetail Function
    deleteContactDetail(id) {
        var updateListContactDetail = this.updateListContactDetail;
        if (confirm("Bạn có chắc sẽ xoá ?")) {
            var url = `/contactDetail/${id}`;
            return agent.asyncRequests.del(url
            ).then(function (res) {
                var result = res.body.resultData;
                if (result && !result.error) {
                    alert("Xoá Thành Công.");
                    updateListContactDetail();
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
            isContactDetailModalShown: true,
            idContactDetail: id
        })
    };

    render() {
        const data = this.state.listContactDetail;
        var page = qs.parse(this.props.location.search).page;
        if (!page) {
            page = 1;
        }
        if (!data.content) {
            return null;
        }
        var currentNo = ((page - 1) * 20);
        var rows = data.content.map(item => {
            currentNo = currentNo + 1;
            return (
                // here is table body / Row
                <tr key={item.id}>
                    <td>{currentNo}</td>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>{item.position}</td>
                    <td>{item.gender}</td>
                    <td>{item.note}</td>
                    {/* <td>{item.trustLevel}</td> */}
                    {/* <td className="active-font" target={item.company?"YES":"NO"}>{item.company?"YES":"NO"}</td> */}
                    <td className="text-center footable-visible footable-last-column">
                        <ul className="icons-list">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="icon-menu9"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                    {/* <SecuredComponent allowedPermission="admin.contactDetail.update"> */}
                                        <li><a onClick={() => this.handleShowmodal(item.id)}><i className="icon-pencil"></i>Sửa Thông Tin</a></li>
                                    {/* </SecuredComponent> */}
                                    {/* <SecuredComponent allowedPermission="admin.contactDetail.delete"> */}
                                        <li><a onClick={() => this.deleteContactDetail(item.id)}><i className="icon-cross2"></i>Xóa</a></li>
                                    {/* </SecuredComponent> */}
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
                            <span className="text-semibold">Danh sách Liên Hệ</span>
                            <span className="pull-right">
                                {/* <SecuredComponent allowedPermission="admin.contactDetail.create"> */}
                                    <button className="btn bg-success" onClick={() => this.handleShowmodal()}>Thêm Mới</button>
                                {/* </SecuredComponent> */}
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
                                                <input type="text" className="form-control input-xlg" placeholder="Tên Liên Hệ, Mã Số Thuế, Số Điện Thoại 1, Người Liên Hệ..." name="search" defaultValue={search} autoFocus={true} />
                                                <div className="form-control-feedback">
                                                    <i className="icon-search4 text-muted text-size-base"></i>
                                                </div>
                                            </div>
                                            <div className="input-group-btn">
                                                <button type="submit" className="btn bg-green btn-xlg">Tìm</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            {this.state.isContactDetailModalShown ? <ModalContactDetail title="Liên Hệ" idContactDetail={this.state.idContactDetail} show={this.state.isContactDetailModalShown} onHide={this.handleHidemodal} /> : null}

                            <div className="panel panel-flat">
                                <table className="table table-togglable table-hover">
                                    <thead>
                                        <tr className="bg-success">
                                            <th data-toggle="true">STT</th>
                                            <th data-toggle="true">Tên</th>
                                            <th data-hide="phone">Số Điện Thoại</th>
                                            <th data-hide="phone">Email</th>
                                            <th data-hide="phone">Vị Trí</th>
                                            <th data-hide="phone">Giới Tính</th>
                                            <th data-hide="phone">Ghi Chú</th>
                                            <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>
                            <TablePagination data={data} baseUrl="/listContactDetail" />
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default translate('translations')(ContactDetailList);