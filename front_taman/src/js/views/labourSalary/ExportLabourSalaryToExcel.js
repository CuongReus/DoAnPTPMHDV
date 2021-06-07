import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker,RenderCheckbox, RenderSelect, RenderNumberInput, RenderMoneyFormat } from '../../components/formInputs';
import { Field, reduxForm,formValueSelector } from 'redux-form';
import isEmail from 'sane-email-validation';
import { StringUtils,FormatterUtils } from '../../utils/javascriptUtils';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import {LOAD_UPDATING_LABOUR_SALARY} from './action-types';
import {FIRE_REDIRECT } from '../../constants/action-types';
import ListFile from '../../components/ListFile';
import { isNull } from 'util';
import moment from 'moment';



class ExportLabourSalaryToExcel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllLabour: []
        }
    }
   
  componentWillMount() {
        // const { loadLabourSalary,updateField, currentUser } = this.props;
        // var id = this.props.idLabourSalary;
        // this.getListLabour();
        // const dataPromise = agent.LabourSalaryApi.getLabourSalary(id);
        // loadLabourSalary(Promise.resolve(dataPromise)); 
    }



    

   
    render() {
        const {labourSalaryDto} = this.props;
        const modalConfig = { backdrop: 'static',show: this.props.show,bsSize:"large",  onHide:this.props.onHide,submitting: this.props.submitting};
       
       const { listfile, title, onHide } = this.props;
       if(labourSalaryDto){

       var rows =<tr  key={labourSalaryDto.id}>
                <td>{labourSalaryDto.labour ? labourSalaryDto.labour.fullName : null}</td>
                <td>{labourSalaryDto.labour ? FormatterUtils.formatCurrency(labourSalaryDto.salaryPerDay):null}</td>
                <td className="success">{labourSalaryDto.attendanceLv0/8}</td>
                <td className="success">{labourSalaryDto.attendanceLv1/8}</td>
                {/* <td className="success">{labourSalaryDto.attendanceLv2/8}</td>
                <td className="success">{labourSalaryDto.attendanceLv3/8}</td> */}
                <td style={{color:'#1E88E5'}}>{labourSalaryDto.totalAttendanceCalc/8}</td>
                <td style={{color:'#1E88E5'}}>{FormatterUtils.formatCurrency(labourSalaryDto.totalSalary)}</td>
                <td className="info">{labourSalaryDto.numberOfDistanceDay}</td>
                <td className="info">{labourSalaryDto.numberOfTransport}</td>
                <td className="info">{FormatterUtils.formatCurrency(labourSalaryDto.labourSupportFee)}</td>
                <td className="info">{FormatterUtils.formatCurrency(labourSalaryDto.otherSupportFee)}</td>
                <td style={{color:'#1E88E5'}}>{FormatterUtils.formatCurrency(labourSalaryDto.totalSupportFee)}</td>
                <td className="warning">{FormatterUtils.formatCurrency(labourSalaryDto.birthdayFee)}</td>
                <td className="warning">{FormatterUtils.formatCurrency(labourSalaryDto.holidayFee)}</td>
                <td className="warning">{FormatterUtils.formatCurrency(labourSalaryDto.diligenceFee)}</td>
                <td className="warning">{FormatterUtils.formatCurrency(labourSalaryDto.otherExtraFee)}</td>
                <td style={{color:'#1E88E5'}}>{FormatterUtils.formatCurrency(labourSalaryDto.totalExtraFee)}</td>
                <td className="danger">{FormatterUtils.formatCurrency(labourSalaryDto.unionFee)}</td>
                <td className="danger">{FormatterUtils.formatCurrency(labourSalaryDto.taxFee)}</td>
                <td className="danger">{FormatterUtils.formatCurrency(labourSalaryDto.socialInsuranceFee)}</td>
                <td className="danger">{FormatterUtils.formatCurrency(labourSalaryDto.penaltyFee)}</td>
                <td className="danger">{FormatterUtils.formatCurrency(labourSalaryDto.advanceFee)}</td>
                <td style={{color:'#1E88E5'}}>{FormatterUtils.formatCurrency(labourSalaryDto.totalMinusFee)}</td>
                <td  style={{color:'#8BC34A',fontSize:14}}>{FormatterUtils.formatCurrency(labourSalaryDto.actualSalary)}</td>
                <td>{labourSalaryDto.note}</td>
                <td className="text-center footable-visible footable-last-column">
                    <ul className="icons-list">
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <i className="icon-menu9"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-right">
                                <li><a onClick={() => this.handleShowmodal("salaryPerDayEdit",labourSalaryDto.id)}><i className="icon-pencil4"></i>Sửa Lương Theo Ngày</a></li>
                                <li><a onClick={() => this.handleShowmodal("supportFeeEdit",labourSalaryDto.id)}><i className="icon-pencil4"></i>Sửa Tiền Phụ Cấp</a></li>
                                <li><a onClick={() => this.handleShowmodal("extraFeeEdit",labourSalaryDto.id)}><i className="icon-pencil4"></i>Sửa Tiền Ngoài Lương</a></li>
                                <li><a onClick={() => this.handleShowmodal("minusFeeEdit",labourSalaryDto.id)}><i className="icon-pencil4"></i>Sửa Tiền Trừ</a></li>
                            </ul>
                        </li>
                    </ul>
                </td>
            </tr>
       }
     var newModal = null;
     newModal = <div style={{ width: '100%' }}>
              
                    <table className="table table-bordered table-xxs">
                                    <thead>
                                        <tr className="bg-green">
                                            {/* <th data-hide="phone">Hình Ảnh</th> */}
                                            <th rowSpan="2" data-toggle="phone">Tên Nhân Viên</th>
                                            <th rowSpan="2" data-toggle="phone">Lương Theo Ngày</th>
                                            {/* <th colSpan="4" data-toggle="phone"><center>Ngày Công Thực Tế</center></th> */}
                                            <th colSpan="2" data-toggle="phone"><center>Ngày Công</center></th>
                                            <th rowSpan="2" data-toggle="phone">Tổng Ngày Công</th>
                                            <th rowSpan="2" data-toggle="phone">Tổng Tiền Ngày Công</th>
                                            <th colSpan="4" data-toggle="phone"><center>Phụ Cấp</center></th>
                                            <th rowSpan="2" data-toggle="phone">Tổng Tiền Phụ Cấp</th>
                                            <th colSpan="4" data-toggle="phone"><center>Ngoài Lương</center></th>
                                            <th rowSpan="2" data-toggle="phone">Tổng Ngoài Lương</th>
                                            <th colSpan="5" data-toggle="phone"><center>Khoản Trừ</center></th>
                                            <th rowSpan="2" data-toggle="phone">Tổng Khoảng Trừ</th>
                                            <th rowSpan="2" data-toggle="phone">Tổng Lương Thực (Đã Trừ Các Khoảng Chi Phí)</th>
                                            <th rowSpan="2" data-toggle="phone">Ghi Chú</th>
                                            <th rowSpan="2" className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        </tr>
                                        <tr className="bg-green">
                                            {/* <th data-toggle="phone">Ngày Công (Thường)</th>
                                            <th data-toggle="phone">Ngày Công (Cấp Độ 1)</th>
                                            <th data-toggle="phone">Ngày Công (Cấp Độ 2)</th>
                                            <th data-toggle="phone">Ngày Công (Cấp Độ 3)</th> */}
                                            <th data-toggle="phone">Ngày Công (Thường)</th>
                                            <th data-toggle="phone">Ngày Công Tăng Ca</th>
                                            {/* <th data-toggle="phone">Ngày Công (Cấp Độ 2)</th>
                                            <th data-toggle="phone">Ngày Công (Cấp Độ 3)</th> */}
                                            <th data-toggle="phone">Số Ngày Phụ Cấp Công Trình Xa</th>
                                            <th data-toggle="phone">Số Ngày Phụ Cấp Đi Lại</th>
                                            <th data-toggle="phone">Lương Phụ Cấp</th>
                                            <th data-toggle="phone">Phụ Cấp Khác</th>
                                            <th data-toggle="phone">Tiền Thưởng Sinh Nhật</th>
                                            <th data-toggle="phone">Tiền Thưởng Lễ</th>
                                            <th data-toggle="phone">Thưởng Chuyên Cần</th>
                                            <th data-toggle="phone">Tiền Thưởng Khác</th>
                                            <th data-toggle="phone">Tiền Công Đoàn</th>
                                            <th data-toggle="phone">Thuế TNCN</th>
                                            <th data-toggle="phone">Tiền BHXH</th>
                                            <th data-toggle="phone">Phạt Vi Phạm</th>
                                            <th data-toggle="phone">Tiền Tạm Ứng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                        <tr>
                                            <td colSpan="28"></td>
                                        </tr>
                                        <tr style={{height:'100px'}}>
                                            <td colSpan="28"></td>
                                        </tr>
                                       
                                    </tbody>
                                </table>
                   
            </div>
        
       

        

        return newModal;
    }
};


export default translate('translations')(ExportLabourSalaryToExcel);
