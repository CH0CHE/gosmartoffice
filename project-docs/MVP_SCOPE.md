# ALCANCE DEL MVP

**Última actualización:** 2026-06-09  
**Target:** Mercado guatemalteco — Español Latinoamérica (Guatemala)

---

## Filosofía del MVP

> El MVP no es el producto más pequeño posible, es el producto más pequeño que entrega valor real a los primeros clientes.

El objetivo es **salir a producción** con un flujo de compra completo pero sin integración de pagos online. Las órdenes se procesan manualmente por el equipo operativo.

---

## MÓDULOS INCLUIDOS EN EL MVP

### Módulo `auth` — INCLUIDO
- Login/logout de administradores
- Protección del panel admin

### Módulo `base` — INCLUIDO
- Infraestructura core del framework
- Assets, routing, layouts

### Módulo `catalog` — INCLUIDO (completo)
- Productos con imágenes y variantes
- Categorías jerarquizadas
- Atributos configurables
- Búsqueda de productos

### Módulo `checkout` — INCLUIDO (sin pagos online)
- Carrito de compras
- Checkout con contacto + dirección + envío
- Creación de órdenes
- Zonas de envío configurables

### Módulo `oms` — INCLUIDO
- Visualización y gestión de órdenes
- Cambio de estados
- Tracking básico de envíos

### Módulo `graphql` — INCLUIDO
- Motor GraphQL (requerido por todos los módulos)

### Módulo `setting` — INCLUIDO
- Configuración general de la tienda
- Configuración de envíos

### Módulo `customer` — INCLUIDO
- Registro y login de clientes
- Historial de órdenes (self-service)

### Módulo `cod` — INCLUIDO ✓
- "Pago Contra Entrega" como único método de pago
- Perfecto para el flujo MVP manual

### Módulo `cms` — INCLUIDO PARCIALMENTE
- Solo páginas estáticas básicas (Términos, Contacto, Acerca de)
- Widgets no prioritarios

---

## MÓDULOS EXCLUIDOS DEL MVP

| Módulo | Razón | Fase futura |
|--------|-------|-------------|
| `stripe` | Pagos online no requeridos en MVP | Fase 2 |
| `paypal` | Ídem | Fase 2 |
| `promotion` | Cupones no críticos | Fase 2 |
| `tax` | Régimen fiscal pendiente de definir | Fase 2/3 |

---

## FUNCIONALIDADES INCLUIDAS EN MVP

### Admin (Backoffice)
- [x] Login administrativo seguro
- [x] Dashboard con métricas básicas
- [x] CRUD completo de productos (con imágenes)
- [x] CRUD completo de categorías
- [x] Gestión de atributos y variantes
- [x] Visualización y gestión de órdenes
- [x] Cambio de estados de órdenes
- [x] Gestión básica de inventario (qty, disponibilidad)
- [x] Configuración de zonas y métodos de envío
- [x] Configuración general de la tienda
- [x] Gestión de clientes

### Tienda (Storefront)
- [x] Homepage con productos/categorías destacados
- [x] Navegación por categorías (árbol)
- [x] Búsqueda de productos
- [x] Vista detalle de producto con variantes
- [x] Carrito de compras persistente
- [x] Checkout completo (contacto + dirección + envío + pago)
- [x] Confirmación de pedido con número de orden
- [x] Cuenta de cliente (registro, login, historial)
- [x] Interfaz completa en español (Guatemala)

---

## FUNCIONALIDADES EXCLUIDAS DEL MVP

- [ ] Pago con tarjeta de crédito (Stripe)
- [ ] Pago con PayPal
- [ ] Integración bancaria local (Banrural, BAM, etc.)
- [ ] Facturación electrónica (SAT Guatemala)
- [ ] Cupones y descuentos
- [ ] Programa de lealtad / puntos
- [ ] Wishlist / Lista de deseos
- [ ] Reseñas y calificaciones
- [ ] Marketplace / Multi-vendor
- [ ] Notificaciones push
- [ ] App móvil
- [ ] Integración con sistemas ERP
- [ ] Reportes avanzados

---

## FLUJO DE COMPRA MVP (Detallado)

```
1. CLIENTE navega la tienda
   └── Homepage → Categoría → Búsqueda

2. CLIENTE selecciona producto
   └── Vista de producto → selecciona variante → "Agregar al carrito"

3. CLIENTE va al checkout
   └── Vista carrito → "Ir al checkout"

4. CLIENTE completa información
   ├── Paso 1: Nombre + Email + Teléfono
   ├── Paso 2: Dirección de envío completa
   ├── Paso 3: Método de envío (según zona)
   └── Paso 4: Método de pago → "Pago Contra Entrega (COD)"

5. CLIENTE confirma pedido
   └── Botón "Realizar Pedido" → Orden creada

6. SISTEMA genera orden
   ├── Número de orden: #00001
   ├── Estado: "New"
   ├── Estado de pago: "Pending"
   └── Email de confirmación al cliente

7. OPERADOR recibe la orden en el admin
   ├── Revisa los datos
   ├── Cambia estado a "Processing"
   ├── Coordina entrega con transportista
   ├── Actualiza estado de envío + tracking
   └── Al entregar: marca como "Completed" + pago "Paid"
```

---

## CONFIGURACIÓN INICIAL NECESARIA

Para el MVP se debe configurar:

1. **Datos de la tienda:**
   - Nombre, email, teléfono
   - Moneda: GTQ (Quetzal guatemalteco)
   - Idioma: es (español)
   - Zona horaria: America/Guatemala

2. **Zonas de envío:**
   - Guatemala Ciudad (mínimo)
   - Interior de la república
   - Tarifas por zona

3. **Método de pago:**
   - COD activado

4. **Usuario administrador:**
   - Crear via CLI: `npm run user:create`

5. **Productos iniciales:**
   - Categorías base
   - Al menos 1 producto de ejemplo

6. **Página de contenido:**
   - Términos y condiciones
   - Política de privacidad
   - Contacto

---

## CRITERIOS DE ACEPTACIÓN MVP

- [ ] Admin puede crear y publicar productos con imágenes
- [ ] Cliente puede navegar y buscar productos
- [ ] Cliente puede agregar al carrito y hacer checkout
- [ ] Orden se genera con número único
- [ ] Admin puede ver y gestionar la orden
- [ ] Todo el texto en español latinoamérica
- [ ] Funciona en móvil y escritorio
- [ ] Tiempo de carga < 3 segundos
- [ ] Sin errores críticos en consola

---

## RIESGOS DEL MVP

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|-----------|
| Zona horaria Guatemala no configurada | Media | Bajo | Configurar en config |
| Moneda GTQ no soportada | Baja | Alto | Verificar zero-decimal-currencies |
| Traducciones incompletas (Guatemala) | Alta | Medio | Revisar y completar translations/es/ |
| Docker en producción sin SSL | Alta | Alto | Configurar nginx + certbot |
| Sin backup de DB | Alta | Alto | Configurar backup automático |
