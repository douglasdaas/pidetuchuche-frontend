console.log('hola');



let resultado = document.getElementById('container-product');
let sel = document.getElementById('product_category')
let sel1 = document.getElementById('product_category1')
let pContainer = document.getElementById('container-products');
let createProductContainer = document.getElementById('createProductContainer');
let alimentos = document.getElementById('alimentos')
let bebidas = document.getElementById('bebidas')
let chocolates = document.getElementById('chocolates')
let cereal = document.getElementById('cereal')
let gomitas = document.getElementById('gomitas')
let papitas = document.getElementById('papitas')
let ramen = document.getElementById('ramen')
let galletas = document.getElementById('galletas')
let combos = document.getElementById('combos')
let chicles = document.getElementById('chicles')
let editProductContainer = document.getElementById('editProduct');
const url = 'https://pidetuchuche-backend.herokuapp.com';
const req = new XMLHttpRequest();


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
      console.log(a.innerHTML.toUpperCase().indexOf(filterValue));
      element[i].style.display = "";
      AOS.refresh();
    }else {
      element[i].style.display = "none";
      AOS.refresh();
    }
  }
}


function filterTag(id) {
  let productList = document.getElementById('container-products');
  let element = productList.getElementsByClassName('wrapper')
  element[0].style.display = "none";


  req.open('GET', url + '/productos', true);
  req.onreadystatechange = function () {
    if(req.readyState === XMLHttpRequest.DONE) {
      let status = req.status;
      if (status === 0 || (200 >= status && status < 400)) {
        let products = JSON.parse(this.responseText);

        let productsArray = products.datos
        for (let i = 0; i < productsArray.length; i++) {
          let nombreP = productsArray[i].categorias[0].nombre
          console.log();
          if (nombreP.toUpperCase() === id.toUpperCase()) {
            console.log(nombreP.toUpperCase());
            element[i].style.display = "";
            AOS.refresh();
          }else {
            element[i].style.display = "none";
            AOS.refresh();
          }
        }

      }
    }
  };
  req.send();

}

function showAll() {
  let productList = document.getElementById('container-products');
  let element = productList.getElementsByClassName('wrapper')

  for (let i = 0; i < element.length; i++) {
    element[i].style.display = "";
  }

}


alimentos.addEventListener("click", function() {
  filterTag(alimentos.id)
}, false);
bebidas.addEventListener("click", function() {
  filterTag(bebidas.id)
}, false);
chocolates.addEventListener("click", function() {
  filterTag(chocolates.id)
}, false);
cereal.addEventListener("click", function() {
  filterTag(cereal.id)
}, false);
gomitas.addEventListener("click", function() {
  filterTag(gomitas.id)
}, false);
papitas.addEventListener("click", function() {
  filterTag(papitas.id)
}, false);
ramen.addEventListener("click", function() {
  filterTag(ramen.id)
}, false);
galletas.addEventListener("click", function() {
  filterTag(galletas.id)
}, false);
combos.addEventListener("click", function() {
  filterTag(combos.id)
}, false);
chicles.addEventListener("click", function() {
  filterTag(chicles.id)
}, false);





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
          div.innerHTML = '<div data-aos="flip-up" class="wrapper cards"><div class="row"> <div class="product-info col"><div class="product-text"><h1>' + products.datos[i].nombre + '</h1><h3>Precio: ' + products.datos[i].precio  + '$</h3><h4>Stock: ' + products.datos[i].cantidad + '</h4><p>' + products.datos[i].descripcion + '</p><div class="product-data"><button data-toggle="modal" data-target="#buyInfo" type="button" name="button">Compra</button><button class="buttonUpdate" style="display:none" onclick=(fillUpdate('+products.datos[i].id+')) data-toggle="modal" data-target="#editProduct" type="button" name="button">editar</button><button class="buttonDelete" style="display:none" onclick=(deleteProduct('+products.datos[i].id+')) type="button" name="button">borrar</button></div></div></div><div class="product-img col"><img class="img-fluid" id="productImage" style="background-image: url(' + products.datos[i].ruta_imagen +  ');background-size: cover;background-position: center;height:100%;" class="img-fluid img-container"></div></div></div>';
          pContainer.appendChild(div);
        }
      }
    }
  };
  req.send();
}

