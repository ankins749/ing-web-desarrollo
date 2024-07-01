// Referenciando los elementos
// admin listo 
const agregarproductoform = document.getElementById('agregar-producto-form');
const tablaboletas = document.querySelector('#ver-boletas table tbody');
console.log(agregarproductoform);


document.addEventListener('DOMContentLoaded', async () => {

    if (agregarproductoform) {
        agregarproductoform.addEventListener('submit', async (event) => {
            event.preventDefault();

            const nombre = agregarproductoform.querySelector('#nombre').value;
            const descripcion = agregarproductoform.querySelector('#descripcion').value;
            const precio = agregarproductoform.querySelector('#precio').value;
            const oferta = agregarproductoform.querySelector('#oferta').value;
            const stock = agregarproductoform.querySelector('#stock').value;
            const descuento = JSON.parse(agregarproductoform.querySelector('#descuento').value);
            const en_restock = JSON.parse(agregarproductoform.querySelector('#en_restock').value);
            const imagen = agregarproductoform.querySelector('img').getAttribute('src');
            const producto = {
                nombre,
                descripcion,
                precio,
                oferta,
                stock,
                descuento,
                en_restock,
                imagen
            };


            try {

                const response = await fetch('data/juegos.json', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(producto)
                });

                if (response.ok) {
                    alert('Producto agregado');
                } else {
                    throw new Error('Error al agregar el producto');
                }
            } catch (error) {
                console.error('Error:', error.message);
                alert('Ocurrió un error al agregar el producto. Por favor, inténtalo de nuevo más tarde');
            }
        });


        cargarDatosDesdeJSON();
    }
});


async function cargarDatosDesdeJSON() {
    try {

        const response = await fetch('data/juegos.json');


        if (!response.ok) {
            throw new Error('Error al cargar los datos desde el archivo JSON');
        }


        const datos = await response.json();


        console.log(datos);


        mostrarDatos(datos);
    } catch (error) {
        console.error('Error:', error.message);
        alert('Ocurrió un error al cargar los datos desde el archivo JSON. Por favor, inténtalo de nuevo más tarde');
    }
}


function mostrarDatos(datos) {

    if (tablaboletas) {
        tablaboletas.innerHTML = '';


        datos.forEach((juego) => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${juego.nombre}</td>
                <td>${juego.descripcion}</td>
                <td>${juego.precio}</td>
                <td>${juego.oferta}</td>
                <td>${juego.stock}</td>
                <td>${juego.en_descuento}</td>
                <td>${juego.porc_descuento}</td>
                <td>${juego.en_restock}</td>
                <td>${juego.imagen}</td>
            `;
            tablaboletas.appendChild(fila);
        });
    } else {
        console.error('Error: El elemento tablaboletas no está presente en el documento');   }
}

mostrarDatos();

function toggleCheckbox(checkbox) {
    const checkboxes = document.querySelectorAll('input[name="oferta"]');
    checkboxes.forEach((cb) => {
        if (cb !== checkbox) {
            cb.checked = false;
        }
    });
}
// funcion para cargar los datos al formulario.
function cargarProducto(row) {
    var rowData = row.cells;
    var id = rowData[0].innerText;
    var categoria = rowData[1].innerText;
    var nombre = rowData[2].innerText;
    var descripcion = rowData[3].innerText;
    var precio = parseFloat(rowData[4].innerText.replace('$', '')); 
    var descuentoSubscriptor = rowData[5].innerText;
    var descuentoOferta = rowData[6].innerText;
    document.getElementById('campo_id').value = id;
    document.getElementById('campo_categoria').value = categoria;
    document.getElementById('campo_nombre').value = nombre;
    document.getElementById('campo_descripcion').value = descripcion;
    document.getElementById('campo_precio').value = precio;
    document.getElementById('campo_descuento_sub').value = descuentoSubscriptor;
    document.getElementById('campo_descuento_oferta').value = descuentoOferta;
}
function setActive() {
    var currentLocation = location.href;
    var menuItems = document.querySelectorAll('.navbar a');
    
    menuItems.forEach(function(item) {
      if (item.href === currentLocation) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }
  window.onload = setActive;

  function cargarUsuario(fila) {
    var id = fila.cells[0].innerText;
    var categoria = fila.cells[1].innerText;
    var rut = fila.cells[2].innerText;
    var nombre = fila.cells[3].innerText;
    var apellido = fila.cells[4].innerText;
    var correo = fila.cells[5].innerText;
    var direccion = fila.cells[6].innerText;
    var suscripcion = fila.cells[7].innerText;

    // console.log("Suscripción:", suscripcion); 
    var suscripcionFormulario = suscripcion.toLowerCase();
    if (suscripcionFormulario === "sí") {
        suscripcionFormulario = "si";
    } else if (suscripcionFormulario === "no") {
        suscripcionFormulario = "no";
    }

    document.getElementById("campo_id").value = id;
    document.getElementById("campo_categoria").value = categoria.toLowerCase();
    document.getElementById("campo_rut").value = rut;
    document.getElementById("campo_nombre").value = nombre;
    document.getElementById("campo_apellido").value = apellido;
    document.getElementById("campo_correo").value = correo;
    document.getElementById("campo_direccion").value = direccion;
    document.getElementById("campo_suscripcion").value = suscripcionFormulario;
}



function verDetalle() {
    alert("Detalle de la venta");
}

function cambiarEstado() {
    alert("Estado cambiado");
}
