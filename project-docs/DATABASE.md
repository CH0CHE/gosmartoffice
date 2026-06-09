# ESTRUCTURA DE BASE DE DATOS

**Motor:** PostgreSQL 16  
**Última actualización:** 2026-06-09

---

## Convenciones

- Todas las tablas tienen `<nombre>_id` (INT, auto-increment) como PK
- Todas las tablas tienen `uuid` (UUID, auto-generado) como identificador público
- Timestamps: `created_at`, `updated_at` con timezone
- Foreign keys con CASCADE donde aplica

---

## Módulo: AUTH

### `admin_user`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| admin_user_id | INT PK | Identificador interno |
| uuid | UUID UNIQUE | Identificador público |
| name | varchar | Nombre del administrador |
| email | varchar UNIQUE | Email de login |
| password | varchar | Hash bcrypt |
| status | boolean | Activo/inactivo |

---

## Módulo: CATALOG

### `product`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| product_id | INT PK | — |
| uuid | UUID UNIQUE | — |
| sku | varchar UNIQUE | SKU del producto |
| price | decimal(12,4) | Precio base |
| weight | decimal(12,4) | Peso |
| manage_stock | boolean | ¿Gestionar inventario? |
| stock_availability | boolean | Disponible |
| qty | INT | Cantidad en stock |
| visibility | boolean | Visible en tienda |
| status | boolean | Activo/inactivo |
| category_id | INT FK | Categoría principal |

### `product_description`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| product_description_id | INT PK | — |
| product_description_product_id | INT FK → product | — |
| name | varchar | Nombre del producto |
| description | text | Descripción HTML |
| short_description | text | Descripción corta |
| url_key | varchar UNIQUE | Slug URL |
| meta_title | varchar | SEO title |
| meta_description | text | SEO description |
| meta_keywords | text | SEO keywords |

### `product_image`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| product_image_id | INT PK | — |
| product_image_product_id | INT FK → product | — |
| origin_image | varchar | Ruta imagen original |
| is_main | boolean | ¿Imagen principal? |
| listing | varchar | Thumbnail listing |
| thumbnail | varchar | Thumbnail pequeño |
| single | varchar | Imagen vista producto |

### `category`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| category_id | INT PK | — |
| uuid | UUID UNIQUE | — |
| parent_id | INT FK → category | Categoría padre (null = raíz) |
| status | boolean | Activa |
| include_in_nav | boolean | Mostrar en navegación |
| position | INT | Orden de aparición |

### `category_description`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| category_description_id | INT PK | — |
| category_description_category_id | INT FK → category | — |
| name | varchar | Nombre |
| short_description | text | Descripción corta |
| description | text | Descripción larga |
| image | varchar | Imagen banner |
| url_key | varchar UNIQUE | Slug URL |
| meta_title | varchar | SEO |
| meta_description | text | SEO |
| meta_keywords | text | SEO |

### `attribute`
Atributos configurables (color, talla, etc.)

### `variant_group`
Grupo de variantes de un producto.

### `collection`
Colecciones de productos para páginas destacadas.

---

## Módulo: CHECKOUT

### `cart`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| cart_id | INT PK | — |
| uuid | UUID UNIQUE | — |
| sid | varchar | Session ID |
| currency | varchar | Moneda (ej: GTQ, USD) |
| customer_id | INT FK | Cliente (opcional) |
| customer_email | varchar | Email |
| customer_full_name | varchar | Nombre |
| status | boolean | false=activo, true=convertido a orden |
| coupon | varchar | Cupón aplicado |
| sub_total | decimal(12,4) | Subtotal sin impuestos |
| grand_total | decimal(12,4) | Total final |
| shipping_method | varchar | Método de envío seleccionado |
| payment_method | varchar | Método de pago seleccionado |
| shipping_address_id | INT FK → cart_address | — |

### `cart_item`
Un ítem dentro del carrito.

### `cart_address`
Dirección de envío/facturación del carrito.

### `order`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| order_id | INT PK | — |
| uuid | UUID UNIQUE | — |
| order_number | varchar UNIQUE | Número visible (#00001) |
| status | varchar | new / processing / completed / canceled / closed |
| payment_status | varchar | pending / paid / failed |
| shipment_status | varchar | pending / processing / shipped / delivered |
| cart_id | INT FK | Carrito de origen |
| customer_email | varchar | — |
| grand_total | decimal(12,4) | — |

### `order_item`
Ítems de la orden (snapshot del momento de compra).

### `shipping_zone` y `shipping_zone_method`
Zonas geográficas y métodos de envío disponibles con tarifas.

---

## Módulo: CUSTOMER

### `customer`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| customer_id | INT PK | — |
| uuid | UUID UNIQUE | — |
| email | varchar UNIQUE | — |
| password | varchar | Hash bcrypt |
| full_name | varchar | — |
| status | boolean | Activo |
| group_id | INT FK | Grupo de cliente |

### `customer_address`
Direcciones guardadas del cliente.

---

## Módulo: OMS

### `order_activity`
Historial de cambios de estado de la orden.

### `shipment`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| shipment_id | INT PK | — |
| order_id | INT FK | — |
| carrier | varchar | Empresa transportista |
| tracking_number | varchar | Número de rastreo |

---

## Módulo: CMS

### `cms_page`
Páginas de contenido (Acerca de, Términos, etc.)

---

## Módulo: PROMOTION

### `coupon`
Cupones de descuento con condiciones y límites de uso.

---

## Módulo: TAX

### `tax_class` y `tax_rate`
Clases de impuesto y tasas por zona geográfica.

---

## Módulo: BASE / SETTING

### `setting`
Tabla key-value para configuración dinámica de la tienda.

### `migration`
Control de versiones de migraciones aplicadas.

---

## Relaciones Principales

```
category (árbol) ─────── product (producto)
                               │
                    product_image, product_description,
                    product_attribute_value, variant_group
                               │
                          cart_item ────── cart ──── cart_address
                               │               │
                           order_item ──── order ─── order_address
                                              │
                                     order_activity, shipment
                                              │
                                          customer
```
