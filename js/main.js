//************MAIN****************
document.getElementById('ql-admin').addEventListener('click', function () {
  // Thực hiện điều hướng tới URL bạn muốn
  window.location.href = 'admin.html';
});



function chua_dangnhap() {
  var chua_dangnhap = document.getElementById('chua-dangnhap');
  // Hiển thị div
  chua_dangnhap.style.display = 'block';
  chua_dangnhap.style.opacity = 1; // Đảm bảo nó không mờ (nếu bạn có dùng opacity)
  chua_dangnhap.style.top = '0';
  // Sau 2 giây, ẩn lại div
  setTimeout(function () {
    chua_dangnhap.style.display = 'none';
  }, 1500); // giây
}
function da_dangnhap() {
  var da_dangnhap = document.getElementById('da-dangnhap');
  da_dangnhap.style.display = 'block';
  da_dangnhap.style.opacity = 1;
  da_dangnhap.style.top = '0';
  setTimeout(function () {
    da_dangnhap.style.display = 'none';
  }, 1500); // giây
}
function da_dangki() {
  var da_dangki = document.getElementById('da-dangki');
  da_dangki.style.display = 'block';
  da_dangki.style.opacity = 1;
  da_dangki.style.top = '0';
  setTimeout(function () {
    da_dangki.style.display = 'none';
  }, 1500); // giây
}
function them_thanhcong() {
  var them_thanhcong = document.getElementById('them-sp');
  them_thanhcong.style.display = 'block';
  them_thanhcong.style.opacity = 1;
  them_thanhcong.style.top = '0';
  setTimeout(function () {
    them_thanhcong.style.display = 'none';
  }, 1000); // giây
}

//LƯU TÀI KHOẢN NGƯỜI DÙNG LÊN LOCALSTORAGE
// Khi người dùng nhấn đăng ký
document.getElementById('account-sign-up').addEventListener('submit', function (event) {
  event.preventDefault(); // Ngừng form reload lại trang
  // Lấy giá trị các trường nhập liệu
  let username = document.getElementById('sign-up-username').value;
  let tel = document.getElementById('sign-up-tel').value.trim();
  let password = document.getElementById('sign-up-password').value;
  let password1 = document.getElementById('sign-up-password1').value;
  let checkbox = document.getElementById('sign-up-checkbox');
  let ktra_form = true; // Biến để kiểm tra tính hợp lệ của form
  // Kiểm tra tên
  if (!username) {
    document.getElementById('sign-up-error-username').textContent = "Tên đăng nhập không được để trống.";
    ktra_form = false;
  } else {
    document.getElementById('sign-up-error-username').textContent = "";
  }
  // Kiểm tra số điện thoại
  if (!tel) {
    document.getElementById('sign-up-error-tel').textContent = "Số điện thoại không được để trống.";
    ktra_form = false;
  } else if (!ktra_tel(tel)) {
    document.getElementById('sign-up-error-tel').textContent = "Số điện thoại không hợp lệ.";
    ktra_form = false;
  } else {
    document.getElementById('sign-up-error-tel').textContent = "";
  }
  // Kiểm tra mật khẩu
  if (!password) {
    document.getElementById('sign-up-error-password').textContent = "Mật khẩu không được để trống.";
    ktra_form = false;
  } else if (password.length < 6) {
    document.getElementById('sign-up-error-password').textContent = "Mật khẩu phải có ít nhất 6 ký tự.";
    ktra_form = false;
  } else {
    document.getElementById('sign-up-error-password').textContent = "";
  }
  // Kiểm tra xác nhận mật khẩu
  if (!password1) {
    document.getElementById('sign-up-error-password1').textContent = "Vui lòng xác nhận mật khẩu.";
    ktra_form = false;
  } else if (password !== password1) {
    document.getElementById('sign-up-error-password1').textContent = "Mật khẩu xác nhận không khớp.";
    ktra_form = false;
  } else {
    document.getElementById('sign-up-error-password1').textContent = "";
  }
  // Kiểm tra checkbox
  if (!checkbox.checked) {
    document.getElementById('sign-up-error-checkbox').textContent = "Bạn cần đồng ý điều khoản.";
    ktra_form = false;
  } else {
    document.getElementById('sign-up-error-checkbox').textContent = "";
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
      locked: false,
      hoadon: []
    };
    registerUser(newUser);
    document.getElementById('account-sign-up').reset();
    close_x_overlay();
  }
});

// Hàm đăng ký tài khoản mới với số điện thoại làm ID
function registerUser(newUser) {
  let ktra_user0 = users.some(user => user.tel === newUser.tel);
  if (ktra_user0) {
    alert('Số điện thoại đã được đăng ký!');
    return;
  }
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  da_dangki();
}

