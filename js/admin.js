
// Chỉ số sản phẩm đang chỉnh sửa
let Id = -1;
document.getElementById('addProductForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Ngừng việc làm mới trang

  // Lấy giá trị từ form
  let id = document.getElementById('id').value.trim();
  let name = document.getElementById('name').value;
  let price = document.getElementById('price').value;
  let description = document.getElementById('description').value;
  let quantity = document.getElementById('quantity').value.trim();
  let category = document.getElementById('category').value;
  let imgInput = document.getElementById('img');
  let file = imgInput.files[0];  // Lấy file ảnh được chọn

  // Kiểm tra xem các trường bắt buộc có được nhập không
  if (!id || !name || !price || !quantity || !category) {
    alert("Vui lòng điền đầy đủ thông tin sản phẩm.");
    return;
  }
  // Kiểm tra xem ID đã tồn tại chưa, ngoại trừ ID của sản phẩm hiện tại đang sửa
  if (Id === -1 && products.some(p => p.id === String(id))) {
    alert("ID sản phẩm đã tồn tại! Vui lòng nhập ID khác.");
    return;
  }
  // Kiểm tra trùng ID khi sửa, bỏ qua sản phẩm hiện tại đang sửa
  if (Id >= 0 && products.some(p => p.id === String(id) && p.id !== String(Id))) {
    alert("ID sản phẩm đã tồn tại! Vui lòng nhập ID khác.");
    return;
  }

  if (file) {
    let reader = new FileReader();

    reader.onload = function (e) {
      let imageUrl = e.target.result;  // Đây là URL base64 của ảnh
      // Tạo đối tượng sản phẩm mới
      let newProduct = {
        id: id,
        name: name,
        price: price,
        description: description,
        quantity: quantity,
        category: category,
        img: imageUrl,  // URL ảnh được đọc từ FileReader
      };

      if (Id >= 0) {
        updateProduct(Id, newProduct);
      } else {
        addProduct(newProduct);
      }

      document.getElementById('addProductForm').reset();
      close_x_addproduct();
      Id = -1;
      displayProducts();
    };

    // Đọc file ảnh dưới dạng base64 (Data URL)
    reader.readAsDataURL(file);
  } else {
    // Nếu không có ảnh mới, giữ lại ảnh cũ hoặc không thay đổi
    let newProduct = {
      id: id,
      name: name,
      price: price,
      description: description,
      quantity: quantity,
      category: category,
      img: Id >= 0 ? products.find(p => p.id === String(Id)).img : '',  // Nếu sửa, giữ ảnh cũ, nếu thêm mới thì không có ảnh
    };

    if (Id >= 0) {
      updateProduct(Id, newProduct);  // Cập nhật sản phẩm
    } else {
      addProduct(newProduct);  // Thêm sản phẩm mới
    }

    // Reset form và đóng popup
    document.getElementById('addProductForm').reset();
    close_x_addproduct();
    Id = -1;
    displayProducts();
  }
});


//********** */
const log_out_admin = document.getElementById('log-out-admin');
// Thêm sự kiện click vào div để chuyển hướng
log_out_admin.addEventListener('click', function () {
  window.location.href = 'main.html'; // Chuyển đến main.html
});

let AD0 = JSON.parse(localStorage.getItem('ADMIN0')) || {};
const open_admin = document.getElementById('open-admin');
const add_product = document.getElementById('add-product');
const add_product0 = document.getElementById('add-products');
const dangxuat1 = document.getElementById('dangxuat');
const ql_user = document.getElementById('ql-user');
const ql_user0 = document.getElementById('ql-users');
const ql_hoadon = document.getElementById('ql-hoadon');
const ql_hoadon0 = document.getElementById('ql-hoadons');
const chucnang_admin = document.getElementById('chucnang-admin');

const tonghop = document.getElementById('tonghop');
const tonghop_sp_h2 = document.getElementById('tonghop-sp-h2');
const tonghop_user_h2 = document.getElementById('tonghop-user-h2');
const tonghop_hoadon_h2 = document.getElementById('tonghop-hoadon-h2');

const thongkee = document.getElementById('thongke');
const thongkee0 = document.getElementById('thongkes');

const overlay_admin = document.getElementById('overlay-admin');
const addproductform = document.getElementById('addProductForm');
const imgg = document.getElementById('imagePreview');

const add_usernew = document.getElementById('add-usernew');
const edit_user = document.getElementById('edit-user');


function tonghops() {
  tonghop.style.display = 'flex';
  add_product.style.display = 'none';
  add_product0.style.backgroundColor = '#ffffff';
  ql_user.style.display = 'none';
  ql_user0.style.backgroundColor = '#ffffff';
  ql_hoadon.style.display = 'none';
  ql_hoadon0.style.backgroundColor = '#ffffff';
  thongkee.style.display = 'none';
  thongkee0.style.backgroundColor = '#ffffff';
}

//Mở quản lí thêm sản phẩm
function add_products() {
  add_product.style.display = 'flex';
  add_product0.style.backgroundColor = '#a46363';
  tonghop.style.display = 'none';
  ql_user.style.display = 'none';
  ql_user0.style.backgroundColor = '#ffffff';
  ql_hoadon.style.display = 'none';
  ql_hoadon0.style.backgroundColor = '#ffffff';
  thongkee.style.display = 'none';
  thongkee0.style.backgroundColor = '#ffffff';
}

function ql_users() {
  ql_user.style.display = 'flex';
  ql_user0.style.backgroundColor = '#a46363';
  tonghop.style.display = 'none';
  ql_hoadon.style.display = 'none';
  ql_hoadon0.style.backgroundColor = '#ffffff';
  add_product.style.display = 'none';
  add_product0.style.backgroundColor = '#ffffff';
  thongkee.style.display = 'none';
  thongkee0.style.backgroundColor = '#ffffff';
}

