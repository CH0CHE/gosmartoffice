# TASK LIST — MVP GoSmartOffice

**Última actualización:** 2026-06-09  
**Metodología:** Prioridad (P1=Crítico, P2=Alto, P3=Medio, P4=Bajo)

---

## Estado actual

| Estado | Count |
|--------|-------|
| Pending | 42 |
| In Progress | 0 |
| Blocked | 2 |
| Completed | 0 |

---

## FASE 0 — Preparación del Entorno

| ID | Tarea | Prioridad | Esfuerzo | Estado | Dependencias |
|----|-------|-----------|----------|--------|--------------|
| T-001 | Crear archivo de configuración `config/default.json` basado en `configExample.text` | P1 | 30min | Pending | — |
| T-002 | Configurar variables de entorno de DB en `docker-compose.yml` para dev | P1 | 15min | Pending | — |
| T-003 | Compilar el proyecto (`npm run compile`) | P1 | 10min | Pending | T-001 |
| T-004 | Ejecutar migraciones de base de datos (`npm run setup`) | P1 | 10min | Pending | T-002, T-003 |
| T-005 | Crear usuario administrador (`npm run user:create`) | P1 | 5min | Pending | T-004 |
| T-006 | Verificar que la aplicación arranca en modo dev | P1 | 10min | Pending | T-003 |
| T-007 | Verificar acceso al panel admin en `/admin` | P1 | 5min | Pending | T-005, T-006 |

---

## FASE 1 — Configuración de la Tienda

| ID | Tarea | Prioridad | Esfuerzo | Estado | Dependencias |
|----|-------|-----------|----------|--------|--------------|
| T-010 | Configurar moneda GTQ en `config/default.json` | P1 | 15min | Pending | T-001 |
| T-011 | Verificar soporte GTQ en `zero-decimal-currencies` | P1 | 30min | Pending | — |
| T-012 | Configurar idioma `es` en config | P1 | 10min | Pending | T-001 |
| T-013 | Configurar zona horaria `America/Guatemala` | P1 | 10min | Pending | T-001 |
| T-014 | Configurar URL base de la tienda en config | P1 | 10min | Pending | T-001 |
| T-015 | Configurar SendGrid para emails transaccionales | P2 | 45min | Blocked | Requiere API key SendGrid |
| T-016 | Configurar zona de envío: Guatemala Ciudad | P1 | 30min | Pending | T-007 |
| T-017 | Configurar zona de envío: Interior República | P2 | 20min | Pending | T-016 |
| T-018 | Activar método de pago COD | P1 | 15min | Pending | T-007 |
| T-019 | Configurar nombre, logo y datos de la tienda | P1 | 30min | Pending | T-007 |

---

## FASE 2 — Internacionalización (i18n Guatemala)

| ID | Tarea | Prioridad | Esfuerzo | Estado | Dependencias |
|----|-------|-----------|----------|--------|--------------|
| T-020 | Auditar `translations/es/general.csv` para términos guatemaltecos | P1 | 1h | Pending | — |
| T-021 | Auditar `translations/es/catalog.csv` — adaptar para Guatemala | P1 | 1h | Pending | — |
| T-022 | Auditar `translations/es/checkout.csv` — adaptar para Guatemala | P1 | 1h | Pending | — |
| T-023 | Auditar `translations/es/account.csv` — adaptar para Guatemala | P1 | 45min | Pending | — |
| T-024 | Buscar y traducir textos hardcodeados en componentes del admin | P2 | 3h | Pending | — |
| T-025 | Buscar y traducir textos hardcodeados en componentes del storefront | P2 | 3h | Pending | — |
| T-026 | Traducir mensajes de error de validación | P2 | 1h | Pending | T-021, T-022 |
| T-027 | Traducir emails transaccionales (plantillas Handlebars) | P2 | 2h | Pending | T-015 |
| T-028 | Traducir textos del módulo COD | P1 | 30min | Pending | — |
| T-029 | Verificar que el selector de idioma funciona correctamente | P1 | 30min | Pending | T-020-T-028 |

---

## FASE 3 — Catálogo y Admin

| ID | Tarea | Prioridad | Esfuerzo | Estado | Dependencias |
|----|-------|-----------|----------|--------|--------------|
| T-030 | Verificar flujo completo: crear categoría desde admin | P1 | 30min | Pending | T-007 |
| T-031 | Verificar flujo completo: crear producto con imágenes | P1 | 45min | Pending | T-007 |
| T-032 | Verificar gestión de variantes (color/talla) | P2 | 45min | Pending | T-031 |
| T-033 | Verificar subida de imágenes y redimensionado con Sharp | P1 | 30min | Pending | T-031 |
| T-034 | Verificar gestión de inventario (stock, disponibilidad) | P1 | 30min | Pending | T-031 |
| T-035 | Verificar gestión de atributos desde admin | P2 | 30min | Pending | T-007 |
| T-036 | Crear datos de prueba: categorías y productos iniciales | P2 | 2h | Pending | T-030, T-031 |

