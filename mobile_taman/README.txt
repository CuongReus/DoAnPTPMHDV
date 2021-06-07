hướng dân run project mobile app sử dụng expo
https://expo.io/learn
1. cài expo-cli
	npm install expo-cli --global
2. download project
3. cài expo app trên android hoặc ios
4. vào file agent.js trong thư mục src/services/agent.js chỉnh lại 2 dòng sau bằng địa chỉ IP của máy
	const API_ROOT = 'http://192.168.1.3:8080/api';
	const API_TOKEN = 'http://192.168.1.3:8080/oauth/token';
5. chạy backend logcrm
6. run project bằng lệnh expo start bên trong thư mục gốc của project
npm install
expo start
7. chờ mã QR code trên webBrower và quét bằng điện thoại là có thể run
8. View the developer tool http://localhost:19002/

// Nếu đang sử dụng wifi, cần tìm đúng ip trong "Wireless LAN adapter Wi-Fi" và set và biến môi trường
export REACT_NATIVE_PACKAGER_HOSTNAME='192.168.0.101'

