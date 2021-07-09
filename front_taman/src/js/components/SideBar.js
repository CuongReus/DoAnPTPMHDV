import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import SecuredComponent from './SecuredComponent';
import { ScriptUtils } from '../utils/javascriptUtils';

const mapStateToProps = state => ({
	currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({

});

class SideBar extends React.Component {
	constructor() {
		super();
		this.state = {
			currentUrl: window.location.pathname
		}
		this.onChangeMenu = () => {
			this.setState({ currentUrl: window.location.pathname });
		}
	};
	componentWillMount() {
		ScriptUtils.loadFootable();
		ScriptUtils.loadFormLayout();
	}

	render() {
		// viewChangeCounter is used to update the color active link of sidebar
		const { currentUser } = this.props;
		if (!currentUser) {
			return "";
		}
		var currentUrl = this.state.currentUrl;
		return (
			<div className="sidebar sidebar-main">
				<div className="sidebar-content">
					<div className="sidebar-category sidebar-category-visible">
						<div className="category-content no-padding">
							<ul className="navigation navigation-main navigation-accordion">
								{/* TODO ACTIVE SIDE BAR */}
								<li className="active">
									<Link to='/#'><i
										className="icon-user"></i> <span>Quản Lý Nhân Sự</span></Link>
									<ul>
										<SecuredComponent allowedPermission="admin.users.read">
											<li className={currentUrl == '/listPersonel' ? 'active' : ''} onClick={() => this.onChangeMenu()}>
												<Link to='/listPersonel'><i className="icon-users"></i>
													<span>Nhân Sự</span></Link>
											</li>
										</SecuredComponent>
										<SecuredComponent allowedPermission="admin.department.read">
											<li className={currentUrl == '/listDepartment' ? 'active' : ''} onClick={() => this.onChangeMenu()}>
												<Link to='/listDepartment'><i className="icon-magazine"></i>
													<span>Phòng Ban</span></Link>
											</li>
										</SecuredComponent>
										{/* <SecuredComponent allowedPermission="admin.roles.read">
											<li className={currentUrl == '/listRole' ? 'active' : ''} onClick={() => this.onChangeMenu()}>
												<Link to='/listRole'><i className="icon-user-check"></i>
													<span>Phân Quyền Hệ Thống</span></Link>
											</li>
										</SecuredComponent> */}
										<SecuredComponent allowedPermission="admin.holiday.read">
											<li className={currentUrl == '/listLeaveDay' ? 'active' : ''} onClick={() => this.onChangeMenu()}>
												<Link to='/listLeaveDay'><i className="icon-certificate"></i>
													<span>Quản Lý Ngày Phép</span></Link>
											</li>
										</SecuredComponent>
									</ul>
								</li>
								<li><a href="#"><i className="icon-city"></i> <span>Thông Tin Đối Tác </span></a>
									<ul>
										<SecuredComponent allowedPermission="admin.contact.read">
											<li className={currentUrl == '/listContact' ? 'active' : ''} onClick={() => this.onChangeMenu()}>
												<Link to='/listContact'><i className="icon-phone2"></i> <span>Khách Hàng</span></Link></li>
										</SecuredComponent>
									</ul></li>
								<li><a href="#"><i className="icon-users4"></i> <span>Quản Lý Đội Thi Công</span></a>
									<ul>

										<li className={currentUrl == '/listConstructionTeam' ? 'active' : ''} onClick={() => this.onChangeMenu()}>
											<Link to='/listConstructionTeam'><i className="icon-hammer"></i>
												<span>Đội Thi Công</span></Link></li>
									</ul>
								</li>
								<li><a href="#"><i className="icon-calendar3"></i> <span>Quản Lý Ngày Công</span></a>
									<ul>
										<SecuredComponent allowedPermission="admin.labour.read">
											<li className={currentUrl == '/listLabour' ? 'active' : ''} onClick={() => this.onChangeMenu()}>
												<Link to={{
													pathname: '/listLabour',
													state: {
														currentUser: currentUser
													}
												}}><i className="icon-hammer-wrench"></i>
													<span>Nhân Công & Chấm Công</span></Link></li>
										</SecuredComponent>
										<SecuredComponent allowedPermission="admin.employeeAttendance.read">
											<li className={currentUrl == '/listEmployeeAttendance' ? 'active' : ''} onClick={() => this.onChangeMenu()}>
												<Link to={{
													pathname: '/listEmployeeAttendance',
													state: {
														currentUser: currentUser
													}
												}}><i className="icon-hammer-wrench"></i>
													<span>Chấm Công khối văn phòng</span></Link></li>
										</SecuredComponent>
										<SecuredComponent allowedPermission="admin.labourAttendance.forSupervisor">
											<li className={currentUrl == '/listLabourAttendanceForSupervisor' ? 'active' : ''} onClick={() => this.onChangeMenu()}>
												<Link to={{
													pathname: '/listLabourAttendanceForSupervisor',
													state: {
														currentUser: currentUser
													}
												}}><i className="icon-user-tie"></i>
													<span>Thuộc Về Giám Sát</span></Link></li>
										</SecuredComponent>
										<SecuredComponent allowedPermission="admin.labourAttendance.forAttendanceDepart">
											<li className={currentUrl == '/attendanceGeneralScreen' ? 'active' : ''} onClick={() => this.onChangeMenu()}>
												<Link to={{
													pathname: '/attendanceGeneralScreen', state: {
														currentUser: currentUser
													}
												}}><i className="icon-calendar22"></i>
													<span>Tổng Chấm Công</span></Link></li>
										</SecuredComponent>
									</ul>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SideBar));