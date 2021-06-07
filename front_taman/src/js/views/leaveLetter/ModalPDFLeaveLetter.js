import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker, RenderCheckbox, RenderSelect, RenderNumberInput } from '../../components/formInputs';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import isEmail from 'sane-email-validation';
import { StringUtils } from '../../utils/javascriptUtils';
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
const ref = React.createRef();



class ModalLeaveLetter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }





    render() {
        // const { objectUser, listfile, title, onHide } = this.props;

        const { handleSubmit, submitting, title, invalid, updateField, userId, idUserFromLeaveDayList, leaveLetter } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show, bsSize: "large", onHide: this.props.onHide, submitting: this.props.submitting };
        //Load Id On Form 


        var newModal = null;
        newModal =


            <Modal

                {...modalConfig}
                aria-labelledby="example-custom-modal-styling-title"

            >
                <Modal.Header closeButton>


                </Modal.Header>
                <Modal.Body>
                    <center>
                        <Pdf targetRef={ref} options={{
                            orientation: 'p',
                            unit: 'mm',
                            format: 'a4',
                            putOnlyUsedFonts: true
                        }} filename="đơn-xin-nghỉ-phép.pdf">
                            {({ toPdf }) => <button onClick={toPdf}>In PDF</button>}</Pdf>

                        <div style={{
                            width: "21cm", height: '29.7cm',
                            padding: '1cm',
                            // margin: 'auto',
                        }} className="page" ref={ref}>
                            <center>

                                <br />
                                {leaveLetter.user.company.code == "TA" ? 
                                [
                                <div style={{display:'inline-flex'}}><img src="/assets/images/backgrounds/Logo_TamAn.png" style={{ width: "auto", height: "30px" }}></img></div>,<div><h1>CÔNG TY TNHH XÂY DỰNG TTNT TÂM AN</h1></div>
                                ]:[ <div style={{display:'inline-flex'}}><img src="/assets/images/Logo_PCO.png" style={{ height: "200px" }}></img><br/></div>,<div><h3>CÔNG TY TNHH THƯƠNG MẠI DICH VỤ XÂY DỰNG PCO</h3></div>
                                   
                                    ]}



                                <div><h1>Đơn Xin Nghỉ Phép</h1></div>


                                <table className="table table-bordered table-framed">
                                    <thead>
                                        <tr className="bg-green">
                                            <th style={{ fontSize: '16px' }} colSpan="2">Họ Tên Nhân Viên</th>
                                            <th style={{ fontSize: '16px' }} colSpan="5">Bộ phận</th>
                                            <th style={{ fontSize: '16px' }} colSpan="2">Nơi làm việc</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td colSpan="2" >{leaveLetter.user ? leaveLetter.user.fullName : null}</td>
                                            <td colSpan="5" >{leaveLetter.user.department ? leaveLetter.user.department.name : null}</td>
                                            <td colSpan="2">{leaveLetter.workPlace}</td>
                                        </tr>
                                        <tr className="warning" >
                                            <td style={{ fontSize: '16px' }} colSpan="2" rowSpan="2">Phân loại nghỉ phép</td>
                                            <td style={{ fontSize: '16px' }} colSpan="5" >Thời Gian Xin Phép</td>
                                            <td style={{ fontSize: '16px' }} colSpan="2" rowSpan="2">Lý Do</td>
                                        </tr>
                                        <tr className="warning">

                                            <td colSpan="2">Từ Ngày - Đến Ngày</td>
                                            <td>Số Ngày</td>
                                            <td>Ngày Lễ / Cuối Tuần</td>
                                            <td>Tổng Ngày Nghỉ</td>

                                        </tr>
                                        <tr>
                                            <td colSpan="2">{leaveLetter.leaveType}</td>
                                            <td colSpan="2"> {moment(leaveLetter.startLeaveDate).format("DD/MM/YYYY")} <br /> {moment(leaveLetter.endLeaveDate).format("DD/MM/YYYY")}</td>
                                            <td>{leaveLetter.leaveDays}</td>
                                            <td>{leaveLetter.holiday}</td>
                                            <td>{leaveLetter.leaveDays - leaveLetter.holiday}</td>
                                            <td>{leaveLetter.reason}</td>
                                        </tr>
                                        <tr className="warning">
                                            <td style={{ fontSize: '16px' }} colSpan="2" >Phép Còn Lại</td>
                                            <td style={{ fontSize: '16px' }} rowSpan="2" colSpan="5">Người Theo Dõi</td>
                                            <td style={{ fontSize: '16px' }} colSpan="2" rowSpan="2">Người Nộp Đơn</td>
                                        </tr>
                                        <tr className="warning">
                                            <td >Phép Năm</td>
                                            <td >Phép Ngoài Giờ (Trong Tháng)</td>

                                        </tr>
                                        <tr>
                                            <td >{leaveLetter.user ? leaveLetter.user.annualLeaveYear - (leaveLetter.leaveDays - leaveLetter.holiday) : null}</td>
                                            <td ></td>
                                            <td colSpan="5" >{leaveLetter.approvedBy ? leaveLetter.approvedBy.fullName : null}</td>
                                            <td>{leaveLetter.user ? leaveLetter.user.fullName : null}</td>
                                        </tr>
                                        <tr className="bg-green">
                                            <td colSpan="7" style={{ fontSize: '16px' }} >Ghi Chú</td>
                                            <td style={{ fontSize: '16px' }}>Giám Đốc</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="7">
                                                {leaveLetter.note}
                                            </td>
                                            <td>
                                                <br style={{ lineHeight: '100px' }} />
                                                <br style={{ lineHeight: '100px' }} />
                                                <br style={{ lineHeight: '100px' }} />
                                                <br style={{ lineHeight: '100px' }} />


                                            </td>
                                        </tr>


                                    </tbody>
                                    <tfoot></tfoot>
                                </table>
                            </center>

                        </div>
                    </center>

                </Modal.Body>
            </Modal>






        return newModal;
    }
};


export default translate('translations')(ModalLeaveLetter);
