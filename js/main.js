

//************MAIN****************

let users = JSON.parse(localStorage.getItem('users')) || [];
let user = JSON.parse(localStorage.getItem('user')) || {};
let products = JSON.parse(localStorage.getItem('products')) || [];
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
      password: password
    };

    // Gọi hàm đăng ký người dùng
    registerUser(newUser);

    // Reset form sau khi đăng ký thành công
    document.getElementById('account-sign-up').reset();

    // Đóng overlay nếu cần (hãy chắc chắn bạn đã định nghĩa hàm close_x_overlay())
    close_x_overlay();
  }
});


// Hàm đăng ký tài khoản mới với số điện thoại làm ID
function registerUser(newUser) {
  // Kiểm tra xem số điện thoại đã tồn tại chưa
  let ktra_user0 = users.some(user => user.tel === newUser.tel);
  if (ktra_user0) {
    alert('Số điện thoại đã được đăng ký!');
    return;
  }

  // Thêm người dùng mới vào mảng users
  users.push(newUser);

  // Lưu lại mảng users vào localStorage
  localStorage.setItem('users', JSON.stringify(users));

  alert('Đăng ký thành công!');
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
    return; // Ngừng xử lý nếu không đồng ý với điều khoản
  } else {
    document.getElementById('log-in-error-checkbox').textContent = ""; // Xóa thông báo lỗi nếu đồng ý
  }

  // Lấy danh sách người dùng từ localStorage (nếu có)
  let user = users.find(user => user.tel === log_in_tel);

  if (user) {
    // Kiểm tra mật khẩu
    if (user.password === log_in_password) {
      // Nếu đăng nhập thành công
      localStorage.setItem('user', JSON.stringify(user));
      alert('Đăng nhập thành công!');

      let new_tk = document.getElementById('new-tk');
      new_tk.style.display = 'none';
      let name_tk = document.getElementById('name-tk');
      name_tk.innerHTML = `${user.username}`;
      name_tk.style.display = 'block';
      let icon_tk = document.getElementById('icon-tk');
      // Gán sự kiện onclick
      icon_tk.addEventListener('click', open_tk);
      close_x_overlay();

      let cart = user.cart || [];
      capNhatGioHang(cart);

    } else {
      // Nếu mật khẩu không đúng
      document.getElementById('log-in-error-tel').textContent = 'Số điện thoại hoặc mật khẩu không đúng.';
    }
  } else {
    // Nếu không tìm thấy người dùng với số điện thoại đó
    document.getElementById('log-in-error-tel').textContent = 'Không tìm thấy tài khoản với số điện thoại này.';
  }
});

function log_out() {
  // Xóa thông tin người dùng khỏi localStorage
  let user = JSON.parse(localStorage.getItem('user')); // Lấy thông tin người dùng hiện tại

  // Cập nhật giỏ hàng vào danh sách người dùng
  let users = JSON.parse(localStorage.getItem('users')) || [];
  let userIndex = users.findIndex(u => u.tel === user.tel);
  if (userIndex !== -1) {
    users[userIndex] = user; // Cập nhật thông tin người dùng bao gồm giỏ hàng
    localStorage.setItem('users', JSON.stringify(users)); // Lưu lại danh sách users
  }
  // Xóa thông tin người dùng khỏi localStorage
  localStorage.removeItem('user');
  // Cập nhật giao diện: Ẩn tên tài khoản, nút đăng xuất, v.v.
  let name_tk = document.getElementById('name-tk');
  name_tk.innerHTML = '';  // Xóa tên người dùng
  name_tk.style.display = 'none';
  let new_tk = document.getElementById('new-tk');
  new_tk.style.display = 'block';
  let icon_tk = document.getElementById('icon-tk');
  icon_tk.removeEventListener('click', open_tk); // Xóa sự kiện onclick nếu có
  let totalPrice = document.getElementById('totalPrice');
  totalPrice.innerHTML = "";
  close_x_overlay()

  let cartItems = document.getElementById('cartList');
  cartItems.innerHTML = '';  // Xóa giỏ hàng cũ
  // Hiển thị lại phần đăng nhập nếu cần
  alert('Đăng xuất thành công!');

}
//Kiểm Tra Người Dùng
function ktra_user() {
  let user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    return;
  }
  return user;
}

// Giỏ hàng


