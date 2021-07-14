import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { ScriptUtils, UrlUtils, SecurityUtils } from '../../utils/javascriptUtils';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import ModalPersonel from './ModalPersonel';
import SecuredComponent from '../../components/SecuredComponent';
import { connect } from 'react-redux';
import { LoadingScreen } from '../../components/commonWidgets';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { RenderSelect, RenderSwitch } from '../../components/formInputs';
import { PermanentCacheService } from '../../services/middleware';


const selector = formValueSelector("PersonelList");
const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
    companyIdSelector: selector(state, "companyId"),
    activeSelector: selector(state, "active")


});

const mapDispatchToProps = dispatch => ({
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "PersonelList", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});
class PersonelList extends React.Component {
    constructor() {
        super();
        let initialCompanyId = 'ALL'
        initialCompanyId = PermanentCacheService.getItem("selected_personal_companyId") ? PermanentCacheService.getItem("selected_personal_companyId") : initialCompanyId;
        let initialActive = true
        initialActive = PermanentCacheService.getItem("selected_personal_active") !=null ? PermanentCacheService.getItem("selected_personal_active") : initialActive;
        this.state = {
            listPersonel: null,
            isPersonelModalShown: false,
            isShownSetupAnnualLeaveModal: false,
            listAllCompanys: [],
            companyId: initialCompanyId,
            active: initialActive,
            userDto: null
        }
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.updateListPersonel = this.updateListPersonel.bind(this);
        this.handleHidemodal = () => {
            this.setState({
                isPersonelModalShown: false,
                isShownSetupAnnualLeaveModal: false,
            });
            this.updateListPersonel();
        };
        this.handleSetAnnualLeaveForAllUser = (user) => {
            this.setState({
                isShownSetupAnnualLeaveModal: true,
                userDto : user
            })
        }
        this.setPermanentCache = (companyIdValue, activeValue) => {
            if (companyIdValue) {
                PermanentCacheService.setItem("selected_personal_companyId", companyIdValue);
            }
            if (activeValue !=null) {
                PermanentCacheService.setItem("selected_personal_active", activeValue);
            }
            this.setState({
                companyId: companyIdValue ? companyIdValue : this.state.companyId,
                active: activeValue !=null ? activeValue : this.state.active,
            }, () => this.updateListPersonel());
        };
    };
    updateListPersonel() {
        const { companyId, active} = this.state;
        var search = qs.parse(this.props.location.search).search;
        search = search ? search : "";
        var page = qs.parse(this.props.location.search).page;
        this.getListCompany();
        
        let setStateInRequest = (list) => { this.setState({ listPersonel: list }) }
        return agent.asyncRequests.getPage('/user/findByCompanyIdAndFullNameOrPhoneOrEmail?companyId=' + companyId + "&fullNameOrPhoneOrEmail=" + search + "&isActive=" + active, page
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
    componentWillMount() {
        const { updateField } = this.props;
        const { companyId, active } = this.state;
        updateField("companyId", companyId);
        updateField("active", active);
        
        this.updateListPersonel();
    };
    componentDidUpdate() {
        ScriptUtils.loadFootable();
        ScriptUtils.loadFormLayout();
    }
    //Delete Personel Function
    deletePersonel(id, fullName) {

        if (confirm("Bạn có chắc sẽ xoá Nhân Viên: " + "'" + fullName + "'")) {
            var url = `/user/${id}`;
            return agent.asyncRequests.del(url
            ).then(function (res) {
                var result = res.body.resultData;
                if (result && !result.error) {
                    alert("Xoá Thành Công Nhân Viên: " + fullName);
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

            isPersonelModalShown: true,
            idUser: id
        });

    }
    render() {
        var baseUrl = UrlUtils.getPathWithParamsNotPaging();
        const data = this.state.listPersonel;
        const { currentUser, activeSelector, companyIdSelector } = this.props;
        if (!currentUser) {
            return <LoadingScreen></LoadingScreen>
        }
        if (!data) {
            return null;
        }

        var currentNo = 0;
        var page = qs.parse(this.props.location.search).page;
        if (!page) {
            page = 1;
        }
        var currentNo = ((page - 1) * 20);
        var rows = data.content.map(item => {
            currentNo++
            return (
                <tr key={item.id}>
                    <td>{currentNo}</td>
                   

                    <td style={{ whiteSpace: 'nowrap' }} >{item.code} || {item.fullName}</td>
                    <td>{item.email}<br />{item.phone}</td>
                    <td>{item.currentAddress}</td>
                    <td>{item.company ? item.company.name : null}</td>
                    <td>{item.annualLeaveYear}</td>
                    <td className="active-status">
                        {item.active ?
                            <i className="icon-circle-small" style={{ color: "green" }}></i> :
                            <i className="icon-circle-small" style={{ color: "red" }}></i>
                        }
                    </td>
                    <td className="text-center footable-visible footable-last-column">
                        <ul className="icons-list">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="icon-menu9"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                    {SecurityUtils.hasPermission(currentUser, "admin.users.update") || currentUser.id == item.id ?
                                        <li><a onClick={() => this.handleShowmodal(item.id)}><i className="icon-pencil"></i>Sửa</a></li> : null}
                                    <SecuredComponent allowedPermission="admin.users.delete">
                                        <li><a onClick={() => this.deletePersonel(item.id, item.fullName)}><i className="icon-cross2"></i>Xóa</a></li>
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

        var optionCompany = [{ label: "Tất Cả", value: "ALL" }];
        dataCompany.map(item => {
            optionCompany.push({ label: item.name, value: item.id })
        })
        return (

            <div className="content-wrapper">


                <div className="content">
                    <div className="page-header">
                        <h4>
                            <i className=" icon-paragraph-justify2 position-left"></i>
                            <span className="text-semibold">Danh sách Nhân Viên</span>
                            <span className="pull-right">
                                <SecuredComponent allowedPermission="admin.users.create">
                                    <button style={{ marginLeft: '10px' }} className="btn bg-teal" onClick={() => this.handleShowmodal()}>Thêm Mới</button>
                                </SecuredComponent>
                            </span>
                        </h4>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-flat">

                                <div className="panel-body">
                                    <form className="main-search" role="form">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label className="control-label col-md-1" htmlFor="company">Công Ty</label>
                                                <div className="col-md-3">
                                                    <Field onChangeAction={(value) => this.setPermanentCache(value, activeSelector)} options={optionCompany} placeholder="Tất cả" component={RenderSelect} name="companyId" ></Field>
                                                </div>
                                                <label style={{ width: '105px' }} className="control-label col-md-2" htmlFor="active">TT Hoạt Động </label>
                                                <div className="col-md-3">
                                                    <Field onChangeAction={(value) => this.setPermanentCache(companyIdSelector, value)} component={RenderSwitch} name="active" ></Field>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div style={{ height: 80 }}></div>
                                            <div className="input-group content-group">
                                                <div className="has-feedback has-feedback-left">
                                                    <input type="text" className="form-control input-xlg" placeholder="Tìm kiếm theo: Tên nhân viên,Số điện thoại,Email" name="search" defaultValue={search} autoFocus={true} />
                                                    <div className="form-control-feedback">
                                                        <i className="icon-search4 text-muted text-size-base"></i>
                                                    </div>
                                                </div>

                                                <div className="input-group-btn">
                                                    <button type="submit" className="btn bg-teal btn-xlg">Tìm</button>
                                                </div>

                                            </div>

                                        </div>

                                    </form>
                                </div>
                            </div>
                            {this.state.isPersonelModalShown ? <ModalPersonel title="Nhân Viên" idUser={this.state.idUser} show={this.state.isPersonelModalShown} onHide={this.handleHidemodal} /> : null}

                            <div className="panel panel-flat">
                                <table style={{ textAlign: 'center' }} className="table table-xxs">
                                    <thead>
                                        <tr className="bg-teal">
                                            <th data-toggle="true">STT</th>
                                            <th data-toggle="phone"><center>Mã Nhân Viên & Họ Tên</center></th>
                                            <th data-hide="phone"><center>Liên Hệ</center></th>
                                            <th data-hide="phone"><center>Địa chỉ Hiện Tại</center></th>
                                            <th data-hide="phone"><center>Công Ty </center></th>
                                            <th data-hide="phone"><center>Ngày Phép / Năm</center></th>
                                            <th data-hide="phone"><center>Trạng Thái</center></th>
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

export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'PersonelList',
            destroyOnUnmount: true,
            enableReinitialize: true,
        })(PersonelList)));