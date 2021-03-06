import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { ScriptUtils, FormatterUtils, UrlUtils } from '../../utils/javascriptUtils';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import { Link } from 'react-router-dom';
import ModalStockMovementInput from '../stockMovement/ModalStockMovementInput';
import ModalStockMovementOutput from '../stockMovement/ModalStockMovementOutput';
import SecuredComponent from '../../components/SecuredComponent';
import { LoadingScreen } from '../../components/commonWidgets';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
const StockRows = (props) => {
    const { index, quantityByStock,
        countHeader,
        handleShowStockMovementInputModalAddMore,
        handleShowStockMovementOutputModalAddMore,
        handleShowStockMovementInputModalEdit,
        handleShowStockMovementOutputModalEdit,
        movementsByProductId,
        productStock,
        currentNo,
        isShowChild,
        handleShowMovements,
        dataStockMovement,
        deleteStockMovement
         } = props;
    var sumInputQuantity = 0;
    var sumInputPrice = 0;
    var sumOutputQuantity = 0;
    var sumOutputPrice = 0;
    var groupRows = [];
    // var totalArray= [];
    let getStorageLocation = (groupStorageLocation, storageLocationId) => {
        for (var i = 0; i < groupStorageLocation.length; i++) {
            if (groupStorageLocation[i].storageLocation.id == storageLocationId) {
                return groupStorageLocation[i];
            }
        }
        return null;
    }

    let getMovementType = (groupMovementType, movementType) => {
        for (var i = 0; i < groupMovementType.length; i++) {
            if (groupMovementType[i].movementType == movementType) {
                return groupMovementType[i];
            }
        }
        return null;
    }

    // if(listSalesGroupByQuarterly){
    //     listSalesGroupByQuarterly.map(item => {
    //         var quarterlyGroup = getQuarterlyGroup(groupRows, item.quarterly)
    //         if (!quarterlyGroup) {
    //             var groupObject = {
    //                 quarterly: item.quarterly,
    //                 // salesObject: [{ productionOrder:item.productionOrder ,detailItem: item.detailItem, listProductionOrderItems: [item], objSumTotal: { totalQuantitym2OfItem: 0, totalQuantityMdOfItem: 0 } }],
    //                 salesObject: 
    //                    { monthGroupObject:
    //                     [{month:
    //                         parseInt(moment(item.sales.project.moneyReceiveDate).format("MM")),
    //                         sumActualSalesByMonth:0,
    //                         projectTypeGroup:[{projectType:item.sales.project.type ,
    //                         saleItems:[item.sales]}]}] }
                            
    //             };
    //             groupRows.push(groupObject);
    //         }else {
    //             var salesGroupByMonth = getGroupByMonth(quarterlyGroup.salesObject.monthGroupObject, parseInt(moment(item.sales.project.moneyReceiveDate).format("MM")));
    //             if (!salesGroupByMonth) {
    //                 var salesObject =  { monthGroupObject:
    //                     {month:
    //                         parseInt(moment(item.sales.project.moneyReceiveDate).format("MM")),
    //                         sumActualSalesByMonth:0,
    //                         projectTypeGroup:[{projectType:item.sales.project.type ,
    //                         saleItems:[item.sales]}]} }
    //                 quarterlyGroup.salesObject.monthGroupObject.push(salesObject.monthGroupObject);
                  

    //             }
    //             else {
    //                 if(salesGroupByMonth && salesGroupByMonth.projectTypeGroup){
    //             var projectTypeGroup= getProjectTypeGroup(salesGroupByMonth.projectTypeGroup, item.sales.project.type);
    //                 if(!projectTypeGroup){
    //                     var projectTypeGroup = {projectType:item.sales.project.type ,
    //                         saleItems:[item.sales]};
    //                         salesGroupByMonth.projectTypeGroup.push(projectTypeGroup);
    //                 }else{
    //                     projectTypeGroup.saleItems.push(item.sales);
    //                 }
    //             }
                    
    //             }
                
    //         }
    //     });
    // }
    if (movementsByProductId && movementsByProductId.isShown) {
        movementsByProductId.listMovements.map(item => {
            var storageLocationGroup = getStorageLocation(groupRows, item.stock.storageLocation.id)
            if (!storageLocationGroup) {
                var groupObject = {
                    storageLocation: item.stock.storageLocation,
                    objSumTotal: {
                        totalInputQuantity: 0,
                        totalInputPrice: 0,
                        totalOutputQuantity: 0,
                        totalOutputPrice: 0,
                        
                    },
                    stockMovementObjects: [{movementType:item.movementType,stMvList:[item]}]
                    //  objSumTotal: { totalQuantitym2OfItem: 0, totalQuantityMdOfItem: 0 } 

                };
                groupRows.push(groupObject);

            } else {
                var stockMovementGroup = getMovementType(storageLocationGroup.stockMovementObjects,item.movementType)
                if(!stockMovementGroup){
                    var stockMovementObject =  {
                        movementType:item.movementType,
                        stMvList:[item]
                    };
                    storageLocationGroup.stockMovementObjects.push(stockMovementObject);
                }
                else {
                    stockMovementGroup.stMvList.push(item);
                }
            }

        });
    }

    
    var mvRows = null;

    groupRows.map(group => {
        var sumInputQuantity    = 0;
        var sumInputPrice       = 0;
        var sumOutputQuantity   = 0;
        var sumOutputPrice      = 0;
        group.stockMovementObjects.map(item=>{
            for (var i = 0; i < item.stMvList.length; i++) {
                if (item.stMvList[i].movementType == "NHAP_KHO") {
                    sumInputQuantity += item.stMvList[i].quantity;
                    sumInputPrice += item.stMvList[i].totalPrice;
                }
                if (item.stMvList[i].movementType == "XUAT_KHO") {
                    sumOutputQuantity += item.stMvList[i].quantity;
                    sumOutputPrice += item.stMvList[i].totalPrice;
                }
                group.objSumTotal = {
                    totalInputQuantity: sumInputQuantity,
                    totalInputPrice: sumInputPrice,
                    totalOutputQuantity: sumOutputQuantity,
                    totalOutputPrice: sumOutputPrice
                }
            }
        })
        })
        const divMainCss={fontSize:12,height:80,margin:10,whiteSpace:'nowrap',border:'solid 2px',display:'inline-flex', textAlign:'center',borderColor: "inherit" }
        const divDataCss= {
            margin:10
           
        }
    if (groupRows) {
        mvRows = groupRows.map((group, indexMv) => {
            var groupMovementType =  group.stockMovementObjects.map((movementTypeGroup,indexMvType)=>{
                   var stockMovementRows = movementTypeGroup.stMvList.map((item, itemIndex) => {
                if (item.movementType == "XUAT_KHO" || item.movementType == "HANG_HU") {
                    sumOutputQuantity += item.quantity
                }
                 if(item.movementType == "XUAT_KHO" || item.movementType == "HANG_HU"){
                return [<div style={divMainCss} key={itemIndex + item.id}>
                    <div style={divDataCss} colSpan="5"></div>
            <div         style={divDataCss} >Ng??y: {item.movementDate}<br/>{item.sale  ?[<sub> ????n H??ng:  {item.sale.orderCode}</sub>, <br/>, <sub>{item.sale.contact ?  item.sale.contact.name:null}</sub>] : "N/A"}</div>
                    <div style={divDataCss}>Ng?????i Nh???p Li???u: {item.createdUser ? item.createdUser.email : null}<br />
                        Ng?????i Ch???nh S???a: {item.lastedUpdateUser ? item.lastedUpdateUser.email : null} </div>
                    
                    <div style={divDataCss}>S??? L?????ng: {item.quantity}
                    <br/>
                    <sub>(Gi?? Xu???t:{FormatterUtils.formatCurrency(item.movementItemPrice)})</sub>
                    </div>
                    <div style={divDataCss}><SecuredComponent allowedPermission="admin.totalRevenue.check">T???ng Ti???n: {FormatterUtils.formatCurrency(item.totalPrice)}
                    </SecuredComponent>
                    </div>
                    {/* <td colSpan='3'></td> */}
                    <div  style={divDataCss}className="text-center footable-visible footable-last-column">
                        <ul className="icons-list">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="icon-menu9"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                    {/* TODO Load Right Product Id that want to input or output Stock */}
                                    <SecuredComponent allowedPermission="admin.stock.create">
                                    <li><a onClick={() => handleShowStockMovementOutputModalEdit(item.id, item.product, item.stock,item.quantity)}><i className="icon-pencil"></i>Ch???nh S???a</a></li>
                                    <li><a onClick={() => deleteStockMovement(item.id)}><i className="icon-cross2"></i>Xo??</a></li>
                                    </SecuredComponent>

                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>]} 
                    else {
                  return  [<div style={divMainCss} key={itemIndex + item.id}>
                        <div style={divDataCss} colSpan="5"></div>
                        <div style={divDataCss}>Ng??y Nh???p Kho: {item.movementDate}</div>
                        <div style={divDataCss}>Ng?????i Nh???p Li???u: {item.createdUser ? item.createdUser.email : null}<br />
                            Ng?????i Ch???nh S???a: {item.lastedUpdateUser ? item.lastedUpdateUser.email : null} </div>
                        <div style={divDataCss}>S??? L?????ng: {item.quantity}
                        <br/>
                    <sub>(Gi?? Nh???p:{FormatterUtils.formatCurrency(item.movementItemPrice)})</sub>
                        </div>
                      
                        <div style={divDataCss}>   <SecuredComponent allowedPermission="admin.totalRevenue.check">
                        T???ng Ti???n: {FormatterUtils.formatCurrency(item.totalPrice)}
                        </SecuredComponent>
                        </div>
                        <div style={divDataCss} colSpan='2'></div>
                        <div style={divDataCss} className="text-center footable-visible footable-last-column">
                            <ul className="icons-list">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                        <i className="icon-menu9"></i>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-right">
                                        {/* TODO Load Right Product Id that want to input or output Stock */}
                                        <SecuredComponent allowedPermission="admin.stock.create">
                                        <li><a onClick={() => handleShowStockMovementInputModalEdit(item.id, item.product, item.stock,item.quantity)}><i className="icon-pencil"></i>Ch???nh S???a</a></li>
                                        <li><a onClick={() => deleteStockMovement(item.id)}><i className="icon-cross2"></i>Xo??</a></li>
                                         </SecuredComponent>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                     
                    </div>]}

                   

         })
             return [<td colSpan={7} style={{textAlign:'center'}}>
           {[<div>{movementTypeGroup.movementType}</div>].concat(stockMovementRows)}
        </td>]
            })
          
            return ([<tr  style={{textAlign:'center'}} className="warning" key={indexMv + group.id}>
                <td colSpan={8}>
                    {group.storageLocation.locationName}
                </td>
                <td style={{whiteSpace:'nowrap'}}>T???ng Nh???p Kho: {group.objSumTotal.totalInputQuantity}</td>
                
                <td style={{whiteSpace:'nowrap'}}><SecuredComponent allowedPermission="admin.totalRevenue.check">T???ng Ti???n Nh???p:  {FormatterUtils.formatCurrency(group.objSumTotal.totalInputPrice)}
                </SecuredComponent>
                 </td>
                <td style={{whiteSpace:'nowrap'}}>T???ng Xu???t Kho:{group.objSumTotal.totalOutputQuantity}</td>
               
                <td style={{whiteSpace:'nowrap'}}> <SecuredComponent allowedPermission="admin.totalRevenue.check">T???ng Ti???n Xu???t: {FormatterUtils.formatCurrency(group.objSumTotal.totalOutputPrice)}
                </SecuredComponent>
                
                </td>

                <td colSpan={(countHeader * 2)}></td>
            </tr>].concat(<tr><td></td>{groupMovementType}<td></td></tr>))



        // })
    });
    }


    return (

        [<tr style={{textAlign:'center'}} className="success" key={index}>
            <td>
                <button className="bg-info icon-arrow-down22" onClick={() => handleShowMovements(productStock.productId)}></button>
            </td>
            <td>{currentNo}</td>
            <td>{productStock.productName}<br/> <sub>({productStock.supplier?productStock.supplier.name:"N/A"})</sub></td>
            <td>{productStock.productCode}</td>
            <td>{productStock.productUnit}</td>
            <td>  {productStock.productSize}
            </td>
            
            <td>{productStock.productCategory ? productStock.productCategory.name : null}</td>
            <td><SecuredComponent allowedPermission="admin.stock.create">{FormatterUtils.formatCurrency(productStock.productPrice)}
            </SecuredComponent>
            </td>
            {productStock.listQuantityByStorage ? productStock.listQuantityByStorage.map((quantityByStock) => {
                return [<td>{FormatterUtils.round2Decimals(quantityByStock.totalQuantity)}</td>,
                <td>
                <SecuredComponent allowedPermission="admin.totalRevenue.check">
                {FormatterUtils.formatCurrency(quantityByStock.totalQuantity * productStock.productPrice)}
                </SecuredComponent>
                </td>
                ]
            }): null}
            <td>{productStock.totalQuantityAllStorage}</td>
           
                <td> <SecuredComponent allowedPermission="admin.totalRevenue.check">{FormatterUtils.formatCurrency(productStock.totalQuantityAllStorage * productStock.productPrice)} </SecuredComponent></td>
           

            <td>{productStock.note}</td>
            <td className="text-center footable-visible footable-last-column">
                <ul className="icons-list">
                    <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                            <i className="icon-menu9"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-right">
                            {/* TODO Load Right Product Id that want to input or output Stock */}
                            <SecuredComponent allowedPermission="admin.stock.create">
                            <li><a onClick={() => handleShowStockMovementInputModalAddMore(productStock)}><i className="icon-plus3"></i>Nh???p Kho</a></li>
                            <li><a onClick={() => handleShowStockMovementOutputModalAddMore(productStock)}><i className="icon-rotate-cw"></i>Xu???t Kho</a></li>
                            </SecuredComponent>
                        </ul>
                    </li>
                </ul>
            </td>

        </tr>].concat(mvRows)
    )
}
let getMovementsByProductId = (listStockMovementByProductId, productId) => {
    for (var i = 0; i < listStockMovementByProductId.length; i++) {
        if (listStockMovementByProductId[i].productId == productId) {
            return listStockMovementByProductId[i];
        }
    }
    return null;
}


