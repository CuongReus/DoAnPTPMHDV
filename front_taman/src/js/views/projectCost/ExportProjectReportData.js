import moment from 'moment';
import { FormatterUtils } from '../../utils/javascriptUtils';


const ExportProjectReportData = {
    getDataExport: ( 
        productTotalPaid,
        coEfficientProduct,
        incurredProduct,
        labourTotalPaid,
        coEfficientLabour,
        incurredLabour,
        otherTotalPaid,
        coEfficientOther,
        constructionTeamTotalPaid,
        coEfficientConstructionTeam,
        totalIncurred,
        totalProjectCost,
        percentTotalProject,
        totalSurplusValue,
        quotationApprovalValue,
        incurredApprovalValue,
        totalProfit,
        totalManageFee,
        actualProfit,
        props) => {
        // Show list items
       
        const projectPaymentDto = props.projectPaymentDto;
        var today = new Date();

        
        var itemRows = [
            /* Ngân Sách Vật Tư - productBudgetGroup */
            [ 
                { text: 'Ngân Sách Vật Tư', style: 'tableHeader', alignment: 'center', fillColor: '#008000', colSpan: 5 },
                {},
                {},
                {},
                {}
            ],
            [
                {text:'Tổng Ngân Sách Vật Tư (1)', alignment: 'center', fontSize: 10},
                {text:'Tổng Thanh Toán Vật Tư (2)', alignment: 'center', fontSize: 10},
                {text:'Hệ Số Chênh Lệch (2)/(1)', alignment: 'center', fontSize: 10},
                {text:'Trạng Thái \n(Đạt khi: nhỏ hơn hoặc bằng 100%)',fontSize: 10, alignment: 'center', colSpan:2},
                {}
            ],
            [
                {text:''+FormatterUtils.formatCurrency(projectPaymentDto.projectBudget.productBudget), alignment: 'center', fontSize: 10},
                {text:'' + FormatterUtils.formatCurrency(productTotalPaid), alignment: 'center', fontSize: 10},
                {text:''+ coEfficientProduct +'%', alignment: 'center', fontSize: 10},
                {text:'' + (coEfficientProduct > 100 ? "Không đạt" : "Đạt"),color:(coEfficientProduct > 100 ? "red" : "green"),fontSize: 10, alignment: 'center', colSpan:2},
                {}

            ],

            /* Ngân Sách Đội Thi Công - constructionTeamBudgetGroup */
            [ 
                { text: 'Ngân Sách Đội Thi Công', style: 'tableHeader', alignment: 'center', fillColor: '#008000', colSpan: 5 },
                {},
                {},
                {},
                {}
            ],
            [
                {text:'Tổng Ngân Sách Đội Thi Công (3)', alignment: 'center', fontSize: 10},
                {text:'Tổng Thanh Toán Đội Thi Công (4)', alignment: 'center', fontSize: 10},
                {text:'Hệ Số Chênh Lệch (4)/(3)', alignment: 'center', fontSize: 10},
                {text:'Trạng Thái \n(Đạt khi: nhỏ hơn hoặc bằng 100%)',fontSize: 10, alignment: 'center', colSpan:2},
                {}
            ],
            [
                {text:''+ FormatterUtils.formatCurrency(projectPaymentDto.projectBudget.constructionTeamBudget), alignment: 'center', fontSize: 10},
                {text:'' + FormatterUtils.formatCurrency(constructionTeamTotalPaid), alignment: 'center', fontSize: 10},
                {text:''+ coEfficientConstructionTeam +'%', alignment: 'center', fontSize: 10},
                {text:'' + (coEfficientConstructionTeam > 100 ? "Không đạt" : "Đạt"),color:(coEfficientConstructionTeam > 100 ? "red" : "green"),fontSize: 10, alignment: 'center', colSpan:2},
                {}

            ],

            /* Ngân Sách Nhân Công - labourBudgetGroup */
            [ 
                { text: 'Ngân Sách Nhân Công', style: 'tableHeader', alignment: 'center', fillColor: '#008000', colSpan: 5 },
                {},
                {},
                {},
                {}
            ],
            [
                {text:'Tổng Ngân Sách Nhân Công (5)', alignment: 'center', fontSize: 10},
                {text:'Tổng Thanh Toán Nhân Công (6)', alignment: 'center', fontSize: 10},
                {text:'Hệ Số Chênh Lệch (6)/(5)', alignment: 'center', fontSize: 10},
                {text:'Trạng Thái \n(Đạt khi: nhỏ hơn hoặc bằng 100%)',fontSize: 10, alignment: 'center', colSpan:2},
                {}
            ],
            [
                {text:''+ FormatterUtils.formatCurrency(projectPaymentDto.projectBudget.labourBudget), alignment: 'center', fontSize: 10},
                {text:'' + FormatterUtils.formatCurrency(labourTotalPaid), alignment: 'center', fontSize: 10},
                {text:''+ coEfficientLabour +'%', alignment: 'center', fontSize: 10},
                {text:'' + (coEfficientLabour > 100 ? "Không đạt" : "Đạt"),color:(coEfficientLabour > 100 ? "red" : "green"),fontSize: 10, alignment: 'center', colSpan:2},
                {}

            ],

            /* Ngân Sách Chi Phí Khác - otherBudgetGroup */
            [ 
                { text: 'Ngân Sách Chi Phí Khác', style: 'tableHeader', alignment: 'center', fillColor: '#008000', colSpan: 5 },
                {},
                {},
                {},
                {}
            ],
            [
                {text:'Tổng Ngân Sách Chi Phí Khác (7)', alignment: 'center', fontSize: 10},
                {text:'Tổng Thanh Toán Chi Phí Khác (8)', alignment: 'center', fontSize: 10},
                {text:'Hệ Số Chênh Lệch (8)/(7)', alignment: 'center', fontSize: 10},
                {text:'Trạng Thái \n(Đạt khi: nhỏ hơn hoặc bằng 100%)',fontSize: 10, alignment: 'center', colSpan:2},
                {}
            ],
            [
                {text:''+ FormatterUtils.formatCurrency(projectPaymentDto.projectBudget.otherBudget), alignment: 'center', fontSize: 10},
                {text:'' + FormatterUtils.formatCurrency(otherTotalPaid), alignment: 'center', fontSize: 10},
                {text:''+ coEfficientOther +'%', alignment: 'center', fontSize: 10},
                {text:'' + (coEfficientOther > 100 ? "Không đạt" : "Đạt"),color:(coEfficientOther > 100 ? "red" : "green"),fontSize: 10, alignment: 'center', colSpan:2},
                {}

            ],

            /* Phát Sinh Vật Tư - incurredProductGroup */
            [ 
                { text: 'Phát Sinh Vật Tư', style: 'tableHeader', alignment: 'center', fillColor: '#008000', colSpan: 5 },
                {},
                {},
                {},
                {}
            ],
            [
                {text:'Ngân Sách Vật Tư (9)', alignment: 'center', fontSize: 10},
                {text:'Thanh Toán Vật Tư (10)', alignment: 'center', fontSize: 10},
                {text:'Hệ Số Chênh Lệch (10)-(9)', alignment: 'center', fontSize: 10},
                {text:'Trạng Thái \n(Đạt khi: nhỏ hơn hoặc bằng 0)',fontSize: 10, alignment: 'center', colSpan:2},
                {}
            ],
            [
                {text:''+ FormatterUtils.formatCurrency(projectPaymentDto.projectBudget.productBudget), alignment: 'center', fontSize: 10},
                {text:'' + FormatterUtils.formatCurrency(productTotalPaid), alignment: 'center', fontSize: 10},
                {text:''+ FormatterUtils.formatCurrency(incurredProduct), alignment: 'center', fontSize: 10},
                {text:'' + (parseInt(incurredProduct) > 0 ? "Không đạt" : "Đạt"),color:(parseInt(incurredProduct) > 0 ? "red" : "green"),fontSize: 10, alignment: 'center', colSpan:2},
                {}

            ],

            /* Phát Sinh Nhân Công - incurredLabourGroup */
            [ 
                { text: 'Phát Sinh Nhân Công', style: 'tableHeader', alignment: 'center', fillColor: '#008000', colSpan: 5 },
                {},
                {},
                {},
                {}
            ],
            [
                {text:'Ngân Sách Nhân Công (11)', alignment: 'center', fontSize: 10},
                {text:'Thanh Toán Nhân Công (12)', alignment: 'center', fontSize: 10},
                {text:'Tổng Phát Sinh Nhân Công (12) - (11)', alignment: 'center', fontSize: 10},
                {text:'Trạng Thái \n(Đạt khi: nhỏ hơn hoặc bằng 0)',fontSize: 10, alignment: 'center', colSpan:2},
                {}
            ],
            [
                {text:''+ FormatterUtils.formatCurrency(projectPaymentDto.projectBudget.labourBudget), alignment: 'center', fontSize: 10},
                {text:'' + FormatterUtils.formatCurrency(labourTotalPaid), alignment: 'center', fontSize: 10},
                {text:''+ FormatterUtils.formatCurrency(incurredLabour), alignment: 'center', fontSize: 10},
                {text:'' + (parseInt(incurredLabour) > 0 ? "Không đạt" : "Đạt"),color:(parseInt(incurredLabour) > 0 ? "red" : "green"),fontSize: 10, alignment: 'center', colSpan:2},
                {}

            ],

            /* Các Tổng Tiền - allTotalMoneyGroupToCalculate */
            [ 
                { text: 'Các Tổng Tiền', bold:true, fontSize:13, color:'black', alignment: 'center', fillColor: '#DAA520', colSpan: 5 },
                {},
                {},
                {},
                {}
            ],
            [
                {text:'Tổng Ngân Sách (13)', alignment: 'center', fontSize: 10},
                {text:'Tổng Thanh Toán (14)', alignment: 'center', fontSize: 10},
                {text:'Tổng Báo Giá Được Duyệt (15)', alignment: 'center', fontSize: 10},
                {text:'Tổng Phát Sinh Được Duyệt (16)',fontSize: 10, alignment: 'center'},
                {text:'Tổng Ngân Sách Phát Sinh (17)',fontSize: 10, alignment: 'center'},
            ],
            [
                {text:''+ FormatterUtils.formatCurrency(projectPaymentDto.projectBudget.totalProjectBudget), alignment: 'center', fontSize: 10},
                {text:'' + FormatterUtils.formatCurrency(totalProjectCost), alignment: 'center', fontSize: 10},
                {text:''+ FormatterUtils.formatCurrency(quotationApprovalValue), alignment: 'center', fontSize: 10},
                {text:'' + FormatterUtils.formatCurrency(incurredApprovalValue),fontSize: 10, alignment: 'center'},
                {text:'' + FormatterUtils.formatCurrency(projectPaymentDto.projectBudget.incurredBudget),fontSize: 10, alignment: 'center'},

            ],

            /* Chi Phí Phát Sinh - incurredBudgetGroup */
            [ 
                { text: 'Chi Phí Phát Sinh', style: 'tableHeader', alignment: 'center', fillColor: '#008000', colSpan: 5 },
                {},
                {},
                {},
                {}
            ],
            [
                {text:'Phát Sinh Vật Tư (18)', alignment: 'center', fontSize: 10},
                {text:'Phát Sinh Nhân Công (19)', alignment: 'center', fontSize: 10},
                {text:'Tổng Phát Sinh (18) + (19)', alignment: 'center', fontSize: 10},
                {text:'Trạng Thái \n(Đạt khi: nhỏ hơn hoặc bằng (17))',fontSize: 10, alignment: 'center', colSpan:2}, 
                {}               
            ],
            [
                {text:''+ FormatterUtils.formatCurrency(incurredProduct), alignment: 'center', fontSize: 10},
                {text:'' + FormatterUtils.formatCurrency(incurredLabour), alignment: 'center', fontSize: 10},
                {text:''+ FormatterUtils.formatCurrency(totalIncurred), alignment: 'center', fontSize: 10},
                {text:'' + (parseInt(totalIncurred) > parseInt(projectPaymentDto.projectBudget.incurredBudget) ? "Không đạt" : "Đạt"),color:(parseInt(totalIncurred) > parseInt(projectPaymentDto.projectBudget.incurredBudget) ? "red" : "green"),fontSize: 10, alignment: 'center', colSpan:2},
                {}

            ],

            /* Tổng Phần Trăm Thanh Toán - percentTotalProjectGroup */
            [ 
                { text: 'Tổng Phần Trăm Thanh Toán', style: 'tableHeader', alignment: 'center', fillColor: '#008000', colSpan: 5 },
                {},
                {},
                {},
                {}
            ],
            [
                {text:'Tổng Ngân Sách (13)', alignment: 'center', fontSize: 10},
                {text:'Tổng Thanh Toán (14)', alignment: 'center', fontSize: 10},
                {text:'Phần Trăm Thanh Toán (14) / (13)', alignment: 'center', fontSize: 10},
                {text:'Trạng Thái \n(Đạt khi: nhỏ hơn hoặc bằng 100%)',fontSize: 10, alignment: 'center', colSpan:2},  
                {}              
            ],
            [
                {text:''+ FormatterUtils.formatCurrency(projectPaymentDto.projectBudget.totalProjectBudget), alignment: 'center', fontSize: 10},
                {text:'' + FormatterUtils.formatCurrency(totalProjectCost), alignment: 'center', fontSize: 10},
                {text:''+ FormatterUtils.round2Decimals(percentTotalProject), alignment: 'center', fontSize: 10},
                {text:'' + (percentTotalProject > 100 ? "Không đạt" : "Đạt"),color:(percentTotalProject > 100 ? "red" : "green"),fontSize: 10, alignment: 'center', colSpan:2},
                {}

            ],

            /* Giá Trị Thặng Dư - surplusValueGroup */
            [ 
                { text: 'Giá Trị Thặng Dư', style: 'tableHeader', alignment: 'center', fillColor: '#008000', colSpan: 5 },
                {},
                {},
                {},
                {}
            ],
            [
                {text:'Tổng Ngân Sách (13)', alignment: 'center', fontSize: 10},
                {text:'Tổng Thanh Toán (14)', alignment: 'center', fontSize: 10},
                {text:'Giá Trị Thặng Dự (13) - (14)', alignment: 'center', fontSize: 10},
                {text:'Trạng Thái \n(Đạt khi: Lớn hơn 0)',fontSize: 10, alignment: 'center', colSpan:2},  
                {}              
            ],
            [
                {text:''+ FormatterUtils.formatCurrency(projectPaymentDto.projectBudget.totalProjectBudget), alignment: 'center', fontSize: 10},
                {text:'' + FormatterUtils.formatCurrency(totalProjectCost), alignment: 'center', fontSize: 10},
                {text:''+ FormatterUtils.formatCurrency(totalSurplusValue), alignment: 'center', fontSize: 10},
                {text:'' + (totalSurplusValue < 0 ? "Không đạt" : "Đạt"),color:(totalSurplusValue < 0 ? "red" : "green"),fontSize: 10, alignment: 'center', colSpan:2},
                {}

            ],

            /* Tổng Lợi Nhuận - totalProfitGroup */
            [ 
                { text: 'Tổng Lợi Nhuận', style: 'tableHeader', alignment: 'center', fillColor: '#008000', colSpan: 5 },
                {},
                {},
                {},
                {}
            ],
            [
                {text:'Lợi Nhuận (20)) =  ((15)+ (16)) - (14)', alignment: 'center', fontSize: 10},
                {text:'Chi Phí Quản Lý 6% (21) =  ((15)+(16) * 6%)', alignment: 'center', fontSize: 10},
                {text:'Lợi Nhuận Sau Quản Lý (20) - (21)', alignment: 'center', fontSize: 10},
                {text:'Trạng Thái \n(Đạt khi: Lớn hơn 0)',fontSize: 10, alignment: 'center', colSpan:2},  
                {}              
            ],
            [
                {text:''+ FormatterUtils.formatCurrency(totalProfit), alignment: 'center', fontSize: 10},
                {text:'' + FormatterUtils.formatCurrency(totalManageFee), alignment: 'center', fontSize: 10},
                {text:''+ FormatterUtils.formatCurrency(actualProfit), alignment: 'center', fontSize: 10},
                {text:'' + (actualProfit < 0 ? "Không đạt" : "Đạt"),color:(actualProfit < 0 ? "red" : "green"),fontSize: 10, alignment: 'center', colSpan:2},
                {}

            ],

        ];


        var tableItems = {
            style: 'tableExample',
            headerRows: 1,
            table: {
                widths: ['auto', 'auto', 'auto', 'auto','auto'],
                body:itemRows
            },
            // layout: {
			// 	fillColor: function (rowIndex, node, columnIndex) {
			// 		return (rowIndex === 0) ? '#008000' : null;
			// 	}
			// }
        },

            projectReportExportData = {
                content: [
                    {
                        columns: [
                            {
                                text: 'BÁO CÁO THANH TOÁN', fontSize: 18, alignment: 'center', bold:true
                            },

                        ]

                    },
                    {text: '\n'},
                        
                    {
                        columns: [
                            { 
                                text: 'Dự Án: '+ projectPaymentDto.projectDetailDto.project.name, fontSize: 13, alignment: 'center' 
                            },
                        ]
                    },
                    {text: '\n'},

                        
                    {
                        columns: [
                            { 
                                text: 'Công Việc: ' + projectPaymentDto.projectDetailDto.name , fontSize: 13, alignment: 'center' 
                            },
                        ]
                    },
                    {text: '\n'},

                    {
                        columns: [
                            { 
                                text: 'Ngày Bắt Đầu Làm Việc: ' +  moment(projectPaymentDto.projectDetailDto.efficiency ? projectPaymentDto.projectDetailDto.efficiency.startActualProgressDate : null ).format('DD/MM/YYYY')
                                + ' || Ngày Kết Thúc Làm Việc: ' + moment(projectPaymentDto.projectDetailDto.efficiency ? projectPaymentDto.projectDetailDto.efficiency.endPlanProgressDate : null).format('DD/MM/YYYY'), alignment:'center', fontSize: 13                                   
                                
                            },
                            
                        ]
                    },
                    {text: '\n'},

                    {
                        columns: [
                            { 
                                text: 'Số Ngày: ' + moment(projectPaymentDto.projectDetailDto.efficiency.endPlanProgressDate).diff(projectPaymentDto.projectDetailDto.efficiency.startActualProgressDate, 'days'),fontSize: 13, alignment: 'center',                                    
                                
                            },
                            
                        ]
                    },
                    
                    
                    {text: '\n\n'},
                    tableItems,
                    { text: '\n\n\n' },

                    
                    { text: '\n' },
                    {
                        columns: [
                            { text: 'Ngày ' + moment(today).format("LL"), alignment: 'right', bold:true, fontSize: 11, italics: true },

                        ]
                    },
                    {
                        style: 'tableExample',
                        table: {
                            widths: ['*', '*', '*', '*', 'auto'],
                            body: [
                                [
                                    {},
                                    {},
                                    {},
                                    {text: [
                                        {text:'Giám Đốc\n',bold:true, alignment:'center'},
                                        {text:'(Ký, họ tên)', italics: true, alignment:'center', fontSize:10}
                                    ], colSpan:2},
                                    {}
                                ]
                            ]
                        },
                        layout: 'noBorders'
                    },

                    

                    
                ],
                styles: {
                    header: {
                        fontSize: 15,
                        bold: true,
                        margin: [0, 0, 0, 10]
                    },
                    subheader: {
                        fontSize: 13,
                        bold: true,
                        margin: [0, 10, 0, 5]
                    },
                    tableExample: {
                    margin: [0, 0, 0, 0]
                    },
                    tableHeader: {
                        bold: true,
                        fontSize: 13,
                        color: 'white'
                    }
                },
                defaultStyle: {
                    columnGap: 10
                },
            }
        
        return projectReportExportData;


    }
}
export { ExportProjectReportData };



