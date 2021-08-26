import React from 'react';
import { connect } from 'react-redux';
import {Field, reduxForm, formValueSelector} from 'redux-form';
import {RenderInput, RenderSelect, RenderDatePicker, RenderPassword, RenderPlainCheckbox} from '../components/formInputs';
import isEmail from 'sane-email-validation';
import agent from '../services/agent';
import AgencyFooter from '../components/AgencyFooter';
import {LOGIN, FIRE_REDIRECT, LOGIN_PAGE_UNLOADED, RESEND_MAIL_ACTIVATION, ASYNC_CHECK_MATCH_AGENCY_USER } from '../constants/action-types';
import { ScriptUtils } from '../utils/javascriptUtils';

const validate = values => {
    const errors = {};
    if (!values.email ) {
        errors.email = 'Vui lòng nhập email';
    } else if (!isEmail(values.email)) {
        errors.email = 'Email không hợp lệ';
    }
    if (!values.password) {
        errors.password = 'Vui lòng nhập mật khẩu';
    }

    return errors;
}

const mapStateToProps = state => ({ ...state.auth
});

const mapDispatchToProps = dispatch => ({
    loginTo: (values) => {
        dispatch({ type: LOGIN, payload: agent.AuthService.login(values.email, values.password),rememberMe: values.remember,  isRequiredRedirect: true});
    },
    fireRedirect: (url) =>
        dispatch({ type: FIRE_REDIRECT, toUrl: url })
});

class Login  extends React.Component {
    constructor() {
        super();
        this.state = {data: []};
    };

    componentWillMount() {
        agent.AuthService.initBackendUrl();
    };

   
    componentWillUnmount() {
    };

    render() {
        const {
            email,
            handleSubmit,
            loginTo,
            submitting,
            invalid,
            pristine,
            errors } = this.props;
        return (
            <div className="login-container">
                <div className="page-container">
                    <div className="page-content">
                        <div className="content-wrapper">
                            <div className="content">
                                <form onSubmit={handleSubmit(loginTo)}>
                                    <div className="panel panel-body login-form">
                                        <div className="text-center">
                                        <div className="login-logo-waper"><img src="assets/images/favicon.png" width={80} height={80} alt=""/></div>
                                            <h5 className="content-group">Đăng nhập tài khoản <small className="display-block">Để phục vụ công việc</small></h5>
                                        </div>

                                        {errors == 'Bad credentials' ? <div className="alert alert-danger alert-bordered">
                                            <span className="text-semibold">Thông tin đăng nhập không chính xác, vui lòng thử lại.</span>.
                                        </div> : ""}

                                        

                                        <Field name="email" iconClass="icon-mail5" placeholder="Email" component={RenderInput}></Field>
                                        <Field name="password" iconClass="icon-lock2" placeholder="Mật khẩu" component={RenderPassword}></Field>

                                        <div className="form-group login-options">
                                            <div className="row">
                                                <div className="col-sm-7">
                                                    <label className="checkbox-inline">
                                                        <div className="checker">
                                                                <Field name="remember" className="styled" component={RenderPlainCheckbox}></Field>
                                                        </div>
                                                        Tự động đăng nhập.
                                                    </label>
                                                </div>

                                                <div className="col-sm-5 text-right">
                                                    <a href="/quen-mat-khau">Quên mật khẩu?</a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group" style={{color:"white"}}>
                                            <button type="submit" className="btn btn-block" style={{backgroundColor:"#009688"}}  disabled={pristine || invalid}>Đăng nhập <i className="icon-arrow-right14 position-right"></i></button>
                                        </div>
                                    </div>
                                </form>
                                <AgencyFooter/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const initialFormValues = {
    remember: false
};

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: 'Login',
        initialValues: initialFormValues,
        destroyOnUnmount: false,
        validate,
        asyncBlurFields: ["email"]
    })(Login)
)