function ktra_tel(tel) {
  let regex = /^0\d{9}$/;
  return regex.test(tel);
}

// Lấy thông tin từ localStorage và kiểm tra đăng nhập
document.getElementById('account-log-in').addEventListener('submit', function (event) {
  event.preventDefault(); // Ngừng form reload lại trang
  let log_in_tel = document.getElementById('log-in-tel').value.trim();
  let log_in_password = document.getElementById('log-in-password').value;
  let checkbox = document.getElementById('log-in-checkbox');
  // Kiểm tra nếu checkbox chưa được chọn
  if (!checkbox.checked) {
    document.getElementById('log-in-error-checkbox').textContent = "Bạn cần đồng ý với điều khoản.";
    return;
  } else {
    document.getElementById('log-in-error-checkbox').textContent = "";
  }
  let user = users.find(user => user.tel === log_in_tel);
  if (user) {
    if (user.password === log_in_password) {
      // Nếu đăng nhập thành công
      localStorage.setItem('user', JSON.stringify(user));
      let cart = user.cart || [];
      capNhatGioHang(cart);
      let new_tk = document.getElementById('new-tk');
      new_tk.style.display = 'none';
      let name_tk = document.getElementById('name-tk');
      name_tk.innerHTML = `${user.username}`;
      name_tk.style.display = 'block';
      let icon_tk = document.getElementById('icon-tk');
      icon_tk.addEventListener('click', open_tk);
      close_x_overlay();
      ship();
      open_product('home');
      capnhat_hoadon();
      da_dangnhap();
    } else {
      document.getElementById('log-in-error-tel').textContent = 'Số điện thoại hoặc mật khẩu không đúng.';
    }
  } else {
    document.getElementById('log-in-error-tel').textContent = 'Không tìm thấy tài khoản với số điện thoại này.';
  }
});

function log_out() {
  let user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    // Tìm chỉ số người dùng trong mảng users
    let userIndex = users.findIndex(u => u.tel === user.tel);
    if (userIndex !== -1) {
      users[userIndex] = user;
      localStorage.setItem('users', JSON.stringify(users));
    }
    localStorage.setItem('user', JSON.stringify([]));
    let name_tk = document.getElementById('name-tk');
    name_tk.innerHTML = '';
    name_tk.style.display = 'none';
    let new_tk = document.getElementById('new-tk');
    new_tk.style.display = 'block';
    let icon_tk = document.getElementById('icon-tk');
    icon_tk.removeEventListener('click', open_tk);
    let totalPrice = document.getElementById('totalPrice');
    totalPrice.innerHTML = "";
    close_x_overlay()
    let cartItems = document.getElementById('cartList');
    cartItems.innerHTML = '';
  }
}

function load_tk() {
  // Điền thông tin vào form
  let user = JSON.parse(localStorage.getItem('user')) || {};
  // Điền thông tin vào form
  document.getElementById('tk-name').value = user.username || '';
  document.getElementById('tk-tel').value = user.tel || '';  // Điền số điện thoại vào input với readonly
  document.getElementById('tk-email').value = user.email || '';
  document.getElementById('tk-address').value = user.address || '';
  document.getElementById('tk-current-password').value = '';
}

// Hàm lưu thông tin mới vào localStorage

