import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { ScriptUtils,StringUtils } from '../../utils/javascriptUtils';
import { Field, formValueSelector,reduxForm } from 'redux-form';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import { Link } from 'react-router-dom';
import ModalProjectYear from '../projectYear/ModalProjectYear';
import ProjectYearRows from './ProjectYearRows'
import { connect } from 'react-redux';
import { RenderSelect, RenderInputWithDiv } from '../../components/formInputs';
const selector = formValueSelector('CompanyProjectList');
const mapStateToProps = state => {
    return {
        projectYearId: selector(state, "projectYearId"),
        projectName: selector(state, "projectName"),
        projectDetailName: selector(state, "projectDetailName"),
        invoiceNumber: selector(state, "invoiceNumber"),
        projectType:selector(state,"projectType")
    }
};
const mapDispatchToProps = dispatch => ({
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "CompanyProjectList", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        }),
});
class CompanyProjectList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listCompanyProject: null,
            isProjectYearModalShown: false,
            listProjectYearToSearch: [],
            projectYearListRows: [],
            companyDto: null,
            projectYearId: null,
            projectDetailName: null,
            projectType:null,
            invoiceNumber: null,  
            isEnterShowInvoiceNumberFilter: false,
            isEnterShowProjectFilter: false,
            isEnterShowProjectDetailFilter: false,
            isShowFilterByProjectDetail: true,
            listIdsProjectDetailFindByInvoiceNumber:[],
            listInvoiceVer3: [] 

        }
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.handleHidemodal = this.handleHidemodal.bind(this);
        this.toggleShowFilterBy = ()=>{
            const {updateField} = this.props;
            this.setState({
                isShowFilterByProjectDetail:!this.state.isShowFilterByProjectDetail,
                isEnterShowProjectFilter: false,
                isEnterShowProjectDetailFilter: false,
               
            },()=>
            updateField("projectDetailName",null),
            updateField("invoiceNumber",null))

        }
        this.getProjectYearById = (projectYearId) => {
            var listProjectYearToSearch = this.state.listProjectYearToSearch;
            if (!projectYearId || projectYearId == "ALL") {
                this.setState({
                    projectYearListRows: listProjectYearToSearch,
                    projectYearId: projectYearId
                })
            } else if (projectYearId && projectYearId != "ALL" && listProjectYearToSearch) {
                listProjectYearToSearch.map(projectYear => {
                    if (projectYearId == projectYear.id) {
                        this.setState({
                            projectYearListRows: [projectYear],
                            projectYearId: projectYearId,
                        })
                    }
                })
            }
        }
        this.handleProjectType=(value)=>{
            this.setState({
                projectType:value
            })
        }
        // this.setProjectName=(projectName)=>{
        // var projectYearId = this.state.projectYearId;
        //     if(projectName){
        //         this.setState({projectName:projectName});
        //    this.getProjectYearById(projectYearId);
        // }else{
        //     this.setState({projectName:null});
        //    this.getProjectYearById(projectYearId);
        // }
        // }
        this.handleFilterByNameAction = (projectName, projectDetailName) => {
            var projectYearId = this.state.projectYearId;
                this.setState({
                    projectName: projectName,
                    isEnterShowProjectFilter: true,
                    isEnterShowProjectDetailFilter: false,
                    isEnterShowInvoiceNumberFilter: false,
                });
                if(!StringUtils.isEmptyOrSpaces(projectDetailName)){
                    this.setState({
                        invoiceNumber: null,
                        projectDetailName: projectDetailName,
                        isEnterShowProjectDetailFilter: true,
                        isEnterShowInvoiceNumberFilter: false,
                        listIdsProjectDetailFindByInvoiceNumber:[]
                    });
                }else{
                    this.setState({
                    projectDetailName: null,
                    isEnterShowProjectDetailFilter: false,
                    listIdsProjectDetailFindByInvoiceNumber:[]
                });
                }
                    this.getProjectYearById(projectYearId);
        }
        this.handleFilterByInvoiceNumberAction = (projectName, invoiceNumber) => {
            var projectYearId = this.state.projectYearId;
            var listIdsProjectDetail = [];
            var _this = this;
                this.setState({
                    projectName: projectName,
                    isEnterShowProjectFilter: true,
                    isEnterShowInvoiceNumberFilter: false,
                    isEnterShowProjectDetailFilter: false,
                    listIdsProjectDetailFindByInvoiceNumber:[]
                });
                if(!StringUtils.isEmptyOrSpaces(invoiceNumber)){
                    this.setState({
                        projectDetailName: null,
                        invoiceNumber: invoiceNumber,
                        isEnterShowInvoiceNumberFilter: true,
                        isEnterShowProjectDetailFilter: false,
                    });
                    agent.asyncRequests.get("/invoiceVer3/listFindByInvoiceNumber?invoiceNumber=" + invoiceNumber
                    ).then(function (res) {
                        var result = res.body.resultData;
                        if (result) {
                            result.map(item=>{
                                listIdsProjectDetail.push(item.projectDetailId)
                                
                            })
                            _this.setState({
                                listIdsProjectDetailFindByInvoiceNumber:listIdsProjectDetail
                            });
                        } else {
                            toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                        }
                    }, function (err) {
                        toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
                    });
                    this.getProjectYearById(projectYearId);
        }else{
            this.setState({
            invoiceNumber: null,
            isEnterShowInvoiceNumberFilter: false,
            listIdsProjectDetailFindByInvoiceNumber:[]
        });

        }
    }
    };
    loadCompany(id) {
        let setStateInRequest = (list) => { this.setState({ companyDto: list }) }
        agent.asyncRequests.get("/company/" + id
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
    loadProjectYear(id) {
        const { projectYearId } = this.props;
        const getProjectYearById = this.getProjectYearById;
        let setStateInRequest = (list) => { this.setState({ listProjectYearToSearch: list }) }
        agent.asyncRequests.get("/projectYear/listFindByCompany?company=" + id
            // /detailItem/list?search=
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
                if (!projectYearId) {
                    getProjectYearById("ALL");
                }
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }
    componentWillMount() {
        var id = this.props.match.params.id;
        const {updateField} =this.props;
        updateField("projectYearId","ALL")
        updateField("projectType","ALL")
        return (
            this.loadCompany(id),
            this.loadProjectYear(id)
        )
    };
    componentDidUpdate() {
        ScriptUtils.loadFootable();
    }
    handleShowmodal(id) {
        this.setState({
            isProjectYearModalShown: true,
            idProjectYear: id
        })
    }
    handleHidemodal(id) {
        var id = this.props.match.params.id;
        this.setState({
            isProjectYearModalShown: false
        })
        this.loadCompany(id),
        this.loadProjectYear(id)
    }
    render() {
        const projectYearListRows = this.state.projectYearListRows;
        const listProjectYearToSearch = this.state.listProjectYearToSearch;
        const { projectName} = this.props;
        var projectDetailName = this.state.projectDetailName;
        var invoiceNumber  = this.state.invoiceNumber;
        var isEnterShowProjectFilter = this.state.isEnterShowProjectFilter;
        var isEnterShowProjectDetailFilter = this.state.isEnterShowProjectDetailFilter;
        var isEnterShowInvoiceNumberFilter = this.state.isEnterShowInvoiceNumberFilter;
        var isShowFilterByProjectDetail = this.state.isShowFilterByProjectDetail;
        var listIdsProjectDetailFindByInvoiceNumber=  this.state.listIdsProjectDetailFindByInvoiceNumber;
        var projectType = this.state.projectType;
        var projectYearId = this.state.projectYearId;
        const companyDto = this.state.companyDto;
        var search = qs.parse(this.props.location.search).search;
        if (!companyDto) {
            return null;
        }
        if (!projectYearListRows) {
            return null;
        }
        var rows = projectYearListRows.map(item => {
            return (
                <ProjectYearRows key={"projectYearRows_" + item.id} 
                isEnterShowInvoiceNumberFilter={isEnterShowInvoiceNumberFilter}
                projectTypeFilter={projectType}
                invoiceNumber={invoiceNumber}
                listIdsProjectDetailFindByInvoiceNumber={listIdsProjectDetailFindByInvoiceNumber} 
                isEnterShowProjectFilter={isEnterShowProjectFilter} 
                isEnterShowProjectDetailFilter={isEnterShowProjectDetailFilter} 
                projectName={projectName} projectDetailName={projectDetailName} 
                companyDto={this.state.companyDto} 
                yearDto={item}></ProjectYearRows>
            )
        });
        var optionProjectYear = [{ label: "Tất Cả", value: "ALL" }];
        if (listProjectYearToSearch) {
            listProjectYearToSearch.map(item => {
                optionProjectYear.push({ label: item.year, value: item.id });
            })
        }
        var optionProjectType = [
            { label: "Tất Cả", value: "ALL" },
            { label: "Có Doanh Thu", value: "CO_DOANH_THU" },
            { label: "Ngoài Doanh Thu", value: "NGOAI_DOANH_THU"}
        ];
        return (
            <div className="content-wrapper">
                <div className="content">
                    <div className="page-header">
                        <h4>
                            <i className=" icon-paragraph-justify2 position-left"></i>
                            <span className="text-semibold"></span>
                            <span className="pull-right">
                                <button className="btn bg-green" onClick={() => this.handleShowmodal()}>Thêm Mới</button>
                            </span>
                        </h4>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            {this.state.isProjectYearModalShown ? <ModalProjectYear title="Năm" companyDto={companyDto} idProjectYear={this.state.idProjectYear} show={this.state.isProjectYearModalShown} onHide={this.handleHidemodal} /> : null}
                            <div className="panel panel-flat">
                                <center>
                                    <h1>Quy Trình Dự Án</h1>
                                    <h5>Công Ty: {companyDto.name} </h5></center>
                                {/* TODO FILTER */}
                                <div className="col-md-9">
                                    <form role="form" className="form-group">
                                        <div className="row">
                                            <div className="col-md-2">
                                            <br/>
                                                <Field label="Chọn năm" name="projectYearId" placeholder="Chọn Năm"
                                                    options={optionProjectYear} component={RenderSelect}
                                                    onChangeAction={(projectYearId) => this.getProjectYearById(projectYearId)}></Field>
                                            </div>
                                            <div className="col-md-3">
                                            <br/>
                                                <Field label="Loại Dự Án" name="projectType" placeholder="Tìm Kiếm Theo Loại Dự Án" options={optionProjectType} component={RenderSelect}
                                                onChangeAction={(value) => this.handleProjectType(value)}></Field>
                                            </div>
                                            <div className="col-md-3">
                                                <br/>
                                                <Field label="Tìm Kiếm " name="projectName" placeholder="Tìm Kiếm Theo Dự Án" component={RenderInputWithDiv}
                                                    onEnterAction={(value) => {this.handleFilterByNameAction(value, projectDetailName),this.handleFilterByInvoiceNumberAction(value, invoiceNumber)}}
                                                    onChangeAction={(value) => {this.handleFilterByNameAction(value,projectDetailName),this.handleFilterByInvoiceNumberAction(value, invoiceNumber)}}
                                                ></Field>
                                            </div>
                                            <div className="col-md-3">
                                                <a onClick={()=>this.toggleShowFilterBy()}>Thay Đổi Dữ Liệu Tìm Kiếm</a>
                                                {isShowFilterByProjectDetail? <Field label="Tìm Kiếm (Công Việc)" name="projectDetailName" placeholder="Tìm Kiếm Theo Công Việc" component={RenderInputWithDiv}
                                                    onEnterAction={(value) => this.handleFilterByNameAction(projectName, value)}
                                                    // onChangeAction={(projectDetailName) => this.setProjectDetailName(projectDetailName)}
                                                    ></Field>: <Field label="Tìm Kiếm (HĐ)" name="invoiceNumber" placeholder="Tìm Kiếm Theo Số Hóa Đơn" component={RenderInputWithDiv}
                                                    onEnterAction={(value) => this.handleFilterByInvoiceNumberAction(projectName, value)}
                                                    // onChangeAction={(projectDetailName) => this.setProjectDetailName(projectDetailName)}
                                                    ></Field>}
                                            </div>
                                           
                                        </div>
                                    </form>
                                </div>
                                <br style={{ lineHeight: '50px' }} />
                                <table className="table table-togglable">
                                    <thead>
                                        <tr className="bg-green">
                                            <td colSpan="15"></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
export default translate('translations')(connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: 'CompanyProjectList',
        destroyOnUnmount: true,
        enableReinitialize: true
    })(CompanyProjectList)));