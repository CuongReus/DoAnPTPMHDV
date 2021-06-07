import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker, RenderCheckbox, RenderSelect, RenderNumberInput } from '../../components/formInputs';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import isEmail from 'sane-email-validation';
import { StringUtils, FormatterUtils } from '../../utils/javascriptUtils';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_LEAVE_LETTER } from './action-types';
import { FIRE_REDIRECT } from '../../constants/action-types';
import ListFile from '../../components/ListFile';
import { isNull } from 'util';
import moment from 'moment';
import UserAvatar from '../../components/UserAvatar';
import Pdf from 'react-to-pdf';
import { ExportProjectReportData } from './ExportProjectReportData';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import KhongDau from 'khong-dau';

const ref = React.createRef();
const validate = values => {
    const errors = {};
    return errors;
}
const mapStateToProps = state => {
    var updateValue = {


    };
    return {
        initialValues: updateValue
    };
};

const mapDispatchToProps = dispatch => ({

});


class TableModalReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.handlePrintPdf = (
            productTotalPaid,
            coEfficientProduct,
            incurredProduct,
            labourTotalPaid,
            coEfficientLabour,
            incurredLabour,
            otherTotalPaid,
            coEfficientOther,
            constructionTeamTotalPaid,
            coEfficientConstructionTeam,
            totalIncurred,
            totalProjectCost,
            percentTotalProject,
            totalSurplusValue,
            quotationApprovalValue,
            incurredApprovalValue,
            totalProfit,
            totalManageFee,
            actualProfit) => {
            var dataExport = ExportProjectReportData.getDataExport(
                productTotalPaid,
                coEfficientProduct,
                incurredProduct,
                labourTotalPaid,
                coEfficientLabour,
                incurredLabour,
                otherTotalPaid,
                coEfficientOther,
                constructionTeamTotalPaid,
                coEfficientConstructionTeam,
                totalIncurred,
                totalProjectCost,
                percentTotalProject,
                totalSurplusValue,
                quotationApprovalValue,
                incurredApprovalValue,
                totalProfit,
                totalManageFee,
                actualProfit,
                this.props)
            if (dataExport) {
                pdfMake.vfs = pdfFonts.pdfMake.vfs;
                pdfMake.createPdf(dataExport).download('BAO_CAO_THANH_TOAN-'+(KhongDau(this.props.projectPaymentDto.projectDetailDto.project.name))+'.pdf');
            }
        }

    }

    componentWillMount() {


    }



    render() {
        // const { objectUser, listfile, title, onHide } = this.props;

        const { projectPaymentDto } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show, bsSize: "large", onHide: this.props.onHide, submitting: this.props.submitting };
        var productBudgetGroup = null;
        var constructionTeamBudgetGroup = null;
        var labourBudgetGroup = null;
        var otherBudgetGroup = null;
        var incurredProductGroup = null;
        var incurredLabourGroup = null;
        var incurredBudgetGroup = null;
        var percentTotalProjectGroup = null;
        var surplusValueGroup = null;
        var totalProfitGroup = null;
        var productTotalPaid = 0;
        var coEfficientProduct = 0;
        var labourTotalPaid = 0;
        var coEfficientLabour = 0;
        var otherTotalPaid = 0;
        var coEfficientOther = 0;
        var constructionTeamTotalPaid = 0;
        var coEfficientConstructionTeam = 0;
        var incurredProduct = 0;
        var incurredLabour = 0;
        var totalIncurred = 0;
        // var totalProjectBudget = 0;
        var totalProjectCost = 0;
        var percentTotalProject = 0;
        var totalSurplusValue = 0;
        var totalProfit = 0;
        var quotationApprovalValue = 0;
        var incurredApprovalValue = 0;
        var totalManageFee = 0;
        var actualProfit = 0;

        if (!projectPaymentDto) {
            return <LoadingScreen></LoadingScreen>
        } else if (projectPaymentDto) {
            projectPaymentDto.listProductCost.map(productCost => {
                productTotalPaid += productCost.totalPaid;
                coEfficientProduct = FormatterUtils.round2Decimals(productTotalPaid / projectPaymentDto.projectBudget.productBudget) * 100;
                incurredProduct = productTotalPaid - projectPaymentDto.projectBudget.productBudget;
            })
            projectPaymentDto.listLabourCost.map(labourCost => {
                labourTotalPaid += labourCost.totalPaid;
                coEfficientLabour = FormatterUtils.round2Decimals(labourTotalPaid / projectPaymentDto.projectBudget.labourBudget) * 100;
                incurredLabour = labourTotalPaid - projectPaymentDto.projectBudget.labourBudget;
            })
            projectPaymentDto.listOtherCost.map(otherCost => {
                otherTotalPaid += otherCost.totalPaid;
                coEfficientOther = FormatterUtils.round2Decimals(otherTotalPaid / projectPaymentDto.projectBudget.otherBudget) * 100;

            })
            projectPaymentDto.listConstructionTeamCost.map(constructionTeamCost => {
                constructionTeamTotalPaid += constructionTeamCost.totalPaid;
                coEfficientConstructionTeam = FormatterUtils.round2Decimals(constructionTeamTotalPaid / projectPaymentDto.projectBudget.constructionTeamBudget) * 100;

            })
            totalIncurred = incurredProduct + incurredLabour;
            totalProjectCost = productTotalPaid + labourTotalPaid + otherTotalPaid + constructionTeamTotalPaid;
            percentTotalProject = ((totalProjectCost / projectPaymentDto.projectBudget.totalProjectBudget) * 100);
            totalSurplusValue = (projectPaymentDto.projectBudget.totalProjectBudget - totalProjectCost);

            quotationApprovalValue = projectPaymentDto.projectDetailDto
                && projectPaymentDto.projectDetailDto.approval
                && projectPaymentDto.projectDetailDto.approval.approvalStatus == 'DA_DUYET'
                ? projectPaymentDto.projectDetailDto.approval.approvalValue : 0;

            incurredApprovalValue = projectPaymentDto.projectDetailDto
                && projectPaymentDto.projectDetailDto.incurred
                && projectPaymentDto.projectDetailDto.incurred.approvalStatus == "DA_DUYET"
                ? projectPaymentDto.projectDetailDto.incurred.approvalValue : 0;

            totalProfit = quotationApprovalValue + incurredApprovalValue - totalProjectCost;
            totalManageFee = FormatterUtils.round2Decimals(quotationApprovalValue + incurredApprovalValue) * 0.06;
            actualProfit = totalProfit - totalManageFee;




            productBudgetGroup = [
                <thead>
                    <tr className="bg-green">
                        <th colSpan="5" data-toggle="true"><center>Ngân Sách Vật Tư</center></th>
                    </tr>
                    <tr>
                        <th data-toggle="true">Tổng Ngân Sách Vật Tư (1)</th>
                        <th data-toggle="true">Tổng Thanh Toán Vật Tư (2)</th>
                        <th data-toggle="true">Hệ Số Chênh Lệch (2)/(1)</th>
                        <th colSpan="2" data-toggle="true">Trạng Thái <br /> (Đạt khi: nhỏ hơn hoặc bằng 100%)</th>
                    </tr>
                </thead>,
                <tbody>
                    <tr>
                        <th data-toggle="true">{FormatterUtils.formatCurrency(projectPaymentDto.projectBudget.productBudget)}</th>
                        <th data-toggle="true">{FormatterUtils.formatCurrency(productTotalPaid)}</th>
                        <th data-toggle="true">{coEfficientProduct}%</th>
                        <th colSpan="2" style={coEfficientProduct > 100 ? { color: 'red' } : { color: 'green' }} data-toggle="true">{coEfficientProduct > 100 ? "Không Đạt" : "Đạt"}</th>
                    </tr>
                </tbody>]
            constructionTeamBudgetGroup = [<thead>
                <tr className="bg-green">
                    <th colSpan="5" data-toggle="true"><center>Ngân Sách Đội Thi Công</center></th>
                </tr>
                <tr>
                    <th data-toggle="true">Tổng Ngân Sách Đội Thi Công (3)</th>
                    <th data-toggle="true">Tổng Thanh Toán Đội Thi Công (4)</th>
                    <th data-toggle="true">Hệ Số Chênh Lệch (4)/(3)</th>
                    <th colSpan="2" data-toggle="true">Trạng Thái <br /> (Đạt khi: nhỏ hơn hoặc bằng 100%)</th>
                </tr>
            </thead>,
            <tbody>
                <tr>
                    <th data-toggle="true">{FormatterUtils.formatCurrency(projectPaymentDto.projectBudget.constructionTeamBudget)}</th>
                    <th data-toggle="true">{FormatterUtils.formatCurrency(constructionTeamTotalPaid)}</th>
                    <th data-toggle="true">{coEfficientConstructionTeam}%</th>
                    <th colSpan="2" style={coEfficientConstructionTeam > 100 ? { color: 'red' } : { color: 'green' }} data-toggle="true">{coEfficientConstructionTeam > 100 ? "Không Đạt" : "Đạt"}</th>
                </tr>
            </tbody>]
            labourBudgetGroup = [<thead>
                <tr className="bg-green">
                    <th colSpan="5" data-toggle="true"><center>Ngân Sách Nhân Công</center></th>
                </tr>
                <tr>
                    <th data-toggle="true">Tổng Ngân Sách Nhân Công (5)</th>
                    <th data-toggle="true">Tổng Thanh Toán Nhân Công (6)</th>
                    <th data-toggle="true">Hệ Số Chênh Lệch (6)/(5)</th>
                    <th colSpan="2" data-toggle="true">Trạng Thái <br /> (Đạt khi: nhỏ hơn hoặc bằng 100%)</th>
                </tr>
            </thead>,
            <tbody>
                <tr>
                    <th data-toggle="true">{FormatterUtils.formatCurrency(projectPaymentDto.projectBudget.labourBudget)}</th>
                    <th data-toggle="true">{FormatterUtils.formatCurrency(labourTotalPaid)}</th>
                    <th data-toggle="true">{coEfficientLabour}%</th>
                    <th colSpan="2" style={coEfficientLabour > 100 ? { color: 'red' } : { color: 'green' }} data-toggle="true">{coEfficientLabour > 100 ? "Không Đạt" : "Đạt"}</th>
                </tr>
            </tbody>]

            otherBudgetGroup = [<thead>
                <tr className="bg-green">
                    <th colSpan="5" data-toggle="true"><center>Ngân Sách Chi Phí Khác</center></th>
                </tr>
                <tr>
                    <th data-toggle="true">Tổng Ngân Sách Chi Phí Khác (7)</th>
                    <th data-toggle="true">Tổng Thanh Toán Chi Phí Khác (8)</th>
                    <th data-toggle="true">Hệ Số Chênh Lệch (8)/(7)</th>
                    <th colSpan="2" data-toggle="true">Trạng Thái <br /> (Đạt khi: nhỏ hơn hoặc bằng 100%)</th>
                </tr>
            </thead>,
            <tbody>
                <tr>
                    <th data-toggle="true">{FormatterUtils.formatCurrency(projectPaymentDto.projectBudget.otherBudget)}</th>
                    <th data-toggle="true">{FormatterUtils.formatCurrency(otherTotalPaid)}</th>
                    <th data-toggle="true">{coEfficientOther}%</th>
                    <th colSpan="2" style={coEfficientOther > 100 ? { color: 'red' } : { color: 'green' }} data-toggle="true">{coEfficientOther > 100 ? "Không Đạt" : "Đạt"}</th>
                </tr>
            </tbody>]

            incurredProductGroup = [<thead>
                <tr className="bg-green">
                    <th colSpan="5" data-toggle="true"><center>Phát Sinh Vật Tư</center></th>
                </tr>
                <tr>
                    <th data-toggle="true">Ngân Sách Vật Tư (9)</th>
                    <th data-toggle="true">Thanh Toán Vật Tư (10)</th>
                    <th data-toggle="true">Tổng Phát Sinh Vật Tư (10) - (9)</th>
                    <th colSpan="2" data-toggle="true">Trạng Thái <br /> (Đạt khi: nhỏ hơn hoặc bằng 0)</th>
                </tr>
            </thead>,
            <tbody>
                <tr>
                    <th data-toggle="true">{FormatterUtils.formatCurrency(projectPaymentDto.projectBudget.productBudget)}</th>
                    <th data-toggle="true">{FormatterUtils.formatCurrency(productTotalPaid)}</th>
                    <th data-toggle="true">{FormatterUtils.formatCurrency(incurredProduct)}</th>
                    <th colSpan="2" style={parseInt(incurredProduct) > 0 ? { color: 'red' } : { color: 'green' }} data-toggle="true">{parseInt(incurredProduct) > 0 ? "Không Đạt" : "Đạt"}</th>
                </tr>
            </tbody>]
            incurredLabourGroup = [<thead>
                <tr className="bg-green">
                    <th colSpan="5" data-toggle="true"><center>Phát Sinh Nhân Công</center></th>
                </tr>
                <tr>
                    <th data-toggle="true">Ngân Sách Nhân Công (11)</th>
                    <th data-toggle="true">Thanh Toán Nhân Công (12)</th>
                    <th data-toggle="true">Tổng Phát Sinh Nhân Công (12) - (11)</th>
                    <th colSpan="2" data-toggle="true">Trạng Thái  <br /> (Đạt khi: nhỏ hơn hoặc bằng 0)</th>
                </tr>
            </thead>,
            <tbody>
                <tr>
                    <th data-toggle="true">{FormatterUtils.formatCurrency(projectPaymentDto.projectBudget.labourBudget)}</th>
                    <th data-toggle="true">{FormatterUtils.formatCurrency(labourTotalPaid)}</th>
                    <th data-toggle="true">{FormatterUtils.formatCurrency(incurredLabour)}</th>
                    <th colSpan="2" style={parseInt(incurredLabour) > 0 ? { color: 'red' } : { color: 'green' }} data-toggle="true">{parseInt(incurredLabour) > 0 ? "Không Đạt" : "Đạt"}</th>
                </tr>
            </tbody>]




            var allTotalMoneyGroupToCalculate = [
                <thead>
                    <tr className="bg-orange">
                        <th colSpan="5" data-toggle="true"><center>Các Tổng Tiền</center></th>
                    </tr>
                    <tr>
                        <th data-toggle="true">Tổng Ngân Sách (13)</th>
                        <th data-toggle="true">Tổng Thanh Toán (14) </th>
                        <th data-toggle="true">Tổng Báo Giá Được Duyệt (15) </th>
                        <th data-toggle="true">Tổng Phát Sinh Được Duyệt (16) </th>
                        <th data-toggle="true">Tổng Ngân Sách Phát Sinh (17)</th>
                    </tr>
                </thead>,
                <tbody>
                    <tr>
                        <th data-toggle="true">{FormatterUtils.formatCurrency(projectPaymentDto.projectBudget.totalProjectBudget)}</th>
                        <th data-toggle="true">{FormatterUtils.formatCurrency(totalProjectCost)}</th>
                        <th data-toggle="true">{FormatterUtils.formatCurrency(quotationApprovalValue)}</th>
                        <th data-toggle="true">{FormatterUtils.formatCurrency(incurredApprovalValue)}</th>
                        <th data-toggle="true">{FormatterUtils.formatCurrency(projectPaymentDto.projectBudget.incurredBudget)}</th>
                    </tr>
                </tbody>
            ]
            incurredBudgetGroup = [<thead>
                <tr className="bg-green">
                    <th colSpan="5" data-toggle="true"><center>Chi Phí Phát Sinh</center></th>
                </tr>
                <tr>
                    <th data-toggle="true">Phát Sinh Vật Tư (18)</th>
                    <th data-toggle="true">Phát Sinh Nhân Công (19)</th>
                    <th data-toggle="true">Tổng Phát Sinh (18) + (19)</th>
                    <th colSpan="2" data-toggle="true">Trạng Thái  <br /> (Đạt khi: nhỏ hơn hoặc bằng (17))</th>
                </tr>
            </thead>,
            <tbody>
                <tr>
                    <th data-toggle="true">{FormatterUtils.formatCurrency(incurredProduct)}</th>
                    <th data-toggle="true">{FormatterUtils.formatCurrency(incurredLabour)}</th>
                    <th data-toggle="true">{FormatterUtils.formatCurrency(totalIncurred)}</th>
                    <th colSpan="2" style={parseInt(totalIncurred) > parseInt(projectPaymentDto.projectBudget.incurredBudget) ? { color: 'red' } : { color: 'green' }} data-toggle="true">{parseInt(totalIncurred) > parseInt(projectPaymentDto.projectBudget.incurredBudget) ? "Không Đạt" : "Đạt"}</th>
                </tr>
            </tbody>]
            percentTotalProjectGroup = [<thead>
                <tr className="bg-green">
                    <th colSpan="5" data-toggle="true"><center>Tổng Phần Trăm Thanh Toán</center></th>
                </tr>
                <tr>
                    <th data-toggle="true">Tổng Ngân Sách (13)</th>
                    <th data-toggle="true">Tổng Thanh Toán (14)</th>
                    <th data-toggle="true">Phần Trăm Thanh Toán (14) / (13) </th>
                    <th colSpan="2" data-toggle="true">Trạng Thái <br />  (Đạt khi: nhỏ hơn hoặc bằng 100%)</th>
                </tr>
            </thead>,
            <tbody>
                <tr>
                    <th data-toggle="true">{FormatterUtils.formatCurrency(projectPaymentDto.projectBudget.totalProjectBudget)}</th>
                    <th data-toggle="true">{FormatterUtils.formatCurrency(totalProjectCost)}</th>
                    <th data-toggle="true">{FormatterUtils.round2Decimals(percentTotalProject)} %</th>
                    <th colSpan="2" style={percentTotalProject > 100 ? { color: 'red' } : { color: 'green' }} data-toggle="true">{percentTotalProject > 100 ? "Không Đạt" : "Đạt"}</th>
                </tr>
            </tbody>]
            surplusValueGroup = [<thead>
                <tr className="bg-green">
                    <th colSpan="5" data-toggle="true"><center>Giá Trị Thặng Dư</center></th>
                </tr>
                <tr>
                    <th data-toggle="true">Tổng Ngân Sách (13)</th>
                    <th data-toggle="true">Tổng Thanh Toán (14)</th>
                    <th data-toggle="true">Giá Trị Thặng Dự (13) - (14)</th>
                    <th colSpan="2" data-toggle="true">Trạng Thái <br /> (Đạt khi: Lớn hơn 0)</th>
                </tr>
            </thead>,
            <tbody>
                <tr>
                    <th data-toggle="true">{FormatterUtils.formatCurrency(projectPaymentDto.projectBudget.totalProjectBudget)}</th>
                    <th data-toggle="true">{FormatterUtils.formatCurrency(totalProjectCost)}</th>
                    <th data-toggle="true">{FormatterUtils.formatCurrency(totalSurplusValue)}</th>
                    <th colSpan="2" style={totalSurplusValue < 0 ? { color: 'red' } : { color: 'green' }} data-toggle="true">{totalSurplusValue < 0 ? "Không Đạt" : "Đạt"}</th>
                </tr>
            </tbody>]
            totalProfitGroup = [<thead>
                <tr className="bg-green">
                    <th colSpan="5" data-toggle="true"><center>Tổng Lợi Nhuận</center></th>
                </tr>
                <tr>
                    <th data-toggle="true">Lợi Nhuận (20)) =  ((15)+ (16)) - (14) </th>
                    <th data-toggle="true">Chi Phí Quản Lý 6% (21) =  ((15)+(16) * 6%) </th>
                    <th data-toggle="true">Lợi Nhuận Sau Quản Lý (20) - (21) </th>
                    <th colSpan="2" data-toggle="true">Trạng Thái <br /> (Đạt khi: Lớn hơn 0)</th>
                </tr>
            </thead>,
            <tbody>
                <tr>
                    <th data-toggle="true">{FormatterUtils.formatCurrency(totalProfit)}</th>
                    <th data-toggle="true">{FormatterUtils.formatCurrency(totalManageFee)}</th>
                    <th data-toggle="true">{FormatterUtils.formatCurrency(actualProfit)}</th>
                    <th colSpan="2" style={actualProfit < 0 ? { color: 'red' } : { color: 'green' }} data-toggle="true">{actualProfit < 0 ? "Không Đạt" : "Đạt"}</th>
                </tr>
            </tbody>]


        }



        var newModal = null;
        newModal =
            <Modal
                {...modalConfig}
                aria-labelledby="example-custom-modal-styling-title"

            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body dialogClassName="modal-90w">
                    <center>
                        <button onClick={() => this.handlePrintPdf(
                            productTotalPaid,
                            coEfficientProduct,
                            incurredProduct,
                            labourTotalPaid,
                            coEfficientLabour,
                            incurredLabour,
                            otherTotalPaid,
                            coEfficientOther,
                            constructionTeamTotalPaid,
                            coEfficientConstructionTeam,
                            totalIncurred,
                            totalProjectCost,
                            percentTotalProject,
                            totalSurplusValue,
                            quotationApprovalValue,
                            incurredApprovalValue,
                            totalProfit,
                            totalManageFee,
                            actualProfit,
                        )}><i className="icon-file-pdf"></i>In PDF</button>
                        {/* <Pdf targetRef={ref} filename="báo-cáo-thanh-toán.pdf">
                        {({ toPdf }) => <button onClick={toPdf}>In PDF</button>}</Pdf> */}

                        <div style={{ width: '92%', height: '100%' }} className="panel panel-flat" ref={ref}>
                            <h2>Báo Cáo Thanh Toán</h2>
                            <h3>Dự Án: {projectPaymentDto.projectDetailDto.project.name}</h3>
                            <h3>Công Việc: {projectPaymentDto.projectDetailDto.name}</h3>
                            <h3>Ngày Bắt Đầu Làm Việc: {projectPaymentDto.projectDetailDto.efficiency ? projectPaymentDto.projectDetailDto.efficiency.startActualProgressDate : null} ||  Ngày Kết Thúc Làm Việc: {projectPaymentDto.projectDetailDto.efficiency ? projectPaymentDto.projectDetailDto.efficiency.endPlanProgressDate : null}</h3>
                            {projectPaymentDto.projectDetailDto.efficiency ? <h3>Số Ngày: {moment(projectPaymentDto.projectDetailDto.efficiency.endPlanProgressDate).diff(projectPaymentDto.projectDetailDto.efficiency.startActualProgressDate, 'days')} </h3> : null}

                            <table className="table .table-xxs table-togglable table-bordered table-hover">
                                {productBudgetGroup}
                                {constructionTeamBudgetGroup}
                                {labourBudgetGroup}
                                {otherBudgetGroup}
                                {incurredProductGroup}
                                {incurredLabourGroup}
                                {allTotalMoneyGroupToCalculate}
                                {incurredBudgetGroup}
                                {percentTotalProjectGroup}
                                {surplusValueGroup}
                                {totalProfitGroup}
                            </table>

                        </div>

                    </center>

                </Modal.Body>
            </Modal>






        return newModal;
    }
};


export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'TableModalReport',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(TableModalReport)));
