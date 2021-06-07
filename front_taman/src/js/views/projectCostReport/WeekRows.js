import moment from 'moment';
import React from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import ProjectCostReportRows from './ProjectCostReportRows';
import { FormatterUtils } from '../../utils/javascriptUtils';


const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({
});

class WeekRows extends React.Component {
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
        const { weekMonth, month, year } = this.props;
        var startDay = new Date(year, month - 1, weekMonth.start);
        var endDay = new Date(year, month - 1, weekMonth.end);
        startDay = moment(startDay).format("YYYY-MM-DD");
        endDay = moment(endDay).format("YYYY-MM-DD");
        let setStateInRequestProject = (list) => { this.setState({ listProjectCostByStartDayAndEndDay: list, isShowReportRows: true }) }
        return agent.asyncRequests.get("/projectCost/findByStartDayAndLastDayOfWeekAndStatus?status=CHUA_THANH_TOAN_DU" + "&fromDate=" + startDay + "&toDate=" + endDay).then(function (res) {
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
        const { weekMonth, month, year } = this.props;
        var isShowReportRows = this.state.isShowReportRows;
        var listProjectCostByStartDayAndEndDay = this.state.listProjectCostByStartDayAndEndDay;
        var reportRows = [];
        var currentNo = 0;
        let totalMoneyUnPaidByCompany = this.state.totalMoneyUnPaidByCompany;
        let totalMoneyUnPaid = this.state.totalMoneyUnPaid;
        isShowReportRows ? reportRows = listProjectCostByStartDayAndEndDay.map(item => {
            currentNo++;
            totalMoneyUnPaid += item.totalMoney;
            return <ProjectCostReportRows reportRow={item} weekMonth={weekMonth} month={month} year={year} currentNo={currentNo}></ProjectCostReportRows>
            // }        
        }) : null ;
        var reportRowsFooter = [];

        reportRowsFooter = [ 
            <tr key={"rowWeek_"} className="bg-info">
                <td></td>
                <td> </td>
                <td> Tổng Tiền:</td>
                <td> {FormatterUtils.formatCurrency(totalMoneyUnPaid)}</td>
                <td colSpan="7"> </td>
            </tr>,
            // <tr key={"rowWeek_"} className="bg-info">
            //     <td></td>
            //     <td> </td>
            //     <td> Tâm An:</td>
            //     <td></td>
            //     <td colSpan="7"> </td>
            // </tr>,
            // <tr key={"rowWeek_"} className="bg-info">
            //     <td></td>
            //     <td> </td>
            //     <td> PCO:</td>
            //     <td></td>
            //     <td colSpan="7"> </td>
            // </tr>
        ]
        isShowReportRows ? reportRows.push(reportRowsFooter) : null
        var reportRowsHeader = [];
        reportRowsHeader = [ 
            <tr key={"rowWeek_"} className="bg-success">
                <td> STT</td>
                <td> Ngày Yêu Cầu TT</td>
                <td> Người Đề Nghị</td>
                <td> Số Tiền</td>
                <td> Dự Án</td>
                <td> Mô Tả</td>
                <td> Ngày Yêu Cầu TT</td>
                <td> Loại TT</td>
                <td> Trạng Thái TT</td>
                <td> Công Ty</td>
                {/* <td className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></td> */}
            </tr>
        ].concat(reportRows);
        return (
            [<tr key={"weekRows_"} >
                <td colSpan="2">
                    {isShowReportRows ? null : <button className="bg-info-600 icon-plus22" onClick={() => this.handleShowReportRows()}></button>}
                    {isShowReportRows ? <button className="bg-info-600 icon-dash" onClick={() => this.handleHideReportRows()}></button> : null}
                </td>
                <td colSpan="8">Từ Ngày {weekMonth.start} - Đến Ngày {weekMonth.end}</td>


            </tr>].concat(isShowReportRows ? reportRowsHeader : null)
        );
    }

};

export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(WeekRows));

