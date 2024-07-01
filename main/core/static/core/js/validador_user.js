$(document).ready(function() {

	// Agregar método de validación para RUT chileno
	$.validator.addMethod("rutChileno", function(value, element) {

		// Validar que el RUT tenga el formato correcto (8 o 9 dígitos + guión + dígito verificador)
		var rutPattern = /^\d{7,8}-[\dK]$/;
		if (!rutPattern.test(value)) {
			return false;
		}
	
		// Validar el dígito verificador
		var rutSinGuion = value.replace("-", "");
		var rut = rutSinGuion.slice(0, -1);
		var dv = rutSinGuion.slice(-1);
		var factor = 2;
		var sum = 0;
		for (var i = rut.length - 1; i >= 0; i--) {
			sum += parseInt(rut.charAt(i)) * factor;
			factor = factor === 7 ? 2 : factor + 1;
		}
		var dvCalculado = 11 - (sum % 11);
		dvCalculado = dvCalculado === 11 ? "0" : dvCalculado === 10 ? "K" : dvCalculado.toString();
	
		return dv === dvCalculado;
	}, "El RUT no es válido (escriba sin puntos y con guión)");

	// Agregar método de validación para correo
	$.validator.addMethod("emailCompleto", function(value, element) {

		// Expresión regular para validar correo electrónico
		var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,}))$/;
	
		// Validar correo electrónico con la expresión regular
		return regex.test(value);
	
	}, 'El formato del correo no es válido');
	
	// Agregar método de validación para que un campo sólo acepte 
	// letras y espacios en blanco, pero no números ni símbolos,
	// ideal para campos como nombres y apellidos
	$.validator.addMethod("soloLetras", function(value, element) {
		return this.optional(element) || /^[a-zA-Z\s]*$/.test(value);
	}, "Sólo se permiten letras y espacios en blanco.");

	$.validator.addMethod("soloNumeros", function(value, element) {
		return this.optional(element) || /^[\d]*$/.test(value);
	}, "Sólo se permiten letras y espacios en blanco.");    

	// El siguiente Javascript obliga a que la caja de texto del rut, siempre escriba la letra "K" en mayúscula
	document.getElementById('campo_rut').addEventListener('keyup', function(e) {
		e.target.value = e.target.value.toUpperCase();
	});

	// Validar formulario con JQuery
	$("#formulario_user").validate({
		rules: {
			campo_id: {
				required: true,
				soloNumeros: true
			},
			campo_rut: {
				required: true,
				rutChileno: true
			},
			campo_nombre: {
				required: true,
				soloLetras: true
			},
			campo_apellido: {
				required: true,
				soloLetras: true
			},
			campo_correo: {
				required: true,
				emailCompleto: true,
			},
			campo_direccion: {
				required: true,
				minlength: 15,
				maxlength: 100,
			},
			campo_contraseña: {
				required: true,
				minlength: 5,
				maxlength: 20,
			}
		},
		messages: {
			campo_id: {
				required: "Este campo es obligatorio.",
				soloNumeros: "El id debe ser numerico."
			},
			campo_rut: {
				required: "Este campo es obligatorio.",
				rutChileno: "El RUT del usuario no es válido (escriba sin puntos y con guión)"
			},
			campo_nombre: {
				required: "Este campo es obligatorio.",
				soloLetras: "El nombre del usuario sólo puede contener letras y espacios en blanco",
			},
			campo_apellido: {
				required: "Este campo es obligatorio.",
				soloLetras: "Los Apellidos del usuario solo puede contener letras y espacion en blanco"
			},
			campo_correo: {
				required: "Este campo es obligatorio.",
				email: "El formato del correo no es válido",
			},
			campo_direccion: {
				required: "Este campo es obligatorio.",
				minlength: "El minimo de caracteres para la direccion es de 15",
				maxlength: "El maximo de caracteres para la direccion es de 100",
			},
			campo_contraseña: {
				required: "Este campo es obligatorio.",
				minlength: "El mínimo de caracteres es de 5.",
				maxlength: "El máximo de caracteres es de 20.",
			}
		},

		errorPlacement: function(error, element) {
			error.addClass("invalid-feedback")
			if (element.closest(".input-group").length) {
				error.insertAfter(element.closest(".input-group"))
			} else {
				error.insertAfter(element)
			}
		},
		highlight: function(element) {
			$(element).addClass("is-invalid")
			$(element).removeClass("is-valid")
		},
		unhighlight: function(element) {
			$(element).addClass("is-valid")
			$(element).removeClass("is-invalid")
		}
	})
});
