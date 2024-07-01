/* async function getUsersData() {
	try {
		const respuesta = await fetch("data/test.json")
		const datos = await respuesta.json()
		return datos
	} catch (error) {
		console.error(error)
		throw error
	}
}

let test = getUsersData()
console.log(test) */

function registrarUsuario() {
	let usuario = document.getElementById("campo_usuario").value.trim()
	let correo = document.getElementById("campo_correo").value.trim()
	let contraseña = document.getElementById("campo_contraseña").value.trim()
	let contraseñaRep = document.getElementById("campo_repetir_contraseña").value.trim()

	if (usuario === "" || correo === "" || contraseña === "" || contraseñaRep === "") {
		alert("Hay campos que no han sido rellenados.")
		return
	}

	let regexUsuario = /^[a-zA-Z0-9]+$/
	let regexCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

	if (!regexUsuario.test(usuario) || !regexCorreo.test(correo)) {
		alert("Solo se aceptan valores alfanuméricos para el usuario y correo.")
		return
	} else if (contraseña != contraseñaRep) {
		alert("Las contraseñas no coinciden.")
		return
	}

	const userData = {
		correo: correo,
		contraseña: contraseña,
		rol: 0,
		ajustes: {
			modo_oscuro: true
		}
	}

	const jsonData = JSON.stringify({[usuario]: userData})

/* 	let cuentas = localStorage.getItem("data/test.json")
	cuentas = cuentas ? JSON.parse(cuentas) : []
	cuentas.push(jsonData) */

	console.log("Usuario registrado correctamente.")
	console.log("Datos del usuario:", jsonData)
	return
}