function ql_hoadons() {
  ql_hoadon.style.display = 'block';
  ql_hoadon0.style.backgroundColor = '#a46363';
  tonghop.style.display = 'none';
  add_product.style.display = 'none';
  add_product0.style.backgroundColor = '#ffffff';
  ql_user.style.display = 'none';
  ql_user0.style.backgroundColor = '#ffffff';
  thongkee.style.display = 'none';
  thongkee0.style.backgroundColor = '#ffffff';
}
function thongkes() {
  thongkee.style.display = 'flex';
  thongkee0.style.backgroundColor = '#a46363';
  ql_hoadon.style.display = 'none';
  ql_hoadon0.style.backgroundColor = '#ffffff';
  tonghop.style.display = 'none';
  add_product.style.display = 'none';
  add_product0.style.backgroundColor = '#ffffff';
  ql_user.style.display = 'none';
  ql_user0.style.backgroundColor = '#ffffff';
}
function open_form_addproduct() {
  addproductform.style.display = 'flex';
  overlay_admin.style.display = 'block';
}
function close_x_addproduct() {
  document.getElementById('addProductForm').reset();
  let imagePreview = document.getElementById('imagePreview');
  imagePreview.src = '';  // Xóa ảnh
  addproductform.style.display = 'none';
  overlay_admin.style.display = 'none';
}

function open_form_add_usernew() {
  add_usernew.style.display = 'block';
  overlay_admin.style.display = 'block';
}
function close_x_addusernew() {
  document.getElementById('add-usernew').reset();
  add_usernew.style.display = 'none';
  overlay_admin.style.display = 'none';
}

function open_form_edit_user(id) {
  edit_user.style.display = 'block';
  overlay_admin.style.display = 'block';

  let user = users.find(u => u.id === String(id));
  document.getElementById('edit-username').value = user.username;
  document.getElementById('edit-tel').value = user.tel;  // Điền số điện thoại vào input với readonly
  document.getElementById('edit-password').value = user.password;
  document.getElementById('edit-status').checked = user.status;
}


function close_x_edituser() {
  document.getElementById('edit-user').reset();
  edit_user.style.display = 'none';
  overlay_admin.style.display = 'none';
}
function close_x_chitiet_hoadon() {
  let chitiet = document.getElementById('chitiet-container-hoadon');
  chitiet.style.display = 'none';
  overlay_admin.style.display = 'none';
}
function close_x_chitiet_thongke() {
  let chitiet_thongke0 = document.getElementById('chitiet-thongke0');
  chitiet_thongke0.style.display = 'none';
  overlay_admin.style.display = 'none';
}

document.getElementById('img').addEventListener('change', function (event) {
  let file = event.target.files[0];  // Lấy file ảnh được chọn
  let reader = new FileReader();

  reader.onload = function (e) {
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



// Hàm lọc sản phẩm theo category
function search_price() {
  let category = document.getElementById('category-search-price').value;  // Lấy giá trị category từ dropdown
  let productListA = document.getElementById('productListA');
  productListA.innerHTML = '';  // Làm sạch danh sách sản phẩm cũ
  let filteredProducts;

  // Nếu chọn "Trang chủ", hiển thị tất cả sản phẩm
  if (category === 'home') {
    filteredProducts = products;  // Lấy tất cả sản phẩm
  } else {
    // Nếu chọn một category khác, lọc theo category đó
    filteredProducts = products.filter(product => product.category.toLowerCase() === category.toLowerCase());
  }
  // Đặt lại trang hiện tại về 1 khi lọc
  currentPageADMIN = 1;
  // Cập nhật danh sách sản phẩm
  displayProducts(filteredProducts);
}

// Hàm tìm kiếm sản phẩm
function search_productAD() {
  let searchValue = document.getElementById('search-productAD').value.toLowerCase();  // Lấy giá trị tìm kiếm
  let filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchValue) ||
    product.description.toLowerCase().includes(searchValue)
  );
  currentPageADMIN = 1; // Đặt lại về trang 1 khi tìm kiếm
  displayProducts(filteredProducts);  // Hiển thị sản phẩm đã tìm kiếm
}


let currentPageADMIN = 1;  // Trang mặc định là trang 1
let itemsPerPageADMIN = 8;  // Số sản phẩm mỗi trang
// Hiển thị danh sách sản phẩm trong admin
function displayProducts(filteredProducts = products) {
  let productListA = document.getElementById('productListA');
  productListA.innerHTML = '';  // Làm sạch danh sách sản phẩm cũ
  let paginationA = document.getElementById('paginationA');
  paginationA.innerHTML = '';  // Làm sạch phần phân trang cũ

  if (filteredProducts.length === 0) {
    productListA.innerHTML = 'Không có sản phẩm!';
  } else {
    let totalPages = Math.ceil(filteredProducts.length / itemsPerPageADMIN);  // Tính số trang
    let start = (currentPageADMIN - 1) * itemsPerPageADMIN;
    let end = start + itemsPerPageADMIN;
    let productsToShow = filteredProducts.slice(start, end);  // Lấy sản phẩm cho trang hiện tại

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
        <div class="product-item-button">
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
        pageButton.onclick = () => changePageA(i, filteredProducts);  // Khi nhấn vào, thay đổi trang
        paginationA.appendChild(pageButton);
      }
    }
  }
  let a = products.length;
  tonghop_sp_h2.innerHTML = `${a}`;  // Cập nhật số lượng sản phẩm
}

// Hàm thay đổi trang
function changePageA(page, filteredProducts) {
  currentPageADMIN = page;  // Cập nhật trang hiện tại
  displayProducts(filteredProducts);   // Hiển thị lại sản phẩm cho trang hiện tại
}
// Hàm sắp xếp sản phẩm theo ID (hoặc tên, giá,... tùy theo yêu cầu)
function sortProducts() {
  products.sort((a, b) => a.id - b.id);  // Sắp xếp theo ID tăng dần (hoặc thay bằng a.name.localeCompare(b.name) nếu cần sắp xếp theo tên)
}

