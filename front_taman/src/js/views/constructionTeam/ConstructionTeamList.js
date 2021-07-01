import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { ScriptUtils, UrlUtils } from '../../utils/javascriptUtils';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import { Link } from 'react-router-dom';
import ModalConstructionTeam from './ModalConstructionTeam';
import SecuredComponent from '../../components/SecuredComponent';

class ConstructionTeamList extends React.Component {
    constructor() {
        super();
        this.state = {
            listConstructionTeam: null,
            isConstructionTeamModalShown: false,
            listAllCompanys: []
                }
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isConstructionTeamModalShown: false });
            this.updateListConstructionTeam();
        };




    };

    updateListConstructionTeam() {
        var search = qs.parse(this.props.location.search).search;
        search = search ? search : "";
        var page = qs.parse(this.props.location.search).page;
        this.getListCompany();
        var company = qs.parse(this.props.location.search).company;
        company = company ? company : "ALL";
        let setStateInRequest = (list) => { this.setState({ listConstructionTeam: list }) }
        return agent.asyncRequests.getPage('/constructionTeam/findByCompanyIdAndLeaderNameOrPhoneOrSpecialize?companyId=' + company + "&leaderNameOrPhoneOrSpecialize=" + search, page
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
        var search = qs.parse(this.props.location.search).search;
        search = search ? search : "";
        var page = qs.parse(this.props.location.search).page;
        this.getListCompany();
        var company = qs.parse(this.props.location.search).company;
        company = company ? company : "ALL";
        let setStateInRequest = (list) => { this.setState({ listConstructionTeam: list }) }
        return agent.asyncRequests.getPage('/constructionTeam/findByCompanyIdAndLeaderNameOrPhoneOrSpecialize?companyId=' + company + "&leaderNameOrPhoneOrSpecialize=" + search, page
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
    getListCompany() {
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
    componentDidUpdate() {
        ScriptUtils.loadFootable();
    }
    //Delete ConstructionTeam Function
    deleteConstructionTeam(id) {

        if (confirm("Bạn có chắc sẽ xoá !")) {
            var url = `/constructionTeam/${id}`;
            return agent.asyncRequests.del(url
            ).then(function (res) {
                var result = res.body.resultData;
                if (result && !result.error) {
                    alert("Xoá Thành Công !");
                    window.location.reload(true);
                } else {
                    toast.error("Có lỗi khi xóa dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Không thể xóa dữ liệu đang được sử dụng từ màn hình khác! ", { autoClose: 15000 });
            });
        } else {
        }
    }

    handleShowmodal(id) {
        this.setState({
            isConstructionTeamModalShown: true,
            idConstructionTeam: id
        });

    }


    render() {
        const data = this.state.listConstructionTeam;
        if (!data) {
            return null;
        }
        var currentNo = 0;
        var page = qs.parse(this.props.location.search).page;
        if (!page) {
            page = 1;
        }
        var baseUrl = UrlUtils.getPathWithParamsNotPaging()
        var currentNo = ((page - 1) * 20);
        var rows = data.content.map(item => {
   currentNo++

            return (
                <tr key={item.id}>
                    <td>{currentNo}</td>
                    
                    {/* <td><Link onClick={() => <SecuredComponent allowedPermission="admin.constructionTeam.update"> {this.handleShowmodal(item.id)}</SecuredComponent>}>{item.teamLeaderName}</Link></td> */}
                    <td>{item.teamLeaderName}</td>
                    <td>{item.company?item.company.name:null}</td>
                    <td>{item.specialize}</td>
                    <td>{item.leaderPhoneNumber}</td>
                    <td>{item.note}</td>
                    <td className="text-center footable-visible footable-last-column">
                        <ul className="icons-list">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="icon-menu9"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                <SecuredComponent allowedPermission="admin.constructionTeam.update"> 
                                        <li><a onClick={() => this.handleShowmodal(item.id)}><i className="icon-pencil"></i>Chỉnh Sửa</a></li>
                                    </SecuredComponent>
                                    <SecuredComponent allowedPermission="admin.constructionTeam.delete"> 
                                        <li><a onClick={() => this.deleteConstructionTeam(item.id, item.fullName)}><i className="icon-cross2"></i>Xóa</a></li>
                                    </SecuredComponent>
                                </ul>
                            </li>
                        </ul>
                    </td>
                </tr>);
        });

        const dataCompany = this.state.listAllCompanys;
        if (!dataCompany) {
            return null;
        }
        var search = qs.parse(this.props.location.search).search;
        var company = qs.parse(this.props.location.search).company;
        if (!company) {
            company = "ALL";
        }
        var optionCompany = [];
        dataCompany.map(item => {
            optionCompany.push({ label: item.name, value: item.id })
        })

        return (

            <div className="content-wrapper">


                <div className="content">
                    <div className="page-header">
                        <h4>
                            <i className=" icon-paragraph-justify2 position-left"></i>
                            <span className="text-semibold">Danh sách Đội Thi Công</span>
                            <span className="pull-right">
                                <SecuredComponent allowedPermission="admin.constructionTeam.create">
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
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="control-label col-md-3" htmlFor="company">Công Ty</label>
                                                <div className="col-md-9">
                                                    <select placeholder="Tất cả" className="select form-control" name="company" defaultValue={company}>
                                                        <option key="ALL" value="ALL">Tất cả</option>
                                                        {optionCompany.map(company => <option key={company.value} value={company.value}>{company.label}</option>)}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="input-group content-group">
                                            <div className="has-feedback has-feedback-left">
                                                <input type="text" className="form-control input-xlg" placeholder="Tìm kiếm theo: Tên Đội Trưởng, Số điện thoại,Công Việc..." name="search" defaultValue={search} autoFocus={true} />
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
                            {this.state.isConstructionTeamModalShown ? <ModalConstructionTeam title="Đội Thi Công" idConstructionTeam={this.state.idConstructionTeam} show={this.state.isConstructionTeamModalShown} onHide={this.handleHidemodal} /> : null}

                            <div className="panel panel-flat">
                                <table className="table table-togglable table-hover">
                                    <thead>
                                        <tr className="bg-teal">
                                            <th data-toggle="true">STT</th>
                                            {/* <th data-hide="phone">Hình Ảnh</th> */}
                                            <th data-toggle="true">Tên Đội Trưởng</th>
                                            <th data-hide="phone">Công Ty</th>
                                            <th data-hide="phone">Chuyên Môn</th>
                                            <th data-hide="phone">Số Điện Thoại</th>
                                            <th data-hide="phone">Ghi Chú</th>
                                            <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>
                            <TablePagination data={data} baseUrl={baseUrl} />
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}

export default translate('translations')(ConstructionTeamList);