function luu_tk() {
  const username = document.getElementById('tk-name').value.trim();  // Lấy giá trị họ tên
  const tel = document.getElementById('tk-tel').value.trim();
  const email = document.getElementById('tk-email').value.trim() || '';  // Lấy giá trị email
  const address = document.getElementById('tk-address').value.trim();  // Lấy giá trị địa chỉ
  const current_password = document.getElementById('tk-current-password').value.trim();  // Lấy mật khẩu hiện tại
  const new_password = document.getElementById('tk-new-password').value.trim();  // Lấy mật khẩu mới
  const confirm_password = document.getElementById('tk-confirm-password').value.trim();  // Lấy mật khẩu xác nhận
  let ktra_form = true;

  // Kiểm tra mật khẩu hiện tại chỉ khi người dùng nhập mật khẩu
  if (current_password.length > 0 && current_password !== user.password) {
    document.getElementById('tk-error-current-password').textContent = "Mật khẩu hiện tại không đúng.";
    ktra_form = false;
  } else {
    document.getElementById('tk-error-current-password').textContent = "";
  }
  // Kiểm tra mật khẩu mới (nếu có nhập mật khẩu mới)
  if (new_password.length > 0 && new_password.length < 6) {
    document.getElementById('tk-error-new-password').textContent = "Mật khẩu phải có ít nhất 6 ký tự.";
    ktra_form = false;
  } else {
    document.getElementById('tk-error-new-password').textContent = "";
  }
  // Kiểm tra mật khẩu xác nhận
  if (confirm_password.length > 0 && confirm_password !== new_password) {
    document.getElementById('tk-error-confirm-password').textContent = "Mật khẩu xác nhận không khớp.";
    ktra_form = false;
  } else {
    document.getElementById('tk-error-confirm-password').textContent = "";
  }
  // Nếu form hợp lệ, cập nhật thông tin người dùng
  if (ktra_form) {
    let user = JSON.parse(localStorage.getItem('user')) || {};
    let users = JSON.parse(localStorage.getItem('users')) || [];
    // Cập nhật các trường cần thay đổi trong đối tượng người dùng
    if (username) user.username = username;
    if (tel) user.tel = tel;
    if (email) user.email = email;
    if (address) user.address = address;
    if (new_password) user.password = new_password; // Chỉ cập nhật mật khẩu mới khi có thay đổi
    localStorage.setItem('user', JSON.stringify(user));
    let userIndex = users.findIndex(u => u.tel === user.tel);
    users[userIndex] = user;
    localStorage.setItem('users', JSON.stringify(users));
    // Cập nhật lại các trường input trên giao diện
    document.getElementById('tk-name').value = user.username;
    document.getElementById('tk-tel').value = user.tel;
    document.getElementById('tk-email').value = '';
    document.getElementById('tk-address').value = '';
    document.getElementById('tk-current-password').value = '';
    document.getElementById('tk-new-password').value = '';
    document.getElementById('tk-confirm-password').value = '';
  }
}
// Lắng nghe sự kiện click của nút "Lưu thay đổi"
document.getElementById('save').addEventListener('click', luu_tk);


//Kiểm Tra Người Dùng
function ktra_user() {
  let user = JSON.parse(localStorage.getItem('user')) || {};
  if (!user || !user.tel) {
    return null;
  }
  return user;
}

// Giỏ hàng

// Hàm thêm sản phẩm vào giỏ hàng
function themvaogiohang(productid) {
  let products = JSON.parse(localStorage.getItem('products')) || [];
  let user1 = ktra_user();
  if (!user1) {
    chua_dangnhap();
    return;
  }
  let product1 = products.find(item => item.id === String(productid));
  if (!product1) {
    alert('Sản phẩm không tồn tại');
    return;
  }
  let user_cart = user1.cart || [];
  let existingProduct = user_cart.find(item => item.id === product1.id);
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    product1.quantity = 1;
    user_cart.push(product1);
  }
  user1.cart = user_cart;
  localStorage.setItem('user', JSON.stringify(user1));
  them_thanhcong();
  ship();
  capNhatGioHang(user_cart);
}

let soluong = 0;

function ship() {
  let user = JSON.parse(localStorage.getItem('user')) || {};
  let user_cart = user.cart || [];
  // Tính tổng số lượng sản phẩm trong giỏ hàng
  soluong = user_cart.reduce((total, item) => total + item.quantity, 0);
  const soluong_sp = document.getElementById("soluong-sp");
  soluong_sp.innerHTML = `${soluong}`;
}

