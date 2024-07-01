import json
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from core.models import Cuenta, Producto
from django.contrib import messages
from django.contrib.auth.hashers import check_password, make_password

# Create your views here.

def index(request): return render(request, "core/index.html")
def navegacion(request): return render(request, "core/navegacion.html")
def footer(request): return render(request, "core/footer.html")
def nosotros(request): return render(request, "core/nosotros.html")
def panel_admin(request): return render(request, "core/panel_admin.html")
def agregar_productos(request): return render(request, "core/agregar_productos.html")
def agregar_user(request): return render(request, "core/agregar_user.html")
def api(request): return render(request, "core/api.html")
def boleta(request): return render(request, "core/boleta.html")
def carrito_compras(request): return render(request, "core/carrito_compras.html")
def historial_compras(request): return render(request, "core/historial_compras.html")
def mantenedor_bodega(request): return render(request, "core/mantenedor_bodega.html")
def mis_datos(request): return render(request, "core/mis_datos.html")
def nosotros(request): return render(request, "core/nosotros.html")
def ventas(request): return render(request, "core/ventas.html")
def ingresartarjeta(request): return render(request, "core/ingresartarjeta.html")
def arriendo(request): return render(request, "core/arriendo.html")


def login(request):
	if request.method == "POST":
		correo = request.POST.get("campo_correo")
		contraseña = request.POST.get("campo_contraseña")
		try:
			cuenta = Cuenta.objects.get(correo = correo)
			if check_password(contraseña, cuenta.contraseña):
				request.session["cuenta_rut"] = cuenta.rut
				request.session["cuenta_nombres"] = cuenta.nombres
				request.session["cuenta_apellidos"] = cuenta.apellidos
				request.session["cuenta_correo"] = cuenta.correo
				request.session["cuenta_direccion"] = cuenta.direccion
				request.session["cuenta_es_subscriptor"] = cuenta.subscrito
				request.session["cuenta_rol"] = cuenta.rol
				request.session["cuenta_favoritos"] = list(cuenta.favoritos.values_list("id", flat=True))
				request.session["logeado"] = True
				return redirect("index")
			messages.error(request, "Contraseña incorrecta.")
		except:
			messages.error(request, "Este correo no existe.")
	return render(request, "core/login.html")

def registro(request):
	if request.method == "POST":
		rut = request.POST["campo_rut"]
		nombres = request.POST["campo_nombres"]
		apellidos = request.POST["campo_apellidos"]
		correo = request.POST["campo_correo"]
		dirección = request.POST["campo_direccion"]
		subscrito = request.POST.get("es_subscriptor", False)
		contraseña = request.POST["campo_contraseña"]
		confirmar_contraseña = request.POST["campo_repetir_contraseña"]
		if contraseña == confirmar_contraseña:
			if Cuenta.objects.filter(correo = correo).exists():
				messages.error(request, "Ya existe un correo como este.")
				return redirect("registro")
			elif Cuenta.objects.filter(rut = rut).exists():
				messages.error(request, "Ya existe un RUT como este.")
				return redirect("registro")
			usuario = Cuenta(rut = rut, nombres = nombres, apellidos = apellidos, correo = correo, direccion = dirección, contraseña = make_password(contraseña), subscrito = subscrito)
			usuario.save()
			return redirect("login")
		else:
			messages.error(request, "Las contraseñas no coinciden.")
			return redirect("registro")
	return render(request, "core/registro.html")

def logout(request):
	request.session.flush()
	return redirect("index")

def agregar_productos(request, id=None):
	if request.method == "POST":
		nombre = request.POST.get("campo_nombre")
		precio = request.POST.get("campo_precio")
		descripcion = request.POST.get("campo_descripcion")
		categoria = request.POST.get("campo_categoria")
		descuento = request.POST.get("campo_descuento_oferta")
		precio_arriendo = request.POST.get("precio_arriendo")
		imagen = request.FILES.get("campo_foto")

		if not all([nombre, precio, descripcion, imagen]):
			messages.error(request, "Todos los campos son requeridos.")
		else:
			if id:
				producto = get_object_or_404(Producto, id=id)
				producto.nombre = nombre
				producto.descripcion = descripcion
				producto.precio = precio
				producto.categoria = categoria
				producto.descuento = descuento
				producto.precio_arriendo = precio_arriendo
				if imagen:
					producto.imagen = imagen
				producto.save()
			else:
				producto = Producto(nombre=nombre, precio=precio, stock=0, descripcion=descripcion, imagen=imagen, categoria=categoria, descuento=descuento, precio_arriendo=precio_arriendo)
				producto.save()
			return redirect("agregar_productos")
	productos = Producto.objects.all()
	return render(request, "core/agregar_productos.html", {"productos": productos, "producto_id": id})

def eliminar_producto(request, id):
	if request.method == "POST":
		producto = get_object_or_404(Producto, id=id)
		producto.delete()
		return redirect("agregar_productos")
	return JsonResponse({"Error": "Método no permitido."}, status=405)

def importar_productos(request):
	if request.method == "POST":
		try:
			data = json.loads(request.body)
			for producto in data:
				Producto.objects.create(
					nombre = producto.get("nombre"),
					precio = producto.get("precio"),
					stock = producto.get("stock", 0),
					descripcion = producto.get("descripcion"),
					categoria = producto.get("categoria"),
					en_descuento = producto.get("en_descuento", False),
					en_restock = producto.get("en_restock", False),
					descuento = producto.get("porc_descuento", 0),
					precio_arriendo = producto.get("precio_arriendo", 0),
					imagen = None
				)
			return JsonResponse({"mensaje": "Productos importados correctamente."})
		except Exception as e:
			return JsonResponse({"Error": str(e)}, status=400)
	return JsonResponse({"Error": "Método no permitido."}, status=405)

def obtener_productos(request):
	producto_id = request.GET.get("id")
	def get_img(img):
		img = img.url if img else "/static/core/img/user_sample.jpg"
		return img.replace("/media/", "")
	if producto_id:
		try:
			producto = Producto.objects.get(id=producto_id)
			producto_data = {
				"id": producto.id,
				"nombre": producto.nombre,
				"precio": producto.precio,
				"stock": producto.stock,
				"descripcion": producto.descripcion,
				"imagen": get_img(producto.imagen),
				"categoria": producto.categoria,
				"en_descuento": producto.en_descuento,
				"en_restock": producto.en_restock,
				"descuento": producto.descuento,
				"precio_arriendo": producto.precio_arriendo,
			}
			return JsonResponse([producto_data], safe=False)
		except Producto.DoesNotExist:
			return JsonResponse({"error": "Producto no encontrado."}, status=404)
	else:
		productos = Producto.objects.all().values()
		productos_lista = list(productos)
		return JsonResponse(productos_lista, safe=False)