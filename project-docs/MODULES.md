# MÓDULOS DEL SISTEMA

**Última actualización:** 2026-06-09

---

## Resumen de Módulos

| Módulo | Estado MVP | Área | Descripción |
|--------|-----------|------|-------------|
| `auth` | OBLIGATORIO | Admin | Autenticación del panel administrativo |
| `base` | OBLIGATORIO | Global | Infraestructura base del framework |
| `catalog` | OBLIGATORIO | Admin + Tienda | Productos, categorías, atributos, variantes |
| `checkout` | OBLIGATORIO | Admin + Tienda | Carrito, checkout, envíos, órdenes |
| `graphql` | OBLIGATORIO | Global | Motor GraphQL del sistema |
| `oms` | OBLIGATORIO | Admin | Gestión de órdenes (Order Management System) |
| `setting` | OBLIGATORIO | Admin | Configuración de la tienda |
| `customer` | OBLIGATORIO | Admin + Tienda | Cuentas de cliente, login, registro |
| `cod` | RECOMENDADO | Admin + Tienda | Cash on Delivery — pago contra entrega |
| `cms` | OPCIONAL | Admin + Tienda | Páginas de contenido estático y widgets |
| `promotion` | POST-MVP | Admin | Cupones y descuentos |
| `tax` | POST-MVP | Admin | Configuración de impuestos |
| `stripe` | POST-MVP | Admin + Tienda | Integración Stripe |
| `paypal` | POST-MVP | Admin + Tienda | Integración PayPal |

---

## Detalle por Módulo

### `auth` — Autenticación Administrativa
**Prioridad MVP:** OBLIGATORIO

- Login/logout del panel admin con JWT
- Protección de rutas administrativas
- Tablas: `admin_user`
- Páginas admin: `adminLogin`, `adminLoginJson`, `adminLogoutJson`
- Migraciones: v1.0.0 (tabla admin_user), v1.0.1 (tokens)

---

### `base` — Infraestructura Base
**Prioridad MVP:** OBLIGATORIO

- Sistema de routing base
- Assets estáticos
- Páginas 404, not found
- Layout global (head, footer)
- Sistema de notificaciones (Sonner toast)
- Migraciones: v1.0.1 (configuración), v1.0.2 (mejoras)
- Áreas: admin, frontStore, global

---

### `catalog` — Catálogo de Productos
**Prioridad MVP:** OBLIGATORIO

**Funcionalidades:**
- CRUD completo de productos
- CRUD de categorías (árbol jerárquico)
- Atributos y grupos de atributos
- Variantes de productos (color, talla, etc.)
- Colecciones de productos
- Upload de imágenes con Sharp (redimensionado automático)
- Búsqueda de productos

**API REST (Admin):**
- `POST /api/catalog/product/create`
- `PUT /api/catalog/product/:id`
- `DELETE /api/catalog/product/:id`
- `POST /api/catalog/category/create`
- Y más...

**Tablas DB:** `product`, `product_description`, `category`, `category_description`, `attribute`, `attribute_option`, `product_attribute_value`, `variant_group`, `product_image`, `collection`

**Páginas Admin:** `productGrid`, `productEdit`, `productNew`, `categoryGrid`, `categoryEdit`, `categoryNew`, `attributeGrid`, `collectionGrid`

**Páginas Tienda:** `categoryView`, `productView`, `catalogSearch`, `homepage`

**Migraciones:** v1.0.0 - v1.0.7 (9 versiones)

---

### `checkout` — Carrito y Checkout
**Prioridad MVP:** OBLIGATORIO

**Funcionalidades:**
- Gestión de carrito (agregar, quitar, actualizar)
- Múltiples ítems con variantes
- Información de contacto del comprador
- Dirección de envío
- Métodos de envío (zonas de envío)
- Métodos de pago
- Creación de orden
- Nota de envío
- Configuración de zonas de envío

**API REST:**
- `POST /api/cart` (crear carrito)
- `POST /api/cart/item` (agregar ítem)
- `DELETE /api/cart/item/:id`
- `POST /api/cart/contact`
- `POST /api/cart/address`
- `POST /api/cart/shipping-method`
- `POST /api/cart/payment-method`
- `POST /api/cart/checkout`

**Tablas DB:** `cart`, `cart_item`, `cart_address`, `order`, `order_item`, `order_address`, `shipping_zone`, `shipping_zone_method`

**Páginas Admin:** `shippingSetting`
**Páginas Tienda:** `cart`, `checkout`, `checkoutSuccess`

**Migraciones:** v1.0.0 - v1.0.6 (7 versiones)

---

### `graphql` — Motor GraphQL
**Prioridad MVP:** OBLIGATORIO

- Endpoint `/api/graphql`
- Merge de schemas de todos los módulos
- Resolvers centralizados
- Tipos compartidos
- Playground en desarrollo

---

### `oms` — Order Management System
**Prioridad MVP:** OBLIGATORIO

**Funcionalidades:**
- Vista y gestión de órdenes
- Actualización de estado (new → processing → completed / canceled)
- Estado de pago (pending → paid / failed)
- Estado de envío (pending → processing → shipped → delivered)
- Shipment tracking (número de seguimiento)
- Historial de actividad de órdenes
- Re-stock automático al cancelar (configurable)

**Tablas DB:** `order_activity`, `shipment`
**Páginas Admin:** `orderGrid`, `orderEdit`
**Migraciones:** v1.0.0, v1.0.1

---

### `setting` — Configuración de Tienda
**Prioridad MVP:** OBLIGATORIO

**Páginas Admin:** `storeSetting`, `paymentSetting`, `shippingSetting`, `taxSetting`

- Nombre de tienda, moneda, idioma, zona horaria
- Configuración de métodos de pago habilitados
- Configuración de zonas de envío
- Configuración de impuestos

---

### `customer` — Clientes
**Prioridad MVP:** OBLIGATORIO (básico)

**Funcionalidades:**
- Registro de clientes
- Login / logout
- Perfil y direcciones
- Historial de órdenes
- Grupos de clientes
- Reset de contraseña por email

**Páginas Admin:** `customerGrid`, `customerEdit`, `customerNew`
**Páginas Tienda:** `account`, `login`, `register`, `resetPasswordPage`

**Migraciones:** v1.0.0 - v1.0.3

---

### `cod` — Cash on Delivery (Pago Contra Entrega)
**Prioridad MVP:** RECOMENDADO — PERFECTO PARA MVP

- Método de pago "contra entrega"
- Sin integración bancaria
- Captura manual del pago
- Botón "Capturar Pago" en el admin de la orden
- Configuración básica en `paymentSetting`

**Páginas Admin:** `paymentSetting` (COD section)
**Páginas Tienda:** `checkout` (opción de pago)

---

### `cms` — Content Management System
**Prioridad MVP:** OPCIONAL

- Páginas de contenido estático (Acerca de, Términos, etc.)
- Sistema de widgets
- Editor WYSIWYG (EditorJS)

---

### `promotion` — Promociones
**Prioridad MVP:** POST-MVP

- Cupones de descuento
- Descuentos por monto/porcentaje
- Condiciones de aplicación

---

### `tax` — Impuestos
**Prioridad MVP:** POST-MVP

- Clases de impuesto
- Tasas por zona geográfica
- Cálculo inclusivo/exclusivo

---

### `stripe` — Integración Stripe
**Prioridad MVP:** POST-MVP

- Pago con tarjeta de crédito/débito
- Webhook de confirmación
- Configuración de API keys

---

### `paypal` — Integración PayPal
**Prioridad MVP:** POST-MVP

- Pago via PayPal
- Return/cancel URLs
- Configuración de credenciales
