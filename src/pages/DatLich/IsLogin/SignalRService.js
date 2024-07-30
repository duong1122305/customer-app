// SignalRService.js
import { HubConnectionBuilder } from '@microsoft/signalr';

const baseUrl = "https://localhost:7039/bookingHub"; // Đổi URL nếu cần

export const createHubConnection = (onReceiveNotification) => {
  // Tạo kết nối HubSignalR
  const connection = new HubConnectionBuilder()
    .withUrl(baseUrl, {
      withCredentials: true // Đảm bảo có quyền gửi thông tin xác thực nếu cần
    })
    .build();

  // Đăng ký phương thức nhận thông báo
  connection.on("ReceiveBookingNotification", (message) => {
    onReceiveNotification(message); // Xử lý thông báo khi nhận
  });

  // Bắt đầu kết nối và xử lý lỗi
  connection.start()
    .then(() => console.log("Connected to SignalR"))
    .catch(err => console.error("SignalR connection error: ", err));

  // Trả về đối tượng kết nối để có thể sử dụng sau này
  return connection;
};