// Hàm cập nhật giỏ hàng
function capNhatGioHang(user_cart) {
  let cartList = document.getElementById('cartList');
  cartList.innerHTML = '';
  if (user_cart.length === 0) {
    cartList.innerHTML = '<p>Giỏ hàng của bạn đang trống.</p>';
  }
  // Hiển thị tất cả sản phẩm trong giỏ hàng
  user_cart.forEach(product => {
    let div = document.createElement('div');
    div.classList.add('shopping-product');
    div.innerHTML = `
    <img src="${product.img}" alt="${product.name}">
    <div class="shopping-product-div1">
    <h3>${product.name}</h3><br>
    <p>${product.price.toLocaleString()} VND</p>
    </div>
    <div class="shopping-product-div2">
      <button class="shopping-product-decrease" onclick="capNhatSoLuong(${product.id}, 'decrease')">-</button>
      <span>${product.quantity}</span>
      <button class="shopping-product-increase" onclick="capNhatSoLuong(${product.id}, 'increase')">+</button>
    </div>
    <button class="shopping-product-remove" onclick="xoaSanPham(${product.id})">Xóa</button>
  `;
    cartList.appendChild(div);
    ship();
  });

  // Tính tổng giá trị giỏ hàng
  let totalPrice = user_cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
  let totalElement = document.getElementById('totalPrice');
  totalElement.textContent = `Tổng cộng : ${totalPrice.toLocaleString()} VND`;

  //kHI BẤM THANH TOÁN 
  let name_product1 = document.getElementById("name-product1");
  name_product1.innerHTML = '';
  if (user_cart.length === 0) {
    name_product1.innerHTML = '<p>Giỏ hàng của bạn đang trống.</p>';
  }
  // Hiển thị tất cả sản phẩm trong giỏ hàng
  user_cart.forEach(product => {
    let div = document.createElement('div');
    div.classList.add('shopping-product-pay');
    div.innerHTML = `
    <img src="${product.img}" alt="${product.name}">
    <div class="shopping-product-div11">
    <h3>${product.name}</h3><br>
    <p>${product.price.toLocaleString()} VND</p>
    </div>
    <div class="shopping-product-div21">
      <button class="shopping-product-decrease1" onclick="capNhatSoLuong(${product.id}, 'decrease')">-</button>
      <span>${product.quantity}</span>
      <button class="shopping-product-increase1" onclick="capNhatSoLuong(${product.id}, 'increase')">+</button>
    </div>
    <button class="shopping-product-remove1" onclick="xoaSanPham(${product.id})">Xóa</button>
  `;
    name_product1.appendChild(div);
    ship();
  });

  // Tính tổng giá trị giỏ hàng
  let totalpay = user_cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
  let totalpaydisplay = document.getElementById('total-pay');
  totalpaydisplay.textContent = `${totalpay.toLocaleString()} VND`;

  let totalphi = user_cart.reduce((sum, product) => sum + 5000 * product.quantity, 0);
  let totalphidisplay = document.getElementById('phi-van-chuyen');
  totalphidisplay.textContent = `${totalphi.toLocaleString()} VND`;

  let totalpay_all = user_cart.reduce((sum, product) => sum + (product.price + 5000) * product.quantity, 0);
  let totalpaydisplay_all = document.getElementById('total-pay-all');
  totalpaydisplay_all.textContent = `${totalpay_all.toLocaleString()} VND`;

}

function capNhatSoLuong(productId, action) {
  let user = JSON.parse(localStorage.getItem('user'));
  if (!user) return;
  let user_cart = user.cart || [];
  let productt = user_cart.find(p => p.id === String(productId));
  if (!productt) return;
  if (action === 'increase') {
    productt.quantity++;
  } else if (action === 'decrease') {
    if (productt.quantity > 1) {
      productt.quantity--;
    }
  }
  user.cart = user_cart;
  localStorage.setItem('user', JSON.stringify(user));
  capNhatGioHang(user_cart);
  ship();
}

function xoaSanPham(productid) {
  let user = JSON.parse(localStorage.getItem('user')) || {};
  let user_cart = user.cart || [];
  // Lọc giỏ hàng để loại bỏ sản phẩm có id tương ứng với productid
  user_cart = user_cart.filter(product => product.id !== String(productid));
  user.cart = user_cart;
  localStorage.setItem('user', JSON.stringify(user));
  capNhatGioHang(user_cart);
  ship();
}

//************************************************************* */
document.addEventListener('DOMContentLoaded', function () {
  let user = JSON.parse(localStorage.getItem('user')) || {};
  createproductList();
  open_product('home');
  capnhat_hoadon();
  if (user && user.tel) {
    load_tk();
    let new_tk = document.getElementById('new-tk');
    new_tk.style.display = 'none';
    let name_tk = document.getElementById('name-tk');
    name_tk.innerHTML = `${user.username}`;
    name_tk.style.display = 'block';
    let icon_tk = document.getElementById('icon-tk');
    icon_tk.addEventListener('click', open_tk);
    if (user.cart) {
      capNhatGioHang(user.cart);
      ship();
      capnhat_hoadon();
    }
  } else {
    chua_dangnhap();
  }
});

//************************

let currentPage = 1; // Trang mặc định
let itemsPerPage = 8; // Số sản phẩm mỗi trang

//Khi bấm các nút ở list menu
function open_product_of_team(products) {
  let productlist = document.getElementById('productList');
  let pagination = document.getElementById('pagination');
  productlist.innerHTML = '';
  pagination.innerHTML = '';
  if (products.length == 0) {
    productlist.innerHTML = 'Chưa có sản phẩm nào.';
    return;
  }
  // Tính số trang và hiển thị sản phẩm cho trang hiện tại
  let totalPages = Math.ceil(products.length / itemsPerPage);
  let start = (currentPage - 1) * itemsPerPage;
  let end = start + itemsPerPage;
  let productsToShow = products.slice(start, end);
  // Hiển thị sản phẩm cho trang hiện tại
  productsToShow.forEach((product) => {
    let productDiv = document.createElement('div');
    productDiv.classList.add('product-item');
    productDiv.innerHTML = `
       <img src="${product.img}" alt="${product.name}">
       <h3>${product.name}</h3>
       <p>Giá: ${product.price} VND</p>
       <button onclick="thongtin_and_addproduct(${product.id})">Đặt hàng</button>
     `;
    productlist.appendChild(productDiv);
  });
  // Tạo nút phân trang
  for (let i = 1; i <= totalPages; i++) {
    let pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.onclick = () => changePage(i, products);
    pagination.appendChild(pageButton);
  }
}

