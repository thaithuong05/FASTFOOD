//**********ADMIN************/
// Lắng nghe sự kiện gửi form
let users = JSON.parse(localStorage.getItem('users')) || [];
let user = JSON.parse(localStorage.getItem('user')) || {};
let products = JSON.parse(localStorage.getItem('products')) || [];
let products_default = JSON.parse(localStorage.getItem('products_default')) || [];

function them_thanhcongAD() {
  var them_thanhcong = document.getElementById('them-spAD');
  them_thanhcong.style.display = 'block';
  them_thanhcong.style.opacity = 1;
  them_thanhcong.style.top = '25px';
  setTimeout(function () {
    them_thanhcong.style.display = 'none';
  }, 1000); // giây
}
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

function createproductList() {

  if (localStorage.getItem('products_default') === null) {
    let defaultProducts = [
      {
        id: '1',
        name: 'GÀ VS PEPSI',
        price: 50000,
        description: 'Một món combo với đùi gà và kèm 1 chai pepsi',
        quantity: '1',
        category: 'combo',
        img: 'assets/images/products/combo/102.png',
      },
      {
        id: '2',
        name: 'BURGER NHÂN CỪU',
        price: 30000,
        description: 'Một món burger kẹp rau xà lách nhân thịt cừu',
        quantity: '1',
        category: 'burger',
        img: 'assets/images/products/burger/211.png',
      },
      {
        id: '3',
        name: 'GÀ CHẤM RUỐC',
        price: 30000,
        description: 'Một món chay ngon miệng với gà chấm ruốc',
        quantity: '1',
        category: 'chicken',
        img: 'assets/images/products/chicken/311.png',
      },
      {
        id: '4',
        name: 'TRÀ SỮA',
        price: 30000,
        description: 'Một combo trà sửa full topping ',
        quantity: '5',
        category: 'drink',
        img: 'assets/images/products/drink/406.jpg',
      },
      {
        id: '5',
        name: 'BURGER NHÂN CHIÊN',
        price: 35000,
        description: 'Một món burger kẹp rau xà lách nhân thịt đã chiên',
        quantity: '1',
        category: 'burger',
        img: 'assets/images/products/burger/208.png',
      },
      {
        id: '6',
        name: 'NƯỚC ÉP DÂU',
        price: 35000,
        description: 'Một ly nước ép dâu ',
        quantity: '5',
        category: 'drink',
        img: 'assets/images/products/drink/408.jpg',
      },
      {
        id: '7',
        name: 'BÁNH VIÊN TRỨNG',
        price: 31000,
        description: 'Một món ngoài chiên giòn trong dầu với nhân trứng kèm bơ',
        quantity: '1',
        category: 'new',
        img: 'assets/images/products/new/6.jpg',
      },
      {
        id: '8',
        name: 'STRING ĐỎ',
        price: 10000,
        description: 'Một chai nước sting đỏ ',
        quantity: '5',
        category: 'drink',
        img: 'assets/images/products/drink/405.jpg',
      },
      {
        id: '9',
        name: 'BURGER KẸP PIZZA',
        price: 30000,
        description: 'Một món burger kẹp nhân thịt và cà chua',
        quantity: '1',
        category: 'burger',
        img: 'assets/images/products/burger/202.png',
      },
      {
        id: '10',
        name: 'BURGER NHÂN THỊT XAY',
        price: 20000,
        description: 'Một món burger với cà chua , rau và thịt xay',
        quantity: '1',
        category: 'burger',
        img: 'assets/images/products/burger/203.png',
      },
      {
        id: '11',
        name: 'BURGER RAU XÀ LÁCH',
        price: 21000,
        description: 'Một món burger kẹp rau xà lách nhân thịt',
        quantity: '1',
        category: 'burger',
        img: 'assets/images/products/burger/204.png',
      },
      {
        id: '12',
        name: 'GÀ NƯỚNG',
        price: 22000,
        description: 'Một món chay ngon miệng với đùi gà nướng',
        quantity: '5',
        category: 'chicken',
        img: 'assets/images/products/chicken/303.png',
      },
      {
        id: '13',
        name: 'NƯỚC LỌC',
        price: 9000,
        description: 'Một chai nước lọt a qua vi la',
        quantity: '5',
        category: 'drink',
        img: 'assets/images/products/drink/402.jpg',
      },
      {
        id: '14',
        name: 'GÀ MÁ ĐÙI',
        price: 24000,
        description: 'Một món chay ngon miệng với má đùi gà',
        quantity: '1',
        category: 'chicken',
        img: 'assets/images/products/chicken/307.png',
      },
      {
        id: '15',
        name: 'PEPSI',
        price: 25000,
        description: 'Một chai nước pepsi',
        quantity: '5',
        category: 'drink',
        img: 'assets/images/products/drink/403.jpg',
      },
      {
        id: '16',
        name: 'GÀ ĐÔNG TẢO',
        price: 26000,
        description: 'Một món chay ngon miệng với gà đông tảo',
        quantity: '1',
        category: 'chicken',
        img: 'assets/images/products/chicken/308.png',
      },
      {
        id: '17',
        name: 'PEPSI ĐEN',
        price: 27000,
        description: 'Một chai nước pepsi đen',
        quantity: '5',
        category: 'drink',
        img: 'assets/images/products/drink/404.jpg',
      },
      {
        id: '18',
        name: 'BÁNH Ô ĐA',
        price: 31000,
        description: 'Một món ngon với bột mì nhân thịt gà',
        quantity: '1',
        category: 'new',
        img: 'assets/images/products/new/5.jpg',
      },
      {
        id: '19',
        name: 'BÁNH XÈO NHÂN BƠ',
        price: 32000,
        description: 'Một món bánh xèo với nhân bơ béo ngậy tan ngay trong miệng',
        quantity: '1',
        category: 'new',
        img: 'assets/images/products/new/3.jpg',
      },
      {
        id: '20',
        name: 'BÁNH MÌ CHÁY XẠM',
        price: 60000,
        description: 'Một món bánh mì với phô mai cháy xạm kèm đậu phộng ',
        quantity: '1',
        category: 'new',
        img: 'assets/images/products/new/1.jpg',
      },
      {
        id: '21',
        name: 'CÁNH GÀ VS PEPSI',
        price: 50000,
        description: 'Một món combo với cánh gà và kèm 1 ly pepsi lớn',
        quantity: '1',
        category: 'combo',
        img: 'assets/images/products/combo/103.png',
      },
      {
        id: '22',
        name: 'BURGER CHIÊN THỊT',
        price: 31000,
        description: 'Một món burger chiên kẹp nhân thịt , rau xà lách',
        quantity: '1',
        category: 'burger',
        img: 'assets/images/products/burger/205.png',
      },
      {
        id: '23',
        name: 'BURGER NHÂN BÒ',
        price: 29000,
        description: 'Một món burger kẹp rau xà lách nhân thịt bò',
        quantity: '1',
        category: 'burger',
        img: 'assets/images/products/burger/206.png',
      },
      {
        id: '24',
        name: 'BURGER FULL',
        price: 50000,
        description: 'Một món burger kẹp rau xà lách nhân thịt đầy đủ',
        quantity: '1',
        category: 'burger',
        img: 'assets/images/products/burger/207.png',
      },
      {
        id: '25',
        name: 'XÚC XÍCH CHIÊN GIÒN',
        price: 32000,
        description: 'Một món xúc xích với 2 cây cỡ trung chiên ngập trong dầu oil',
        quantity: '1',
        category: 'new',
        img: 'assets/images/products/new/2.jpg',
      },
      {
        id: '26',
        name: 'BURGER TRỨNG CHIÊN',
        price: 25000,
        description: 'Một món burger kẹp rau xà lách nhân trứng chiên',
        quantity: '1',
        category: 'burger',
        img: 'assets/images/products/burger/209.png',
      },
      {
        id: '27',
        name: 'BURGER 2 LỚP',
        price: 21000,
        description: 'Một món burger kẹp rau xà lách nhân thịt 2 lớp',
        quantity: '1',
        category: 'burger',
        img: 'assets/images/products/burger/210.png',
      },
      {
        id: '28',
        name: 'GÀ VS COCA',
        price: 50000,
        description: 'Một món combo với 2 đùi gà chiên bơ kèm chai coca chai trung',
        quantity: '1',
        category: 'combo',
        img: 'assets/images/products/combo/101.png',
      },
      {
        id: '29',
        name: 'GÀ CHÁY ĐEN',
        price: 40000,
        description: 'Một món chay ngon miệng với gà nướng cháy đen',
        quantity: '1',
        category: 'chicken',
        img: 'assets/images/products/chicken/310.png',
      },
      {
        id: '30',
        name: 'BURGER KẸP THỊT NƯỚNG',
        price: 45000,
        description: 'Một món burder kẹp thịt nướng và rau thơm',
        quantity: '1',
        category: 'burger',
        img: 'assets/images/products/burger/201.png',
      },
      {
        id: '31',
        name: 'GÀ XỐT MỠ',
        price: 40000,
        description: 'Một món chay ngon miệng với gà xốt mỡ',
        quantity: '1',
        category: 'chicken',
        img: 'assets/images/products/chicken/313.png',
      },
      {
        id: '32',
        name: 'GÀ TƯƠNG',
        price: 26000,
        description: 'Một món chay ngon miệng với gà chấm tương',
        quantity: '1',
        category: 'chicken',
        img: 'assets/images/products/chicken/314.png',
      },
      {
        id: '33',
        name: 'XÚC XÍCH NHÂN TRỨNG',
        price: 31000,
        description: 'Một món ngon miệng với xúc xích nhân trứng trắng ',
        quantity: '1',
        category: 'new',
        img: 'assets/images/products/new/4.jpg',
      },
      {
        id: '34',
        name: 'GÀ CHIÊN',
        price: 40000,
        description: 'Một món chay ngon miệng với đùi gà ',
        quantity: '1',
        category: 'chicken',
        img: 'assets/images/products/chicken/302.png',
      },
      {
        id: '35',
        name: 'NƯỚC ÉP CAM',
        price: 35000,
        description: 'Một ly nước ép cam lớn ',
        quantity: '5',
        category: 'drink',
        img: 'assets/images/products/drink/407.jpg',
      },
      {
        id: '36',
        name: '7 UP',
        price: 35000,
        description: 'Một chai nước 7 up ',
        quantity: '5',
        category: 'drink',
        img: 'assets/images/products/drink/401.jpg',
      },
    ];
    products_default = defaultProducts;
    localStorage.setItem('products_default', JSON.stringify(products_default));
    localStorage.setItem('products', JSON.stringify(products_default));
  }
}



// Khởi tạo danh sách sản phẩm khi trang được tải
window.onload = function () {

  if (window.location.href.includes('admin.html')) {
    createproductList();
    displayProducts();
  }
  if (window.location.href.includes('main.html')) {
    createproductList();
    open_product('home');
  }

};
