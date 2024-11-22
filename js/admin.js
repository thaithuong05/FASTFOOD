// Ví dụ về chức năng quản lý người dùng
function manageUsers() {
  // Các hàm quản lý người dùng sẽ được thêm vào đây
  console.log("Quản lý người dùng");
}

//Tài khoản admin
const loginForm = document.getElementById('loginForm');
const open_admin = document.getElementById('open-admin');
const display_account_admin = document.getElementById('display-account-admin');

// Kiểm tra đăng nhập
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Kiểm tra thông tin đăng nhập (có thể thay đổi theo yêu cầu)
  if (username === 'thi' && password === '123') {
    open_admin.style.display = 'block';
    loginForm.style.display = 'none';
    display_account_admin.style.display='none';
    displayProducts(); // Lấy danh sách sản phẩm
  } else {
    alert('Thông tin đăng nhập không hợp lệ!');
  }
});

//***********TÀI KHOẢN NGƯỜI DÙNG******* */
