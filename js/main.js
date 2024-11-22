
//************MAIN****************/


//Khi bấm các nút ở list menu
function open_product_of_team(products) {
  const productlist = document.getElementById('productList');
  productlist.innerHTML = ''; // Xóa nội dung cũ

  if (products.length == 0) {
    productlist.innerHTML = 'Chưa có sản phẩm nào.';
  } else {
    products.forEach((product, index) => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product-item');
      productDiv.innerHTML = `
        <img src="${product.img}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>Giá: ${product.price} VND</p>
        <button onclick="themvaogiohang(${index})">Đặt hàng</button>
      `;
      productlist.appendChild(productDiv);
    });
  }
}
function open_product(category) {
  const products = JSON.parse(localStorage.getItem('products')) || [];

  let list_product_of_menu = [];

  if (category == 'home') {
    // Nếu là "Tất cả sản phẩm", hiển thị tất cả sản phẩm
    list_product_of_menu = products;
  } else {
    // Lọc sản phẩm theo nhóm/category
    list_product_of_menu = products.filter(product => product.category == category);
  }
  // Hiển thị danh sách sản phẩm đã lọc
  open_product_of_team(list_product_of_menu);
}




// Lắng nghe sự kiện scroll
let lastScrollTop = 0; // Biến lưu vị trí cuộn trước đó