// Hàm thêm sản phẩm vào giỏ hàng
function themvaogiohang(index) {
  let user = ktra_user(); // Lấy thông tin người dùng từ localStorage
  if (!user) {
    chua_dangnhap();
    return;
  }

  let product = products[index];
  let cart = user.cart || [];
  // Kiểm tra nếu sản phẩm đã có trong giỏ hàng
  let existingProduct = cart.find(item => item.id === product.id);

  if (existingProduct) {
    // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
    existingProduct.quantity++;
  } else {
    // Nếu sản phẩm chưa có, thêm mới vào giỏ hàng với số lượng 1
    product.quantity = 1;
    cart.push(product);
  }

  // Cập nhật giỏ hàng vào localStorage cho người dùng
  user.cart = cart;
  localStorage.setItem('user', JSON.stringify(user));
  capNhatGioHang(cart);
}

// Hàm cập nhật giỏ hàng
function capNhatGioHang(cart) {
  let cartList = document.getElementById('cartList');
  cartList.innerHTML = '';  // Xóa giỏ hàng cũ

  // Hiển thị tất cả sản phẩm trong giỏ hàng
  cart.forEach(product => {
    let div = document.createElement('div');
    div.classList.add('shopping-product');
    div.innerHTML = `
    <img src="${product.img}" alt="${product.title}">
    <h3>${product.title}</h3>
    <p>${product.price.toLocaleString()} VND</p>
    
    <div class="quantity-container">
      <button class="decrease-btn" onclick="capNhatSoLuong(${product.id}, 'decrease')">-</button>
      <span>${product.quantity}</span>
      <button class="increase-btn" onclick="capNhatSoLuong(${product.id}, 'increase')">+</button>
    </div>
    
    <button class="remove-btn" onclick="xoaSanPham(${product.id})">Xóa</button>
  `;
    cartList.appendChild(div);
  });

  // Tính tổng giá trị giỏ hàng
  let totalPrice = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
  let totalElement = document.getElementById('totalPrice');
  totalElement.textContent = `Tổng cộng : ${totalPrice.toLocaleString()} VND`;
}
function capNhatSoLuong(productId, action) {
  let user = JSON.parse(localStorage.getItem('user')); // Lấy thông tin người dùng
  if (!user) return; // Nếu không có người dùng thì không làm gì

  // Lấy giỏ hàng từ localStorage
  let cart = user.cart || [];

  // Tìm sản phẩm trong giỏ hàng
  let productt = cart.find(p => p.id === productId);
  if (!productt) return; // Nếu không tìm thấy sản phẩm thì không làm gì

  // Tăng hoặc giảm số lượng sản phẩm
  if (action === 'increase') {
    productt.quantity++;
  } else if (action === 'decrease') {
    if (productt.quantity > 1) {
      productt.quantity--;
    }
  }

  // Cập nhật lại giỏ hàng vào localStorage cho người dùng
  user.cart = cart;
  localStorage.setItem('user', JSON.stringify(user));

  // Cập nhật giỏ hàng hiển thị
  capNhatGioHang(cart);
}
function xoaSanPham(productId) {
  let user = JSON.parse(localStorage.getItem('user')); // Lấy thông tin người dùng
  if (!user) return; // Nếu không có người dùng thì không làm gì

  // Lấy giỏ hàng từ localStorage
  let cart = user.cart || [];

  // Tìm chỉ số của sản phẩm trong giỏ hàng
  let productIndex = cart.findIndex(p => p.id === productId);
  if (productIndex === -1) return; // Nếu không tìm thấy sản phẩm thì không làm gì

  // Xóa sản phẩm khỏi giỏ hàng
  cart.splice(productIndex, 1);

  // Cập nhật giỏ hàng vào localStorage cho người dùng
  user.cart = cart;
  localStorage.setItem('user', JSON.stringify(user));

  // Cập nhật giỏ hàng hiển thị
  capNhatGioHang(cart);
}



function chua_dangnhap() {
  var chua_dangnhap = document.getElementById('chua-dangnhap');

  // Hiển thị div
  chua_dangnhap.style.display = 'block'; // Hoặc dùng 'flex', 'inline', tùy vào cách bạn thiết kế
  chua_dangnhap.style.opacity = 1; // Đảm bảo nó không mờ (nếu bạn có dùng opacity)
  chua_dangnhap.style.top = '0';
  // Sau 2 giây, ẩn lại div
  setTimeout(function () {
    chua_dangnhap.style.display = 'none'; // Ẩn lại div sau 2 giây
  }, 1500); // giây

}