class StockList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listStock: null,
            listAllStorageLocation: [],
            listAllProductCategory: [],
            listAllSupplier:[],
            sumQuanityAndPrice:  null,
            idStockMovement: null,
            isShowListStockMovement: false,
            stockId: null,
            listStockMovementByProductId: [],// [{productId, listMovements,isShown}, ....]
            reloadNum: 1,
            productId: null,
            isModalShowStockMovementInput: false,
            isModalShowStockMovementOutput: false,
            productStockDto: null,
            preQuantity: 0,
            lsProductGetFilterValue:[],
            exportStockAvailable: false,
            scrollerTableContent: null,

        }
        this.updateListStock = this.updateListStock.bind(this);
        this.deleteStockMovement = this.deleteStockMovement.bind(this);
        this.updateStockMovement = this.updateStockMovement.bind(this);
        this.handleShowMovements = this.handleShowMovements.bind(this);
        this.stockSumQuantityAndPrice = this.stockSumQuantityAndPrice.bind(this);
        this.handleShowStockMovementInputModalEdit = this.handleShowStockMovementInputModalEdit.bind(this);
        this.handleShowStockMovementOutputModalEdit = this.handleShowStockMovementOutputModalEdit.bind(this);
        this.handleShowStockMovementInputModalAddMore = this.handleShowStockMovementInputModalAddMore.bind(this);
        this.handleShowStockMovementOutputModalAddMore = this.handleShowStockMovementOutputModalAddMore.bind(this);
        this.handleHideModal = () => {
            this.setState({
                isModalShowStockMovementInput: false,
                isModalShowStockMovementOutput: false
            });
            this.updateListStock();
            this.updateStockMovement(this.state.productId);
        };


    };
    getFilterValueFromProducts(){
        let setStateInRequest = (list) => { this.setState({ lsProductGetFilterValue: list }) }
        return agent.asyncRequests.get("/product/listAll").then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("C?? l???i khi t???i d??? li???u. L???i: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("C?? l???i khi t???i d??? li???u. Qu?? kh??ch vui l??ng ki???m tra k???t n???i internet v?? th??? l???i. Ho???c li??n h??? qu???n tr??? vi??n.", { autoClose: 15000 });
        });
    }
    stockSumQuantityAndPrice(){
        let setStateInRequest = (result) => { this.setState({ sumQuanityAndPrice: result }) }
        return agent.asyncRequests.get("/stock/sumQuantityAndPrice").then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("C?? l???i khi t???i d??? li???u. L???i: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("C?? l???i khi t???i d??? li???u. Qu?? kh??ch vui l??ng ki???m tra k???t n???i internet v?? th??? l???i. Ho???c li??n h??? qu???n tr??? vi??n.", { autoClose: 15000 });
        });
    }
    updateStockMovement(productId) {
        var listMv = this.state.listStockMovementByProductId;
        var reloadNum = this.state.reloadNum;
        if (productId) {
            let setStateInRequest = (list) => {
                var movementsByProductId = getMovementsByProductId(this.state.listStockMovementByProductId, productId)
                if (movementsByProductId) {
                    movementsByProductId.listMovements = list;
                    movementsByProductId.isShown = true;
                } else {
                    listMv.push({ productId: productId, listMovements: list, isShown: true });
                }
                this.setState({ listStockMovementByProductId: listMv });
                this.setState({ reloadNum: reloadNum + 1 });
            }
            return agent.asyncRequests.get("/stockMovement/listFindByProductId?productId=" + productId).then(function (res) {
                var result = res.body.resultData;
                if (result) {
                    setStateInRequest(result);
                } else {
                    toast.error("C?? l???i khi t???i d??? li???u. L???i: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("C?? l???i khi t???i d??? li???u. Qu?? kh??ch vui l??ng ki???m tra k???t n???i internet v?? th??? l???i. Ho???c li??n h??? qu???n tr??? vi??n.", { autoClose: 15000 });
            });
        }
    }
    //TODO LOAD RIGTH ADD AND UPDATE LIST STOCK MOVEMENT 
    updateListStock() {
        var search = qs.parse(this.props.location.search).search;
        search = search ? search : "";
        var page = qs.parse(this.props.location.search).page;
        this.getListStorageLocation();
        this.getListProductCategory();
        this.getFilterValueFromProducts();
        this.getListSupplier();
        //---------- 
        var productCategory = qs.parse(this.props.location.search).productCategory;
        productCategory = productCategory ? productCategory : "ALL";
        var supplier = qs.parse(this.props.location.search).supplier;
        supplier = supplier ? supplier : "ALL";
        var productUnit =  UrlUtils.getArrayParamValue(this.props.location.search, "productUnit");
        var productSize = UrlUtils.getArrayParamValue(this.props.location.search, "productSize");
        let setStateInRequest = (list) => { this.setState({ listStock: list }) }
        return agent.StockApi.listStock(search,productCategory,supplier,productSize,productUnit, page
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);

            } else {
                toast.error("C?? l???i khi t???i d??? li???u. L???i: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("C?? l???i khi t???i d??? li???u. Qu?? kh??ch vui l??ng ki???m tra k???t n???i internet v?? th??? l???i. Ho???c li??n h??? qu???n tr??? vi??n.", { autoClose: 15000 });
        });
    }
    getListStorageLocation() {
        let setStateInRequest = (list) => { this.setState({ listAllStorageLocation: list }) }
        return agent.asyncRequests.get("/storageLocation/listAll").then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("C?? l???i khi t???i d??? li???u. L???i: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("C?? l???i khi t???i d??? li???u. Qu?? kh??ch vui l??ng ki???m tra k???t n???i internet v?? th??? l???i. Ho???c li??n h??? qu???n tr??? vi??n.", { autoClose: 15000 });
        });
    }
    getListProductCategory() {
        let setStateInRequest = (list) => { this.setState({ listAllProductCategory: list }) }
        return agent.asyncRequests.get("/productCategory/listAll").then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("C?? l???i khi t???i d??? li???u. L???i: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("C?? l???i khi t???i d??? li???u. Qu?? kh??ch vui l??ng ki???m tra k???t n???i internet v?? th??? l???i. Ho???c li??n h??? qu???n tr??? vi??n.", { autoClose: 15000 });
        });
    }

    getListSupplier() {
        let setStateInRequest = (list) => { this.setState({ listAllSupplier : list }) }
        return agent.asyncRequests.get("/supplier/listAll").then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("C?? l???i khi t???i d??? li???u. L???i: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("C?? l???i khi t???i d??? li???u. Qu?? kh??ch vui l??ng ki???m tra k???t n???i internet v?? th??? l???i. Ho???c li??n h??? qu???n tr??? vi??n.", { autoClose: 15000 });
        });
    }
    handleShowMovements(productId) {
        // if(this.state.listStockMovementByProductId){
        var listMv = this.state.listStockMovementByProductId;
        var reloadNum = this.state.reloadNum;
        if (productId) {
            this.setState({ productId: productId })
            var mbs = getMovementsByProductId(listMv, productId);
            if (mbs && mbs.isShown) {
                mbs.isShown = false;
                this.setState({ reloadNum: reloadNum + 1 });
                return;
            }
            let setStateInRequest = (list) => {
                var movementsByProductId = getMovementsByProductId(this.state.listStockMovementByProductId, productId)
                if (movementsByProductId) {
                    movementsByProductId.listMovements = list;
                    movementsByProductId.isShown = true;
                } else {
                    listMv.push({ productId: productId, listMovements: list, isShown: true });
                }
                this.setState({ listStockMovementByProductId: listMv });
                this.setState({ reloadNum: reloadNum + 1 });
            }
            return agent.asyncRequests.get("/stockMovement/listFindByProductId?productId=" + productId).then(function (res) {
                var result = res.body.resultData;
                if (result) {
                    setStateInRequest(result);
                } else {
                    toast.error("C?? l???i khi t???i d??? li???u. L???i: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("C?? l???i khi t???i d??? li???u. Qu?? kh??ch vui l??ng ki???m tra k???t n???i internet v?? th??? l???i. Ho???c li??n h??? qu???n tr??? vi??n.", { autoClose: 15000 });
            });
        }

    };

    componentWillMount() {
        this.updateListStock();
        this.stockSumQuantityAndPrice();
    };

    componentDidUpdate() {
        ScriptUtils.loadFootable();
        ScriptUtils.loadFormLayout();
        ScriptUtils.loadLibrary("/assets/js/scroll-bar/double-scrollbar.js");
        

       

    }
   
    //Delete Stock Function
    deleteStockMovement(id) {
        var productId = this.state.productId;
        var updateStockMovement = this.updateStockMovement;
        var updateListStock = this.updateListStock;
        if (confirm("B???n c?? ch???c s??? xo??!")) {
            var url = `/stockMovement/${id}`;
            return agent.asyncRequests.del(url
            ).then(function (res) {
                var result = res.body.resultData;
                if (result && !result.error) {
                    updateStockMovement(productId);
                    updateListStock();
                    alert("Xo?? Th??nh C??ng!");


                } else {
                    toast.error("C?? l???i khi x??a d??? li???u. L???i: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Kh??ng th??? x??a d??? li???u ??ang ???????c s??? d???ng t??? m??n h??nh kh??c! ", { autoClose: 15000 });
            });
        } else {
        }
    }


    handleShowStockMovementInputModalAddMore(productStock) {
        this.setState({
            isModalShowStockMovementInput: true,
            productStockDto: productStock,
            idStockMovement: null,
            preQuantity: 0
        });
    }
    handleShowStockMovementOutputModalAddMore(productStock) {
        this.setState({
            isModalShowStockMovementOutput: true,
            productStockDto: productStock,
            idStockMovement: null,
            preQuantity: 0
        });
    }
    handleShowStockMovementInputModalEdit(id, productStock, stockDto,preQuantity) {
        this.setState({
            isModalShowStockMovementInput: true,
            stockDto: stockDto,
            idStockMovement: id,
            productStockDto: productStock,
            preQuantity: preQuantity
        })
    }
    handleShowStockMovementOutputModalEdit(id, productStock, stockDto,preQuantity) {
        this.setState({
            isModalShowStockMovementOutput: true,
            stockDto: stockDto,
            idStockMovement: id,
            productStockDto: productStock,
            preQuantity: preQuantity
        })
    }
    render() {
        // var tableClassName = [];
        
        //     if(tableClassName){
        //     tableClassName.map(item=>{
        //         scrollerWidth = item;
        //     })
        // }    
        // }
        var productFilterValue = this.state.lsProductGetFilterValue;
        var baseUrl = UrlUtils.getPathWithParamsNotPaging();
        const data = this.state.listStock;
        const dataStorageLocation = this.state.listAllStorageLocation;
        const dataStockMovement = this.state.listStockMovement;
        const dataProductCategory = this.state.listAllProductCategory;
        const dataSupplier= this.state.listAllSupplier;
        var flag1 = [], flag2 = [], optionSizes = [], optionUnits= [],l = productFilterValue.length, i, j;
        for( i=0; i<l; i++) {
            if(flag1[productFilterValue[i].size]){
                continue;
            }
            flag1[productFilterValue[i].size] = true;
            if(productFilterValue[i].size !=null){
            optionSizes.push({label:productFilterValue[i].size,value:productFilterValue[i].size});
            }
        }
        for( j=0; j<l; j++) {
            if(flag2[productFilterValue[j].unit]){
                continue;
            }
            flag2[productFilterValue[j].unit] = true;
            if(productFilterValue[j].unit !=null){
                optionUnits.push({label:productFilterValue[j].unit,value:productFilterValue[j].unit});
            }
    }
        if (!data) {
            return null;
        }
        var page = qs.parse(this.props.location.search).page;
        if (!page) {
            page = 1;
        }
        var header = [];
        var rowData = [];




        var currentNo = ((page - 1) * 20);
        var header = dataStorageLocation.map(item => {
            return (
                [<th style={{whiteSpace:'nowrap'}}>T???ng T???n<br/><sub> Kho {item.locationName}</sub></th>,
                    
                <th style={{whiteSpace:'nowrap'}}>T???ng Ti???n T???n<br/><sub>Kho {item.locationName}</sub> </th>
              
                ]
            )
        })
        var rows = data.content.map((productStock, index) => {
            currentNo++
            return <StockRows key={currentNo}
                countHeader={header.length}
                handleShowMovements={this.handleShowMovements}
                deleteStockMovement={this.deleteStockMovement}
                handleShowStockMovementInputModalEdit={this.handleShowStockMovementInputModalEdit}
                handleShowStockMovementOutputModalEdit={this.handleShowStockMovementOutputModalEdit}
                handleShowStockMovementInputModalAddMore={this.handleShowStockMovementInputModalAddMore}
                handleShowStockMovementOutputModalAddMore={this.handleShowStockMovementOutputModalAddMore}
                movementsByProductId={getMovementsByProductId(this.state.listStockMovementByProductId, productStock.productId)}
                dataStockMovement={dataStockMovement}
                index={index}
                productStock={productStock} currentNo={currentNo}  ></StockRows>
        });
        var search = qs.parse(this.props.location.search).search;
        if (!search) {
            search = "";
        }

        var productCategory = qs.parse(this.props.location.search).productCategory;
        if (!productCategory) {
            productCategory = "ALL";
        }
        var supplier = qs.parse(this.props.location.search).supplier;
        if (!supplier) {
            supplier = "ALL";
        }
        var productUnit =  UrlUtils.getArrayParamValue(this.props.location.search, "productUnit");
        var productSize = UrlUtils.getArrayParamValue(this.props.location.search, "productSize");
        if (productUnit == "ALL") {
            productUnit = [productUnit];
        }
        if (productSize=="ALL") {
            productSize = ["ALL"];
        }
        var optionProductCategory = [];
        dataProductCategory.map(item => {
            optionProductCategory.push({ label: item.name, value: item.id })
        })

        var optionSupplier = [];
        dataSupplier.map(item => {
            optionSupplier.push({ label: item.name, value: item.id })
        })

        var sumQuanityAndPrice = this.state.sumQuanityAndPrice;
        if(!sumQuanityAndPrice){
            return <LoadingScreen></LoadingScreen>
        }
        return (
            
            <div className="content-wrapper">


                <div className="content">
                    <div className="page-header">
                        <h4>
                            <i className=" icon-paragraph-justify2 position-left"></i>
                            <span className="text-semibold">Danh s??ch T???n Kho</span>
                            <span className="pull-right">

                            </span>
                        </h4>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-flat">

                                <div className="panel-body">

                                <form className="main-search" role="form">
                                            <div className="form-group">
                                            <div className="col-md-3">
                                                <label className="control-label col-md-6" htmlFor="supplier">Nh?? Cung C???p</label>
                                                    <select  placeholder="T???t c???" className="select form-control" name="supplier" defaultValue={supplier} >  
                                                        <option  key="ALL" value="ALL">T???t c???</option>
                                                        {optionSupplier.map(supplier => <option  key={supplier.value} value={supplier.value} >{supplier.label}</option>)}
                                                    </select>
                                                  <br/>
                                        </div>
                                        <div className="col-md-3">
                                                <label className="control-label col-md-6" htmlFor="productCategory">Lo???i S???n Ph???m</label>
                                                    <select  placeholder="T???t c???" className="select form-control" name="productCategory" defaultValue={productCategory} >  
                                                        <option  key="ALL" value="ALL">T???t c???</option>
                                                        {optionProductCategory.map(productCategory => <option  key={productCategory.value} value={productCategory.value} >{productCategory.label}</option>)}
                                                    </select>
                                                  <br/>
                                        </div>
                                        <div className="col-md-3">
                                                <label  className="control-label col-md-6" htmlFor="productUnit">????n V??? T??nh</label>
                                                    <select  multiple  placeholder="T???t c???" className="select form-control" name="productUnit" defaultValue={productUnit} >  
                                                        <option  key="ALL" value="ALL">T???t c???</option>
                                                        {optionUnits.map(productUnit => <option  key={productUnit.value} value={productUnit.value} >{productUnit.label}</option>)}
                                                    </select>
                                                    <br/>
                                                    </div>
                                                    <div className="col-md-3">
                                                <label  className="control-label col-md-6" htmlFor="productSize">K??ch C???</label>
                                                       <select   multiple placeholder="T???t c???" className="select form-control" name="productSize" defaultValue={productSize} >  
                                                        <option key="ALL" value="ALL">T???t c???</option>
                                                        {optionSizes.map(productSize => <option key={productSize.value} value={productSize.value} >{productSize.label}</option>)}
                                                    </select>
                                                </div>
                                            </div>
                                        <br/>
                                        <br/>
                                        <div style={{height:'50px'}}> </div>
                                        <br/>
                                        <br/>
                                        <div className="input-group content-group">
                                            <div className="has-feedback has-feedback-left">
                                                <input type="text" className="form-control input-xlg" placeholder="T??m ki???m theo: T??n S???n Ph???m" name="search" defaultValue={search} autoFocus={true} />
                                                    <div className="form-control-feedback">
                                                        <i className="icon-search4 text-muted text-size-base"></i>
                                                    </div>
                                            </div>
                                            <div className="input-group-btn">
                                                <button type="submit" className="btn bg-teal btn-xlg">T??m</button>
                                            </div>
                                        </div>
                                        <div className="pull-right">
                                        {sumQuanityAndPrice.map(sum=>{
                                            return <SecuredComponent allowedPermission="admin.totalRevenue.check"> <h5>T???ng S??? L?????ng T???n: {FormatterUtils.round2Decimals(sum.totalQuantity)} <br/> T???ng Ti???n T???n: {FormatterUtils.formatCurrency(sum.totalPrice)} </h5></SecuredComponent>
                                       
                                        })}
                                      
                                        </div>
                                    </form>
                                </div>
                            </div>
                            {this.state.isModalShowStockMovementInput ? <ModalStockMovementInput title="Nh???p Kho" idStockMovement={this.state.idStockMovement} preQuantity={this.state.preQuantity} stockDto={this.state.stockDto} productStockDto={this.state.productStockDto} show={this.state.isModalShowStockMovementInput} onHide={this.handleHideModal} /> : null}
                            {this.state.isModalShowStockMovementOutput ? <ModalStockMovementOutput title="Xu???t Kho" idStockMovement={this.state.idStockMovement} preQuantity={this.state.preQuantity}  stockDto={this.state.stockDto} productStockDto={this.state.productStockDto} show={this.state.isModalShowStockMovementOutput} onHide={this.handleHideModal} /> : null}
                            {this.state.exportStockAvailable ? <div className="text-right">
                                <ReactHTMLTableToExcel
                                    id="test-table-all-employee-xls-button"
                                    className="download-table-xls-button"
                                    table="table-all-employee-xls-button"
                                    filename={"Kho_Ng??y:"+moment().format("DD-MM-YYYY")}
                                    sheet={"Kho_Ng??y:"+moment().format("DD-MM-YYYY")}
                                    buttonText="Download Excel" />
                            </div> : null}
                            <div style={{position:'sticky',top:0,zIndex:1}} className="scroll-wrapper1">
                             <div className="div-scroll-1"></div>
                                 </div>
                          <div style={{overflow:'auto'}} className="panel panel-flat scroll-wrapper2">
                                <table  className="table table-bordered">
                                    <thead >
                                        <tr style={{textAlign:'center'}} className="bg-teal">
                                            <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                            <th data-toggle="true">STT</th>
                                            <th style={{whiteSpace:'nowrap'}} data-hide="phone">T??n S???n Ph???m & Nh?? CC  </th>
                                            <th data-hide="phone">M?? S???n Ph???m</th>
                                            <th data-hide="phone">????n V???</th>
                                            <th data-hide="phone">Size</th>
                                            <th style={{whiteSpace:'nowrap'}} data-hide="phone">Lo???i S???n Ph???m</th>
                                            <th data-hide="phone">Gi?? S???n Ph???m</th>
                                            {header}
                                            <th data-hide="phone">T???ng S??? L?????ng T???n</th>
                                                <th data-hide="phone">T???ng Ti???n T???n Kho</th>
                                            <th data-hide="phone">Ghi Ch??</th>
                                            <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>
                            <TablePagination data={data} baseUrl={baseUrl} />
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}

export default translate('translations')(StockList);