import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { RenderInputWithDiv, RenderRadio  } from '../../components/formInputs';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_ROLE, ALL_ROLES } from './action-types';
import {FIRE_REDIRECT } from '../../constants/action-types';
const validate = values => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Vui lòng nhập tên nhóm quyền.';
    } 
    return errors;
}

let replaceKeyNameToAvoidDot = (key) => {
    return key.replace(".", "").replace(".", "");
}
const selector = formValueSelector('RoleEdit');
const mapStateToProps = state => {
    var updateValue = {
        ...state.personelReducer.updatingRole, 
    };
    if (updateValue && updateValue.permissions) {
        var permissions = JSON.parse(updateValue.permissions);
        for (const [key, value] of Object.entries(permissions)) { 
            updateValue[replaceKeyNameToAvoidDot(key)] = value ? "true" : "false";
        }
    } else if (updateValue) {
        updateValue.permissions = "{}"; // Json String if empty - avoid null value
    }
    return {
        initialValues: updateValue,
        permissions: selector(state, "permissions"),
    };
};

const mapDispatchToProps = dispatch => ({
    backToList: () =>
        dispatch({ type: FIRE_REDIRECT, toUrl: "/listRole" }),
    loadRole: (payload) =>
        dispatch({ type: LOAD_UPDATING_ROLE, payload: payload }),
    updateField: (fieldName, value) =>
        dispatch({ meta: {form: "RoleEdit", field: fieldName},
            payload: value,
            type: "@@redux-form/CHANGE"}),
});

class RoleEdit extends React.Component {
    constructor() {
        super();
        this.handleAdd = this.handleAdd.bind(this);
        this.showListPermissions = this.showListPermissions.bind(this);
    }

    componentWillMount() {
        const { loadRole} = this.props;
        var id = this.props.match.params.id;
        if (id != "new") {
            const dataPromise = agent.UserApi.getRole(id);
            loadRole(Promise.resolve(dataPromise));
        }
    }

    handleAdd(values) {
        const { backToList } = this.props;
        var id = this.props.match.params.id;
        var url = '/role/add';

        var bodyObject = {
            name: values.name, 
            permissions: values.permissions,
        };

        if (id != "new") {
            url = '/role/update';
            bodyObject.id = id;
        }

        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
            backToList();
               window.location.reload(true);
               toast.info("Lưu Thành Công.", {autoClose: 8000});
               
            } else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }

    showListPermissions() {
        const {permissions, updateField, t} = this.props;
        var permissionsView = ALL_ROLES.map(group => {
            let showKeys = (keys) => {
                var permissionOptions = [{label: "Có", value: "true"}, {label: "Không", value: "false"}];
                return keys.map(key => {
                    
                    return (<div>
                        
                    <Field key={key} name={replaceKeyNameToAvoidDot(key)} label={t(key)} component={RenderRadio} 
                    options={permissionOptions} isInline={true}
                        onChangeAction={(value) => {
                            var objectPermissions = JSON.parse(permissions);
                            objectPermissions[key] = (value == "true");
                            updateField("permissions", JSON.stringify(objectPermissions));
                        }
                    }
                ></Field>
                </div>)
                })
            }
            return (
                <div key={group.moduleName}>
                   
                    <div className="group-permission">{group.moduleName}</div>
                    {group.entities.map(entity => {
                        return (
                           
                            // Column md-6
                            <div key={entity.entityName}>
                                <div  className="entity-permission">{t(entity.entityName)}</div>
                                {showKeys(entity.keys)}
                                 </div>
                           
                        )
                    })}
                </div>
            );

        })

        return permissionsView;
    }

    render() {
        const{handleSubmit, backToList ,submitting, invalid} = this.props;
        var id = this.props.match.params.id;
        var editView =
            <div className="content-wrapper">
                <div className="page-header">
                    <div className="page-header-content">
                        <div className="page-title">
                            {id == "new" ?
                                <h4>
                                    <i className="icon-plus-circle2 position-left"></i> <span
                                        className="text-semibold">Vai Trò</span> - Thêm mới
                        </h4> :
                                <h4>
                                    <i className="icon-pencil position-left"></i> <span
                                        className="text-semibold">Vai Trò</span> - Chỉnh sửa
                        </h4>}
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h6 className="panel-title">Thông tin</h6>
                        </div>
                        <div className="panel-body">
                            {submitting ? <LoadingScreen /> :
                                <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.handleAdd)}>
                                    <Field name="name" label="Tên Nhóm Quyền Hệ Thống" placeholder="Tên" component={RenderInputWithDiv}></Field>
                                    <div className="group-permission">PHÂN QUYỀN HỆ THỐNG</div>
                                    {this.showListPermissions()}
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
            form: 'RoleEdit',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(RoleEdit)));