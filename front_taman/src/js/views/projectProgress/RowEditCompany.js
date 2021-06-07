import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker, RenderCheckbox, RenderSelect, RenderNumberInput, RenderMoneyFormat } from '../../components/formInputs';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import isEmail from 'sane-email-validation';
import { StringUtils } from '../../utils/javascriptUtils';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_COMPANY } from './action-types';
import { FIRE_REDIRECT } from '../../constants/action-types';
import ListFile from '../../components/ListFile';
import { isNull } from 'util';
import moment from 'moment';
const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Vui lòng nhập email.';
    }
    return errors;
}
const selector = formValueSelector("RowEditCompany");
const mapStateToProps = state => {
    var updateValue = {
        ...state.companyReducer.updatingCompany,

    };
    return {
        initialValues: updateValue,
        currentValues: selector(state, 'name', 'code', 'description')

    };
};

const mapDispatchToProps = dispatch => ({
    loadCompany: (payload) =>
        dispatch({ type: LOAD_UPDATING_COMPANY, payload: payload })
});


class RowEditCompany extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // listAllCompanys:[],
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.handleOnKeyPress=(ev)=>{
            const { currentValues } = this.props;
            if(ev.key === 'Enter'){
                this.handleAdd(currentValues);
            }else if(event.keyCode === 27){
                   this.props.onDoneEdit(); 
            }
        }
    }


      componentDidMount(){
        document.addEventListener("keydown", this.handleOnKeyPress, false);
      }
      componentWillUnmount(){
        document.removeEventListener("keydown", this.handleOnKeyPress, false);
        // const { currentValues } = this.props;
        // this.handleAdd(currentValues);
      }
    componentWillMount() {
        const { loadCompany, item } = this.props;
        loadCompany({ resultData: item });

    }
   
    

    handleAdd(values) {
        const { item } = this.props;
        var _this = this;
        var url = '/company/add';
        var bodyObject = {
            name: values.name,
            description: values.description,
            code: values.code

        };
        if (item.id) {
            url = '/company/update';
            bodyObject.id = item.id;
        }

        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                _this.props.onDoneEdit();
                // toast.info("Lưu Thành Công.", { autoClose: 8000 });
            } else {

                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });

    }
    

    ///Hide and Clean Value
    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        // event.preventDefault();
        onHide();
        destroy();
    }
    render() {
        // const { objectCompany, listfile, title, onHide } = this.props;

        const { handleSubmit, submitting, title, invalid } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show, bsSize: "sm", onHide: this.props.onHide, submitting: this.props.submitting };
        var id = this.props.idCompany;
        const { item,columnNameClicked } = this.props;
        var editRow = null;
        if(this.props.isShowEdit ==true){
        editRow = (<tr onKeyPress={(ev)=>this.handleOnKeyPress(ev)}  role="form" key={item.id}>
                <td>1</td>
                <td>
                    <Field name="TEST" options={[{label:"Hello 1", value: "1"},{label:"Hello 2", value: "2"}]}           component={RenderSelect}></Field>
                </td>
                <td>
                    <Field name="name" placeholder="Nhập tên công ty..."    autoFocus={columnNameClicked=="name"}           component={RenderInputWithDiv}></Field>
                </td>
                <td>
                    <Field name="code" placeholder="Nhập mã công ty..."     autoFocus={columnNameClicked=="code"}           component={RenderInputWithDiv}></Field>
                </td>
                <td>
                    <Field name="description" placeholder="Nhập mô tả..."   autoFocus={columnNameClicked=="description"} rows={1} component={RenderTextArea}></Field>
                </td>
                <td className="text-center footable-visible footable-last-column">
                     
                    </td>
            </tr>
        )
    }






        return editRow;
    }
};


export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'RowEditCompany',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(RowEditCompany)));
