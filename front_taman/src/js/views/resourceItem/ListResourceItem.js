import qs from 'query-string';
import React from 'react';
import { translate } from 'react-i18next';
import { toast } from 'react-toastify';
import { Field,reduxForm } from 'redux-form';
import SecuredComponent from '../../components/SecuredComponent';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import ModalResourceItem from './ModalResourceItem';
import { RenderDatePicker, RenderInputWithDiv, RenderSelect } from '../../components/formInputs';
import { connect } from 'react-redux';
import { ScriptUtils, UrlUtils } from '../../utils/javascriptUtils';
import { LoadingScreen } from '../../components/commonWidgets';


const mapStateToProps = state => ({
    currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
    updateField: (fieldName, value) =>
    dispatch({
        meta: { form: "ListResourceItem", field: fieldName },
        payload: value,
        type: "@@redux-form/CHANGE"
    }),
});

class ListResourceItem extends React.Component {
    constructor() {
        super();
        this.state = {
            isShowModalDocuument: false,
            listResourceItem: null,
            listAllUser: null,

        }
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isShowModalDocuument: false });
            this.updateListResourceItem();
        };




    };

    updateListResourceItem(values) {

        var page = qs.parse(this.props.location.search).page;
        var type = "ALL";
        var userId = "ALL";
        var search = "";

        if(values){
            values.type ? values.type : type;
            values.userId ?  values.userId  : userId;
            values.search ? search =  values.search : search;
        }
        let setStateInRequest = (list) => { this.setState({ listResourceItem: list }) }
        return (agent.asyncRequests.getPage("/resourceItem/list?search=" + search
        + "&type=" + type
        + "&userId=" + userId 
        , page
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            }
            else {
                toast.error("C?? l???i khi t???i d??? li???u. L???i: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("C?? l???i khi t???i d??? li???u. Qu?? kh??ch vui l??ng ki???m tra k???t n???i internet v?? th??? l???i. Ho???c li??n h??? qu???n tr??? vi??n.", { autoClose: 15000 });
        }))
    }

    getAllUser() {

        let setStateInRequest = (list) => { this.setState({ listAllUser: list }) }
        return (agent.UserApi.listAllPersonel(
        ).then(function (res) {
            var result = res.resultData;
            if (result) {
                setStateInRequest(result);
            }
            else {
                toast.error("C?? l???i khi t???i d??? li???u. L???i: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("C?? l???i khi t???i d??? li???u. Qu?? kh??ch vui l??ng ki???m tra k???t n???i internet v?? th??? l???i. Ho???c li??n h??? qu???n tr??? vi??n.", { autoClose: 15000 });
        }))
    }

    componentWillMount() {
        this.updateListResourceItem();
        this.getAllUser();
        
    };

    componentDidUpdate() {
        ScriptUtils.loadFootable();
        ScriptUtils.loadFormLayout();
    }

    //Delete ResourceItem Function
    deleteResourceItem(id,name) {
        var _this = this;
        var url = `/resourceItem/${id}`;
            return agent.asyncRequests.del(url
            ).then(function (res) {
                var result = res.body.resultData;
                if (result && !result.error) {
                    toast.info("X??a Th??nh C??ng!", { autoClose: 4000 });
                    _this.updateListResourceItem();
                } else {
                    toast.error("C?? l???i khi x??a d??? li???u. L???i: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Kh??ng th??? x??a d??? li???u ??ang ???????c s??? d???ng t??? m??n h??nh kh??c! ", { autoClose: 15000 });
            });
    }

    handleShowmodal(id) {
        this.setState({
            isShowModalDocuument: true,
            idResourceItem: id
        });

    }


    render() {
        
        const {handleSubmit , t} = this.props;
        const data = this.state.listResourceItem;
        const dataUser = this.state.listAllUser;
        let optionUser = [{label : "T???t C???" , value : "ALL"}];
        let optionType = [
            {label : "T???t C???" , value : "ALL"},
            {label : "Trang Thi???t B??? - D???ng C??? " , value :"DEVICE"},
            {label : "Ph??ng" , value :"ROOM"},
            {label : "T??i Nguy??n Kh??c" , value :"OTHER"}
        ];
        if (!data) {
            return <LoadingScreen></LoadingScreen>;
        }
        if(dataUser){
            dataUser.map(item => {
                optionUser.push({label : item.fullName , value : item.id})
            })
        }
        var currentNo = 0;
        var page = qs.parse(this.props.location.search).page;
        if (!page) {
            page = 1;
        }
        var currentNo = ((page - 1) * 50);
        var rows = data.content.map(item => {
            currentNo++;
            return (
                <tr key={item.id}>
                    <td>{currentNo}</td>
                    <td>{item.name }</td>
                    <td>
                    {(function() {
                    if (item.swotType === 'DEVICE') {
                      return (
                        (
                            <span class="label label-primary">{t(item.resourceType)}</span>
                        )
                      )
                    }else if(item.swotType === 'ROOM'){
                        return (
                            (
                                <span class="label label-danger">{t(item.resourceType)}</span>
                            )
                    )}else{
                        return (
                            (
                                <span class="label label-warning">{t(item.resourceType)}</span>
                            )
                    )}
                  })()}
                    </td>
                    <td>{item.responsibleUser ? item.responsibleUser.fullName : "" }</td>
                    <td>{item.description }</td>
                    <td className="text-center footable-visible footable-last-column">
                        <ul className="icons-list">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="icon-menu9"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                <SecuredComponent allowedPermission="admin.department.update">
                                    <li><a onClick={() => this.handleShowmodal(item.id)}><i className="icon-pencil"></i>Ch???nh S???a</a></li>
                                </SecuredComponent>
                                <SecuredComponent allowedPermission="admin.department.delete">
                                    <li><a onClick={() => this.deleteResourceItem(item.id,item.name)}><i className="icon-cross2"></i>X??a</a></li>
                                </SecuredComponent>
                                </ul>
                            </li>
                        </ul>
                    </td>
                </tr>);
        });

        return (
            <div className="content-wrapper">
                <div className="page-header page-header-default">
                <div className="breadcrumb-line">
                    <ul className="breadcrumb">
                        <li><a href=""><i className="icon-home2 position-left"></i> Home</a> </li>
                        <li className="active">Th??ng Tin - H??nh Ch??nh</li>
                        <li className="active">Danh S??ch T??i Nguy??n</li>
                    </ul>
                    <div className="heading-elements">
                        <div className="heading-btn-group">
                        <SecuredComponent allowedPermission="admin.department.create">
                            <button className="btn bg-teal" onClick={() => this.handleShowmodal()}>Th??m M???i</button>
                        </SecuredComponent>
                        </div>
                    </div>
                </div>
                </div>
                <div className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-flat">

                                <div className="panel-body">
                                <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.updateListResourceItem)}>
                                        
                                            <div className="col col-md-2">
                                                <Field label="T??? Ng??y" name="fromDate" component={RenderDatePicker}></Field>
                                            </div>
                                            <div className="col col-md-2">
                                                <Field label="?????n Ng??y" name="toDate" component={RenderDatePicker}></Field>
                                            </div>
                                            
                                            <div className="col-md-3">
                                                <Field label="Ph??n Lo???i" name="type" options={optionType}  component={RenderSelect}></Field>
                                            </div>

                                            <div className="col-md-1"></div>
                                            <div className="col-md-3">
                                                <Field label="Ng?????i Qu???n L??" name="userId"   options={optionUser} component={RenderSelect}></Field>
                                            </div>
                                            <div className="col-md-9">
                                                <Field name="search" placeholder="T??m theo ?????nh danh t??i nguy??n..." component={RenderInputWithDiv}></Field>
                                            </div>
                                            {/* <div className="form-group-btn col-md-1"  style={{ paddingTop: "28px" }}>
                                                <button type="submit" className="btn bg-teal btn-xlg">T??m Ki???m</button>
                                            </div> */}

                                            {/* <div className="col-md-3">
                                                <Field name="search" label="N???i dung" placeholder="T??m Theo n???i dung, ghi ch??..." component={RenderInputWithDiv}></Field>
                                            </div> */}
                                            
                                            <div className="col-md-3" >
                                                <div className="pull-left">
                                                    <button type="submit" className="btn bg-teal btn-xlg">T??M KI???M</button>
                                                </div>
                                            </div>
                                        
                                    </form>
                                </div>
                            </div>
                            {this.state.isShowModalDocuument ? <ModalResourceItem title="N??m" idResourceItem={this.state.idResourceItem} show={this.state.isShowModalDocuument} onHide={this.handleHidemodal} /> : null}

                            <div className="panel panel-flat">
                                <table className="table table-togglable table-bordered">
                                    <thead>
                                        <tr className="bg-teal">
                                            <th width="5%" data-toggle="true">STT</th>
                                            <th width="30%" data-toggle="true">?????nh Danh T??i Nguy??n</th>
                                            <th width="15%" data-toggle="true">Ph??n Lo???i</th>
                                            <th width="15%" data-toggle="true">Ng?????i Qu???n L??</th>
                                            <th width="30%" data-toggle="true">M?? T???</th>
                                            <th width="5%" className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>
                            <TablePagination data={data} baseUrl={UrlUtils.getPathWithParamsNotPaging()} />
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
            form: 'ListResourceItem',
            destroyOnUnmount: true,
            enableReinitialize: true,
        })(ListResourceItem)));