import React from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { FormatterUtils } from '../../utils/javascriptUtils';
import moment from 'moment';


const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
});
const mapDispatchToProps = dispatch => ({
});
class ProjectCostReportRows extends React.Component {
    constructor() {
        super();
        this.state = {
            
        }

    };
    componentWillMount() {

    };

    render() {
        const { t, reportRow, weekMonth, month, year, currentNo } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show, bsSize: "lg", onHide: this.props.onHide, submitting: this.props.submitting };
 
        
        var rows = [
            <tr key="reportRow_">
                <td>{currentNo}</td>
                <td>{moment(reportRow.createdDate).format("DD-MM-YYYY")}</td>
                <td>{reportRow.createdUser ? reportRow.createdUser.fullName : "N/A"}</td>
                <td>{FormatterUtils.formatCurrency(reportRow.totalMoney)}</td>
                <td>{reportRow.projectDetail.project.name} <br /><sub>  {reportRow.projectDetail.name}</sub></td>
                <td>{reportRow.title}</td>
                <td>{reportRow.closeDate ? moment(reportRow.closeDate).format("DD-MM-YYYY") : ""}</td>
                <td>{t(reportRow.paymentType)}</td>
                <td>
                    <span style={reportRow.status == "DA_THANH_TOAN_DU" ? { color: "green", textTransform: "uppercase" } : { color: "red", textTransform: "uppercase" }}>{t(reportRow.status)}</span>
                </td>
                <td>
                    <span style={reportRow.projectDetail.project.projectYear.company.name == "PCO" ? { color: "blue", textTransform: "uppercase" } : { color: "green", textTransform: "uppercase" }}>{reportRow.projectDetail.project.projectYear.company.name}</span>
                </td>
                <td>{reportRow.note}</td>
                {/* <td className="text-center footable-visible footable-last-column">
                    <ul className="icons-list">
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <i className="icon-menu9"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-right">
                                    <li><a onClick={() => handleShowSaleModal(reportRow.id)}><i className="icon-pencil"></i>Sửa Thông Tin</a></li>
                            </ul>
                        </li>
                    </ul>
                </td> */}
            </tr>
        ]
        return rows;
    }
};
export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(ProjectCostReportRows));