function thongtin_and_addproduct(productid) {
  let main = document.getElementById('main');
  let products = JSON.parse(localStorage.getItem('products')) || [];
  // Tìm sản phẩm theo productid
  let product = products.find(p => p.id === String(productid));

  if (product) {
    // Nếu tìm thấy sản phẩm, tạo div chứa thông tin sản phẩm
    let productDiv = document.createElement('div');
    productDiv.classList.add('product-item-thongtin');
    productDiv.innerHTML = `
      <button class="product-item-thongtin-x">X</button>
      <div class="product-item-thongtin-div1">
         <img src="${product.img}" alt="${product.name}">
         <h3>${product.name}</h3>
      </div>
      <p class="product-item-thongtin-p1">${product.description}</p>
      <p class="product-item-thongtin-p2">Giá: ${product.price} VND</p>
      <button class="product-item-thongtin-add" id="product_${String(product.id)}" onclick="themvaogiohang(${product.id})">Thêm vào giỏ hàng</button>
    `;
    var overlay = document.getElementById("overlay");
    // Thêm sự kiện click cho nút "X" để xóa div
    // Thêm sự kiện click cho overlay để xóa div
    // Thêm sự kiện click cho nút "X" để xóa div
    let closeButton = productDiv.querySelector('.product-item-thongtin-x');
    closeButton.addEventListener('click', function () {
      main.removeChild(productDiv); // Xóa div chứa thông tin sản phẩm
      overlay.style.display = 'none';
    });
    // Thêm sự kiện click cho overlay để xóa div
    overlay.addEventListener('click', function () {
      main.removeChild(productDiv);
      overlay.style.display = 'none';
    });


    // Thêm sự kiện "Thêm vào giỏ hàng" để thêm sản phẩm vào giỏ hàng
    let addButton = productDiv.querySelector('.product-item-thongtin-add');
    addButton.addEventListener('click', function () {
      main.removeChild(productDiv); // Xóa div sau khi thêm vào giỏ hàng
      overlay.style.display = 'none'; // Ẩn overlay
    });


    overlay.style.display = 'block';
    // Thêm productDiv vào 'main'
    main.appendChild(productDiv);
  } else {
    console.log('Sản phẩm không tồn tại.');
  }
}

// Hàm thay đổi trang
function changePage(page, products) {
  currentPage = page;
  open_product_of_team(products);
}

// Hàm hiển thị sản phẩm theo category

function open_product(category) {
  let products = JSON.parse(localStorage.getItem('products')) || [];
  createproductList();
  let list_product_of_menu = [];
  if (category === 'home') {
    list_product_of_menu = products;
  } else {
    list_product_of_menu = products.filter(product => product.category == category);
  }
  currentPage = 1;
  open_product_of_team(list_product_of_menu);
}


// Lắng nghe sự kiện scroll
//Di chuyển list menu
let lastScrollTop = 0; // Biến lưu vị trí cuộn trước đó
window.addEventListener('scroll', function () {
  let listMenu = document.getElementById('list-menu');
  let currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
  // Xử lý di chuyển menu
  if (currentScrollTop > lastScrollTop) {
    listMenu.style.top = '10px';  // Menu di chuyển lên khi cuộn xuống
  } else {
    listMenu.style.top = '60px';  // Menu trở lại vị trí ban đầu khi cuộn lên
  }
  lastScrollTop = currentScrollTop;
});


let images = [
  "assets/images/admin/poster_2.jpg",
  "assets/images/admin/poster_3.jpg",
  "assets/images/admin/poster_4.jpg",
]; // Mảng ảnh cần chuyển
let currentIndex = 0; // Chỉ số ảnh hiện tại

// Hàm để thay đổi ảnh tự động
function changeImage() {
  let poster = document.getElementById("poster");
  currentIndex = (currentIndex + 1) % images.length; // Chuyển đến ảnh tiếp theo và quay lại đầu nếu đến cuối
  // Thay đổi ảnh nền của poster
  poster.style.backgroundImage = `url(${images[currentIndex]})`;
  // Nếu muốn cuộn ảnh (nếu poster có thể cuộn được):
  poster.scrollTo({
    left: currentIndex * poster.offsetWidth, // Cuộn đến ảnh tiếp theo
    behavior: 'smooth' // Hiệu ứng cuộn mượt mà
  });
}
// Chạy hàm changeImage mỗi 3 giây (3000ms)
setInterval(changeImage, 3000);