// Thêm sản phẩm vào localStorage
function addProduct(newProduct) {
  products.push(newProduct);
  sortProducts();  // Sắp xếp lại sản phẩm sau khi thêm
  localStorage.setItem('products', JSON.stringify(products));
  displayProducts();  // Hiển thị lại danh sách sản phẩm
  them_thanhcongAD();
}

// Cập nhật sản phẩm trong localStorage
function updateProduct(Id, updatedProduct) {
  let index = products.findIndex(u => u.id == String(Id));
  if (index !== -1) {
    products[index] = updatedProduct;
    sortProducts();  // Sắp xếp lại sản phẩm sau khi sửa
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();  // Hiển thị lại danh sách sản phẩm
    them_thanhcongAD();
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
      them_thanhcongAD();
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
  displayProducts();
  displayUsers();
  capnhat_hoadon_admin();
  capnhat_thongke_admin();
});

//***********TÀI KHOẢN NGƯỜI DÙNG******* */


// Hàm tìm kiếm người dùng
function search_user() {
  let searchValue = document.getElementById('search-user').value.toLowerCase();  // Lấy giá trị tìm kiếm
  let filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchValue) ||
    user.tel.includes(searchValue)
  );
  displayUsers(filteredUsers);
}
// Hàm lọc theo trạng thái
function filterByStatus() {
  let status = document.getElementById('statusFilter').value;
  let filteredUsers;

  if (status === "all") {
    filteredUsers = users; // Hiển thị tất cả người dùng
  } else {
    let isOpen = (status === "true");
    filteredUsers = users.filter(user => user.status === isOpen); // Lọc theo trạng thái
  }

  displayUsers(filteredUsers);
}

// Hàm lọc theo ngày
function loc_date_user() {
  // Lấy giá trị ngày bắt đầu và ngày kết thúc từ các input
  let startDate = new Date(document.getElementById('startDate_user').value);
  let endDate = new Date(document.getElementById('endDate_user').value);
  // Kiểm tra xem ngày bắt đầu và ngày kết thúc có hợp lệ không
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    alert("Vui lòng chọn ngày hợp lệ.");
    return;
  }

  // Chuyển ngày bắt đầu và kết thúc thành chỉ ngày (loại bỏ giờ)
  startDate.setHours(0, 0, 0, 0); // Set giờ của ngày bắt đầu là 00:00:00
  endDate.setHours(23, 59, 59, 999); // Set giờ của ngày kết thúc là 23:59:59

  // Lọc người dùng theo ngày tạo
  let filteredUsers = users.filter(user => {
    // Chuyển ngày tạo người dùng thành Date object
    let userDate = new Date(user.ngaytao);

    // Nếu ngày tạo không hợp lệ, bỏ qua người dùng này
    if (isNaN(userDate.getTime())) {
      return false;
    }
    // Loại bỏ giờ khỏi ngày tạo của người dùng
    userDate.setHours(0, 0, 0, 0);

    // Kiểm tra ngày tạo có nằm trong khoảng từ startDate đến endDate
    return userDate >= startDate && userDate <= endDate;
  });

  // Hiển thị danh sách người dùng đã lọc
  displayUsers(filteredUsers);
  // Reset các trường ngày
  document.getElementById('startDate_user').value = ''; // Xóa giá trị ngày bắt đầu
  document.getElementById('endDate_user').value = ''; // Xóa giá trị ngày kết thúc
}




function displayUsers(filteredUsers = users) {
  let ql_user_list = document.getElementById('ql-user-list');
  ql_user_list.innerHTML = ''; // Clear the table before displaying users
  let a = 0;

  // Create a new header row for the table
  let headerRow = document.createElement('tr');
  headerRow.classList.add('tr-user');
  headerRow.innerHTML = `
    <th>SDT</th>
    <th>Tên</th>
    <th>Mật khẩu</th>
    <th>Ngày tạo</th>
    <th>Trạng thái</th>
    <th>Thao tác</th>
  `;
  ql_user_list.appendChild(headerRow); // Append header row to table

  filteredUsers.forEach((user) => {
    let ADMIN0 = JSON.parse(localStorage.getItem('ADMIN0')) || [];
    if (user.tel === String(ADMIN0.tel)) {
      a++;
      return;
    }
    // Kiểm tra và chuyển đổi ngày tạo
    let createdAtFormatted = 'N/A';  // Default in case of invalid date
    if (user.ngaytao) {
      let dateObj = new Date(user.ngaytao);
      // Kiểm tra xem đối tượng Date có hợp lệ hay không
      if (!isNaN(dateObj.getTime())) {
        createdAtFormatted = dateObj.toLocaleDateString('vi-VN'); // Convert to human-readable format
      } else {
        createdAtFormatted = 'Ngày không hợp lệ';  // Show an error message if the date is invalid
      }
    }
    // Create a new row for each user
    let userRow = document.createElement('tr');
    userRow.classList.add('tr-user1');
    userRow.innerHTML = `
      <td>${user.tel}</td>
      <td>${user.username}</td>
      <td>${user.password}</td>
      <td>${createdAtFormatted}</td>
      <td>${user.status ? "OPEN" : "OFF"}</td>
      <td>
        <button onclick="open_form_edit_user('${user.id}')">Sửa</button>
        <button onclick="deleteUser('${user.id}')">Xóa</button>
      </td>
    `;
    ql_user_list.appendChild(userRow); // Append the new row to the table
    a++;
  });

  if (a === 0) {
    // If no users exist, show a message
    let noUsersRow = document.createElement('tr');
    noUsersRow.innerHTML = '<td colspan="6">Không có tài khoản!</td>';// ô này chiếm 6 cột
    ql_user_list.appendChild(noUsersRow);
  }

  // Update the total user count
  tonghop_user_h2.innerHTML = `${users.length}`;
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
}

function deleteUser(userId) {
  let userIndex = users.findIndex(u => u.id === String(userId)); // Đảm bảo id là chuỗi
  if (userIndex !== -1) {
    if (confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      users.splice(userIndex, 1); // Xóa người dùng khỏi mảng
      localStorage.setItem('users', JSON.stringify(users)); // Cập nhật lại localStorage
      alert("Người dùng đã bị xóa!");
      displayUsers(); // Cập nhật danh sách người dùng
    }
  }
}


