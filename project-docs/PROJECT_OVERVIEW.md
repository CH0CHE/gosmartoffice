# PROJECT OVERVIEW — GoSmartOffice / EverShop

**Fecha de auditoría:** 2026-06-09  
**Versión plataforma:** EverShop 2.1.0 / @evershop/evershop 2.1.3  
**Licencia:** GNU GPL 3.0

---

## ¿Qué es este proyecto?

GoSmartOffice es una plataforma eCommerce construida sobre **EverShop**, una solución open-source moderna basada en:

- **Backend:** Node.js + Express
- **Frontend:** React 17 (SSR + Client Hydration)
- **API:** GraphQL (servidor + cliente urql)
- **Base de datos:** PostgreSQL 16
- **CSS:** TailwindCSS 4 + SCSS
- **Build:** Webpack 5 + SWC (compilador ultra-rápido)
- **Testing:** Jest + Cypress (E2E)
- **i18n:** Sistema CSV por módulo/idioma

---

## Estructura del Monorepo

```
gosmartoffice/
├── packages/
│   ├── evershop/              # Plataforma principal
│   ├── create-evershop-app/   # Herramienta de scaffolding
│   └── postgres-query-builder/ # Query builder personalizado
├── translations/              # Archivos CSV de traducción (17 idiomas)
├── seed/                      # Imágenes de datos de prueba
├── docker-compose.yml         # Infraestructura Docker
└── package.json               # Workspace root (npm workspaces)
```

---

## Dos Interfaces Principales

### 1. Backoffice (Admin)
- Ruta base: `/admin`
- Login con JWT
- Gestión completa de catálogo, órdenes, clientes, contenido

### 2. Tienda (Frontend / Storefront)
- Ruta base: `/`
- Navegación de productos, carrito, checkout, cuenta de cliente

---

## Estado Actual

El proyecto es una instalación base de EverShop con:
- **Código fuente completo** del framework incluido en el monorepo
- **Sin configuración de producción** establecida aún
- **Traducciones en español** disponibles pero genéricas (no Guatemala)
- **Pagos online** disponibles (Stripe, PayPal, COD) — ninguno configurado
- **Sin tema personalizado** — usa el tema predeterminado de EverShop

---

## Objetivo del Proyecto

Lanzar un **MVP funcional** orientado al mercado guatemalteco con:
- Flujo de compra sin pago online (pedido manual)
- Interfaz en español latinoamérica
- Panel administrativo operativo
- Listo para producción

Ver detalles en [MVP_SCOPE.md](./MVP_SCOPE.md).
