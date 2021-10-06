import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// https://phraseapp.com/blog/posts/react-i18n-best-libraries/

i18n
    .use(LanguageDetector)
    .init({
        // we init with resources
        resources: {
            en: {
                translations: {
                    "Welcome to React.js": "Welcome to React.js",
                    "Declarative": "Declarative"

                }
            },
            vi: {
                translations: {
                    "Welcome to React.js": "Chào mừng đến với React.js!",
                    "Declarative": "Khai báo",

                    "admin.users": "Màn Hình Quản Lý Nhân Viên",
                    "admin.users.read": "Xem nhân viên",
                    "admin.users.create": "Thêm mới nhân viên",
                    "admin.users.update": "Sửa nhân viên",
                    "admin.users.setupAnnualLeaveForUser":"Cài Đặt Ngày Phép",
                    "admin.users.delete": "Xóa nhân viên",


                    "admin.userSalaryConfig":"Màn Hình Cấu Hình Lương Nhân Sự",
                    "admin.userSalaryConfig.read":"Xem Cấu Hình Lương",
                    "admin.userSalaryConfig.update":"Chỉnh Sửa Cấu Hình Lương",

                    "admin.department": "Màn Hình Quản Lý Phòng Ban",
                    "admin.department.read": "Xem phòng ban",
                    "admin.department.create": "Thêm mới phòng ban",
                    "admin.department.update": "Sửa phòng ban",
                    "admin.department.delete": "Xóa phòng ban",

                    // "admin.swotUser": "Màn Hình Quản Lý SWOT",
                    // "admin.swotUser.read": "Xem SWOT",
                    // "admin.swotUser.create": "Thêm mới SWOT",
                    // "admin.swotUser.update": "Sửa SWOT",
                    // "admin.swotUser.delete": "Xóa SWOT",

                    "admin.roles": "Màn Hình Phân Quyền",
                    "admin.roles.read": "Xem phân quyền",
                    "admin.roles.create": "Thêm mới phân quyền",
                    "admin.roles.update": "Sửa phân quyền",
                    "admin.roles.delete": "Xóa phân quyền",

                    "admin.stock": "Màn Hình Quản Lý Kho",
                    // "admin.stock.read": "Xem tồn kho",
                    // "admin.stock.create": "Thêm tồn kho",
                    // "admin.stock.update": "Cập nhật tồn kho",
                    // "admin.stock.delete": "Xóa tồn kho",

                    "admin.stockLocation": "Màn Hình Địa Điểm Kho",
                    "admin.stockLocation.read": "Xem địa điểm kho",
                    "admin.stockLocation.create": "Thêm địa điểm kho",
                    "admin.stockLocation.update": "Sửa địa điểm kho",
                    "admin.stockLocation.delete": "Xóa địa điểm kho",

                    "admin.holiday": "Ngày Phép",
                    "admin.holiday.read": "Xem Ngày Phép",
                    "admin.holiday.create": "Tạo Ngày Phép",
                    "admin.holiday.update": "Chỉnh Sửa Ngày Phép",
                    "admin.holiday.approvalLetter": "Quyền Duyệt Đơn",
                    "admin.holiday.delete": "Xoá Ngày Phép",

                    // "admin.stock":"Kho",
                    "admin.stock.read": "Xem Thông Tin Kho",
                    "admin.stock.create": "Nhập - Xuất Kho",
                    "admin.stockReport":"Màn Hình Báo Cáo Kho",
                    "admin.stockReport.read":"Cho Phép Xem",
                    // "admin.stock.update",
                    // "admin.stock.delete":
                    "admin.product": "Màn Hình Sản Phẩm Sơn",
                    "admin.product.read": "Xem Sản Phẩm ",
                    "admin.product.create": "Thêm Mới Sản Phẩm",
                    "admin.product.update": "Chỉnh Sửa Sản Phẩm",
                    "admin.product.delete": "Xóa Sản Phẩm",
                    "admin.productCategory": "Màn Hình Phân Loại Sản Phẩm",
                    "admin.productCategory.read": "Xem Phân Loại Sản Phẩm",
                    "admin.productCategory.create": "Tạo Mới Loại Sản Phẩm",
                    "admin.productCategory.update": "Chỉnh Sửa Loại Sản Phẩm",
                    "admin.productCategory.delete": "Xóa Loại Sản Phẩm",
                    "admin.productCategory.updateSalesMarginForProduct":"Cập Nhật Biên Độ Bán Hàng Sản Phẩm", 
                    "admin.contact":"Màn Hình Đơn Vị Liên Hệ (Khách Hàng) ",
                    "admin.contact.read":"Cho Phép Xem",
                    "admin.contact.create":"Cho Phép Thêm Mới",
                    "admin.contact.update":"Cho Phép Chỉnh Sửa",
                    "admin.contact.delete":"Cho Phép Xoá",
                    "admin.sale":"Màn Hình Mua Hàng",
                    "admin.sale.read":"Cho Phép Xem",
                    "admin.sale.create":"Cho Phép Thêm Mới",
                    "admin.sale.update":"Cho Phép Chỉnh Sửa",
                    "admin.sale.delete":"Cho Phép Xoá",
                    "admin.sale.allowApprovalStatus":"Cho Phép Duyệt Đơn Hàng",
                    "admin.sale.readTotalMoney":"Cho Phép Xem Tổng Tiền",
                    "admin.contactSaleHistory":"Màn Hình Lịch Sử Mua Hàng",
                    "admin.contactSaleHistory.read":"Cho Phép Xem Lịch Sử Mua Hàng",
                    "admin.company": "Màn Hình Dự Án Công Ty",
                    "admin.company.read": "Xem Danh Sách Công Ty",
                    "admin.company.create": "Tạo Mới Công Ty",
                    "admin.company.update": "Chỉnh Sửa Công Ty",
                    "admin.company.delete": "Xóa Công Ty",
                    "admin.project": "Màn Hình Quản Lý Dự Án",
                    "admin.project.read": "Xem thông Tin Dự Án",
                    "admin.project.create": "Thêm Mới Dự Án",
                    "admin.project.update": "Cập Nhật Dự Án",
                    "admin.project.delete": "Xoá Dự Án",

                    "admin.projectDetail": "Màn Hình Quản Lý Công Việc",
                    "admin.projectDetail.read": "Cho Phép Xem Công Việc",
                    "admin.projectDetail.create": "Cho Phép Thêm Mới Công Việc",
                    "admin.projectDetail.allowSetUserBudgetPermission": "Cho Phép Phân Quyền `Thao Tác Thanh Toán` ",
                    "admin.projectDetail.update": "Cho Phép Thay Đổi Công Việc",
                    "admin.projectDetail.delete": "Cho Phép Xoá Công Việc",

                    "admin.projectProgress": "Quy Trình Dự Án",
                    "admin.projectProgress.read": "Xem Quy Trình",
                    "admin.projectProgress.HoachToanHoaDon" : "Xem Hoạch Toán Hoá Đơn",
                    "admin.projectProgress.quotationC&U": "Thao Tác Bước 1: Báo Giá",
                    "admin.projectProgress.approvalC&U": "Thao Tác Bước 2: Trạng Thái Duyệt",
                    "admin.projectProgress.contractC&U": "Thao Tác Bước 3: Hợp Đồng ",
                    "admin.projectProgress.invoiceVer1C&U": "Thao Tác Bước 4: Hoá Đơn Lần 1",
                    "admin.projectProgress.efficientC&U": "Thao Tác Bước 5: Thực Hiện ",
                    "admin.projectProgress.invoiceVer2C&U": "Thao Tác Bước 6: Hoá Đơn Lần 2",
                    "admin.projectProgress.completeC&U": "Thao Tác Bước 7: Hoàn Thành",
                    "admin.projectProgress.acceptanceC&U": "Thao Tác Bước 8: Nghiệm Thu",
                    "admin.projectProgress.invoiceVer3C&U": "Thao Tác Bước 9: Hoá Đơn Lần 3",
                    "admin.projectProgress.incurredC&U": "Thao Tác Bước 10: Phát Sinh",

                    "admin.labour": "Màn Hình Quản Lý Nhân Công",
                    "admin.labour.read": "Xem Nhân Công",
                    "admin.labour.create": "Thêm Mới Nhân Công",
                    "admin.labour.update": "Cập Nhật Nhân Công",
                    "admin.labour.delete": "Xoá Nhân Công",

                    //constructionTeam : Đội Thi Công
                    "admin.constructionTeam": "Đội Thi Công",
                    "admin.constructionTeam.read": "Cho phép xem",
                    "admin.constructionTeam.create": "Cho phép thêm mới đội thi công",
                    "admin.constructionTeam.update": "Cho phép chỉnh sửa đội thi công",
                    "admin.constructionTeam.delete": "Cho phép xoá đội thi công",

                    "admin.labourAttendance": "Màn Hình Quản Lý Chấm Công",
                    "admin.labourAttendance.forSupervisor": "Thuộc Về Giám Sát",
                    "admin.labourAttendance.forAttendanceDepart": "Thuộc Về Bộ Phận Tổng Công",
                    "admin.labourAttendance.create": "Cho Phép Chấm Công",
                    "admin.labourAttendance.update": "Chỉnh Sửa Ngày Công",
                    "admin.labourAttendance.delete": "Xoá Ngày Công",

                    "admin.totalRevenue": "Màn Hình Tổng Doanh Thu",
                    "admin.totalRevenue.check": "Hiện Tổng Doanh Thu",

                    "admin.Approval.check": "Cho Phép Duyệt",

                    "admin.employeeAttendance": "Màn Hình Chấm Công Khối Văn Phòng",
                    "admin.employeeAttendance.read": "Cho phép xem",
                    "admin.employeeAttendance.create":  "Cho phép chấm công",
                    "admin.employeeAttendance.update": "Cho phép chỉnh sửa chấm công",
                    "admin.employeeAttendance.readAllEmployeeAttendance": "Cho phép xem tất cả công nhân viên",
                    "admin.employeeAttendance.allowSetAttendanceForAll": "Cho phép chấm công tất cả nhân viên",
                    "admin.employeeAttendance.allowSetAtterndanceAfter10Days": "Cho phép chấm công trể sau 10 ngày",
                    "admin.employeeAttendance.update": "Cho phép chỉnh sửa chấm công" ,
                    "admin.employeeAttendance.delete": "Cho phép xóa",


                   



                    // Module ProjectCost & Payment
                    "admin.projectCost": "Thanh Toán Công Việc Dự Án",
                    "admin.projectCost.budgetC&U": "Thêm Mới & Chỉnh Sửa Ngân Sách",
                    "admin.projectCost.productC&U": "Thêm Mới & Chỉnh Sửa Thanh Toán Vật Tư",
                    "admin.projectCost.productDelete": "Xóa Thanh Toán Vật Tư",
                    "admin.projectCost.labourC&U": "Thêm Mới & Chỉnh Sửa Thanh Toán Nhân Công",
                    "admin.projectCost.labourDelete": "Xóa Thanh Toán Nhân Công",
                    "admin.projectCost.otherC&U": "Thêm Mới & Chỉnh Sửa Thanh Toán Chi Phi Khác",
                    "admin.projectCost.otherDelete": "Xóa Thanh Toán Chi Phí Khác",
                    "admin.projectCost.constructionTeamC&U": "Thêm Mới & Chỉnh Sửa Thanh Toán Đội Thi Công",
                    "admin.projectCost.constructionTeamDelete": "Xóa Thanh Toán Đội Thi Công",
                    "admin.projectCost.reportRead": "Xem Báo Cáo",
                    "admin.projectCostApproval": "Duyệt Thanh Toán",
                    "admin.projectCostApproval.productAllowApproval": "Duyệt Thanh Toán Vật Tư",
                    "admin.projectCostApproval.labourAllowApproval": "Duyệt Thanh Toán Nhân Công",
                    "admin.projectCostApproval.otherAllowApproval": "Duyệt Thanh Toán Chi Phí Khác",
                    "admin.projectCostApproval.constructionTeamAllowApproval": "Duyệt Thanh Toán Đội Thi Công",
                    "admin.projectPayment": "Chi Tiết Đợt Thanh Toán",
                    "admin.projectPayment.productC&U": "Thêm Mới & Chỉnh Sửa Chi Tiết Đợt Vật Tư",
                    "admin.projectPayment.productDelete": "Xóa Chi Tiết Đợt Vật Tư",
                    "admin.projectPayment.labourC&U": "Thêm Mới & Chỉnh Sửa Chi Tiết Đợt Nhân Công",
                    // "admin.projectPayment.labourDelete": "Xóa Chi Tiết Đợt Nhân Công ",
                    "admin.projectPayment.otherC&U": "Thêm Mới & Chỉnh Sửa Chi Tiết Đợt Chi Phí Khác",
                    "admin.projectPayment.otherDelete": "Xóa Chi Tiết Đợt Chi Phí Khác",
                    "admin.projectPayment.constructionTeamC&U": "Thêm Mới & Chỉnh Sửa Chi Tiết Đợt Đội Thi Công",
                    "admin.projectPayment.constructionTeamDelete": "Xóa Chi Tiết Đợt Đội Thi Công",
                    "admin.projectPaymentApproval": "Duyệt Chi Tiết Đợt Thanh Toán",
                    "admin.projectPaymentApproval.productAllowApproval": "Duyệt Chi Tiết Đợt TT Vật Tư",
                    "admin.projectPaymentApproval.labourAllowApproval": "Duyệt Chi Tiết Đợt TT Nhân Công",
                    "admin.projectPaymentApproval.otherAllowApproval": "Duyệt Chi Tiết Đợt TT Chi Phí Khác",
                    "admin.projectPaymentApproval.constructionTeamAllowApproval": "Duyệt Chi Tiết Đợt TT Đội Thi Công",

                    "admin.report": "Màn hình báo cáo",
                    "admin.report.read": "Xem báo cáo",
                    "admin.report.edit": "Chỉnh Sửa báo cáo",
                    "admin.report.create": "Thêm Mới báo cáo",
                    "admin.report.update": "Chỉnh Sửa báo cáo",

                    "admin.mobile": "Phân Quyền Mobile",
                    "admin.mobile.admin": "Quyền admin",
                    "admin.mobile.user": "Quyền user",
                   
                    "CHUA_DUYET_THANH_TOAN": "Chưa Thanh Toán",
                    "DA_DUYET_THANH_TOAN" : "Đã Duyệt Thanh Toán",
                    "CHUA_THANH_TOAN_DU" : "Chưa Thanh Toán Đủ",
                    "DA_THANH_TOAN_DU" : "Đã Thanh Toán Đủ",
                    "HANG_KY_GUI" : "Hàng Ký Gửi",
                    "DA_DUYET": "Đã Duyệt",
                    "CHUA_DUYET":"Chưa Duyệt",
                    "KH_LE":"Khách Hàng Lẻ",
                    "DAI_LY":"Đại Lý",
                    "NULL":"",
                    "DU":"Đủ",
                    "CHUA_CO":"Chưa Có",
                     //leaveType TransLate
                     "ANNUAL_HOLIDAY": "Nghỉ phép",
                     "ANNUAL_HOLIDAY_2": "Nghỉ phép nửa ngày",
                     "NB": "Nghỉ bù",
                     "NB2": "Nghỉ bù nửa ngày",
                     "KP": "Nghỉ bù nửa ngày",
                     "KP2": "Nghỉ bù nửa ngày",
                     "ALTERNATIVE_LEAVE": "Nghỉ bù",
                     "SICK_LEAVE": "Nghỉ Bệnh(Có bảo hiểm)",
                     "MATERNITY_LEAVE": "Nghỉ thai sản",
                     "MARRIAGE_LEAVE": "Nghỉ cưới",
                     "MOURNING_LEAVE": "Nghỉ có tang",
                     "TANG_CA_THUONG_TOI": "Tăng Ca Thường",
                     "TANG_CA_KHUYA": "Ca KHUYA",
                     "KHONG": "Không",
                     "CO": "Có",

                     "NHA_CUNG_CAP": "Nhà Cung Cấp",
                    "THUONG_HIEU":"Thương Hiệu",

                    //  Project & ProjectDetail status translate
                    "DANG_THUC_THI": "Đang Thực Thi",
                    "DA_HOAN_THANH": "Đã Hoàn Thành",
                    
                    //Gender status translate
                    "FEMALE":"Nữ",
                    "MALE":"Nam",
                    //Status
                    "DANG_CHO_DUYET":"Đang Chờ Duyệt",
                    "DA_DUYET":"Đã Duyệt",
                    "KHONG_DUOC_DUYET":"Không Được Duyệt",
                    "DOI_THI_CONG": "Đội Thi Công",
                    "CHI_PHI_KHAC": "Chi Phí Khác",
                    "VAT_TU": "Vật Tư",

                    //SwotType
                    "STRENGTH": "Điểm mạnh",
                    "WEAKNESS": "Điểm yếu",
                    "OPPORTUNITY": "Cơ hội",
                    "THREAT": "Thách thức",

                    "DEVICE": "Thiết bị - Dụng cụ",
                    "ROOM": "Cơ sở vật chất",
                    "OTHER": "Tài nguyên khác",
                }
            }
        },
        fallbackLng: 'vi',
        debug: true,

        // have a common namespace used around the full app
        ns: ['translations'],
        defaultNS: 'translations',

        keySeparator: false, // we use content as keys

        interpolation: {
            escapeValue: false, // not needed for react!!
            formatSeparator: ','
        },

        react: {
            wait: true
        }
    });

export default i18n;
