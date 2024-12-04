function manageUsers() {
  alert("Quản lý người dùng");
}

let AD0 = JSON.parse(localStorage.getItem('ADMIN0')) || {};
const open_admin = document.getElementById('open-admin');
const add_product = document.getElementById('add-product');
const dangxuat1 = document.getElementById('dangxuat');
const ql_user = document.getElementById('ql-user');
const ql_hoadon = document.getElementById('ql-hoadon');
const chucnang_admin = document.getElementById('chucnang-admin');

const tonghop = document.getElementById('tonghop');
const tonghop_sp_h2 = document.getElementById('tonghop-sp-h2');
const tonghop_user_h2 = document.getElementById('tonghop-user-h2');
const tonghop_hoadon_h2 = document.getElementById('tonghop-hoadon-h2');

const overlay_admin=document.getElementById('overlay-admin');
const addproductform = document.getElementById('addProductForm');
const imgg =document.getElementById('imagePreview');

function tonghops(){
  tonghop.style.display = 'flex';
  add_product.style.display = 'none';
  ql_user.style.display = 'none';
  ql_hoadon.style.display = 'none';
}

//Mở quản lí thêm sản phẩm
function add_products() {
  add_product.style.display = 'flex';
  tonghop.style.display = 'none';
  ql_user.style.display = 'none';
  ql_hoadon.style.display = 'none';
}

function ql_users() {
  ql_user.style.display = 'block';
  tonghop.style.display = 'none';
  ql_hoadon.style.display = 'none';
  add_product.style.display = 'none';
}

function ql_hoadons() {
  ql_hoadon.style.display = 'block';
  tonghop.style.display = 'none';
  add_product.style.display = 'none';
  ql_user.style.display = 'none';
}
function open_form_addproduct(){
  addproductform.style.display='flex';
  overlay_admin.style.display='block';
}
function close_x_addproduct(){
  document.getElementById('addProductForm').reset();
  let imagePreview = document.getElementById('imagePreview');
  imagePreview.src = '';  // Xóa ảnh
   addproductform.style.display='none';
   overlay_admin.style.display='none';
}

document.getElementById('img').addEventListener('change', function(event) {
  let file = event.target.files[0];  // Lấy file ảnh được chọn
  let reader = new FileReader();

  reader.onload = function(e) {
    // Lấy URL ảnh dưới dạng base64
    let imageUrl = e.target.result;

    // Hiển thị ảnh lên thẻ <img> (Hiển thị ảnh đã chọn)
    let imagePreview = document.getElementById('imagePreview');
    imagePreview.src = imageUrl;
    imagePreview.style.display = 'block';  // Hiển thị ảnh
  };

  if (file) {
    reader.readAsDataURL(file);  // Đọc file ảnh dưới dạng base64
  }
});



let currentPageADMIN = 1;  // Trang mặc định là trang 1
let itemsPerPageADMIN = 8;  // Số sản phẩm mỗi trang
// Hiển thị danh sách sản phẩm trong admin
function displayProducts() {
  let productListA = document.getElementById('productListA');
  productListA.innerHTML = '';  // Làm sạch danh sách sản phẩm cũ
  let paginationA = document.getElementById('paginationA');
  paginationA.innerHTML = '';  // Làm sạch phần phân trang cũ

  if (products.length === 0) {
    productListA.innerHTML = 'Chưa có sản phẩm admin !';
  } else {
    let totalPages = Math.ceil(products.length / itemsPerPageADMIN);  // Tính số trang
    let start = (currentPageADMIN - 1) * itemsPerPageADMIN;
    let end = start + itemsPerPageADMIN;
    let productsToShow = products.slice(start, end);  // Lấy sản phẩm cho trang hiện tại

    // Hiển thị sản phẩm cho trang hiện tại
    productsToShow.forEach((product) => {
      let productDiv = document.createElement('div');
      productDiv.classList.add('product-item');
      productDiv.innerHTML = `
        <p>${product.id}</p>
        <img src="${product.img}" alt="${product.name}">
        <div>
           <h3>${product.name}</h3>
           <p>${product.description}</p>
           <p><b style="color:red;">${product.price} VND</b></p>
           <p>${product.category}</p>
        </div>
        <div>
           <button onclick="editProduct(${product.id})">Sửa</button>
           <button onclick="deleteProduct(${product.id})">Xóa</button>
        </div>
      `;
      productListA.appendChild(productDiv);
    });

    // Tạo các nút phân trang nếu cần
    if (totalPages > 1) {
      for (let i = 1; i <= totalPages; i++) {
        let pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.onclick = () => changePageA(i, products);  // Khi nhấn vào, thay đổi trang
        paginationA.appendChild(pageButton);
      }
    }
  }
  let a = products.length;
  tonghop_sp_h2.innerHTML = `${a}`;  // Cập nhật số lượng sản phẩm
}

