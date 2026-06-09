# PANEL ADMINISTRATIVO (BACKOFFICE)

**Última actualización:** 2026-06-09

---

## Acceso

- **URL:** `http://localhost:3000/admin`
- **Login:** Email + Password (JWT)
- **Ruta de login:** `/admin/user/login`

---

## Páginas del Admin

### Dashboard
- Ruta: `/admin`
- Métricas de ventas (gráficas con Recharts)
- Órdenes recientes
- Ingresos del período

### Gestión de Productos

**Grid de Productos** — `/admin/products`
- Listado paginado de todos los productos
- Filtros por nombre, SKU, estado
- Acciones: editar, eliminar, crear
- Tamaño de página configurable (default: 20)

**Crear/Editar Producto** — `/admin/products/new` | `/admin/products/:uuid`
- Información básica: nombre, SKU, precio, peso
- Descripción larga (editor EditorJS + imágenes)
- Descripción corta
- Estado (activo/inactivo), visibilidad
- Gestión de inventario: cantidad, disponibilidad
- Imágenes: upload múltiple, drag & drop (dnd-kit), imagen principal
- Categoría asignada
- Atributos y valores
- Variantes: grupos de variantes (color + talla, etc.)
- SEO: meta title, description, keywords, URL slug

### Gestión de Categorías

**Grid de Categorías** — `/admin/categories`
- Árbol de categorías
- Estado, posición en navegación

**Crear/Editar Categoría** — `/admin/categories/new` | `/admin/categories/:uuid`
- Nombre, descripción, imagen banner
- Categoría padre (jerarquía)
- Incluir en navegación
- SEO completo
- URL slug

### Gestión de Atributos

**Grid de Atributos** — `/admin/attributes`
- Atributos configurables (color, talla, material, etc.)
- Tipos: text, select, multiselect, boolean

**Crear/Editar Atributo** — `/admin/attributes/new` | `/admin/attributes/:uuid`
- Código único, nombre, tipo
- Opciones de valores (para select/multiselect)
- ¿Mostrar en frontend? ¿Es filtrable? ¿Es requerido?

### Gestión de Colecciones

**Grid de Colecciones** — `/admin/collections`
- Colecciones para páginas destacadas

### Gestión de Órdenes

**Grid de Órdenes** — `/admin/orders`
- Listado con filtros por estado, fecha, cliente
- Estado general, estado de pago, estado de envío

**Vista de Orden** — `/admin/orders/:uuid`
- Detalle completo de la orden
- Cambio de estado (new → processing → completed / canceled)
- Actualizar estado de pago
- Crear/actualizar envío (transportista + tracking)
- Historial de actividad
- Botón "Capturar Pago" (COD)
- Datos de cliente y dirección

### Gestión de Clientes

**Grid de Clientes** — `/admin/customers`
- Listado paginado de clientes registrados

**Crear/Editar Cliente** — `/admin/customers/new` | `/admin/customers/:uuid`
- Información personal
- Historial de órdenes

### Gestión de CMS

**Grid de Páginas** — `/admin/cms/pages`
- Páginas de contenido estático

**Grid de Widgets** — `/admin/widgets`
- Widgets de contenido para el storefront

### Cupones

**Grid de Cupones** — `/admin/coupons` (módulo promotion)
- Listado de cupones activos

**Crear/Editar Cupón** — `/admin/coupons/new` | `/admin/coupons/:uuid`
- Código, tipo de descuento (monto/porcentaje), condiciones

### Configuración

**Configuración General** — `/admin/setting/store`
- Nombre de tienda, email, teléfono
- Moneda, idioma, zona horaria
- Logo, favicon

**Configuración de Pagos** — `/admin/setting/payment`
- Habilitar/deshabilitar métodos de pago
- Configuración COD, Stripe, PayPal

**Configuración de Envíos** — `/admin/setting/shipping`
- Zonas de envío
- Métodos por zona (precio fijo, por peso, gratis)

**Configuración de Impuestos** — `/admin/setting/tax`
- Clases de impuesto
- Tasas por zona

---

## Componentes del Admin

Ubicados en `src/components/admin/`:
- Formularios con react-hook-form
- Editor de contenido: EditorJS (@editorjs)
- WYSIWYG adicional: CKEditor 5
- Drag & drop: @dnd-kit
- Gráficas: Recharts
- Notificaciones: @evershop/sonner (toast)
- Selects avanzados: react-select
- Datepicker: flatpickr

---

## Flujo de Autenticación Admin

1. Usuario accede a `/admin`
2. Si no autenticado → redirige a `/admin/user/login`
3. Login exitoso → JWT almacenado en cookie `admin-sid`
4. Cada request al admin incluye el JWT automáticamente
5. Middleware `[auth]` valida el JWT en cada API call
