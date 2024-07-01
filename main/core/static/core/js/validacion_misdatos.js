$(document).ready(function() {
	// Agregar método de validación para RUT chileno
	$.validator.addMethod("rutChileno", function(value, element) {
		var rutPattern = /^\d{7,8}-[\dK]$/;
		if (!rutPattern.test(value)) {
			return false;
		}
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
		var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z\-0-9]{2,}))$/;
		return regex.test(value);
	}, 'El formato del correo no es válido');
	
	$.validator.addMethod("soloLetras", function(value, element) {
		return this.optional(element) || /^[a-zA-Z\s]*$/.test(value);
	}, "Sólo se permiten letras y espacios en blanco.");

	document.getElementById('campo_rut').addEventListener('keyup', function(e) {
		e.target.value = e.target.value.toUpperCase();
	});
	$("#formulario_misdatos").validate({
		rules: {
			campo_rut: {
				required: true,
				rutChileno: true
			},
			campo_nombres: {
				required: true,
				soloLetras: true
			},
			campo_apellidos: {
				required: true,
				soloLetras: true
			},
			campo_correo_misdatos: {
				required: true,
				emailCompleto: true,
			},
			campo_direccion: {
				required: true,
				minlength: 15,
				maxlength: 100,
			},
			campo_password: {
				required: true,
				minlength: 5,
				maxlength: 20,
			},
			campo_password2: {
				required: true,
				minlength: 5,
				maxlength: 20,
				equalTo: "#campo_password",
			}
		},
		messages: {
			campo_rut: {
				required: "El RUT es un campo requerido",
				rutChileno: "El RUT no es válido (escriba sin puntos y con guión)"
			},
			campo_nombres: {
				required: "El nombre es un campo requerido",
				soloLetras: "El nombre sólo puede contener letras y espacios en blanco",
			},
			campo_apellidos: {
				required: "Apellidos es un campo requerido",
				soloLetras: "Apellidos solo puede contener letras y espacion en blanco"
			},
			campo_correo_misdatos: {
				required: "El correo es un campo requerido",
				emailCompleto: "El formato del correo no es válido",
			},
			campo_direccion: {
				required: "El campo direccion es obligatorio",
				minlength: "El minimo de caracteres para la direccion es de 15",
				maxlength: "El maximo de caracteres para la direccion es de 100",
			},
			campo_password: {
				required: "La contraseña es un campo requerido",
				minlength: "La contraseña debe tener un mínimo de 5 caracteres",
				maxlength: "La contraseña debe tener un máximo de 15 caracteres",
			},
			campo_password2: {
				required: "Repetir contraseña es un campo requerido",
				minlength: "Repetir contraseña debe tener un mínimo de 5 caracteres",
				maxlength: "Repetir contraseña debe tener un máximo de 15 caracteres",
				equalTo: "Debe repetir la contraseña escrita anteriormente",
			}
		},
		errorPlacement: function(error, element) {
			error.addClass('invalid-feedback');
			if (element.closest('.input-group').length) {
			error.insertAfter(element.closest('.input-group'));
			} else {
			error.insertAfter(element);
			}
		},
		highlight: function(element) {
			$(element).addClass('is-invalid');
			$(element).removeClass("is-valid")
		},
		unhighlight: function(element) {
			$(element).addClass("is-valid")
			$(element).removeClass('is-invalid');
		}
	});
});