document.getElementById('add-usernew').addEventListener('submit', function (event) {
  event.preventDefault(); // Ngừng form reload lại trang

  // Lấy giá trị các trường nhập liệu
  let username = document.getElementById('add-username').value;
  let tel = document.getElementById('add-tel').value.trim();
  let password = document.getElementById('add-password').value;

  let ktra_form = true; // Biến để kiểm tra tính hợp lệ của form

  // Kiểm tra tên người dùng
  if (!username) {
    document.getElementById('add-error-username').textContent = "Họ và tên không được để trống.";
    ktra_form = false;
  } else {
    document.getElementById('add-error-username').textContent = "";
  }

  // Kiểm tra số điện thoại
  if (!tel) {
    document.getElementById('add-error-tel').textContent = "Số điện thoại không được để trống.";
    ktra_form = false;
  } else {
    if (!ktra_telAD(tel)) {
      document.getElementById('add-error-tel').textContent = "Số điện thoại không hợp lệ.";
      ktra_form = false;
    } else {
      document.getElementById('add-error-tel').textContent = "";
    }
  }

  // Kiểm tra mật khẩu
  if (!password) {
    document.getElementById('add-error-password').textContent = "Mật khẩu không được để trống.";
    ktra_form = false;
  } else if (password.length < 6) {
    document.getElementById('add-error-password').textContent = "Mật khẩu phải có ít nhất 6 ký tự.";
    ktra_form = false;
  } else {
    document.getElementById('add-error-password').textContent = "";
  }

  // Nếu form hợp lệ, tiếp tục xử lý đăng ký
  if (ktra_form) {
    // Tạo đối tượng người dùng mới
    let newUser = {
      id: tel,
      cart: [],
      username: username,
      tel: tel,
      password: password,
      email: [],
      address: [],
      status: true,
      hoadon: [],
      ngaytao: new Date().toISOString()  // Lưu ngày tạo theo định dạng ISO
    };

    registerUserAD(newUser);
    // Đóng form và reset
    document.getElementById('add-usernew').reset();
    close_x_addusernew();
    displayUsers();
  }
});
// Hàm đăng ký tài khoản mới với số điện thoại làm ID
function registerUserAD(newUser) {
  let ktra_user0 = users.some(user => user.tel === newUser.tel);
  if (ktra_user0) {
    alert('Số điện thoại đã tồn tại !');
    return;
  }
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  alert('Đã thêm thành công');
}
function ktra_telAD(tel) {
  let regex = /^0\d{9}$/;
  return regex.test(tel);
}





// Hàm chỉnh sửa thông tin người dùng
document.getElementById('edit-user').addEventListener('submit', function (event) {
  event.preventDefault(); // Ngừng form reload lại trang
  // Lấy giá trị các trường nhập liệu

  let username = document.getElementById('edit-username').value;
  let tel = document.getElementById('edit-tel').value.trim();
  let password = document.getElementById('edit-password').value;
  let status = document.getElementById('edit-status').checked; // Lấy giá trị trạng thái Khóa/Mở
  let ktra_form = true; // Biến kiểm tra tính hợp lệ của form

  // Kiểm tra tên người dùng
  if (!username) {
    document.getElementById('edit-error-username').textContent = "Họ và tên không được để trống.";
    ktra_form = false;
  } else {
    document.getElementById('edit-error-username').textContent = "";
  }

  // Kiểm tra số điện thoại
  if (!tel) {
    document.getElementById('edit-error-tel').textContent = "Số điện thoại không được để trống.";
    ktra_form = false;
  } else {
    if (!ktra_telAD(tel)) {
      document.getElementById('edit-error-tel').textContent = "Số điện thoại không hợp lệ.";
      ktra_form = false;
    } else {
      document.getElementById('edit-error-tel').textContent = "";
    }
  }

  // Kiểm tra mật khẩu
  if (!password) {
    document.getElementById('edit-error-password').textContent = "Mật khẩu không được để trống.";
    ktra_form = false;
  } else if (password.length < 6) {
    document.getElementById('edit-error-password').textContent = "Mật khẩu phải có ít nhất 6 ký tự.";
    ktra_form = false;
  } else {
    document.getElementById('edit-error-password').textContent = "";
  }

  // Nếu form hợp lệ, tiếp tục cập nhật thông tin
  if (ktra_form) {
    // Tìm người dùng cần sửa
    let userIndex = users.findIndex(user => user.tel === String(tel));

    if (userIndex !== -1) {
      // Cập nhật thông tin người dùng
      users[userIndex].username = username;
      users[userIndex].password = password;
      users[userIndex].status = status;

      // Lưu lại danh sách người dùng vào localStorage
      localStorage.setItem('users', JSON.stringify(users));

      // Đóng form và reset
      document.getElementById('edit-user').reset();
      displayUsers();
      close_x_edituser(); // Đóng form chỉnh sửa
    } else {
      alert('Không tìm thấy người dùng với số điện thoại này.');
    }
  }
});








