import React from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import agent from '../../services/agent';
import { FormatterUtils } from '../../utils/javascriptUtils';
import MonthRows from './MonthRows';


const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({
});

class YearRows extends React.Component {
    constructor() {
        super();
        this.state = {
            listProjectByProjectYear: [],
            yearDto: null,
            isShowMonthRows: false,
            isShowWeekRows: false,
            getWeeksStartAndEndInMonth: [],


        }
        this.handleShowMonthRows = this.handleShowMonthRows.bind(this);
        this.handleHideMonthRows = this.handleHideMonthRows.bind(this);
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.handleHidemodal = this.handleHidemodal.bind(this);  
        this.reloadProjectYear = this.reloadProjectYear.bind(this);  
        this.reloadOnlyProjectYear = this.reloadOnlyProjectYear.bind(this);
        
    }

    reloadProjectYear() {
        // OnHide projectYear just show project when user have right permission
        const { currentUser } = this.props;
        this.handleShowMonthRows();
        this.reloadOnlyProjectYear();
    }

    reloadOnlyProjectYear() {
        // reload location info
        let setStateInRequest = (yearDto) => {this.setState({yearDto: yearDto})}
        return agent.asyncRequests.get("/projectYear/" + this.state.yearDto.id).then(function (res) {
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
        

    handleShowMonthRows(){
        this.setState({ 
            isShowMonthRows: true 
        });
    }

    handleHideMonthRows() {
        this.setState({
            isShowMonthRows: false,
        })
    }

    handleShowWeekRows(){
        this.setState({ 
            isShowWeekRows: true 
        });

    }

    handleHideWeekRows() {
        this.setState({
            isShowWeekRows: false
        })
    }
    handleShowmodal(id) {
        this.setState({
            isProjectYearModalShown: true,
            idProjectYear: id
        })
    }
    handleHidemodal() {
        this.setState({
            isProjectYearModalShown: false
        });
        this.reloadProjectYear();
    }

    componentWillMount() {
        this.setState({
            yearDto: this.props.yearDto,
        });
    };
    componentDidUpdate() {
        

    }   

    render() {

        const yearDto = this.state.yearDto;

        var isShowMonthRows = this.state.isShowMonthRows;
        // var monthRows = [1,2,3,4,5,6,7,8,9,10,11,12];
        var rowMonth = yearDto.listMonthProjectCosts.map(item => {
            return <MonthRows monthDto={item} year={yearDto.year}></MonthRows>   
            
        });        

        //-------------------------------------------Load List Of Project Item-------------------------------------------
       
        //Load Location Name, and Button Show & Hide
        return (
            [<tr key={"yearRows_" + yearDto.id} className="bg-info-600" style={{ color: 'white', fontSize: 15 }}  >
                <td >
                    {isShowMonthRows ? null : <button className="bg-info-600 icon-plus22" onClick={() => this.handleShowMonthRows()}></button>}
                    {isShowMonthRows ? <button className="bg-info-600 icon-dash" onClick={() => this.handleHideMonthRows()}></button>: null}
                </td> 

                {/* TODO STT */}
                <td colSpan="3"><a style={{ color: 'white' }}>Năm {yearDto.year}</a></td>
                <td style={{ color: "white" }} colSpan="3">
                    {/* <SecuredComponent allowedPermission="admin.totalRevenue.check"> */}
                        Tổng Thanh Toán: <br/> {FormatterUtils.formatCurrency(yearDto.totalMoneyProjectCost)}
                    {/* </SecuredComponent> */}

                </td>
                <td style={{ color: "white" }} colSpan="2">
                    {/* <SecuredComponent allowedPermission="admin.totalRevenue.check"> */}
                        Đã Thanh Toán: <br/> {FormatterUtils.formatCurrency(yearDto.totalPaidProjectCost)}
                    {/* </SecuredComponent> */}

                </td>
                <td style={{ color: "white" }} colSpan="2">
                    {/* <SecuredComponent allowedPermission="admin.totalRevenue.check"> */}
                        Còn Lại: <br/> {FormatterUtils.formatCurrency(yearDto.totalMoneyProjectCost - yearDto.totalPaidProjectCost)}
                    {/* </SecuredComponent> */}

                </td>
            </tr>

            ].concat(isShowMonthRows ? rowMonth:null)

            // List Project Item

        );
    }

};

export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(YearRows));

