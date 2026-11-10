const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');

const ROOT = path.join(__dirname, '..', 'saimo-lg-webos');
const SRC_DIR = path.join(ROOT, 'src');
const JS_DIR = path.join(ROOT, 'js');

console.log('--- Build webOS: src/ → js/ (Chromium 38) ---');

if (!fs.existsSync(SRC_DIR)) {
  console.error('Falta saimo-lg-webos/src. Não transpila js/ no lugar.');
  process.exit(1);
}

const files = fs.readdirSync(SRC_DIR).filter(function (f) {
  return f.endsWith('.js');
});

let transCount = 0;
for (var i = 0; i < files.length; i++) {
  var file = files[i];
  var srcPath = path.join(SRC_DIR, file);
  var outPath = path.join(JS_DIR, file);
  var code = fs.readFileSync(srcPath, 'utf8');
  var hasEs6 = /\b(async\s+|await\s+|const\s+|let\s+|class\s+|=>)/.test(code);
  if (!hasEs6) {
    fs.writeFileSync(outPath, code, 'utf8');
    console.log('[copia ES5] ' + file);
    continue;
  }
  console.log('[transpila] ' + file);
  try {
    var result = babel.transformSync(code, {
      presets: [
        ['@babel/preset-env', {
          targets: { chrome: '38' },
          loose: true
        }]
      ],
      plugins: [
        '@babel/plugin-proposal-optional-catch-binding'
      ]
    });
    if (result && result.code) {
      fs.writeFileSync(outPath, result.code, 'utf8');
      transCount++;
    }
  } catch (err) {
    console.error('Erro ao transpilar ' + file + ': ' + err.message);
    process.exit(1);
  }
}

console.log('--- Pronto: ' + files.length + ' de src/, ' + transCount + ' transpilados. js/ da pasta não é reescrito. ---');

/* ---- Valida ES5 em TODO o js/ (o transpile só cobre os 3 de src/) -------
   Editar direto um arquivo de js/ com sintaxe ES6 (const, =>, ...) quebra
   silenciosamente TVs velhas — aqui o build falha na hora, com o motivo.
   APIs de runtime sem polyfill também param o build (lista abaixo).
   polyfills.js é o único lugar onde elas podem aparecer (define os shims). */
var acorn = require('acorn');
var PULAR_ES5 = { 'polyfills.js': 1, 'hls.min.js': 1, 'mpegts.min.js': 1, 'versao.js': 1 };
var APIS_SEM_POLYFILL = [
  ['.replaceAll(', '85'],
  ['.flatMap(', '67'],
  ['.flat(', '67'],
  ['Object.fromEntries', '73'],
  ['.trimStart(', '67'],
  ['.trimEnd(', '67'],
  ['globalThis', '71'],
  ['structuredClone(', '98'],
  ['.findLast', '97'],
  ['.at(', '92']
];
var arquivosJs = fs.readdirSync(JS_DIR).filter(function (f) {
  return f.endsWith('.js') && !PULAR_ES5[f];
});
var problemas = 0;
for (var v = 0; v < arquivosJs.length; v++) {
  var nomeArq = arquivosJs[v];
  var codigoArq = fs.readFileSync(path.join(JS_DIR, nomeArq), 'utf8');
  try {
    acorn.parse(codigoArq, { ecmaVersion: 5 });
  } catch (errEs5) {
    console.error('[ES5] ' + nomeArq + ': sintaxe acima de ES5 -> ' + errEs5.message);
    problemas++;
    continue;
  }
  for (var a = 0; a < APIS_SEM_POLYFILL.length; a++) {
    if (codigoArq.indexOf(APIS_SEM_POLYFILL[a][0]) >= 0) {
      console.error('[ES5] ' + nomeArq + ': usa ' + APIS_SEM_POLYFILL[a][0] + ' (Chrome ' + APIS_SEM_POLYFILL[a][1] + '+ e sem polyfill) — reescreva em ES5 ou cubra no polyfills.js');
      problemas++;
    }
  }
}
if (problemas) {
  console.error('--- Build PARADO: ' + problemas + ' problema(s) de compatibilidade em js/. ---');
  process.exit(1);
}
console.log('--- ES5 ok: ' + arquivosJs.length + ' arquivos de js/ verificados. ---');

/* Gera js/versao.js com a versão do appinfo.json — Ajustes exibe a versão real do IPK.
   _saimoT0 = carimbo do primeiro script: as marcas perf medem "desde versao.js". */
var raizApp = path.join(__dirname, '..', 'saimo-lg-webos');
var appinfo = JSON.parse(fs.readFileSync(path.join(raizApp, 'appinfo.json'), 'utf8'));
var versao = appinfo.version || '0.0.0';
fs.writeFileSync(path.join(raizApp, 'js', 'versao.js'), 'window.SAIMO_VERSAO = ' + JSON.stringify(versao) + ';\nwindow._saimoT0 = Date.now();\n', 'utf8');
console.log('--- versao.js gerado: Saimo TV ' + versao + ' ---');