function capnhat_hoadon_admin() {
  let users = JSON.parse(localStorage.getItem('users')) || [];

  let ql_hoadon_list = document.getElementById('ql-hoadon-list');
  ql_hoadon_list.innerHTML = ''; // Xóa nội dung hiện tại
  let a = 0;

  // Create a new header row for the table
  let headerRow = document.createElement('tr');
  headerRow.classList.add('tr-hoadon');
  headerRow.innerHTML = `
      <th>Mã hóa đơn</th>
      <th>Khách hàng</th>
      <th>Ngày đặt</th>
      <th>Tổng tiền</th>
      <th>Trạng thái</th>
      <th>Thao tác</th>
    `;
  ql_hoadon_list.appendChild(headerRow); // Append header row to table

  // Tạo mảng chứa tất cả các hóa đơn của tất cả người dùng
  let allOrders = [];

  users.forEach(user => {
    if (user.hoadon.length > 0) {
      // Thêm tất cả các hóa đơn của người dùng vào mảng `allOrders`
      user.hoadon.forEach(order => {
        allOrders.push({ order, userTel: user.tel });
      });
    }
  });

  // Sắp xếp mảng hóa đơn theo `orderId` (thời gian)
  allOrders.sort((a, b) => b.order.orderId - a.order.orderId); // Sắp xếp giảm dần theo thời gian (orderId)

  // Lặp qua mảng allOrders và hiển thị các hóa đơn
  allOrders.forEach(item => {
    let order = item.order;
    let userTel = item.userTel; // Dùng `userTel` đã lưu trong `allOrders`

    let tr1 = document.createElement('tr');
    let orderDate = new Date(order.orderId); // Dùng `orderId` làm dấu thời gian
    let formattedDate = orderDate.toLocaleString(); // Định dạng ngày giờ
    tr1.classList.add('tr-hoadon1');
    tr1.innerHTML = `
      <td>${order.orderId}</td>
      <td>${userTel}</td>
      <td>${formattedDate}</td>
      <td>${Number(order.totalpay_all).toLocaleString()} VND</td>
     <td style="color: ${order.status === 'Đang chờ' ? 'red' : (order.status === 'Đã xác nhận' ? 'green' : 'black')}">${String(order.status)}</td>
      <td><button class="button-chitiet-hoadon" onclick="chitiet_hoadon(${userTel},${order.orderId})">Xem</button></td>
    `;
    ql_hoadon_list.appendChild(tr1); // Thêm hóa đơn vào danh sách
    a++;
  });

  // Cập nhật tổng số hóa đơn
  tonghop_hoadon_h2.innerHTML = `${a}`;
}

// Hàm tìm kiếm hóa đơn
function search_hoadon() {
  // Lấy giá trị tìm kiếm từ input
  let searchValue = document.getElementById('search-hoadon').value.toLowerCase();

  // Tạo mảng chứa tất cả các hóa đơn từ tất cả người dùng
  let allOrders = [];
  users.forEach(user => {
    if (user.hoadon && user.hoadon.length > 0) {
      user.hoadon.forEach(order => {
        allOrders.push({ order, userTel: user.tel, userName: user.username });
      });
    }
  });

  // Lọc các hóa đơn theo từ khóa tìm kiếm
  let filteredOrders = allOrders.filter(item =>
    String(item.order.orderId).toLowerCase().includes(searchValue) ||  // Tìm kiếm theo mã hóa đơn
    String(item.userTel).includes(searchValue)  // Tìm kiếm theo số điện thoại
  );

  // Hiển thị các hóa đơn đã lọc
  displayOrders(filteredOrders);
}

// Hàm hiển thị hóa đơn
function displayOrders(filteredOrders) {
  let ql_hoadon_list = document.getElementById('ql-hoadon-list');
  ql_hoadon_list.innerHTML = ''; // Xóa bảng trước khi hiển thị lại các hóa đơn
  let a = 0;

  // Tạo dòng header cho bảng
  let headerRow = document.createElement('tr');
  headerRow.classList.add('tr-hoadon');
  headerRow.innerHTML = `
    <th>Mã hóa đơn</th>
    <th>Khách hàng</th>
    <th>Ngày đặt</th>
    <th>Tổng tiền</th>
    <th>Trạng thái</th>
    <th>Thao tác</th>
  `;
  ql_hoadon_list.appendChild(headerRow); // Thêm header vào bảng

  // Lặp qua các hóa đơn đã lọc và hiển thị
  filteredOrders.forEach(item => {
    let order = item.order;
    let userTel = item.userTel;
    let userName = item.userName;

    let tr1 = document.createElement('tr');
    let orderDate = new Date(order.orderId); // Lấy ngày từ `order.orderId`
    let formattedDate = orderDate.toLocaleString(); // Định dạng ngày giờ

    tr1.classList.add('tr-hoadon1');
    tr1.innerHTML = `
      <td>${order.orderId}</td>
      <td>${userTel}</td>
      <td>${formattedDate}</td>
      <td>${Number(order.totalpay_all).toLocaleString()} VND</td>
      <td style="color: ${order.status === 'Đang chờ' ? 'red' : (order.status === 'Đã xác nhận' ? 'green' : 'black')}">${String(order.status)}</td>
      <td><button class="button-chitiet-hoadon" onclick="chitiet_hoadon(${userTel},${order.orderId})">Xem</button></td>
    `;
    ql_hoadon_list.appendChild(tr1); // Thêm hóa đơn vào bảng
    a++;
  });

  // Nếu không có hóa đơn nào, hiển thị thông báo
  if (a === 0) {
    let noOrdersRow = document.createElement('tr');
    noOrdersRow.innerHTML = '<td colspan="6">Không có hóa đơn!</td>';
    ql_hoadon_list.appendChild(noOrdersRow);
  }

  // Cập nhật tổng số hóa đơn
  tonghop_hoadon_h2.innerHTML = `${filteredOrders.length}`;
}




