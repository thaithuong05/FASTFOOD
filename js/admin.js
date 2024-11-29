function manageUsers() {
  alert("Quản lý người dùng");
}
// Tạo một mảng
let ADMIN0 =
  { admin_username: '0987654321', admin_password: '123456' }
  ;

// Chuyển mảng thành chuỗi JSON
let ADMIN0_JSON = JSON.stringify(ADMIN0);

// Lưu mảng vào localStorage
localStorage.setItem('ADMIN0', ADMIN0_JSON);

let AD0 = JSON.parse(localStorage.getItem('ADMIN0')) || {};
const admin_loginForm = document.getElementById('admin-loginForm');
const open_admin = document.getElementById('open-admin');
const display_account_admin = document.getElementById('display-account-admin');
const add_product = document.getElementById('add-product');
const name_admin = document.getElementById('name-admin');
const dangxuat1 = document.getElementById('dangxuat');
const ql_user = document.getElementById('ql-user');
const ql_hoadon = document.getElementById('ql-hoadon');

// Kiểm tra đăng nhập
admin_loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const admin_username = document.getElementById('admin-username').value;
  const admin_password = document.getElementById('admin-password').value;

  if (admin_username === AD0.admin_username && admin_password === AD0.admin_password) {
    open_admin.style.display = 'flex';
    display_account_admin.style.display = 'none';
    name_admin.innerHTML = `${AD0.admin_username}`;
    document.getElementById('admin-loginForm').reset();

    let AD1 = JSON.parse(localStorage.getItem('ADMIN0')) || {};
    localStorage.setItem('ADMIN1', JSON.stringify(AD1));
    displayUsers();
    displayProducts();
  } else {
    alert('Thông tin đăng nhập không hợp lệ!');
  }
});


//Mở quản lí thêm sản phẩm
function add_products() {
  add_product.style.display = "block";
  open_admin.style.display = 'none';
}

function close_x_add_product() {
  add_product.style.display = 'none';
  open_admin.style.display = 'flex';
}

function ql_users() {
  ql_user.style.display = "block";
  open_admin.style.display = 'none';
}

function close_x_ql_user() {
  ql_user.style.display = 'none';
  open_admin.style.display = 'flex';
}

function ql_hoadons() {
  ql_hoadon.style.display = "block";
  open_admin.style.display = 'none';
}
function close_x_ql_hoadon() {
  ql_hoadon.style.display = 'none';
  open_admin.style.display = 'flex';
}

document.addEventListener('DOMContentLoaded', function () {
  let adminData = JSON.parse(localStorage.getItem('ADMIN1')) || {};

  if (adminData && adminData.admin_username) {
    display_account_admin.style.display = 'none';
    open_admin.style.display = 'flex';
    name_admin.innerHTML = adminData.admin_username;
    displayUsers();
  } else {
    return;
  }
});




let dx = 0;
function button_dangxuat() {
  if (dx === 0) {
    dangxuat1.style.display = 'block';
    dx = 1;
  }
  else {
    dangxuat1.style.display = 'none';
    dx = 0;
  }
}
function dangxuat() {
  let user_none = [];
  localStorage.setItem('ADMIN1', JSON.stringify(user_none));
  dangxuat1.style.display = 'none';
  display_account_admin.style.display = 'flex';
  open_admin.style.display = 'none';
  add_product.style.display = 'none';
  ql_user.style.display = 'none';
  name_admin.innerHTML = '';
}
//***********TÀI KHOẢN NGƯỜI DÙNG******* */

function displayUsers() {
  let ql_user_list = document.getElementById('ql-user-list');
  ql_user_list.innerHTML = '';

  if (users.length === 0) {
    ql_user_list.innerHTML = 'Chưa có tài khoản người dùng !';
  } else {
    console.log(users.length);
    users.forEach((users) => {
      let userDiv = document.createElement('div');
      userDiv.classList.add('user-1div');
      userDiv.innerHTML = `

        <label for="ql-tel-${users.id}">Số điện thoại</label><br>
        <input type="tel" id="ql-tel-${users.id}" value="${users.tel}" required readonly>

        <label for="ql-name-${users.id}">Họ và tên</label><br>
        <input type="text" id="ql-name-${users.id}" value="${users.username}" required>

        <label for="ql-current-password-${users.id}">Mật khẩu hiện tại</label><br>
        <input type="text" id="ql-current-password-${users.id}" value="${users.password}">

        <label for="ql-email-${users.id}">Email</label><br>
        <input type="email" id="ql-email-${users.id}" value="${users.email}">

        <label for="ql-address-${users.id}">Địa chỉ</label><br>
        <input type="text" id="ql-address-${users.id}" value="${users.address}">


        <button onclick="editUser(${users.id})">Sửa</button>
        <button onclick="deleteUser(${users.id})">Xóa</button>
      `;
      ql_user_list.appendChild(userDiv);

    });
  }
}