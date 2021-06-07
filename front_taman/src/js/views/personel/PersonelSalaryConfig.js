import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { ScriptUtils, UrlUtils, FormatterUtils } from '../../utils/javascriptUtils';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import { Link } from 'react-router-dom';
import ModalPersonel from './ModalPersonel';
import SecuredComponent from '../../components/SecuredComponent';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { RenderSelect, RenderSwitch } from '../../components/formInputs';
import { PermanentCacheService } from '../../services/middleware';



const selector = formValueSelector("PersonelSalaryConfig");

const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
    companyIdSelector: selector(state, "companyId"),
    activeSelector: selector(state, "active")


});

const mapDispatchToProps = dispatch => ({
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "PersonelSalaryConfig", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});

class PersonelSalaryConfig extends React.Component {
    constructor() {
        super();
        let initialCompanyId = 'ALL'
            initialCompanyId = PermanentCacheService.getItem("selected_personal_companyId") ? PermanentCacheService.getItem("selected_personal_companyId") : initialCompanyId;
        let initialActive = true
            initialActive = PermanentCacheService.getItem("selected_personal_active") ? PermanentCacheService.getItem("selected_personal_active"): initialActive;
        this.state = {
            listPersonel: null,
            isPersonelModalShown: false,
            listAllCompanys: [],
            isSalaryConfig: false,
            companyId: initialCompanyId,
            active: initialActive

        }
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isPersonelModalShown: false });
            this.updateListPersonel();
        };
        this.setPermanentCache = (companyIdValue, activeValue) => {
            if (companyIdValue) {
                PermanentCacheService.setItem("selected_personal_companyId", companyIdValue);
            }
            if (activeValue) {
                PermanentCacheService.setItem("selected_personal_active", activeValue);
            }


            this.setState({
                companyId: companyIdValue ? companyIdValue : this.state.companyId,
                active: activeValue != null  ? activeValue : this.state.active,
            }, () => this.updateListPersonel());


        };

    };

    updateListPersonel() {
        const { companyId, active} = this.state;
        var search = qs.parse(this.props.location.search).search;
        search = search ? search : "";
        var page = qs.parse(this.props.location.search).page;
        this.getListCompany();
        // var company = company ? company : "ALL";
        // var active = active != null ? active : true
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
        const { companyId, active} = this.state;
        updateField("companyId", companyId);
        updateField("active", active);
        // var search = qs.parse(this.props.location.search).search;
        // search = search ? search : "";
        // var page = qs.parse(this.props.location.search).page;
        // this.getListCompany();
        // var company = qs.parse(this.props.location.search).company;
        // company = company ? company : "ALL";
        // let setStateInRequest = (list) => { this.setState({ listPersonel: list }) }
        // return agent.asyncRequests.getPage('/user/findByCompanyIdAndFullNameOrPhoneOrEmail?companyId=' + company + "&fullNameOrPhoneOrEmail=" + search, page
        // ).then(function (res) {
        //     var result = res.body.resultData;
        //     if (result) {
        //         setStateInRequest(result);
        //     } else {
        //         toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
        //     }
        // }, function (err) {
        //     toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        // });
        this.updateListPersonel();
    };
    componentDidUpdate() {
        ScriptUtils.loadFootable();
        ScriptUtils.loadFormLayout();
        ScriptUtils.loadLibrary("/assets/js/scroll-bar/double-scrollbar.js");
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
            isSalaryConfig: true,
            isPersonelModalShown: true,
            idUser: id
        });

    }
    render() {
        var baseUrl = UrlUtils.getPathWithParamsNotPaging();
        const { currentUser, activeSelector, companyIdSelector } = this.props;
        const data = this.state.listPersonel;
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
                    
                    <td>{item.code} || {item.fullName}<br/> <sub>{item.email}</sub><br/><sub>{item.phone}</sub><br/><sub>{  item.company ?  item.company.name +" - "+ item.position : null}</sub></td>
                    {/* <td>{item.permanentAddress}</td> */}
                    <td>{FormatterUtils.formatCurrency(item.salaryLevel)}</td>
                    <td>{FormatterUtils.formatCurrency(item.responsibilityAllowance)}</td>
                    <td>{FormatterUtils.formatCurrency(item.insuranceSalary)}</td>
                    <td>{FormatterUtils.formatCurrency(item.normalOvertimeFee)}</td>
                    <td>{FormatterUtils.formatCurrency(item.weekendOvertimeFee)}</td>
                    <td>{FormatterUtils.formatCurrency(item.holidayOvertimeFee)}</td>
                    <td>{FormatterUtils.formatCurrency(item.personalDeduction)}</td>
                    <td>{FormatterUtils.formatCurrency(item.familyCircumstanceDeduction)}</td>
                    <td>{FormatterUtils.formatCurrency(item.lunchFee)}</td>
                    <td>{FormatterUtils.formatCurrency(item.petrolFee)}</td>
                    <td>{FormatterUtils.formatCurrency(item.phoneFee)}</td>
                    <td>{FormatterUtils.formatCurrency(item.distanceSupportFee)}</td>
                    <td className="text-center footable-visible footable-last-column">
                        <ul className="icons-list">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="icon-menu9"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                    <SecuredComponent allowedPermission="admin.userSalaryConfig.update">
                                        <li><a onClick={() => this.handleShowmodal(item.id)}><i className="icon-pencil"></i>Sửa</a></li>
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
        // var company = qs.parse(this.props.location.search).company;
        // if (!company) {
            // company = "ALL";
        // }
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
                            <span className="text-semibold">Cấu Hình Lương Nhân Sự</span>
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
                                                    {/* <select placeholder="Tất cả" className="select form-control" name="company" defaultValue={company}>
                                                        <option key="ALL" value="ALL">Tất cả</option>
                                                        {optionCompany.map(company => <option key={company.value} value={company.value}>{company.label}</option>)}
                                                    </select> */}
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
                                                    <button type="submit" className="btn bg-green btn-xlg">Tìm</button>
                                                </div>

                                            </div>

                                        </div>
                                    </form>
                                </div>
                            </div>
                            {this.state.isPersonelModalShown ? <ModalPersonel title="Cấu Hình Lương" isSalaryConfig={this.state.isSalaryConfig} idUser={this.state.idUser} show={this.state.isPersonelModalShown} onHide={this.handleHidemodal} /> : null}
                            <div style={{position:'sticky',top:0,zIndex:1}} className="scroll-wrapper1">
                             <div className="div-scroll-1"></div>
                                 </div>
                          <div style={{overflow:'auto'}} className="panel panel-flat scroll-wrapper2">
                                <table  className="table table-bordered">
                                    <thead>
                                        <tr className="bg-green">
                                            <th data-toggle="true">STT</th>
                                            <th data-toggle="true"><center>Thông Tin</center></th>
                                            <th data-hide="phone"><center>Mức Lương</center></th>
                                            <th data-hide="phone"><center>Phụ Cấp Trách Nhiệm</center></th>
                                            <th data-hide="phone"><center>Lương Đóng Bảo Hiểm</center></th>
                                            <th data-hide="phone"><center>Tiền Tăng Ca Thường</center></th>
                                            <th data-hide="phone"><center>Tiền Tăng Ca Cuối Tuần</center></th>
                                            <th data-hide="phone"><center>Tiền Tăng Ca Lễ</center></th>
                                            <th data-hide="phone"><center>Giảm Trừ Bản Thân</center></th>
                                            <th data-hide="phone"><center>Giảm Trừ Gia Cảnh</center></th>
                                            <th data-hide="phone"><center>Tiền Ăn Trưa</center></th>
                                            <th data-hide="phone"><center>Tiền Xăng Xe</center></th>
                                            <th data-hide="phone"><center>Tiền Điện Thoại</center></th>
                                            <th data-hide="phone"><center>Tiền Đi Công Trường</center></th>
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
            form: 'PersonelSalaryConfig',
            destroyOnUnmount: true,
            enableReinitialize: true,
        })(PersonelSalaryConfig)));