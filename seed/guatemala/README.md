# Seeds de Configuración — Guatemala

Scripts de configuración inicial para el mercado guatemalteco.

## Prerrequisitos

1. Docker corriendo con PostgreSQL: `docker compose up -d`
2. Migraciones aplicadas: `npm run setup`
3. Usuario admin creado: `npm run user:create`

## Scripts disponibles

### `setup-shipping.js` — Zonas de envío Guatemala

Configura las zonas de envío para el mercado guatemalteco:

| Zona | Departamentos | Métodos |
|------|--------------|---------|
| Guatemala Ciudad | Guatemala | Envío a domicilio Q25 / Gratis sobre Q500 |
| Interior República | 21 departamentos | Envío por agencia Q50 |
| Nacional (fallback) | Todo GT | Envío estándar Q40 |

**Cómo ejecutar:**

```bash
# Con variables de entorno (ajustar según tu configuración)
DB_HOST=localhost DB_PORT=5432 DB_USER=postgres DB_PASSWORD=postgres DB_NAME=postgres \
  node seed/guatemala/setup-shipping.js
```

O con un archivo `.env` en la raíz del proyecto:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=postgres
```

```bash
node seed/guatemala/setup-shipping.js
```

## Configuración manual restante (en Admin)

Después de ejecutar los scripts:

1. **Activar COD (Pago Contra Entrega):**
   - Admin → Configuración → Pago
   - Habilitar "Cash on Delivery"
   - Nombre a mostrar: `Pago Contra Entrega`

2. **Datos de la tienda:**
   - Admin → Configuración → Tienda
   - Nombre, email, teléfono, dirección
   - Logo y favicon

3. **Ajustar tarifas de envío:**
   - Admin → Configuración → Envío
   - Revisar y ajustar las tarifas creadas por el script

## Precios de envío sugeridos (ajustar según el negocio)

| Zona | Tarifa inicial | Notas |
|------|---------------|-------|
| Guatemala Ciudad | Q25.00 | Tarifa estándar |
| Guatemala Ciudad | Q0.00 (libre) | Para pedidos > Q500 |
| Interior | Q50.00 | Por agencia (Guatex, Cargo Exprés) |

Estos valores son sugerencias. El admin puede modificarlos en cualquier momento desde el panel.
