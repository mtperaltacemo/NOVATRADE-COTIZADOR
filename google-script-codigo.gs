// COTIZADOR NOVATRADE - recibe los datos de la app y los guarda en esta hoja de Google.
// 1) Cambie la clave por una suya (la misma que pondrá en la app).
const CLAVE = 'CAMBIE-ESTA-CLAVE';

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const d = JSON.parse(e.postData.contents);
    if (d.key !== CLAVE) return salida({ ok: false, error: 'clave' });
    if (d.type === 'ping') return salida({ ok: true });
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    actualizar(ss, 'Resumen', d.resumen, 0, null);
    actualizar(ss, 'Detalle', d.detalle, 0, d.quoteNums || []);
    actualizar(ss, 'Clientes', d.clientes, 0, null);
    return salida({ ok: true });
  } catch (err) {
    return salida({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function salida(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

// Resumen y Clientes: actualiza la fila si el código ya existe, si no agrega una nueva.
// Detalle: borra las filas de esas cotizaciones y las vuelve a escribir.
function actualizar(ss, nombre, datos, colClave, reemplazar) {
  if (!datos || !datos.headers || !datos.headers.length) return;
  let sh = ss.getSheetByName(nombre) || ss.insertSheet(nombre);
  const n = datos.headers.length;
  if (sh.getLastRow() === 0) {
    sh.getRange(1, 1, 1, n).setValues([datos.headers]).setFontWeight('bold').setBackground('#1F3A5F').setFontColor('#FFFFFF');
    sh.setFrozenRows(1);
  }
  const ultima = sh.getLastRow();
  if (reemplazar) {
    const set = {};
    reemplazar.forEach(function (x) { set[x] = true; });
    if (ultima > 1) {
      const col = sh.getRange(2, 1, ultima - 1, 1).getValues();
      for (let i = col.length - 1; i >= 0; i--) if (set[col[i][0]]) sh.deleteRow(i + 2);
    }
    if (datos.rows.length) sh.getRange(sh.getLastRow() + 1, 1, datos.rows.length, n).setValues(datos.rows);
  } else {
    const existentes = {};
    if (ultima > 1) sh.getRange(2, colClave + 1, ultima - 1, 1).getValues().forEach(function (r, i) { existentes[r[0]] = i + 2; });
    const nuevas = [];
    datos.rows.forEach(function (fila) {
      const pos = existentes[fila[colClave]];
      if (pos) sh.getRange(pos, 1, 1, n).setValues([fila]); else nuevas.push(fila);
    });
    if (nuevas.length) sh.getRange(sh.getLastRow() + 1, 1, nuevas.length, n).setValues(nuevas);
  }
  sh.autoResizeColumns(1, n);
}
