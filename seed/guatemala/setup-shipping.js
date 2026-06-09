/**
 * Script de configuración inicial de zonas de envío para Guatemala.
 *
 * Uso: node seed/guatemala/setup-shipping.js
 *
 * Requiere que las migraciones ya hayan sido ejecutadas (npm run setup).
 * Requiere las variables de entorno DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME.
 */

import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pg;

const client = new Client({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'postgres'
});

async function setupGuatemalaShipping() {
  await client.connect();
  console.log('✓ Conectado a la base de datos');

  try {
    await client.query('BEGIN');

    // -------------------------
    // Zona 1: Guatemala Ciudad
    // -------------------------
    const zone1 = await client.query(`
      INSERT INTO shipping_zone (name, country)
      VALUES ('Guatemala Ciudad', 'GT')
      ON CONFLICT DO NOTHING
      RETURNING shipping_zone_id
    `);

    if (zone1.rows.length > 0) {
      const zoneId1 = zone1.rows[0].shipping_zone_id;
      console.log(`✓ Zona creada: Guatemala Ciudad (ID: ${zoneId1})`);

      // Departamentos de Guatemala Ciudad
      const capitalDeps = ['Guatemala'];
      for (const dep of capitalDeps) {
        await client.query(`
          INSERT INTO shipping_zone_province (zone_id, province)
          VALUES ($1, $2)
          ON CONFLICT DO NOTHING
        `, [zoneId1, dep]);
      }
      console.log('  ✓ Departamentos asignados: Guatemala');

      // Método de envío: Entrega en ciudad
      const method1 = await client.query(`
        INSERT INTO shipping_method (name)
        VALUES ('Envío a domicilio - Ciudad')
        ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
        RETURNING shipping_method_id
      `);
      const methodId1 = method1.rows[0].shipping_method_id;

      await client.query(`
        INSERT INTO shipping_zone_method (zone_id, method_id, amount, calculate_based_on, price_type)
        VALUES ($1, $2, 25.00, 'order_total', 'flat')
        ON CONFLICT DO NOTHING
      `, [zoneId1, methodId1]);
      console.log('  ✓ Método: Envío a domicilio - Ciudad (Q25.00)');

      // Método: Envío gratis sobre Q500
      const method2 = await client.query(`
        INSERT INTO shipping_method (name)
        VALUES ('Envío gratis (pedidos sobre Q500)')
        ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
        RETURNING shipping_method_id
      `);
      const methodId2 = method2.rows[0].shipping_method_id;

      await client.query(`
        INSERT INTO shipping_zone_method (zone_id, method_id, amount, calculate_based_on, price_type)
        VALUES ($1, $2, 0.00, 'order_total', 'flat')
        ON CONFLICT DO NOTHING
      `, [zoneId1, methodId2]);
      console.log('  ✓ Método: Envío gratis (Q0.00)');
    } else {
      console.log('  ℹ Zona Guatemala Ciudad ya existe, omitiendo...');
    }

    // -------------------------
    // Zona 2: Interior República
    // -------------------------
    const zone2 = await client.query(`
      INSERT INTO shipping_zone (name, country)
      VALUES ('Interior de la República', 'GT')
      ON CONFLICT DO NOTHING
      RETURNING shipping_zone_id
    `);

    if (zone2.rows.length > 0) {
      const zoneId2 = zone2.rows[0].shipping_zone_id;
      console.log(`✓ Zona creada: Interior de la República (ID: ${zoneId2})`);

      // Departamentos del interior
      const interiorDeps = [
        'Alta Verapaz', 'Baja Verapaz', 'Chimaltenango', 'Chiquimula',
        'El Progreso', 'Escuintla', 'Huehuetenango', 'Izabal',
        'Jalapa', 'Jutiapa', 'Petén', 'Quetzaltenango',
        'Quiché', 'Retalhuleu', 'Sacatepéquez', 'San Marcos',
        'Santa Rosa', 'Sololá', 'Suchitepéquez', 'Totonicapán',
        'Zacapa'
      ];

      for (const dep of interiorDeps) {
        await client.query(`
          INSERT INTO shipping_zone_province (zone_id, province)
          VALUES ($1, $2)
          ON CONFLICT DO NOTHING
        `, [zoneId2, dep]);
      }
      console.log(`  ✓ ${interiorDeps.length} departamentos asignados`);

      // Método: Envío por agencia
      const method3 = await client.query(`
        INSERT INTO shipping_method (name)
        VALUES ('Envío por agencia - Interior')
        ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
        RETURNING shipping_method_id
      `);
      const methodId3 = method3.rows[0].shipping_method_id;

      await client.query(`
        INSERT INTO shipping_zone_method (zone_id, method_id, amount, calculate_based_on, price_type)
        VALUES ($1, $2, 50.00, 'order_total', 'flat')
        ON CONFLICT DO NOTHING
      `, [zoneId2, methodId3]);
      console.log('  ✓ Método: Envío por agencia - Interior (Q50.00)');
    } else {
      console.log('  ℹ Zona Interior ya existe, omitiendo...');
    }

    // -------------------------
    // Zona 3: Todo Guatemala (fallback)
    // -------------------------
    const zone3 = await client.query(`
      INSERT INTO shipping_zone (name, country)
      VALUES ('Guatemala (Nacional)', 'GT')
      ON CONFLICT DO NOTHING
      RETURNING shipping_zone_id
    `);

    if (zone3.rows.length > 0) {
      const zoneId3 = zone3.rows[0].shipping_zone_id;
      console.log(`✓ Zona creada: Guatemala (Nacional) (ID: ${zoneId3})`);

      const method4 = await client.query(`
        INSERT INTO shipping_method (name)
        VALUES ('Envío estándar')
        ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
        RETURNING shipping_method_id
      `);
      const methodId4 = method4.rows[0].shipping_method_id;

      await client.query(`
        INSERT INTO shipping_zone_method (zone_id, method_id, amount, calculate_based_on, price_type)
        VALUES ($1, $2, 40.00, 'order_total', 'flat')
        ON CONFLICT DO NOTHING
      `, [zoneId3, methodId4]);
      console.log('  ✓ Método: Envío estándar (Q40.00)');
    }

    await client.query('COMMIT');
    console.log('\n✓ Configuración de zonas de envío completada exitosamente.');
    console.log('\n📋 Resumen:');
    console.log('  - Guatemala Ciudad: Q25.00 / Gratis sobre Q500');
    console.log('  - Interior República: Q50.00 por agencia');
    console.log('  - Nacional (fallback): Q40.00');
    console.log('\n💡 Siguiente paso: Activar el método de pago COD en el admin');
    console.log('   Admin → Configuración → Pago → Pago Contra Entrega');

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('✗ Error durante la configuración:', error.message);
    throw error;
  } finally {
    await client.end();
  }
}

setupGuatemalaShipping().catch((err) => {
  console.error(err);
  process.exit(1);
});
