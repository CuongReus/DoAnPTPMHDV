import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import qs from 'query-string';
import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker, RenderCheckbox, RenderSelect, RenderPlainCheckbox } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { StringUtils, FormatterUtils } from '../../utils/javascriptUtils';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { isNull } from 'util';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ModalProjectDetail from '../projectDetail/ModalProjectDetail';
import ProgressRows from './ProgressRows'
import SecuredComponent from '../../components/SecuredComponent';
class ProjectDetailRows extends React.Component {
    constructor() {
        super();
        this.state = {
            idProjectDetail: null,
            isShowProgress: false,
            projectDetailDto: null,
            projectDetailObject: [],
            invoiceVer3Object: null,
            closeProjectObject: null

        }
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.handleHidemodal = this.handleHidemodal.bind(this);
        this.handleShowProgressDetail = this.handleShowProgressDetail.bind(this);
        this.handleHideProgressDetail = this.handleHideProgressDetail.bind(this);
        this.reloadProjectDetail = this.reloadProjectDetail.bind(this);
        this.getInvoiceVer3 = this.getInvoiceVer3.bind(this);
    };



    handleHideProgressDetail() {
        this.setState({
            isShowProgress: false
        })
    }
    reloadProjectDetail() {
        const { projectDetail } = this.props
        this.handleShowProgressDetail();
        this.props.onReloadProject();
        // reload project item info
        let setStateInRequest = (list) => { this.setState({ projectDetailObject: list }) }
        return agent.asyncRequests.get("/projectDetail/" + projectDetail.id).then(function (res) {
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
    // this handle use to get Invoice 3 to show send date
    getInvoiceVer3(){
        const { projectDetail } = this.props
        // reload project item info
        let setStateInRequest = (obj) => { this.setState({ invoiceVer3Object: obj }) }
        return agent.asyncRequests.get("/invoiceVer3/findByProjectDetailId?projectDetailId=" + projectDetail.id).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
              return null;
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }
     getCloseProject(){
        const { projectDetail } = this.props
        // reload project item info
        let setStateInRequest = (obj) => { this.setState({ closeProjectObject: obj }) }
        return agent.asyncRequests.get("/closeProject/findByProjectDetailId?projectDetailId=" + projectDetail.id).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
              return null;
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }
    handleShowProgressDetail() {
        var id = this.props.projectDetail.id;
        this.setState({ isShowProgress: true });
        this.getInvoiceVer3();
        this.getCloseProject();
        let setStateInRequest = (list) => { this.setState({ projectDetailDto: list }) }
        agent.asyncRequests.get("/projectDetailDto/findByProjectDetailId?projectDetailId=" + id
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
        const { projectDetail } = this.props;
        this.getInvoiceVer3();
        this.getCloseProject();
        let setStateInRequest = (list) => { this.setState({ projectDetailObject: list }) }
        return agent.asyncRequests.get("/projectDetail/" + projectDetail.id).then(function (res) {
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

    deleteProjectDetail(id) {
        const { onReloadProject } = this.props;
        if (confirm("Bạn có chắc sẽ xoá công việc này?")) {
            var url = `/projectDetail/${id}`;
            return agent.asyncRequests.del(url
            ).then(function (res) {
                var result = res.body.resultData;
                if (result && !result.error) {
                    toast.info("Đã xóa thành công dữ liệu.");
                    onReloadProject();
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
            isProjectDetailModalShown: true,
            idProjectDetail: id
        })
    }
    handleHidemodal() {
        this.setState({
            isProjectDetailModalShown: false
        });
        this.reloadProjectDetail();
        this.handleShowProgressDetail();
    }






    render() {
        
        const isShowProgress = this.state.isShowProgress;
        const projectDetailObject = this.state.projectDetailObject;
        var projectDetailDto = this.state.projectDetailDto;
        const invoiceVer3Object = this.state.invoiceVer3Object;
        const closeProjectObject = this.state.closeProjectObject;
        const currentNoFromProject = this.props.currentNoFromProject;
        const {t,itemCheckUnPaidObj} = this.props;
        if (!projectDetailObject) {
            return <LoadingScreen></LoadingScreen>
        }
       
        // if(projectDetailDto){
        //     alert(projectDetailDto.projectDetailStatus);
        // }
        let convertToNumberingScheme = (number)=> {
            var baseChar = ("A").charCodeAt(0),
                letters  = "";
          
            do {
              number -= 1;
              letters = String.fromCharCode(baseChar + (number % 26)) + letters;
              number = (number / 26) >> 0; // quick `floor`
            } while(number > 0);
          
            return letters;
          }
        if(currentNoFromProject){
            var currentNoConvert = convertToNumberingScheme(currentNoFromProject);
        }

      
        var rowsProgress =  projectDetailDto ? <SecuredComponent key={"permissionPR"+projectDetailObject.id} allowedPermission="admin.projectProgress.read">
        <ProgressRows onReloadProjectDetail={this.reloadProjectDetail}  key={"progressRows_"+projectDetailDto.id} projectDetailDto={projectDetailDto} ></ProgressRows>
        </SecuredComponent> :null



        return (
            [<tr key={"projectDetail_"+projectDetailObject.id} className="alpha-brown" >
                {/* TODO STT */}
                <td>
                <SecuredComponent allowedPermission="admin.projectProgress.read">
                    {isShowProgress ? null : <button className="bg-info icon-plus22 " onClick={() => this.handleShowProgressDetail()}></button>}
                    {isShowProgress ? <button className="bg-info icon-dash" onClick={() => this.handleHideProgressDetail()}></button> : null}
                    </SecuredComponent>
                </td>
                <td>{currentNoConvert}</td>
                <td colSpan="6"><a onClick={() => <SecuredComponent allowedPermission="admin.projectDetail.update">{this.handleShowmodal(projectDetailObject.id)}</SecuredComponent>}>{projectDetailObject.name}</a></td>
                <td>{itemCheckUnPaidObj 
                // ||  ( closeProjectObject && closeProjectObject.closed == false || !closeProjectObject)
                 ?<i style={{color:'red'}} className="icon-circles" ></i>: null}</td>
                <td style={{textAlign:'center'}}>
                    Số HĐ-3<br/>
                    <span style={invoiceVer3Object &&invoiceVer3Object.invoiceNumber ? {color:"#1976D2",fontSize:"11px"}: {color:'#FF8A65',fontSize:"11px"}}>{invoiceVer3Object &&  invoiceVer3Object.invoiceNumber ?invoiceVer3Object.invoiceNumber: "N/A"}</span> 
                   </td>
                <td style={{textAlign:'center'}}>Ngày Gửi<br/><span style={invoiceVer3Object &&invoiceVer3Object.sendDate ? {color:"#1976D2",fontSize:"11px"}: {color:'#FF8A65',fontSize:"11px"}}>{invoiceVer3Object &&  invoiceVer3Object.sendDate ?moment(invoiceVer3Object.sendDate).format("DD/MM/YYYY") : "N/A"}</span> </td>
                <td>
                    <SecuredComponent allowedPermission="admin.totalRevenue.check">
                        Tổng Doanh Thu: {FormatterUtils.formatCurrency(projectDetailObject.totalRevenue)}
                    </SecuredComponent>

                </td>
                <td>
                    <SecuredComponent allowedPermission="admin.totalRevenue.check">
                        Tổng Lợi Nhuận: {FormatterUtils.formatCurrency(projectDetailObject.totalProfit)}
                    </SecuredComponent>

                </td>
                <td><span style={projectDetailObject.projectDetailStatus!="DANG_THUC_THI" ?{color:'green'} :{color:'#42A5F5'} }>{t(projectDetailObject.projectDetailStatus)}</span></td>
                <td className="text-center footable-visible footable-last-column">
                    <ul className="icons-list">
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <i className="icon-menu9"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-right">
                            <SecuredComponent allowedPermission="admin.projectDetail.update">
                                <li><a onClick={() => this.handleShowmodal(projectDetailObject.id)}><i className="icon-pencil"></i>Sửa Công Việc</a></li>
                                </SecuredComponent>
                                <SecuredComponent allowedPermission="admin.projectDetail.delete">
                                <li><a onClick={() => this.deleteProjectDetail(projectDetailObject.id)}><i className="icon-cross2"></i>Xóa</a></li>
                                </SecuredComponent>
                            </ul>
                        </li>
                    </ul>
                </td>
                {this.state.isProjectDetailModalShown ? <ModalProjectDetail title="Công Tác" idProjectDetail={this.state.idProjectDetail} projectDto={this.props.projectDto} isCloseProject= {closeProjectObject&&closeProjectObject.closed==true ? true:false} show={this.state.isProjectDetailModalShown} onHide={this.handleHidemodal} /> : null}

            </tr>].concat(isShowProgress ? rowsProgress : null)
        )



    }

};


export default translate('translations')(ProjectDetailRows);
