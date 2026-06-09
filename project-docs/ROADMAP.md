# ROADMAP TÉCNICO

**Última actualización:** 2026-06-09

---

## Fase 1 — MVP (Actual)
**Objetivo:** Tienda funcional con checkout manual  
**Estado:** En planificación

### Sprint 1 — Configuración y Base
- [ ] Configurar entorno de desarrollo local
- [ ] Configurar variables de entorno
- [ ] Configurar docker-compose para desarrollo
- [ ] Crear usuario administrador
- [ ] Configurar tienda (GTQ, Guatemala, español)
- [ ] Configurar zonas de envío Guatemala
- [ ] Activar método de pago COD

### Sprint 2 — Internacionalización
- [ ] Crear directorio `translations/es-GT/` con adaptaciones Guatemala
- [ ] Adaptar `general.csv` para Guatemala
- [ ] Adaptar `catalog.csv` para Guatemala
- [ ] Adaptar `checkout.csv` para Guatemala
- [ ] Adaptar `account.csv` para Guatemala
- [ ] Detectar textos hardcodeados en componentes
- [ ] Traducir textos hardcodeados del admin
- [ ] Configurar `language: "es"` en config

### Sprint 3 — Catálogo y Admin
- [ ] Crear estructura de categorías inicial
- [ ] Crear atributos relevantes para el negocio
- [ ] Configurar imágenes (tamaños, calidad)
- [ ] Verificar flujo completo de creación de producto
- [ ] Verificar upload de imágenes
- [ ] Verificar gestión de variantes

### Sprint 4 — Storefront y UX
- [ ] Verificar responsiveness en móvil
- [ ] Mejorar accesibilidad (ARIA, contraste, teclado)
- [ ] Verificar flujo de checkout completo
- [ ] Verificar emails transaccionales (confirmación de orden)
- [ ] Optimizar imágenes (lazy loading, WebP)
- [ ] Verificar rendimiento (Core Web Vitals)

### Sprint 5 — QA y Producción
- [ ] Testing E2E del flujo de compra completo
- [ ] Configurar nginx + SSL (HTTPS)
- [ ] Configurar backup automático PostgreSQL
- [ ] Configurar logs de producción
- [ ] Variables de entorno de producción
- [ ] Deploy inicial
- [ ] Smoke testing en producción

---

## Fase 2 — Pagos Online
**Objetivo:** Habilitar cobros con tarjeta/digital  
**Estimación:** 4-6 semanas después del MVP

- [ ] Evaluación de pasarela de pago local (Guatemala)
  - Opción A: Stripe (disponible en Guatemala)
  - Opción B: PayPal
  - Opción C: Pasarela local (Cybersource, Transactel, etc.)
- [ ] Configurar webhook de confirmación de pago
- [ ] Actualizar flujo de checkout
- [ ] Testing de pagos en sandbox
- [ ] Activar en producción

---

## Fase 3 — Promociones y Fidelización
**Objetivo:** Herramientas de retención y conversión

- [ ] Activar módulo `promotion`
- [ ] Cupones de descuento
- [ ] Descuentos por volumen
- [ ] Emails de carrito abandonado
- [ ] Wishlist

---

## Fase 4 — Fiscal y Compliance Guatemala
**Objetivo:** Cumplimiento SAT Guatemala

- [ ] Investigar requerimientos SAT para eCommerce
- [ ] Factura electrónica en línea (FEL)
- [ ] Integración con sistema de facturación
- [ ] Módulo de impuestos (IVA 12%)
- [ ] Reportes fiscales

---

## Fase 5 — Escalabilidad
**Objetivo:** Preparar para crecimiento

- [ ] Redis para sessions (reemplazar session-file-store)
- [ ] CDN para imágenes (Cloudinary o S3)
- [ ] Optimización de queries GraphQL (N+1, DataLoader)
- [ ] Caching de catálogo
- [ ] Monitoreo (Sentry, DataDog)
- [ ] Auto-scaling

---

## Fase 6 — Mejoras de Producto
**Objetivo:** Enriquecer la experiencia

- [ ] Reviews y calificaciones de productos
- [ ] Comparación de productos
- [ ] Búsqueda avanzada (Elasticsearch/Algolia)
- [ ] Reportes avanzados
- [ ] App móvil (React Native o PWA)
- [ ] Programa de puntos/lealtad
