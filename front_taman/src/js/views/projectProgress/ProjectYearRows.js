import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import qs from 'query-string';
import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker, RenderCheckbox, RenderSelect, RenderPlainCheckbox } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { FormatterUtils, SecurityUtils } from '../../utils/javascriptUtils';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import ModalProjectYear from '../projectYear/ModalProjectYear';
import ProjectRows  from './ProjectRows'
import ModalProject from '../project/ModalProject';
import SecuredComponent from '../../components/SecuredComponent';
import KhongDau from 'khong-dau';
const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({
});

class ProjectYearRows extends React.Component {
    constructor() {
        super();
        this.state = {
            isProjectYearModalShown: false,
            listProjectByProjectYear: [],
            isShowProject: false,
            isEnterShowProjectDetailFilter: false,
            isEnterShowInvoiceNumberFilter:false,
            yearDto: null,
            
        }
        this.handleShowProject = this.handleShowProject.bind(this);
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.handleHidemodal = this.handleHidemodal.bind(this);  
        this.reloadProjectYear = this.reloadProjectYear.bind(this);  
        this.reloadOnlyProjectYear = this.reloadOnlyProjectYear.bind(this);
        this.handleShowProjectModal = this.handleShowProjectModal.bind(this);     
        this.handleHideProjectModal = this.handleHideProjectModal.bind(this);           
        this.getProjectByName=(projectName)=>{
            if(projectName){
            this.setState({isShowProject:true})
        }

        }
    }

    reloadProjectYear() {
        // OnHide projectYear just show project when user have right permission
        const {currentUser} = this.props;
        this.handleShowProject();
        this.reloadOnlyProjectYear();
    }

