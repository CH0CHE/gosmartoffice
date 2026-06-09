# REGISTRO DE DECISIONES ARQUITECTÓNICAS (ADR)

**Última actualización:** 2026-06-09

---

## ADR-001: Uso de EverShop como base
**Fecha:** 2026-06-09  
**Estado:** Aceptado

**Contexto:** Se necesita una plataforma eCommerce para el mercado guatemalteco.

**Decisión:** Usar EverShop como base en lugar de construir desde cero.

**Razones:**
- Monorepo TypeScript moderno con arquitectura limpia
- GraphQL nativo
- Sistema de módulos extensible
- Licencia GPL-3.0 permite uso comercial
- PostgreSQL como base de datos (confiable, relacional)
- Activo con comunidad y mantenimiento

**Consecuencias:**
- Dependencia de la arquitectura de EverShop
- Actualizaciones deben seguir el ciclo del proyecto upstream
- Personalizaciones deben mantenerse aisladas en extensiones/temas

---

## ADR-002: MVP sin pagos online
**Fecha:** 2026-06-09  
**Estado:** Aceptado

**Contexto:** El proceso de integración de pagos online requiere contratos bancarios, certificaciones PCI-DSS y tiempo de desarrollo adicional.

**Decisión:** El MVP usará únicamente COD (Cash on Delivery / Pago Contra Entrega). Las órdenes serán procesadas manualmente por el equipo operativo.

**Razones:**
- Reduce el tiempo al mercado significativamente
- Evita complejidad técnica y legal inicial
- El flujo operativo manual es viable para bajo volumen inicial
- COD ya está implementado en EverShop (módulo `cod`)

**Consecuencias:**
- Operación manual requerida por cada orden
- No escala bien con volumen alto
- Debe planificarse Fase 2 (pagos online) desde el inicio

---

## ADR-003: Idioma español latinoamérica (Guatemala)
**Fecha:** 2026-06-09  
**Estado:** Aceptado

**Contexto:** El mercado objetivo es Guatemala.

**Decisión:** Configurar el idioma como español (`es`) y adaptar las traducciones para el contexto guatemalteco. NO crear un código de idioma nuevo (`es-GT`) inicialmente para simplificar la configuración.

**Razones:**
- EverShop ya tiene traducciones en `es` que cubren el 80% de las necesidades
- Las diferencias entre `es` genérico y `es-GT` son menores (vocabulario, no gramática)
- Crear `es-GT` requeriría modificar el sistema de locale del framework

**Consecuencias:**
- Se adaptan los archivos `translations/es/*.csv` con términos guatemaltecos
- Términos a adaptar: "Postal code" → "Código postal", moneda GTQ, etc.

---

## ADR-004: Módulos excluidos del MVP
**Fecha:** 2026-06-09  
**Estado:** Aceptado

**Decisión:** Los módulos `stripe`, `paypal`, `promotion` y `tax` no se activan en el MVP.

**Razones:**
- `stripe`/`paypal`: Pagos online fuera del alcance MVP (ver ADR-002)
- `promotion`: Los cupones no son críticos para el lanzamiento inicial
- `tax`: La configuración fiscal guatemalteca (IVA 12%) requiere análisis legal separado

**Consecuencias:**
- El código de estos módulos permanece en el repositorio pero inactivo
- Se documentan para activación futura en la Fase 2+

---

## ADR-005: Docker para infraestructura
**Fecha:** 2026-06-09  
**Estado:** Aceptado

**Decisión:** Usar Docker y docker-compose para el despliegue tanto en desarrollo como en producción.

**Razones:**
- EverShop ya incluye `docker-compose.yml` y `Dockerfile` configurados
- Facilita la replicación del entorno
- Aisla dependencias (Node.js, PostgreSQL)

**Consecuencias:**
- Se necesita configurar nginx como reverse proxy para producción
- SSL/HTTPS debe configurarse externamente (nginx + certbot)
- Backup de PostgreSQL debe configurarse como cron job

---

## ADR-006: No modificar el código core de EverShop
**Fecha:** 2026-06-09  
**Estado:** Aceptado

**Decisión:** Todas las personalizaciones deben hacerse via extensiones y temas, no modificando `packages/evershop/src/` directamente.

**Razones:**
- Permite actualizaciones del upstream sin conflictos
- Mantiene la arquitectura modular de EverShop
- Las extensiones se ubican en `extensions/` y los temas en `themes/`

**Consecuencias:**
- Las modificaciones de UI van en un tema personalizado
- La lógica de negocio adicional va en extensiones
- Las traducciones se pueden modificar directamente en `translations/es/`

---

## ADR-007: Moneda GTQ (Quetzal)
**Fecha:** 2026-06-09  
**Estado:** Pendiente de verificación

**Contexto:** El mercado es Guatemala, la moneda es el Quetzal (GTQ).

**Decisión:** Configurar la moneda como GTQ.

**Riesgo identificado:** EverShop usa la librería `zero-decimal-currencies` para determinar el manejo de decimales. Debe verificarse que GTQ esté incluido y que el formato de precios sea correcto (Q250.00).

**Acción pendiente:** Verificar soporte de GTQ en `zero-decimal-currencies` y configurar el símbolo de moneda correcto.
