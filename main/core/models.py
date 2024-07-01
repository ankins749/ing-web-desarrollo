from django.db import models

# Create your models here.
class Producto(models.Model):
    CATEGORIAS = [
        ("Ruta", "Ruta"),
        ("Urbana", "Urbana"),
        ("Montaña", "Montaña"),
        ("Infantil", "Infantil")
    ]

    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    precio = models.DecimalField(max_digits=10, decimal_places=0)  # Adjusted max_digits to 10 for price
    stock = models.IntegerField(default=0)  # Removed null=True
    descripcion = models.TextField()
    imagen = models.ImageField(null=True, upload_to="img/")
    categoria = models.CharField(max_length=20, choices=CATEGORIAS)  # Adjusted max_length to 20
    en_descuento = models.BooleanField(default=False)
    en_restock = models.BooleanField(default=False)
    precio_arriendo = models.DecimalField(max_digits=10, decimal_places=0, null=True, blank=True)  # Added precio_arriendo field
    descuento = models.DecimalField(max_digits=3, decimal_places=1, default=0)  # Kept descuento field if needed for other purposes

    def __str__(self):
        return f"#{self.id} | {self.nombre}"

class Cuenta(models.Model):
	ROLES = [
		("Cliente", "Cliente"), 
		("Administrador", "Administrador")
	]

	rut = models.CharField(max_length=12, unique=True)
	nombres = models.CharField(max_length=100)
	apellidos = models.CharField(max_length=100)
	correo = models.EmailField(unique=True)
	direccion = models.TextField(max_length=100)
	contraseña = models.CharField(max_length=100)
	subscrito = models.BooleanField(default=False)
	rol = models.CharField(max_length=20, choices=ROLES, default="Cliente")
	favoritos = models.ManyToManyField(Producto, related_name="favorited_by", blank=True)

	def __str__(self):
		return f"{self.correo}"