//Tìm kiếm sản phẩm

// Hàm tìm kiếm sản phẩm
function searchProducts() {
  var input, filter, productlist, products, i, txtValue;
  input = document.getElementById('search-input');
  filter = input.value.toLowerCase();
  productlist = document.getElementById('productList');
  products = productlist.getElementsByClassName('product-item');
  open_product('home');
  // Lặp qua home sản phẩm và ẩn hoặc hiển thị dựa trên tìm kiếm
  for (i = 0; i < products.length; i++) {
    txtValue = products[i].textContent || products[i].innerText;
    if (txtValue.toLowerCase().indexOf(filter) > -1) {
      products[i].style.display = "flex";
    } else {
      products[i].style.display = "none";
    }
  }
}

//LỌC SẢN PHẨM THEO GIÁ
function search_price() {
  let category_search_price = document.getElementById('category-search-price').value;
  tim_nhom(category_search_price);
}

function tim_nhom(category) {
  let danhsach_sp = [];
  if (category === 'home') {
    danhsach_sp = products;
  } else {
    danhsach_sp = products.filter(product => product.category == category);
  }
  lietke_price(danhsach_sp);
}

function lietke_price(products) {
  let min_price = parseFloat(document.getElementById('min-price').value) || null;
  let max_price = parseFloat(document.getElementById('max-price').value) || null;
  let productlist = document.getElementById('productList');
  productlist.innerHTML = '';
  if (products.length == 0) {
    productlist.innerHTML = 'Chưa có sản phẩm nào.';
  } else {
    let foundProduct = false;
    products.forEach((product) => {
      if (
        (min_price === null && max_price === null) ||
        (min_price !== null && max_price !== null && product.price >= min_price && product.price <= max_price) ||
        (min_price !== null && max_price === null && product.price >= min_price) ||
        (min_price === null && max_price !== null && product.price <= max_price)
      ) {
        foundProduct = true;

        let productDiv = document.createElement('div');
        productDiv.classList.add('product-item');
        productDiv.innerHTML = `
          <img src="${product.img}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>Giá: ${product.price} VND</p>
          <button onclick="themvaogiohang(${product.id})">Đặt hàng</button>
        `;
        productlist.appendChild(productDiv);
      }
    });
    if (!foundProduct) {
      productlist.innerHTML = 'Không có sản phẩm nào.';
    }
  }
}

//GIÁ TĂNG DẦN
function search_price_thap_cao() {
  let productlist = document.getElementById('productList');
  let productItems = Array.from(productlist.getElementsByClassName('product-item'));
  if (productItems.length === 0) {
    return;
  }
  // Lấy giá sản phẩm từ các phần tử đang hiển thị
  let sortedProductItems = productItems.sort((a, b) => {
    // Lấy giá của sản phẩm từ các phần tử HTML
    let priceA = parseFloat(a.querySelector('p').innerText.replace('Giá: ', '').replace(' VND', '').trim());
    let priceB = parseFloat(b.querySelector('p').innerText.replace('Giá: ', '').replace(' VND', '').trim());
    return priceA - priceB; // Tăng dần (đổi thành priceB - priceA để giảm dần)
  });
  productlist.innerHTML = '';
  sortedProductItems.forEach(item => productlist.appendChild(item));
}

//GIÁ GIẢM DẦN
function search_price_cao_thap() {
  let productlist = document.getElementById('productList');
  let productItems = Array.from(productlist.getElementsByClassName('product-item'));
  if (productItems.length === 0) {
    return;
  }
  // Lấy giá sản phẩm từ các phần tử đang hiển thị
  let sortedProductItems = productItems.sort((a, b) => {
    // Lấy giá của sản phẩm từ các phần tử HTML
    let priceA = parseFloat(a.querySelector('p').innerText.replace('Giá: ', '').replace(' VND', '').trim());
    let priceB = parseFloat(b.querySelector('p').innerText.replace('Giá: ', '').replace(' VND', '').trim());
    return priceB - priceA;
  });
  productlist.innerHTML = '';
  sortedProductItems.forEach(item => productlist.appendChild(item));
}

//***********************8 */
//hàm chuyển thanh công cụ
let isMoved = 0;

function moveto() {
  let header_aside = document.getElementById('header-aside');
  if (!isMoved) {
    header_aside.classList.add('header-aside-move');
  } else {
    header_aside.classList.remove('header-aside-move');
  }
  isMoved = !isMoved;
}

//OPEN_SHOPPING
function open_shopping() {
  var shopping = document.getElementById("shopping");
  var overlay = document.getElementById("overlay");
  if (shopping.style.display == 'none' || shopping.style.display == "") {
    shopping.style.display = 'block';
    overlay.style.display = 'block';
  }
  else {
    shopping.style.display = 'none';
    overlay.style.display = 'none';
  }
}

