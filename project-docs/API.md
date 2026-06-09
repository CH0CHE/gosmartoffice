# API — ENDPOINTS Y GRAPHQL

**Última actualización:** 2026-06-09

---

## Arquitectura API

EverShop expone dos tipos de API:

1. **REST API** — Para operaciones CRUD del admin y acciones del frontend
2. **GraphQL API** — Para consultas de datos del frontend y admin

Endpoint GraphQL: `POST /api/graphql`

---

## REST API — Admin (requieren autenticación JWT)

### Auth
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/admin/user/login` | Login admin |
| GET | `/admin/user/logout` | Logout admin |

### Catálogo — Productos
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/products` | Crear producto |
| PUT | `/api/products/:uuid` | Actualizar producto |
| DELETE | `/api/products/:uuid` | Eliminar producto |
| POST | `/api/products/:id/images` | Subir imágenes |
| POST | `/api/products/:id/variants` | Crear grupo de variantes |

### Catálogo — Categorías
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/categories` | Crear categoría |
| PUT | `/api/categories/:uuid` | Actualizar categoría |
| DELETE | `/api/categories/:uuid` | Eliminar categoría |

### Catálogo — Atributos
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/attributes` | Crear atributo |
| PUT | `/api/attributes/:uuid` | Actualizar atributo |
| DELETE | `/api/attributes/:uuid` | Eliminar atributo |
| POST | `/api/attributeGroups` | Crear grupo de atributos |

### Catálogo — Colecciones
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/collections` | Crear colección |
| PUT | `/api/collections/:uuid` | Actualizar colección |
| DELETE | `/api/collections/:uuid` | Eliminar colección |

---

## REST API — Checkout / Storefront

### Carrito
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/carts` | Crear carrito |
| POST | `/api/carts/mine/items` | Agregar ítem al carrito |
| PUT | `/api/carts/mine/items/:id` | Actualizar ítem |
| DELETE | `/api/carts/:cartId/items/:itemId` | Eliminar ítem |
| POST | `/api/carts/mine/contact` | Info de contacto |
| POST | `/api/carts/mine/addresses` | Dirección de envío |
| POST | `/api/carts/mine/shippingMethods` | Método de envío |
| POST | `/api/carts/mine/paymentMethods` | Método de pago |
| POST | `/api/carts/mine/shippingNote` | Nota de envío |
| POST | `/api/carts/mine/checkout` | Finalizar checkout |
| POST | `/api/orders` | Crear orden directamente |

### Clientes
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/customers/login` | Login cliente |
| GET | `/api/customers/logout` | Logout cliente |
| POST | `/api/customers` | Registro de cliente |

### Envíos
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/shippingZones` | Crear zona de envío |
| PUT | `/api/shippingZones/:id` | Actualizar zona |
| DELETE | `/api/shippingZones/:id` | Eliminar zona |
| POST | `/api/shippingZones/:id/methods` | Agregar método |
| DELETE | `/api/shippingZoneMethods/:id` | Eliminar método |

---

## REST API — OMS

| Método | Ruta | Descripción |
|--------|------|-------------|
| PUT | `/api/orders/:uuid/status` | Actualizar estado |
| POST | `/api/orders/:uuid/shipment` | Crear envío |
| PUT | `/api/orders/:uuid/shipment` | Actualizar envío |

---

## GraphQL API

El schema GraphQL se construye mergeando los schemas de todos los módulos.

### Tipos principales

```graphql
type Product {
  productId: ID
  uuid: String
  name: String
  sku: String
  price: Money
  qty: Int
  images: [ProductImage]
  category: Category
  variants: [ProductVariant]
  url: String
}

type Category {
  categoryId: ID
  uuid: String
  name: String
  products: ProductList
  children: [Category]
  breadcrumbs: [Breadcrumb]
}

type Cart {
  cartId: ID
  uuid: String
  items: [CartItem]
  totalQty: Int
  grandTotal: Money
  shippingMethods: [ShippingMethod]
  paymentMethods: [PaymentMethod]
}

type Order {
  orderId: ID
  uuid: String
  orderNumber: String
  status: String
  paymentStatus: String
  shipmentStatus: String
  grandTotal: Money
  items: [OrderItem]
}

type Customer {
  customerId: ID
  email: String
  fullName: String
  orders: [Order]
}
```

### Queries principales

```graphql
# Catálogo
query { product(id: "uuid") { ... } }
query { products(filters: [...]) { items { ... } } }
query { category(id: "uuid") { ... } }
query { categories { ... } }

# Carrito
query { cart(id: "uuid") { ... } }

# Órdenes
query { order(id: "uuid") { ... } }
query { orders { items { ... } } }

# Cliente
query { customer { ... } }

# Admin
query { adminProduct(id: "uuid") { ... } }
query { adminProducts { ... } }
query { adminOrders { ... } }
```

### Mutations principales

```graphql
mutation { addProductToCart(cartId: "...", productId: "...") }
mutation { createOrder(cartId: "...") }
```

---

## Validación de Payloads

Todos los endpoints REST validan el body con **AJV** usando `payloadSchema.json` por endpoint.

---

## Autenticación API

- **Admin:** JWT en cookie `admin-sid` — generado en login
- **Cliente:** Session cookie `sid` — Express session + PostgreSQL store
- **Middleware:** `[auth]` en el nombre del archivo indica ruta protegida
