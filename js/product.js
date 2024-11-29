//**********ADMIN************/
// Lắng nghe sự kiện gửi form
let users = JSON.parse(localStorage.getItem('users')) || [];
let user = JSON.parse(localStorage.getItem('user')) || {};
let products = JSON.parse(localStorage.getItem('products')) || [];
let products_default = JSON.parse(localStorage.getItem('products_default')) || [];
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

  // Kiểm tra xem ID có được nhập hay không
  if (!id) {
    alert("Vui lòng nhập ID sản phẩm.");
    return;
  }

  // Kiểm tra xem ID đã tồn tại chưa, ngoại trừ ID của sản phẩm hiện tại đang sửa
  if (Id !== -1 && products.some(p => p.id === id && p.id !== Id)) {
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
      Id = -1;
      displayProducts();
    };

    // Đọc file ảnh dưới dạng base64 (Data URL)
    reader.readAsDataURL(file);
  }
});

function createproductList() {

  if (localStorage.getItem('products_default') === null) {
    let defaultProducts = [
      {
        id: '1',
        name: 'MÓN MỚI KO BÁN',
        price: 60000,
        description: 'Một món chay ngon miệng với nấm đùi gà...',
        quantity: '5',
        category: 'new',
        img: 'assets/images/products/new/1.jpg',
      },
      {
        id: '2',
        name: 'COMBO KO NGON',
        price: 50000,
        description: 'Một món chay ngon miệng với nấm đùi gà...',
        quantity: '5',
        category: 'combo',
        img: 'assets/images/products/combo/101.png',
      },
      {
        id: '3',
        name: 'BURGER KẸP VÀNG',
        price: 45000,
        description: 'Một món chay ngon miệng với nấm đùi gà...',
        quantity: '5',
        category: 'burger',
        img: 'assets/images/products/burger/201.png',
      },
      {
        id: '4',
        name: 'GÀ HẢO HẠN',
        price: 40000,
        description: 'Một món chay ngon miệng với nấm đùi gà...',
        quantity: '5',
        category: 'chicken',
        img: 'assets/images/products/chicken/301.jpg',
      },
      {
        id: '5',
        name: 'DRINK KHẠC KHỌT',
        price: 35000,
        description: 'Một món chay ngon miệng với nấm đùi gà...',
        quantity: '5',
        category: 'drink',
        img: 'assets/images/products/drink/401.jpg',
      },
      {
        id: '6',
        name: 'MÓN MỚI KO BÁN',
        price: 32000,
        description: 'Một món chay ngon miệng với nấm đùi gà...',
        quantity: '5',
        category: 'new',
        img: 'assets/images/products/new/2.jpg',
      },
      {
        id: '7',
        name: 'MÓN MỚI KO BÁN',
        price: 32000,
        description: 'Một món chay ngon miệng với nấm đùi gà...',
        quantity: '5',
        category: 'new',
        img: 'assets/images/products/new/3.jpg',
      },
      {
        id: '8',
        name: 'MÓN MỚI KO BÁN',
        price: 31000,
        description: 'Một món chay ngon miệng với nấm đùi gà...',
        quantity: '5',
        category: 'new',
        img: 'assets/images/products/new/4.jpg',
      },
      {
        id: '9',
        name: 'BURGER KẸP VÀNG',
        price: 30000,
        description: 'Một món chay ngon miệng với nấm đùi gà...',
        quantity: '5',
        category: 'burger',
        img: 'assets/images/products/burger/202.png',
      },
      {
        id: '10',
        name: 'BURGER KẸP VÀNG',
        price: 20000,
        description: 'Một món chay ngon miệng với nấm đùi gà...',
        quantity: '5',
        category: 'burger',
        img: 'assets/images/products/burger/203.png',
      },
      {
        id: '11',
        name: 'BURGER KẸP VÀNG',
        price: 21000,
        description: 'Một món chay ngon miệng với nấm đùi gà...',
        quantity: '5',
        category: 'burger',
        img: 'assets/images/products/burger/204.png',
      },
      {
        id: '12',
        name: 'GÀ HẢO HẠN',
        price: 22000,
        description: 'Một món chay ngon miệng với nấm đùi gà...',
        quantity: '5',
        category: 'chicken',
        img: 'assets/images/products/chicken/302.png',
      },
      {
        id: '13',
        name: 'DRINK KHẠC KHỌT',
        price: 23000,
        description: 'Một món chay ngon miệng với nấm đùi gà...',
        quantity: '5',
        category: 'drink',
        img: 'assets/images/products/drink/402.jpg',
      },
      {
        id: '14',
        name: 'GÀ HẢO HẠN',
        price: 24000,
        description: 'Một món chay ngon miệng với nấm đùi gà...',
        quantity: '5',
        category: 'chicken',
        img: 'assets/images/products/chicken/303.png',
      },
      {
        id: '15',
        name: 'DRINK KHẠC KHỌT',
        price: 25000,
        description: 'Một món chay ngon miệng với nấm đùi gà...',
        quantity: '5',
        category: 'drink',
        img: 'assets/images/products/drink/403.jpg',
      },
      {
        id: '16',
        name: 'GÀ HẢO HẠN',
        price: 26000,
        description: 'Một món chay ngon miệng với nấm đùi gà...',
        quantity: '5',
        category: 'chicken',
        img: 'assets/images/products/chicken/304.png',
      },
      {
        id: '17',
        name: 'DRINK KHẠC KHỌT',
        price: 27000,
        description: 'Một món chay ngon miệng với nấm đùi gà...',
        quantity: '5',
        category: 'drink',
        img: 'assets/images/products/drink/404.jpg',
      },
    ];
    products_default = defaultProducts;
    localStorage.setItem('products_default', JSON.stringify(products_default));
    localStorage.setItem('products', JSON.stringify(products_default));
  }
}


