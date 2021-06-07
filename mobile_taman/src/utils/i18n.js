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
                    "Declarative": "Declarative",
                    "admin.users": "Màn Hình Quản Lý Nhân Viên",
                    "admin.users.read": "Xem nhân viên",
                    "admin.users.create": "Thêm mới nhân viên",
                    "admin.users.update": "Sửa nhân viên",
                    "admin.users.delete": "Xóa nhân viên",
                    "admin.roles": "Màn Hình Phân Quyền",
                    "admin.roles.read": "Xem phân quyền",
                    "admin.roles.create": "Thêm mới phân quyền",
                    "admin.roles.update": "Sửa phân quyền",
                    "admin.roles.delete": "Xóa phân quyền",
                    "admin.stock": "Màn Hình Quản Lý Kho",
                    "admin.stock.read": "Xem tồn kho",
                    "admin.stock.create": "Thêm tồn kho",
                    "admin.stock.update": "Cập nhật tồn kho",
                    "admin.stock.delete": "Xóa tồn kho",
                    "admin.stockLocation": "Màn Hình Địa Điểm Kho",
                    "admin.stockLocation.read": "Xem địa điểm kho",
                    "admin.stockLocation.create": "Thêm địa điểm kho",
                    "admin.stockLocation.update": "Sửa địa điểm kho",
                    "admin.stockLocation.delete": "Xóa địa điểm kho"
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
                    "admin.users.delete": "Xóa nhân viên",
                    "admin.roles": "Màn Hình Phân Quyền",
                    "admin.roles.read": "Xem phân quyền",
                    "admin.roles.create": "Thêm mới phân quyền",
                    "admin.roles.update": "Sửa phân quyền",
                    "admin.roles.delete": "Xóa phân quyền",
                    "admin.stock": "Màn Hình Quản Lý Kho",
                    "admin.stock.read": "Xem tồn kho",
                    "admin.stock.create": "Thêm tồn kho",
                    "admin.stock.update": "Cập nhật tồn kho",
                    "admin.stock.delete": "Xóa tồn kho",
                    "admin.stockLocation": "Màn Hình Địa Điểm Kho",
                    "admin.stockLocation.read": "Xem địa điểm kho",
                    "admin.stockLocation.create": "Thêm địa điểm kho",
                    "admin.stockLocation.update": "Sửa địa điểm kho",
                    "admin.stockLocation.delete": "Xóa địa điểm kho"
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
