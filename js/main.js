//************MAIN****************

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
      address: []
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
  ship(product1);
  capNhatGioHang(user_cart);

}

let soluong = 0;

function ship() {
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
       <button id="product_${String(product.id)}" onclick="themvaogiohang(${product.id})">Đặt hàng</button>
     `;
    productlist.appendChild(productDiv);
  });
  // Tạo nút phân trang
  for (let i = 1; i <= totalPages; i++) {
    let pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.onclick = () => changePage(i, products);
    pagination.appendChild(pageButton);
    productlist.appendChild(pagination);
    pageButton.addEventListener("click", function () {
      let main = document.getElementById('main');
      window.scrollTo({
        top: main.offsetTop - 110,
        behavior: "smooth"
      });
    });
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
  if (category == 'home') {
    list_product_of_menu = products;
  } else {
    list_product_of_menu = products.filter(product => product.category == category);
  }
  currentPage = 1;
  open_product_of_team(list_product_of_menu);
}


// Lắng nghe sự kiện scroll

let lastScrollTop = 0; // Biến lưu vị trí cuộn trước đó

window.addEventListener('scroll', function () {
  let listMenu = document.getElementById('list-menu');
  let currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (currentScrollTop > lastScrollTop) {
    // Cuộn xuống
    listMenu.style.top = '10px'; // Dịch xuống
  } else {
    listMenu.style.top = '60px'; // Dịch lên
  }
  lastScrollTop = currentScrollTop;
  //******CHUYỂN ẢNH POSTER******* */
  let poster = document.getElementById("poster");
  let images = [
    "assets/images/admin/poster_2.jpg",
    "assets/images/admin/poster_3.jpg",
    "assets/images/admin/poster_4.jpg",
  ];
});

let currentIndex = 0;

// Hàm để thay đổi ảnh tự động
function changeImage() {
  currentIndex = (currentIndex + 1) % images.length; // Chuyển đến ảnh tiếp theo và quay lại đầu nếu đến cuối
  let currentItem = poster.children[currentIndex];
  currentItem.style.backgroundImage = `url(${images[currentIndex]})`;
  poster.scrollTo({
    left: currentItem.offsetLeft,
    behavior: 'smooth',
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
  if (category == 'home') {
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




//THANH TOÁN 

//Mở pay
function open_pay() {
  let open_pay = document.getElementById("open-pay");
  open_pay.style.display = 'block';
}


// Cập nhật phí vận chuyển khi lựa chọn phương thức giao nhận
function updateShippingFee(type) {
  let shippingFeeElement = document.getElementById('shipping-fee');
  let totalAmountElement = document.getElementById('total-amount');
  if (type === 'delivery') {
    // Phí vận chuyển cho "Giao tận nơi"
    shippingFeeElement.textContent = 'Phí vận chuyển: 30.000 đ';
    totalAmountElement.textContent = '210.000 đ'; // Tiền hàng + Phí vận chuyển
  } else if (type === 'pickup') {
    // Phí vận chuyển cho "Tự đến lấy"
    shippingFeeElement.textContent = 'Phí vận chuyển: 0 đ';
    totalAmountElement.textContent = '180.000 đ';
  }
}

function updateShippingFee(option) {
  // Reset tất cả các nút
  document.querySelectorAll('.delivery-options button').forEach(function (button) {
    button.classList.remove('selected');
  });
  // Chọn nút mới và thêm lớp 'selected'
  document.getElementById(option).classList.add('selected');
}


// Chọn ngày giao hàng
function selectDate(date) {
  let dateButtons = document.querySelectorAll('.date-button');
  dateButtons.forEach(button => {
    button.classList.remove('selected');
  });
  let selectedButton = document.querySelector(`.date-button[onclick="selectDate('${date}')"]`);
  selectedButton.classList.add('selected');
}

// Kiểm tra và gửi đơn hàng
function submitOrder() {
  let name = document.getElementById('name').value;
  let phone = document.getElementById('phone').value;
  let address = document.getElementById('address').value;
  if (!name || !phone || !address) {
    document.getElementById('error-message').style.display = 'block';
    return;
  }
  // Xử lý ghi chú
  let note = document.getElementById('note').value;
  console.log('Ghi chú:', note);
  alert('Đơn hàng của bạn đã được đặt!');
}

document.getElementById('customer-form').addEventListener('input', function () {
  document.getElementById('error-message').style.display = 'none';
});

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
  tk.style.display = 'none';
  shopping.style.display = 'none';
  account_log_in.style.display = 'none';
  account_sign_up.style.display = 'none';
  open_pay.style.display = 'none';
  overlay.style.display = 'none';
}

//OPEN_TK
function open_tk() {
  var tk = document.getElementById("tk");
  var overlay = document.getElementById("overlay");
  overlay.style.display = 'block';
  tk.style.display = 'block';
  load_tk();
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