function chitiet_hoadon(tel, orderId) {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  let user1 = users.find(user => Number(user.tel) === Number(tel));

  let chitiet_container_hoadon = document.getElementById('chitiet-container-hoadon');
  let chitiet_hoadon = document.getElementById('chitiet-hoadon');
  chitiet_container_hoadon.style.display = 'block';
  chitiet_hoadon.innerHTML = ''; // Reset nội dung trước khi thêm chi tiết

  let order = user1.hoadon.find(o => o.orderId === orderId);



  let orderDate = new Date(order.orderId); // Dùng `orderId` làm dấu thời gian
  let formattedDate = orderDate.toLocaleString(); // Định dạng ngày giờ
  overlay_admin.style.display = 'block';
  let div = document.createElement('div');
  div.classList.add('div-chitiet-hoadon');
  div.innerHTML = `
    <div  class="div-chitiet-hoadon-1">
        <div class="khung-list-sp-hoadon">
        ${order.items.map(item => {
    return `
                            <div>
                                <img src="${item.img}" alt="${item.name}"> <p><strong>${item.name}</strong> - ${item.quantity} x ${item.price.toLocaleString()} VND</p>
                            </div>
                        `;
  }).join('')}
        </div>
    </div>
     <br>
     <div class="div-chitiet-hoadon-2">
            <h3>Hóa đơn ${order.orderId}</h3>
            <p><strong>Ngày tạo hóa đơn:</strong> ${formattedDate}</p> <!-- Thêm ngày giờ -->
            <p><strong>Tên người nhận:</strong> ${order.name}</p>
            <p><strong>Số điện thoại:</strong> ${order.phone}</p>
            <p><strong>Địa chỉ:</strong> ${order.address}</p>
            <p><strong>Ghi chú:</strong> ${order.note ? order.note : 'Không có'}</p>
            <p><strong>Trạng thái:</strong> ${String(order.status)}</p>
            <p><strong>Phí vận chuyển:</strong> ${order.totalphi.toLocaleString()} VND</p>
                        <p><strong>Tổng tiền:</strong> ${order.totalpay_all.toLocaleString()} VND</p>
           <button id="div-chitiet-hoadon-2-button" class="div-chitiet-hoadon-2-button" onclick="xuli_hoadon(${Number(user1.tel)},${order.orderId})">Xử lí</button>
     </div>

    `;
  chitiet_hoadon.appendChild(div); // Thêm thông tin chi tiết vào modal

  let a = document.getElementById('div-chitiet-hoadon-2-button');
  if (String(order.status) === 'Đã xác nhận') {
    a.innerHTML = 'Đã xử lí';
    a.style.backgroundColor = '#00ff00';
  }
}


function xuli_hoadon(tel, orderID) {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  let user2 = users.find(user => Number(user.tel) === Number(tel));

  // Tìm hóa đơn trong danh sách hóa đơn của người dùng
  let order = user2.hoadon.find(order => order.orderId === orderID);
  if (order.status === "Đang chờ") {
    order.status = "Đã xác nhận";  // Cập nhật trạng thái hóa đơn
    let userIndex = users.findIndex(u => u.tel === String(user.tel));
    if (userIndex !== -1) {
      let user1 = users[userIndex];
      localStorage.setItem('user', JSON.stringify(user1));
      localStorage.setItem('users', JSON.stringify(user));
    }
    localStorage.setItem('users', JSON.stringify(users));
    chitiet_hoadon(tel, orderID);  // Gọi lại hàm chitiet_hoadon để cập nhật giao diện
    let a = document.getElementById('div-chitiet-hoadon-2-button');
    a.innerHTML = 'Đã xử lí';
    a.style.backgroundColor = '#00ff00';
    capnhat_hoadon_admin();
  }
  else {
    return;
  }
  capnhat_hoadon_admin();
}


document.getElementById('loc_hoadon').addEventListener('change', function () {
  let selectedStatus = this.value;

  // Tùy thuộc vào giá trị đã chọn, gọi hàm lọc tương ứng
  if (selectedStatus === 'all') {
    capnhat_hoadon_admin();
  } else if (selectedStatus === 'hoadon_ed') {
    hoadon_daxacnhan(); // Hàm lọc cho 'Đã xác nhận' (bạn cần tạo hàm này)
  } else {
    hoadon_dangcho(); // Hàm lọc cho 'Tất cả' (bạn cần tạo hàm này)
  }
});

function hoadon_dangcho() {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  let ql_hoadon_list = document.getElementById('ql-hoadon-list');
  ql_hoadon_list.innerHTML = ''; // Xóa nội dung hiện tại
  let a = 0;

  // Create a new header row for the table
  let headerRow = document.createElement('tr');
  headerRow.classList.add('tr-hoadon');
  headerRow.innerHTML = `
      <th>Mã hóa đơn</th>
      <th>Khách hàng</th>
      <th>Ngày đặt</th>
      <th>Tổng tiền</th>
      <th>Trạng thái</th>
      <th>Thao tác</th>
    `;
  ql_hoadon_list.appendChild(headerRow); // Append header row to table

  // Tạo mảng chứa tất cả các hóa đơn của tất cả người dùng
  let allOrders = [];

  users.forEach(user => {
    if (user.hoadon.length > 0) {
      // Thêm tất cả các hóa đơn của người dùng vào mảng `allOrders`
      user.hoadon.forEach(order => {
        allOrders.push({ order, userTel: user.tel });
      });
    }
  });

  // Lọc các hóa đơn có trạng thái là 'Đang chờ'
  let pendingOrders = allOrders.filter(item => item.order.status === 'Đang chờ');

  // Sắp xếp mảng hóa đơn theo `orderId` (thời gian)
  pendingOrders.sort((a, b) => b.order.orderId - a.order.orderId); // Sắp xếp giảm dần theo thời gian (orderId)

  // Lặp qua mảng `pendingOrders` và hiển thị các hóa đơn đang chờ
  pendingOrders.forEach(item => {
    let order = item.order;
    let userTel = item.userTel; // Dùng `userTel` đã lưu trong `allOrders`

    let tr1 = document.createElement('tr');
    let orderDate = new Date(order.orderId); // Dùng `orderId` làm dấu thời gian
    let formattedDate = orderDate.toLocaleString(); // Định dạng ngày giờ
    tr1.classList.add('tr-hoadon1');
    tr1.innerHTML = `
      <td>${order.orderId}</td>
      <td>${userTel}</td>
      <td>${formattedDate}</td>
      <td>${Number(order.totalpay_all).toLocaleString()} VND</td>
      <td style="color: ${order.status === 'Đang chờ' ? 'red' : (order.status === 'Đã xác nhận' ? 'green' : 'black')}">${String(order.status)}</td>
      <td><button class="button-chitiet-hoadon" onclick="chitiet_hoadon(${userTel},${order.orderId})">Xem</button></td>
    `;
    ql_hoadon_list.appendChild(tr1); // Thêm hóa đơn vào danh sách
    a++;
  });

  // Cập nhật tổng số hóa đơn đang chờ
  tonghop_hoadon_h2.innerHTML = `${a}`;
}




