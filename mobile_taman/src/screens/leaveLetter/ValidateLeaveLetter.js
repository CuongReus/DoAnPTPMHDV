import React from 'react';
import { connect } from 'react-redux';
import {Field, reduxForm, formValueSelector} from 'redux-form';
import { toast } from 'react-toastify';
import {RenderHiddenInput, RenderInput, RenderTextArea} from '../../components/formInputs';
import agent from '../../services/agent';
import { } from '../../constants/action-types';
import AgencyLogo from '../../components/AgencyLogo';
import AgencyFooter from '../../components/AgencyFooter';
import { LOAD_UPDATING_LEAVE_LETTER } from './action-types';

const validate = values => {
    const errors = {};
    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
        ...state.leaveLetterReducer.updatingLeaveLetter,
    };
    return {
        initialValues: updateValue
    };
};


const mapDispatchToProps = dispatch => ({
    // updatePasswordWithToken: (values) =>
    //     dispatch({type: UPDATE_PASSWORD_BY_TOKEN, payload: agent.AuthService.updatePasswordByToken(values.token, values.password)}),
    // fireRedirect: (url) =>
    loadLeaveLetter: (payload) =>
        dispatch({ type: LOAD_UPDATING_LEAVE_LETTER, payload: payload }),
    updateTokenField: (token) => {
        dispatch({
            meta: {form: "ValidateLeaveLetter", field: "token"},
            payload: token,
            type: "@@redux-form/CHANGE"
        })
    },
    // onUnload: () =>
    //     dispatch({type: CHANGE_PASSWORD_UNLOAD})
});

class ValidateLeaveLetter extends React.Component {
    constructor() {
        super();
        this.state = {
            isUpdatedLetter: false,
            newStatus: null
        }
        this.handleValidate = this.handleValidate.bind(this);
        this.handleNotValidate = this.handleNotValidate.bind(this);
        this.updateLeaveLetter = this.updateLeaveLetter.bind(this);
    };

    handleValidate(values) {
        alert("Duyệt đơn nghỉ phép này?");
        this.updateLeaveLetter( values.note, "DA_DUYET");       
    }

    handleNotValidate(values) {
        alert("Từ chối đơn nghỉ phép này?");
        this.updateLeaveLetter(values.note, "KHONG_DUOC_DUYET");
    }

    updateLeaveLetter(note, newStatus) {
        var token = this.props.match.params.token;
        var bodyObject = {
            note: note,
            status: newStatus
        };
        var url = '/leaveLetter/updateStatus?token=' + token;
        let setStateInRequest = () => { this.setState({ isUpdatedLetter: true, newStatus: newStatus }) } 
        return agent.asyncRequests.post(url, bodyObject
            ).then(function (res) {
                var result = res.body.resultData;
                if (result && result.id) {
                    setStateInRequest();
                } else {
    
                    toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });   
    }

    componentWillMount() {

        var token = this.props.match.params.token;
        const { loadLeaveLetter } = this.props;
        const dataPromise = agent.LeaveLetterApi.getLeaveLetter(token)
        loadLeaveLetter(Promise.resolve(dataPromise));
    };

    componentWillUnmount() {
        // this.props.onUnload();
    };

    render() {
        const {
            handleSubmit,
            submitting,
            invalid,
            pristine,
            errors,
            initialValues } = this.props;

        return (
            <div className="login-container">
                <div className="page-container">
                    <div className="page-content">
                        <div className="content-wrapper">
                            <div className="content">
                                <form>
                                    <div className="panel panel-body login-form">
                                        <div className="text-center">
                                            <div className="login-logo-waper"><AgencyLogo/></div>
                                            <h5 className="content-group">Duyệt Đơn Nghỉ Phép</h5>
                                        </div>
                                        {this.state.isUpdatedLetter ? <div className="alert alert-info">
                                            <ul>
                                                <li>
                                                    Đơn xin nghỉ phép đã được cập nhật {this.state.newStatus}. Vui lòng liên hệ Admin nếu bạn muốn thay đổi. Xin cảm ơn!
                                                </li>
                                            </ul>
                                        </div>: ""}
                                        <Field name="user.fullName" iconClass="icon-user" placeholder="Tên nhân viên" component={RenderInput} disabled={true}></Field>
                                        <Field name="note" placeholder="Ghi Chú" component={RenderInput} disabled={this.state.isUpdatedLetter}></Field>
                                        {
                                            !this.state.isUpdatedLetter? <div>
                                                <div className="form-group">
                                                    <button onClick={handleSubmit(this.handleValidate)} type="submit" className="btn btn-primary btn-block" disabled={pristine || invalid || submitting}>Duyệt <i className="icon-arrow-right14 position-right"></i></button>
                                                </div>

                                                <div className="form-group">
                                                    <button onClick={handleSubmit(this.handleNotValidate)} type="submit" className="btn btn-warning btn-block" disabled={pristine || invalid || submitting}>Từ Chối <i className="icon-blocked position-right"></i></button>
                                                </div>
                                            </div> : null
                                        }
                                        
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

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
        form: 'ValidateLeaveLetter',
        destroyOnUnmount: false,
        enableReinitialize: true,
        validate
    })(ValidateLeaveLetter)
)