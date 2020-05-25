console.log('Pidetuchuche.com!');

var interval = setInterval(function() {
  if (window.location.hash)
    window.location = window.location.hash;
}, 100);
 setTimeout(function() { clearInterval(interval); }, 1000);


let resultado = document.getElementById('container-product');
let sel = document.getElementById('product_category')
let sel1 = document.getElementById('product_category1')
let pContainer = document.getElementById('container-products');
let sellContainer = document.getElementById('bodySell')
let principalContainer = document.getElementById('principalContainer');
let createProductContainer = document.getElementById('createProductContainer');
let bebidas = document.getElementById('bebidas')
let chocolates = document.getElementById('chocolates')
let combos = document.getElementById('combos')
let dulces = document.getElementById('dulces')
let salados = document.getElementById('salados')
let editProductContainer = document.getElementById('editProduct');
const url = 'https://pidetuchuche-backend.herokuapp.com';
const req = new XMLHttpRequest();



let scroll = document.getElementById('scrollButton');


function scrollHeight() {
  window.scrollBy(0, height);
}




//filter
function filter() {
  let searchInput = document.getElementById('search1');
  console.log('Se esta buscando:: ', searchInput.value)
  let filterValue = searchInput.value.toUpperCase();
  let productList = document.getElementById('container-products');
  let element = productList.getElementsByClassName('wrapper')
  for (let i = 0; i < element.length; i++) {
    let a = element[i].getElementsByTagName('h1')[0];
    if (a.innerHTML.toUpperCase().indexOf(filterValue) > -1 ) {
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
        console.log('Productos Arreglo:: ',productsArray)
        console.log('Categoria:: ',id)
            for (let i = 0; i < productsArray.length; i++) { // <-----ciclo que recorre los productos

                  if (productsArray[i].categorias.length > 0) {

                      for (let j = 0; j < productsArray[i].categorias.length; j++) { // <-----ciclo que recorre las categorias de cada producto

                        let nombreP = productsArray[i].categorias[j].nombre
                            if (nombreP.toUpperCase() === id.toUpperCase()) {
                              element[i].style.display = "";
                              AOS.refresh();
                              i++;
                            } else {
                              element[i].style.display = "none";
                              AOS.refresh();
                            }
                      }
                  } else if (productsArray[i].categorias.length === 0) {
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


bebidas.addEventListener("click", function() {
  filterTag(bebidas.id)
}, false);
chocolates.addEventListener("click", function() {
  filterTag(chocolates.id)
}, false);
combos.addEventListener("click", function() {
  filterTag(combos.id)
}, false);
dulces.addEventListener("click", function() {
  filterTag(dulces.id)
}, false);
salados.addEventListener("click", function() {
  filterTag(salados.id)
}, false);


function getProductsPrincipal() {
  req.open('GET', url + '/productos-principal', true);
  req.onreadystatechange = function () {
    if(req.readyState === XMLHttpRequest.DONE) {
      let status = req.status;
      if (status === 0 || (200 >= status && status < 400)) {
        let productsPrincipal = JSON.parse(this.responseText);
        console.log('Productos Obtenidosssssssssss: ', productsPrincipal);
        for (let i = 0; i < 5; i++) {
          let div = document.createElement('div');
          div.classList.add("carousel-item");
          let tr = document.createElement('tr');
          tr.innerHTML = '<th scope="row">'+productsPrincipal.datos[i].nombre+'</th><td>' + productsPrincipal.datos[i].cantidad + '</td><td><input id="sellQuantity'+productsPrincipal.datos[i].id+'" class="form-control" type="number" name="" value=""></td><td><button onclick="sellProduct('+productsPrincipal.datos[i].id+')" type="button" class="btn btn-primary">Vender</button></td>'
          if (productsPrincipal.datos[i].categorias.length > 0){
            if (productsPrincipal.datos[i].descuento===null) {
              div.innerHTML = '<div class="principal-product"><div class="principal-card card-1"><div class="principal-text"><h1>'+productsPrincipal.datos[i].nombre+'</h1><h2>Precio</h2><h3>'+productsPrincipal.datos[i].precio_total+'$</h3><h4>Stock: 32</h4><p>Gomita Fini + Oreo + Pringle + Milka + Chips Ahoy</p><div><button data-toggle="modal" data-target="#buyInfo" type="button" name="button">Compra</button><button class="buttonUpdate" style="display:none"  data-toggle="modal" data-target="#editProduct" type="button" name="button">editar</button><button class="buttonDelete" style="display:none" type="button" name="button">borrar</button></div></div><img class="img-fluid img-principal" src="' + productsPrincipal.datos[i].ruta_imagen +  '" alt=""></div></div>';
            }else {
              div.innerHTML = '<div class="principal-product"><div class="principal-card card-1"><div class="principal-text"><h1>'+productsPrincipal.datos[i].nombre+'</h1><h2>Precio</h2><h3>'+productsPrincipal.datos[i].precio_total+'$</h3><h4>Stock: 32</h4><p>Gomita Fini + Oreo + Pringle + Milka + Chips Ahoy</p><div><button data-toggle="modal" data-target="#buyInfo" type="button" name="button">Compra</button><button class="buttonUpdate" style="display:none"  data-toggle="modal" data-target="#editProduct" type="button" name="button">editar</button><button class="buttonDelete" style="display:none" type="button" name="button">borrar</button></div></div><img class="img-fluid img-principal" src="' + productsPrincipal.datos[i].ruta_imagen +  '" alt=""></div></div>';
            }
          } else {
            if (productsPrincipal.datos[i].descuento===null) {
              div.innerHTML = '<div class="principal-product"><div class="principal-card card-1"><div class="principal-text"><h1>'+productsPrincipal.datos[i].nombre+'</h1><h2>Precio</h2><h3>'+productsPrincipal.datos[i].precio_total+'$</h3><h4>Stock: 32</h4><p>Gomita Fini + Oreo + Pringle + Milka + Chips Ahoy</p><div><button data-toggle="modal" data-target="#buyInfo" type="button" name="button">Compra</button><button class="buttonUpdate" style="display:none"  data-toggle="modal" data-target="#editProduct" type="button" name="button">editar</button><button class="buttonDelete" style="display:none" type="button" name="button">borrar</button></div></div><img class="img-fluid img-principal" src="' + productsPrincipal.datos[i].ruta_imagen +  '" alt=""></div></div>';
            }else {
              div.innerHTML = '<div class="principal-product"><div class="principal-card card-1"><div class="principal-text"><h1>'+productsPrincipal.datos[i].nombre+'</h1><h2>Precio</h2><h3>'+productsPrincipal.datos[i].precio_total+'$</h3><h4>Stock: 32</h4><p>Gomita Fini + Oreo + Pringle + Milka + Chips Ahoy</p><div><button data-toggle="modal" data-target="#buyInfo" type="button" name="button">Compra</button><button class="buttonUpdate" style="display:none"  data-toggle="modal" data-target="#editProduct" type="button" name="button">editar</button><button class="buttonDelete" style="display:none" type="button" name="button">borrar</button></div></div><img class="img-fluid img-principal" src="' + productsPrincipal.datos[i].ruta_imagen +  '" alt=""></div></div>';
            }
          }
          principalContainer.appendChild(div);
        }
      }
    }
  };
  req.send();
}



//GET ALL
function getProducts() {
  let token = sessionStorage.getItem('authToken');
  let deleted = document.getElementsByClassName('buttonDelete')
  let updated = document.getElementsByClassName('buttonUpdate')

  pContainer.innerHTML = '';
  sellContainer.innerHTML = '';
  req.open('GET', url + '/productos', true);
  req.onreadystatechange = function () {
    if(req.readyState === XMLHttpRequest.DONE) {
      let status = req.status;
      if (status === 0 || (200 >= status && status < 400)) {
        let products = JSON.parse(this.responseText);
        console.log('Productos Obtenidos:: ',products);
        getProductsPrincipal();
        for (let i = 0; i < products.datos.length; i++) {
          let div = document.createElement('div')
          let tr = document.createElement('tr');
          tr.innerHTML = '<th scope="row">'+products.datos[i].nombre+'</th><td>' + products.datos[i].cantidad + '</td><td><input id="sellQuantity'+products.datos[i].id+'" class="form-control" type="number" name="" value=""></td><td><button onclick="sellProduct('+products.datos[i].id+')" type="button" class="btn btn-primary">Vender</button></td>'
          if (products.datos[i].categorias.length > 0){
            if (products.datos[i].descuento===null) {
              div.innerHTML = '<div data-aos-offset="200" data-aos="flip-up" class="wrapper cards"><div class="row"> <div class="product-info col"><div class="product-text"><h1>' + products.datos[i].nombre + '</h1><h2>' + products.datos[i].categorias[0].nombre+ '</h2><h3>Precio: ' + products.datos[i].precio_total  + '$</h3><h4>Stock: ' + products.datos[i].cantidad + '</h4><p>' + products.datos[i].descripcion + '</p><div class="product-data"><button data-toggle="modal" data-target="#buyInfo" type="button" name="button">Compra</button><button class="buttonUpdate" style="display:none" onclick=(fillUpdate('+products.datos[i].id+')) data-toggle="modal" data-target="#editProduct" type="button" name="button">editar</button><button class="buttonDelete" style="display:none" onclick=(deleteProduct('+products.datos[i].id+')) type="button" name="button">borrar</button></div></div></div><div style="background-image: url(' + products.datos[i].ruta_imagen +  ');background-size: cover;background-position: center;" class="product-img col"></div></div></div>';
            }else {
              div.innerHTML = '<div data-aos-offset="200" data-aos="flip-up" class="wrapper cards"><div class="row"> <div class="product-info col"><div class="product-text"><h1>' + products.datos[i].nombre + '</h1><h2>' + products.datos[i].categorias[0].nombre+ '</h2><h3>Precio: ' + products.datos[i].precio_total  + '$</h3><h4>Stock: ' + products.datos[i].cantidad + '</h4><p>' + products.datos[i].descripcion + '</p><div class="product-data"><button data-toggle="modal" data-target="#buyInfo" type="button" name="button">Compra</button><button class="buttonUpdate" style="display:none" onclick=(fillUpdate('+products.datos[i].id+')) data-toggle="modal" data-target="#editProduct" type="button" name="button">editar</button><button class="buttonDelete" style="display:none" onclick=(deleteProduct('+products.datos[i].id+')) type="button" name="button">borrar</button></div></div></div><div style="background-image: url(' + products.datos[i].ruta_imagen +  ');background-size: cover;background-position: center;" class="product-img col"><div class="discount"><h1>'+products.datos[i].descuento+'%</h1><h2>de descuento</h2></div></div></div></div>';
            }

          } else {
            if (products.datos[i].descuento===null) {
              div.innerHTML = '<div data-aos="flip-up" class="wrapper cards"><div class="row"> <div class="product-info col"><div class="product-text"><h1>' + products.datos[i].nombre + '</h1><h3>Precio: ' + products.datos[i].precio_total  + '$</h3><h4>Stock: ' + products.datos[i].cantidad + '</h4><p>' + products.datos[i].descripcion + '</p><div class="product-data"><button data-toggle="modal" data-target="#buyInfo" type="button" name="button">Compra</button><button class="buttonUpdate" style="display:none" onclick=(fillUpdate('+products.datos[i].id+')) data-toggle="modal" data-target="#editProduct" type="button" name="button">editar</button><button class="buttonDelete" style="display:none" onclick=(deleteProduct('+products.datos[i].id+')) type="button" name="button">borrar</button></div></div></div><div style="background-image: url(' + products.datos[i].ruta_imagen +  ');background-size: cover;background-position: center;" class="product-img col"></div></div></div>';
            }else {
              div.innerHTML = '<div data-aos="flip-up" class="wrapper cards"><div class="row"> <div class="product-info col"><div class="product-text"><h1>' + products.datos[i].nombre + '</h1><h3>Precio: ' + products.datos[i].precio_total  + '$</h3><h4>Stock: ' + products.datos[i].cantidad + '</h4><p>' + products.datos[i].descripcion + '</p><div class="product-data"><button data-toggle="modal" data-target="#buyInfo" type="button" name="button">Compra</button><button class="buttonUpdate" style="display:none" onclick=(fillUpdate('+products.datos[i].id+')) data-toggle="modal" data-target="#editProduct" type="button" name="button">editar</button><button class="buttonDelete" style="display:none" onclick=(deleteProduct('+products.datos[i].id+')) type="button" name="button">borrar</button></div></div></div><div style="background-image: url(' + products.datos[i].ruta_imagen +  ');background-size: cover;background-position: center;" class="product-img col"><div class="discount"><h1>'+products.datos[i].descuento+'%</h1><h2>de descuento</h2></div></div></div></div>';
            }
          }
          pContainer.appendChild(div);
          sellContainer.appendChild(tr);
          if ((token) && (token !== undefined)){
            for (let j = 0; j < deleted.length; j++) {
              deleted[i].style.display = "";
              updated[i].style.display = "";
            }
          }
        }
      }
    }
  };
  req.send();

}




function deleteProduct(id) {
  let opcion = confirm("Clicka en Aceptar o Cancelar");
  if (opcion == true) {
    let token = sessionStorage.getItem('authToken');
    let tokenCapitalized = token.charAt(0).toUpperCase() + token.substring(1);
    req.open("DELETE", url + '/productos/' + id, true);
    req.setRequestHeader("Content-type", "application/json");
    req.setRequestHeader("Authorization", tokenCapitalized);
    req.onreadystatechange = function wait() {
      if (req.readyState === 4 && req.status === 200 ) {
        session = JSON.parse(this.responseText);
        alert('Producto eliminado');
        getProducts()
      }else if (req.status === 400) {
        alert('Se ha producido un error');
      }
    };
    req.send()
  } else {
    alert('La contraseña o el correo no es válido, vuelve a intentarlo.');
  }
}


//GET categories
function getCategorias() {
  req.open('GET', url + '/categorias', true);
  req.onreadystatechange = function () {
    if(req.readyState === XMLHttpRequest.DONE) {
      let status = req.status;
      if (status === 0 || (200 >= status && status < 400)) {
        let categories = JSON.parse(this.responseText);
        console.log('Categorias Obtenidas ::',categories);
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


function fillUpdate(productID) {
  let inputV1 = document.getElementById('inputV1');
  let inputV2 = document.getElementById('inputV2');
  let inputV3 = document.getElementById('inputV3');
  let inputV4 = document.getElementById('inputV4');
  let inputV5 = document.getElementById('inputV5');
  let inputV6 = document.getElementById('inputV6');
  let inputVIMG = document.getElementById('inputVIMG')
  console.log('id de producto a actualizar:: ', productID);

  req.open('GET', url + '/productos/' + productID, true);
  req.onreadystatechange = function () {
    if(req.readyState === XMLHttpRequest.DONE) {
      let status = req.status;
      if (status === 0 || (200 >= status && status < 400)) {
        let products = JSON.parse(this.responseText);
        inputV1.value = products.datos.nombre;
        inputV2.value = products.datos.descripcion;
        inputV3.value = products.datos.cantidad;
        inputV4.value = products.datos.prioridad;
        inputV5.value = products.datos.precio;
        inputV6.value = products.datos.descuento;
        inputVIMG.value ='';
        for (var k=0; k <= 4; k++) {
          document.getElementById(`categoriaV${k}`).checked = false;
          console.log(`Limpiando Todas las Categorias, ${k} limpiezas`)
        }
        if (products.datos.categorias.length > 0) {
              for (var i=0; i < products.datos.categorias.length; i++) {  //<---- Ciclo Recorre Categorias
                    for (var j=0; j <= 4; j++) {  //<---- Ciclo Recorre Checkboxes
                          if (products.datos.categorias[i].nombre === document.getElementById(`categoriaV${j}`).value ){
                            document.getElementById(`categoriaV${j}`).checked = true;
                            console.log('Agregando categoria :: ', document.getElementById(`categoriaV${j}`).value)
                          }
                    }
              }
        }
        productIDactual = products.datos.id;
      }
    }
  };
  req.send();
}



function editProduct() {
  let token = sessionStorage.getItem('authToken');
  let tokenCapitalized = token.charAt(0).toUpperCase() + token.substring(1);
  let product_name = document.getElementById('inputV1').value;
  let product_img = document.getElementById('inputVIMG');
  let product_description = document.getElementById('inputV2').value;
  let product_quantity = document.getElementById('inputV3').value;
  let product_priority = document.getElementById('inputV4').value;
  let product_price = document.getElementById('inputV5').value;
  let product_discount = document.getElementById('inputV6').value;

  let product_category = [];
  for (var i=0; i <= 4; i++) {
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
  req.onreadystatechange = function () {
    if(req.readyState === 4 && req.status === 200 ) {
      alert('Producto modificado');
      getProducts()
    } else if (req.status === 500){
      alert('Error')
    }
  }

  console.log('productoJSON actualizado:: ',productoJSON);
  req.send(productData);


}

function sellProduct(quantityID) {
  let token = sessionStorage.getItem('authToken');
  let tokenCapitalized = token.charAt(0).toUpperCase() + token.substring(1);
  let sellQuantity = document.getElementById('sellQuantity'+ quantityID).value;
  const productData = new FormData();
  productData.append("cantidad", sellQuantity);
  let producto = {};
  productData.forEach((value, key) => {
    producto[key] = value
  });
  let productoJSON = JSON.stringify(producto,2,2);
  req.open("POST", url + '/productos/venta/' + quantityID , true);
  req.setRequestHeader("Authorization", tokenCapitalized);
  req.onreadystatechange = function () {
    if(req.readyState === 4 && req.status === 200 ) {
      alert(sellQuantity+' Producto vendido');
      getProducts()
    } else if (req.status === 500){
      alert('Error')
    }
  }
  console.log('productoJSON vendido:: ', productoJSON);
  req.send(productData);



}


function createProduct() {
  let token = sessionStorage.getItem('authToken');
  let tokenCapitalized = token.charAt(0).toUpperCase() + token.substring(1);
  let product_name = document.getElementById('product_name').value;
  let product_img = document.getElementById('product_img');
  let product_description = document.getElementById('product_description').value;
  let product_quantity = document.getElementById('product_quantity').value;
  let product_priority = document.getElementById('product_priority').value;
  let product_price = document.getElementById('product_price').value;
  let product_discount = document.getElementById('product_discount').value;

  let product_category = [];
  for (var i = 0; i <= 4; i++) {
    if (document.getElementById(`categoria${[i]}`).checked === true) {
      product_category.push(document.getElementById(`categoria${[i]}`).value)
    }
  }


  const productData = new FormData();

  if (product_img.files[0] !== undefined) {
    productData.append("imagen", product_img.files[0]);
  }
  productData.append("nombre", product_name);
  productData.append("descripcion", product_description);
  productData.append("cantidad", product_quantity);
  productData.append("prioridad", product_priority);
  productData.append("precio", product_price);
  productData.append("descuento", product_discount);
  if (product_category.length > 0) {
    productData.append("categorias", JSON.stringify(product_category));
  }
  ;
  let producto = {};
  productData.forEach((value, key) => {
    producto[key] = value
  });
  let productoJSON = JSON.stringify(producto, 2, 2);

  req.open("POST", url + '/productos', true);
  req.setRequestHeader("Authorization", tokenCapitalized);
  req.onreadystatechange = function () {
    if(req.readyState === 4 && req.status === 201 ) {

      alert('Producto creado');
      getProducts()
    } else if (req.status === 500){
      alert('Error')
    }
  }
  console.log('productoJSON creado:: ', productoJSON);
  req.send(productData);

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
        sessionStorage.setItem('authToken', authToken);
        createProductContainer.innerHTML = '<button data-dismiss="modal" type="button" class="btn btn-primary" data-toggle="modal" data-target="#createProduct">Crear producto</button><br><button data-dismiss="modal" type="button" class="btn btn-primary" data-toggle="modal" data-target="#sellProduct">Ventas</button><br><button onclick="destroySession();" data-dismiss="modal" type="button" class="btn btn-primary" data-toggle="modal" >Cerrar sesión</button>'

        for (let i = 0; i < deleted.length; i++) {
          deleted[i].style.display = "";
          updated[i].style.display = "";
        }

        alert('Bienvenido');
      }else if (req.status === 400) {
        alert('La contraseña o el correo no es válido, vuelve a intentarlo.');
      }
    };
    let user = document.getElementById('email').value;
    let pass = document.getElementById('password').value;
    let data = JSON.stringify({ "email": user, "password": pass });
    req.send(data);
  })
}

function destroySession() {
  sessionStorage.removeItem('authToken')
  alert('Sesión cerrada');
  location.reload();

}
