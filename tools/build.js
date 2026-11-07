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