function hoadon_daxacnhan() {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  let ql_hoadon_list = document.getElementById('ql-hoadon-list');
  ql_hoadon_list.innerHTML = ''; // Xóa nội dung hiện tại
  let a = 0;

  // Create a new header row for the table
  let headerRow = document.createElement('tr');
  headerRow.classList.add('tr-hoadon');
  headerRow.innerHTML = `
      <th>Mã hóa đơn</th>
      <th>Khách hàng</th>
      <th>Ngày đặt</th>
      <th>Tổng tiền</th>
      <th>Trạng thái</th>
      <th>Thao tác</th>
    `;
  ql_hoadon_list.appendChild(headerRow); // Append header row to table

  // Tạo mảng chứa tất cả các hóa đơn của tất cả người dùng
  let allOrders = [];

  users.forEach(user => {
    if (user.hoadon.length > 0) {
      // Thêm tất cả các hóa đơn của người dùng vào mảng `allOrders`
      user.hoadon.forEach(order => {
        allOrders.push({ order, userTel: user.tel });
      });
    }
  });

  // Lọc các hóa đơn có trạng thái là 'Đang chờ'
  let pendingOrders = allOrders.filter(item => item.order.status === 'Đã xác nhận');

  // Sắp xếp mảng hóa đơn theo `orderId` (thời gian)
  pendingOrders.sort((a, b) => b.order.orderId - a.order.orderId); // Sắp xếp giảm dần theo thời gian (orderId)

  // Lặp qua mảng `pendingOrders` và hiển thị các hóa đơn đang chờ
  pendingOrders.forEach(item => {
    let order = item.order;
    let userTel = item.userTel; // Dùng `userTel` đã lưu trong `allOrders`

    let tr1 = document.createElement('tr');
    let orderDate = new Date(order.orderId); // Dùng `orderId` làm dấu thời gian
    let formattedDate = orderDate.toLocaleString(); // Định dạng ngày giờ
    tr1.classList.add('tr-hoadon1');
    tr1.innerHTML = `
      <td>${order.orderId}</td>
      <td>${userTel}</td>
      <td>${formattedDate}</td>
      <td>${Number(order.totalpay_all).toLocaleString()} VND</td>
      <td style="color: ${order.status === 'Đang chờ' ? 'red' : (order.status === 'Đã xác nhận' ? 'green' : 'black')}">${String(order.status)}</td>
      <td><button class="button-chitiet-hoadon" onclick="chitiet_hoadon(${userTel},${order.orderId})">Xem</button></td>
    `;
    ql_hoadon_list.appendChild(tr1); // Thêm hóa đơn vào danh sách
    a++;
  });

  // Cập nhật tổng số hóa đơn đang chờ
  tonghop_hoadon_h2.innerHTML = `${a}`;
}







function loc_date_hoadon() {
  let startDate = document.getElementById('startDate_hoadon').value;
  let endDate = document.getElementById('endDate_hoadon').value;

  // Kiểm tra xem người dùng có chọn ngày bắt đầu và kết thúc không
  if (!startDate || !endDate) {
    alert("Vui lòng chọn cả ngày bắt đầu và ngày kết thúc.");
    return;
  }

  // Chuyển đổi các giá trị ngày thành đối tượng Date
  let start = new Date(startDate);
  let end = new Date(endDate);

  if (start > end) {
    alert("Ngày bắt đầu không thể lớn hơn ngày kết thúc.");
    return;
  }

  let users = JSON.parse(localStorage.getItem('users')) || [];
  let ql_hoadon_list = document.getElementById('ql-hoadon-list');
  ql_hoadon_list.innerHTML = ''; // Xóa nội dung hiện tại
  let a = 0;

  // Create a new header row for the table
  let headerRow = document.createElement('tr');
  headerRow.classList.add('tr-hoadon');
  headerRow.innerHTML = `
      <th>Mã hóa đơn</th>
      <th>Khách hàng</th>
      <th>Ngày đặt</th>
      <th>Tổng tiền</th>
      <th>Trạng thái</th>
      <th>Thao tác</th>
    `;
  ql_hoadon_list.appendChild(headerRow); // Append header row to table

  // Tạo mảng chứa tất cả các hóa đơn của tất cả người dùng
  let allOrders = [];

  users.forEach(user => {
    if (user.hoadon.length > 0) {
      // Thêm tất cả các hóa đơn của người dùng vào mảng `allOrders`
      user.hoadon.forEach(order => {
        allOrders.push({ order, userTel: user.tel });
      });
    }
  });

  // Lọc các hóa đơn theo ngày
  let filteredOrders = allOrders.filter(item => {
    let orderDate = new Date(item.order.orderId); // Dùng `orderId` làm dấu thời gian
    return orderDate >= start && orderDate <= end; // Kiểm tra xem ngày hóa đơn có trong khoảng không
  });

  // Nếu không có hóa đơn nào sau khi lọc, hiển thị thông báo
  if (filteredOrders.length === 0) {
    let noOrdersRow = document.createElement('tr');
    noOrdersRow.innerHTML = '<td colspan="6" style="text-align: center; color: red;">Không có hóa đơn trong khoảng thời gian này</td>';
    ql_hoadon_list.appendChild(noOrdersRow);
  } else {
    // Sắp xếp mảng hóa đơn theo `orderId` (thời gian)
    filteredOrders.sort((a, b) => b.order.orderId - a.order.orderId); // Sắp xếp giảm dần theo thời gian (orderId)

    // Lặp qua mảng `filteredOrders` và hiển thị các hóa đơn lọc được
    filteredOrders.forEach(item => {
      let order = item.order;
      let userTel = item.userTel; // Dùng `userTel` đã lưu trong `allOrders`

      let tr1 = document.createElement('tr');
      let orderDate = new Date(order.orderId); // Dùng `orderId` làm dấu thời gian
      let formattedDate = orderDate.toLocaleString(); // Định dạng ngày giờ
      tr1.classList.add('tr-hoadon1');
      tr1.innerHTML = `
        <td>${order.orderId}</td>
        <td>${userTel}</td>
        <td>${formattedDate}</td>
        <td>${Number(order.totalpay_all).toLocaleString()} VND</td>
        <td style="color: ${order.status === 'Đang chờ' ? 'red' : (order.status === 'Đã xác nhận' ? 'green' : 'black')}">${String(order.status)}</td>
        <td><button class="button-chitiet-hoadon" onclick="chitiet_hoadon(${userTel},${order.orderId})">Xem</button></td>
      `;
      ql_hoadon_list.appendChild(tr1); // Thêm hóa đơn vào danh sách
      a++;
    });
  }

  // Cập nhật tổng số hóa đơn sau khi lọc
  tonghop_hoadon_h2.innerHTML = `${a}`;
  document.getElementById('startDate_hoadon').value = '';
  document.getElementById('endDate_hoadon').value = '';
}