//CLOSE
function close_x_overlay() {
  var shopping = document.getElementById("shopping");
  var account_log_in = document.getElementById("account-log-in");
  var account_sign_up = document.getElementById("account-sign-up");
  var tk = document.getElementById("tk");
  var open_pay = document.getElementById('open-pay');
  var overlay = document.getElementById("overlay");
  var hoadon_tk  = document.getElementById("hoadon-tk");
  tk.style.display = 'none';
  shopping.style.display = 'none';
  account_log_in.style.display = 'none';
  account_sign_up.style.display = 'none';
  open_pay.style.display = 'none';
  overlay.style.display = 'none';
  hoadon_tk.style.display = 'none';
}

//OPEN_TK
function open_tk() {
  var tk = document.getElementById("tk");
  var overlay = document.getElementById("overlay");
  overlay.style.display = 'block';
  tk.style.display = 'block';
  let ADMIN0 =
    { admin_tel: '0987654321', admin_password: '123456' };
  let user = JSON.parse(localStorage.getItem('user')) || {};
  if (user.tel === String(ADMIN0.admin_tel)) {
    var outadmin = document.getElementById('tk-dangxuat-admin');
    outadmin.style.display = 'block';
    var tk = document.getElementById("tk");
    var overlay = document.getElementById("overlay");
    overlay.style.display = 'block';
    tk.style.display = 'block';
    var ql_admin = document.getElementById('ql-admin');
    ql_admin.style.display = 'block';
    var tk_form = document.getElementById('tk-form');
    tk_form.style.display = 'none';
  } else {
    var outadmin = document.getElementById('tk-dangxuat-admin');
    outadmin.style.display = 'none';
    var ql_admin = document.getElementById('ql-admin');
    ql_admin.style.display = 'none';
    var tk = document.getElementById("tk");
    var overlay = document.getElementById("overlay");
    overlay.style.display = 'block';
    tk.style.display = 'block';
    var tk_form = document.getElementById('tk-form');
    tk_form.style.display = 'block';
    load_tk();
  }
}

//OPEN_ACCOUNT
function open_account_log_in() {
  var account_log_in = document.getElementById("account-log-in");
  var account_sign_up = document.getElementById("account-sign-up");
  var overlay = document.getElementById("overlay");
  overlay.style.display = 'block';
  account_log_in.style.display = 'block';
  account_sign_up.style.display = 'none';
}

function open_account_sign_up() {
  var account_log_in = document.getElementById("account-log-in");
  var account_sign_up = document.getElementById("account-sign-up");
  var overlay = document.getElementById("overlay");
  overlay.style.display = 'block';
  account_log_in.style.display = 'none';
  account_sign_up.style.display = 'block';
}

function open_hoadon(){
  close_x_overlay();
  var hoadon_tk  = document.getElementById("hoadon-tk");
  var tk = document.getElementById("tk");
  var overlay = document.getElementById("overlay");
  overlay.style.display = 'block';
  tk.style.display = 'none';
  hoadon_tk.style.display = 'block';
}
function close_x_hoadon(){
  var hoadon_tk  = document.getElementById("hoadon-tk");
  var overlay = document.getElementById("overlay");
  overlay.style.display = 'none';
  hoadon_tk.style.display = 'none';
}

//DỊCH CHUYỂN TỚI MAIN SẢN PHẨM KHI BẤM LIST_MENU
let home = document.getElementById("home");
let new1 = document.getElementById("new");
let burger = document.getElementById("burger");
let chicken = document.getElementById("chicken");
let combo = document.getElementById("combo");
let drink = document.getElementById("drink");
let search_input = document.getElementById("search-input");
let loc_sanpham = document.getElementById("loc-sanpham");
let main = document.getElementById("main");
home.addEventListener("click", function () {
  // Cuộn đến phần tử main
  window.scrollTo({
    top: main.offsetTop - 110,
    behavior: "smooth"
  });
});
new1.addEventListener("click", function () {
  // Cuộn đến phần tử main
  window.scrollTo({
    top: main.offsetTop - 110,
    behavior: "smooth"
  });
});
burger.addEventListener("click", function () {
  // Cuộn đến phần tử main
  window.scrollTo({
    top: main.offsetTop - 110,
    behavior: "smooth"
  });
});
chicken.addEventListener("click", function () {
  // Cuộn đến phần tử main
  window.scrollTo({
    top: main.offsetTop - 110,
    behavior: "smooth"
  });
});
combo.addEventListener("click", function () {
  // Cuộn đến phần tử main
  window.scrollTo({
    top: main.offsetTop - 110,
    behavior: "smooth"
  });
});
drink.addEventListener("click", function () {
  // Cuộn đến phần tử main
  window.scrollTo({
    top: main.offsetTop - 110,
    behavior: "smooth"
  });
});
search_input.addEventListener("click", function () {
  // Cuộn đến phần tử main
  window.scrollTo({
    top: main.offsetTop - 110,
    behavior: "smooth"
  });
});
loc_sanpham.addEventListener("click", function () {
  // Cuộn đến phần tử main
  window.scrollTo({
    top: main.offsetTop - 110,
    behavior: "smooth"
  });
});










