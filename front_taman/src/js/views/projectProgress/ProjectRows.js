import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import qs from 'query-string';
import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker, RenderCheckbox, RenderSelect, RenderPlainCheckbox } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { StringUtils, FormatterUtils, SecurityUtils } from '../../utils/javascriptUtils';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import ProjectDetailRows from './projectDetailRows'
import ModalProject from '../project/ModalProject';
import ModalProjectDetail from '../projectDetail/ModalProjectDetail';
import SecuredComponent from '../../components/SecuredComponent';
import KhongDau from 'khong-dau';
const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
});
const mapDispatchToProps = dispatch => ({
});
class ProjectRows extends React.Component {
    constructor() {
        super();
        this.state = {
            projectDto: null,
            projectDetailList: [],
            isShowDataProjectDetail: false,
            isProjectDetailModalShown: false,
            listInvoiceVer3: [],
            listProjectCostUnPaid:[],
            listCloseProjectByProject:[],
        //  invoiceNumberPre: null

        }
        this.handleShowDataProjectDetail = this.handleShowDataProjectDetail.bind(this);
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.handleHidemodal = this.handleHidemodal.bind(this);
        this.handleShowProjectDetailModal = this.handleShowProjectDetailModal.bind(this);
        this.handleHideProjectDetailModal = this.handleHideProjectDetailModal.bind(this);
        // this.handleSearchByInvoiceNumberVer3 = this.handleSearchByInvoiceNumberVer3.bind(this);
        this.reloadProject = this.reloadProject.bind(this);
        this.handleCheckOnclick = this.handleCheckOnclick.bind(this);
        this.getProjectDetailCheckPaidStatus=()=>{
            var id = this.props.projectDto.id;
            let setStateInRequestDataProjectDetail = (list) => { this.setState({ listProjectCostUnPaid: list }) }
            agent.asyncRequests.get("/projectCost/CheckPaidStatusByProjectId?projectId="+ id
            ).then(function (res) {
                var result = res.body.resultData;
                if (result) {
                    setStateInRequestDataProjectDetail(result);
                } else {
                    toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });
        }
        this.getCloseProjectCheck=()=>{
            var id = this.props.projectDto.id;
            let setStateInRequest = (list) => { this.setState({ listCloseProjectByProject: list }) }
            agent.asyncRequests.get("/closeProject/findByProjectDetail_ProjectId?projectId="+ id
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
    };
    //Reload Date When Edit and Update
    reloadProject() {
        this.handleShowDataProjectDetail();
        this.props.onReloadProjectYear();
        this.getProjectDetailCheckPaidStatus();
        this.getCloseProjectCheck();
        // reload project item info
        let setStateInRequest = (projectDto) => { this.setState({ projectDto: projectDto }) }
        return agent.asyncRequests.get("/project/" + this.state.projectDto.id).then(function (res) {
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
    // handleSearchByInvoiceNumberVer3(invoiceNumberVer3){
    //     let setStateInRequestDataProjectDetail = (list) => { this.setState({ listInvoiceVer3: list }) }
    //     agent.asyncRequests.get("/invoiceVer3/listFindByInvoiceNumber?invoiceNumber=" + invoiceNumberVer3
    //     ).then(function (res) {
    //         var result = res.body.resultData;
    //         if (result) {
    //             setStateInRequestDataProjectDetail(result);
    //         } else {
    //             toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
    //         }
    //     }, function (err) {
    //         toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
    //     });
    // }
    handleShowDataProjectDetail() {
        var id = this.props.projectDto.id;
        this.setState({ isShowDataProjectDetail: true });
        let setStateInRequestDataProjectDetail = (list) => { this.setState({ projectDetailList: list }) }
        agent.asyncRequests.get("/projectDetail/listFindByProject?projectId=" + id
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequestDataProjectDetail(result);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }
    handleProjectHide() {
        this.setState({
            isShowDataProjectDetail: false
        })
    }
    componentWillMount() {
        // reload project item info
        var _this = this;
        let setStateInRequest = (projectDto) => { this.setState({ projectDto: projectDto }) }
        return agent.asyncRequests.get("/project/" + this.props.projectDto.id).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
                _this.getProjectDetailCheckPaidStatus();
                _this.getCloseProjectCheck();
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    };

    deleteProject(id) {
        const onReloadParent = this.props.onReloadParent;
        if (confirm("Bạn có chắc sẽ xoá? ")) {
            var url = `/project/${id}`;
            return agent.asyncRequests.del(url
            ).then(function (res) {
                var result = res.body.resultData;
                if (result && !result.error) {
                    alert("Xoá Thành Công");
                    onReloadParent();
                } else {
                    toast.error("Có lỗi khi xóa dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Không thể xóa dữ liệu đang được sử dụng từ màn hình khác! ", { autoClose: 15000 });
            });


        } else {
        }
    }
    handleCheckOnclick(){
        this.setState({
            isOnClick :false
        })
    }
    handleDataProjectDetailHide() {
        this.setState({
            isShowDataProjectDetail: false
        })
    }
    handleShowmodal(id) {
        this.setState({
            isProjectModalShown: true,
            idProject: id
        })
    }
    handleHidemodal() {
        this.setState({
            isProjectModalShown: false
        });
        this.reloadProject();
    }


    componentDidUpdate(prevProps) {
        var isShowDataProjectDetail = this.state.isShowDataProjectDetail;
        if ( this.props.isEnterShowProjectDetailFilter ==true &&this.props.isEnterShowProjectDetailFilter !=this.props.isEnterShowInvoiceNumberFilter  ) {
            // this.setState({isShowDataProjectDetail:!this.state.isShowDataProjectDetail})
            var isEnterShowProjectDetailFilter = this.props.isEnterShowProjectDetailFilter;
            if(!isShowDataProjectDetail && isEnterShowProjectDetailFilter &&this.props.projectDetailName   ){
                        this.handleShowDataProjectDetail();
            }
         
        }
       
    
        else if( this.props.isEnterShowInvoiceNumberFilter ==true&&this.props.isEnterShowInvoiceNumberFilter != this.props.isEnterShowProjectDetailFilter  ){
            var isEnterShowInvoiceNumberFilter = this.props.isEnterShowInvoiceNumberFilter;
            if(!isShowDataProjectDetail&&isEnterShowInvoiceNumberFilter){
                this.handleShowDataProjectDetail();
            }
        }
        else if(isShowDataProjectDetail && (this.props.isEnterShowProjectDetailFilter !== prevProps.isEnterShowProjectDetailFilter) || (this.props.isEnterShowInvoiceNumberFilter !==prevProps.isEnterShowInvoiceNumberFilter)&&( !this.props.projectDetailName && !this.props.invoiceNumber) ){
            this.handleDataProjectDetailHide();
        }
        
        // else if(this.props.isEnterShowInvoiceNumberFilter ==true && this.props.isEnterShowProjectDetailFilter==false && this.props.invoiceNumber !=this.state.invoiceNumberPre ){
        //     // this.setState({isShowDataProjectDetail:!this.state.isShowDataProjectDetail})
        //     // Set InvoiceNumber String to avoid loop queries
        //     this.setState({invoiceNumberPre:this.props.invoiceNumber})
        //     var isShowDataProjectDetail = this.state.isShowDataProjectDetail;
        //     var isEnterShowInvoiceNumberFilter = this.props.isEnterShowInvoiceNumberFilter;
        //     if(!isShowDataProjectDetail &&  isEnterShowInvoiceNumberFilter ){
        //     this.handleSearchByInvoiceNumberVer3(this.props.invoiceNumber);
        //     }
        // }
      }
    handleShowProjectDetailModal(projectDto) {
        this.setState({ projectDto: projectDto }, () => {
            this.setState({ isProjectDetailModalShown: true });
        })
    }
    handleHideProjectDetailModal() {
        this.setState({
            isProjectDetailModalShown: false
        });
        this.reloadProject();
    }


    render() {

        const projectDto = this.state.projectDto;
        const projectDetailList = this.state.projectDetailList;
        var currentNoFromProjectYear = this.props.currentNoFromProjectYear;
        var listProjectCostUnPaid = this.state.listProjectCostUnPaid;
        const listCloseProjectByProject = this.state.listCloseProjectByProject;
        const {t} = this.props;
        
      
        if (!projectDto) {
            return null;
        }
        var isShowDataProjectDetail = this.state.isShowDataProjectDetail;
        //-------------------------------------------Load List Of Project Detail-------------------------------------------
        var currentNoFromProject = 0;
        var projectDetailName= this.props.projectDetailName; 
         var  invoiceNumber=this.props.invoiceNumber;
         var listIdsProjectDetailFindByInvoiceNumber = this.props.listIdsProjectDetailFindByInvoiceNumber;
         var closeProjectUnfinished = false;
        var rowsProjectDetail = projectDetailList.map(item => {
            var itemCheckUnPaidObj = null;
            
            if(listProjectCostUnPaid){
                listProjectCostUnPaid.map(itemCheckUnPaid =>{
                    if(item.id == itemCheckUnPaid.projectDetailId){
                        itemCheckUnPaidObj = itemCheckUnPaid
                    }
                })
            }
            if(listIdsProjectDetailFindByInvoiceNumber.includes(item.id) || (KhongDau(item.name.toLowerCase()).indexOf(projectDetailName? KhongDau(projectDetailName.toLowerCase()) : null) >= 0)){
            currentNoFromProject++
            return (
                <SecuredComponent key={"permisstionPD_" + item.id} allowedPermission="admin.projectDetail.read">
                    <ProjectDetailRows  key={"projectDetail_" + item.id}  itemCheckUnPaidObj= {itemCheckUnPaidObj}  currentNoFromProject={currentNoFromProject} projectDto={projectDto} onReloadProject={this.reloadProject} projectDetail={item}></ProjectDetailRows>
                </SecuredComponent>
            )
            }else if( (projectDetailName==null || projectDetailName=="")&&(invoiceNumber==null ||invoiceNumber=="")) {
                currentNoFromProject++
                return (
                    <SecuredComponent key={"permisstionPD_" + item.id} allowedPermission="admin.projectDetail.read">
                        <ProjectDetailRows key={"projectDetail_" + item.id} itemCheckUnPaidObj= {itemCheckUnPaidObj}  currentNoFromProject={currentNoFromProject} projectDto={projectDto} onReloadProject={this.reloadProject} projectDetail={item}></ProjectDetailRows>
                    </SecuredComponent>
                )
            }
        })
        return (
            [<tr key={"project_"+projectDto.id} className={projectDto.projectType != "NGOAI_DOANH_THU" ?"success":"alpha-indigo"} style={{ color: 'black' }} >
                <td>
                <SecuredComponent allowedPermission="admin.projectDetail.read">
                    {isShowDataProjectDetail ? null : <button className="bg-info icon-plus22 " onClick={() => this.handleShowDataProjectDetail()}></button>}
                    {isShowDataProjectDetail ? <button className="bg-info icon-dash" onClick={() => this.handleDataProjectDetailHide()}></button> : null}
                    </SecuredComponent>
                </td>
                {/* TODO STT */}
                <td>{currentNoFromProjectYear}</td>
                <td colSpan="8"><a style={{ fontSize:13,color: 'black' }} onClick={() =>  <SecuredComponent allowedPermission="admin.project.update"> {this.handleShowmodal(projectDto.id)}</SecuredComponent>}>{projectDto.name}</a></td>
                <td> {listProjectCostUnPaid.length>0 || closeProjectUnfinished ==true   ?  <i style={{color:'red'}} className="icon-circles" ></i>:null}</td>
                <td>
                    <SecuredComponent allowedPermission="admin.totalRevenue.check">
                        Tổng Doanh Thu: {FormatterUtils.formatCurrency(projectDto.totalRevenue)}
                    </SecuredComponent>
                </td>
                <td>
                    <SecuredComponent allowedPermission="admin.totalRevenue.check">
                        Tổng Lợi Nhuận: {FormatterUtils.formatCurrency(projectDto.totalProfit)}
                    </SecuredComponent>
                </td>
        <td>{projectDto.projectStatus == "DANG_THUC_THI"?  <span className="label bg-blue">{t(projectDto.projectStatus)}</span>:  <span className="label bg-green">{t(projectDto.projectStatus)}</span>}</td>
                <td className="text-center col-md-1">
                    <ul className="icons-list">
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <i className="icon-menu9"></i>
                            </a>

                            <ul className="dropdown-menu dropdown-menu-right">
                                <SecuredComponent allowedPermission="admin.projectDetail.create">
                                    <li><a onClick={() => this.handleShowProjectDetailModal(projectDto)}><i className="icon-pen-plus"></i>Thêm Công Việc</a></li>
                                </SecuredComponent>
                                <SecuredComponent allowedPermission="admin.project.update">

                                    <li><a onClick={() => this.handleShowmodal(projectDto.id)}><i className="icon-pencil"></i>Sửa Dự Án</a></li>
                                </SecuredComponent>

                                <SecuredComponent allowedPermission="admin.project.delete">
                                    <li><a onClick={() => this.deleteProject(projectDto.id)}><i className="icon-cross2"></i>Xóa</a></li>
                                </SecuredComponent>

                            </ul>
                        </li>
                    </ul>
                </td>
                {this.state.isProjectModalShown ? <ModalProject title="Dự Án" locationDto={this.props.locationDto} yearDto={this.props.yearDto} idProject={this.state.idProject} show={this.state.isProjectModalShown} onHide={this.handleHidemodal} /> : null}
                {this.state.isProjectDetailModalShown ? <ModalProjectDetail title="Công Việc" projectDto={projectDto} show={this.state.isProjectDetailModalShown} onHide={this.handleHideProjectDetailModal} /> : null}
            </tr>].concat(isShowDataProjectDetail ? rowsProjectDetail : null)

        );




        //Load Location Name, and Button Show & Hide
    }

};
export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(ProjectRows));
