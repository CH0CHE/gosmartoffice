# ARQUITECTURA TÉCNICA

**Última actualización:** 2026-06-09

---

## Patrón General

EverShop sigue una arquitectura **modular orientada a eventos** con rendering isomórfico (SSR + hidratación en cliente):

```
Cliente (Browser)
    │
    ▼
Express HTTP Server  ←── Webpack Dev Server (dev) / Static (prod)
    │
    ├── Router (file-based, por módulo)
    │     ├── /admin/* → Middleware auth → Pages Admin (React SSR)
    │     └── /*       → Pages Storefront (React SSR)
    │
    ├── GraphQL Endpoint (/api/graphql)
    │     └── Schema mergeado de todos los módulos
    │
    └── REST APIs (/api/*)
          └── Rutas por módulo (CRUD operations)

    │
    ▼
PostgreSQL 16 (via postgres-query-builder)
```

---

## Stack Tecnológico Completo

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Runtime | Node.js | LTS |
| Framework HTTP | Express | ^4.21.2 |
| Frontend | React | ^17.0.1 |
| GraphQL Server | graphql-js | ^16.6.0 |
| GraphQL Client | urql | ^3.0.3 |
| Base de datos | PostgreSQL | 16 |
| ORM/Query Builder | @evershop/postgres-query-builder | ^2.0.1 |
| CSS Framework | TailwindCSS | ^4.1.18 |
| Compilador | SWC | ^1.11.29 |
| Bundler | Webpack | ^5.72.1 |
| TypeScript | typescript | ^5.8.3 |
| Testing Unit | Jest | ^29.7.0 |
| Testing E2E | Cypress | ^13.15.1 |
| Linting | ESLint | ^9.24.0 |
| Formato | Prettier | 2.8.4 |
| Email | SendGrid | ^8.1.6 |
| Imágenes | Sharp | ^0.33.5 |
| Pagos | Stripe ^21 / PayPal | (no configurados) |

---

## Sistema de Módulos

Cada módulo en `src/modules/<nombre>/` tiene estructura estándar:

```
<módulo>/
├── api/           # REST endpoints (Express middleware chains)
│   └── <ruta>/
│       ├── route.json          # Definición de ruta HTTP
│       ├── payloadSchema.json  # Validación AJV
│       └── *.js/ts             # Middlewares encadenados
├── graphql/       # Schema + Resolvers GraphQL
├── migration/     # Migraciones de base de datos (versioned)
├── pages/         # Páginas React (SSR)
│   ├── admin/     # Páginas del panel administrativo
│   └── frontStore/ # Páginas de la tienda
├── services/      # Lógica de negocio
├── subscribers/   # Event listeners
└── bootstrap.ts   # Inicialización del módulo
```

---

## Sistema de Rutas (File-Based)

Las rutas se definen via `route.json` en cada directorio de API/página. El framework descubre y registra rutas automáticamente en el arranque.

### Naming Convention de Middlewares

Los archivos siguen notación funcional en el nombre:
- `[context]bodyParser[auth].js` → middleware que requiere contexto, parsea body, requiere auth
- `createProduct[finish].ts` → crea producto, después ejecuta `finish`
- `finish[apiResponse].ts` → ejecuta `finish`, después envía respuesta API

---

## Rendering (SSR + Hydration)

1. **Servidor** renderiza React a HTML completo
2. **Cliente** hidrata el HTML con React para interactividad
3. **GraphQL** se usa para data fetching en ambos entornos
4. **Webpack** genera bundles separados para server y client

---

## Sistema de Eventos

EverShop usa un sistema de eventos interno (`lib/event/`) para:
- Desacoplar módulos
- Disparar acciones post-guardado (emails, inventario, etc.)
- Subscribers registrados por cada módulo

---

## Autenticación

| Área | Mecanismo |
|------|----------|
| Admin | JWT + Cookie (`admin-sid`) |
| Cliente | Express Session + Cookie (`sid`) + PostgreSQL session store |

---

## i18n (Internacionalización)

- Archivos CSV en `translations/<lang>/<módulo>.csv`
- Idiomas disponibles: de, es, fa, fr, gr, hu, it, mn, nb, ne, nl, pt, rs, ru, ta, vn, zh
- **Español (es)** existe pero es español genérico — necesita adaptación para Guatemala
- Sistema carga traducciones en runtime

---

## Despliegue

```yaml
# docker-compose.yml
services:
  app:    # Node.js app en puerto 3000
  database: # PostgreSQL 16 en puerto 5432
```

Variables de entorno requeridas:
- `DB_HOST`, `DB_PORT`, `DB_PASSWORD`, `DB_USER`, `DB_NAME`
- Configuración via `config/` (JSON/JS, usa librería `config`)