window.addEventListener('scroll', function() {
    const listMenu = document.getElementById('list-menu');
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

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
const poster = document.getElementById("poster");
const images = [
  "assets/images/admin/poster_2.jpg",
  "assets/images/admin/poster_3.jpg",
  "assets/images/admin/poster_4.jpg",
];
let currentIndex = 0;
// Hàm để thay đổi ảnh tự động
function changeImage() {
  currentIndex = (currentIndex + 1) % images.length; // Chuyển đến ảnh tiếp theo và quay lại đầu nếu đến cuối
  const currentItem = poster.children[currentIndex];
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
  
  // Lặp qua tất cả sản phẩm và ẩn hoặc hiển thị dựa trên tìm kiếm
  for (i = 0; i < products.length; i++) {
      txtValue = products[i].textContent || products[i].innerText;
      if (txtValue.toLowerCase().indexOf(filter) > -1) {
          products[i].style.display = "flex"; // Hiển thị sản phẩm
      } else {
          products[i].style.display = "none"; // Ẩn sản phẩm
      }
  }
} 






//hàm chuyển thanh công cụ
let isMoved=0;

function moveto() {
  const header_aside = document.getElementById('header-aside');

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
  var overlay = document.getElementById("overlay");

  shopping.style.display = 'none';
  account_log_in.style.display = 'none';
  account_sign_up.style.display = 'none';
  overlay.style.display = 'none';
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
  account_log_in.style.display= 'none';
  // Ẩn form đăng nhập và hiện form đăng ký
  account_sign_up.style.display = 'block';
}


//DỊCH CHUYỂN TỚI MAIN SẢN PHẨM KHI BẤM LIST_MENU
const home = document.getElementById("home");
const new1 = document.getElementById("new");
const burger = document.getElementById("burger");
const chicken = document.getElementById("chicken");
const combo = document.getElementById("combo");
const drink = document.getElementById("drink");
const search_input = document.getElementById("search-input");
const loc_sanpham = document.getElementById("loc-sanpham");

const main = document.getElementById("main");

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




//LƯU TÀI KHOẢN NGƯỜI DÙNG LÊN LOCALSTORAGE

// Khi người dùng nhấn đăng ký
document.getElementById('account-sign-up').addEventListener('submit', function(event) {
  event.preventDefault(); // Ngừng form reload lại trang

  // Lấy giá trị các trường nhập liệu
  const sign_up_username = document.getElementById('sign-up-username').value;
  const sign_up_tel = document.getElementById('sign-up-tel').value.trim();
  const sign_up_password = document.getElementById('sign-up-password').value;
  const sign_up_password1 = document.getElementById('sign-up-password1').value;
  const sign_up_checkbox = document.getElementById('sign-up-checkbox');

  let ktra_form = true; // Biến để kiểm tra tính hợp lệ của form

  // Kiểm tra tên đăng nhập
  if (!sign_up_username) {
    document.getElementById('error-username').textContent = "Tên đăng nhập không được để trống.";
    ktra_form = false;
  } else {
    document.getElementById('error-username').textContent = "";
  }

  // Kiểm tra số điện thoại
  if (!sign_up_tel) {
    document.getElementById('error-tel').textContent = "Số điện thoại không được để trống.";
    ktra_form = false;
  } else if (!/^\d{10}$/.test(sign_up_tel)) {  // Kiểm tra số điện thoại (10 chữ số)
    document.getElementById('error-tel').textContent = "Số điện thoại không hợp lệ.";
    ktra_form = false;
  } else {
    document.getElementById('error-tel').textContent = "";
  }

  // Kiểm tra mật khẩu
  if (!sign_up_password) {
    document.getElementById('error-password').textContent = "Mật khẩu không được để trống.";
    ktra_form = false;
  } else {
    document.getElementById('error-password').textContent = "";
  }

  // Kiểm tra xác nhận mật khẩu
  if (!sign_up_password1) {
    document.getElementById('error-password1').textContent = "Vui lòng xác nhận mật khẩu.";
    ktra_form = false;
  } else if (sign_up_password !== sign_up_password1) {
    document.getElementById('error-password1').textContent = "Mật khẩu xác nhận không khớp.";
    ktra_form = false;
  } else {
    document.getElementById('error-password1').textContent = "";
  }

  // Kiểm tra checkbox
  if (!sign_up_checkbox.checked) {
    document.getElementById('error-checkbox').textContent = "Bạn cần đồng ý điều khoản.";
    ktra_form = false;
  } else {
    document.getElementById('error-checkbox').textContent = "";
  }

  // Nếu tất cả hợp lệ, tiếp tục xử lý đăng ký
  if (ktra_form) {
    const user = {
      sign_up_username: sign_up_username,
      sign_up_tel: sign_up_tel,
      sign_up_password: sign_up_password // Trong thực tế, bạn nên mã hóa mật khẩu trước khi lưu
    };

    // Lưu thông tin vào localStorage
    localStorage.setItem('user', JSON.stringify(user));

    alert('Đăng ký thành công!');
    // reset form
    document.getElementById('account-sign-up').reset();
    // Đóng overlay nếu cần
    close_x_overlay();
  }
});




// Lấy thông tin từ localStorage và kiểm tra đăng nhập
document.getElementById('account-log-in').addEventListener('submit', function(event) {
  event.preventDefault(); // Ngừng form reload lại trang

  const log_in_tel = document.getElementById('log-in-tel').value.trim();
  const log_in_password = document.getElementById('log-in-password').value;
  const storedUser = JSON.parse(localStorage.getItem('user')); // Lấy thông tin người dùng từ localStorage

  // Kiểm tra xem có thông tin người dùng trong localStorage không
  if (storedUser) {
    // Kiểm tra số điện thoại và mật khẩu
    if (storedUser.sign_up_tel == log_in_tel && storedUser.sign_up_password == log_in_password) {
      // Nếu đăng nhập thành công
      alert('Đăng nhập thành công!');
      // Bạn có thể chuyển hướng người dùng tới trang khác hoặc thay đổi giao diện
      // Ví dụ: window.location.href = 'home.html'; (dẫn đến trang chính)
    } else {
      // Nếu mật khẩu hoặc số điện thoại không đúng
      document.getElementById('error-tel').textContent = 'Số điện thoại hoặc mật khẩu không đúng.';
    }
  } else {
    // Nếu không có thông tin người dùng trong localStorage
    document.getElementById('error-tel').textContent = 'Không tìm thấy tài khoản.';
  }
});