//THANH TOÁN

//Mở pay
function open_pay() {
  let open_pay = document.getElementById("open-pay");
  open_pay.style.display = 'block';

}

// Hàm xử lý khi người dùng đặt hàng
function submitOrder() {
  let name = document.getElementById('name-to').value;
  let phone = document.getElementById('phone-to').value;
  let address = document.getElementById('address-to').value;

  // Kiểm tra thông tin người nhận
  if (!name || !phone || !address) {
    document.getElementById('err1').style.display = 'block';
    return;
  }

  // Ẩn thông báo lỗi nếu thông tin hợp lệ
  document.getElementById('err1').style.display = 'none';
  let user = JSON.parse(localStorage.getItem('user')) || {};
  // Lấy thông tin giỏ hàng và thông tin người nhận
  if (user.cart.length > 0) {
    let note = document.getElementById('note').value;
    // Tính tổng giá trị giỏ hàng
    let totalphi = user.cart.reduce((sum, product) => sum + 5000 * product.quantity, 0);
    let totalpay_all = user.cart.reduce((sum, product) => sum + (product.price + 5000) * product.quantity, 0);
    // Tạo hóa đơn
    let order = {
      orderId: Date.now(), // ID hóa đơn, sử dụng thời gian hiện tại để tạo ID
      items: user.cart, // Danh sách các sản phẩm trong giỏ hàng
      totalphi: totalphi, // Phí vận chuyển
      totalpay_all: totalpay_all, // Tổng tiền thanh toán
      name: name, // Tên người nhận
      phone: phone, // Số điện thoại người nhận
      address: address, // Địa chỉ người nhận
      note: note, // Ghi chú (nếu có)
      status: 'Đang chờ', // Trạng thái đơn hàng, mặc định là đang chờ
    };
    user.hoadon.push(order); // Thêm đơn hàng vào mảng hóa đơn
    // Lưu lại vào localStorage
    let userIndex = users.findIndex(u => u.tel === user.tel);
    if (userIndex !== -1) {
      users[userIndex] = user;
      localStorage.setItem('users', JSON.stringify(users));
    }
    // Xóa giỏ hàng sau khi đặt
    user.cart = [];
    localStorage.setItem('user', JSON.stringify(user));
    capNhatGioHang(user.cart);
    ship();
    localStorage.setItem('user', JSON.stringify(user));
    alert('Đặt hàng thành công!');



    let hoadon_list = document.getElementById('hoadon-list');
    hoadon_list.innerHTML = '';
    if (user.hoadon.length === 0) {
      hoadon_list.innerHTML = '<p>Đơn hàng của bạn đang trống.</p>';
    }
    // Hiển thị tất cả sản phẩm trong giỏ hàng
    user.hoadon.forEach(order => {
      let div = document.createElement('div');
      let orderDate = new Date(order.orderId); // Dùng `orderId` làm dấu thời gian
      let formattedDate = orderDate.toLocaleString(); // Định dạng ngày giờ
      div.classList.add('hoadon-con');
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
      hoadon_list.appendChild(div);
    });


capnhat_hoadon();

  } else {
    alert('Lỗi thanh toán');
  }
}


function capnhat_hoadon(){
  let users = JSON.parse(localStorage.getItem('users')) || [];
  let userIndex = users.findIndex(u => u.tel === user.tel);
   let user1 =users[userIndex];


  let hoadon_list_tk = document.getElementById('hoadon-list-tk');
  hoadon_list_tk.innerHTML = '';
  if (user1.hoadon.length === 0) {
    hoadon_list_tk.innerHTML = '<p>Đơn hàng của bạn đang trống.</p>';
  }
  // Hiển thị tất cả sản phẩm trong giỏ hàng
  user1.hoadon.forEach(order => {
    let div = document.createElement('div');
    let orderDate = new Date(order.orderId); // Dùng `orderId` làm dấu thời gian
    let formattedDate = orderDate.toLocaleString(); // Định dạng ngày giờ
    div.classList.add('hoadon-con-tk');
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
    hoadon_list_tk.appendChild(div);
  });
}