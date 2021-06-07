import React from 'react';
import { translate } from 'react-i18next';
import ProjectCostReportLot from './ProjectCostReportLot';
import moment from 'moment';
import { FormatterUtils } from '../../utils/javascriptUtils';

class MonthRows extends React.Component {
    constructor() {
        super();
        this.state = {
            isShowWeekRows: false,
            weekDays: [],
        }

        this.handleShowWeekRows = this.handleShowWeekRows.bind(this);
        this.handleHideWeekRows = this.handleHideWeekRows.bind(this);

    }

    handleShowWeekRows() {
        this.setState({
            isShowWeekRows: true,
        });


    }

    //function get week day in month
    getWeeksStartAndEndInMonth() {
        const { monthDto, year } = this.props;
        let _start = 'monday';
        let weeks = []
        let firstDate = new Date(year, monthDto.month - 1, 1);
        let lastDate = new Date(year, monthDto.month - 1, 10);
   
        let numDays = lastDate.getDate();
        let start = 1;
        let end = 7 - firstDate.getDay();
        if (_start == 'monday') {
            if (firstDate.getDay() === 0) {
                end = 1;
            } else {
                end = 7 - firstDate.getDay() + 1;
            }
        }
        while (start <= numDays) {
            let businessWeekEnd = end
            if (businessWeekEnd > 0) {
                if (businessWeekEnd > start) {
                    weeks.push({ start: start, end: businessWeekEnd });
                }
                else {
                    //Check for last day else end date is within 5 days of the week.
                    weeks.push({ start: start, end: end });
                }
            }
            start = end + 1;
            end = end + 7;
            end = start === 1 && end === 8 ? 1 : end;
            if (end > numDays) {
                end = numDays;
            }
        }
        this.setState({ weekDays: weeks });
    }

    handleHideWeekRows() {
        this.setState({
            isShowWeekRows: false
        })
    }

    getProjectCostReportLot(){

    }

    componentWillMount() {
        this.getWeeksStartAndEndInMonth();
        // this.getProjectCostReportLot();
    };


    render() {

        const { monthDto, year } = this.props;

        let firstDateLot1 = new Date(year, monthDto.month - 1, 1);
        let lastDateLot1 = new Date(year, monthDto.month - 1, 10);
        let firstDateLot2 = new Date(year, monthDto.month - 1, 11);
        let lastDateLot2 = new Date(year, monthDto.month - 1, 20);
        let firstDateLot3 = new Date(year, monthDto.month - 1, 21);
        let lastDateLot3 = new Date(year, monthDto.month, 0);
        let numberLot = [
            {lot : 1,startDay : firstDateLot1, endDay: lastDateLot1 },
            {lot : 2,startDay: firstDateLot2, endDay: lastDateLot2 },
            {lot : 3,startDay : firstDateLot3, endDay: lastDateLot3 }
                ]

        var isShowWeekRows = this.state.isShowWeekRows;
        var rowWeek = numberLot.map(item => {
            return <ProjectCostReportLot lots={item} month={monthDto.month} year={year}/>
        });


        return (
            [<tr>
                <td key={"monthRows_" + monthDto.month} colSpan="2">
                    {isShowWeekRows ? null : <button className="bg-info-600 icon-plus22" onClick={this.handleShowWeekRows}></button>}
                    {isShowWeekRows ? <button className="bg-info-600 icon-dash" onClick={() => this.handleHideWeekRows()}></button> : null}
                </td>
                <td colSpan="2">Tháng {monthDto.month}</td>
                <td colSpan="3">
                    {/* <SecuredComponent allowedPermission="admin.totalRevenue.check"> */}
                        {FormatterUtils.formatCurrency(monthDto.totalMoneyProjectCost)}
                    {/* </SecuredComponent> */}

                </td>
                <td colSpan="2">
                    {/* <SecuredComponent allowedPermission="admin.totalRevenue.check"> */}
                        {FormatterUtils.formatCurrency(monthDto.totalPaidProjectCost)}
                    {/* </SecuredComponent> */}

                </td>
                <td colSpan="2">
                    {/* <SecuredComponent allowedPermission="admin.totalRevenue.check"> */}
                        {FormatterUtils.formatCurrency(monthDto.totalMoneyProjectCost - monthDto.totalPaidProjectCost)}
                    {/* </SecuredComponent> */}

                </td>
                <td colSpan="1"></td>
            </tr>
            ].concat(isShowWeekRows ? rowWeek : null)
        );
    }

};

export default translate('translations')(MonthRows);