function deleteProduct(id) {

  let opcion = confirm("Clicka en Aceptar o Cancelar");

  if (opcion == true) {
    let token = localStorage.getItem('authToken');
    let tokenCapitalized = token.charAt(0).toUpperCase() + token.substring(1);
    req.open("DELETE", url + '/productos/' + id, true);
    req.setRequestHeader("Content-type", "application/json");
    req.setRequestHeader("Authorization", tokenCapitalized);
    req.onreadystatechange = function wait() {
      if (req.readyState === 4 && req.status === 200 ) {
        session = JSON.parse(this.responseText);
        alert('Producto eliminado');
      }else if (req.status === 400) {
        alert('Teequivocaste');
      }
    };
    req.send()
  } else {
    alert('Teequivocaste');
  }

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

function fillUpdate(productID) {
  console.log('hola');
  let inputV1 = document.getElementById('inputV1');
  let inputV2 = document.getElementById('inputV2');
  let inputV3 = document.getElementById('inputV3');
  let inputV4 = document.getElementById('inputV4');
  let inputV5 = document.getElementById('inputV5');
  let inputV6 = document.getElementById('inputV6');
  console.log(productID);

  req.open('GET', url + '/productos/' + productID, true);
  req.onreadystatechange = function () {
    if(req.readyState === XMLHttpRequest.DONE) {
      let status = req.status;
      if (status === 0 || (200 >= status && status < 400)) {
        let products = JSON.parse(this.responseText);
        console.log(products);
        inputV1.value = products.datos.nombre;
        inputV2.value = products.datos.descripcion;
        inputV3.value = products.datos.cantidad;
        inputV4.value = products.datos.prioridad;
        inputV5.value = products.datos.precio;
        inputV6.value = products.datos.descuento;
        if (products.datos.categorias.length > 0){
          for (var i=0; i <= products.datos.categorias.length-1; i++) {
            for (var j=0; j <= 9; j++) {
              if (products.datos.categorias[i].nombre === document.getElementById(`categoriaV${j}`).value ){
                console.log(products.datos.categorias[i].nombre );
                console.log(document.getElementById(`categoriaV${j}`).value);
                document.getElementById(`categoriaV${j}`).setAttribute('checked', true);
              }
            }
          }
        } else {
          for (var k=0; k <= 9; k++) {
            document.getElementById(`categoriaV${k}`).checked = false;
          }
        }
        productIDactual = products.datos.id;
      }
    }
  };
  req.send();
}



function editProduct() {
  let token = localStorage.getItem('authToken');
  let tokenCapitalized = token.charAt(0).toUpperCase() + token.substring(1);
  let product_name = document.getElementById('inputV1').value;
  let product_img = document.getElementById('inputVIMG');
  let product_description = document.getElementById('inputV2').value;
  let product_quantity = document.getElementById('inputV3').value;
  let product_priority = document.getElementById('inputV4').value;
  let product_price = document.getElementById('inputV5').value;
  let product_discount = document.getElementById('inputV6').value;

  let product_category = [];
  for (var i=0; i <= 9; i++) {
    if (document.getElementById(`categoriaV${[i]}`).checked === true){
      product_category.push(document.getElementById(`categoriaV${[i]}`).value)
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

  req.open("PATCH", url + '/productos/' + productIDactual, true);
  req.setRequestHeader("Authorization", tokenCapitalized);


  console.log('productoJSON:: ',productoJSON);
  console.log('productData:: ',productData);
  req.send(productData);
  alert('Producto modificado');

  getProducts();

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
      console.log( document.getElementById(`categoria${[i]}`).checked)
      console.log( document.getElementById(`categoria${[i]}`).value)
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

  getProducts();

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
    let deleted = document.getElementsByClassName('buttonDelete')
    let updated = document.getElementsByClassName('buttonUpdate')
    req.open("POST", url + '/login', true);
    req.setRequestHeader("Content-type", "application/json");
    req.onreadystatechange = function wait() {
      if (req.readyState === 4 && req.status === 200 ) {
        session = JSON.parse(this.responseText);
        let sessionToken = session.data;
        let authToken = sessionToken.type + ' ' + sessionToken.token;
        localStorage.setItem('authToken', authToken );
        createProductContainer.innerHTML = '<button data-dismiss="modal" type="button" class="btn btn-primary" data-toggle="modal" data-target="#createProduct">Crear producto</button>'

        for (let i = 0; i < deleted.length; i++) {
          deleted[i].style.display = "";
          updated[i].style.display = "";
        }

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
