//**********ADMIN************/

// Lắng nghe sự kiện gửi form

// Chỉ số sản phẩm đang chỉnh sửa
let Index = -1;
document.getElementById('addProductForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Ngừng việc làm mới trang

  // Lấy giá trị từ form
  const id = document.getElementById('id').value.trim();
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const description = document.getElementById('description').value;
  const category = document.getElementById('category').value;
  const imgInput = document.getElementById('img');
  const file = imgInput.files[0];  // Lấy file ảnh được chọn

  // Kiểm tra xem ID có được nhập hay không
  if (!id) {
    alert("Vui lòng nhập ID sản phẩm.");
    return;  // Dừng lại nếu ID không được nhập
  }

  // Lấy danh sách sản phẩm từ localStorage
  const products = JSON.parse(localStorage.getItem('products')) || [];

  // Kiểm tra xem ID đã tồn tại chưa, ngoại trừ ID của sản phẩm hiện tại đang sửa
  const id_product_edit = products.some((product, idx) => product.id === id && idx !== Index);

  if (id_product_edit) {
    alert("ID sản phẩm đã tồn tại! Vui lòng nhập ID khác.");
    return; // Dừng lại nếu ID trùng
  }

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const imageUrl = e.target.result;  // Đây là URL base64 của ảnh

      // Tạo đối tượng sản phẩm mới
      const newProduct = {
        id: id,
        title: name,
        price: price,
        description: description,
        category: category,
        img: imageUrl,  // URL ảnh được đọc từ FileReader
      };

      if (Index >= 0) {
        // Nếu đang chỉnh sửa, cập nhật sản phẩm
        updateProduct(Index, newProduct);
      } else {
        // Nếu không, thêm sản phẩm mới
        addProduct(newProduct);
      }

      document.getElementById('addProductForm').reset(); // Xóa dữ liệu trong form sau khi thêm
      Index = -1; // Đặt lại chỉ số chỉnh sửa
      displayProducts(); // Cập nhật danh sách sản phẩm hiển thị
    };

    // Đọc file ảnh dưới dạng base64 (Data URL)
    reader.readAsDataURL(file);
  }
});

// Kiểm tra và khởi tạo danh sách sản phẩm nếu chưa có trong localStorage . CHỖ NÀY ĐANG CÓ THỂ BỎ 
function createproductList() {
  if (localStorage.getItem('products') === null) {
    const defaultProducts = [
      {
        id: '1',
        title: 'MÓN MỚI KO BÁN',
        price: 200000,
        description: 'Một món chay ngon miệng với nấm đùi gà...',
        category: 'new',
        img: 'assets/images/products/new/1.jpg',
      },
      {
        id: '2',
        title: 'COMBO KO NGON',
        price: 200000,
        description: 'Một món chay ngon miệng với nấm đùi gà...',
        category: 'combo',
        img: 'assets/images/products/combo/101.png',
      },
      {
        id: '3',
        title: 'BURGER KẸP VÀNG',
        price: 200000,
        description: 'Một món chay ngon miệng với nấm đùi gà...',
        category: 'burger',
        img: 'assets/images/products/burger/201.png',
      },
      {
        id: '4',
        title: 'GÀ HẢO HẠN',
        price: 200000,
        description: 'Một món chay ngon miệng với nấm đùi gà...',
        category: 'chicken',
        img: 'assets/images/products/chicken/301.jpg',
      },
      {
        id: '5',
        title: 'DRINK KHẠC KHỌT',
        price: 200000,
        description: 'Một món chay ngon miệng với nấm đùi gà...',
        category: 'drink',
        img: 'assets/images/products/drink/401.jpg',
      }
    ];
    localStorage.setItem('products', JSON.stringify(defaultProducts));
  }
}


// Hiển thị danh sách sản phẩm trong admin
function displayProducts() {
  createproductList();
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const productList = document.getElementById('productList');
  productList.innerHTML = ''; // Xóa nội dung cũ

  if (products.length === 0) {
    productList.innerHTML = 'Tìm kiếm không có kết quả <br> Xin lỗi, chúng tôi không thể tìm được kết quả hợp với tìm kiếm của bạn';
  } else {
    console.log(products.length); // Kiểm tra số sản phẩm
    products.forEach((product, index) => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product-item');
      productDiv.innerHTML = `
        <img src="${product.img}" alt="${product.title}">
        <p>ID: ${product.id}</p>
        <h3>Tên : ${product.title}</h3>
        <p>Mô tả : ${product.description}</p>
        <p>Giá: ${product.price} VND</p>
        <p>Danh mục: ${product.category}</p>
        <button onclick="editProduct(${index})">Sửa</button>
        <button onclick="deleteProduct(${index})">Xóa</button>
      `;
      productList.appendChild(productDiv); //thêm 1 div con vào div cha
    });
  }
}


// Thêm sản phẩm vào localStorage
function addProduct(newProduct) {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  products.push(newProduct);
  localStorage.setItem('products', JSON.stringify(products));
  displayProducts(); // Cập nhật danh sách sản phẩm hiển thị
}


// Cập nhật sản phẩm trong localStorage
function updateProduct(index, updatedProduct) {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  products[index] = updatedProduct;
  localStorage.setItem('products', JSON.stringify(products));
  displayProducts(); // Cập nhật danh sách sản phẩm hiển thị
}

// Xóa sản phẩm khỏi localStorage
function deleteProduct(index) {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  products.splice(index, 1); // Xóa sản phẩm
  localStorage.setItem('products', JSON.stringify(products)); // Lưu lại vào localStorage
  displayProducts(); // Cập nhật danh sách sản phẩm hiển thị
}

// Chỉnh sửa sản phẩm
function editProduct(index) {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const product = products[index];

  // Điền thông tin vào form
  document.getElementById('name').value = product.title;
  document.getElementById('price').value = product.price;
  document.getElementById('description').value = product.description;
  document.getElementById('category').value = product.category;

  Index = index; // Lưu chỉ số sản phẩm đang chỉnh sửa
}

// Hiển thị danh sách sản phẩm trong main
function displayProductsMain() {
  createproductList();
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const productList = document.getElementById('productList');
  productList.innerHTML = ''; // Xóa nội dung cũ

  if (products.length == 0) {
    productList.innerHTML = 'Không có sản phẩm.';
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
      productList.appendChild(productDiv);
    });
  }
}

// Khởi tạo danh sách sản phẩm khi trang được tải
window.onload = function () {
    // Kiểm tra trang hiện tại và gọi hàm thích hợp
  if (window.location.href.includes('admin.html')) {
    displayProducts(); // Hiển thị sản phẩm cho trang admin
  }
  if (window.location.href.includes('main.html')) {
    displayProductsMain(); // Hiển thị lại danh sách sản phẩm
  }
};







//************TẠO PHÂN TRANG**************** */
