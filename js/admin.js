function manageUsers() {
  alert("Quản lý người dùng");
}

let AD0 = JSON.parse(localStorage.getItem('ADMIN0')) || {};
const admin_loginForm = document.getElementById('admin-loginForm');
const open_admin = document.getElementById('open-admin');
const display_account_admin = document.getElementById('display-account-admin');
const add_product = document.getElementById('add-product');
const name_admin = document.getElementById('name-admin');
const dangxuat1 = document.getElementById('dangxuat');
const ql_user = document.getElementById('ql-user');
const ql_hoadon = document.getElementById('ql-hoadon');


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
  let AD0 = JSON.parse(localStorage.getItem('ADMIN0')) || {};
  open_admin.style.display = 'flex';
  name_admin.innerHTML = `${AD0.tel}`;
  displayUsers();
  capnhat_hoadon_admin();
});

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


        <button onclick="editUser('${users.id}')">Sửa</button>
        <button onclick="deleteUser('${users.id}')">Xóa</button>
        <button onclick="lockUser('${users.id}')">${users.locked ? "Mở khóa" : "Khóa"}</button>
      `;
      ql_user_list.appendChild(userDiv);
    });
  }
}

function editUser(id) {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  localStorage.setItem('users', JSON.stringify(users));
  let user = users.find(user => user.id === id);
  if (user) {
    // Cập nhật thông tin người dùng từ form
    user.tel = document.getElementById(`ql-tel-${user.id}`).value;
    user.password = document.getElementById(`ql-current-password-${user.id}`).value;
    user.email = document.getElementById(`ql-email-${user.id}`).value;
    user.address = document.getElementById(`ql-address-${user.id}`).value;

    // Lưu lại vào localStorage
    localStorage.setItem('users', JSON.stringify(users));
    alert("Thông tin người dùng đã được cập nhật!");
    displayUsers(); // Cập nhật danh sách người dùng
  }
  else {
    alert(ngu);
  }
}

function deleteUser(userId) {
  let userIndex = users.findIndex(u => u.id === userId.toString()); // Đảm bảo id là chuỗi
  if (userIndex !== -1) {
    if (confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      users.splice(userIndex, 1); // Xóa người dùng khỏi mảng
      localStorage.setItem('users', JSON.stringify(users)); // Cập nhật lại localStorage
      alert("Người dùng đã bị xóa!");
      displayUsers(); // Cập nhật danh sách người dùng
    }
  }
}

// Khóa hoặc mở khóa người dùng
function lockUser(userId) {
  let user = users.find(u => u.id === userId);
  if (user) {
    user.locked = !user.locked; // Đảo ngược trạng thái khóa
    localStorage.setItem('users', JSON.stringify(users)); // Cập nhật lại localStorage
    alert(user.locked ? "Người dùng đã bị khóa!" : "Người dùng đã được mở khóa!");
    displayUsers(); // Cập nhật danh sách người dùng
  }
}

function capnhat_hoadon_admin() {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  let ql_hoadon_list = document.getElementById('ql-hoadon-list');
  ql_hoadon_list.innerHTML = ''; // Xóa nội dung hiện tại

  // Lặp qua tất cả người dùng trong danh sách `users`
  users.forEach(user => {
    if (user.hoadon.length === 0) {
      // Nếu không có hóa đơn, hiển thị thông báo
      let noOrderDiv = document.createElement('div');
      noOrderDiv.classList.add('no-order');
      noOrderDiv.innerHTML = `<p>Người dùng ${user.name} chưa có đơn hàng.</p>`;
      ql_hoadon_list.appendChild(noOrderDiv);
    } else {
      // Nếu có hóa đơn, hiển thị hóa đơn của người dùng
      user.hoadon.forEach(order => {
        let div = document.createElement('div');
        let orderDate = new Date(order.orderId); // Dùng `orderId` làm dấu thời gian
        let formattedDate = orderDate.toLocaleString(); // Định dạng ngày giờ
        div.classList.add('hoadon-con-admin');
        div.innerHTML = `
          <h3>Hóa đơn #${order.orderId}</h3>
          <p><strong>Ngày tạo hóa đơn:</strong> ${formattedDate}</p> <!-- Thêm ngày giờ -->
          <p><strong>Tên người nhận:</strong> ${order.name}</p>
          <p><strong>Số điện thoại:</strong> ${order.phone}</p>
          <p><strong>Địa chỉ:</strong> ${order.address}</p>
          <p><strong>Ghi chú:</strong> ${order.note ? order.note : 'Không có'}</p>
          <p><strong>Trạng thái:</strong> ${order.status}</p>
          <p><strong>Tổng tiền:</strong> ${order.totalpay_all.toLocaleString()} VND</p>
          <p><strong>Phí vận chuyển:</strong> ${order.totalphi.toLocaleString()} VND</p>
          <div class="order-products">
              <h4>Sản phẩm trong đơn hàng:</h4>
              <div class="order-items-list">
                  ${order.items.map(item => {
          return `
                          <div class="order-item-detail">
                              <p><strong>${item.name}</strong> - ${item.quantity} x ${item.price.toLocaleString()} VND</p>
                          </div>
                      `;
        }).join('')}
              </div>
          </div>
        `;
        ql_hoadon_list.appendChild(div); // Thêm hóa đơn vào danh sách
      });
    }
  });
}
