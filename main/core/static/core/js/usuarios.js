document.addEventListener('DOMContentLoaded', async () => {
    const listaUsuarios = document.getElementById('lista-usuarios');
    const agregarUsuarioForm = document.getElementById('agregar-usuario-form');
    const verUsuariosBtn = document.getElementById('ver-usuarios-btn');
    const agregarUsuarioBtn = document.getElementById('agregar-usuario-btn');

    async function cargarUsuarios() {
        try {
            const response = await fetch('cuentas.json');
            if (!response.ok) {
                throw new Error('Error al cargar los datos de usuarios');
            }
            const usuarios = await response.json();
            mostrarUsuarios(usuarios);
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    function mostrarUsuarios(usuarios) {
        listaUsuarios.innerHTML = '';
        usuarios.forEach(usuario => {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.textContent = `${usuario.nombre} - ${usuario.correo} - Rol: ${usuario.rol === 1 ? 'Administrador' : 'Usuario Normal'}`;
            listaUsuarios.appendChild(li);
        });
    }

    async function mostrarVistaAgregarUsuario() {
        agregarUsuarioForm.style.display = 'block';
        listaUsuarios.style.display = 'none';
        agregarUsuarioBtn.style.display = 'none';
        verUsuariosBtn.style.display = 'block';
    }

    async function mostrarVistaVerUsuarios() {
        // Cargar y mostrar la lista de usuarios
        cargarUsuarios();
        listaUsuarios.style.display = 'block';
        agregarUsuarioForm.style.display = 'none';
        agregarUsuarioBtn.style.display = 'block';
        verUsuariosBtn.style.display = 'none';
    }

    agregarUsuarioForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const nombre = agregarUsuarioForm.querySelector('#nombre').value;
        const email = agregarUsuarioForm.querySelector('#email').value;
        const contrasena = agregarUsuarioForm.querySelector('#contrasena').value;
        const comuna = agregarUsuarioForm.querySelector('#comuna').value;
        const calle = agregarUsuarioForm.querySelector('#calle').value;
        const numero = agregarUsuarioForm.querySelector('#numero').value;
        const rol = agregarUsuarioForm.querySelector('#rol').value;
        const nuevoUsuario = { nombre, email, contrasena, comuna, calle, numero, rol };

        try {
            const response = await fetch('http://localhost:3000/paginaweb/data/cuentas.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoUsuario)
            });
            
            if (response.ok) {
                alert('El usuario ha sido agregado correctamente');
                window.location.href = 'http://localhost:3000/paginaweb/admin/admin_user.html'; // Redirige al administrador de usuarios
            } else {
                throw new Error('Error al agregar el usuario');
            }
            
            cargarUsuarios();
        } catch (error) {
            console.error('Error:', error.message);
        }
    });

    verUsuariosBtn.addEventListener('click', mostrarVistaVerUsuarios);
    agregarUsuarioBtn.addEventListener('click', mostrarVistaAgregarUsuario);


    mostrarVistaVerUsuarios();
});
