import qs from 'query-string';
import React from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { formValueSelector, reduxForm, Field } from 'redux-form';
import agent from '../../services/agent';
import { ScriptUtils } from '../../utils/javascriptUtils';
import ModalProjectYear from '../projectYear/ModalProjectYear';
import YearRows from '../projectCostReport/YearRows'
import { RenderSelect } from '../../components/formInputs';
import { PermanentCacheService } from '../../services/middleware';

const selector = formValueSelector('ProjectCostReportList');
const mapStateToProps = state => {
    return {
        yearSelector: selector(state, "year"),
    }
};
const mapDispatchToProps = dispatch => ({
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ProjectCostReportList", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        }),
});
class ProjectCostReportList extends React.Component {
    constructor(props) {
        super(props);
        let initialYear = '2019'
        initialYear = PermanentCacheService.getItem("selected_project_year") ? PermanentCacheService.getItem("selected_project_year") : initialYear;

        this.state = {
            isProjectYearModalShown: false,
            sumYearProjectCost: null,
            year: initialYear

        }
        this.handleShowmodal = this.handleShowmodal.bind(this);

        this.setPermanentCache = (year) => {
            if (year) {
                PermanentCacheService.setItem("selected_project_year", year);
            }
            this.setState({
                year: year ? year : this.state.year,
            }, () => this.updateListProjectYear());
        };
    };
    
    updateListProjectYear() {
        const {year} = this.state;        
        var page = qs.parse(this.props.location.search).page;
        let setStateInRequest = (list) => { this.setState({ sumYearProjectCost: list }) }
        return agent.asyncRequests.get("/projectCost/listTotalMoneyByYear?year="+ year, page).then(function (res) {
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
        const year = this.state.year;
        updateField("year", year);
        this.updateListProjectYear();
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
 
    render() {
        const sumYearProjectCost = this.state.sumYearProjectCost;
        var search = qs.parse(this.props.location.search).search;
        const { yearSelector } = this.props;
        var optionYear = [
            { label: "2019", value: "2019" },
            { label: "2020", value: "2020" },
            { label: "2021", value: "2021" },
            { label: "2022", value: "2022" },
            { label: "2023", value: "2023" },
        ];
        
        if (!sumYearProjectCost) {
            return null;
        }
        var rows = [
                <YearRows key={"yearRows_" } 
                    yearDto={sumYearProjectCost}>                        
                </YearRows> 
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
                            <div className="panel panel-flat">
                                <center>
                                    <h1>Báo Cáo Thanh Toán</h1>
                                </center>
                                {/* TODO FILTER */}
                                <div className="col-md-9">
                                    <form role="form" className="form-group">
                                        <div className="row">
                                            <div className="col-md-2" >
                                                <Field label="Chọn năm" name="year" placeholder="Chọn Năm"
                                                        options={optionYear} component={RenderSelect} 
                                                        onChangeAction={(value) => this.setPermanentCache(value, yearSelector)} component={RenderSelect}
                                                ></Field> 
                                            </div>
                                            <div className="input-group-btn" style={{ paddingTop: '27px' }}>
                                                <button type="submit" className="btn bg-green btn-xlg">Tìm</button>
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
        form: 'ProjectCostReportList',
        destroyOnUnmount: true,
        enableReinitialize: true
    })(ProjectCostReportList)));