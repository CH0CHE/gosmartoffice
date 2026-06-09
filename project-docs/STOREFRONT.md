# TIENDA (STOREFRONT)

**Última actualización:** 2026-06-09

---

## Páginas de la Tienda

### Homepage — `/`
- Banner principal
- Colección destacada (featured collection)
- Navegación de categorías
- Productos destacados

### Búsqueda — `/catalog/search?q=...`
- Resultados paginados
- Filtros por atributo (si `is_filterable = true`)
- Ordenar por precio, nombre, relevancia
- Contador de resultados

### Vista de Categoría — `/[categorySlug]`
- Grilla de productos de la categoría
- Filtros laterales por atributos
- Paginación
- Breadcrumb de jerarquía

### Vista de Producto — `/[categorySlug]/[productSlug]`
- Galería de imágenes (react-slick slider)
- Nombre, precio, disponibilidad
- Selector de variantes (color, talla, etc.)
- Botón "Agregar al carrito"
- Descripción completa
- Breadcrumb

### Carrito — `/cart`
- Listado de ítems con imagen, nombre, precio, cantidad
- Actualizar cantidades
- Eliminar ítems
- Subtotal, impuestos, envío, total
- Campo de cupón de descuento
- Botón "Ir al checkout"

### Checkout — `/checkout`
**Paso 1 — Información de contacto:**
- Nombre completo
- Email
- Teléfono

**Paso 2 — Dirección de envío:**
- Nombre completo, dirección 1, dirección 2
- Ciudad, provincia, código postal, país

**Paso 3 — Método de envío:**
- Lista de métodos disponibles para la zona
- Precio de cada opción

**Paso 4 — Método de pago:**
- Opciones habilitadas (COD, Stripe, PayPal)
- Para MVP: solo COD (pago contra entrega)

**Paso 5 — Nota de envío (opcional):**
- Campo de texto libre para instrucciones

**Resumen de orden:**
- Ítems, subtotal, envío, descuentos, total

**Botón "Realizar Pedido"** → crea la orden

### Confirmación — `/checkout/success`
- Mensaje de agradecimiento
- Número de orden generado
- Resumen del pedido
- Instrucciones según método de pago

### Cuenta de Cliente — `/customer/account`
- Información personal
- Historial de órdenes
- Gestión de direcciones

### Login — `/customer/account/login`
- Email + contraseña
- Link a registro
- Link a recuperar contraseña

### Registro — `/customer/account/create`
- Nombre, email, contraseña
- Validaciones

### Recuperar Contraseña — `/customer/account/resetPassword`
- Envío de email de reset (via SendGrid)

### Imágenes — `/files/*`
- Servicio de imágenes estáticas
- Redimensionadas automáticamente con Sharp

### 404 — Not Found
- Página de error con link al inicio

---

## Componentes del Storefront

Ubicados en `src/components/frontStore/`:
- Slider de imágenes: react-slick
- Agregar al carrito: con animación + mini carrito
- Mini carrito: drawer lateral
- Notificaciones: toast (react-toastify)
- Formularios de checkout: react-hook-form
- Filtros de productos

---

## Flujo de Compra (MVP)

```
Homepage / Categoría / Búsqueda
        │
        ▼
   Vista de Producto
        │
        ▼
  "Agregar al Carrito"
        │
        ▼
    Vista Carrito
        │
        ▼
   Checkout (4 pasos)
   1. Contacto
   2. Dirección
   3. Método de Envío
   4. Método de Pago (COD)
        │
        ▼
  "Realizar Pedido"
        │
        ▼
  Confirmación (#00001)
  → Orden queda en estado "New"
  → Admin la atiende manualmente
```

---

## Sesión de Cliente

- Carrito persiste en sesión (sin login requerido)
- Si el cliente hace login, el carrito se asocia a su cuenta
- Sesión almacenada en PostgreSQL (`connect-pg-simple`)
- Cookie: `sid` (configurable en `config`)

---

## i18n en el Storefront

Archivos de traducción aplicables al storefront:
- `translations/es/catalog.csv` — catálogo, búsqueda, filtros
- `translations/es/checkout.csv` — carrito, checkout, confirmación
- `translations/es/account.csv` — login, registro, cuenta
- `translations/es/general.csv` — textos generales, 404, etc.
- `translations/es/paypal.csv` — botones PayPal (POST-MVP)