function capnhat_thongke_admin() {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  let ql_thongke_list = document.getElementById('ql-thongke-list');
  ql_thongke_list.innerHTML = ''; // Xóa nội dung hiện tại

  // Create a new header row for the table
  let headerRow = document.createElement('tr');
  headerRow.classList.add('tr-thongke');
  headerRow.innerHTML = `
      <th>Tên món</th>
      <th>Số lượng bán ra</th>
      <th>Doanh thu</th>
      <th>Thao tác</th>
    `;
  ql_thongke_list.appendChild(headerRow); // Append header row to table

  // Tạo một mảng để lưu trữ thống kê các món ăn
  let productStats = [];

  // Lặp qua tất cả người dùng và các hóa đơn của họ
  users.forEach(user => {
    if (user.hoadon.length > 0) {
      user.hoadon.forEach(order => {
        order.items.forEach(item => {
          // Kiểm tra nếu món ăn đã có trong mảng productStats
          let existingProduct = productStats.find(p => p.name === item.name);
          if (existingProduct) {
            // Nếu đã có, cộng số lượng và doanh thu
            existingProduct.quantity += item.quantity;
            existingProduct.revenue += item.quantity * item.price;
          } else {
            // Nếu chưa có, thêm mới vào mảng
            productStats.push({
              img: item.img,
              name: item.name,
              quantity: item.quantity,
              revenue: item.quantity * item.price
            });
          }
        });
      });
    }
  });
  let B = 0;
  let C = 0;
  let D = 0;
  // Lặp qua mảng productStats để hiển thị thống kê các món ăn
  productStats.forEach(product => {
    B++;
    let tr1 = document.createElement('tr');
    tr1.classList.add('tr-thongke1');
    tr1.innerHTML = `
            <td>
        <img src="${product.img}" alt="${product.name}" style="width: 50px; height: 50px; margin-right: 10px;"> 
        ${product.name}
      </td>
      <td>${product.quantity}</td>
      <td>${product.revenue.toLocaleString()} VND</td>
      <td><button class="button-chitiet-thongke" onclick="showOrderDetails('${product.name}')">Xem</button></td>
    `;
    ql_thongke_list.appendChild(tr1); // Thêm dòng thống kê món ăn vào bảng
    C += product.revenue;
    D += product.quantity;
  });
  let total_sp_banra = document.getElementById('total-sp-banra');
  total_sp_banra.innerHTML = `[  ${B}  ]`;
  let total_soluong_banra = document.getElementById('total-soluong-banra');
  total_soluong_banra.innerHTML = `[  ${D} ]`;
  let thongke_doanhthu = document.getElementById('thongke-doanhthu');
  thongke_doanhthu.innerHTML = `${C.toLocaleString()} VND`;
  let tonghop_doanhthu_h2 = document.getElementById('tonghop-doanhthu-h2');
  tonghop_doanhthu_h2.innerHTML = `${C.toLocaleString()} VND`;
}



function showOrderDetails(productName) {
  let chitiet_thongke0 = document.getElementById('chitiet-thongke0');
  chitiet_thongke0.style.display = 'block';
  overlay_admin.style.display = 'block';

  let users = JSON.parse(localStorage.getItem('users')) || [];
  let productDetails = [];

  // Lặp qua tất cả người dùng và các hóa đơn của họ để tìm sản phẩm
  users.forEach(user => {
    user.hoadon.forEach(order => {
      order.items.forEach(item => {
        if (item.name === productName) {
          // Lấy orderId làm ngày
          let orderDate = new Date(order.orderId); // Chuyển đổi orderId thành đối tượng Date
          productDetails.push({
            user: user.username,
            orderId: order.orderId,
            date: orderDate.toLocaleString(), // Định dạng ngày giờ của orderId
            quantity: item.quantity,
            price: item.price,
            total: item.quantity * item.price
          });
        }
      });
    });
  });

  // Hiển thị thông tin trong bảng
  let xem_chitiet = document.getElementById('xem-chitiet');
  xem_chitiet.innerHTML = ''; // Xóa nội dung cũ

  if (productDetails.length > 0) {
    let table = document.createElement('table');
    table.classList.add('table-chitiet-thongke');
    table.innerHTML = `
      <thead>
        <tr>
          <th>Tên</th>
          <th>Mã hóa đơn</th>
          <th>Ngày mua</th>
          <th>Số lượng</th>
          <th>Giá</th>
          <th>Tổng tiền</th>
        </tr>
      </thead>
      <tbody>
        ${productDetails.map(detail => `
          <tr>
            <td>${detail.user}</td>
            <td>${detail.orderId}</td>
            <td>${detail.date}</td>
            <td>${detail.quantity}</td>
            <td>${detail.price.toLocaleString()} VND</td>
            <td>${detail.total.toLocaleString()} VND</td>
          </tr>
        `).join('')}
      </tbody>
    `;
    xem_chitiet.appendChild(table);
  } else {
    detailsContainer.innerHTML = 'Không tìm thấy thông tin cho sản phẩm này.';
  }
}