// Hàm thay đổi trang
function changePageA(page, products) {
  currentPageADMIN = page;  // Cập nhật trang hiện tại
  displayProducts();  // Hiển thị lại sản phẩm cho trang hiện tại
}

// Thêm sản phẩm vào localStorage
function addProduct(newProduct) {
  products.push(newProduct);
  localStorage.setItem('products', JSON.stringify(products));
  displayProducts();  // Hiển thị lại danh sách sản phẩm
}

// Cập nhật sản phẩm trong localStorage
function updateProduct(Id, updatedProduct) {
  let index = products.findIndex(u => u.id == String(Id));
  if (index !== -1) {
    products[index] = updatedProduct;
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();  // Hiển thị lại danh sách sản phẩm
  }
}

// Xóa sản phẩm khỏi localStorage
function deleteProduct(id) {
  let userResponse = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
  if (userResponse) {
    let productIndex = products.findIndex(u => u.id == id);
    if (productIndex !== -1) {
      products.splice(productIndex, 1);
      localStorage.setItem('products', JSON.stringify(products));
      displayProducts();  // Hiển thị lại danh sách sản phẩm
    }
  }
}

function displayImagePreview(event) {
  let imagePreview = document.getElementById('imagePreview');
  let file = event.target.files[0];  // Lấy tệp ảnh được chọn
  if (file) {
    let reader = new FileReader();
    reader.onload = function (e) {
      imagePreview.src = e.target.result;  // Đây là URL base64 của ảnh
      imagePreview.style.display = 'block';  // Hiển thị ảnh
    };
    reader.readAsDataURL(file);
  }
}

// Chỉnh sửa sản phẩm
function editProduct(productid) {
  let product = products.find(u => u.id == productid);

  open_form_addproduct();  // Mở form thêm sản phẩm

  document.getElementById('id').value = product.id;
  document.getElementById('name').value = product.name;
  document.getElementById('price').value = product.price;
  document.getElementById('quantity').value = product.quantity;
  document.getElementById('description').value = product.description;
  document.getElementById('category').value = product.category;

  // Hiển thị ảnh trong <img id="imagePreview">
  let imagePreview = document.getElementById('imagePreview');
  imagePreview.src = product.img;  // Đây là URL của ảnh trong sản phẩm (base64 hoặc URL)
  imagePreview.style.display = 'block';  // Hiển thị ảnh

  Id = Number(product.id);  // Lưu ID sản phẩm hiện tại
}











document.addEventListener('DOMContentLoaded', function () {
  displayUsers();
  capnhat_hoadon_admin();
});
//********** */
const log_out_admin= document.getElementById('log-out-admin');
        // Thêm sự kiện click vào div để chuyển hướng
        log_out_admin.addEventListener('click', function() {
          window.location.href = 'main.html'; // Chuyển đến main.html
        });
//***********TÀI KHOẢN NGƯỜI DÙNG******* */

function displayUsers() {
  let ql_user_list = document.getElementById('ql-user-list');
  ql_user_list.innerHTML = '';
  let a=0;
    users.forEach((users) => {
      let ADMIN0 = JSON.parse(localStorage.getItem('ADMIN0')) || [];
      if(users.tel===String(ADMIN0.tel))
      {
        a++;
        return;
      }
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
      a++;
    });
    if (a===1) {
      ql_user_list.innerHTML = 'Chưa có tài khoản người dùng !';
    }
    tonghop_user_h2.innerHTML=`${users.length}`;
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
  let a = 0;
  // Lặp qua tất cả người dùng trong danh sách `users`
  users.forEach(user => {
    if (user.hoadon.length === 0) {
      // Nếu không có hóa đơn, hiển thị thông báo
      let noOrderDiv = document.createElement('div');
      noOrderDiv.classList.add('no-order');
      noOrderDiv.innerHTML = `<p>Người dùng chưa có đơn hàng.</p>`;
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
        a++;
      });
    }
  });
  tonghop_hoadon_h2.innerHTML = `${a}`;
}
