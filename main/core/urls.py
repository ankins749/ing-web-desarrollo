from django.urls import path
from .views import (
	index, nosotros, panel_admin, 
	agregar_productos, agregar_user, api, 
	boleta, carrito_compras, historial_compras, 
	mantenedor_bodega, mis_datos, navegacion, 
	nosotros, registro, ventas, login,
	footer, logout, importar_productos, eliminar_producto,
	obtener_productos,ingresartarjeta,arriendo
)

urlpatterns = [
	path("", index, name="index"),
	path("navegacion", navegacion, name="navegacion"),
	path("footer", footer, name="footer"),
	path("registro/", registro, name="registro"),
	path("login/", login, name="login"),
	path("logout/", logout, name="logout"),
	path("nosotros/", nosotros, name="nosotros"),
	path("panel_admin/", panel_admin, name="panel_admin"),
	path("agregar_productos/", agregar_productos, name="agregar_productos"),
	path("agregar_user/", agregar_user, name="agregar_user"),
	path("api/", api, name="api"),
	path("api/productos/", obtener_productos, name="obtener_productos"),
	path("boleta/", boleta, name="boleta"),
	path("carrito_compras/", carrito_compras, name="carrito_compras"),
	path("historial_compras/", historial_compras, name="historial_compras"),
	path("mantenedor_bodega/", mantenedor_bodega, name="mantenedor_bodega"),
	path("mis_datos/", mis_datos, name="mis_datos"),
	path("nosotros/", nosotros, name="nosotros"),
	path("ventas/", ventas, name="ventas"),
	path("eliminar_producto/<int:id>/", eliminar_producto, name="eliminar_producto"),
	path("editar_producto/<int:id>/", lambda request, id: agregar_productos(request, id), name="editar_producto"),
	path("importar_productos/", importar_productos, name="importar_productos"),
	path("ingresartarjeta/", ingresartarjeta, name="ingresartarjeta"),
	path("arriendo/", arriendo, name="arriendo"),
]