//************************************************************* */
document.addEventListener('DOMContentLoaded', function () {
  open_product('home');
  if (user && user.tel) {

    let new_tk = document.getElementById('new-tk');
    new_tk.style.display = 'none';

    let name_tk = document.getElementById('name-tk');
    name_tk.innerHTML = `${user.username}`;
    name_tk.style.display = 'block';

    let icon_tk = document.getElementById('icon-tk');
    icon_tk.addEventListener('click', open_tk);

    // Lấy thông tin giỏ hàng từ users
    let user0 = users.find(u => u.tel === user.tel);
    if (user0) {
      capNhatGioHang(user0.cart);
    }
  } else {
    createproductList();
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
  productlist.innerHTML = ''; // Xóa nội dung cũ
  pagination.innerHTML = ''; // Xóa phân trang cũ

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
  productsToShow.forEach((product, index) => {
    let productDiv = document.createElement('div');
    productDiv.classList.add('product-item');
    productDiv.innerHTML = `
       <img src="${product.img}" alt="${product.title}">
       <h3>${product.title}</h3>
       <p>Giá: ${product.price} VND</p>
       <button onclick="themvaogiohang(${index})">Đặt hàng</button>
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
      // Cuộn đến phần tử main
      window.scrollTo({
        top: main.offsetTop - 110,  // Cuộn tới vị trí phần tử main, điều chỉnh khoảng cách (1250px)
        behavior: "smooth"          // Cuộn mượt mà
      });
    });
  }

}

// Hàm thay đổi trang
function changePage(page, products) {
  currentPage = page; // Cập nhật trang hiện tại
  open_product_of_team(products); // Hiển thị lại sản phẩm cho trang mới
}
// Hàm hiển thị sản phẩm theo category
function open_product(category) {
  let products = JSON.parse(localStorage.getItem('products')) || [];
  createproductList();
  let list_product_of_menu = [];

  if (category == 'home') {
    // Nếu là "home sản phẩm", hiển thị tất cả sản phẩm
    list_product_of_menu = products;
  } else {
    // Lọc sản phẩm theo nhóm/category
    list_product_of_menu = products.filter(product => product.category == category);
  }
  // Đặt lại trang hiện tại về 1 khi người dùng chọn nhóm mới
  currentPage = 1;
  // Hiển thị danh sách sản phẩm đã lọc
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
    // Cuộn lên
    listMenu.style.top = '60px'; // Dịch lên
  }

  lastScrollTop = currentScrollTop; // Cập nhật vị trí cuộn
});

//******CHUYỂN ẢNH POSTER******* */
let poster = document.getElementById("poster");
let images = [
  "assets/images/admin/poster_2.jpg",
  "assets/images/admin/poster_3.jpg",
  "assets/images/admin/poster_4.jpg",
];
let currentIndex = 0;
// Hàm để thay đổi ảnh tự động
function changeImage() {
  currentIndex = (currentIndex + 1) % images.length; // Chuyển đến ảnh tiếp theo và quay lại đầu nếu đến cuối
  let currentItem = poster.children[currentIndex];
  currentItem.style.backgroundImage = `url(${images[currentIndex]})`;
  // Cuộn tự động đến ảnh tiếp theo sau mỗi 3 giây
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
  filter = input.value.toLowerCase(); // Chuyển giá trị input thành chữ thường
  productlist = document.getElementById('productList');
  products = productlist.getElementsByClassName('product-item');

  open_product('home');

  // Lặp qua home sản phẩm và ẩn hoặc hiển thị dựa trên tìm kiếm
  for (i = 0; i < products.length; i++) {
    txtValue = products[i].textContent || products[i].innerText;
    if (txtValue.toLowerCase().indexOf(filter) > -1) {
      products[i].style.display = "flex"; // Hiển thị sản phẩm
    } else {
      products[i].style.display = "none"; // Ẩn sản phẩm
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
    // Nếu là "home sản phẩm", hiển thị home sản phẩm
    danhsach_sp = products;
  } else {
    // Lọc sản phẩm theo nhóm/category
    danhsach_sp = products.filter(product => product.category == category);
  }
  // Hiển thị danh sách sản phẩm đã lọc
  lietke_price(danhsach_sp);
}

function lietke_price(products) {
  let min_price = parseFloat(document.getElementById('min-price').value) || null;
  let max_price = parseFloat(document.getElementById('max-price').value) || null;
  let productlist = document.getElementById('productList');
  productlist.innerHTML = ''; // Xóa nội dung cũ

  if (products.length == 0) {
    productlist.innerHTML = 'Chưa có sản phẩm nào.';
  } else {
    let foundProduct = false; // Biến kiểm tra có sản phẩm thỏa mãn không

    products.forEach((product, index) => {
      if (
        (min_price === null && max_price === null) ||  // Không có giới hạn giá
        (min_price !== null && max_price !== null && product.price >= min_price && product.price <= max_price) ||  // Có cả min_price và max_price
        (min_price !== null && max_price === null && product.price >= min_price) ||  // Chỉ có min_price
        (min_price === null && max_price !== null && product.price <= max_price)    // Chỉ có max_price
      ) {
        foundProduct = true; // Có ít nhất một sản phẩm thỏa mãn điều kiện giá

        let productDiv = document.createElement('div');
        productDiv.classList.add('product-item');
        productDiv.innerHTML = `
          <img src="${product.img}" alt="${product.title}">
          <h3>${product.title}</h3>
          <p>Giá: ${product.price} VND</p>
          <button onclick="themvaogiohang(${index})">Đặt hàng</button>
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

  // Lấy home các sản phẩm đang được hiển thị (home các div có class 'product-item')
  let productItems = Array.from(productlist.getElementsByClassName('product-item'));

  // Kiểm tra nếu không có sản phẩm nào hiển thị
  if (productItems.length === 0) {
    return;  // Không làm gì nếu không có sản phẩm hiển thị
  }

  // Lấy giá sản phẩm từ các phần tử đang hiển thị
  let sortedProductItems = productItems.sort((a, b) => {
    // Lấy giá của sản phẩm từ các phần tử HTML
    let priceA = parseFloat(a.querySelector('p').innerText.replace('Giá: ', '').replace(' VND', '').trim());
    let priceB = parseFloat(b.querySelector('p').innerText.replace('Giá: ', '').replace(' VND', '').trim());

    // So sánh giá (giảm dần hoặc tăng dần tùy theo yêu cầu)
    return priceA - priceB; // Tăng dần (đổi thành priceB - priceA để giảm dần)
  });

  // Làm rỗng danh sách sản phẩm hiện tại
  productlist.innerHTML = '';

  // Thêm lại các sản phẩm đã được sắp xếp vào trong `productList`
  sortedProductItems.forEach(item => productlist.appendChild(item));
}


//GIÁ GIẢM DẦN
function search_price_cao_thap() {
  let productlist = document.getElementById('productList');

  // Lấy home các sản phẩm đang được hiển thị (home các div có class 'product-item')
  let productItems = Array.from(productlist.getElementsByClassName('product-item'));

  // Kiểm tra nếu không có sản phẩm nào hiển thị
  if (productItems.length === 0) {
    return;  // Không làm gì nếu không có sản phẩm hiển thị
  }

  // Lấy giá sản phẩm từ các phần tử đang hiển thị
  let sortedProductItems = productItems.sort((a, b) => {
    // Lấy giá của sản phẩm từ các phần tử HTML
    let priceA = parseFloat(a.querySelector('p').innerText.replace('Giá: ', '').replace(' VND', '').trim());
    let priceB = parseFloat(b.querySelector('p').innerText.replace('Giá: ', '').replace(' VND', '').trim());

    // So sánh giá (giảm dần hoặc tăng dần tùy theo yêu cầu)
    return priceB - priceA;
  });

  // Làm rỗng danh sách sản phẩm hiện tại
  productlist.innerHTML = '';

  // Thêm lại các sản phẩm đã được sắp xếp vào trong `productList`
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
    totalAmountElement.textContent = '180.000 đ'; // Tiền hàng (không có phí vận chuyển)
  }
}

function updateShippingFee(option) {
  // Reset tất cả các nút
  document.querySelectorAll('.delivery-options button').forEach(function (button) {
    button.classList.remove('selected');  // Loại bỏ lớp 'selected' ở tất cả các nút
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

  // Kiểm tra xem thông tin người nhận có đầy đủ không
  if (!name || !phone || !address) {
    document.getElementById('error-message').style.display = 'block';
    return; // Dừng lại nếu thiếu thông tin
  }

  // Xử lý ghi chú
  let note = document.getElementById('note').value;
  console.log('Ghi chú:', note); // Có thể gửi ghi chú khi gửi đơn hàng

  // Thực hiện gửi thông tin đơn hàng ở đây (ví dụ, gửi lên server)
  alert('Đơn hàng của bạn đã được đặt!');
}

// Đảm bảo thông báo lỗi chỉ hiển thị khi cần
document.getElementById('customer-form').addEventListener('input', function () {
  document.getElementById('error-message').style.display = 'none';
});


//***********************8 */
//hàm chuyển thanh công cụ
let isMoved = 0;

function moveto() {
  let header_aside = document.getElementById('header-aside');

  // Chuyển đổi giữa hai trạng thái di chuyển
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

  // Hiện div cha và overlay
  overlay.style.display = 'block';

  // Ẩn form đăng ký và hiện form đăng nhập
  tk.style.display = 'block';
}
//OPEN_ACCOUNT
function open_account_log_in() {
  var account_log_in = document.getElementById("account-log-in");
  var account_sign_up = document.getElementById("account-sign-up");
  var overlay = document.getElementById("overlay");

  // Hiện div cha và overlay
  overlay.style.display = 'block';

  // Ẩn form đăng ký và hiện form đăng nhập
  account_log_in.style.display = 'block';
  account_sign_up.style.display = 'none';
}

function open_account_sign_up() {
  var account_log_in = document.getElementById("account-log-in");
  var account_sign_up = document.getElementById("account-sign-up");
  var overlay = document.getElementById("overlay");

  // Hiện div cha và overlay
  overlay.style.display = 'block';
  account_log_in.style.display = 'none';
  // Ẩn form đăng nhập và hiện form đăng ký
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
    top: main.offsetTop - 110,  // Cuộn tới vị trí phần tử main, điều chỉnh khoảng cách (1250px)
    behavior: "smooth"          // Cuộn mượt mà
  });
});

new1.addEventListener("click", function () {
  // Cuộn đến phần tử main
  window.scrollTo({
    top: main.offsetTop - 110,  // Cuộn tới vị trí phần tử main, điều chỉnh khoảng cách (1250px)
    behavior: "smooth"          // Cuộn mượt mà
  });
});
burger.addEventListener("click", function () {
  // Cuộn đến phần tử main
  window.scrollTo({
    top: main.offsetTop - 110,  // Cuộn tới vị trí phần tử main, điều chỉnh khoảng cách (1250px)
    behavior: "smooth"          // Cuộn mượt mà
  });
});
chicken.addEventListener("click", function () {
  // Cuộn đến phần tử main
  window.scrollTo({
    top: main.offsetTop - 110,  // Cuộn tới vị trí phần tử main, điều chỉnh khoảng cách (1250px)
    behavior: "smooth"          // Cuộn mượt mà
  });
});
combo.addEventListener("click", function () {
  // Cuộn đến phần tử main
  window.scrollTo({
    top: main.offsetTop - 110,  // Cuộn tới vị trí phần tử main, điều chỉnh khoảng cách (1250px)
    behavior: "smooth"          // Cuộn mượt mà
  });
});
drink.addEventListener("click", function () {
  // Cuộn đến phần tử main
  window.scrollTo({
    top: main.offsetTop - 110,  // Cuộn tới vị trí phần tử main, điều chỉnh khoảng cách (1250px)
    behavior: "smooth"          // Cuộn mượt mà
  });
});
search_input.addEventListener("click", function () {
  // Cuộn đến phần tử main
  window.scrollTo({
    top: main.offsetTop - 110,  // Cuộn tới vị trí phần tử main, điều chỉnh khoảng cách (1250px)
    behavior: "smooth"          // Cuộn mượt mà
  });
});
loc_sanpham.addEventListener("click", function () {
  // Cuộn đến phần tử main
  window.scrollTo({
    top: main.offsetTop - 110,  // Cuộn tới vị trí phần tử main, điều chỉnh khoảng cách (1250px)
    behavior: "smooth"          // Cuộn mượt mà
  });
});