// Hiển thị danh sách sản phẩm trong admin
function displayProducts() {
  let productListA = document.getElementById('productListA');
  productListA.innerHTML = '';

  if (products.length === 0) {
    productListA.innerHTML = 'Chưa có sản phẩm admin !';
  } else {
    console.log(products.length);
    products.forEach((product) => {
      let productDiv = document.createElement('div');
      productDiv.classList.add('product-item');
      productDiv.innerHTML = `
        <img src="${product.img}" alt="${product.name}">
        <p>*ID: ${product.id}</p>
        <h3>*Tên : ${product.name}</h3>
        <p>*Mô tả : ${product.description}</p>
        <p>*Giá: ${product.price} VND</p>
        <p>*Số lượng : ${product.quantity}</p>
        <p>*Danh mục: ${product.category}</p>
        <button onclick="editProduct(${product.id})">Sửa</button>
        <button onclick="deleteProduct(${product.id})">Xóa</button>
      `;
      productListA.appendChild(productDiv);
    });
  }
}


// Thêm sản phẩm vào localStorage
function addProduct(newProduct) {
  products.push(newProduct);
  localStorage.setItem('products', JSON.stringify(products));
  displayProducts();
}


// Cập nhật sản phẩm trong localStorage
function updateProduct(Id, updatedProduct) {
  let index = products.findIndex(u => u.id == Id);
  if (index !== -1) {
    products[index] = updatedProduct;
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts(); 
  }
}

// Xóa sản phẩm khỏi localStorage
function deleteProduct(id) {
  let product1 = products.findIndex(u => u.id == id);
  products.splice(product1, 1);
  localStorage.setItem('products', JSON.stringify(products));
  displayProducts();
}

// Chỉnh sửa sản phẩm
function editProduct(productid) {
  let product = products.find(u => u.id == productid);

  document.getElementById('id').value = product.id;
  document.getElementById('name').value = product.name;
  document.getElementById('price').value = product.price;
  document.getElementById('quantity').value = product.quantity;
  document.getElementById('description').value = product.description;
  document.getElementById('category').value = product.category;

  Id = product.id;
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