    reloadOnlyProjectYear() {
        // reload location info
        let setStateInRequest = (yearDto) => {this.setState({yearDto: yearDto})}
        return agent.asyncRequests.get("/projectYear/" + this.state.yearDto.id).then(function (res) {
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
    
      //Show Project Item
    handleShowProject() {
        var {projectTypeFilter} =this.props;
        if(!projectTypeFilter){
            projectTypeFilter ="ALL"
        }
        var id = this.props.yearDto.id;
        this.setState({ isShowProject: true });
        let setStateInRequestProject = (list) => { this.setState({ listProjectByProjectYear: list }) }
        agent.asyncRequests.get("/project/listFindByProjectYearAndProjectType?projectYearId=" + id+"&projectType="+projectTypeFilter
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequestProject(result);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }

    handleProjectHide() {
        this.setState({
            isShowProject: false
        })
    }

    handleDataProjectHide() {
        this.setState({
            isShowDataProject: false
        })
    }

    handleShowProjectModal(yearDto) {
        this.setState({yearDto: yearDto}, () => {
            this.setState({isProjectModalShown: true})
        })
    }
    handleHideProjectModal(){
        this.setState({
            isProjectModalShown: false,
            isEnterShowProjectFilter:false,
        });
        this.reloadProjectYear();
    }

    handleShowmodal(id) {
        this.setState({
            isProjectYearModalShown: true,
            idProjectYear: id
        })
    }
    handleHidemodal(){
        this.setState({
            isProjectYearModalShown: false
        });
        this.reloadProjectYear();
    }

    componentWillMount() {
        this.setState({
            yearDto: this.props.yearDto,
            
        });
        

    };
      componentDidUpdate(prevProps) {
        if (this.props.isEnterShowProjectFilter ) {
            var isShowProject = this.state.isShowProject
            var isEnterShowProjectFilter = this.props.isEnterShowProjectFilter;
                    if(!isShowProject && isEnterShowProjectFilter ){
                        this.handleShowProject();  
                    }
        }
        if(prevProps.projectTypeFilter != this.props.projectTypeFilter){
            this.handleShowProject();  
        }
       
      }
    deleteProjectYear(id) {
        if (confirm("Bạn có chắc sẽ xoá! " )) {
            var url = `/projectYear/${id}`;
            return agent.asyncRequests.del(url
            ).then(function (res) {
                var result = res.body.resultData;
                if (result && !result.error) {
                    alert("Xoá Thành Công");
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

    render() {
        const yearDto = this.state.yearDto;
        const listProjectByProjectYear = this.state.listProjectByProjectYear;
        var isShowProject = this.state.isShowProject
        var projectName = this.props.projectName;
        var projectDetailName = this.props.projectDetailName; 

        var invoiceNumber = this.props.invoiceNumber;
        var isEnterShowProjectDetailFilter = this.props.isEnterShowProjectDetailFilter;
        var  isEnterShowInvoiceNumberFilter = this.props.isEnterShowInvoiceNumberFilter;
        var listIdsProjectDetailFindByInvoiceNumber =   this.props.listIdsProjectDetailFindByInvoiceNumber;
        //-------------------------------------------Load List Of Project Item-------------------------------------------
        var currentNoFromProjectYear = 0;
        var rowsProject = listProjectByProjectYear.map(item => {
            if(KhongDau(item.name.toLowerCase()).indexOf(projectName? KhongDau(projectName.toLowerCase()) : null) >= 0){
              
            currentNoFromProjectYear++
            return (
                <SecuredComponent key={"permisstionPY_"+item.id} allowedPermission="admin.project.read"> 
                <ProjectRows projectName={projectName} invoiceNumber={invoiceNumber} isEnterShowInvoiceNumberFilter={isEnterShowInvoiceNumberFilter} listIdsProjectDetailFindByInvoiceNumber={listIdsProjectDetailFindByInvoiceNumber}  yearDto={yearDto} isEnterShowProjectDetailFilter={isEnterShowProjectDetailFilter}  projectDetailName={projectDetailName} currentNoFromProjectYear={currentNoFromProjectYear}  onReloadProjectYear={this.reloadOnlyProjectYear} onReloadParent={this.reloadProjectYear} key={"projectRows" + item.id} projectDto={item}></ProjectRows>
                </SecuredComponent>
            )
        }
        else if(projectName==null || projectName==""){
            currentNoFromProjectYear++
            return (
                <SecuredComponent key={"permisstionPY_"+item.id}  allowedPermission="admin.project.read"> 
                <ProjectRows projectName={projectName}  invoiceNumber={invoiceNumber}  isEnterShowInvoiceNumberFilter={isEnterShowInvoiceNumberFilter} listIdsProjectDetailFindByInvoiceNumber={listIdsProjectDetailFindByInvoiceNumber}  yearDto={yearDto} isEnterShowProjectDetailFilter={isEnterShowProjectDetailFilter} projectDetailName={projectDetailName}  currentNoFromProjectYear={currentNoFromProjectYear} onReloadProjectYear={this.reloadOnlyProjectYear} onReloadParent={this.reloadProjectYear} key={"projectRows" + item.id} projectDto={item}></ProjectRows>
                </SecuredComponent>
            )
        }
        });
    


        //Load Location Name, and Button Show & Hide
        return (
            [<tr key={"yearRows_"+yearDto.id} className="bg-info-600" style={{color:'white',fontSize:15}} key={yearDto.id}>
            
              
            <td>
            <SecuredComponent allowedPermission="admin.project.read"> 
                    {isShowProject ? null : <button className="bg-info-600 icon-plus22" onClick={() => this.handleShowProject()}></button>}
                    {isShowProject ? <button className="bg-info-600 icon-dash" onClick={() => this.handleProjectHide()}></button>: null}
            </SecuredComponent>
         </td> 

                    {/* TODO STT */}
                    <td colSpan="10"><a style={{color:'white'}} onClick={() => <SecuredComponent allowedPermission="admin.project.create"> {this.handleShowmodal(yearDto.id)}</SecuredComponent>}>Năm {yearDto.year}</a></td>
                    <td style={{color:"white"}}>
                        <SecuredComponent allowedPermission="admin.totalRevenue.check">
                            Tổng Doanh Thu: {FormatterUtils.formatCurrency(yearDto.totalRevenue)}
                        </SecuredComponent>
                      
                    </td>
                    <td style={{color:"white"}}>
                    <SecuredComponent allowedPermission="admin.totalRevenue.check">
                            Tổng Lợi Nhuận: {FormatterUtils.formatCurrency(yearDto.totalProfit)}
                        </SecuredComponent>
                      
                    </td>
                    <td></td>
                    <td className="text-center col-md-1">
                        <ul className="icons-list">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="icon-menu9"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                <SecuredComponent allowedPermission="admin.project.create">
                                  <li><a onClick={() => this.handleShowProjectModal(yearDto)}><i className="icon-nbsp"></i>Thêm Dự Án</a></li>
                                </SecuredComponent>
                                  <SecuredComponent allowedPermission="admin.project.delete">
                                  <li><a onClick={() => this.deleteProjectYear(yearDto.id)}><i className="icon-cross2"></i>Xóa</a></li>
                                </SecuredComponent>
                              
                              </ul>
                            </li>
                        </ul>
                    </td>
             
            {this.state.isProjectYearModalShown ? <ModalProjectYear title="Năm" idProjectYear={this.state.idProjectYear} companyDto={this.props.companyDto} show={this.state.isProjectYearModalShown} onHide={this.handleHidemodal}/> : null} 
            {this.state.isProjectModalShown ? <ModalProject title="Dự Án" yearDto={this.state.yearDto} show={this.state.isProjectModalShown} onHide={this.handleHideProjectModal}/> : null} 
                         
            </tr>
               
    ].concat(isShowProject ? rowsProject:null)
            
            // List Project Item

        );
    }

};

export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(ProjectYearRows));

