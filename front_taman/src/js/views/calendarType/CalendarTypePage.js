import React from 'react';
import { translate } from 'react-i18next';
import { toast } from 'react-toastify';
import ModalCalendarType from './ModalCalendarType';
import agent from '../../services/agent';
import { FormatterUtils, ScriptUtils, UrlUtils } from '../../utils/javascriptUtils';
import { LoadingScreen } from '../../components/commonWidgets';

class CalendarTypePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModalCalendarType: false,
      idCalendarType: null,
      listAllCalendarType: [],
    }
    this.handleShowModalAddCalendarType = this.handleShowModalAddCalendarType.bind(this);
    this.handleHileModal = () => {
      this.setState({
        isShowModalCalendarType: false,
      })
      this.getAllCalendar();
    }
  };

  getAllCalendar() {
    let setStateInRequest = (list) => { this.setState({ listAllCalendarType: list }) }
    return agent.asyncRequests.get("/calendarType/listAll").then(function (res) {
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
    this.getAllCalendar();
  };
  componentDidUpdate() {
    ScriptUtils.loadFootable();
    ScriptUtils.loadFormLayout();
  }
  handleShowModalAddCalendarType(id) {
    this.setState({
      isShowModalCalendarType: true,
      idCalendarType: id
    })
  }
  handleDeleteCalendarType(id) {
    var _this = this;
    return agent.asyncRequests.del("/calendarType/" + id).then(function (res) {
      var result = res.body.resultData;
      if (result) {
        alert("Xoá Thành Công.");
        _this.getAllCalendar();
      } else {
        toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
      }
    }, function (err) {
      console.error(err)
      toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
    });
  }
  render() {
    let dataCalendarType = this.state.listAllCalendarType;
    const { t } = this.props;
    if (!dataCalendarType) {
      return <LoadingScreen></LoadingScreen>;
    }
    var currentNo = 0;
    var rows = dataCalendarType.map((item, index) => {
      currentNo = currentNo + 1;
      return (
        <tr style={{ textAlign: 'center' }} className="alpha-slate" key={item.id}>
          <td>{currentNo}</td>
          <td>{item.name}</td>
          <td>
            <div style={{ backgroundColor: item.color, width: 15, height: 15, display: 'inline-block' }}></div>
          </td>
          <td>{item.description}</td>
          <td className="text-center footable-visible footable-last-column">
            <ul className="icons-list">
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                  <i className="icon-menu9"></i>
                </a>
                <ul className="dropdown-menu dropdown-menu-right">
                  <li><a onClick={() => this.handleShowModalAddCalendarType(item.id)}><i className="icon-pencil"></i>Sửa Thông Tin</a></li>
                  <li><a onClick={() => this.handleDeleteCalendarType(item.id)}><i className="icon-cross2"></i>Xóa</a></li>
                </ul>
              </li>
            </ul>
          </td>
        </tr>
      );
    });
    return (
      <div className="content-wrapper">
        <div className="page-header page-header-default">
          <div className="breadcrumb-line">
            <ul className="breadcrumb">
              <li><a href=""><i className="icon-home2 position-left"></i> Home</a> </li>
              <li className="active">Thông Tin - Hành Chính</li>
              <li className="active">Loại Lịch</li>
            </ul>
            <div className="heading-elements">
              <div className="heading-btn-group">
                <button className="btn bg-teal" onClick={() => this.handleShowModalAddCalendarType(null)}>Thêm Mới</button>
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              {this.state.isShowModalCalendarType ? <ModalCalendarType title="Loại Lịch" idCalendarType={this.state.idCalendarType} show={this.state.isShowModalCalendarType} onHide={this.handleHileModal} /> : null}
              <div className="panel panel-flat">
                <table className="table table-togglable table-bordered">
                  <thead>
                    <tr className="bg-teal">
                      <th style={{ textAlign: 'center' }} data-toggle="true">STT</th>
                      <th style={{ textAlign: 'center' }} data-toggle="true">Tên Loại</th>
                      <th style={{ textAlign: 'center' }} data-hide="phone">Màu</th>
                      <th style={{ textAlign: 'center' }} data-hide="phone">Mô Tả</th>
                      <th style={{ textAlign: 'center' }} className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
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

export default translate('translations')(CalendarTypePage);