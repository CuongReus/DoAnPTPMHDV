import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { RenderInput, RenderPassword } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import {FIRE_REDIRECT } from '../../constants/action-types';
const validate = values => {
    const errors = {};

    if (!values.password) {
        errors.password = 'Vui lòng nhập mật khẩu.';
    } 
    
    if (!values.retypePassword) {
        errors.retypePassword = 'Vui lòng gõ lại mật khẩu.';
    } else if (values.password && values.retypePassword != values.password) {
        errors.retypePassword = 'Mật khẩu gõ lại không khớp. Vui lòng thử lại.';
        
    }
    return errors;
}

const mapStateToProps = state => {
    return {
        initialValues: state.common.currentUser
    };
};

const mapDispatchToProps = dispatch => ({
    backToList: () =>
        dispatch({ type: FIRE_REDIRECT, toUrl: "/listPersonel" })
});

class UserChangePassword extends React.Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
    }

    handleChange(values) {
        const { backToList } = this.props;
        var url = '/user/changePassword';
        var bodyObject = {
            id: values.id,
            password: values.password
        };
        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                toast.info("Mật khẩu được cập nhật thành công.")
                // backToList();
            } else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }
    

    render() {
        const { backToList, handleSubmit, submitting, invalid } = this.props;
        var editView =
            <div className="content-wrapper">
                <div className="page-header">
                    <div className="page-header-content">
                        <div className="page-title">
                            <h4>
                                <i className="icon-plus-circle2 position-left"></i> <span
                                     className="text-semibold">Đổi Mật Khẩu</span>
                            </h4>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h6 className="panel-title">Vui lòng nhập mật khẩu mới</h6>
                        </div>
                        <div className="panel-body">
                            {submitting ? <LoadingScreen /> :
                                <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.handleChange)}>
                                    <Field name="fullName" label="Họ Tên(*)" placeholder="Nhập Họ Tên Người Dùng..." component={RenderInput} disabled={true}></Field>
                                    <Field name="email" type="email(*)" label="Email" placeholder="Nhập Email Người Dùng..." component={RenderInput} disabled={true}></Field>
                                    <Field name="password" label="Mật khẩu mới(*)" placeholder="Password" component={RenderPassword}></Field>
                                    <Field name="retypePassword" label="Gõ Lại Mật khẩu(*)" placeholder="Re-type password" component={RenderPassword}></Field>
                                    <div className="text-right">
                                        <button type="button" className="btn btn-link" onClick={backToList}>Hủy</button>
                                        <button type="submit" className="btn btn-primary" disabled={submitting || invalid}>Lưu</button>
                                    </div>
                                </form>
                            }
                        </div>
                    </div>
                </div>
            </div>
        return editView;
    }
};

export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'UserChangePassword',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(UserChangePassword)));
