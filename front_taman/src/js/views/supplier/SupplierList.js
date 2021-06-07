import qs from 'query-string';
import React from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import SecuredComponent from '../../components/SecuredComponent';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import { PermanentCacheService } from '../../services/middleware';
import { ScriptUtils, UrlUtils } from '../../utils/javascriptUtils';
import ModalSupplier from './ModalSupplier';
import { RenderSelect } from '../../components/formInputs';

const validate = values => {
    const errors = {};
}
const mapStateToProps = state => {
    return {
        currentUser: state.common.currentUser,
       
    };
};
const mapDispatchToProps = dispatch => ({
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "SupplierList", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});
class SupplierList extends React.Component {
    
    constructor() {
        super();
        let initialSupplierType = 'ALL'
        initialSupplierType = PermanentCacheService.getItem("selected_supplier_supplierType") ? PermanentCacheService.getItem("selected_supplier_supplierType") : initialSupplierType;
        this.state = {
            listSupplier: null,
            isSupplierModalShown: false,
            supplierType:initialSupplierType
        }
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isSupplierModalShown: false });
            this.updateListSupplier();
        };
        this.setPermanetCache=(supplierType)=>{
            if(supplierType){
                PermanentCacheService.setItem("selected_supplier_supplierType",supplierType);
            }
            this.setState({
                supplierType: supplierType ? supplierType:this.state.supplierType,
            },()=>this.updateListSupplier());
    };
    };
    updateListSupplier() {
        const {supplierType} = this.state;
        var search = qs.parse(this.props.location.search).search;
        var page = qs.parse(this.props.location.search).page;
        if(!search){
            search = ""
        }
        let setStateInRequest = (list) => { this.setState({ listSupplier: list }) }
        return (agent.asyncRequests.getPage("/supplier/list?type="+supplierType+"&supplierName="+search,page).then(function (res) {
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
    }
    componentWillMount() {
        const {updateField} = this.props; 
        const supplierType = this.state.supplierType;
        updateField("supplierName",supplierType);
        this.updateListSupplier();
    };

    componentDidUpdate() {
        ScriptUtils.loadFootable();
    }

    //Delete Supplier Function
    deleteSupplier(id, fullName) {
        if (confirm("Bạn có chắc sẽ xoá !")) {
            var url = `/supplier/${id}`;
            return agent.asyncRequests.del(url
            ).then(function (res) {
                var result = res.body.resultData;
                if (result && !result.error) {
                    alert("Xoá Thành Công !");
                    window.location.reload(true);
                } else {
                    toast.error("Có lỗi khi xóa dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Không thể xóa dữ liệu đang được sử dụng từ màn hình khác! ", { autoClose: 15000 });
            });
        } else {
        }
    }

    handleShowmodal(id) {
        this.setState({
            isSupplierModalShown: true,
            idSupplier: id
        });
    }


    render() {
        const data = this.state.listSupplier;
        var baseUrl = UrlUtils.getPathWithParamsNotPaging();
        const {t} =this.props;
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
                <tr key={item.id} style={{fontSize:"13px"}}>
                    <td>{currentNo}</td>
                    
                    <td style={{whiteSpace:'nowrap'}}>{t(item.type)}</td>
                    <td >{item.name}</td>
                    <td >{item.productProvideName}</td>
                    <td>{item.address}</td>
                    <td>{item.email}<br/>{item.phoneNumber}</td>
                    <td>{item.bankAccountNumber}</td>
                    <td>{item.note}</td>
                    <td className="text-center footable-visible footable-last-column">
                        <ul className="icons-list">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="icon-menu9"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                    <SecuredComponent allowedPermission="admin.supplier.update">
                                        <li><a onClick={() => this.handleShowmodal(item.id)}><i className="icon-pencil"></i>Chỉnh Sửa</a></li>
                                    </SecuredComponent>
                                    <SecuredComponent allowedPermission="admin.supplier.delete">
                                        <li><a onClick={() => this.deleteSupplier(item.id)}><i className="icon-cross2"></i>Xóa</a></li>
                                    </SecuredComponent>
                                </ul>
                            </li>
                        </ul>
                    </td>
                </tr>);
        });

        var search = qs.parse(this.props.location.search).search;
        var optionsType= [
            {label:"Tất Cả",value:"ALL"}
            ,{label:"Nhà Cung Cấp" ,value:"NHA_CUNG_CAP"},
            {label:"Thương Hiệu" ,value:"THUONG_HIEU"}]
        return (

            <div className="content-wrapper">
                <div className="content">
                    <div className="page-header">
                        <h4>
                            <i className=" icon-paragraph-justify2 position-left"></i>
                            <span className="text-semibold">Danh sách Nhà Cung Cấp</span>
                            <span className="pull-right">
                                <SecuredComponent allowedPermission="admin.supplier.create">
                                    <button className="btn bg-green" onClick={() => this.handleShowmodal()}>Thêm Mới</button>
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
                                                <label className="control-label col-md-1" htmlFor="company">Phân Loại</label>
                                                <div className="col-md-3">
                                                    <Field name="supplierName" options={optionsType} onChangeAction={(value)=> this.setPermanetCache(value)}  component={RenderSelect}></Field>
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
                            {this.state.isSupplierModalShown ? <ModalSupplier title="Nhà Cung Cấp" idSupplier={this.state.idSupplier} show={this.state.isSupplierModalShown} onHide={this.handleHidemodal} /> : null}
                            <div className="panel panel-flat">
                                <table style={{fontSize:"13px"}} className="table table-togglable table-bordered">
                                    <thead style={{textAlign:'center'}}>
                                        <tr className="bg-green">
                                            <th data-toggle="true">STT</th>
                                            <th width='10%' data-toggle="true">Phân Loại</th>
                                            <th width='10%' data-toggle="true">Nhà Cung Cấp</th>
                                            <th width='10%' data-toggle="true">Sản Phẩm Cung Cấp</th>
                                            <th width='20%' data-hide="phone">Địa Chỉ</th>
                                            <th width='20%' data-hide="phone">Liên Hệ </th>
                                            <th width='20%' data-hide="phone">Số Tài Khoản</th>
                                            <th width='10%' data-hide="phone">Ghi Chú</th>
                                            <th className="text-center footable-visible footable-last-column"><i className="icon-menu-open2"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody style={{textAlign:'center'}}>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <TablePagination data={data} baseUrl={baseUrl} />
                    </div>
                </div>
            </div>
            
        );
    }
}

export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'SupplierList',
            destroyOnUnmount: true,
            enableReinitialize: true,
        })(SupplierList)));