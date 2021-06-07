import moment from 'moment';
import qs from 'query-string';
import React from 'react';
import { translate } from 'react-i18next';
import { toast } from 'react-toastify';
import SecuredComponent from '../../components/SecuredComponent';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import { ScriptUtils, UrlUtils } from '../../utils/javascriptUtils';
import ModalLeaveLetter from './ModalLeaveLetter';
import ModalPDFLeaveLetter from './ModalPDFLeaveLetter';
class LeaveLetterList extends React.Component {
    constructor() {
        super();
        this.state = {
            listLeaveDay: null,
            isLeaveDayModalShown: false,
            objectLeaveLetter: null,
            isPDFModalShown: false,
            userDto: null
        }
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.hanldShowPdfModal = this.hanldShowPdfModal.bind(this);
        this.hanldHidePdfModal = this.hanldHidePdfModal.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isLeaveDayModalShown: false, isPDFModalShown: false });
            this.updateListLeaveDay();
        };




    };

    updateListLeaveDay() {
        var search = qs.parse(this.props.location.search).search;
        var page = qs.parse(this.props.location.search).page;
        var dateToWorkEnd = qs.parse(this.props.location.search).dateToWorkEnd;
        var dateToWorkStart = qs.parse(this.props.location.search).dateToWorkStart;
        var year = qs.parse(this.props.location.search).year;
        //const {startDateOfYear,endDateOfYear} =this.props.location.state;
        var userId = this.props.match.params.id;
        this.loadUserDto(userId);
        let setStateInRequest = (list) => { this.setState({ listLeaveDay: list }) }
        return agent.asyncRequests.getPage('/leaveLetter/listLeaveLetterByUserIdAndDateToWorkStart?userId=' + userId + '&dateToWorkStart=' + dateToWorkStart + "&dateToWorkEnd=" + dateToWorkEnd + "&year=" + year, page
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {

                setStateInRequest(result);

            }
            else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        })
    }

    loadUserDto(id) {

        let setStateInRequestProject = (list) => { this.setState({ userDto: list }) }
        agent.asyncRequests.get("/user/" + id
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
    componentWillMount() {

        this.updateListLeaveDay();

    };

    componentDidUpdate() {
        ScriptUtils.loadFootable();
    }
    //Delete LeaveDay Function
    deleteLeaveDay(id) {

        if (confirm("Bạn có chắc sẽ xoá!")) {
            var url = `/leaveLetter/${id}`;
            return agent.asyncRequests.del(url
            ).then(function (res) {
                var result = res.body.resultData;
                if (result && !result.error) {
                    toast.info("Xoá Thành Công!", { autoClose: 15000 });
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
    hanldShowPdfModal(leaveLetter) {
        this.setState(
            {
                isPDFModalShown: true,
                leaveLetter: leaveLetter
            });
    }
    hanldHidePdfModal() {
        this.setState(
            {
                isPDFModalShown: false
            });
    }


    handleShowmodal(id) {
        this.setState({
            isLeaveDayModalShown: true,
            idLeaveLetter: id
        });

    }


    render() {
        const { t } = this.props;
        var baseUrl = UrlUtils.getPathWithParamsNotPaging();
        const data = this.state.listLeaveDay;
        const year = qs.parse(this.props.location.search).year;
        const userDto = this.state.userDto;
        if (!data || !userDto) {
            return null;
        }

        var search = qs.parse(this.props.location.search).search;
        var page = qs.parse(this.props.location.search).page;
        if (!page) {
            page = 1;
        }

        var currentNo = 0;
        var currentNo = ((page - 1) * 20);
        var rows = data.content.map(item => {
            currentNo++

            return (
                <tr style={{ textAlign: 'center' }} key={item.id}>
                    {/* <td><a onClick={() => this.handleShowmodal(item.id)}>{item.id}</a> </td> */}
                    <td>{currentNo}</td>
                    <td><a onClick={() => this.handleShowmodal(item.id)}>{item.user ? item.user.email : "N/A"}</a></td>
                    <td>{t(item.leaveType)}</td>
                    <td>{moment(item.startLeaveDate).format("DD/MM/YYYY")}</td>
                    <td>{moment(item.endLeaveDate).format("DD/MM/YYYY")}</td>
                    <td>{item.leaveDays}</td>
                    <td>{item.holiday}</td>
                    <td>{item.totalLeaveDays}</td>
                    <td>{moment(item.startWorkDate).format("DD/MM/YYYY")}</td>
                    <td>{item.approvedBy ? item.approvedBy.fullName : "N/A"}</td>
                    <td>{item.note}</td>
                    <td>{t(item.status)}</td>
                    <td className="text-center footable-visible footable-last-column">
                        <ul className="icons-list">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="icon-menu9"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                    <li><a onClick={() => this.hanldShowPdfModal(item)}><i className="icon-file-pdf"></i>In PDF</a></li>
                                    <SecuredComponent allowedPermission="admin.holiday.delete">
                                        <li><a onClick={() => this.deleteLeaveDay(item.id, item.fullName)}><i className="icon-cross2"></i>Xóa</a></li>
                                    </SecuredComponent>
                                </ul>
                            </li>
                        </ul>
                    </td>
                </tr>
            );
        });




        return (

            <div className="content-wrapper">


                <div className="content">
                    <div className="page-header">
                        <h4>
                            <i className=" icon-paragraph-justify2 position-left"></i>

                            <span className="pull-right">
                                <SecuredComponent allowedPermission="admin.holiday.create">
                                    <button className="btn bg-green" onClick={() => this.handleShowmodal()}>Thêm Mới</button>
                                </SecuredComponent>
                            </span>
                        </h4>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-flat">
                            </div>
                            {this.state.isLeaveDayModalShown ? <ModalLeaveLetter title="Đơn Nghỉ Phép" idLeaveLetter={this.state.idLeaveLetter} userDto={userDto} show={this.state.isLeaveDayModalShown} onHide={this.handleHidemodal} /> : null}
                            {this.state.isPDFModalShown ? <ModalPDFLeaveLetter title="Đơn Nghỉ Phép" leaveLetter={this.state.leaveLetter} show={this.state.isPDFModalShown} onHide={this.handleHidemodal} /> : null}
                            <center>
                                <h1>Quản Lý Ngày Phép</h1>
                                <h2>Năm: {year}</h2>
                                <h5>Tên Nhân Viên: {userDto.fullName}</h5>
                            </center>
                            <div className="panel panel-flat">
                                <table className="table table-togglable table-hover">
                                    <thead>
                                        <tr className="bg-green">
                                            <th style={{ textAlign: 'center' }} data-hide="phone">STT</th>
                                            <th style={{ textAlign: 'center' }} data-hide="phone">Email Nhân Viên</th>
                                            <th style={{ textAlign: 'center' }} data-hide="phone">Phân Loại Nghỉ Phép</th>
                                            <th style={{ textAlign: 'center' }} data-hide="phone">Nghỉ Phép Từ</th>
                                            <th style={{ textAlign: 'center' }} data-hide="phone">Đến Hết Ngày</th>
                                            <th style={{ textAlign: 'center' }} data-hide="phone">Tổng Số Ngày Nghỉ </th>
                                            <th style={{ textAlign: 'center' }} data-hide="phone">Ngày Lễ / Cuối Tuần</th>
                                            <th style={{ textAlign: 'center' }} data-hide="phone">Tổng Ngày Nghỉ</th>
                                            <th style={{ textAlign: 'center' }} data-hide="phone">Ngày Bắt Đầu Công Việc</th>
                                            <th style={{ textAlign: 'center' }} data-hide="phone">Người Duyệt </th>
                                            <th style={{ textAlign: 'center' }} data-hide="phone">Ghi Chú</th>
                                            <th style={{ textAlign: 'center' }} data-hide="phone">Trạng Thái</th>
                                            <th style={{ textAlign: 'center' }} className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <TablePagination data={data} baseUrl={baseUrl} />
                    </div>


                    {/* EXPORT TO PDF */}


                </div>

            </div>
        );
    }

}

export default translate('translations')(LeaveLetterList);