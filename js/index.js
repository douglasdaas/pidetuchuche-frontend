console.log('hola');



let resultado = document.getElementById('container-product');
let sel = document.getElementById('product_category')
let sel1 = document.getElementById('product_category1')
let pContainer = document.getElementById('container-products');
let createProductContainer = document.getElementById('createProductContainer');
const url = 'https://pidetuchuche-backend.herokuapp.com';
const req = new XMLHttpRequest();


let height = document.getElementById('vhele').clientHeight;
let scroll = document.getElementById('scrollButton');


function scrollHeight() {
  window.scrollBy(0, height);
}



//filter
function filter() {
  console.log('epaoeoe');
  let searchInput = document.getElementById('search');
  let filterValue = searchInput.value.toUpperCase();
  let productList = document.getElementById('container-products');
  let element = productList.getElementsByClassName('wrapper')
  console.log(element);
  for (let i = 0; i < element.length; i++) {
    let a = element[i].getElementsByTagName('h1')[0];
    if (a.innerHTML.toUpperCase().indexOf(filterValue) > -1 ) {
      element[i].style.display = "";
    }else {
      element[i].style.display = "none";
    }
  }
}




//GET ALL
function getProducts() {
  req.open('GET', url + '/productos', true);
  req.onreadystatechange = function () {
    if(req.readyState === XMLHttpRequest.DONE) {
      let status = req.status;
      if (status === 0 || (200 >= status && status < 400)) {
        let products = JSON.parse(this.responseText);
        console.log(products);
        for (let i = 0; i < products.datos.length; i++) {
          let div = document.createElement('div')
          div.innerHTML = '<div class="wrapper cards"> <div class="row"> <div class="product-info col"><div class="product-text"><h1>' + products.datos[i].nombre + '</h1><h2>' + products.datos[i].categorias + '</h2><h3>Precio: ' + products.datos[i].precio_total  + '$</h3><h4>Stock: ' + products.datos[i].cantidad + '</h4><p>' + products.datos[i].descripcion + '</p><div class="product-data"><button data-toggle="modal" data-target="#buyInfo" type="button" name="button">Compra</button></div></div></div><div class="product-img col"><img id="productImage" style="background-image: url(' + products.datos[i].ruta_imagen +  ');background-size: cover;background-position: center;height: 320px;" class="img-fluid img-container"></div></div></div>';
          pContainer.appendChild(div);
        }
      }
    }
  };
  req.send();
}



//GET categories
function getCategorias() {
  req.open('GET', url + '/categorias', true);
  req.onreadystatechange = function () {
    if(req.readyState === XMLHttpRequest.DONE) {
      console.log('done');
      let status = req.status;
      if (status === 0 || (200 >= status && status < 400)) {
        let categories = JSON.parse(this.responseText);
        console.log(categories);
        for (let i = 0; i < categories.datos.length; i++) {
          let opt = document.createElement('option');
          opt.innerHTML = categories.datos[i].nombre;
          opt.value = categories.datos[i].nombre;
          sel.appendChild(opt);
          let opt1 = opt.cloneNode(true);
          sel1.appendChild(opt1);
        }
      }
    }
  };
  req.send();
}



window.onload = function() {
  scroll.addEventListener("click", scrollHeight);
  getCategorias();
  getProducts();
};


function printTok() {
  let token = localStorage.getItem('authToken')
  let tokenCapitalized = token.charAt(0).toUpperCase() + token.substring(1);
  console.log(token);
  console.log(tokenCapitalized);
  console.log('hola');
}

function createProduct() {
  let token = localStorage.getItem('authToken');
  let tokenCapitalized = token.charAt(0).toUpperCase() + token.substring(1);
  let product_name = document.getElementById('product_name').value;
  let product_img = document.getElementById('product_img');
  let product_description = document.getElementById('product_description').value;
  let product_quantity = document.getElementById('product_quantity').value;
  let product_priority = document.getElementById('product_priority').value;
  let product_price = document.getElementById('product_price').value;
  let product_discount = document.getElementById('product_discount').value;

  let product_category = [];
  for (var i=0; i <= 9; i++) {
    if (document.getElementById(`categoria${[i]}`).checked === true){
      product_category.push(document.getElementById(`categoria${[i]}`).value)
    }
  }

  const productData = new FormData();

  if (product_img.files[0] !== undefined){
    productData.append("imagen", product_img.files[0]);
  }
  productData.append("nombre", product_name);
  productData.append("descripcion", product_description);
  productData.append("cantidad", product_quantity);
  productData.append("prioridad", product_priority);
  productData.append("precio", product_price);
  productData.append("descuento", product_discount);
  if (product_category.length>0) {
    productData.append("categorias",JSON.stringify(product_category));
  };
  let producto = {};
  productData.forEach((value, key) => {producto[key] = value});
  let productoJSON = JSON.stringify(producto,2,2);

  req.open("POST", url + '/productos', true);
  req.setRequestHeader("Authorization", tokenCapitalized);


  console.log('productoJSON:: ',productoJSON);
  console.log('productData:: ',productData);
  req.send(productData);
  alert('Producto creado');

}

//POST LOGIN
function loginOnClick() {
  let inicio = function(callback) {
    if (typeof callback === 'function') {
      callback();
    }
    else {
      alert('Algo salio mal');
    }
  }

  inicio(function login() {
    let serverResponse = document.getElementById('serverResponse');
    req.open("POST", url + '/login', true);
    req.setRequestHeader("Content-type", "application/json");
    req.onreadystatechange = function wait() {
      if (req.readyState === 4 && req.status === 200 ) {
        session = JSON.parse(this.responseText);
        let sessionToken = session.data;
        let authToken = sessionToken.type + ' ' + sessionToken.token;
        localStorage.setItem('authToken', authToken );
        createProductContainer.innerHTML = '<button data-dismiss="modal" type="button" class="btn btn-primary" data-toggle="modal" data-target="#createProduct">Crear producto</button>'
        alert('Bienvenido');
      }else if (req.status === 400) {
        alert('Teequivocaste');
      }
    };
    let user = document.getElementById('email').value;
    let pass = document.getElementById('password').value;
    let data = JSON.stringify({ "email": user, "password": pass });
    req.send(data);
  })
}
