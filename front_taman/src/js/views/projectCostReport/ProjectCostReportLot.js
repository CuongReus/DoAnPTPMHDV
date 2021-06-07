import moment from 'moment';
import React from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import ProjectCostReportRows from './ProjectCostReportRows';
import { FormatterUtils } from '../../utils/javascriptUtils';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({
});

class ProjectCostReportLot extends React.Component {
    constructor() {
        super();
        this.state = {
            isShowReportRows: false,
            listProjectCostByStartDayAndEndDay: [],
            totalMoneyUnPaid: 0,
            totalMoneyUnPaidByCompany: 0,
        }

    }

    handleShowReportRows() {
        const { lots } = this.props;
        var startDay = moment(lots.startDay).format("YYYY-MM-DD");
        var endDay = moment(lots.endDay).format("YYYY-MM-DD");
        let setStateInRequestProject = (list) => { this.setState({ listProjectCostByStartDayAndEndDay: list, isShowReportRows: true }) }
        return agent.asyncRequests.get("/projectCost/findByStartDayAndLastDayOfWeekAndStatus?status=ALL" + "&fromDate=" + startDay + "&toDate=" + endDay).then(function (res) {
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

    handleHideReportRows() {
        this.setState({
            isShowReportRows: false,
        });
    }



    componentWillMount() {

    };


    render() {
        const { weekMonth, month, year, lots } = this.props;
        var isShowReportRows = this.state.isShowReportRows;
        var listProjectCostByStartDayAndEndDay = this.state.listProjectCostByStartDayAndEndDay;
        var reportRows = [];
        var currentNo = 0;
        let totalMoneyPaid = 0;
        let totalMoney = 0;
        isShowReportRows ? reportRows = listProjectCostByStartDayAndEndDay.map(item => {
            currentNo++;
            totalMoney += item.totalMoney;
            totalMoneyPaid += item.totalPaid;
            
            return <ProjectCostReportRows reportRow={item} weekMonth={weekMonth} month={month} year={year} currentNo={currentNo}></ProjectCostReportRows>
            // }        
        }) : null ;

        var reportRowsFooter = [ 
            <tr key={"rowWeek_"} className="info">
                <td></td>
                <td colSpan="2"> 
                    <span> Tổng Tiền:</span>
                    <br/>
                    <span> Đã Thanh Toán:</span>
                    <br/>
                    <span> Chưa Thanh Toán:</span>
                </td>
                <td> 
                    <span> {FormatterUtils.formatCurrency(totalMoney)} </span>
                    <br/>
                    <span> {FormatterUtils.formatCurrency(totalMoneyPaid)} </span>
                    <br/>
                    <span> {FormatterUtils.formatCurrency(totalMoney - totalMoneyPaid)} </span>
                </td>
                <td colSpan="6"> </td>
                <td>
                    {listProjectCostByStartDayAndEndDay.length > 0 ? <div className="text-right">
                        <ReactHTMLTableToExcel
                            id="test-table-project-cost-report"
                            className="download-table-xls-button"
                            table="table-project-cost-report"
                            filename={"BaoCaoThanhToan_" +"Dot_" + lots.lot + "_thang_" + month + "_nam_"+ year}
                            sheet={"Từ Ngày : "+ moment(lots.startDay).format("DD-MM-YYYY") + " -  Đến Ngày : "+  moment(lots.endDay).format("DD-MM-YYYY")}
                            buttonText="Download Excel" />
                    </div> : null}
                </td>
            </tr>,
        ]

        var tableExcel =    [<div className="panel panel-flat" style={{display : "none"}}>
                                <table className="table table-togglable table-hover" id="table-project-cost-report">
                                    <thead>
                                        <tr className="bg-green">
                                            <th data-toggle="true"> STT</th>
                                            <th data-toggle="true">  Ngày Yêu Cầu TT</th>
                                            <th data-toggle="true">  Người Đề Nghị</th>
                                            <th data-toggle="true">  Số Tiền</th>
                                            <th data-toggle="true">  Dự Án</th>
                                            <th data-toggle="true">  Mô Tả</th>
                                            <th data-toggle="true">  Ngày Đóng TT</th>
                                            <th data-toggle="true">  Loại TT</th>
                                            <th data-toggle="true">  Trạng Thái TT</th>
                                            <th data-toggle="true">  Công Ty</th>
                                            <th data-toggle="true"> Ghi Chú</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reportRows}
                                    </tbody>
                                </table>
                            </div>]
        var reportRowsHeader = [  <tr key={"rowWeek_"} className="bg-success">
                <td> STT</td>
                <td> Ngày Yêu Cầu TT</td>
                <td> Người Đề Nghị</td>
                <td> Số Tiền</td>
                <td> Dự Án</td>
                <td> Mô Tả</td>
                <td> Ngày Đóng TT</td>
                <td> Loại TT</td>
                <td> Trạng Thái TT</td>
                <td> Công Ty</td>
                <td>Ghi Chú</td>
            </tr>
        ].concat(reportRows);
        return (
            [<tr key={"ProjectCostReportLot_"} className="success">
                <td colSpan="2">
                    {isShowReportRows ? null : <button className="bg-info-600 icon-plus22" onClick={() => this.handleShowReportRows()}></button>}
                    {isShowReportRows ? <button className="bg-info-600 icon-dash" onClick={() => this.handleHideReportRows()}></button> : null}
                </td>
                <td></td>
                {lots.lot === 1 ? <td colSpan="8">Từ Ngày : { moment(lots.startDay).format("DD-MM-YYYY") } -  Đến Ngày : { moment(lots.endDay).format("DD-MM-YYYY") }</td> : null}
                {lots.lot === 2 ? <td colSpan="8">Từ Ngày : { moment(lots.startDay).format("DD-MM-YYYY") } -  Đến Ngày : { moment(lots.endDay).format("DD-MM-YYYY") }</td> : null}
                {lots.lot === 3 ? <td colSpan="8">Từ Ngày : { moment(lots.startDay).format("DD-MM-YYYY") } -  Đến Ngày : { moment(lots.endDay).format("DD-MM-YYYY") }</td> : null}
            {/* </tr>] */}
            </tr>].concat(isShowReportRows ? [tableExcel,reportRowsFooter,reportRowsHeader] : null)
        );
    }
};

export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(ProjectCostReportLot));