---

## FASE 4 — Storefront y UX

| ID | Tarea | Prioridad | Esfuerzo | Estado | Dependencias |
|----|-------|-----------|----------|--------|--------------|
| T-040 | Verificar homepage en mobile (375px, 414px) | P1 | 30min | Pending | T-036 |
| T-041 | Verificar vista de categoría en mobile | P1 | 30min | Pending | T-036 |
| T-042 | Verificar vista de producto en mobile | P1 | 30min | Pending | T-036 |
| T-043 | Verificar carrito en mobile | P1 | 30min | Pending | T-036 |
| T-044 | Verificar checkout completo en mobile | P1 | 1h | Pending | T-018 |
| T-045 | Auditoría de accesibilidad: contraste de colores (WCAG AA) | P2 | 2h | Pending | — |
| T-046 | Auditoría de accesibilidad: navegación por teclado | P2 | 2h | Pending | — |
| T-047 | Auditoría de accesibilidad: labels ARIA en formularios | P2 | 2h | Pending | — |
| T-048 | Verificar lazy loading de imágenes en listing | P2 | 30min | Pending | T-033 |
| T-049 | Verificar Core Web Vitals (LCP, CLS, FID) | P2 | 1h | Pending | T-040-T-044 |

---

## FASE 5 — Flujo de Orden y OMS

| ID | Tarea | Prioridad | Esfuerzo | Estado | Dependencias |
|----|-------|-----------|----------|--------|--------------|
| T-050 | Test E2E: flujo completo de compra (browse → orden creada) | P1 | 2h | Pending | T-044 |
| T-051 | Verificar email de confirmación al cliente | P1 | 30min | Pending | T-015, T-050 |
| T-052 | Verificar visualización de órdenes en admin | P1 | 30min | Pending | T-050 |
| T-053 | Verificar cambio de estado de orden en admin | P1 | 30min | Pending | T-052 |
| T-054 | Verificar actualización de inventario al confirmar orden | P1 | 30min | Pending | T-050 |
| T-055 | Verificar re-stock al cancelar orden | P2 | 20min | Pending | T-053 |

---

## FASE 6 — Producción

| ID | Tarea | Prioridad | Esfuerzo | Estado | Dependencias |
|----|-------|-----------|----------|--------|--------------|
| T-060 | Configurar servidor de producción (VPS/Cloud) | P1 | 2h | Blocked | Requiere acceso a infraestructura |
| T-061 | Configurar nginx como reverse proxy | P1 | 1h | Pending | T-060 |
| T-062 | Configurar SSL/HTTPS con Let's Encrypt | P1 | 30min | Pending | T-061 |
| T-063 | Configurar variables de entorno de producción | P1 | 30min | Pending | T-060 |
| T-064 | Configurar backup automático de PostgreSQL | P1 | 1h | Pending | T-060 |
| T-065 | Build de producción (`npm run build`) | P1 | 10min | Pending | T-003 |
| T-066 | Deploy inicial en producción | P1 | 1h | Pending | T-060-T-065 |
| T-067 | Smoke testing en producción | P1 | 1h | Pending | T-066 |

---

## DEUDA TÉCNICA IDENTIFICADA

| ID | Descripción | Impacto | Esfuerzo |
|----|-------------|---------|----------|
| DT-001 | React 17 → React 18/19 (tipos ya apuntan a ^19) | Bajo | Alto |
| DT-002 | `connect-pg-simple` → Redis para sessions en producción | Medio | Medio |
| DT-003 | Configurar CSP (Content Security Policy) headers | Alto | Medio |
| DT-004 | Revisar `@types/react ^19` vs React 17 (posibles incompatibilidades) | Medio | Bajo |
| DT-005 | Configurar rate limiting en APIs | Alto | Bajo |
| DT-006 | Configurar `helmet.js` para headers de seguridad HTTP | Alto | Bajo |

---

## NOTAS DE BLOQUEO

- **T-015, T-027**: Requieren API Key de SendGrid. Contactar al responsable de infraestructura.
- **T-060**: Requiere decisión sobre proveedor de hosting (AWS, GCP, DigitalOcean, hosting local, etc.).
