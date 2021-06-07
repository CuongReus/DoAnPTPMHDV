import React from 'react';
import { connect } from 'react-redux';
import {LOGOUT} from '../constants/action-types';
import AgencyLogo from './AgencyLogo';

const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({
    onClickLogout: () => dispatch({ type: LOGOUT })
});

class TopBar  extends React.Component {
    constructor() {
        super();
    };
    render() {
        const {currentUser, onClickLogout} = this.props;
        if (!currentUser) {
            // empty topbar
            return (
                <div className="navbar navbar-default header-highlight">
                </div>);
        }
        return (
            <div className="navbar navbar-default header-highlight">
                <div className="navbar-header">
                   <a className="navbar-brand" href="/">
                   </a>
                    <ul className="nav navbar-nav visible-xs-block">
                        <li><a data-toggle="collapse" data-target="#navbar-mobile"><i className="icon-tree5"></i></a></li>
                        <li><a className="sidebar-mobile-main-toggle"><i className="icon-paragraph-justify3"></i></a></li>
                    </ul>
                </div>

                <div className="navbar-collapse collapse" id="navbar-mobile">
                    <ul className="nav navbar-nav">
                        <li><a className="sidebar-control sidebar-main-toggle hidden-xs"><i
                                className="icon-arrow-left52"></i></a></li>
                    </ul>
                    <p className="navbar-text">
                        <span className="label bg-success">Đang Hoạt Động</span>
                    </p>

                    <ul className="nav navbar-nav navbar-right">
                        <li className="dropdown dropdown-user">
                            <a className="dropdown-toggle" data-toggle="dropdown">
                                <i className="icon-user"></i>
                                <span>{currentUser ? currentUser.fullName : ''}</span>
                                <i className="caret"></i>
                            </a>

                            <ul className="dropdown-menu dropdown-menu-right">
                                <li><a href="/user/updateProfile"><i className="icon-pencil7"></i> Thông tin cá nhân</a></li>
                                <li><a href="/UserChangePassword"><i className="icon-key"></i> Đổi mật khẩu</a></li>
                                <li><a onClick={onClickLogout}><i className="icon-switch2"></i> Đăng xuất</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);