import { SecurityUtils } from "../../utils/javascriptUtils";

export const LOAD_UPDATING_PERSONEL = 'LOAD_UPDATING_PERSONEL';
export const LOAD_UPDATING_ROLE = 'LOAD_UPDATING_ROLE';

export const ALL_ROLES = [
    {
        moduleName: "Nhân Sự",
        entities: [
            {
                entityName: "admin.users",
                keys: [
                    "admin.users.read",
                    "admin.users.create",
                    "admin.users.update",
                    "admin.users.setupAnnualLeaveForUser",
                    "admin.users.delete"
                ]
            },
            {
                entityName: "admin.userSalaryConfig",
                keys: [
                    "admin.userSalaryConfig.read",
                    "admin.userSalaryConfig.update",
                ]
            },
            {
                
               
                entityName: "admin.department",
                keys: [
                    "admin.department.read",
                "admin.department.create",
                "admin.department.update",
                "admin.department.delete"
                ]
            },
            {
                entityName: "admin.roles",
                keys: [
                    "admin.roles.read",
                    "admin.roles.create",
                    "admin.roles.update",
                    "admin.roles.delete"
                ]
            },
            {
                entityName: "admin.holiday",
                keys: [
                    "admin.holiday.read",
                    "admin.holiday.create",
                    "admin.holiday.update",
                    "admin.holiday.delete",
                    "admin.holiday.approvalLetter"
                ]
            }
        ]
    },
    {
        moduleName: "Quản lý sản phẩm sơn",
        entities: [
            {
                entityName: "admin.product",
                keys: [
                    "admin.product.read",
                    "admin.product.create",
                    "admin.product.update",
                    "admin.product.delete"
                ]
            },
            {
                entityName: "admin.productCategory",
                keys: [
                    "admin.productCategory.read",
                    "admin.productCategory.create",
                    "admin.productCategory.update",
                    "admin.productCategory.updateSalesMarginForProduct",
                    "admin.productCategory.delete",

                ]
            },
        ]
    },
    {
        moduleName: "Quản lý mua hàng",
        entities: [
            {
                entityName: "admin.contact",
                keys: [
                    "admin.contact.read",
                    "admin.contact.create",
                    "admin.contact.update",
                    "admin.contact.delete"
                ]
            },
            {
                entityName: "admin.sale",
                keys: [
                    "admin.sale.read",
                    "admin.sale.create",
                    "admin.sale.update",
                    "admin.sale.delete",
                    "admin.sale.allowApprovalStatus",
                    "admin.sale.readTotalMoney"
                ]
            },
            {
                entityName: "admin.contactSaleHistory",
                keys: [
                    "admin.contactSaleHistory.read"
                ]
            },
        ]
    },
    {
        moduleName: "Quản lý dự án",
        entities: [
            {
                entityName: "admin.company",
                keys: [
                    "admin.company.read",
                    "admin.company.create",
                    "admin.company.update",
                    "admin.company.delete",
                    "admin.company.goToProjectYear"

                ]
            },
            {
                entityName: "admin.project",
                keys: [
                    "admin.project.read",
                    "admin.project.create",
                    "admin.project.update",
                    "admin.project.delete",

                ]
            },
            {
                entityName: "admin.projectDetail",
                keys: [
                    "admin.projectDetail.read",
                    "admin.projectDetail.create",
                    "admin.projectDetail.allowSetUserBudgetPermission",
                    "admin.projectDetail.update",
                    "admin.projectDetail.delete"
                ]
            },
            {
                entityName: "admin.projectProgress",
                keys: [
                    // C&U : createAndUpdate
                    "admin.projectProgress.read",
                    "admin.projectProgress.quotationC&U",
                    "admin.projectProgress.approvalC&U",
                    "admin.projectProgress.contractC&U",
                    "admin.projectProgress.invoiceVer1C&U",
                    "admin.projectProgress.efficientC&U",
                    "admin.projectProgress.invoiceVer2C&U",
                    "admin.projectProgress.completeC&U",
                    "admin.projectProgress.acceptanceC&U",
                    "admin.projectProgress.invoiceVer3C&U",
                    "admin.projectProgress.incurredC&U",
                    "admin.projectProgress.HoachToanHoaDon"
                ]
            },
            {
                entityName: "admin.projectCost",
                keys: [
                    "admin.projectCost.budgetC&U",
                    // "admin.projectCost.productRead",
                    "admin.projectCost.productC&U",
                    "admin.projectCost.productDelete",
                    // "admin.projectCost.labourRead",
                    "admin.projectCost.labourC&U",
                    "admin.projectCost.labourDelete",

                    // "admin.projectCost.otherRead",
                    "admin.projectCost.otherC&U",
                    "admin.projectCost.otherDelete",
                    // "admin.projectCost.constructionTeamRead",
                    "admin.projectCost.constructionTeamC&U",
                    "admin.projectCost.constructionTeamDelete",
                    "admin.projectCost.reportRead",
                   
                ]
            },
            {
                entityName: "admin.projectCostApproval",
                keys: [
                    // C&U : createAndUpdate
                    "admin.projectCostApproval.productAllowApproval",
                    "admin.projectCostApproval.labourAllowApproval",
                    "admin.projectCostApproval.otherAllowApproval",
                    "admin.projectCostApproval.constructionTeamAllowApproval",
                   
                ]
            },
            {
                entityName: "admin.projectPayment",
                keys: [
                    
                    "admin.projectPayment.productC&U",
                    "admin.projectPayment.productDelete",
                    "admin.projectPayment.labourC&U",
                    "admin.projectPayment.otherC&U",
                    "admin.projectPayment.otherDelete",
                    "admin.projectPayment.constructionTeamC&U",
                    "admin.projectPayment.constructionTeamDelete"
                   
                ]
            },
            {
                entityName: "admin.projectPaymentApproval",
                keys: [
                    // C&U : createAndUpdate
                    "admin.projectPaymentApproval.productAllowApproval",
                    "admin.projectPaymentApproval.labourAllowApproval",
                    "admin.projectPaymentApproval.otherAllowApproval",
                    "admin.projectPaymentApproval.constructionTeamAllowApproval"
                   
                ]
            }
            

            
            
        ]
    },
    {
        moduleName: "Đội Thi Công",
        entities: [
            {
                entityName: "admin.constructionTeam",
                keys: [
                    "admin.constructionTeam.read",
                    "admin.constructionTeam.create",
                    "admin.constructionTeam.update",
                    "admin.constructionTeam.delete"
                ]
            }
        ]
    },
    {
        moduleName: "Quản lý nhân công & chấm công",
        entities: [
            {
                entityName: "admin.labour",
                keys: [
                    "admin.labour.read",
                    "admin.labour.create",
                    "admin.labour.update",
                    "admin.labour.delete"
                ]
            },
          
            {
                entityName: "admin.labourAttendance",
                keys: [
                    "admin.labourAttendance.forSupervisor",
                    "admin.labourAttendance.forAttendanceDepart",
                    "admin.labourAttendance.create",
                    "admin.labourAttendance.update",
                    "admin.labourAttendance.delete"
                ]
            }
        ]
    },
    {
        moduleName: "Chấm Công Khối Văn Phòng ",
        entities: [
            {
                entityName: "admin.employeeAttendance",
                keys: [
                    "admin.employeeAttendance.read",
                    "admin.employeeAttendance.create",
                    "admin.employeeAttendance.readAllEmployeeAttendance",
                    "admin.employeeAttendance.allowSetAttendanceForAll",
                    "admin.employeeAttendance.allowSetAtterndanceAfter10Days",
                    "admin.employeeAttendance.update",
                    "admin.employeeAttendance.delete",
                ]
            }
        ]
    },
    {
        moduleName: "Tổng Doanh Thu",
        entities: [
            {
                entityName: "admin.totalRevenue",
                keys: [
                    "admin.totalRevenue.check",
                ]
            }
        ]
    },
    {
        moduleName: "Báo cáo thanh toán",
        entities: [
            {
                entityName: "admin.report",
                keys: [
                    "admin.report.read",
                ]
            }
        ]
    },
    {
        moduleName: "Phân Quyền Mobile",
        entities: [
            {
                entityName: "admin.mobile",
                keys: [
                    "admin.mobile.admin",
                    "admin.mobile.user",
                ]
            }
        ]
    },
  
]

